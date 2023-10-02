import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner'; // Import the loader component
import '../trainer/WelcomeTrainer.css'; // Import CSS for transitions

const WelcomeMember = ({ username }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // After 5 seconds, hide the component and redirect to the profile page
    const timer = setTimeout(() => {
      setVisible(false);
      navigate('/member/profile');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`fade-in-out ${
        visible ? 'opacity-100' : 'opacity-0'
      } text-center w-screen h-screen flex items-center space-y-10 justify-center fixed inset-0 bg-white`}
    >
      {visible ? (
        <div className='flex flex-col justify-center items-center space-y-10'>
          <h1 className="font-bold text-3xl transition duration-200">Welcome {username}</h1>
          <ColorRing
            color="#416982" // Loader color
            height={80} // Loader height
            width={80} // Loader width
          />
        </div>
      ) : (
        <h1 className="font-bold font-font1 text-3xl">Welcome {username}</h1>
      )}
    </div>
  );
};

export default WelcomeMember;
