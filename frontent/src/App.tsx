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
import {AuthGuardProtected,AuthGuardPublic} from "./hoc/AuthGuard/AuthGuard"
import UpdateForm from "./components/adminDashboard/UpdateForm"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<AuthGuardPublic><Home /></AuthGuardPublic>} />
          <Route path="/register" element={<AuthGuardPublic><Register /></AuthGuardPublic>} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* UserDashboard */}
          <Route path="/NavbarUserDashboard" element={<AuthGuardProtected><NavbarUserDashboard /></AuthGuardProtected>} />
          <Route path="/layout" element={<AuthGuardProtected><NavbarUserDashboard><Layout /></NavbarUserDashboard></AuthGuardProtected>} />
          <Route path="/user" element={<AuthGuardProtected><NavbarUserDashboard><User /></NavbarUserDashboard></AuthGuardProtected>} />
        
         
         
            {/* AdminDashboard */}
          <Route path="/adminDashboard" element={<AuthGuardProtected><AdminDashboard /></AuthGuardProtected>} />
          <Route path="/DashBoardAdminShow" element={<AuthGuardProtected><AdminDashboard><DashBoardAdminShow /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/ManageUserAdmin" element={<AuthGuardProtected> <AdminDashboard><ManageUserAdmin /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/CreateMasterPlanAdmin" element={<AuthGuardProtected><AdminDashboard><CreateMasterPlanAdmin /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/MasterPlanAdmin" element={<AuthGuardProtected><AdminDashboard><MasterPlanAdmin /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/CreateMasterCourseAdmin" element={<AuthGuardProtected><AdminDashboard><CreateMasterCourseAdmin /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/MasterCourseAdmin" element={<AuthGuardProtected><AdminDashboard><MasterCourseAdmin /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/DashBoardAdminShow" element={<AuthGuardProtected><AdminDashboard><DashBoardAdminShow /></AdminDashboard></AuthGuardProtected>} />
          <Route path="/UpdateForm/:id" element={<AuthGuardProtected><UpdateForm /></AuthGuardProtected>} />
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