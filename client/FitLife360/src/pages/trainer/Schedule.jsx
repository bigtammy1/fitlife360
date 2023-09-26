import React from 'react';
import { FaCalendar, FaClock } from 'react-icons/fa';

const Schedule = () => {
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

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 max-w-screen-md w-full">
        <h1 className="text-2xl font-semibold text-secondary font-font1 mb-4">Fitness Class Schedule</h1>
        <div className="space-y-4">
          {fitnessClasses.map((classItem, index) => (
            <div
              key={index}
              className="border rounded-md p-4 hover:bg-gray-200 transition duration-300 flex items-center"
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
                  {classItem.datetime}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  <span className="font-semibold">Description:</span> {classItem.description}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  <span className="font-semibold">Duration:</span> {classItem.duration}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  <span className="font-semibold">Capacity:</span> {classItem.capacity} attendees
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
