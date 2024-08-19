import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
// import Navbar from "./components/Navbar/Navbar";
import Login from "./components/LoginPage/Login";
import Singup from "./components/SignUp/Singup";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/Login" element={<Login/>}/>
        <Route path="/SignUp" element={<Singup/>}/>
      </Routes>
    </div>
  );
}

export default App;
