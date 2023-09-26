import React from 'react';
import pic from '../../assets/person1.jpg';

const TrainerProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 text-center">
            <img
              src={pic}
              alt="Trainer"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <button className='bg-primary text-white rounded-md font-medium p-2 mt-5 mx-auto md:mx-0 py-3 font-font2'>Edit Profile</button>
          </div>
          <div className="md:w-3/4 mt-4 md:mt-0 md:pl-4">
            <h1 className="text-2xl font-semibold text-secondary font-font1">John Doe</h1>
            <p className="text-gray-500 font-font2 text-sm">Certified Gym Trainer</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">About Me</h2>
              <p className="text-gray-600 font2 mt-2">
                As a certified gym instructor, I bring knowledge and expertise to help you reach your fitness goals. Whether you're aiming to build strength, shed those extra pounds, or improve your overall health, I've got you covered.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">Contact Information</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2 font2">
                <li>Email: john@example.com</li>
                <li>Phone: +123-456-7890</li>
                <li>Gender: Male</li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">Services</h2>
              <ul className="list-disc list-inside text-gray-600 font2 mt-2">
                <li>Personal Training</li>
                <li>Weight Loss Programs</li>
                <li>Strength and Conditioning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
