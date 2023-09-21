import React, {useState} from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Classes = ({login, setLogin}) => {
    return(
        <>
        <Navbar login={login} setLogin={setLogin} />
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