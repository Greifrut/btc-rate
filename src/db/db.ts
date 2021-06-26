import {exists, promises as fs} from "fs";
import {existsSync} from "fs";

class Db {
    private dbFolder: string = `${__dirname}/tables/`;
    private queriedData: any = [];

    constructor() {}

    createDB(name: string) {
        if (this._isDbExists(name)) return;
        fs.writeFile(`${this.dbFolder}${name}.json`, JSON.stringify([]));
    }

    query(): any[] {
        return this.queriedData;
    }

    async write<T = any>(dbName: string, data: T): Promise<T | null> {
        try {
            const existingData = (await this.read(dbName)).query();
            const newData = [...existingData, data];

            await fs.writeFile(`${this.dbFolder}${dbName}.json`, JSON.stringify(newData));

            this._resetQueriedData();

            return data;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async read (dbName: string): Promise<this> {
        this._resetQueriedData();
        const data = await fs.readFile(`${this.dbFolder}${dbName}.json`);
        this.queriedData = JSON.parse(data.toString());
        return this;
    }

    where(field: string, value: any) {
        this.queriedData = this.queriedData.filter((row) => row[field] === value);
        return this;
    }

    private _isDbExists(dbName: string) {
        return existsSync(`${this.dbFolder}${dbName}.json`);
    }

    private _resetQueriedData() {
        this.queriedData = [];
    }
}

export default new Db();