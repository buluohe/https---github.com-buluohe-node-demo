const http = require('http')

const server = http.createServer((req, res) => {
    // 模拟日志
    console.log('cur time', Date.now());
    // 模拟报错
    console.error('报错', Date.now());
    
    // 模拟一个错误
    if(req.url === '/err'){
        throw new Error('报错了！！！')
    }

    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            errno: 0,
            msg: 'pm2 test server 333'
        })
    )
})

server.listen(8000)
console.log('server is listening on port 8000 ...')
