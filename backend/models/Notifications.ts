import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema({
    senderID:{
        required:true,
        type:String,
    },
    senderUsername:{
        required:true,
        type:String,
    },
    receiverID:{
        required:true,
        type:String,
    },
    status:{
        type:String,
    }
})

export const NotificationsSchema = mongoose.model('NotificationsSchema' , notificationsSchema);