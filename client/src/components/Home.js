import React from "react";
import {Link} from 'react-router-dom'
import { useAuth } from "../auth";

const LoggedInHome=()=>{
    return (
        <div className="list">
            List of yours
        </div>
    )
}

const LoggedOutHome=() => {
    return (
        <div className="home container">
            <h1 className="heading">welcome to MouZa </h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}
const HomePage = ()=>{

    const [logged] = useAuth()
    return(
        <div>
            {logged?<LoggedInHome/>:<LoggedOutHome/>}
        </div>
        
    )
}
export default HomePage