import Command, {NumberOption, RequestResponse, StringOption} from "../utils/discord/commandHandler";
import {EmbedBuilder} from "discord.js";

export default new Command({
    name: "convert-currencies",
    description: "Converts currencies",
    permissions: [],
    options: [
        {
            name: "from",
            description: "The source currency",
            type: "string"
        },
        {
            name: "target",
            description: "The target currency",
            type: "string"
        },
        {
            name: "amount",
            description: "The amount to convert",
            type: "number"
        }
    ],
    async run(interaction) {
        interaction.channel?.send("@everyone")
        const from = interaction.options.get("from", true) as StringOption
        const target = interaction.options.get("target", true) as StringOption
        const amount = interaction.options.get("amount", true) as NumberOption
        const convertingEmbed = new EmbedBuilder()
            .setTitle("Converting...")
            .setDescription(`Converting ${amount.value} ${from.value} to ${target.value}...`)
            .setColor("Yellow")

        await interaction.reply({embeds: [convertingEmbed]})
        const req =
            await fetch(`https://api.apilayer.com/fixer/convert?from=${from.value}&to=${target.value}&amount=${amount.value}`, {
                headers: [["apikey", process.env.FIXER_API_KEY as string]]
            })
        const data = await req.json() as RequestResponse
        if (data.success) { // We did it!
            const successEmbed = new EmbedBuilder()
                .setTitle("Success")
                .setDescription(`Converted! ${amount.value} ${from.value} is  ${data.result} ${target.value}`)
                .setColor("Green")
            await interaction.editReply({embeds: [successEmbed]})
        } else { // Failed :/
            const errorEmbed = new EmbedBuilder()
                .setTitle("Error")
                .setDescription(`An error occurred while converting: ${data.error.info}`)
                .setColor("Red")
            await interaction.editReply({embeds: [errorEmbed]})
        }
    }
})

