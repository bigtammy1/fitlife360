import React from 'react';
import { FaEnvelope, FaClock } from 'react-icons/fa';

const MemberMessages = ({ token }) => {
    const messages = [
        {
          sender: 'Big Tammy',
          message: 'Hi, I have a question about my workout routine.',
          timestamp: '5 hours ago',
        },
        {
          sender: 'Morakinyo',
          message: 'Hello, please I need some healthy nutrition tips?',
          timestamp: '2 day ago',
        },
        {
          sender: 'Adeh Naija',
          message: 'I need advice on improving my form during squats.',
          timestamp: '5 days ago',
        },
      ];
    
      return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
            <h1 className="text-2xl font-semibold text-secondary font-font1 mb-4">Messages</h1>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 hover:bg-gray-200 transition duration-300 flex items-center"
                >
                  <div className="text-primary text-xl mr-3">
                    <FaEnvelope />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold font-font1">{message.sender}</div>
                    <div className="text-gray-600 font-font2 text-sm">{message.message}</div>
                    <div className="text-gray-500 text-xs mt-1 flex items-center">
                      <FaClock className="mr-1" />
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}
 
export default MemberMessages;