import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NavbarUserDashboard: React.FC = ({children :any}) => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()
    const handleHamburger = () => {
        setOpen(!open)
    }
    const logout = ()=>{
        navigate("/")
    }
    return (
        <>
            <div className="row vh-100" style={{ margin: "0px", padding: "0px", height: "20px" }}>
                <div className={`${open ? "col-sm-2 bg-dark" : "col-sm-1 bg-dark"}`}>
                    <div className="row">
                        <span className="mt-3 float-left"><img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="logo"
                            width="40"
                            height="40"
                        />
                        <p className="text-light  fw-bold m-0">Dashboard</p></span>
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

                            <h5 className="m-0">User Dashboard</h5>

                            <RiLogoutCircleRLine
                                className="fs-4"
                                onClick={logout}
                                style={{ cursor: "pointer" }}
                            />
                        </div>
                           <hr />
                        <div className="div">
                            {children }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavbarUserDashboard


