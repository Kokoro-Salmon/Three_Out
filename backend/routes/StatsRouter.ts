import express, { Router } from "express";
import {
  lossStatsUpdate,
  winStatsUpdate,
  tieStatsUpdate,
  fetchPlayerStats,
} from "../controllers/Stats";

const router: Router = express.Router();

router.post("/Wins", winStatsUpdate);
router.post("/Loss", lossStatsUpdate);
router.post("/Tie", tieStatsUpdate);
router.post("/FetchStats", fetchPlayerStats);

export default router;
