const http = require('http')

const server = http.createServer((req,res) => {
    res.writeHead(200, {'content-type':' text/html'})
    res.end('<h1>htllo world !!!</h1>')
})

server.listen('3000', () => {
    console.log('现在正在监听3000端口');
})