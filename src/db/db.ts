import {writeFile, readFile} from "fs/promises";

class Db {
    private dbFolder: string = `${__dirname}/src/db/tables/`;
    private queriedData: any = [];

    constructor() {}

    private _resetQueriedData() {
        this.queriedData = [];
    }

    createDB(name: string) {
        writeFile(`${this.dbFolder}${name}.json`, JSON.stringify([]));
    }

    async query() {
        return this.queriedData;
    }

    async write<T = any>(dbName: string, data: T): Promise<T | null> {
        try {
            const existingData = (await this.read(dbName)).query();
            const newData = [existingData, data];

            await writeFile(`${this.dbFolder}${dbName}.json`, JSON.stringify(newData));

            this._resetQueriedData();

            return data;
        } catch (e) {
            return null;
        }
    }

    async read (dbName: string): Promise<this> {
        this._resetQueriedData();
        const data = await readFile(`${this.dbFolder}${dbName}`);
        this.queriedData = JSON.parse(data.toString());
        return this;
    }

    where(field: string, value: any) {
        this.queriedData = this.queriedData.filter((row) => row[field] === value);
        return this;
    }
}

export default new Db();