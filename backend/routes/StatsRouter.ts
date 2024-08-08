import express, { Router } from "express";
import {
  lossStatsUpdate,
  winStatsUpdate,
  tieStatsUpdate,
  fetchPlayerStats,
} from "../controllers/Stats";

const router: Router = express.Router();

router.post("/Wins", winStatsUpdate);  //Wins Testing Done
router.post("/Loss", lossStatsUpdate);  //Loss Testing Done
router.post("/Tie", tieStatsUpdate);  //Tie Testing Done
router.post("/FetchStats", fetchPlayerStats); //Fetch Testing Done

export default router;
