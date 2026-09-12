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

  try {
    const response = await fetch("https://nova-proxy.piyuhkumar69.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text })
    });
    const data = await response.json();
    thinkingDiv.remove();
    const botDiv = document.createElement('div');
    botDiv.className = 'bot';

    if (data.error) {
      botDiv.textContent = "Error: " + data.error.message;
    } else {
      const reply = data.candidates && data.candidates[0] && data.candidates[0].content.parts[0].text;
      botDiv.textContent = reply || "Sorry, I couldn't generate a reply.";
    }
    messages.appendChild(botDiv);
  } catch (err) {
    thinkingDiv.remove();
    const errDiv = document.createElement('div');
    errDiv.className = 'bot';
    errDiv.textContent = "Network error: " + err.message;
    messages.appendChild(errDiv);
  }
  messages.scrollTop = messages.scrollHeight;
}