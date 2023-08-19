import { MessageRanking } from "./message";
import { Message } from "discord.js"


export class MessageRankingCore extends MessageRanking {

    public MessageCount : number[] 
    public MessageCountJoinedUser : { "author" : string | number , "count" : number }[]
    public SortedMessageCount : number[]

    

    constructor(message : Message ) {
        super(message)

        this.MessageCount = []
        this.MessageCountJoinedUser = []

        this.SortedMessageCount = []
    }

    public async end() {
         const JoinedUsers = (await this.db.get<string>(`joined.users`)).split(',')
         JoinedUsers.map(async v => {
              const UserCount = await this.db.get<number>(v)
              this.MessageCountJoinedUser.push(
                  {
                      author : v,
                      count : UserCount
                  }
              )
              this.MessageCount.push(UserCount)
         })

        this.SortedMessageCount = this.MessageCount.sort((a , b) => b - a)
        return await this.sort()
    }

    public async sort() {

        const ReturnValue : { zyuni : number , author : number | string , count : number }[] = []

        const MessageSorted = this.SortedMessageCount.map(vx => {
            return this.MessageCountJoinedUser.findIndex(v => v.count === vx)
        })

        for(let i : number = 0; i < MessageSorted.length; i++) {
            ReturnValue.push(
                 {
                    zyuni : i,
                    author : this.MessageCountJoinedUser[MessageSorted[i]].author,
                    count : this.MessageCountJoinedUser[MessageSorted[i]].count
                 }
            )
        }

        await this.db.Data.clear()
        return ReturnValue
    }
}