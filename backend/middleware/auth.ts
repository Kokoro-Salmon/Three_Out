import { getUser } from "../service/auth";
import { Request, Response, NextFunction } from 'express';

type User = {
  name : string;
  email : string;
}

interface CustomRequest extends Request {
  user?: User;
}

const restrictToLoggedInUserOnly = (req: CustomRequest, res: Response, next:NextFunction) => {
  const userUID = req.cookies.uid;

  if (!userUID) {
    return res.json({ loggedIn: false, msg: "User is not logged in,number-1" });
  }

  const user = getUser(userUID);
  if (!user) {
    return res.json({ loggedIn: false, msg: "User is not logged in,number-2" });
  }

  req.user = user;
  next();
};

export { restrictToLoggedInUserOnly };
