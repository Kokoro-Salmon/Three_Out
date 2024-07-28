import mongoose from "mongoose";

const playerStatsSchema = new mongoose.Schema({
    playerID:{
        required:true,
        type:String,
    },
    wins:{
        type:Number,
    },
    loss:{
        type:Number,
    },
    gamesPlayed:{
        type:Number,
    },
    playerUserName:{
        required:true,
        type:String,
    }
})

export const PlayerStatsSchema = mongoose.model('PlayerStatsSchema', playerStatsSchema);