import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
