require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const express = require('express');
const { get } = require('http');
const mysql = require('mysql2/promise');
const { getParamKeys } = require('next/dist/server/request/fallback-params');
const port = 3000;

// // Check env vars
// console.log(process.env.MYSQL_HOST);
// console.log(process.env.MYSQL_USER);
// console.log(process.env.MYSQL_PASSWORD);
// console.log(process.env.MYSQL_DATABASE);

// Create a connection to the database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

async function checkDatabaseConnection() {
  try {
    // Run a simple query to check the connection
    const [rows] = await pool.execute('SELECT 1 AS test');
    console.log('Database connection is successful!', rows);

  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
}

async function getUsers() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    return error;
  }
}

async function getUser(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  } catch (error) {
    return error;
  }
}

module.exports = {
  getUsers,
  getUser,
};

checkDatabaseConnection();