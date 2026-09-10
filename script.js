function openAI() {
document.getElementById("aiModal").style.display = "flex";
}

function closeAI() {
document.getElementById("aiModal").style.display = "none";
}

function sendMessage() {
const input = document.getElementById("userInput");
const messages = document.getElementById("chatMessages");

const text = input.value.trim();

if (text === "") {
return;
}

const userMessage = document.createElement("div");
userMessage.className = "user";
userMessage.textContent = text;
messages.appendChild(userMessage);

input.value = "";

setTimeout(() => {
const botMessage = document.createElement("div");
botMessage.className = "bot";
botMessage.textContent =
"I'm NOVA AI. This is currently a demo. Real AI and device control will be connected later.";
messages.appendChild(botMessage);

messages.scrollTop = messages.scrollHeight;

}, 500);
}

window.onclick = function(event) {
const modal = document.getElementById("aiModal");

if (event.target === modal) {
closeAI();
}
};