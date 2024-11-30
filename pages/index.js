import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebaseの設定
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  // メッセージを保存するためのstate
  const [messages, setMessages] = useState([]);

  // Firestoreからデータを取得するuseEffect
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'messages')); // Firestoreのコレクション'db/messages'を取得
        const messagesArray = querySnapshot.docs.map(doc => doc.data()); // ドキュメントを配列に変換
        setMessages(messagesArray); // 取得したメッセージをstateに保存
        console.log(messagesArray); // デバッグ用に出力
      } catch (error) {
        console.error("Error fetching messages: ", error); // エラー時の処理
      }
    };

    fetchMessages(); // 非同期関数を呼び出し
  }, []); // []を渡すことで、コンポーネントの初回レンダリング時のみ実行

  return (
    <div>
      <h1>Welcome to the Chat</h1>
      {/* メッセージを表示 */}
      {messages.length > 0 ? (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.text}</li> // 各メッセージをリストに表示
          ))}
        </ul>
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
}
