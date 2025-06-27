export async function getCompletion(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful coding assistant. Explain the user's code.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await res.json();
  console.log("🔍 API Response:", data); // <-- Add this

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("No explanation returned from AI.");
  }

  return data.choices[0].message.content;
}

