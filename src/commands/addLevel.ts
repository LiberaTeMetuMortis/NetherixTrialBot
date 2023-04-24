import {EmbedBuilder} from "discord.js";
import Command, {NumberOption, StringOption} from "../utils/discord/commandHandler";
import levelScheme from "../schemes/levelRewardScheme";

export default new Command({
    name: "add-levelreward",
    description: "Adds a level reward to the server.",
    options: [
        {
            name: "level",
            description: "The level to add the reward to.",
            type: "number",
        },
        {
            name: "reward",
            description: "The reward to give to the user.",
            type: "string",
        }
    ],
    permissions: ["MANAGE_GUILD"],
    async run(interaction) {
        const {value: level} = interaction.options.get("level", true) as NumberOption
        const {value: reward} = interaction.options.get("reward", true) as StringOption
        const { guild } = interaction
        if (guild === null) {
            const guildsOnlyEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("This command can only be used in a guild.")
                .setColor("Red")
            await interaction.reply({embeds: [guildsOnlyEmbed]})
            return
        }
        const role = await guild.roles.fetch(reward)
        if (role === null) {
            const invalidRoleEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("The role you provided is invalid.")
                .setColor("Red")
            await interaction.reply({embeds: [invalidRoleEmbed]})
            return
        }
        const guildID = guild.id
        const guildData = await levelScheme.findOne({guildID}).exec()
        if (guildData === null) {
            // Create new data
            levelScheme.create({guildID, levelRewards: {level, rewards: [reward]}})
        } else {
            // Update data
            const levelRewards = guildData.levelRewards
            const levelReward = levelRewards.find((levelReward) => levelReward.level === level)
            if (levelReward === undefined) {
                levelRewards.push({level, rewards: [reward]})
            } else {
                levelReward.rewards.push(reward)
            }
            await guildData.save()
        }
        const successEmbed = new EmbedBuilder()
            .setTitle("Success")
            .setDescription(`Added reward <@&${reward}> reward to level ${level}!`)
            .setColor("Green")
        await interaction.reply({embeds: [successEmbed]})
    }
})