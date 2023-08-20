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
exports.MessageRanking = void 0;
const database_1 = require("../utils/database");
class MessageRanking {
    constructor(message) {
        this.message = message;
        this.db = new database_1.CustomDatabase();
        this.save();
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const IsJoinedUser_Old = yield this.db.get(`joined.users`);
            const oldData = yield this.db.get(this.message.author.id);
            const IsJoinedUser = typeof IsJoinedUser_Old === "undefined" ? [] : IsJoinedUser_Old.split(',');
            // 初期化
            if (!IsJoinedUser_Old || IsJoinedUser.length === 0) {
                yield this.db.set(`joined.users`, [this.message.author.id].join(','));
            }
            else {
                const Joined = IsJoinedUser.find(v => v === this.message.author.id);
                if (!Joined)
                    IsJoinedUser.push(this.message.author.id);
                yield this.db.set(`joined.users`, IsJoinedUser.join(','));
            }
            // データ代入
            if (!oldData) {
                yield this.db.set(this.message.author.id, 1);
            }
            else {
                yield this.db.set(this.message.author.id, (Number(oldData) + 1));
            }
        });
    }
}
exports.MessageRanking = MessageRanking;
