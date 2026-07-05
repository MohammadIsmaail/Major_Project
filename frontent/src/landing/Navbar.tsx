import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Register", to: "/register" },
  { label: "Login", to: "/login" },
  { label: "Admin", to: "/adminLogin" },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`custom-navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-wrap">
        <Link className="brand-logo" to="/" onClick={() => setIsOpen(false)}>
          <div className="logo-mark">L</div>
          <span className="brand-name">LMS Portal</span>
        </Link>

        <button
          className={`custom-toggler ${isOpen ? "toggler-open" : ""}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu ${isOpen ? "nav-menu-open" : ""}`}>
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  end={item.to === "/"}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/register" className="get-started-btn" onClick={() => setIsOpen(false)}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;