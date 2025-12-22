"use client";

import { useState, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow({ toggle }: { toggle: () => void }) {
  const [messages, setMessages] = useState<string[]>([]);

  // Load stored chat when window opens
  useEffect(() => {
    const saved = localStorage.getItem("chatMessages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat persistently
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const addMessage = (msg: string) => {
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="fixed bottom-20 right-5 w-80 bg-white rounded-lg shadow-lg border flex flex-col">
      <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-lg">
        <h2 className="font-semibold text-sm">Kenmark AI Assistant</h2>
        <button onClick={toggle}>✖</button>
      </div>

      <div className="flex flex-col gap-2 p-3 overflow-y-auto h-64">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
      </div>

      <ChatInput onSend={addMessage} />
    </div>
  );
}
