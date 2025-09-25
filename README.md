## AI Chat Streaming App (Hono.js)

This is a Hono.js application that enables real-time chat streaming between a user and an AI assistant. Users can select the tone of the AI's response, making interactions more personalized and engaging.

---

### Features

- **Live AI Chat**: Streamed responses from various AI models.
- **Customizable Tone**: Choose the response style (Casual, Friendly, Professional, Formal, etc.).
- **Modern UI**: Clean, responsive interface with theme toggle.
- **Streaming API**: Fast, incremental delivery of AI answers.
- **Multiple Models**: Supports several AI models via OpenRouter.

---

### Getting Started

#### 1. Install dependencies

```bash
npm install
```

#### 2. Start the development server

```bash
npm run dev
```

#### 3. Open the app in your browser

```
http://localhost:3000
```

---

### Usage

- Type your question in the chat box.
- Select the desired response tone from the dropdown.
- Click "Get AI Response" to receive a streamed answer from the AI.
- Responses appear instantly and update in real time.

---

### Customization

- **Tones**: You can add or modify tones in the UI and backend to suit your needs.
- **Models**: Easily switch or add AI models in the configuration.
- **Styling**: Edit CSS files in static or views for custom themes.

---

### Environment Variables

Set your OpenRouter API key in a .env file:

```
OPENROUTER_API_KEY=your_api_key_here
```

---

### Tech Stack

- [Hono.js](https://hono.dev/) (Backend & Routing)
- [OpenAI/OpenRouter](https://openrouter.ai/) (AI Models)
- JSX/TSX (Frontend Views)
- CSS (Styling)

---

### License

MIT
