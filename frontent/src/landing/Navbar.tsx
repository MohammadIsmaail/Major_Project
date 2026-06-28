import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import React from "react";


const Navbar: React.FC = () => {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-3" to="/">
            LMS Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/register">
                Register
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/adminLogin">
                Admin
              </Link>
            </li>
          </ul>
          <button className="btn btn-primary ms-lg-4">
            Get Started
          </button>
        </div>
      </div>
    </nav>
 
    </>
  );
};

export default Navbar;