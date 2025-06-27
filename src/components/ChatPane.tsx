export async function getCompletion(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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",
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

