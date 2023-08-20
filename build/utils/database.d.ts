import KeyvSqlite from '@keyv/sqlite';
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
export declare class CustomDatabase {
    Data: KeyvSqlite<any>;
    constructor(keyvURI?: string, option?: KeyvSqlite.Options);
    /**
     * データベースの内容を読み取る人
     *
     * @param key
     * @returns Promise ReturnCustomDatabaseType
     */
    get<T = any>(key: string): Promise<T>;
    /**
     * データベースにデータをぶち込む人
     *
     * @param key string
     * @param value string or number
     * @returns Promise string (void)
     */
    set<T = any>(key: string, value: T): Promise<void>;
    /**
     * データベースからデータを抹消させる人
     *
     * @param key string
     * @returns Promise void
     */
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
}
export type CustomDatabaseType = string | number | any;
