// utils/websocket.js
const socket = new WebSocket('ws://your-websocket-server-url');

export const sendMessage = (message) => {
  socket.send(JSON.stringify({ text: message }));
};

socket.onmessage = (event) => {
  console.log('Received message:', event.data);
};
