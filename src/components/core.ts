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
                      count : Number(UserCount)
                  }
              )
              this.MessageCount.push(Number(UserCount))
         })

         await this.sleep(100)

        this.SortedMessageCount = this.MessageCount.sort((a , b) => b - a)
        return this.sort()
    }

    public sort() {

        const ReturnValue : { zyuni : number , author : number | string , count : number }[] = []

        const MessageSorted = this.SortedMessageCount.map(vx => {
            return this.MessageCountJoinedUser.findIndex(v => Number(v.count) === vx)
        })


        for(let i : number = 0; i < MessageSorted.length; i++) {
            ReturnValue.push(
                 {
                    zyuni : i + 1,
                    author : this.MessageCountJoinedUser[MessageSorted[i]].author,
                    count : Number(this.MessageCountJoinedUser[MessageSorted[i]].count)
                 }
            )
        }
        return ReturnValue
    }

    private sleep(ms : number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }   
}