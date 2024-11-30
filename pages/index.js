// pages/index.js
import { useEffect, useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
      try {
        const querySnapshot = await getDocs(collection(db, 'messages'));
        const messagesArray = querySnapshot.docs.map(doc => doc.data());
        setMessages(messagesArray); // Firestoreからメッセージを取得してstateに保存
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    fetchMessages();
  }, []); // コンポーネントがマウントされたときだけ実行

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      <ChatRoom messages={messages} /> {/* メッセージを表示 */}
    </div>
  );
}
