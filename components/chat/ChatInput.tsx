"use client";

import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    onSend("🧑: " + text);

    try {
      const res = await fetch("http://localhost:4000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      onSend("🤖: " + data.reply);
    } catch {
      onSend("⚠️ Server error");
    }

    setText("");
  };

  return (
    <div className="flex items-center gap-2 border-t p-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask something..."
        className="flex-1 border rounded p-2 text-sm outline-none"
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
