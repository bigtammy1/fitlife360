import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaCalendar, FaCheck, FaClock, FaEdit, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import propTypes from 'prop-types'
const url = import.meta.env.VITE_BACKEND_URL;

const Schedule = ({ token }) => {
  const [classes, setClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [classModal, setClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date_and_time: '',
    duration_minutes: '',
    capacity: '',
  });
  const [classData, setClassData] = useState({
    name: '',
    description: '',
    location: '',
    date_and_time: '',
    duration_minutes: '',
    capacity: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const modalRef = useRef(null);
  const fitnessClasses = [
    {
      name: 'Yoga Class',
      description: 'A class that focuses on stretching, breathing, and meditation to improve flexibility and balance.',
      duration_minutes: '30 minutes',
      capacity: '10',
      date_and_time: '2022-01-01T10:00:00Z'
    },
    {
      name: 'Pilates Class',
      description: 'A class that focuses on building strength and flexibility through a combination of core and leg exercises.',
      duration_minutes: '45 minutes',
      capacity: '20',
      date_and_time: '2022-01-02T14:00:00Z'
    },
    {
      name: 'Pilates Class',
      description: 'A class that focuses on building strength and flexibility through a combination of core and leg exercises.',
      duration_minutes: '45 minutes',
      capacity: '20',
      date_and_time: '2022-01-02T14:00:00Z'
    },
    {
      name: 'Zumba Class',
      description: 'A class that focuses on dance and fitness through a combination of bodyweight exercises and partner dancing.',
      duration_minutes: '60 minutes',
      capacity: '15',
      date_and_time: '2022-01-03T16:00:00Z'
    },
    {
      name: 'Zumba Class',
      description: 'A class that focuses on dance and fitness through a combination of bodyweight exercises and partner dancing.',
      duration_minutes: '60 minutes',
      capacity: '15',
      date_and_time: '2022-01-03T16:00:00Z'
    }
  ];
  useEffect(() => {
    axios.get(`${url}/api/trainer/classes`, {
        headers: {
          'Authorization': token
        }
      })
      .then(res => {
        const classes = res.data;
        setClasses(classes)
      })
      .catch(err => console.error(err));
  }, [token])
  const data = classes.length > 1 ? classes : fitnessClasses

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const classChange = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setClassModal(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const createClass = async (e) => {
    e.preventDefault()
    axios.post(`${url}/api/class`, formData, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log(res.data.message)
      setModal(false)
      window.location.reload()
    }).catch(err => console.log(err))
  }
  const handleDelete = (id) => {
    axios
      .delete(`${url}/api/class/${id}`)
      .then(res => {
        alert(res.data.message);
        setClassModal(false);
        console.log(res.data.message);
        window.location.reload()
      } )
      .catch(err => console.error(err));
  }
  const handleSaveChanges = (id) => {
    axios.put(`${url}/api/class/${id}`, classData, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    }).then(res => {
      console.log(res.data)
    }).catch(err => console.log(err))
  }
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center cursor-pointer">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
        <div className='flex justify-between'>
          <h1 className="text-2xl font-semibold text-secondary font-font1 mb-4">Fitness Class Schedule</h1>
          <FaPlus className='text-primary hover:text-primary/70' cursor={'pointer'} onClick={() => setModal(true)} size={25}/>
          </div>
          {modal && (
            <div className='z-10 bg-inherit rounded-lg fixed shadow-md transition-all duration-200 top-1 right-1 overflow-auto w-[80%] h-screen'>
              <div className='flex justify-between m-4'>
                <h2 className='font-semibold text-2xl text-primary'>Create Class</h2>
                <FaTimes onClick={() => setModal(false)} size={25} className='text-primary hover:text-primary/70' cursor={'pointer'}/>
              </div>
              <form className='m-4 p-2' onSubmit={createClass}>
                <div className='mb-4 relative '>
                  <label className="py-3" htmlFor="name">Name of class</label>
                  <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="name"
                  type='text'
                  placeholder='Name of class'
                  value={formData.name}
                  onChange={handleChange}
                />
                </div>
                <div className='mb-4 relative'>
                  <label className="py-3" htmlFor="description">Class description (Maximum length = 300)</label>
                  <textarea
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="description"
                  placeholder='Class description'
                  value={formData.description}
                  maxLength={300}
                  onChange={handleChange}
                />
                </div>
                <div className='mb-4 relative'>
                  <label className="py-3" htmlFor="location">Location</label>
                  <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="location"
                  type='text'
                  placeholder='Class location'
                  value={formData.location}
                  onChange={handleChange}
                />
                </div>
                <div className='mb-4 relative'>
                  <label className="py-3" htmlFor="date_and_time">Date and Time</label>
                  
                  <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="date_and_time"
                  type='datetime-local'
                  pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}"
                  placeholder="Please enter date and time in the format YYYY-MM-DDTHH:MM (e.g., 2022-01-01T10:00)"
                  value={formData.date_and_time}
                  onChange={handleChange}
                />
                </div>
                <div className='mb-4 relative'>
                  <label className="py-3" htmlFor="duration_minutes">Duration</label>
                  <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="duration_minutes"
                  type='number'
                  placeholder='Duration in minutes'
                  value={formData.duration_minutes}
                  onChange={handleChange}
                />
                </div>
                <div className='mb-4 relative'>
                  <label className="py-3" htmlFor="capacity">Capacity</label>
                  <input
                  className="pl-10 p-3 w-full rounded-md text-black border-2 border-primary"
                  name="capacity"
                  type='number'
                  placeholder='Capacity'
                  value={formData.capacity}
                  onChange={handleChange}
                />
                </div>
                <button type="submit" className="mt-2 p-3 w-full rounded-md bg-primary text-white hover:bg-primary-dark">Submit</button>
              </form>
            </div>
          )}
          <div className="space-y-4">
            {data.map((classItem, index) => (
              <div
                key={index}
                className="border rounded-md p-4 hover:bg-gray-200 transition duration-300 flex items-center"
                onClick={() => {
                  setSelectedClass(data[index])
                  setClassModal(true)
                }}
              >
                <div className="text-primary text-xl mr-3">
                  <FaCalendar />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{classItem.name}</div>
                  <div className="text-gray-600 text-sm flex items-center"> {/* Wrap the clock icon and time in a div */}
                    <div className="mr-1">
                      <FaClock />
                    </div>
                    {classItem.date_and_time}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    <span className="font-semibold">Description:</span> {classItem.description}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    <span className="font-semibold">Duration:</span> {classItem.duration_minutes}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    <span className="font-semibold">Capacity:</span> {classItem.capacity} attendees
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
              {
                classModal && (
                  <div ref={modalRef}
                   className='fixed top-0 right-0 w-1/2 rounded-s-2xl bg-secondary h-full z-10 text-white justify-center'>
                    <div className='m-8'>
                      <div className='flex mt-8 mb-4 justify-between'>
                        <h2 className='font-bold text-2xl'>{isEditing ? 'Edit Class' : selectedClass.name}</h2>
                        {isEditing ? (
                          <div className='flex space-x-4 cursor-pointer'>
                            <FaCheck size={25} className='text-white' onClick={() => handleSaveChanges(selectedClass.id)} />
                            <FaTimes size={25} className='text-white' onClick={() => setIsEditing(false)} />
                          </div>
                        ) : (
                          <div className='flex space-x-4 cursor-pointer'>
                            <FaTrash size={25} className='text-white' onClick={handleDelete(selectedClass.id)} />
                            <FaEdit size={25} onClick={() => setIsEditing(true)} />
                          </div>
                      )}
                      </div>
                      {
                        isEditing && (
                        <div className="mb-4">
                          <p className='text-base'>Name</p>
                          <input
                            name="name"
                            value={classData.name}
                            onChange={classChange}
                            className="pl-3 p-2 w-full rounded-md text-black border-2 border-primary"
                          />
                        </div>
                        )
                      }
                      <div className="mb-4">
                        <p className='text-base'>Description</p>
                        {isEditing ? (
                          <input
                            name="description"
                            value={classData.description}
                            onChange={classChange}
                            className="pl-3 p-2 w-full rounded-md text-black border-2 border-primary"
                          />
                        ) : (
                          <p className='text-lg'>{selectedClass.description}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className='text-base'>Location</p>
                        {isEditing ? (
                          <input
                            name="location"
                            value={classData.location}
                            onChange={classChange}
                            className="pl-3 p-2 w-full rounded-md text-black border-2 border-primary"
                          />
                        ) : (
                          <p className='text-lg'>{selectedClass.location}</p>
                        )}                               
                      </div>
                          
                      <div className="mb-4">
                        <p className='text-base'>Date and Time</p>
                        {isEditing ? (
                          <input
                            name="date_and_time"
                            value={classData.date_and_time}
                            onChange={classChange}
                            className="pl-3 p-2 w-full rounded-md text-black border-2 border-primary"
                          />
                          ) : (
                            <p className='text-lg'>{selectedClass.date_and_time}</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className='text-base'>Duration</p>
                        {isEditing ? (
                          <input
                            name="duration_minutes"
                            value={classData.duration_minutes}
                            onChange={classChange}
                            className="pl-3 p-2 w-full rounded-md text-black border-2 border-primary"
                          />
                          ) : (
                            <p className='text-lg'>{selectedClass.duration_minutes} minutes</p>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className='text-base'>Capacity</p>
                        {isEditing ? (
                          <input
                            name="capacity"
                            value={classData.capacity}
                            onChange={classChange}
                            className="pl-3 p-2 w-full rounded-md text-black border-2 border-primary"
                          />
                        ) : (
                          <p className='text-lg'>{selectedClass.capacity}</p>
                        )}
                      </div>
                       <h3 className='text-xl'>Members</h3> 
                       {
                        selectedClass.class_users.map((member, index) => (
                          <div key={index} className='flex items-center justify-around'>
                            <p className='text-lg'>{member.username}</p>
                            <p className='text-lg'>{member.email}</p>
                          </div>
                        ))
                       }
                    </div>
                  </div>
                )
              }
          </div>
      </div>
    </div>
  );
};

Schedule.propTypes = {
  token: propTypes.string.isRequired,
}

export default Schedule;
