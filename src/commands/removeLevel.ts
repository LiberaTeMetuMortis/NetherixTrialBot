import { EmbedBuilder } from "discord.js";
import levelScheme from "../schemes/levelRewardScheme";
import Command, { NumberOption, StringOption } from "../utils/discord/commandHandler";
export default new Command({
    name: "remove-levelreward",
    description: "Removes a level reward from the server.",
    options: [
        {
            name: "level",
            description: "The level to remove the reward from.",
            type: "number",
        },
        {
            name: "reward",
            description: "The reward to remove from the user.",
            type: "string",
        }
    ],
    permissions: ["MANAGE_GUILD"],
    async run(interaction){
        const { value: level } = interaction.options.get("level", true) as NumberOption
        const { value: reward } = interaction.options.get("reward", true) as StringOption
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
        const levelReward = levelRewards.find( (levelReward) => levelReward.level === level )
        if(levelReward === undefined){
            const noLevelEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("There is no reward for this level.")
                .setColor("Red")
            await interaction.reply({embeds: [noLevelEmbed]})
            return
        }
        const rewards = levelReward.rewards
        const rewardIndex = rewards.indexOf(reward)
        if(rewardIndex === -1){
            const noRewardEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("There is no reward for this level.")
                .setColor("Red")
            await interaction.reply({embeds: [noRewardEmbed]})
            return
        }
        rewards.splice(rewardIndex, 1)
        await guildData.save()
        
        const successEmbed = new EmbedBuilder()
            .setTitle("Success")
            .setDescription(`Removed the reward <@&${reward}> from level \`${level}\`.`)
            .setColor("Green")
        await interaction.reply({embeds: [successEmbed]})
    }
})