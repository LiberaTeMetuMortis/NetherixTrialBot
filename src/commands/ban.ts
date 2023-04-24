import Command from "../utils/discord/commandHandler";
import {EmbedBuilder} from "discord.js";

export default new Command({
    name: "ban",
    description: "Ban a user",
    options: [
        {
            name: "member",
            description: "The member to ban",
            type: "user",
        }
    ],
    permissions: ["BAN_MEMBERS"],
    async run(interaction) {
        const user = interaction.options.getUser("member", true)
        if (interaction.guild === null) {
            const guildsOnlyEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("This command can only be used in a guild.")
                .setColor("Red")
            await interaction.reply({embeds: [guildsOnlyEmbed]})
            return
        }
        const member = await interaction.guild.members.fetch(user.id)
        if (member === undefined) {
            const memberNotFoundEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription("Member not found")
                .setColor("Red")
            await interaction.reply({embeds: [memberNotFoundEmbed]})
        }
        try {
            await member.ban({reason: `Banned by ${interaction.user.tag} (${interaction.user.id})`})
            const banSuccessEmbed = new EmbedBuilder()
                .setTitle("Success")
                .setDescription(`Successfully banned ${member.user.tag}`)
                .setColor("Green")
            await interaction.reply({embeds: [banSuccessEmbed]})
        } catch (e) {
            const banFailedEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(`Failed to ban ${member.user.tag}`)
                .setColor("Red")
            await interaction.reply({embeds: [banFailedEmbed]})
        }
    }
})