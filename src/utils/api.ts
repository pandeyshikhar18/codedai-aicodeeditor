const COHERE_API_KEY = "Bearer P7pjFKrfS0C3Wuf4wUs7tXgKzkvsQ74upPW7B4cL"; // Replace with your working key

const cohereHeaders = {
  Authorization: COHERE_API_KEY,
  "Content-Type": "application/json",
};

// 🎙️ Voice-to-Code
export async function voiceToCode(prompt: string): Promise<string> {
  const res = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: cohereHeaders,
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

// 💬 Explain Code (Chat Assistant)
export async function getCompletion(prompt: string): Promise<string> {
  const res = await fetch("https://api.cohere.ai/v1/generate", {
    method: "POST",
    headers: cohereHeaders,
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
