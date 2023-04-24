import fs from "fs/promises"
import Config from "../../types/config";
import {ButtonInteraction, CacheType} from "discord.js";
export async function listButtons(){
    try {
        const buttonFolder =
            (await fs.readdir("dist/buttons"))
                .filter(file => file.endsWith(".js"))
                .map(file => file.slice(0, file.length-3))

        const buttonPromises = buttonFolder.map(button => import(`../../../dist/buttons/${button}`))

        return Promise.all(buttonPromises) as Promise<{ default: Button }[]>
    }
    catch (e) {
        return []
    }
}

export default class Button {
    name: string
    run: (interaction: ButtonInteraction<CacheType>, config: Config) => void
    constructor(settings: {
        name: string,
        run: (interaction: ButtonInteraction<CacheType>, config: Config) => void
    }){
        this.name = settings.name
        this.run = settings.run
    }
}