import { Request, Response } from 'express';
import { PlayerStatsSchema } from "../models/PlayerStats";

export const fetchAllPlayerStats = async (req: Request, res: Response): Promise<Response> => {
    try {
        // Fetch all player stats documents
        const allStatsDocs: any[] = await PlayerStatsSchema.find().exec();

        // Sort the stats documents
        allStatsDocs.sort((a, b) => {
            if (a.wins > b.wins) return -1;
            if (a.wins === b.wins && a.gamesPlayed < b.gamesPlayed) return -1;
            if (a.wins === b.wins && a.gamesPlayed > b.gamesPlayed) return 1;
            if (a.wins < b.wins) return 1;
            if (a.loss === b.loss && a.gamesPlayed > b.gamesPlayed) return -1;
            if (a.loss === b.loss && a.gamesPlayed < b.gamesPlayed) return 1;
            return 0;
        });

        return res.json({ arrayOfPlayers: allStatsDocs });
    } catch (error) {
        console.error('Error fetching player stats:', error);
        return res.status(500).json({ error: 'An error occurred while fetching player stats' });
    }
};
