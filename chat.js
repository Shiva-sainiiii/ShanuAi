const chatbox = document.getElementById("chatbox");
const inputBox = document.getElementById("inputBox");
const sendBtn = document.getElementById("sendBtn");

sendBtn.onclick = sendMessage;

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "msg " + sender;
  div.innerText = text;
  chatbox.appendChild(div);
  chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
  const userText = inputBox.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  inputBox.value = "";
  addMessage("Typing...", "bot");

  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: userText }),
  });

  const data = await response.json();
  document.querySelector(".bot:last-child").remove();

  const botReply = data?.choices?.[0]?.message?.content || "Error!";
  addMessage(botReply, "bot");
}