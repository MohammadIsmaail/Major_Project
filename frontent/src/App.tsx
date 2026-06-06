import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./styles/style.css"
function App(){

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App