import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { LiaGamepadSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import "./Signup.css";
// import axios from "axios";

type Props = {};

const Singup = (props: Props) => {
  const api_key: string = import.meta.env.VITE_API_KEY;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [promptMsg, setPromptMsg] = useState<string>("");
  const [passPrompt, setPassPrompt] = useState<boolean>(false);

  useMemo(async () => {
    if (token) {
      await client.disconnectUser();
      client
        .connectUser(
          {
            id: cookies.get("userId"),
            name: cookies.get("username"),
            hashedPassword: cookies.get("hashedPassword"),
          },
          token
        )
        .then((user) => {
          console.log("getStream Account User:", user);
        });
    }
  }, [cookies]);

  const signUpHandle = async () => {
    if (username == "") {
      setPassPrompt(true);
      setPromptMsg("Please choose a Username");
      return;
    } else {
      setPassPrompt(false);
    }

    if (email == "") {
      setPassPrompt(true);
      setPromptMsg("Please input a valid email.");
      return;
    } else {
      setPassPrompt(false);
    }

    if (pass == "") {
      setPassPrompt(true);
      setPromptMsg("Please choose a password.");
      return;
    } else {
      setPassPrompt(false);
    }

    //client-already present check
    // if(client){
    //   await client.disconnectUser();
    // }

    //Authentiation Handelling code
    // const res = await axios.post('http://localhost:3000/User/SignUp',{email:email,username:username,password:pass});

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const data = await fetch("http://localhost:3000/User/SignUp", {
      method: "POST",
      redirect: "follow",
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: headers,
      body: JSON.stringify({
        email: email,
        username: username,
        password: pass,
      }),
    });

    const res = await data.json();
    console.log("Data from signup fetch is :", res);

    if (!res.user) {
      setPassPrompt(true);
      setPromptMsg("Unsuccessfull Signup, Please Try Again");
      return;
    } else {
      setPassPrompt(true);
      setPromptMsg("Successfully Signed Up");

      if (client) await client.disconnectUser();

      cookies.set("token", res.token);
      cookies.set("username", res.user.username);
      cookies.set("password", res.user.password); //this is hashed password
      cookies.set("userId", res.userId);

      // connectFunction();
    }
  };
  useEffect(() => {
    const temp = cookies.getAll();
    for (const it in temp) {
      cookies.remove(it);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <video src={LoginBg} autoPlay loop muted /> */}

      <div className="flex justify-center items-center z-10 mb-[3vw]">
        <motion.h1
          initial={{ opacity: 0 }} // Start fully transparent
          animate={{ opacity: 1 }} // Fade to fully opaque
          transition={{ duration: 1 }} // Control the duration of the fade-in
          className="gameLoginHeader text-white text-5xl"
        >
          SignUp Page
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }} // Start fully transparent
        animate={{ opacity: 1 }} // Fade to fully opaque
        transition={{ duration: 1 }} // Control the duration of the fade-in
        className="backdrop-filter backdrop-blur-sm md:backdrop-blur-lg w-full max-w-sm"
      >
        <form className="loginFormDiv rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <div className="flex justify-center items-center">
              <FaUser
                style={{
                  fontSize: "20px",
                  marginBottom: "15px",
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <label
                style={{ textShadow: "0.5px 0.5px 2px brown" }}
                className="block text-white text-lg font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
            </div>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-center items-center">
              <HiMail
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <label
                style={{ textShadow: "0.5px 0.5px 2px brown" }}
                className="block text-white text-lg font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
            </div>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter Email"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-center items-center">
              <RiLockPasswordFill
                style={{
                  fontSize: "20px",
                  marginBottom: "10px",
                  marginRight: "10px",
                  color: "white",
                }}
              />
              <label
                style={{ textShadow: "0.5px 0.5px 2px brown" }}
                className="block text-white text-lg font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <input
              onChange={(e) => {
                setPass(e.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="text"
              placeholder="Enter Password"
            />
            {passPrompt ? (
              <p className="text-white text-s italic">{promptMsg}</p>
            ) : (
              <></>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => signUpHandle()}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign UP
            </button>
            <button
              onClick={() => navigate("/Login")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Go to Log In
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Singup;
