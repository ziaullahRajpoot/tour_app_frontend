import React, { useState } from 'react';

const ChatWindow = ({ client }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(client.messages);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'Tour Guide', // Assuming the tour guide is the sender here
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <h2>Chat with {client.name}</h2>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender === 'Tour Guide' ? 'tour-guide' : 'client'}`}>
            <span>{msg.sender}: </span>{msg.text} <span className="timestamp">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="send-message">
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
