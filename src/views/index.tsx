export default function Index() {
  return (
    <>
      <div class="container">
        <header>
          <div class="logo-container">
            <div class="logo">
              <i class="fas fa-robot"></i>
            </div>
            <h1 class="title">AI Chat Assistant</h1>
          </div>
          <button class="theme-toggle" id="themeToggle">
            <i class="fas fa-moon"></i>
          </button>
        </header>

        <section class="description">
          <p>
            Ask our AI assistant anything! Get instant responses to your
            questions with customizable tone settings.
          </p>
        </section>

        <form class="chat-form" id="chatForm">
          <div class="form-group">
            <label for="questionId">Your Question</label>
            <textarea
              id="questionId"
              placeholder="Type your question here..."
              required
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="toneSelect">Response Tone</label>
              <select id="toneSelect">
                <option value="user">Casual</option>
                <option value="assistant">Friendly</option>
                <option value="developer">Professional</option>
                <option value="system">Formal</option>
              </select>
            </div>
          </div>

          <button type="submit" id="responseBtn">
            Get AI Response
          </button>
        </form>

        <section class="response-container">
          <div className="response-placeholder">
            Your AI response will appear here...
          </div>
          <div id="response" class=""></div>
        </section>

        <section class="beware-section">
          <h3 class="beware-title">Important Notice</h3>
          <p>
            Please do not input sensitive personal information. AI-generated
            content may be incorrect or inaccurate. Always verify important
            information from reliable sources.
          </p>
        </section>
      </div>

      <footer>
        <p>
          AI Chat Assistant &copy; {new Date().getFullYear()} | All interactions
          are anonymous and not stored
        </p>
      </footer>
    </>
  );
}
