import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objID = Schema.ObjectId;

const gamingHistorySchema = new mongoose.Schema({
    playerID:{
        required:true,
        type:String,
    },
    loserID:{
        required:true,
        type:String,
    },
    winnerID:{
        required:true,
        type:String,
    },
    gameStatus:{
        type:String,
    },
    date:{
        type:String,
    }
})

export const GamingHistorySchema = mongoose.model('GamingHistorySchema' , gamingHistorySchema);