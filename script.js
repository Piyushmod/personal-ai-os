function openAI() {
  document.getElementById('aiModal').style.display = 'flex';
}
function closeAI() {
  document.getElementById('aiModal').style.display = 'none';
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  const messages = document.getElementById('chatMessages');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  const userDiv = document.createElement('div');
  userDiv.className = 'user';
  userDiv.textContent = text;
  messages.appendChild(userDiv);

  const thinkingDiv = document.createElement('div');
  thinkingDiv.className = 'bot';
  thinkingDiv.textContent = 'NOVA is thinking...';
  messages.appendChild(thinkingDiv);
  messages.scrollTop = messages.scrollHeight;

  const GEMINI_API_KEY = "AIzaSyCjbTgvUwxURLQ5_mQfkLDrSG5MwE1DVfQ";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `You are NOVA, a friendly personal AI OS assistant. Answer briefly and helpfully. User: ${text}` }]
          }]
        })
      }
    );
    const data = await response.json();
    const reply = data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text;
    thinkingDiv.remove();
    const botDiv = document.createElement('div');
    botDiv.className = 'bot';
    botDiv.textContent = reply || "Sorry, I couldn't generate a reply.";
    messages.appendChild(botDiv);
  } catch (err) {
    thinkingDiv.remove();
    const errDiv = document.createElement('div');
    errDiv.className = 'bot';
    errDiv.textContent = "Something went wrong reaching NOVA's brain. Try again.";
    messages.appendChild(errDiv);
  }
  messages.scrollTop = messages.scrollHeight;
}