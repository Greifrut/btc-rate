import { Predicate } from '../types/DBConnectorPredicat';

export interface IDb {
  createTable(name: string): boolean;
  removeTable(name: string): Promise<boolean>;
  query<T>(): T[];
  write<T>(dbName: string, data: T): Promise<T | null>;
  read(dbName: string): Promise<IDb>;
  where(predicate: Predicate): IDb;
}

export interface IDbConnector extends IDb {
  use(database: IDb): IDbConnector;
}
