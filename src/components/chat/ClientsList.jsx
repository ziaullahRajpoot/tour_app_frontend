import React from 'react';

const ClientsList = ({ clients, onSelectClient }) => {
  return (
    <div>
      <h5>Clients</h5>
      <ul className="list-group">
        {clients.map(client => (
          <li
            key={client.id}
            className="list-group-item"
            onClick={() => onSelectClient(client.id)}
            style={{ cursor: 'pointer' }}
          >
            {client.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsList;
