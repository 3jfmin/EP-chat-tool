import { useEffect, useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebase 初期化
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
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      const messagesArray = querySnapshot.docs.map(doc => doc.data());
      setMessages(messagesArray);
    };

    fetchMessages();
  }, []);

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      <ChatRoom messages={messages} />
    </div>
  );
}
