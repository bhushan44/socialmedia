import logo from "./logo.svg";
import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function App() {
  // const navigate = useNavigate();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Homepage></Homepage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
