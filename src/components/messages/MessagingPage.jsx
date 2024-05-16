import React, { useState } from 'react';
import ClientsList from './ClientsList';
import ChatWindow from './ChatWindow';
import ClientData from './ClientData';
import './MessagingPage.css'; // Adjust the path as necessary

// Sample data for demonstration purposes
const clientsData = [
    {
      id: 1,
      name: "Client A",
      bio: "Bio of Client A...",
      messages: [
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" }, { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        { id: 1, text: "Hello, can you help me with my trip?", sender: "Client A", timestamp: "10:00 AM" },
        { id: 2, text: "Sure, I would be happy to help!", sender: "Tour Guide", timestamp: "10:02 AM" },
        // Add more messages as needed
      ]
    },
    {
      id: 2,
      name: "Client B",
      bio: "Bio of Client B...",
      messages: [
        { id: 1, text: "I have some questions about the tour.", sender: "Client B", timestamp: "09:45 AM" },
        { id: 2, text: "Feel free to ask me anything!", sender: "Tour Guide", timestamp: "09:47 AM" },
        // Add more messages as needed
      ]
    },
    // Add more clients as needed
  ];

const MessagingPage = () => {
  const [selectedClientId, setSelectedClientId] = useState(null);

  const selectedClient = clientsData.find(client => client.id === selectedClientId);

  
  return (
    <div className="messaging-page">
      <div className="clients-list">
        <ClientsList clients={clientsData} onSelectClient={setSelectedClientId} />
      </div>
      <div className="chat-window">
        {selectedClient && <ChatWindow client={selectedClient} />}
      </div>
      <div className="client-data">
        {selectedClient && <ClientData client={selectedClient} />}
      </div>
    </div>
  );
};

export default MessagingPage;
