import Config from "./types/config";
import discord, {
    ButtonInteraction, CacheType, EmbedBuilder,
} from "discord.js"
import process from "process"
import dotenv from "dotenv-safe"
import yaml from "yaml"
import fs from "fs"
import { InteractionCommand, listCommands } from "./utils/discord/commandHandler"
import deployCommands from "./utils/discord/deployCommands"
import { listButtons } from "./utils/discord/buttonHandler";
import mongoose from "mongoose";
import levelScheme from "./schemes/levelScheme";
import levelRewardScheme from "./schemes/levelRewardScheme";
process.on('uncaughtException', (err) => {
    console.error(err)
})
dotenv.config()
let config = yaml.parse(fs.readFileSync("./config.yml", "utf-8")) as Config
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL as string);

const commands = new Map<string, (interaction: InteractionCommand, config: Config) => void>;
const buttons = new Map<string, (interaction: ButtonInteraction<CacheType>, config: Config) => void>;
const client = new discord.Client({
    intents: ["Guilds", "GuildMessages"],
})
client.on("ready", async () => {

    const commandList = (await listCommands()).map(command => command.default)
    const buttonList = (await listButtons()).map(button => button.default)

    for(let command of commandList){
        commands.set(command.name, command.run)
    }

    for(let button of buttonList){
        buttons.set(button.name, button.run)
    }
    await deployCommands(commandList, client, [])

})

client.on('interactionCreate', async(interaction) => {

    // Initialize commands
    if(interaction.isChatInputCommand()){
        const { commandName } = interaction
        const commandFunction = commands.get(commandName)
        if(commandFunction !== undefined){
            commandFunction(interaction, config)
        }
    }

    // Initialize buttons
    if(interaction.isButton()){
        const { customId } = interaction
        const buttonFunction = buttons.get(customId)
        if(buttonFunction !== undefined){
            buttonFunction(interaction, config)
        }
    }

})

client.on('messageCreate', async(message) => {
    if(message.author.bot) return;
    await handleLevel(message)
})

async function handleLevel(message: discord.Message){
    if(message.guild === null) return;
    const guildID = message.guild.id
    const userID = message.author.id
    const userData = await levelScheme.findOne( { guildID, userID } ).exec()
    const rewardXP = Math.floor(Math.random() * 10) + 1
    if(userData === null){
        const newUserData = new levelScheme ({
            guildID,
            userID,
            xp: rewardXP,
        })
        await newUserData.save()
    }
    else {
        // Increase user xp using a random number between 1 and 10 and using $inc operator
        await userData.updateOne({ $inc: { xp: rewardXP } }).exec()
    }
    const userXP = (userData?.xp || 0) + rewardXP
    // Calculate level of the user for level rewards
    // Every level needs level*level*10 xp for example level 2 needs 2*2*10 = 40 xp
    const userLevelBeforeMessage = Math.floor(Math.sqrt((userXP-rewardXP)*0.1))
    const userLevelAfterMessage = Math.floor(Math.sqrt(userXP*0.1))
    if(userLevelBeforeMessage !== userLevelAfterMessage){
        const levelUpEmbed = new EmbedBuilder()
            .setTitle("Level up!")
            .setDescription(`You are now level ${userLevelAfterMessage}`)
            .setColor("Green")
        await message.reply({ embeds: [levelUpEmbed] })
    }
    const levelRewards = await levelRewardScheme.findOne( { guildID } ).exec()
    if(levelRewards === null) return
    const levelReward = levelRewards.levelRewards.find(reward => reward.level === userLevelAfterMessage)
    if(levelReward === undefined) return
    const roleNames = levelReward.rewards
    for(const roleName of roleNames){
        const role = await message.guild.roles.fetch(roleName)
        if(role === null) continue
        const member = message.member
        if(member === null) continue
        await member.roles.add(role)
    }
}
client.login(process.env.TOKEN as string)