import "dotenv/config";
import { env } from "hono/adapter";
// @ts-ignore
import OpenAI from "openai";
import { streamText } from "hono/streaming";
import type { Context } from "hono";

interface IEnvVars {
  OPENROUTER_API_KEY: string;
  [key: string]: unknown;
}

// const roles = ["user", "assistant", "developer", "system", "tool"];
const models = [
  "openai/gpt-4o-mini",
  "openai/gpt-oss-120b:free",
  "x-ai/grok-4-fast:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "deepseek/deepseek-chat-v3.1:free",
  "z-ai/glm-4.5-air:free",
  "google/gemma-3n-e2b-it:free",
  "tngtech/deepseek-r1t2-chimera:free",
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
];
// type IModelReturnType = { name: "function" | "user" | "assistant" | "developer" | "system" | "tool" }
type Role = "user" | "assistant" | "developer" | "system" | "tool";

export const chatController = async (c: Context) => {
  const { question, role } = await c.req.json<{
    question: string;
    role: Role;
  }>();
  const { OPENROUTER_API_KEY } = env<IEnvVars>(c);
  // @ts-ignore
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    //   defaultHeaders: {
    //     "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
    //     "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
    //   },
  });

  try {
    const responseStream = await makeRequest(openai, question, role);
    return streamText(c, async (stream) => {
      for await (const chunk of responseStream!) {
        const text = chunk.choices[0]?.delta?.content || "";
        await stream.write(text);
        await stream.sleep(10);
      }
    });
  } catch (error) {
    console.log("Request failed after 5 Retries due to rate limiting.");
    return c.json({ error: "Unable to make request" }, 400);
  }
};

// @ts-ignore
async function makeRequest(openai, question: string, role: Role) {
  const maxRetries = 5;
  let retryCount = 0;
  let waitTime = 1000;

  while (retryCount < maxRetries) {
    try {
      const model = models[Math.round(Math.random() * models.length)];
      const responseStream = await openai.chat.completions.create({
        model: model,
        messages: [
          role === "tool"
            ? {
                role: "tool",
                content: question,
                tool_call_id: role, // Replace with actual tool_call_id if available
              }
            : {
                role: role,
                content: question,
              },
        ],
        stream: true,
      });
      console.log(model);
      return responseStream;
    } catch (error) {
      if (error instanceof OpenAI.APIError && error.status === 429) {
        console.log(
          `Rate Limit Exceeded. Retrying in ${waitTime / 1000} seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        waitTime *= 2;
        retryCount++;
      } else {
        console.log("An unexpected error occured", error);
        throw error;
      }
    }
  }
}
