import * as Keyv from '@keyv/sqlite'

const D = new Keyv({uri : "sqlite://main.db.sqlite"}) 

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
export class CustomDatabase {

    public Data : Keyv<any>
    constructor(
        keyvURI ?: string , option ?: Keyv.Options
    ){
        if(
           typeof keyvURI !== "undefined" ||
           typeof option !== "undefined"
          ) {
           // typeof option?.uri !== "undefined" ? option.uri = keyvURI : void 0
            this.Data = new Keyv(option)
        } else {
            this.Data = D;
        }
    }

    /**
     * データベースの内容を読み取る人
     * 
     * @param key 
     * @returns Promise ReturnCustomDatabaseType
     */
    get<T = any>(key: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            if(!key) return;
            this.Data.get(key).then((value) => {
                resolve(value)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    /**
     * データベースにデータをぶち込む人
     * 
     * @param key string
     * @param value string or number
     * @returns Promise string (void)
     */
    async set<T = any>(key: string, value: T): Promise<void> {
        if(typeof value === "undefined" || (typeof value === "number" && value === 0)) {
            await this.delete(key)
            return;
        }
        await this.Data.set(key, value)
    }

    /**
     * データベースからデータを抹消させる人
     * 
     * @param key string
     * @returns Promise void
     */
    delete(key: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            (this.Data.delete(key) as Promise<boolean>).then(() => {
                resolve()
            })
            .catch((err) => {
                reject(err)
            })
        })
    }
}

export type CustomDatabaseType = string | number | any
//export type ReturnCustomDatabaseType = string | number | boolean | void | Array<string | number> | any 