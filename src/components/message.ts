import { Message } from "discord.js";
import { CustomDatabase } from "../utils/database";


export class MessageRanking {

    private message : Message
    public db : CustomDatabase

    constructor(message : Message) {
        this.message = message
        this.db = new CustomDatabase()
        this.save()
    }

    private async save() {
        
        const IsJoinedUser_Old = await this.db.get<string>(`joined.users`)
        const oldData = await this.db.get(this.message.author.id)

        const IsJoinedUser = typeof IsJoinedUser_Old === "undefined" ? [] : IsJoinedUser_Old.split(',')
        // 初期化
        if(!IsJoinedUser_Old || IsJoinedUser.length === 0){
            await this.db.set(`joined.users`, [this.message.author.id].join(','))
        } else {
           const Joined = IsJoinedUser.find(v => v === this.message.author.id)
           if(!Joined) IsJoinedUser.push(this.message.author.id)
           await this.db.set(`joined.users`, IsJoinedUser.join(','))
        }
        // データ代入
        if(!oldData) {
            await this.db.set(this.message.author.id, 1)
        } else {
            await this.db.set(this.message.author.id, (Number(oldData) + 1))
        }
    }
}