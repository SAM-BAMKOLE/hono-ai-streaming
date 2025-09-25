async function updateClient() {
  const responseDiv = document.querySelector("#response");
  const questionInput = document.getElementById("questionInput");
  //   const selectInput = document.getElementById("selectInput");
  const selectInput = document.querySelector("select");
  try {
    responseDiv.style.visibility = "initial";
    responseDiv.textContent = "...";
    const inputData = {
      question: questionInput.value,
      role: selectInput.value,
    };
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 200) {
      const error = await response.json();
      throw new Error(error.error.error ?? error.error);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    while (true) {
      if (responseDiv.textContent === "...") {
        responseDiv.textContent = "";
      }
      const { done, value } = await reader.read();
      if (done) break;
      let latestChunk = decoder.decode(value);
      responseDiv.textContent += latestChunk;
      buffer += latestChunk;
    }
    responseDiv.innerHTML = marked.parse(buffer);
  } catch (error) {
    responseDiv.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
}

const submitButton = document.getElementById("submitBtn");
const submitForm = document.querySelector("form");

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  submitButton.disabled = true;

  updateClient();
});

/*
document.addEventListener("DOMContentLoaded", () => {
  const response = document.getElementById("response");
  response.style.visibility = "initial";
  response.innerHTML = marked.parse(`#### 2. **User Terminals (The Dish)**
   - **How It Connects**: Users get a small, flat-panel "Dishy McFlatface" antenna (about 60 cm wide) that automatically aligns with satellites overhead. It uses phased-array technology to electronically steer the beam without moving parts.
   - **Setup**: Plug it into a router, power it up, and the Starlink app helps with positioning. It needs a clear view of the sky (no trees or buildings blocking) to maintain connections.
   - **Signal Exchange**: The dish communicates with satellites using Ku-band (12-18 GHz) radio frequencies for user data and Ka-band (26-40 GHz) for gateways. Data rates can reach 50-500 Mbps download and 10-50 Mbps upload, depending on location and congestion.

#### 3. **Network Architecture**
   - **Satellites to Ground**: Satellites beam internet signals to user terminals and larger ground stations (gateways) connected to fiber-optic networks. These gateways handle the heavy lifting of routing data to the global internet backbone.
   - **Handovers**: Satellites move at about 27,000 km/h, so your connection "hands over" seamlessly to another satellite every few minutes. The network's software predicts and switches these without interrupting service.
   - **Mesh Networking**: Satellites use laser links to form a self-healing mesh, allowing data to hop between satellites across oceans or remote areas without needing ground stations everywhere.
   - **Backhaul**: For areas without fiber, Starlink is expanding to include cellular backhaul and direct-to-cell capabilities (e.g., partnering with phone providers for satellite texting/calling).

#### 4. **Key Advantages and Challenges**
   - **Pros**: Global coverage (even in polar regions), easier to scale than cables, and resilient to terrestrial disruptions (e.g., earthquakes). It's already serving homes, businesses, ships, planes, and RVs.
   - **Cons**: High upfront cost ($500-600 for the kit), subscription fees ($50-150/month), potential for weather interference (rain fade), and concerns about space debris or light pollution from the satellites.
   - **Evolution**: Future versions include V2 satellites with more bandwidth and direct-to-device service, aiming to compete with 5G and fiber.

If you're interested in specifics like setup, speeds in your area, or comparisons to other internet options, feel free to ask! For the latest updates, check SpaceX's official Starlink site.`);
});
*/
