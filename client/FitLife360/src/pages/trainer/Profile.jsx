import React, { useState } from 'react'
import { FaPhone, FaPen, FaArrowRight, FaMailBulk } from 'react-icons/fa';
import gym from '../../assets/gym4.jpg'
const Profile = ({trainer}) => {

  const fitnessClasses = [
    {
      name: 'Yoga Class',
      description: 'A class that focuses on stretching, breathing, and meditation to improve flexibility and balance.',
      duration: '30 minutes',
      capacity: '10',
      datetime: '2022-01-01T10:00:00Z'
    },
    {
      name: 'Pilates Class',
      description: 'A class that focuses on building strength and flexibility through a combination of core and leg exercises.',
      duration: '45 minutes',
      capacity: '20',
      datetime: '2022-01-02T14:00:00Z'
    },
    {
      name: 'Pilates Class',
      description: 'A class that focuses on building strength and flexibility through a combination of core and leg exercises.',
      duration: '45 minutes',
      capacity: '20',
      datetime: '2022-01-02T14:00:00Z'
    },
    {
      name: 'Zumba Class',
      description: 'A class that focuses on dance and fitness through a combination of bodyweight exercises and partner dancing.',
      duration: '60 minutes',
      capacity: '15',
      datetime: '2022-01-03T16:00:00Z'
    },
    {
      name: 'Zumba Class',
      description: 'A class that focuses on dance and fitness through a combination of bodyweight exercises and partner dancing.',
      duration: '60 minutes',
      capacity: '15',
      datetime: '2022-01-03T16:00:00Z'
    }
  ];

  const [name, setName] = useState('John Doe');
  const [bio, setBio] = useState('bio');
  const [experience, setExperience] = useState(5);
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [picture, setPicture] = useState(gym)
  const [phone, setPhone] = useState('123456789')
  const [approach, setApproach] = useState('1-on-1 personal training, Group fitness class')
  const [specializations, setSpecializations] = useState('Strength training, Weight loss training')
  const [classes, setClasses] = useState(fitnessClasses)
  return (
    <div className='bg-primary'>
      <div className="relative flex justify-between items-center mb-5">
      <div className="w-full my-8 flex items-start ml-3 sm:w-[50%] h-full text-center space-x-5 m-7 text-2xl font-bold">
        <div className="w-20 h-20">
          <img
            src={picture}
            alt={name}
            className="w-full h-full object-cover rounded-full border-4 border-white"
          />
        </div>  
        <div>
          <h2>{name}</h2>
        </div>
      </div>

        
      </div>
      <div className='bg-secondary flex justify-evenly my-5 py-10'>
        <div className=' border-x border-footer bg-footer space-y-3 text-white flex flex-col justify-center shadow-sm rounded-bl-lg rounded-tr-lg min-h-40 max-h-fit w-1/4'>
          <h3 className='text-center pt-2'>Experience</h3>
          <p className='p-3'>{experience}+ years of experience in the fitness industry</p>
          <p className='p-3'>Gender: {gender}</p>
          <p className='flex space-x-4 px-3'><FaMailBulk size={20} className='' /> {email}</p>
          <p className='flex space-x-4 px-3'><FaPhone size={20} className='' /> {phone}</p>
        </div>
        <div className=' border-x border-footer bg-footer space-y-3 text-white flex flex-col justify-center shadow-sm rounded-bl-lg rounded-tr-lg min-h-40 max-h-fit w-1/4'>
          <h3 className='text-center pt-2'>Training Approach</h3>
          <div className='p-4'>
          {
            approach.split(', ').map(app => <p className='px-3' key={app}>{app}</p>)
          }
          </div>
        </div>
        <div className=' border-x border-footer bg-footer space-y-3 text-white flex flex-col justify-center shadow-sm rounded-bl-lg rounded-tr-lg min-h-40 max-h-fit w-1/4'>
          <h3 className='text-center pt-2'>Training Specialties</h3>
          <div className='p-4'>
          {
            specializations.split(', ').map(spec => <p className='px-3' key={spec}>{spec}</p>)
          }
          </div>
        </div>
      </div>
      <div>
        <h2 className='text-center font-bold text-xl mb-8'>Classes</h2>
        <div className='flex flex-wrap justify-evenly max-h-fit'>
          {classes.map((cls, i) => (
            <div className='border border-x-primary space-y-3 flex flex-col shadow-sm rounded-ss-lg rounded-ee-lg bg-white min-w-[200px] max-w-[300px] max-h-[350px] w-1/4 m-2' key={i}>
              <h3 className='text-center pt-2'>{cls.name}</h3>
              <div className='p-4'>
                <p className='px-3 truncate text-sm'>{cls.description}</p>
                <p className='px-3 truncate text-sm'>Duration: {cls.duration}</p>
                <p className='px-3 truncate text-sm'>Capacity: {cls.capacity}</p>
                <p className='px-3 truncate text-sm'>Date: {new Date(cls.datetime).toLocaleDateString()}</p>
                <p className='px-3 truncate text-sm'>Time: {new Date(cls.datetime).toLocaleTimeString()}</p>
              </div>
              <div className='flex justify-center pb-4'>
              {
                trainer === 'Trainer' ? <button className='bg-primary px-8 py-2 text-white flex rounded-full justify-center hover:bg-footer'>Edit Class<FaPen size={15} className='m-1' /></button> : <button className='bg-primary px-8 py-2 text-white flex rounded-full justify-center hover:bg-footer'>
                    Book Class <FaArrowRight size={15} className='m-1'/>
                  </button> 
              }
              </div>
              
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Profile