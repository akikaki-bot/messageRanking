"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRankingCore = void 0;
const message_1 = require("./message");
class MessageRankingCore extends message_1.MessageRanking {
    constructor(message) {
        super(message);
        this.MessageCount = [];
        this.MessageCountJoinedUser = [];
        this.SortedMessageCount = [];
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            const JoinedUsers = (yield this.db.get(`joined.users`)).split(',');
            JoinedUsers.map((v) => __awaiter(this, void 0, void 0, function* () {
                const UserCount = yield this.db.get(v);
                this.MessageCountJoinedUser.push({
                    author: v,
                    count: Number(UserCount)
                });
                this.MessageCount.push(Number(UserCount));
            }));
            yield this.sleep(100);
            this.SortedMessageCount = this.MessageCount.sort((a, b) => b - a);
            return this.sort();
        });
    }
    sort() {
        const ReturnValue = [];
        const MessageSorted = this.SortedMessageCount.map(vx => {
            return this.MessageCountJoinedUser.findIndex(v => Number(v.count) === vx);
        });
        for (let i = 0; i < MessageSorted.length; i++) {
            ReturnValue.push({
                zyuni: i + 1,
                author: this.MessageCountJoinedUser[MessageSorted[i]].author,
                count: Number(this.MessageCountJoinedUser[MessageSorted[i]].count)
            });
        }
        return ReturnValue;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.MessageRankingCore = MessageRankingCore;
