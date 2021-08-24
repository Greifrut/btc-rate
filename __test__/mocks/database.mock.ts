import { IDb } from "../../src/types/interfaces/IDB";
import { Predicate } from "../../src/types/types/DBConnectorPredicat";

export class MockDatabase implements IDb {
  private db: any = {};
  private q: any[];

  createTable(name: string): boolean {
    this.db[name] = [];
    return true;
  }

  query<T>(): T[] {
    return this.q;
  }

  read(dbName: string): Promise<IDb> {
    this.q = this.db[dbName];
    return Promise.resolve(this);
  }

  where(predicate: Predicate): IDb {
    this.q = this.q.filter(predicate);
    return this;
  }

  write<T>(dbName: string, data: T): Promise<T | null> {
    this.db[dbName].push(data);
    return Promise.resolve(data);
  }
}
