import mongoose from "mongoose";

const friendsListSchema = new mongoose.Schema({
    friendUsername:{
        type:String,
    },
    friendID:{
        type:String,
        // ye game id hai
    },
    status:{
        type:String,
        // ye status hai request k liye
    }
})


const friendsSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    playerID:{
        required:true,
        type:String,
    },
    friendsList:[friendsListSchema]
})

export const FriendsSchema = mongoose.model('FriendsSchema' , friendsSchema);