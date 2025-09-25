import { Hono } from "hono";
import type { Context } from "hono";
import { validator } from "hono/validator";
// import { chatController } from "../controllers/index.js";

export const router = new Hono();

function validate(value: any, c: Context) {
  const validRoles = ["user", "assistant", "developer", "system", "tool"];
  const { role, question } = value;
  if (!question) {
    return c.json(
      { error: "Invalid request object. 'question' is required!" },
      400
    );
  }
  if (typeof question !== "string") {
    return c.json(
      { error: "Invalid request object. 'question' should be a string!" },
      400
    );
  }
  if (!role) {
    return c.json(
      { error: "Invalid request object. 'role' is required!" },
      400
    );
  }
  if (!validRoles.includes(role)) {
    return c.json(
      {
        error:
          "'role' must be either of 'user' | 'assistant' | 'developer' | 'system'",
      },
      400
    );
  }
  return { role, question };
}

// router.post("chat", validator("json", validate), chatController);

export type AppType = typeof router;
