import { Hono } from "hono";
import { logger } from "hono/logger";
import { router } from "./routes/index.js";
import { html } from "hono/html";
import Home from "./views/home.js";
import { serveStatic } from "hono/bun";
import Index from "./views/index.js";

const app = new Hono();

app.use("*", logger());
app.use("*", serveStatic({ root: "./src/static" }));
/*
app.get("/", (c) => {
  const template = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/style.css" />
        <title>Let's Chat!</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css"
          integrity="sha512-BrOPA520KmDMqieeM7XFe6a3u3Sb3F1JBaQnrIAmWg3EYrciJ+Qqe6ZcKCdfPv26rGcgTrJnZ/IdQEct8h3Zhw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
        <script defer src="/app.js"></script>
      </head>
      <body>
        ${Home()}
      </body>
    </html>
  `;
  return c.html(template);
});
*/
app.get("/", (c) => {
  const template = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="/design.css" />
        <title>AI Chat Assistant</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown.min.css"
          integrity="sha512-BrOPA520KmDMqieeM7XFe6a3u3Sb3F1JBaQnrIAmWg3EYrciJ+Qqe6ZcKCdfPv26rGcgTrJnZ/IdQEct8h3Zhw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js"></script>
        <script defer src="/script.js"></script>
      </head>
      <body>
        ${Index()}
      </body>
    </html>
  `;
  return c.html(template);
});

app.route("api/", router);

// serve(
//   {
//     fetch: app.fetch,
//     port: 3000,
//   },
//   (info) => {
//     console.log(`Server is running on http://localhost:${info.port}`);
//   }
// );
export default {
  fetch: app.fetch,
  port: 3000,
  hostname: "0.0.0.0", // 👈 important
};
