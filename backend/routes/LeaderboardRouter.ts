import express, { Router } from "express";
import { fetchAllPlayerStats } from "../controllers/LeaderBoard";

const router: Router = express.Router();

router.post("FetchLeaderboard", fetchAllPlayerStats);

export default router;
