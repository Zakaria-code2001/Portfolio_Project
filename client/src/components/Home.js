import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../auth";

const LoggedInHome = () => {
    return (
        <div className="list">
            List of yours
            <Link to='/playlists' className="btn btn-primary">Go to Playlists</Link>
        </div>
    )
}

const LoggedOutHome = () => {
    return (
        <div className="home-container">
            <h1 className="heading">Welcome to MouZa</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}

const HomePage = () => {
    const [logged] = useAuth();
    return (
        <div className="home-page" style={{backgroundImage: 'url("https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")'}}>
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>
    )
}

export default HomePage;
