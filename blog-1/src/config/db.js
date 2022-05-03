
const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONFIG

if(env === 'dev'){
    // 测试环境
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'zhangboyu',
        port:'3306',
        database:'myblog',
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: '6379',
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'zhangboyu',
        port:'3306',
        database:'myblog',
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: '6379',
    }
}
module.exports = {
    MYSQL_CONF,
    REDIS_CONFIG
}