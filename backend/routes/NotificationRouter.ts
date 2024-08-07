import express, { Router } from "express";
import {
  fetcNotifications,
  deleteNotification,
  checkIfNotificationSent,
  sendNotification,
  notificationSendablePlayers,
  acceptNotification,
} from "../controllers/Notification";

const router: Router = express.Router();

router.post("/FetchNotif", fetcNotifications);
router.post("/DeleteNotif", deleteNotification);
router.post("/CheckNotif", checkIfNotificationSent);
router.post("/SendNotif", sendNotification);
router.post("/AcceptNotif", acceptNotification);
router.get("/NotifIsSendableOrNot", notificationSendablePlayers);

export default router;
