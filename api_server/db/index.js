//导入 mysql 模块
const mysql = require('mysql')
//创建数据库连接
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database: 'my_db_01',
})
//向外共享db数据库连接
module.exports = db