import { Request } from "express";
import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";
import { setUser } from "../service/auth";
import { UserSchema } from "../models/UserProfile";
import { FriendsSchema } from "../models/FriendsList";
import { PlayerStatsSchema } from "../models/PlayerStats";

import dotenv from "dotenv";
dotenv.config();

const api_key = process.env.API_STREAM_KEY as string;
const api_secret = process.env.API_STREAM_SECRET as string;

const serverClient = StreamChat.getInstance(api_key, api_secret);

interface UserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface FetchUserInfoRequest extends Request {
  body: {
    playerID: string;
  };
}

// type User = {
//   username: string;
//   email: string;
//   password: string;
//   profilePhotoLink?: string;
//   playerID?: string;
// };

export const handleUserSignUp = async (req: UserRequest, res: Response) => {
  const { username, email, password } = req.body;
  const newUserID = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Bhayia Appka Naya user ID hai : ", newUserID);

  const newUser = new UserSchema({
    username: username,
    email: email,
    password: hashedPassword,
    profilePhotoLink: "",
    playerID: newUserID,
  });

  //   Check karo if its already present
  const alreadyPresent = await UserSchema.findOne({
    username: username,
    email: email,
  });

  if (alreadyPresent) {
    return res.json({ msg: "User already exists" });
  }

  //   nayaUser karo add model pe
  const nayaUser = await newUser.save();

  console.log("Naya user ho toh ye ho aap : ", nayaUser);

  const newFriendList = new FriendsSchema({
    username: username,
    playerID: newUserID,
    friendsList: [],
  });

  //   newFriendList bhi add kardo model pe
  await newFriendList.save();

  const stats = new PlayerStatsSchema({
    playerUserName: username,
    playerID: newUserID,
    wins: 0,
    loss: 0,
    gamesPlayed: 0,
  });

  //   apan initialise kiye stat ko
  await stats.save();

  try {
    const token = serverClient.createToken(newUserID);
    return res.status(201).json({
      hashedPassword,
      token,
      userId: newUserID,
      user: nayaUser,
      msg: "User Registered Successfully",
    });
  } catch (error) {
    console.error("Error creating token:", error);
    return res.status(500).json({ msg: "Error creating token" });
  }
};

export const handleUserLogin = async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await UserSchema.findOne({ email: email });

  if (!user) {
    return res.json({ msg: "Email is Incorrect" });
  }

  const passwordIsRight = await bcrypt.compare(password, user.password);

  if (!passwordIsRight) {
    return res.json({ msg: "Password is Incorrect" });
  }

  console.log("Well Well Well Tum already Db me ho :", user);

  //   Ab Session chalu karege
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId, { maxAge: 2 * 60 * 60 * 1000, secure: true });

  //   stream-chat yaha se
  console.log("user.username :", user.username);
  const { users } = await serverClient.queryUsers({ name: user.username });
  console.log("Stream Users->", users);

  if (users.length === 0)
    return res.json({ msg: "User not found in ChatStream " });

  const token = serverClient.createToken(users[0].id);
  return res.status(201).json({
    userId: users[0].id,
    token,
    user,
    msg: "User LoggedIn Successfully",
  });
};

export const fetchUserInfo = async (
  req: FetchUserInfoRequest,
  res: Response
) => {
  const { playerID } = req.body;
  const user = await UserSchema.findOne({ playerID: playerID });
  return res.json({ userInfo: user });
};
