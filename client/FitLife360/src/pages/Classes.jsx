import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import PropTypes from 'prop-types';

const url = import.meta.env.VITE_BACKEND_URL;

const Classes = ({ login, token, username }) => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    axios
     .get(`${url}/api/classes`, {
        headers: {
          Authorization: token,
        },
      })
     .then((res) => {
        setClasses(res.data);
      })
     .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const bookClass = (id) => {
    axios
     .put(`${url}/api/class/${id}/book`, {}, {
        headers: {
          'Authorization': token,
        },
      })
     .then((res) => {
        console.log(res.data);
      })
     .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar username={username} login={login} token={token} />
      <main className="container mx-auto px-4">
        <Hero />
        <div className="my-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Classes</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {classes.map((c) => {
              return (
                <div key={c.id} className="bg-white p-8 shadow-md rounded">
                  <h5 className="text-xl font-bold mb-2">{c.name}</h5>
                  <p className="text-gray-600 mb-2">Description: {c.description}</p>
                  <p className="text-gray-600 mb-2">Time: {c.date_and_time}</p>
                  <p className="text-gray-600 mb-2">Duration: {c.duration_minutes} minutes</p>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                    onClick={() => {
                        setSelectedClass(c)
                        setIsModalOpen(true)}
                    }
                  >
                    View Class
                  </button>
                </div>
              );
            })}
          </div>
          {
            isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                  
                    <div className="bg-white p-8 shadow-md rounded">
                    <h5 className="text-xl font-bold mb-2">{selectedClass.name}</h5>
                    <p className="text-gray-600 mb-2">Description: {selectedClass.description}</p>
                    <p className="text-gray-600 mb-2">Time: {selectedClass.date_and_time}</p>
                    <p className="text-gray-600 mb-2">Duration: {selectedClass.duration_minutes} minutes</p>
                    <p className="text-gray-600 mb-4">Capacity: {selectedClass.capacity}</p>
                    <div className="flex justify-between mt-3">
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                            onClick={() => {
                                setIsModalOpen(false)
                                setSelectedClass()
                            }}
                        >
                            Close
                        </button>
                        <button
                            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                            onClick={() => bookClass(selectedClass.id)}
                        >
                            Book Class
                        </button>
                    </div>
                    </div>
                </div>
            )

          }
        </div>
      </main>
      <Footer />
    </>
  );
};

Classes.propTypes = {
  login: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default Classes;
