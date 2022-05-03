const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port,REDIS_CONFIG.host)
redisClient.on('error', err => {
    console.error(err);
})
function get(key){
    const promise = new Promise((resolve,reject) => {
        redisClient.get(key,(err,val) => {
            if(err){
                reject(err);
                return
            }
            if(val == null){
                resolve(val)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (error) {
                resolve(val)
            }
        })
    })
    return promise
}
function set(key,value){
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    redisClient.set(key,value,redis.print)
}

module.exports = {
    get,
    set
}