import React from 'react';
import { FaUser } from 'react-icons/fa';

const ClientList = () => {
  // Sample list of clients for a trainer
  const clients = [
    {
      name: 'Client 1',
      email: 'client1@example.com',
      phone: '+123-456-7890',
    },
    {
      name: 'Client 2',
      email: 'client2@example.com',
      phone: '+987-654-3210',
    },
    {
      name: 'Client 3',
      email: 'client3@example.com',
      phone: '+345-678-9012',
    },
    {
      name: 'Client 4',
      email: 'client4@example.com',
      phone: '+567-890-1234',
    },
    {
      name: 'Client 5',
      email: 'client5@example.com',
      phone: '+789-012-3456',
    },
    {
      name: 'Client 6',
      email: 'client6@example.com',
      phone: '+234-567-8901',
    },
  ];

  const truncateEmail = (email) => {
    const maxLength = 10; 
    if (email.length > maxLength) {
      return email.slice(0, maxLength) + '...';
    }
    return email;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-4xl w-full">
        <h1 className="text-2xl font-semibold text-secondary font-font1 mb-4">Client List</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {clients.map((client, index) => (
            <div
              key={index}
              className="border rounded-md p-4 hover:bg-gray-200 transition duration-300 flex items-center"
            >
              <div className="text-primary text-xl mr-3">
                <FaUser />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{client.name}</div>
                <div className="text-gray-600 text-sm">{truncateEmail(client.email)}</div>
                <div className="text-gray-500 text-xs mt-1">{client.phone}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientList;
