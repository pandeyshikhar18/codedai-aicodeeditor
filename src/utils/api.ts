// Converts natural language voice to actual code
export async function voiceToCode(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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", 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // You can switch to GPT-4 or phi-3 too
      messages: [
        {
          role: "system",
          content: "You are a code generation assistant. Convert the user's instruction into valid code.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await res.json();

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("No code returned from AI.");
  }

  return data.choices[0].message.content;
}

// Explains code (used in ChatPane)
export async function getCompletion(prompt: string): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer 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", // Same key
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

  if (!data.choices || !data.choices[0]?.message?.content) {
    throw new Error("No explanation returned from AI.");
  }

  return data.choices[0].message.content;
}
