// 标准输入
// process.stdin.pipe(process.stdout)

// const http = require('http')

// const server = http.createServer((req,res) => {
//     if(req.method === 'POST'){
//         req.pipe(res)
//     }
// })
// server.listen(8010)

// 复制文件

// const fs = require('fs')
// const path = require('path')

// const fileName1 = path.resolve(__dirname,'data.txt')
// const fileName2 = path.resolve(__dirname,'data-bak.txt')

// const readStream = fs.createReadStream(fileName1)
// const writeStream = fs.createWriteStream(fileName2)

// readStream.pipe(writeStream)
// readStream.on('data',chunk => {
//     console.log(chunk.toString());
// })
// readStream.on('end',() => {
//     console.log('拷贝结束了');
// })


const fs = require('fs')
const path = require('path')
const http = require('http')
const fileName1 = path.resolve(__dirname,'data.txt')

const server = http.createServer((req,res) => {
    if(req.method === 'GET'){
        const readStream = fs.createReadStream(fileName1)
        readStream.pipe(res)
    }
})
server.listen(8011)