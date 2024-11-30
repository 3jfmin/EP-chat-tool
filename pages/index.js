// pages/index.js
import { useEffect, useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

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

export default function Home() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'messages'), (querySnapshot) => {
      const messagesArray = querySnapshot.docs.map(doc => doc.data());
      setMessages(messagesArray); // リアルタイムでメッセージを更新
    });

    return () => unsubscribe(); // クリーンアップ
  }, []);

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      <ChatRoom messages={messages} />
    </div>
  );
}
