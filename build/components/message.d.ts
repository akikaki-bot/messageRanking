import { Message } from "discord.js";
import { CustomDatabase } from "../utils/database";
export declare class MessageRanking {
    private message;
    db: CustomDatabase;
    constructor(message: Message);
    private save;
}
