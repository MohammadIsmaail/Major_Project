import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiBookOpen,
  FiArrowRight,
} from "react-icons/fi";
import "../styles/Navbar.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/services" },
  { name: "Register", path: "/register" },
  { name: "Login", path: "/login" },
  { name: "Admin", path: "/adminLogin" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar-scroll" : ""}`}>
        <div className="container nav-container">

          {/* Logo */}

          <Link
            to="/"
            className="logo"
            onClick={closeMenu}
          >
            <div className="logo-box">
              <FiBookOpen />
            </div>

            <div className="logo-content">
              <h2>LMS Portal</h2>
              <span>Learn • Build • Grow</span>
            </div>
          </Link>

          {/* Desktop Menu */}

          <nav className={`nav-menu ${menuOpen ? "show" : ""}`}>

            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive
                    ? "nav-item active-nav"
                    : "nav-item"
                }
              >
                {item.name}
              </NavLink>
            ))}

            <Link
              to="/register"
              className="mobile-btn"
              onClick={closeMenu}
            >
              Get Started
              <FiArrowRight />
            </Link>

          </nav>

          {/* Right Side */}

          <div className="nav-right">

            <Link
              to="/register"
              className="desktop-btn"
            >
              Get Started
              <FiArrowRight />
            </Link>

            <button
              className="hamburger"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>

        </div>
      </header>
    </>
  );
};

export default Navbar;