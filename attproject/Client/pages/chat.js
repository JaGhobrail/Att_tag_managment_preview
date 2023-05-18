import { useEffect, useState } from 'react';
import io  from "socket.io-client";


// let io = ioClient('http://localhost:3001')
const socket = io('http://localhost:3001');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message', inputValue);
    setInputValue('');
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
