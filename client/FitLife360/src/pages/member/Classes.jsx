import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaCalendar, FaClock, FaTimes, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const url = import.meta.env.VITE_BACKEND_URL;

const MemberClasses = ({ token }) => {
  const [classes, setClasses] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
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
      axios.get(`${url}/api/member/classes`, {
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

    const handleDelete = (id) => {
      axios
        .delete(`${url}/api/class/${id}`)
        .then(res => {
          alert(res.data.message);
          setModal(false);
          console.log(res.data.message);
        } )
        .catch(err => console.error(err));
    }
  
    const modalRef = useRef(null);
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          setModal(false);
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
  
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
    const cla = classes.length >= 1 ? classes : fitnessClasses
      return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
            <div className="flex justify-between mb-2">
            <h1 className="text-2xl font-semibold text-secondary font-font1 mb-4">Fitness Class Schedule</h1>
            <Link to={'/classes'} className='rounded-lg bg-primary hover:bg-primary/70 py-2 px-7 text-white mb-4'>Add a class</Link>
            </div>
            
            <div className="space-y-4">
              {cla.map((classItem, index) => (
                <div
                  key={index}
                  className="border rounded-md p-4 hover:bg-gray-200 transition duration-300 flex items-center cursor-pointer"
                  onClick={() => {
                    setSelectedClass(cla[index])
                    setModal(true)
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
                      <span className="font-semibold">Duration:</span> {classItem.duration_minutes} minutes
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
                modal && (
                  <div ref={modalRef}
                   className='fixed top-0 right-0 w-1/2 rounded-s-2xl bg-secondary h-full z-10 text-white justify-center'>
                    <div className='m-8'>
                      <div className='flex mt-8 mb-4 justify-between'>
                        <h2 className='font-bold text-2xl'>{selectedClass.name}</h2>
                        <FaTimes size={25} className='text-white' onClick={() => setModal(false)} />
                      </div>
                      <div className="mb-4">
                        <p className='text-base'>Description</p>
                        <p className='text-lg'>{selectedClass.description}</p>
                      </div>
                      <div className="mb-4">
                        <p className='text-base'>Location</p>
                        <p>{selectedClass.location}</p>                                                
                      </div>
                      <div className="mb-4">
                        <p className='text-base'>Date and Time</p>
                        <p>{selectedClass.date_and_time}</p>
                      </div>
                      <div className="mb-4">
                        <p className='text-base'>Duration</p>
                        <p>{selectedClass.duration_minutes} minutes</p>
                      </div>
                      <div className="mb-4">
                        <p className='text-base'>Capacity</p>
                        <p>{selectedClass.capacity}</p>
                      </div>
                      <div className="float-right mt-5 flex">
                      <FaTrash size={25} className='text-white' onClick={handleDelete(selectedClass.id)} />
                      </div>
                      
                  </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
     );
}

MemberClasses.propTypes = {
  token: PropTypes.string.isRequired
}

export default MemberClasses;