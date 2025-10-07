
const API_URL = import.meta.env.VITE_API_URL;

async function callChatAPI(message, history = [], context = "") {
  const payload = { message, history, context };

  const res = await fetch(`${API_URL}/api/chat/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API error ${res.status}: ${errorText}`);
  }

  const { response } = await res.json();
  return response;
}

export default callChatAPI;