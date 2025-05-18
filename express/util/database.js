// const mysql = require('mysql2');
const Sequelize = require('sequelize');
// const pool= mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node-complete',
//     password:'root'
// });
const sequelize =new Sequelize('node-complete','root','root',{
    dialect:'mysql',
    host:'localhost'
})

module.exports = sequelize;