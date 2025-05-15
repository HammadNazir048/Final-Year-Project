"use client"
import React, { useState } from "react";
import { ClipboardCopy, Check, Headphones, Download, FileText } from "lucide-react"; // More relevant icons
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";

const VoiceoverPage = () => {
  const [inputText, setInputText] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [subtitles, setSubtitles] = useState("");
  const [subtitlesUrl, setSubtitlesUrl] = useState(null);
  const [loadingVoiceover, setLoadingVoiceover] = useState(false);
  const [loadingSubtitles, setLoadingSubtitles] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const generateVoiceover = async () => {
    setError("");
    setAudioSrc(null);
    setLoadingVoiceover(true);
    try {
      const response = await fetch("/api/voiceover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error("Failed to generate voiceover.");

      const blob = await response.blob();
      setAudioSrc(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingVoiceover(false);
    }
  };

  const generateSubtitles = async () => {
    setError("");
    setSubtitles("");
    setSubtitlesUrl(null);
    setLoadingSubtitles(true);
    try {
      const response = await fetch("/api/subtitles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) throw new Error("Failed to generate subtitles.");

      const { subtitlesText, url } = await response.json();
      setSubtitles(subtitlesText);
      setSubtitlesUrl(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSubtitles(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(subtitles).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
    <NavBar/>     
    <div className="flex flex-1 mt-10">
                {/* Sidebar on the left */}
                <div className="fixed top-[64px] left-0 h-[calc(100vh-64px)] bg-gray-800 text-white duration-300 z-10">
                    <Sidebar />
                </div>
                </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-white">
        <Headphones className="inline-block mr-2 bg-gray-900" size={30} /> Voiceover Ready
      </h2>

      <div className="w-full max-w-xl flex flex-col space-y-4">
        {error && <p className="text-red-500 font-semibold">{error}</p>}

        <textarea
          className="border border-gray-700 bg-gray-800 text-white p-4 rounded-md focus:outline-none focus:border-yellow-500 shadow-inner"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={5}
          placeholder="Enter your text here to generate voiceover and subtitles..."
        />

        <div className="flex space-x-4">
          <button
            onClick={generateVoiceover}
            disabled={loadingVoiceover || !inputText.trim()}
            className="flex items-center justify-center bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-md focus:outline-none transition duration-300 disabled:bg-black"
          >
            {loadingVoiceover ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
            ) : (
              <Headphones className="mr-2" size={20} />
            )}
            Generate Voiceover
          </button>

          <button
            onClick={generateSubtitles}
            disabled={loadingSubtitles || !inputText.trim()}
            className="flex items-center justify-center bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-md focus:outline-none transition duration-300 disabled:bg-black"
          >
            {loadingSubtitles ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
            ) : (
              <FileText className="mr-2" size={20} />
            )}
            Generate Subtitles
          </button>
        </div>

        {audioSrc && (
          <div className="bg-gray-800 p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold text-gray-300 mb-2 bg-gray-800">🎧 Listen to Voiceover:</h3>
            <audio controls className="w-full">
              <source src={audioSrc} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <a
              href={audioSrc}
              download="voiceover.mp3"
              className="inline-flex items-center mt-3 bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-md focus:outline-none transition duration-300"
            >
              Download MP3
            </a>
          </div>
        )}

        {subtitles && (
          <div className="bg-gray-800 p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center mb-2 bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-300 bg-gray-800">Subtitles:</h3>
              <button
                onClick={copyToClipboard}
                className="text-gray-400 hover:text-gray-200 transition focus:outline-none"
                title="Copy to clipboard"
              >
                {copied ? <Check className="text-green-400" size={20} /> : <ClipboardCopy size={20} />}
              </button>
            </div>
            <div className="overflow-y-auto max-h-48 p-3 bg-gray-700 rounded-md text-gray-200 text-sm leading-relaxed">
              {subtitles.split("\n\n").map((sub, index) => (
                <div
                  key={index}
                  className="p-2 mb-2 bg-gray-600 rounded-md shadow-sm text-white"
                >
                  {sub}
                </div>
              ))}
            </div>
            {subtitlesUrl && (
              <a
                href={subtitlesUrl}
                download="subtitles.txt"
                className="inline-flex items-center mt-3 bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-md focus:outline-none transition duration-300"
              >
               Download TXT
              </a>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default VoiceoverPage;
