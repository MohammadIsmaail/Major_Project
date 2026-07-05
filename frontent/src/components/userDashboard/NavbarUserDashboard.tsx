import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { RiFileList3Line, RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdWindow } from "react-icons/md";
import "../../styles/UserAdminNavUnLine.css";

const NavbarUserDashboard = ({ children }: any) => {
    const data = [
        {
            url: "/DashboardUser",
            icon: MdWindow,
            name: "Dashboard  ",
        },
        {
            url: "/Purchase_plan",
            icon: FaUsers,
            name: "Purchase Plan",
        },
        {
            url: "/Plan",
            icon: FaUsers,
            name: "My Plan",
        },
        {
            url: "/View_Course",
            icon: RiFileList3Line,
            name: "View Course",
        },
    ];

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleHamburger = () => {
        setOpen(!open);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="admin-layout">
            <aside className={`admin-sidebar ${open ? "" : "collapsed"}`}>
                <div className="sidebar-brand">
                    <div className="brand-left">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="logo"
                            width={34}
                            height={34}
                            style={{ borderRadius: "50%" }}
                        />

                        <span className="brand-text">
                            User Dashboard
                        </span>
                    </div>

                    <button
                        className="hamburger-btn"
                        onClick={handleHamburger}
                        aria-label="Toggle Menu"
                    >
                        {open ? <IoClose /> : <RxHamburgerMenu />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {data.map((item) => {
                        const Icon = item.icon;
                        const isActive =
                            location.pathname === item.url;

                        return (
                            <Link
                                key={item.url}
                                to={item.url}
                                className={`nav-item ${
                                    isActive ? "active" : ""
                                }`}
                                title={!open ? item.name : undefined}
                            >
                                <span className="nav-icon-wrap">
                                    <Icon className="nav-icon" />
                                </span>

                                <span className="nav-label">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}

                    <button
                        className="nav-item logout-item"
                        onClick={logout}
                        title={!open ? "Logout" : undefined}
                    >
                        <span className="nav-icon-wrap">
                            <RiLogoutCircleRLine className="nav-icon" />
                        </span>

                        <span className="nav-label">
                            Logout
                        </span>
                    </button>
                </nav>
            </aside>
                        <div className="admin-main">
                <header className="admin-topbar">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <h5 className="m-0">
                            User Dashboard
                        </h5>

                        <RiLogoutCircleRLine
                            className="nav-icon"
                            style={{
                                fontSize: "1.5rem",
                                color: "#ef4444",
                                cursor: "pointer",
                            }}
                            onClick={logout}
                            title="Logout"
                        />
                    </div>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default NavbarUserDashboard;