import {Request, Response} from 'express';
import {SQLDeleteItemById, SQLGetItemById, SQLInsertIntoDB, SQLUpdateItemById} from './getSQL';
import connect from './connection';
import {MysqlError} from 'mysql';
import {DBTables} from '../types/DBTables';
import {isNumeric} from '../Utils/isNumeric';

const isModelIncomplete = (data: any, model: any, optionalFields?: string[]) => {
  let isIncomplete = false;
  // checks the models' keys with the data object.
  //if undefined then request model is incomplete
  Object.keys(model).forEach((x) => {
    if (optionalFields && optionalFields.indexOf(x) > -1) {
      return;
    }
    if (!data[x]) {
      isIncomplete = true;
    }
    return x;
  });
  return isIncomplete;
};

export const insertIntoDB = (data: any, model: any, res: Response, tableName: DBTables, optionalFields?: string[]) => {
  const modelIncomplete: boolean = isModelIncomplete(data, model, optionalFields);
  if (modelIncomplete) {
    res.json({success: false, message: 'Fields are missing.'});
    return;
  }
  const con: any = connect();
  const SQL = SQLInsertIntoDB({
    tableName: DBTables.Users,
    model: model,
    data: data,
    con: con,
  });
  console.log(SQL);
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('user created connected');
  });
  con.query(SQL, function (error: MysqlError, results: any, fields: any) {
    if (error) {
      res.status(500).send({success: false, message: 'Error adding to database.'});
      return;
    }
    res.send({success: true, message: 'Item added successfully.'});
  });
  con.end();
};

export const getItemById = (id: string, res: Response, tableName: DBTables) => {
  const modelIncomplete: boolean = !isNumeric(id);
  if (modelIncomplete) {
    res.status(500).json({success: false, message: 'Invalid id.'});
    return;
  }
  const con: any = connect();
  const SQL = SQLGetItemById({
    tableName,
    id: id,
    con: con,
  });
  console.log(SQL);
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('user created connected');
  });
  con.query(SQL, function (error: MysqlError, results: any, fields: any) {
    if (error) throw error;
    if (results[0]) {
      res.json({success: true, item: results[0]});
      return;
    }
    res.status(500).send({message: 'Item Not Found'});
  });
  con.end();
};

export const updateItemById = (data: any, model: any, res: Response, tableName: DBTables) => {
  const modelIncomplete: boolean = isModelIncomplete(data, model);
  if (modelIncomplete) {
    res.status(500).json({success: false, message: 'fields are missing.'});
    return;
  }
  const con: any = connect();
  const SQL = SQLUpdateItemById({
    tableName,
    data,
    model,
    con: con,
  });
  console.log(SQL);
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('user updated connected');
  });
  con.query(SQL, function (error: MysqlError, results: any, fields: any) {
    if (error) {
      res.status(500).send({success: false, message: 'Item Not Updated'});
      return;
    }
    if (results.affectedRows < 1) {
      res.status(500).send({success: false, message: 'Item does not exist.'});
      return;
    }
    console.log(results);
    res.json({success: true, message: 'Item has been updated'});
  });
  con.end();
};

export const deleteItemById = (id: string, res: Response, tableName: DBTables) => {
  const modelIncomplete: boolean = !isNumeric(id);
  if (modelIncomplete) {
    res.status(500).json({success: false, message: 'Invalid Id.'});
    return;
  }
  const con: any = connect();
  const SQL = SQLDeleteItemById({
    tableName,
    id,
    con,
  });
  console.log(SQL);
  con.connect((err: any) => {
    if (err) {
      throw err;
    }
    console.log('user updated connected');
  });
  con.query(SQL, function (error: MysqlError, results: any, fields: any) {
    if (error) {
      res.status(500).send({success: false, message: 'Item Not Deleted'});
      return;
    }
    if (results.affectedRows < 1) {
      res.status(500).send({success: false, message: 'Item does not exist.'});
      return;
    }
    res.json({success: true, message: 'Item has been deleted'});
  });
  con.end();
};
