import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

export default function ChatRoom({ messages }) {
  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </div>
      <ChatInput />
    </div>
  );
}
