
const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行函数
function exec(sql) {
    const promise = new Promise((resolve,reject) => {
        con.query(sql,(error,result) => {
            if(error){
                reject(error);
                return 
            }
            resolve(result);
        })
    })
    return promise
}
module.exports = {
    exec,
    escape: mysql.escape
}