import express, { Router } from "express";
import {
  fetchGamingHistory,
  updateGamingHistory,
} from "../controllers/GamingHistory";

const router: Router = express.Router();

router.post("/FetchGamingHistory",fetchGamingHistory);
router.post("/UpdateGamingHistory",updateGamingHistory);

export default router;