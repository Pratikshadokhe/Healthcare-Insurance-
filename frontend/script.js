// ===============================
// Dravita Copilot Frontend Logic (Clean Version)
// ===============================

const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const chatContainer = document.getElementById("chatContainer");

// Replace with your Python backend endpoint
const BACKEND_URL = "http://127.0.0.1:5000/chat"; // Example for Flask/FastAPI

// Function to create and append message bubbles
function appendMessage(content, className) {
    const message = document.createElement("div");
    message.classList.add("message", className);
    message.innerHTML = content;
    chatContainer.appendChild(message);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Handle sending messages
async function sendMessage() {
    const userInput = messageInput.value.trim();
    if (!userInput) return;

    // Display user message
    appendMessage(userInput, "user-message");
    messageInput.value = "";

    try {
        // Send POST request to backend
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        const data = await response.json();
        const botReply = data.reply || "Sorry, I couldn’t process that.";

        // Show bot reply
        appendMessage(botReply, "bot-message");
    } catch (error) {
        appendMessage("⚠ Server not responding. Please check your backend.", "bot-message");
        console.error(error);
    }
}

// Button click event
sendButton.addEventListener("click", sendMessage);

// Press Enter to send
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});