const http = require('http')
const querystring = require('querystring');

// 默认处理get请求
// const server = http.createServer((req,res) => {
//     const url = req.url
//     console.log('url',url);
//     console.log('method',req.method);
//     req.query = querystring.parse(url.split('?')[1])
//     res.end(JSON.stringify(req.query))
// })

// 处理post请求
// const server = http.createServer((req,res) => {
//     if(req.method === 'POST'){
//         console.log(req.headers['content-type']);
//         let postData = ''
//         req.on('data',chunk => {
//             postData += chunk.toString()
//         })
//         req.on('end',() => {
//             console.log(postData);
//             res.end('hello,world')
//         })
//     }
// })

// 获取url上的参数
// const server = http.createServer((req,res) => {
//     const url = req.url
//     console.log(url);
//     console.log(url.split('?'));
//     const path = url.split('?')[0]
//     res.end(path)
// })

// 分别处理get post请求
// const server = http.createServer((req,res) => {
//     const method = req.method
//     const url = req.url
//     const path = url.split('?')[0]
//     const query = querystring.parse(url.split('?')[1])

//     res.setHeader('Content-type','application/json')
//     const resData = {
//         method,
//         url,
//         path,
//         query
//     }
//     if(method === 'GET'){
//         res.end(JSON.stringify(resData))
//     }
//     if(method === 'POST'){
//         let postData = ''
//         req.on('data',chunk => {
//             postData += chunk
//         })
//         req.on('end',() => {
//             resData.postData = postData
//             res.end(JSON.stringify(resData))
//         })
//     }
// })
server.listen(8000)
console.log('ok');