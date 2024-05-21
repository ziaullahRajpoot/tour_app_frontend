import React from 'react';

const ClientData = ({ client }) => {
  return (
    <div className="">
      <h2>{client.name}</h2>
      <p>{client.bio}</p>
    </div>
  );
};

export default ClientData;
