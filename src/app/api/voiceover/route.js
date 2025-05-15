export async function POST(req) {
  try {
    const { text, lang } = await req.json();

    if (!text) {
      return new Response(JSON.stringify({ error: "Text is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const backendResponse = await fetch("http://localhost:5001/api/voiceover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang: lang || "en" }),
    });

    if (!backendResponse.ok) {
      throw new Error("Failed to generate voiceover.");
    }

    const blob = await backendResponse.blob();
    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="voiceover.mp3"',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
