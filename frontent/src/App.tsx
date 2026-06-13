import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/style.css"
import Home from "./landing/Home"
import Register from "./landing/Register"
import Login from "./landing/Login"
import AdminLogin from "./landing/AdminLogin"
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboard from "./components/userDashboard/userDashboard"
import  AdminDashboard  from "./components/adminDashboard/adminDashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* Dashboard */}
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}
export default App