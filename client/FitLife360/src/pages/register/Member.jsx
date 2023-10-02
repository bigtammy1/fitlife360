import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Gym from '../../assets/gym1.jpg';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

const MemberProfile = ({ setLogin, token }) => {
  const navigate = useNavigate();

  // Initialize form state with default values
  const [formData, setFormData] = useState({
    picture: null,
    weight: '',
    height: '',
    age: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [spin, setSpin] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        picture: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    await axios.post(`${url}/api/member/create_profile`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': token
      }
    })
      .then(response => {
        setSuccessMessage(response.data.message);
        setLogin(true);
        setFormData({
        picture: null,
        weight: '',
        height: '',
        age: '',
      });
        navigate('/member');
      })
      .catch(error => {
        console.error('Error:', error.response.data);
        setErrorMessage(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-[1240px] mx-auto flex flex-col gap-8 md:flex-row md:items-center">
          <div className="hidden md:block md:w-1/2">
            <img
              className="w-[400px] h-[400px] mx-auto my-4 rounded-lg shadow-lg"
              src={Gym}
              alt="Gym"
            />
          </div>
          <div className="md:w-1/2 border-2 border-primary rounded-md font-font2 p-4">
            <div>
              {successMessage && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">{successMessage}</span>
                </div>
              )}
            </div>
            <h1 className="md:text-4xl sm:text-3xl text-2xl text-center font-bold py-2 font-font1 text-primary">
              Member Registration
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="picture">Profile picture</label>
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="file"
                  accept="image/*" // Accept only image files
                  name="picture"
                  onChange={handlePictureChange}
                />
              </div>
              <div className="relative mb-4">
                <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="weight"
                  placeholder="Input your weight in Kilograms"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
              <div className="relative mb-4">
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="height"
                  placeholder="Input your height in meters"
                  value={formData.height}
                  onChange={handleChange}
                />
                <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative mb-4">
                <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  type="number"
                  name="age"
                  placeholder="Input your age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="mt-2 p-3 w-full rounded-md bg-primary flex space-x-4 justify-center items-center text-white hover:bg-primary-dark"
              >
                <div>Create Profile</div> <div>{spin && <Circles height={12} width={12} color='white'/>}</div>
              </button>
            </form>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MemberProfile;
