export default function ChatMessage({ message }: { message: string }) {
  return (
    <div className="p-3 rounded-lg bg-blue-600 text-white shadow-md ml-auto">
      {message}
    </div>
  );
}
