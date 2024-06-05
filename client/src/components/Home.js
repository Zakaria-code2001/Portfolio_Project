import React from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../auth";

const LoggedInHome = () => {
    return (
        <div className="list">
            <Link to='/Playlists' className="btn btn-primary">Go to Playlists</Link>
        </div>
    )
}

const LoggedOutHome = () => {
    return (
        <div className="home-container">
            <h1 className="heading">Welcome to MouZa</h1>
            <div className="center-button">
            <Link to='/login' className="btn btn-primary btn-lg">Get Started</Link>
            </div>
        </div>
    )
}

const HomePage = () => {
    const [logged] = useAuth();
    return (
        <div className="home-page">
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>
    )
}

export default HomePage;