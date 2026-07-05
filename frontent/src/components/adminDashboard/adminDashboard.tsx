import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdWindow } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { PiBookOpenTextBold } from "react-icons/pi";
import "../../styles/UserAdminNavUnLine.css";

const AdminDashboard = ({ children }: any) => {
    const data = [
        {
            url: "/DashBoardAdminShow",
            icon: MdWindow,
            name: "Dashboard",
        },
        {
            url: "/ManageUserAdmin",
            icon: FaUsers,
            name: "Manage Users",
        },
        {
            url: "/CreateMasterPlanAdmin",
            icon: RiFileList3Line,
            name: "Create Master Plan",
        },
        {
            url: "/MasterPlanAdmin",
            icon: MdLibraryBooks,
            name: "Master Plan",
        },
        {
            url: "/CreateMasterCourseAdmin",
            icon: PiBookOpenTextBold,
            name: "Create Master Course",
        },
        {
            url: "/MasterCourseAdmin",
            icon: FaGraduationCap,
            name: "Master Course",
        },
    ];

    const [open, setOpen] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleHamburger = () => {
        setOpen(!open);
    };

    const logout = () => {
        navigate("/");
    };

    return (
        <div className="admin-layout">
            {/* ================= Sidebar ================= */}
            <aside className={`admin-sidebar ${open ? "" : "collapsed"}`}>
                <div className="sidebar-brand">
                    <div className="brand-left">
                        <div className="brand-logo">A</div>

                        <span className="brand-text">
                            Admin Panel
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

                    {/* Logout navbar ke andar */}
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

            {/* ================= Main ================= */}
            <div className="admin-main">
                <header className="admin-topbar">
                    <h5 className="m-0">
                        Admin Dashboard
                    </h5>
                </header>

                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;