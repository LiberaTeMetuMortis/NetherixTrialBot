import {Interaction} from "discord.js";

export type Perm = "CREATE_INSTANT_INVITE" | "KICK_MEMBERS" | "BAN_MEMBERS" | "ADMINISTRATOR" | "MANAGE_CHANNELS" | "MANAGE_GUILD" | "ADD_REACTIONS" | "VIEW_AUDIT_LOG" | "PRIORITY_SPEAKER" | "STREAM" | "VIEW_CHANNEL" | "SEND_MESSAGES"
| "SEND_TTS_MESSAGES" | "MANAGE_MESSAGES" | "EMBED_LINKS" | "ATTACH_FILES" | "READ_MESSAGE_HISTORY" | "MENTION_EVERYONE" | "USE_EXTERNAL_EMOJIS" | "VIEW_GUILD_INSIGHTS" | "CONNECT" | "SPEAK" | "MUTE_MEMBERS" | "DEAFEN_MEMBERS" 
| "MOVE_MEMBERS" | "USE_VAD" | "CHANGE_NICKNAME" | "MANAGE_NICKNAMES" | "MANAGE_ROLES" | "MANAGE_WEBHOOKS" | "MANAGE_EMOJIS_AND_STICKERS" | "USE_APPLICATION_COMMANDS" | "REQUEST_TO_SPEAK" | "MANAGE_EVENTS" | "MANAGE_THREADS" 
| "USE_PUBLIC_THREADS" | "USE_PRIVATE_THREADS" | "USE_EXTERNAL_STICKERS" | "SEND_MESSAGES_IN_THREADS" | "USE_EMBEDDED_ACTIVITIES" | "MODERATE_MEMBERS";

export function convertPermissions(permissions: Perm[]): number {
    const bitPerms = permissions.map(stringToPerm)
    const totalPerm = bitPerms.reduce((a, b) => a | b, 0)
    return totalPerm
}

export function stringToPerm(str: Perm): number {
    if(str === "CREATE_INSTANT_INVITE") return 1<<0;
    if(str === "KICK_MEMBERS") return 1<<1;
    if(str === "BAN_MEMBERS") return 1<<2;
    if(str === "ADMINISTRATOR") return 1<<3;
    if(str === "MANAGE_CHANNELS") return 1<<4;
    if(str === "MANAGE_GUILD") return 1<<5;
    if(str === "ADD_REACTIONS") return 1<<6;
    if(str === "VIEW_AUDIT_LOG") return 1<<7;
    if(str === "PRIORITY_SPEAKER") return 1<<8;
    if(str === "STREAM") return 1<<9;
    if(str === "VIEW_CHANNEL") return 1<<10;
    if(str === "SEND_MESSAGES") return 1<<11;
    if(str === "SEND_TTS_MESSAGES") return 1<<12;
    if(str === "MANAGE_MESSAGES") return 1<<13;
    if(str === "EMBED_LINKS") return 1<<14;
    if(str === "ATTACH_FILES") return 1<<15;
    if(str === "READ_MESSAGE_HISTORY") return 1<<16;
    if(str === "MENTION_EVERYONE") return 1<<17;
    if(str === "USE_EXTERNAL_EMOJIS") return 1<<18;
    if(str === "VIEW_GUILD_INSIGHTS") return 1<<19;
    if(str === "CONNECT") return 1<<20;
    if(str === "SPEAK") return 1<<21;
    if(str === "MUTE_MEMBERS") return 1<<22;
    if(str === "DEAFEN_MEMBERS") return 1<<23;
    if(str === "MOVE_MEMBERS") return 1<<24;
    if(str === "USE_VAD") return 1<<25;
    if(str === "CHANGE_NICKNAME") return 1<<26;
    if(str === "MANAGE_NICKNAMES") return 1<<27;
    if(str === "MANAGE_ROLES") return 1<<28;
    if(str === "MANAGE_WEBHOOKS") return 1<<29;
    if(str === "MANAGE_EMOJIS_AND_STICKERS") return 1<<30;
    if(str === "USE_APPLICATION_COMMANDS") return 1<<31;
    if(str === "REQUEST_TO_SPEAK") return 1<<32;
    if(str === "MANAGE_EVENTS") return 1<<33;
    if(str === "MANAGE_THREADS") return 1<<34;
    if(str === "USE_PUBLIC_THREADS") return 1<<35;
    if(str === "USE_PRIVATE_THREADS") return 1<<36;
    if(str === "USE_EXTERNAL_STICKERS") return 1<<37;
    if(str === "SEND_MESSAGES_IN_THREADS") return 1<<38;
    if(str === "USE_EMBEDDED_ACTIVITIES") return 1<<39;
    if(str === "MODERATE_MEMBERS") return 1<<40;
    return 0
}

export function checkForAuthentication(interaction: Interaction){
    return [
        "314774529207566337", // Ben
        "397782545950965782", // Civciv
        "409317040659103745", // Ahmet Abi
        "189774499099443200"  // Uğur Abi 
    ].includes(interaction.user.id)
}