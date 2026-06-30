import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "../../styles/RegisterUser.css";
import Navbar from "../../landing/Navbar";
import { userForgotPasswordService } from "../../services/API"; // 👈 add this service if not present

// ---- Validation Schema ----
const schema = yup.object().shape({
    email: yup
        .string()
        .required("Email is required")
        .email("Invalid email format")
        .min(10, "Too short")
        .max(40, "Too long"),
});

type ForgotPasswordFormData = yup.InferType<typeof schema>;

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ForgotPasswordFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setLoading(true);
        try {
            const res = await userForgotPasswordService(data);

            if (res.success) {
                toast.success(
                    res.message || "Password sent to your email!",
                    {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        transition: Bounce,
                    }
                );
                setEmailSent(true);
                reset();
            } else {
                toast.error(res.message || "Something went wrong!", {
                    position: "bottom-right",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce,
                });
            }
        } catch (error: unknown) {
            const message =
                (error as any)?.response?.data?.message ||
                "Failed to send email. Please try again.";
            toast.error(message, {
                position: "bottom-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container-fluid register-page">
                <div className="row min-vh-70">

                    {/* Left Section */}
                    <div className="col-lg-6 left-section">
                        <div className="content">
                            <h1>Forgot Your Password?</h1>
                            <p>
                                No worries! Enter your registered email
                                address and we'll send your password
                                straight to your inbox.
                            </p>
                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/online-learning-4268365-3551762.png"
                                className="img-fluid"
                                alt="Forgot password illustration"
                                style={{ maxWidth: "70%" }}
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="col-lg-6 d-flex justify-content-center align-items-start p-4" style={{ paddingTop: "140px" }}>
                        <div className="register-card w-100" style={{ maxWidth: "420px" }}>

                            {!emailSent ? (
                                <>
                                    <h2 className="fw-bold text-center mb-2">
                                        Reset Password
                                    </h2>
                                    <p className="text-center text-muted mb-4" style={{ fontSize: "14px" }}>
                                        Enter your email to receive your password
                                    </p>

                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-4">
                                            <label className="fw-semibold mb-1">
                                                Email <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                {...register("email")}
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                placeholder="Enter your registered email"
                                                disabled={loading}
                                            />
                                            {errors.email && (
                                                <small className="text-danger">
                                                    {errors.email.message}
                                                </small>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-2 fw-bold"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Sending...
                                                </>
                                            ) : (
                                                "Send Password"
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center">
                                    <div
                                        className="mb-3"
                                        style={{ fontSize: "48px" }}
                                    >
                                        ✅
                                    </div>
                                    <h2 className="fw-bold mb-2">Check Your Inbox</h2>
                                    <p className="text-muted">
                                        We've sent your password to your
                                        registered email address.
                                    </p>
                                    <button
                                        className="btn btn-outline-primary mt-3"
                                        onClick={() => setEmailSent(false)}
                                    >
                                        Resend Email
                                    </button>
                                </div>
                            )}

                            <p className="text-center mt-4 mb-0">
                                Remember your password?{" "}
                                <Link className="login-link " to="/login">
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ForgotPassword;