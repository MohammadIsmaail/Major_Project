import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/style.css"
import Home from "./landing/Home"
import Register from "./landing/Register"
import Login from "./landing/Login"
import AdminLogin from "./landing/adminLogin"
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  AdminDashboard  from "./components/adminDashboard/adminDashboard"
import Layout from "./components/userDashboard/layout"
import User from "./components/userDashboard/user"
import NavbarUserDashboard from "./components/userDashboard/NavbarUserDashboard"
import DashBoardAdminShow from "./components/adminDashboard/DashBoardAdminShow"
import ManageUserAdmin from "./components/adminDashboard/ManageUserAdmin"
import CreateMasterPlanAdmin from "./components/adminDashboard/CreateMasterPlanAdmin"
import MasterPlanAdmin from "./components/adminDashboard/MasterPlanAdmin"
import CreateMasterCourseAdmin from "./components/adminDashboard/CreateMasterCourseAdmin"
import MasterCourseAdmin from "./components/adminDashboard/MasterCourseAdmin"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* UserDashboard */}
          <Route path="/NavbarUserDashboard" element={<NavbarUserDashboard />} />
          <Route path="/layout" element={<NavbarUserDashboard><Layout /></NavbarUserDashboard>} />
          <Route path="/user" element={<NavbarUserDashboard><User /></NavbarUserDashboard>} />
         
         
         
            {/* AdminDashboard */}
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/DashBoardAdminShow" element={<AdminDashboard><DashBoardAdminShow /></AdminDashboard>} />
          <Route path="/ManageUserAdmin" element={ <AdminDashboard><ManageUserAdmin /></AdminDashboard>} />
          <Route path="/CreateMasterPlanAdmin" element={<AdminDashboard><CreateMasterPlanAdmin /></AdminDashboard>} />
          <Route path="/MasterPlanAdmin" element={<AdminDashboard><MasterPlanAdmin /></AdminDashboard>} />
          <Route path="/CreateMasterCourseAdmin" element={<AdminDashboard><CreateMasterCourseAdmin /></AdminDashboard>} />
          <Route path="/MasterCourseAdmin" element={<AdminDashboard><MasterCourseAdmin /></AdminDashboard>} />
          <Route path="/DashBoardAdminShow" element={<AdminDashboard><DashBoardAdminShow /></AdminDashboard>} />
        </Routes>
      </BrowserRouter>
      

      <ToastContainer
        position="bottom-right"
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