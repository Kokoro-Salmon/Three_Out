import { PlayerStatsSchema } from "../models/PlayerStats";
import { Request, Response } from "express";

export const lossStatsUpdate = async (req: Request, res: Response) => {
  const { playerID } = req.body;
  try {
    // Searching for the playerID in stats-DB
    const statDoc: any = await PlayerStatsSchema.findOne({
      playerID: playerID,
    });

    if (!statDoc) {
      return res.status(404).json({ msg: "Player not found" });
    }

    // Update the data as loss
    statDoc.loss = statDoc.loss + 1;
    statDoc.gamesPlayed = statDoc.gamesPlayed + 1;

    // Save the updated document
    await statDoc.save();

    return res
      .status(200)
      .json({ msg: "Player Stats updated successfully", newStatDoc: statDoc });
  } catch (error) {
    return res.status(500).json({ msg: "lossStatsUpdate Error", error });
  }
};

export const winStatsUpdate = async (req: Request, res: Response) => {
  const { playerID } = req.body;
  try {
    // Searching for the playerID in stats-DB
    const statDoc: any = await PlayerStatsSchema.findOne({
      playerID: playerID,
    });

    if (!statDoc) {
      return res.status(404).json({ msg: "Player not found" });
    }

    // Update the data as loss
    statDoc.wins = statDoc.wins + 1;
    statDoc.gamesPlayed = statDoc.gamesPlayed + 1;

    // Save the updated document
    await statDoc.save();

    return res
      .status(200)
      .json({ msg: "Player Stats updated successfully", newStatDoc: statDoc });
  } catch (error) {
    return res.status(500).json({ msg: "winStatsUpdate Error", error });
  }
};

export const tieStatsUpdate = async (req: Request, res: Response) => {
  const { playerID } = req.body;
  try {
    // Searching for the playerID in stats-DB
    const statDoc: any = await PlayerStatsSchema.findOne({
      playerID: playerID,
    });

    if (!statDoc) {
      return res.status(404).json({ msg: "Player not found" });
    }

    // Update the tie
    statDoc.gamesPlayed = statDoc.gamesPlayed + 1;

    // Save the updated document
    await statDoc.save();

    return res
      .status(200)
      .json({ msg: "Player Stats updated successfully", newStatDoc: statDoc });
  } catch (error) {
    return res.status(500).json({ msg: "tieStatsUpdate Error", error });
  }
};
