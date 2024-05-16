import React from 'react';
import './InboxComponent.css'; // Make sure to create and link the CSS file

const InboxComponent = ({ messages }) => {
  return (
    <div className="inbox-container">
      <div className="inbox-header">
        <h3>Inbox</h3>
        <p>view all</p>
      </div>
      <div className="messages-list">
        {messages.map((message, index) => (
          <div key={index} className="message-item">
            <p><strong>{message.senderName}:</strong> {message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxComponent;
