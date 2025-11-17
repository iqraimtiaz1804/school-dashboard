import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

export default function NavbarSchool() {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-school py-3">
      <div className="container">
        <Link className="navbar-brand text-white brand" to="/">BrightFuture School</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon" style={{filter:'invert(1)'}}></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/teachers">Teachers</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/students">Students</Link></li>
            {isLoggedIn() ? (
              <>
                <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
                <li className="nav-item"><button className="btn btn-sm btn-light ms-2" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li className="nav-item"><Link className="nav-link text-white" to="/login">Admin Login</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
