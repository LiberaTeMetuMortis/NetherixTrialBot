import { EmbedBuilder } from "discord.js";
import levelScheme from "../schemes/levelRewardScheme";
import Command from "../utils/discord/commandHandler";
export default new Command({
    name: "list-levelrewards",
    description: "Lists all the level rewards for the server.",
    permissions: ["MANAGE_GUILD"],
    async run(interaction){
        const guild = interaction.guild
        if(guild === null){
            const guildsOnlyEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("This command can only be used in a guild.")
                .setColor("Red")
            await interaction.reply({embeds: [guildsOnlyEmbed]})
            return
        }
        const guildID = guild.id
        const guildData = await levelScheme.findOne( { guildID } ).exec()
        if(guildData === null){
            const noDataEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("There is no role rewards for this server.")
                .setColor("Red")
            await interaction.reply({embeds: [noDataEmbed]})
            return
        }
        const levelRewards = guildData.levelRewards
        const embed = new EmbedBuilder()
            .setTitle("Level Rewards")
            .setColor("Green")
        for(const levelReward of levelRewards){
            const level = levelReward.level
            const rewards = levelReward.rewards
            embed.addFields({ name: `Level ${level}`, value: rewards.map(reward => `<@&${reward}>`).join("\n") })
        }
        await interaction.reply({embeds: [embed]})
    }
})