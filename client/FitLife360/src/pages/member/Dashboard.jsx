import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { FaPlus } from "react-icons/fa";
import {FcCheckmark} from "react-icons/fc";
import {HiXMark} from "react-icons/hi2";

const url = import.meta.env.VITE_BACKEND_URL;

function Dashboard({ token }) {

  const fitnessGoals = [
    { name: 'Run 5 miles', completed: false },
    { name: 'Complete 100 push-ups', completed: true },
    { name: 'Yoga for 30 minutes', completed: false },
    { name: 'Lift weights for an hour', completed: true },
    { name: 'Swim 10 laps', completed: false },
    { name: 'Practice meditation', completed: true }
  ];

  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('John Doe');
  const [weight, setWeight] = useState(80);
  const [age, setAge] = useState(5);
  const [email, setEmail] = useState('john@example.com');
  const [gender, setGender] = useState('male');
  const [picture, setPicture] = useState(null);
  const [phone, setPhone] = useState('+123-456-7890');
  const [height, setHeight] = useState(70);
  const [goals, setGoals] = useState(fitnessGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedHeight, setEditedHeight] = useState(height);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedAge, setEditedAge] = useState(age);
  const [editedWeight, setEditedWeight] = useState(weight);
  const [editedPicture, setEditedPicture] = useState('');

  // Function to handle profile edit submission
  const handleProfileEditSubmit = async () => {
    // Send a PUT request to update the profile details on the backend
    try {
      const response = await axios.put(
        `${url}/api/member`,
        {
          name: editedName,
          height: editedHeight,
          phone: editedPhone,
          age: editedAge,
          weight: editedWeight,
          picture: editedPicture
        },
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      console.log('Profile updated successfully:', response.data);
      // Update the local state with the edited profile details
      setName(editedName);
      setHeight(editedHeight);
      setPhone(editedPhone);
      setAge(editedAge);
      setWeight(editedWeight);
      setPicture(editedPicture);
      setIsProfileModalOpen(false); // Close the modal after editing
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  useEffect(() => {
    axios.get(`${url}/api/member`, {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        const profile = res.data;
        if (profile) {
          console.log(profile)
          setWeight(profile.weight);
          setName(profile.name);
          setAge(profile.age);
          setEmail(profile.email);
          setGender(profile.gender);
          setPhone(profile.phone);
          setHeight(profile.height);
          setPicture(profile.picture);
        }
      })
      .catch(err => console.error(err));
  }, [token])

  // convert base64 picture 
  const base64ToBinary = (base64Data) => {
    const binaryString = window.atob(base64Data);
    const binaryData = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }

    return new Blob([binaryData]);
  };
  // load picture after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    axios.get(`${url}/api/goals`, {
      headers: {
        'Authorization': token,
      }
    })
      .then(res => setGoals(res.data))
      .catch(err => console.error(err));
  })

  // edit goal
  const handleGoalClick = async (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = !updatedGoals[index].completed;
    console.log(updatedGoals[index])
    setGoals(updatedGoals);
    const id = updatedGoals[index].id
    await axios.put(`${url}/api/goal/${id}`, updatedGoals[index], {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(`Goal updated successfully:`, response.data);
    })
    .catch(error => {
      console.error(`Error updating goal:`, error);
    });
  };
  // open modal
  const handleClick = () => {
    setIsModalOpen(true);
  }
  // add goal
  const handleAddGoal = () => {
    if (newGoal.trim() === '') {
      alert('Goal name cannot be empty');
      return;
    }

    
    axios.post(`${url}/api/goals`, { name: newGoal, completed: false }, {
      headers: {
        'Authorization': token
      }
    })
    .then(response => {
      const goal = response.data.goal
      const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      setIsModalOpen(false);
      console.log('Goals updated successfully:', response.data.message);
    })
    .catch(error => {
      console.error('Error updating goals:', error);
    });
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Fitness Dashboard</h1>

        {/* User Profile */}
        <div className="flex items-center">
        <div className="md:w-1/4 text-center text-white" id='pictu'>
            {
              visible && <img
              src={picture ? URL.createObjectURL(base64ToBinary(picture)) : ''}
              alt="Trainer picture"
              className="w-32 h-32 mx-auto rounded-full transition ease-in bg-primary/60"
            />
            }
              
            <button onClick={() => setIsProfileModalOpen(true)} className='bg-primary text-white rounded-md font-medium p-2 mt-5 mx-auto md:mx-0 py-3 font-font2'>Edit Profile</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-4 w-full">
            <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="text-lg font-semibold">{name}</p>
              </div>
              <div>
                <p className="text-gray-600">Gender</p>
                <p className="text-lg font-semibold">{ gender.charAt(0).toUpperCase() + gender.slice(1) }</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="text-lg font-semibold">{ phone }</p>
              </div>
              <div>
                <p className="text-gray-600">Age</p>
                <p className="text-lg font-semibold">{age} years</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="text-lg font-semibold">{email}</p>
              </div>
              <div>
                <p className="text-gray-600">Height</p>
                <p className="text-lg font-semibold">{height}</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="text-lg font-semibold">{weight}</p>
              </div>
              <div>
                <p className="text-gray-600">BMI</p>
                <p className="text-lg font-semibold">{(weight/(height ^ 2)).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        {/* User Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="mb-4">
              <label htmlFor='picture' className="block text-gray-600 mb-1">Name</label>
              <input
                type="file"
                name='picture'
                value={editedPicture}
                onChange={(e) => setEditedPicture(e.target.files[0])}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='name' className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name='name'
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='age' className="block text-gray-600 mb-1">Age</label>
              <input
                type="number"
                name='age'
                value={editedAge}
                onChange={(e) => setEditedAge(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='phone' className="block text-gray-600 mb-1">Phone</label>
              <input
                type="tel"
                name='phone'
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='height' className="block text-gray-600 mb-1">Height</label>
              <input
                type="number"
                name='height'
                value={editedHeight}
                onChange={(e) => setEditedHeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor='weight' className="block text-gray-600 mb-1">Weight</label>
              <input
                type="number"
                name='weight'
                value={editedWeight}
                onChange={(e) => setEditedWeight(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 mr-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileEditSubmit}
                className="bg-primary text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Goals */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <div className='flex justify-between'>
            <h2 className="text-xl font-semibold text-gray-800">Goals</h2>
            <FaPlus size={25} onClick={handleClick} className='text-primary cursor-pointer'/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {
              goals.map((goal, index) => (
                <div key={index} className='flex justify-between'>
                  <p>{goal.name}</p>
                  <p onClick={() => handleGoalClick(index)} className='cursor-pointer'>{goal.completed ? <FcCheckmark size={20} className='text-primary'/> : <HiXMark size={20} className='text-secondary'/>}</p>
                </div>
              ))
            }
          </div>
          {isModalOpen && (
            <div className="fixed right-0 left-0 inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
                <input
                  type="text"
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Enter your goal"
                  className="w-full p-2 border outline-none border-gray-300 mb-4 rounded"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 mr-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddGoal}
                    className="bg-primary text-white px-4 py-2 rounded"
                  >
                    Add Goal
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Goal Modal */}
      

        {/* Charts */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Weekly Progress</h2>
          {/* Add your fitness progress chart component here */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
