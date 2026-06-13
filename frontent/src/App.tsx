import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/style.css"
import Home from "./landing/Home"
import Register from "./landing/Register"

function App(){
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App