import discord, {
    SlashCommandAttachmentOption,
    SlashCommandBooleanOption,
    SlashCommandBuilder,
    SlashCommandChannelOption,
    SlashCommandIntegerOption,
    SlashCommandMentionableOption,
    SlashCommandNumberOption,
    SlashCommandRoleOption,
    SlashCommandStringOption,
    SlashCommandUserOption
} from "discord.js"
import fs from "fs/promises"
import {convertPermissions, Perm} from "./discordPermissions"
export async function listCommands(){
    try {
        const commandFolder =
            (await fs.readdir("dist/commands"))
                .filter(file => file.endsWith(".js"))
                .map(file => file.slice(0, file.length-3))

        const commandPromises = commandFolder.map(command => import(`../../../dist/commands/${command}`))

        return Promise.all(commandPromises) as Promise<{ default: Command }[]>
    } catch (e) {
        return []
    }
}

export function convertCommands(commands: Command[]){
    const arr: SlashCommandBuilder[] = []
    for(let command of commands){
        const slashCommand = new SlashCommandBuilder()
        slashCommand.setName(command.name)
        slashCommand.setDescription(command.description)
        slashCommand.setDefaultMemberPermissions(convertPermissions(command.permissions))
        for(let option of command.options){
            if(option.type === "attachment"){
                slashCommand.addAttachmentOption(new SlashCommandAttachmentOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "boolean"){
                slashCommand.addBooleanOption(new SlashCommandBooleanOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "channel"){
                slashCommand.addChannelOption(new SlashCommandChannelOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "integer"){
                slashCommand.addIntegerOption(new SlashCommandIntegerOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "mentionable"){
                slashCommand.addMentionableOption(new SlashCommandMentionableOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }
            
            else if(option.type == "number"){
                slashCommand.addNumberOption(new SlashCommandNumberOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "role"){
                slashCommand.addRoleOption(new SlashCommandRoleOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "string"){
                slashCommand.addStringOption(new SlashCommandStringOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }

            else if(option.type == "user"){
                slashCommand.addUserOption(new SlashCommandUserOption()
                    .setName(option.name)
                    .setDescription(option.description)
                    .setRequired(option.required ?? true)
                )
            }
        }
        arr.push(slashCommand)
    }
    return arr
}

export default class Command {
    name: string
    permissions: Perm[]
    description: string
    options: Option[]
    run: (interaction: InteractionCommand) => void;
    
    constructor(settings: {
        name: string,
        permissions: Perm[],
        description: string,
        options?: Option[],
        run: (interaction: InteractionCommand) => void,
    }){
        this.name = settings.name
        this.description = settings.description
        this.permissions = [...new Set(settings.permissions)]
        this.options = settings.options || []
        this.run = settings.run;
    }
}


export type Option = {
    type: OptionTypes
    name: string,
    description: string,
    required?: boolean
}

type OptionTypes = "role" | "user" | "number" | "string" 
| "boolean" | "channel" | "integer" | "attachment" | "mentionable"

export type InteractionCommand = discord.ChatInputCommandInteraction<discord.CacheType> | discord.MessageContextMenuCommandInteraction<discord.CacheType> | discord.UserContextMenuCommandInteraction<discord.CacheType>

export type StringOption = { value: string }
export type NumberOption = { value: number }
export type RequestResponse = { success: true, result: number } | // It is successful
                       { success: false, error: { info: string } }  // It is not
