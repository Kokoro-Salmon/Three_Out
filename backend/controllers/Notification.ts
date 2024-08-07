import { NotificationsSchema } from "../models/Notifications";
import { UserSchema } from "../models/UserProfile";
import { FriendsSchema } from "../models/FriendsList";
import { Request, Response } from 'express';

export const fetcNotifications = async (req: Request, res: Response): Promise<Response> => {
    const { playerID } = req.body;

    // Validate playerID
    if (typeof playerID !== 'string') {
        return res.status(400).json({ error: 'Invalid playerID' });
    }

    try {
        // Find notifications where receiverID matches the playerID
        const notifications = await NotificationsSchema.find({ receiverID: playerID }).exec();

        return res.json({ notificationsArray: notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return res.status(500).json({ error: 'An error occurred while fetching notifications' });
    }
};

export const deleteNotification = async (req: Request, res: Response): Promise<Response> => {
    const { senderID, receiverID } = req.body;

    // Validate senderID and receiverID
    if (typeof senderID !== 'string' || typeof receiverID !== 'string') {
        return res.status(400).json({ error: 'Invalid senderID or receiverID' });
    }

    try {
        // Find the notification to be deleted
        const doc = await NotificationsSchema.findOne({ senderID, receiverID }).exec();

        if (!doc) {
            return res.status(404).json({ error: 'Notification not found' });
        }

        // Delete the notification
        const deletedDoc = await doc.deleteOne();

        return res.json({ deletedDoc });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the notification' });
    }
};

export const checkIfNotificationSent = async (req: Request, res: Response): Promise<Response> => {
    const { senderID, receiverID } = req.body;

    // Validate senderID and receiverID
    if (typeof senderID !== 'string' || typeof receiverID !== 'string') {
        return res.status(400).json({ error: 'Invalid senderID or receiverID' });
    }

    try {
        // Check if a notification with status "sent" exists for the given sender and receiver
        const doc = await NotificationsSchema.findOne({ receiverID, senderID, status: "sent" }).exec();

        return res.json({ alreadyExists: !!doc });
    } catch (error) {
        console.error('Error checking notification status:', error);
        return res.status(500).json({ error: 'An error occurred while checking notification status' });
    }
};

export const sendNotification = async (req: Request, res: Response): Promise<Response> => {
    const { senderID, receiverID, senderUsername } = req.body;

    // Validate input data
    if (typeof senderID !== 'string' || typeof receiverID !== 'string' || typeof senderUsername !== 'string') {
        return res.status(400).json({ error: 'Invalid senderID, receiverID, or senderUsername' });
    }

    try {
        // Create a new notification document
        const newDoc = new NotificationsSchema({
            senderID,
            receiverID,
            senderUsername,
            status: "sent",
        });

        // Save the notification to the database
        await newDoc.save();

        return res.json({ sentNotificationDoc: newDoc });
    } catch (error) {
        console.error('Error sending notification:', error);
        return res.status(500).json({ error: 'An error occurred while sending the notification' });
    }
};

export const notificationSendablePlayers = async (req: Request, res: Response): Promise<Response> => {
    const { currentPlayerID } = req.body;

    // Validate currentPlayerID
    if (typeof currentPlayerID !== 'string') {
        return res.status(400).json({ error: 'Invalid currentPlayerID' });
    }

    try {
        // Fetch all players
        const allPlayers: any[] = await UserSchema.find().exec();

        // Filter players who do not have a status as "sent"
        const result = await Promise.all(
            allPlayers.map(async (item) => {
                const doc = await NotificationsSchema.findOne({ senderID: currentPlayerID, receiverID: item.PlayerID }).exec();
                if (!doc) {
                    return item;
                }
                return null;
            })
        );

        // Filter out null values from the result
        const newResult = result.filter(item => item !== null) as any[];

        return res.json({ result: newResult });
    } catch (error) {
        console.error('Error fetching sendable players:', error);
        return res.status(500).json({ error: 'An error occurred while fetching sendable players' });
    }
};

export const acceptNotification = async (req: Request, res: Response): Promise<Response> => {
    const { senderUsername, senderID, playerID, receiverUsername } = req.body;

    // Validate input data
    if (typeof senderUsername !== 'string' || typeof senderID !== 'string' || typeof playerID !== 'string' || typeof receiverUsername !== 'string') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    try {
        // Find the sender's document and update the friend status
        const senderDoc = await FriendsSchema.findOne({ playerID: senderID, 'friendsList.friendID': playerID, 'friendsList.status': 'pending' }).exec();

        if (!senderDoc) {
            return res.status(404).json({ error: 'Notification not found or already processed' });
        }

        // Update the status from pending to friend
        const friend = senderDoc.friendsList.find(frnd => frnd.friendID === playerID);
        if (friend) {
            friend.status = 'friend';
        }
        await senderDoc.save();

        // Add the sender as a friend to the receiver's friend list
        const receiverDoc = await FriendsSchema.findOne({ playerID }).exec();
        if (!receiverDoc) {
            return res.status(404).json({ error: 'Receiver not found' });
        }
        receiverDoc.friendsList.push({ friendUsername: senderUsername, friendID: senderID, status: 'friend' });

        await receiverDoc.save();

        return res.json({ usr1: senderDoc, usr2: receiverDoc });
    } catch (error) {
        console.error('Error accepting notification:', error);
        return res.status(500).json({ error: 'An error occurred while accepting the notification' });
    }
};
