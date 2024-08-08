import express, { Router } from "express";
import {
  fetchGamingHistory,
  updateGamingHistory,
} from "../controllers/GamingHistory";

const router: Router = express.Router();

router.post("/FetchGamingHistory",fetchGamingHistory); //Testing Done 0 Fails
router.post("/UpdateGamingHistory",updateGamingHistory);// To be Done Later

export default router;