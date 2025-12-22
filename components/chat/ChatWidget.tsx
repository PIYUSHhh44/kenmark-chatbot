"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow toggle={() => setOpen(false)} />}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
      >
        💬
      </button>
    </>
  );
}
