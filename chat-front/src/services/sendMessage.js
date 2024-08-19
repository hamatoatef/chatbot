export async function sendMessage(question) {
  const res = await fetch(`http://127.0.0.1:8000/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  const { answer } = await res.json();
  console.log(answer);

  return { answer };
}
