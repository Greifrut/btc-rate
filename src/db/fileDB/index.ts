import { promises as fs, existsSync } from "fs";
import { IDb } from "../../types/interfaces/IDB";
import { Predicate } from "../../types/types/DBConnectorPredicat";

export class FileDB implements IDb {
  private queriedData: any = [];

  constructor(private readonly dbFolder: string) {}

  createTable(name: string): boolean {
    try {
      if (this.isDbExists(name)) {
        return true;
      }

      fs.writeFile(`${this.dbFolder}${name}.json`, JSON.stringify([]));

      return true;
    } catch (e) {
      return false;
    }
  }

  query<T>(): T[] {
    return this.queriedData;
  }

  async write<T = any>(dbName: string, data: T): Promise<T | null> {
    try {
      const existingData = (await this.read(dbName)).query();
      const newData = [...existingData, data];

      await fs.writeFile(
        `${this.dbFolder}${dbName}.json`,
        JSON.stringify(newData)
      );

      this.resetQueriedData();

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async read(dbName: string): Promise<this> {
    this.resetQueriedData();

    const data = await fs.readFile(`${this.dbFolder}${dbName}.json`);
    this.queriedData = JSON.parse(data.toString());

    return this;
  }

  where(predicate: Predicate): this {
    this.queriedData = this.queriedData.filter(
      predicate /* (row) => row.field === value */
    );

    return this;
  }

  private isDbExists(dbName: string) {
    return existsSync(`${this.dbFolder}${dbName}.json`);
  }

  private resetQueriedData() {
    this.queriedData = [];
  }
}
