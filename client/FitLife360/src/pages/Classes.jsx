import React, {useState} from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Classes = ({login, setLogin, token}) => {
    const [classes, setClasses] = useState([])
    return(
        <>
        <Navbar login={login} setLogin={setLogin} token={token} />
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