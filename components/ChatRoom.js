// components/ChatRoom.js
import ChatMessage from './ChatMessage';

export default function ChatRoom({ messages }) {
  return (
    <div>
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))
        ) : (
          <p>No messages yet.</p> // メッセージがまだなければ表示
        )}
      </div>
    </div>
  );
}
