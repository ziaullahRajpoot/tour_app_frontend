// Renders data about the selected client
const ClientData = ({ client }) => {
    return (
      <div>
        <h3>{client.name}</h3>
        <p>{client.bio}</p>
      </div>
    );
  };

export default ClientData;