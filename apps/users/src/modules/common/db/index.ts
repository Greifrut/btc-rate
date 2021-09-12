import { IDb, IDbConnector } from '../../../typings/interfaces/IDB';
import { Predicate } from '../../../typings/types/DBConnectorPredicat';

class DatabaseConnector implements IDbConnector {
  private database: IDb;

  use(database: IDb): IDbConnector {
    this.database = database;
    return this;
  }

  createTable(name: string): boolean {
    return this.database.createTable(name);
  }

  removeTable(name: string): Promise<boolean> {
    return this.database.removeTable(name);
  }

  query<T>(): T[] {
    return this.database.query<T>();
  }

  write<T>(dbName: string, data: T): Promise<T | null> {
    return this.database.write<T>(dbName, data);
  }

  read(dbName: string): Promise<IDb> {
    return this.database.read(dbName);
  }

  where(predicate: Predicate): IDb {
    return this.database.where(predicate);
  }
}

export const databaseConnector = new DatabaseConnector();
