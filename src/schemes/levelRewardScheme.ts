import mongoose from 'mongoose';

const levelReward = new mongoose.Schema({
    guildID: String,
    levelRewards: [{level: Number, rewards: [String]}]
});
export default mongoose.model('LevelReward', levelReward);