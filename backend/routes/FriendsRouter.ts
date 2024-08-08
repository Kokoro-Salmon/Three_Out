import express, { Router } from "express";
import {
  addFriend,
  deleteFriend,
  fetchFriends,
  fetchNotFriends,
} from "../controllers/Friends";

const router: Router = express.Router();

router.post("/FetchFriends", fetchFriends);
router.post("/FetchNotFriends", fetchNotFriends); //FIx this please
router.post("/AddFriends", addFriend);
router.delete("/DeleteFriends", deleteFriend);

export default router;
