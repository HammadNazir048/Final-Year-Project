'use client'; // Required for using hooks like useState, useRef, useEffect

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const messagesEndRef = useRef(null); // Ref for scrolling to bottom

  // Function to scroll to the bottom of the message list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return; // Don't send empty messages or if loading

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]); // Add user's message to the chat
    setInput(""); // Clear input field
    setIsLoading(true); // Start loading

    try {
      // Send the request to the Flask backend (make sure the URL is correct)
      const res = await fetch("http://localhost:5003/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: input }), // Send user input to the backend
      });

      if (!res.ok) {
          // Handle non-200 responses from the server
          const errorData = await res.json();
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
      }

      const data = await res.json(); // Get the response from the backend

      const botMessage = {
        text: data.response || "Something went wrong or no response received.",
        sender: "bot", // Bot's message
      };

      setMessages((prev) => [...prev, botMessage]); // Add bot's message to the chat
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { text: `An error occurred: ${err.message || 'Please try again later.'}`, sender: "bot" },
      ]); // Show error message if something goes wrong
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    // Main container: Black background, white text, minimum full screen height, padding, flex column layout
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">

      {/* Title: White text (inherited), bold, large font, bottom margin */}
      <h1 className="text-3xl font-bold mb-6 text-center">Script Scout AI</h1>

      {/* Message area: Flex item that grows, allows vertical scrolling, bottom margin, spacing between messages */}
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 p-2 rounded-lg bg-gray-900">
        {messages.map((msg, idx) => (
          // Individual message bubble: Padding, rounded corners, max width, margin bottom
          // Conditional classes for user vs. bot messages: background color, alignment (self-end/start), text alignment
          <div
            key={idx}
            className={`p-4 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base break-words ${
              msg.sender === "user"
                ? "bg-gray-700 self-end ml-auto text-right" // Darker gray for user, float right
                : "bg-gray-800 self-start mr-auto text-left" // Darker gray for bot, float left (slightly different shade for distinction)
            }`}
            style={{ wordBreak: 'break-word' }} // Ensure long words break
          >
            {msg.text}
          </div>
        ))}
        {/* Dummy div to scroll into view */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area: Flex container for input and button */}
      <div className="flex rounded-lg overflow-hidden border border-gray-700">
        {/* Input field: Flex item that grows, padding, remove default outline, add focus ring */}
        {/* Black background, white text, gray placeholder */}
        <input
          className="flex-1 p-3 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder={isLoading ? "Waiting for response..." : "Type a message..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={isLoading} // Disable input while loading
        />
        {/* Send button: Background, text color, padding, hover effect, disable state */}
        <button
          onClick={sendMessage}
          className="bg-gray-700 text-white px-6 py-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!input.trim() || isLoading} // Disable button if input is empty or loading
        >
          {isLoading ? (
             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
             </svg>
          ) : (
             'Send'
          )}
        </button>
      </div>
    </div>
  );
}