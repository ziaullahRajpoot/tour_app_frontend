const ClientsList = ({ clients, onSelectClient }) => {
    return (
      <ul>
        {clients.map(client => (
          <li key={client.id} onClick={() => onSelectClient(client.id)}>
            {client.name}
          </li>
        ))}
      </ul>
    );
  };

export default ClientsList;