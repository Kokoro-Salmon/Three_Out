import React from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import Popup from "../Popup/Popup";
import { useMemo, useState, useEffect } from "react";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
type Props = {};

const Profile = (props: Props) => {
  const cookies = new Cookies();
  const playerID = cookies.get("userId");
  const playerUsername = cookies.get("username");
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [games, setGames] = useState([]);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [userStats, setUserStats] = useState();
  const [gameHistory, setGameHistory] = useState();
  const [idMap, setIdMap] = useState();

  const fetchPlayerInfo = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const data = await fetch("http://localhost:3000/User/FetchUserInfo", {
      method: "POST",
      redirect: "follow",
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: headers,
      body: JSON.stringify({ playerID: playerID }),
    });

    const res = await data.json();
    console.log("UserInfo is :", res.userInfo);
    setUserInfo(res.userInfo);
  };

  const checkFn = async () => {
    const res = await axios.get("http://localhost:3000/LoggedIn", {
      withCredentials: true,
    });
    if (!res.data.loggedIn) {
      navigate("/Login");
      console.log("Did not pass restrictToLoginUsers code :", res.data);
    }
  };

  const fetchPlayerStats = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const data = await fetch("http://localhost:3000/Stats/FetchStats", {
      method: "POST",
      redirect: "follow",
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: headers,
      body: JSON.stringify({ playerID: playerID }),
    });

    const res = await data.json();
    console.log("Player Stats are:", res.playerStats);
    setUserStats(res.playerStats);
  };

  const fetchGameHistory = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const data = await fetch("http://localhost:3000/History/FetchGamingHistory", {
      method: "POST",
      redirect: "follow",
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: headers,
      body: JSON.stringify({ playerID: playerID }),
    });

    const res = await data.json();
    console.log("Gaming history of player is :", res.history);
    //setting the value
    setGameHistory(res.history);
    setIdMap(res.idMap);
  };

  useEffect(() => {
    checkFn();
    //     async function temp () {const {user, friends, games} = await getData();
    //         setUser(user);
    //         setFriends(friends);
    //         setGames(games)
    //     }
    // temp()

    fetchPlayerInfo();
    fetchPlayerStats();
    fetchGameHistory();
  }, []);


  return <div className="text-blue-500">Hello, Tailwind!</div>;
};

export default Profile;
