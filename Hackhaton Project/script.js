
// ==========================================================================


const API_KEY = "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"; // 👈 yahan apni Gemini API key daalo

document.getElementById("generate").addEventListener("click", async function () {
  const idea = document.getElementById("idea").value.trim();
  const tone = document.getElementById("tone").value;
  const resultDiv = document.getElementById("result");

  if (!idea) {
    resultDiv.innerHTML = "<p style='color:red;'>Please enter your idea first.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>⏳ Generating pitch using Gemini AI...</p>";

  try {
    const prompt = `
      You are a startup pitch generator.
      Based on this idea: "${idea}".
      Tone: ${tone}.
      Generate:
      1. Startup Name
      2. Tagline
      3. Elevator Pitch (2–3 lines)
      4. Target Audience
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/.../models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";

    resultDiv.innerHTML = `<pre>${aiText}</pre>`;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "<p style='color:red;'>⚠️ Error generating pitch. Check API key or console.</p>";
  }
});
