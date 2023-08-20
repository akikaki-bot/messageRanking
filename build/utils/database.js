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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDatabase = void 0;
const sqlite_1 = __importDefault(require("@keyv/sqlite"));
const D = new sqlite_1.default({ uri: "sqlite://main.db.sqlite" });
/**
 * でーたべーす？？？なにそれおいしいの？？
 *
 * ってひとのためのかんたんそうさつーる
 *
 * （かたんとはいってない）
 *
 * 過酸化水素水
 *
 * @example
 * import CustomDatabase from '../library/db.ts';
 *
 * (async() => {
 *
 * const CustomDatabase = new CustomDatabase().set<string>('name','maicha')
 * //=> Return Promise.resolve
 *
 * const get = await new CustomDatabase().get('name');
 * console.log(get)
 * //=> Return Promise.resolve<ReturnCustomDatabaseType>
 *
 * })()
 */
class CustomDatabase {
    constructor(keyvURI, option) {
        if (typeof keyvURI !== "undefined" ||
            typeof option !== "undefined") {
            // typeof option?.uri !== "undefined" ? option.uri = keyvURI : void 0
            this.Data = new sqlite_1.default(option);
        }
        else {
            this.Data = D;
        }
    }
    /**
     * データベースの内容を読み取る人
     *
     * @param key
     * @returns Promise ReturnCustomDatabaseType
     */
    get(key) {
        return new Promise((resolve, reject) => {
            if (!key)
                return;
            this.Data.get(key).then((value) => {
                resolve(value);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    /**
     * データベースにデータをぶち込む人
     *
     * @param key string
     * @param value string or number
     * @returns Promise string (void)
     */
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof value === "undefined" || (typeof value === "number" && value === 0)) {
                yield this.delete(key);
                return;
            }
            yield this.Data.set(key, value);
        });
    }
    /**
     * データベースからデータを抹消させる人
     *
     * @param key string
     * @returns Promise void
     */
    delete(key) {
        return new Promise((resolve, reject) => {
            this.Data.delete(key).then(() => {
                resolve();
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.Data.clear();
        });
    }
}
exports.CustomDatabase = CustomDatabase;
//export type ReturnCustomDatabaseType = string | number | boolean | void | Array<string | number> | any 
