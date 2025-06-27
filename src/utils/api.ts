export async function voiceToCode(prompt: string): Promise<string> {
  const res = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: "Bearer P7pjFKrfS0C3Wuf4wUs7tXgKzkvsQ74upPW7B4cL",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-r-plus",
      prompt: `Convert this natural language to valid code:\n${prompt}`,
      max_tokens: 300,
      temperature: 0.3,
    }),
  });

  const data = await res.json();
  console.log("🔍 voiceToCode response:", data);

  if (!data.generations || !data.generations[0]?.text) {
    throw new Error("❌ No code returned from Cohere.");
  }

  return data.generations[0].text.trim();
}

// Explains code (used in ChatPane) using Cohere
export async function getCompletion(prompt: string): Promise<string> {
  const res = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: {
      Authorization: "Bearer P7pjFKrfS0C3Wuf4wUs7tXgKzkvsQ74upPW7B4cL",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-r-plus",
      prompt: `Explain this code:\n${prompt}`,
      max_tokens: 300,
      temperature: 0.3,
    }),
  });

  const data = await res.json();
  console.log("🔍 getCompletion response:", data);

  if (!data.generations || !data.generations[0]?.text) {
    throw new Error("❌ No explanation returned from Cohere.");
  }

  return data.generations[0].text.trim();
}
