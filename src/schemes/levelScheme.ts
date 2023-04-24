import mongoose from "mongoose";

const levelScheme = new mongoose.Schema({
    guildID: String,
    userID: String,
    xp: Number,
})
export default mongoose.model("Level", levelScheme);