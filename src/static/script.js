// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeIcon.classList.remove("fa-moon");
  themeIcon.classList.add("fa-sun");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// Chat form functionality
const chatForm = document.getElementById("chatForm");
const questionInput = document.getElementById("questionId");
const toneSelect = document.getElementById("toneSelect");
const responseBtn = document.getElementById("responseBtn");
const responseDiv = document.getElementById("response");
const responsePlaceholder = document.querySelector(".response-placeholder");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  responsePlaceholder.textContent = "Your AI response will appear here...";
  responsePlaceholder.style.display = "block";

  const question = questionInput.value.trim();
  const tone = toneSelect.value;

  // Remove previous Q&A if any
  document.getElementById("questionElem")?.remove();
  document.getElementById("responseElem")?.remove();

  if (!question) {
    alert("Please enter a question");
    return;
  }

  // Disable button during "processing"
  responseBtn.disabled = true;
  responseBtn.textContent = "Processing...";

  updateClient(question, tone);
});

async function updateClient(question, tone) {
  try {
    const inputData = { question, role: tone };
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.error.error ?? error.error);
    }

    // Create response elements
    const questionElem = document.createElement("div");
    questionElem.innerHTML = `<strong>You:</strong> ${question}`;
    questionElem.id = "questionElem";
    questionElem.style.marginBottom = "15px";
    questionElem.style.paddingBottom = "15px";
    questionElem.style.borderBottom = "1px solid var(--border-color)";

    const responseElem = document.createElement("div");
    responseElem.innerHTML = "";
    responseElem.id = "responseElem";
    responseElem.style.marginTop = "15px";

    // Add elements to response container
    responseDiv.appendChild(questionElem);
    responseDiv.appendChild(responseElem);

    responsePlaceholder.style.display = "none";
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      // if (responseDiv.textContent === "...") {
      //   responseDiv.innerHTML = "";
      // }
      const { done, value } = await reader.read();
      if (done) break;
      let latestChunk = decoder.decode(value);
      responseElem.textContent += latestChunk;
      buffer += latestChunk;
    }
    const aiTone =
      tone === "user"
        ? "Casual"
        : tone === "assistant"
        ? "Friendly"
        : tone === "developer"
        ? "Professional"
        : tone === "system"
        ? "Formal"
        : "AI";
    responseElem.innerHTML = `<strong>AI Assistant (${aiTone}):</strong><br>${marked.parse(
      buffer
    )}`;

    // Clear the input
    questionInput.value = "";
  } catch (error) {
    responsePlaceholder.textContent = error.message;
  } finally {
    // Re-enable button
    responseBtn.disabled = false;
    responseBtn.textContent = "Get AI Response";
  }
}
