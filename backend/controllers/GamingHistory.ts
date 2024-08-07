import { GamingHistorySchema } from "../models/GamingHistory";
import { UserSchema } from "../models/UserProfile";
import { Request , Response } from "express";
interface FetchGamingHistoryRequest extends Request {
    body: {
        playerID: string;
    };
}

interface UpdateGamingHistoryRequest extends Request {
    body: {
        loserID: string;
        playerID: string;
        winnerID: string;
        winType: 'win' | 'loss' | 'tie';
    };
}

export const fetchGamingHistory = async (req: FetchGamingHistoryRequest, res: Response): Promise<Response> => {
    try {
        const { playerID } = req.body;

        // Return the gaming-history JSON
        const history = await GamingHistorySchema.find({ playerID });

        // New map for mapping ID to username
        const idMap = new Map<string, string>();

        // Fetching the respective usernames of opponents
        for (const record of history) {
            const { loserID, winnerID } = record;

            // Now finding both these usernames inside UserSchema
            const loserUser = await UserSchema.findOne({ playerID: loserID });
            const winnerUser = await UserSchema.findOne({ playerID: winnerID });

            if (loserUser) {
                idMap.set(loserID, loserUser.username);
            }

            if (winnerUser) {
                idMap.set(winnerID, winnerUser.username);
            }
        }

        // Reverse the array in order to get the latest one on top
        history.reverse();

        return res.json({ history, idMap });
    } catch (error) {
        console.error('Error fetching gaming history:', error);
        return res.status(500).json({ error: 'An error occurred while fetching gaming history.' });
    }
};

export const updateGamingHistory = async (req: UpdateGamingHistoryRequest, res: Response): Promise<Response> => {
    try {
        const { loserID, playerID, winnerID, winType } = req.body;
        const dateInString = new Date().toISOString();

        // Add win or loss
        const newHistoryDoc = new GamingHistorySchema({
            loserID,
            playerID,
            winnerID,
            gameStatus: winType,
            date: dateInString,
        });

        // Save this doc inside the game history DB
        await newHistoryDoc.save();
        console.log('New history Doc is:', newHistoryDoc);

        return res.json({ HistoryDoc: newHistoryDoc });
    } catch (error) {
        console.error('Error updating gaming history:', error);
        return res.status(500).json({ error: 'An error occurred while updating gaming history.' });
    }
};
