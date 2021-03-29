// Model (usually gets data from database, in this case data is hard coded)
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT user_id, name, email FROM wop_user');
    console.log('something back from db?', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllUsersSort = async (order) => {
  try {
    const [rows] = await promisePool.query(`SELECT user_id, name, email FROM wop_users ORDER BY ${order}`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertUser = async (user) => {
  const [row] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?, ?, \'foo\')', [user.name, user.email]);
  console.log('insert row', row);
  return row.insertId;
};


module.exports = {
  getAllUsers,
  getAllUsersSort,
  insertUser,
};
