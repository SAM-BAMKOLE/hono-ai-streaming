import "dotenv/config";
import { env } from "hono/adapter";
// @ts-ignore
import OpenAI from "openai";
import type { Context } from "hono";

interface IEnvVars {
  OPENROUTER_API_KEY: string;
  [key: string]: unknown;
}

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
    apiKey: OPENROUTER_API_KEY,
  });

  try {
    const responseStream = await makeRequest(openai, question, role);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of responseStream) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              // SSE format: must end with \n\n
              controller.enqueue(encoder.encode(`data: ${text}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Request failed after retries:", error);
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
      const model = models[Math.floor(Math.random() * models.length)];
      const responseStream = await openai.chat.completions.create({
        model,
        messages: [
          role === "tool"
            ? {
                role: "tool",
                content: question,
                tool_call_id: role,
              }
            : {
                role,
                content: question,
              },
        ],
        stream: true,
      });
      console.log("Using model:", model);
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
        console.error("Unexpected error", error);
        throw error;
      }
    }
  }
}
