// components/ChatMessage.js
export default function ChatMessage({ message }) {
  return (
    <div className="message">
      <p>{message.text}</p>
      <span>{new Date(message.timestamp.seconds * 1000).toLocaleTimeString()}</span>
    </div>
  );
}
