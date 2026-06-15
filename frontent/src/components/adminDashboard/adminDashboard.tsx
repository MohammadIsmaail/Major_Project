import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { MdWindow } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { RiFileList3Line } from "react-icons/ri";
import { PiBookOpenTextBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import "../../styles/UserAdminNavUnLine.css"


const adminDashboard = ({ children }: any) => {
    const data = [
        {
            url: "/DashBoardAdminShow",
            icon: MdWindow,
            name: "Dashboard"
        },
        {
            url: "/ManageUserAdmin",
            icon: FaUsers,
            name: "Manage Users"
        },
        {
            url: "/CreateMasterPlanAdmin",
            icon: RiFileList3Line,
            name: "Create Master Plan"
        },
        {
            url: "/MasterPlanAdmin",
            icon: MdLibraryBooks,
            name: "Master Plan"
        },
        {
            url: "/CreateMasterCourseAdmin",
            icon: PiBookOpenTextBold,
            name: "Create Master Course"
        },
        {
            url: "/MasterCourseAdmin",
            icon: FaGraduationCap,
            name: "Master Course"
        }
        ,
        {
            url: "/",
            icon: FiLogOut,
            name: "Logout"
        }

    ]
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
    const handleHamburger = () => {
        setOpen(!open)
    }
    const logout = () => {
        navigate("/")
    }
    return (
        <>
            <div className="row vh-100" style={{ margin: "0px", padding: "0px", height: "20px" }}>
                <div className={`${open ? "col-sm-2 bg-dark" : "col-sm-1 bg-dark"}`}>
                    <div className="row">
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                alt="logo"
                                width="40"
                                height="40"
                            />

                            {open && (
                                <p className="text-light fw-bold m-0 fs-4">
                                    Dashboard
                                </p>
                            )}
                        </div>
                    </div>
                    {/* icons */}
                    <div className="row mt-4 ">
                        {data?.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <>
                                    <Link key={index} to={item.url} className="text-light mb-1  d-flex align-items-center gap-5" style={{ textDecoration: "none" }}>
                                        <div>
                                            <Icon className="text-light fs-3 " />
                                            <span className="text-decoration-none ms-2"> {open && <span className="UnLine">{item.name}</span>}</span>
                                        </div>
                                    </Link>
                                </>
                            )
                        })
                        }
                    </div>
                </div>
                <div className={`${open ? "col-sm-10" : "col-sm-11"}`}>
                    <div className="row">
                        <div className="bg-dark p-3 d-flex justify-content-between align-items-center text-white">
                            <RxHamburgerMenu
                                className="fs-4"
                                style={{ cursor: "pointer" }}
                                onClick={handleHamburger}
                            />

                            <h5 className="m-0">Admin Dashboard</h5>

                            <RiLogoutCircleRLine
                                className="fs-4"
                                onClick={logout}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                        <hr />
                        <div className="div">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default adminDashboard
