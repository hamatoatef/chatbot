export async function getChat() {
  const res = await fetch(`http://127.0.0.1:8000/chat_history`);

  const { chat_history } = await res.json();
  console.log(chat_history);

  return { chat_history };
}
