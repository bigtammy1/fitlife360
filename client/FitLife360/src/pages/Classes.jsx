import React, {useState} from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Classes = ({login, setLogin, setToken, token}) => {
    const [classes, setClasses] = useState([])
    return(
        <>
        <Navbar login={login} setToken={setToken} setLogin={setLogin} token={token} />
        <main className="container">
            <Hero/>
            <div>

            </div>
        </main>
        <Footer/>
        </>
    )
}

export default Classes;