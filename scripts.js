const API_KEY = "AIzaSyCe9z9fVRfuMmvQROCcqiNoGPIaxwwelHY"; // Replace this with your key (starts with AIza...)

    async function sendMessage() {
      const inputEl = document.getElementById("userInput");
      const userText = inputEl.value;
      if (!userText) return;

      appendMessage("user", userText,true);
      inputEl.value = "";

      start()

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contents: [
            {
              parts: [{ text: userText }]
            }
          ]}),
      })

      stop()
  
      const data = await res.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      appendMessage("bot", botReply);
    }

    function appendMessage(role, text, processing) {
      const div = document.createElement("div");
      div.className = `message ${role}`;
      div.innerText = text;
      document.getElementById("chatBox").appendChild(div);
    }

    const button = document.getElementById("sendButton");
button.addEventListener("click",()=> {
    sendMessage();
})

let processing = null;

function start(){
    const chatBox = document.getElementById("chatBox");
    const text = document.getElementById("chatBox").innerText; 
    let i = 0;
    processing = setInterval(() => {
        chatBox.innerText = text + ".".repeat(i + 1) 
        i = (i + 1)%3;
    },500);
}

function stop() {
    clearInterval(processing)
}