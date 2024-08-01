import express, { Router } from "express";
import {
  handleUserLogin,
  handleUserSignUp,
  fetchUserInfo,
} from "../controllers/User";

const router: Router = express.Router();

router.post("/SignUp", handleUserSignUp);
router.post("/Login", handleUserLogin);
router.post("/FetchUserInfo", fetchUserInfo);

export default router;