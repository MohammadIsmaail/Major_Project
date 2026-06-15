import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../styles/RegisterUser.css"
import Navbar from "./Navbar";
import { toast, Bounce } from "react-toastify";
import { adminLoginService } from "../services/API";
import { useNavigate } from "react-router-dom";
import { storeData } from "../utils/localStorage";


function adminLogin() {
    const navigate = useNavigate()
    //  Validation Schema
    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Invalid email format")
            .min(10, "Too short")
            .max(40, "Too long"),

        password: yup
            .string()
            .required("Password is required")
            .min(6, "Minimum 6 characters")
            .max(15, "Maximum 15 characters")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)/,
                "Must contain letters & numbers"
            ),
    });


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,

    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await adminLoginService(data);

            if (res.success) {
                toast.success(`${res.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
                reset();
                navigate("/DashBoardAdminShow"); // optional
                storeData("token",res.result.token)
            } else {
                toast.error(`${res.message}`, {
                    position: "bottom-right",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                "Something went wrong!",
                {
                    position: "bottom-right",
                }
            );
        }
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid register-page">
                <div className="row min-vh-100">

                    {/* Left Section */}
                    <div className="col-lg-6 left-section">
                        <div className="content">
                            <h1>Welcome to our LMS Platform</h1>

                            <p>
                                Learn new skills, track your progress and
                                access educational resources anytime,
                                anywhere.
                            </p>

                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/online-learning-4268365-3551762.png"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="col-lg-6 d-flex justify-content-center align-items-center p-4">
                        <div className="register-card w-100">

                            <h2 className="fw-bold text-center mb-4">
                                Admin Login Form
                            </h2>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="mb-3">
                                    <label>Email <span className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        className="form-control"
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <small className="text-danger">
                                            {errors.email.message}
                                        </small>
                                    )}
                                </div>



                                <div className="mb-3">
                                    <label>Password <span className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        {...register("password")}
                                        className="form-control"
                                        placeholder="Enter password"
                                    />
                                    {errors.password && (
                                        <small className="text-danger">
                                            {errors.password.message}
                                        </small>
                                    )}
                                </div>

                                <button className="btn btn-primary w-100 py-2 fw-bold">
                                    Login Now
                                </button>
                                
                            </form>

                        </div>
                    </div>

                </div>
            </div>
            );
        </>
    )
}

export default adminLogin