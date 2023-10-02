import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import PropTypes from 'prop-types';

const url = import.meta.env.VITE_BACKEND_URL;

const Trainers = ({login, token, username}) => {
    const [trainers, setTrainers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTrainer, setSelectedTrainer] = useState(null);

    useEffect(() => {
        axios
            .get(`${url}/api/trainers`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                console.log(res.data);
                const filteredTrainers = res.data.filter((trainer) => trainer !== null && trainer.name !== null);
                setTrainers(filteredTrainers);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [token]);

    const base64ToBinary = (base64Data) => {
        const binaryString = window.atob(base64Data);
        const binaryData = new Uint8Array(binaryString.length);
    
        for (let i = 0; i < binaryString.length; i++) {
          binaryData[i] = binaryString.charCodeAt(i);
        }
    
        return new Blob([binaryData]);
      };

    return ( 
        <>
            <Navbar login={login} username={username} token={token} />
            <main className="container mx-auto px-4">
                <Hero />
                <div className="my-8">
                    <h1 className="text-3xl font-bold mb-8 text-center">Trainers</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {trainers.map((t) => {
                            return (
                                <div key={t.id} className="bg-white p-8 shadow-md rounded">
                                    <h5 className="text-xl font-bold mb-2">{t.name && t.name}</h5>
                                    <p className="text-gray-600 mb-2">Description: {t.bio && t.bio}</p>
                                    <p className="text-gray-600 mb-2">Specialty: {t.specializations && t.specializations}</p>
                                    <p className="text-gray-600 mb-2">Experience: {t.experience && t.experience} years</p>
                                    <button
                                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                                        onClick={() => {
                                            setSelectedTrainer(t)
                                            setIsModalOpen(true)}
                                        }
                                    >
                                        View Trainer
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    {
                        isModalOpen && (
                            <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-8 shadow-md rounded">
                                <div className="flex flex-col md:flex-row items-center">
                                    <div className="md:w-1/4 text-center text-white" id='pictu'>
                                        {
                                        <img
                                        src={selectedTrainer.picture ? URL.createObjectURL(base64ToBinary(selectedTrainer.picture)) : ''}
                                        alt="Trainer picture"
                                        className="w-32 h-32 mx-auto rounded-full transition ease-in bg-primary/60"
                                        />
                                        }
                    
                                    </div>
                                    <div className="md:w-3/4 mt-4 md:mt-0 md:pl-4">
                                        <h1 className="text-2xl font-semibold text-secondary font-font1">{selectedTrainer.name}</h1>
                                        <p className="text-gray-500 font-font2 text-sm">Certified Gym Trainer</p>

                                        <div className="mt-6">
                                        <h2 className="text-xl font-semibold text-secondary font-font1">About Me</h2>
                                        <p className="text-gray-600 font2 mt-2">
                                            {selectedTrainer.bio}
                                        </p>
                                        </div>

                                        <div className="mt-6">
                                        <h2 className="text-xl font-semibold text-secondary font-font1">Contact Information</h2>
                                        <ul className="list-disc list-inside text-gray-600 mt-2 font2">
                                            <li>Email: {selectedTrainer.email}</li>
                                            <li>Phone: {selectedTrainer.phone}</li>
                                            <li>Gender: {selectedTrainer.gender.charAt(0).toUpperCase() + selectedTrainer.gender.slice(1) }</li>
                                        </ul>
                                        </div>

                                        <div className="mt-6">
                                        <h2 className="text-xl font-semibold text-secondary font-font1">Specialization</h2>
                                        <ul className="list-disc list-inside text-gray-600 font2 mt-2">
                                            {
                                            selectedTrainer.specializations && selectedTrainer.specializations.split(', ').map(specialization => (
                                                <li key={specialization}>{specialization}</li>
                                            ))
                                            }   
                                        </ul>
                                        </div>
                                        
                                        <div className="mt-6">
                                        <h2 className="text-xl font-semibold text-secondary font-font1">Training Approach</h2>
                                        <ul className="list-disc list-inside text-gray-600 font2 mt-2">
                                            {
                                            selectedTrainer.approaches && selectedTrainer.approaches.split(', ').map(approach => (
                                                <li key={approach}>{approach}</li>
                                            ))
                                            }   
                                        </ul>
                                        </div>
                                    </div>
                                    </div>
                                    <button
                                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                                        onClick={() => {
                                            setIsModalOpen(false)}
                                        }
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </main>
            <Footer />
        </>
    );
}

Trainers.propTypes = {
    login: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
};

export default Trainers;
