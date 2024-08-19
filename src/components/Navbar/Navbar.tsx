import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";

const cookies = new Cookies();
type Props = {};

const Navbar = (props: Props) => {
  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  const api_key: string = import.meta.env.VITE_API_KEY;
  const cookies = new Cookies();
  const client = StreamChat.getInstance(api_key);

  const logOutHandle = async () => {
    await client.disconnectUser();
    // Remove All cookies present
    const temp = cookies.getAll();
    for (const it in temp) {
      cookies.remove(it);
    }
    // console.log(temp)
    // cookies.remove("uid");
    // cookies.remove("userId");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-custom temp bg-transparent">
        <div className="navbar-brand fw-bold text-2xl"><Link to="/profile" style={linkStyle} id="heading">Our Game</Link></div>
      <div className="d-flex align-items-center pl-5 flex w-full justify-between">
        <div className="nav-link ml-1"><Link to="/dashboard" style={linkStyle} id='dash' className='links'>DashBoard</Link></div>
        <div className="nav-link ml-5"><Link to="/profile" style={linkStyle} id='profile' className='links'>Profile</Link></div>
        <div className="nav-link ml-5"><Link to="/notificationsPage" style={linkStyle} id='notifications' className='links'>Notifications</Link></div>
        <div className="nav-link ml-5"><Link to="/friendsPageNew" style={linkStyle} id='friends' className='links'>Friends</Link></div>
        <div className="nav-link ml-5"><Link to="/leaderboard" style={linkStyle} id='leaderboard' className='links'>Leaderboard</Link></div>
      </div>
      <ul className="navbar-nav ml-auto mr-5">
        <div onClick={()=>{logOutHandle()}} className="nav-link "><Link to="/loginPage" style={linkStyle} id='logout'>Log Out</Link></div>
      </ul>
      {/* <div className="container-fluid">
        <div className="navbar-brand fw-bold"><NavLink to="/" style={linkStyle}>MP Game</NavLink></div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link "><NavLink to="/profile" style={linkStyle}>Profile</NavLink></div>
            </li>
            <li className="nav-item">
              <div className="nav-link " ><NavLink to="dashboard" style={linkStyle}>DashBoard</NavLink></div>
            </li>
          </ul>
        <div className="" id="navbarNav">
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
