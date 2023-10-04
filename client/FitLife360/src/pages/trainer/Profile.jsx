import { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineFileText, AiOutlineUser } from 'react-icons/ai';
import { FaPhone, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import propTypes from 'prop-types';

const url = import.meta.env.VITE_BACKEND_URL;


const TrainerProfile = ({ token }) => {
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('');
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [picture, setPicture] = useState(null);
  const [phone, setPhone] = useState('');
  const [approaches, setApproaches] = useState('');
  const [specializations, setSpecializations] = useState('');

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedBio, setEditedBio] = useState(bio);
  const [editedPhone, setEditedPhone] = useState(phone);
  const [editedExperience, setEditedExperience] = useState(experience);
  const [editedApproaches, setEditedApproaches] = useState(approaches.split(', '));
  const [editedPicture, setEditedPicture] = useState('');
  const [editedSpecializations, setEditedSpecializations] = useState(specializations.split(', '));

  // Function to handle profile edit submission
  const handleProfileEditSubmit = async () => {
    // Send a PUT request to update the profile details on the backend
    try {
      const response = await axios.put(
        `${url}/api/trainer`,
        {
          name: editedName,
          bio: editedBio,
          phone: editedPhone,
          experience: editedExperience,
          approaches: editedApproaches,
          specializations: editedSpecializations,
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
      setBio(editedBio);
      setPhone(editedPhone);
      setExperience(editedExperience);
      setApproaches(editedApproaches.join(', '));
      setSpecializations(editedSpecializations.join(', '));
      setPicture(editedPicture);
      setIsProfileModalOpen(false); // Close the modal after editing
      window.location.reload()
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  const handleApproachChange = (index, value) => {
    const updatedApproaches = [...editedApproaches];
    updatedApproaches[index] = value;
    setEditedApproaches(updatedApproaches);
  };

  const removeApproachInput = (index) => {
    const updatedApproaches = [...editedApproaches];
    if (updatedApproaches.length > 1) {
    updatedApproaches.splice(index, 1); // Remove the approach input at the specified index
    setEditedApproaches(updatedApproaches);
    }
  };

  const handleSpecializationChange = (index, value) => {
    const updatedSpecializations = [...editedSpecializations];
    updatedSpecializations[index] = value;
    setEditedSpecializations(updatedSpecializations);
  };

  const removeSpecializationInput = (index) => {
    const updatedSpecializations = [...editedSpecializations];
    if (updatedSpecializations.length > 1) {
    updatedSpecializations.splice(index, 1); // Remove the approach input at the specified index
    setEditedSpecializations(updatedSpecializations);
    }
  };

  useEffect(() => {
    axios.get(`${url}/api/trainer`, {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        console.log(res.data);
        const profile = res.data;
        if (profile) {
          setApproaches(profile.approaches);
          setBio(profile.bio);
          setName(profile.name);
          setExperience(profile.experience);
          setEmail(profile.email);
          setGender(profile.gender);
          setPhone(profile.phone);
          setSpecializations(profile.specializations);
          setTimeout(() => {
            setPicture(profile.picture);
          }, 2000); 
        }
      })
      .catch(err => console.error(err));
  }, [token])
  const base64ToBinary = (base64Data) => {
    const binaryString = window.atob(base64Data);
    const binaryData = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }

    return new Blob([binaryData]);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 text-center text-white" id='pictu'>
          {
            visible && (
                <img
                    src={picture ? URL.createObjectURL(base64ToBinary(picture)) : ''}
                    alt="Trainer picture"
                    className="w-32 h-32 mx-auto rounded-full transition ease-in bg-primary/60"
                    onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop in case fallback image also fails to load
                        e.target.src = ''; // replace 'path_to_fallback_image' with the actual path to your fallback image
                        // or display an error message
                    }}
                />
            )
          }

            <button onClick={() => setIsProfileModalOpen(true)} className='bg-primary text-white rounded-md font-medium p-2 mt-5 mx-auto md:mx-0 py-3 font-font2'>Edit Profile</button>
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
              <h2 className="text-xl font-semibold text-secondary font-font1">Specialization</h2>
              <ul className="list-disc list-inside text-gray-600 font2 mt-2">
                {
                  specializations.split(', ').map(specialization => (
                    <li key={specialization}>{specialization}</li>
                  ))
                }   
              </ul>
            </div>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-secondary font-font1">Training Approach</h2>
              <ul className="list-disc list-inside text-gray-600 font2 mt-2">
                {
                  approaches.split(', ').map(approach => (
                    <li key={approach}>{approach}</li>
                  ))
                }   
              </ul>
            </div>
          </div>
        </div>
        {
          isProfileModalOpen && (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center z-50 absolute top-0 right-0 transition-all duration-500 overflow-auto">
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-lg w-full">
            {/* Your form */}
            <div className='flex justify-between'>
            <h1 className='text-center text-2xl font-bold m-5'>Edit your Trainer&apos;s profile</h1>
            <FaTimes size={25} className='text-primary cursor-pointer hover:text-secondary mt-3 hover:-translate-y-1' onClick={() => setIsProfileModalOpen(false)}/>
            </div>
            <form onSubmit={handleProfileEditSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {/* Other inputs */}
              <div className="relative mb-4">
                <label htmlFor="picture">Profile picture</label>
                <AiOutlineUser className="absolute left-3 mt-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="file"
                  accept="image/*" // Accept only image files
                  name="picture"
                  onChange={(e) => setEditedPicture(e.target.files[0])}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="name">Name</label>
                <AiOutlineUser className="absolute left-3 mt-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="name"
                  type='text'
                  placeholder={name}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="bio">Bio (Max 300 characters)</label>
                <AiOutlineFileText className="absolute left-3 mt-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <textarea
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="bio"
                  placeholder={bio}
                  value={editedBio}
                  onChange={(e) => setEditedBio(e.target.value)}
                  maxLength={300} // Set maximum length for bio
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="phone">Phone</label>
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="phone"
                  placeholder={phone}
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor='approach'>Approaches</label>
                {editedApproaches.map((approach, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      className="pl-10 p-3 flex-1 rounded-md text-black border-2 border-primary"
                      type="text"
                      name='approach'
                      placeholder={`Enter approach #${index + 1}`}
                      value={approach}
                      onChange={(e) => handleApproachChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="mt-1 ml-2 rounded-md p-2 hover:-translate-y-1 hover:bg-opacity-30 bg-red-500 text-white"
                      onClick={() => removeApproachInput(index)}
                    >
                      <FaTrashAlt/>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 p-2 rounded-full bg-green-500 text-white"
                  onClick={() => setEditedApproaches([...editedApproaches, ''])}
                >
                  Add Approach
                </button>
              </div>

              <div className="relative mb-4">
                <label htmlFor='approach'>Specializations</label>
                {editedSpecializations.map((specialization, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      className="pl-10 p-3 flex-1 rounded-md text-black border-2 border-primary"
                      type="text"
                      name='specialization'
                      placeholder={`Enter specialization #${index + 1}`}
                      value={specialization}
                      onChange={(e) => handleSpecializationChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="mt-1 ml-2 rounded-md p-2 hover:-translate-y-1 hover:bg-opacity-30 bg-red-500 text-white"
                      onClick={() => removeSpecializationInput(index)}
                    >
                      <FaTrashAlt/>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 p-2 rounded-full bg-green-500 text-white"
                  onClick={() => setEditedSpecializations([...editedSpecializations, ''])}
                >
                  Add Specialization
                </button>
              </div>
              <div className="relative mb-4">
                <label htmlFor='experience'>Experience</label>
                <BsFillBriefcaseFill className="absolute left-3 mt-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="experience"
                  placeholder="Your experience in years"
                  value={experience}
                  onChange={(e) => setEditedExperience(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary text-white hover:bg-primary-dark"
              >
                Save
              </button>
            
            </form>
          </div> 
            </div>
          )
        }
      </div>
    </div>
  );
};

TrainerProfile.propTypes = {
  token: propTypes.string.isRequired,
};

export default TrainerProfile;
