import {Client, ContextMenuCommandBuilder, REST, Routes} from "discord.js"
import Command, {convertCommands} from "./commandHandler"

export default async function(commandList: Command[], client: Client, contextMenus: ContextMenuCommandBuilder[] = []){
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN ?? "");
    try {
		console.log(`Started refreshing (/) commands.`);
		// The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
			Routes.applicationCommands(client.user?.id as string),
			{ body: [...convertCommands(commandList), ...contextMenus] },
		) as { length: number };

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}
