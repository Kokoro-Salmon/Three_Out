import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectiontodb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: "UsersInMpGame",
    });
    console.log("DB connected successfully");
    console.log("Sahi me connect ho gaya database bharosa rakh");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

export default connectiontodb;
