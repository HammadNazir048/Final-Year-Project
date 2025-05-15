import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Function to generate subtitles dynamically
function generateSubtitles(text) {
  const sentences = text.match(/[^.!?]+[.!?]/g) || [text];
  const wordsPerSecond = 2;
  let startTime = 0;
  let subtitleContent = "";

  sentences.forEach((sentence, index) => {
    const wordCount = sentence.split(" ").length;
    const duration = Math.max(2, Math.ceil(wordCount / wordsPerSecond));
    const endTime = startTime + duration;

    subtitleContent += `Subtitle ${index + 1}:\nStart Time: ${startTime}s - End Time: ${endTime}s\n${sentence.trim()}\n\n`;
    startTime = endTime;
  });

  return subtitleContent;
}

export async function POST(req) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "No text provided" }, { status: 400 });

    const subtitlesText = generateSubtitles(text);
    const filePath = path.join(process.cwd(), "public", "subtitles.txt");
    fs.writeFileSync(filePath, subtitlesText);

    return NextResponse.json({ subtitlesText, url: "/subtitles.txt" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate subtitles" }, { status: 500 });
  }
}
