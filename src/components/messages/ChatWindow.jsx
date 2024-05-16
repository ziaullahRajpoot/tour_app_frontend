import './ChatWindow.css';

const ChatWindow = ({ client }) => {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with {client.name}</h2>
        </div>
        <div className="chat-messages">
          {client.messages.map(message => (
            <p key={message.id}><strong>{message.sender}:</strong> {message.text} <span>{message.timestamp}</span></p>
          ))}
        </div>
      </div>
    );
  };
  
  export default ChatWindow;
  