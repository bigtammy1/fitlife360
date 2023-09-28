import React, { useEffect, useState } from 'react';
import pic from '../../assets/person1.jpg';
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;

const TrainerProfile = ({ token }) => {
  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState("As a certified gym instructor, I bring knowledge and expertise to help you reach your fitness goals. Whether you're aiming to build strength, shed those extra pounds, or improve your overall health, I've got you covered.");
  const [experience, setExperience] = useState(5);
  const [email, setEmail] = useState('john@example.com')
  const [gender, setGender] = useState('male')
  const [picture, setPicture] = useState(pic)
  const [phone, setPhone] = useState('+123-456-7890')
  const [approach, setApproach] = useState('1-on-1 personal training, Group fitness class')
  const [specializations, setSpecializations] = useState('Strength training, Weight loss training, Personal Training')

  useEffect(() => {
    axios
      .get(`${url}/trainer`)
      .then(res => {
        const profile = res.data;
        setApproach(profile.approach);
        setName(profile.name);
        setExperience(profile.experience);
        setEmail(profile.email);
        setGender(profile.gender);
        setPicture(profile.picture);
        setPhone(profile.phone);
        setSpecializations(profile.specializations);
      })
      .catch(err => console.error(err));
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 text-center">
            <img
              src={picture}
              alt="Trainer"
              className="w-32 h-32 mx-auto rounded-full"
            />
            <button className='bg-primary text-white rounded-md font-medium p-2 mt-5 mx-auto md:mx-0 py-3 font-font2'>Edit Profile</button>
          </div>
          <div className="md:w-3/4 mt-4 md:mt-0 md:pl-4">
            <h1 className="text-2xl font-semibold text-secondary font-font1">{name}</h1>
            <p className="text-gray-500 font-font2 text-sm">Certified Gym Trainer</p>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">About Me</h2>
              <p className="text-gray-600 font2 mt-2">
                {bio}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">Contact Information</h2>
              <ul className="list-disc list-inside text-gray-600 mt-2 font2">
                <li>Email: {email}</li>
                <li>Phone: {phone}</li>
                <li>Gender: {gender.charAt(0).toUpperCase() + gender.slice(1) }</li>
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">Services</h2>
              <ul className="list-disc list-inside text-gray-600 font2 mt-2">
                {
                  specializations.split(', ').map(specialization => (
                    <li key={specialization}>{specialization}</li>
                  ))
                }
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
