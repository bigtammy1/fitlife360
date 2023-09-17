import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="text-6xl font-bold text-primary">404</div>
      <div className="text-2xl text-gray-700">Page Not Found</div>
      <p className="text-gray-600 text-center mx-auto mt-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="mt-6 text-primary hover:underline">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
