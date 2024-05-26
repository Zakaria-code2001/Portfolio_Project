import React from "react";
import {Link} from 'react-router-dom'
const NavBar =()=>{
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand text-white" to="/">Views</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link active text-white" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" to="/Playlists">Playlists</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" to="/signup">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" >Log Out</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default NavBar