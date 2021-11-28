import {DBTables} from './DBTables';

export interface IInsertQuery {
  tableName: DBTables;
  model: any;
  data: any;
  con: any;
}

export interface IByIdQuery {
  tableName: DBTables;
  id: string;
  con: any;
}
