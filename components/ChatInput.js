// components/ChatInput.js
import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Firebaseの設定（適宜修正）
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      // メッセージが空でない場合にのみ送信
      await addDoc(collection(db, 'messages'), {
        text: message,
        timestamp: new Date(),
      });
      setMessage(''); // メッセージ送信後、入力フォームをリセット
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)} // 入力値をstateに保存
        placeholder="Type a message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}
