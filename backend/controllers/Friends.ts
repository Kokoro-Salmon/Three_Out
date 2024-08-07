import { Request, Response } from 'express';
import { FriendsSchema } from "../models/FriendsList";
import { UserSchema } from '../models/UserProfile';

interface AddFriendRequestBody {
    friendID: string;
    friendUsername: string;
    playerID: string;
    status: string;
}

export const addFriend = async (req: Request<{}, {}, AddFriendRequestBody>, res: Response) => {
    const { friendID, friendUsername, playerID, status } = req.body;

    try {
        const result = await FriendsSchema.findOne({ playerID: playerID });
        if (!result) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        result.friendsList.push({ friendUsername, friendID, status });

        await result.save();

        return res.json({ msg: `Added a NEW Friend with FriendID: ${friendID} and ${status}` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'AddFriend error' });
    }
};

interface DeleteFriendRequestBody {
    friendID: string;
    playerID: string;
}

export const deleteFriend = async (req: Request<{}, {}, DeleteFriendRequestBody>, res: Response) => {
    try {
        const { friendID, playerID } = req.body;

        // Find the player and delete the friend from its friends array
        const result = await FriendsSchema.findOne({ playerID: playerID });
        if (!result) {
            return res.status(404).json({ msg: 'Player not found' });
        }

        // Use filter to remove the friend with the specified ID
        (result.friendsList as any) = (result.friendsList as any).filter((friend: any) => friend.friendID !== friendID);

        console.log('New result after delete friend:', result.friendsList);

        // Save the updated data
        await result.save();

        res.json({ msg: `Deleted the friend with ID: ${friendID}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'DeleteFriend error' });
    }
};

export const fetchFriends = async (req: Request, res: Response): Promise<Response> => {
    const { playerID } = req.body;

    try {
        // Ensure playerID is defined and of type string
        if (typeof playerID !== 'string') {
            return res.status(400).json({ error: 'Invalid playerID' });
        }

        // Fetch friends list from the database
        const arrayOfFriends = await FriendsSchema.find({ playerID: playerID, 'friendsList.status': 'friend' });

        console.log(`fetching friends for ${playerID}`);

        if (!arrayOfFriends.length) {
            return res.json({ friendsList: [] });
        }

        return res.json({ friendsList: arrayOfFriends[0].friendsList });
    } catch (error) {
        console.error('Error fetching friends:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

interface Friend {
    friendID: string;
}

interface User {
    playerID: string;
}

interface FriendsDocument {
    playerID: string;
    friendsList: Friend[];
}

export const fetchNotFriends = async (req: Request, res: Response): Promise<Response> => {
    const { playerID } = req.body;

    try {
        // Ensure playerID is defined and of type string
        if (typeof playerID !== 'string') {
            return res.status(400).json({ error: 'Invalid playerID' });
        }

        // Fetch the friend's document and all users
        const friends = await FriendsSchema.findOne({ playerID });
        const allPeople = await UserSchema.find({});

        if (!friends) {
            return res.json({ result: allPeople });
        }

        const currFriendsList = friends.friendsList;

        // Map for storing friends
        const frnds = new Map<string, string>();
        frnds.set(playerID, "1");

        for (const friend of currFriendsList) {
            if (friend.friendID) {
                frnds.set(friend.friendID, "1");
            }
        }

        const result: any[] = [];
        // Storing not marked ones inside the result
        for (const person of allPeople) {
            if (person.playerID && !frnds.has(person.playerID) && typeof person.playerID === 'string') {
                result.push(person);
            }
        }

        return res.json({ result });
    } catch (error) {
        console.error('Error fetching not friends:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



