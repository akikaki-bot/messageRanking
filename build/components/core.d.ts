import { MessageRanking } from "./message";
import { Message } from "discord.js";
export declare class MessageRankingCore extends MessageRanking {
    MessageCount: number[];
    MessageCountJoinedUser: {
        "author": string | number;
        "count": number;
    }[];
    SortedMessageCount: number[];
    constructor(message?: Message);
    end(): Promise<{
        zyuni: number;
        author: string | number;
        count: number;
    }[]>;
    clear(): Promise<void>;
    sort(): {
        zyuni: number;
        author: number | string;
        count: number;
    }[];
    private sleep;
}
