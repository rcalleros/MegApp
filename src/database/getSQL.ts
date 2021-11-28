import {IInsertQuery, IByIdQuery} from '../types/IQueryTypes';

const mergeAndChop = (collection: string[]) => {
  const merged = collection.join(', ');
  console.log('merged', collection);
  return merged.substring(0, merged.length);
};
export const SQLInsertIntoDB = (config: IInsertQuery) => {
  const values: string[] = [];
  const fields: string[] = [];
  Object.keys(config.model).map((x: string) => {
    if (x === 'id') {
      return;
    }
    const sanitized = config.con.escape(config.data[x]);
    fields.push(x);
    values.push(sanitized);
    return x;
  });
  return `INSERT INTO ${config.tableName} (${mergeAndChop(fields)}) VALUES (${mergeAndChop(values)})`;
};

export const SQLGetItemById = (config: IByIdQuery) => {
  const cleanId = config.con.escape(config.id);
  return `SELECT * FROM ${config.tableName} WHERE ID =${cleanId}`;
};

export const SQLUpdateItemById = (config: IInsertQuery) => {
  const values: string[] = [];
  const cleanId = config.con.escape(config.data.id);
  Object.keys(config.model).map((x: string) => {
    if (x === 'id') {
      return;
    }
    const sanitized = config.con.escape(config.data[x]);
    values.push(`${x}=${sanitized}`);
    return x;
  });

  return `UPDATE ${config.tableName} SET ${mergeAndChop(values)} WHERE id=${cleanId}`;
};

export const SQLDeleteItemById = (config: IByIdQuery) => {
  const cleanId = config.con.escape(config.id);
  return `DELETE FROM ${config.tableName} WHERE id =${cleanId}`;
};
