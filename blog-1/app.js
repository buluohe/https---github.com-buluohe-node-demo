const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const { access } = require('./src/utils/log')
const { handleUserRouter, getCookieExpires } = require('./src/router/user')
const { get, set } = require('./src/db/redis')

// session 数据
// const SESSION_DATA = {}
const getPostData = (req) => {
    const promise = new Promise((resolve,reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',() => {
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req,res) => {

    // 记录access log
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 设置返回格式 JSON
    res.setHeader('Content-type','application/json')

    // 获取path
    const url = req.url
    req.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
        const array = item.split('=')
        const key = array[0].trim()
        const value = array[1].trim()
        req.cookie[key] = value
    });

    // 解析session
    // let needSetCookie = false
    // let userId = req.cookie.userid
    // if(userId){
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // console.log(SESSION_DATA);
    // console.log(SESSION_DATA[userId]);
    // req.session = SESSION_DATA[userId]

    // 解析session （使用redis）
    let needSetCookie = false
    let userId = req.cookie.userid
    if(!userId){
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化redis中的session值
        set(userId,{})
    }

    // 获取 session
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData == null){
            // 初始化redis中的session值
            set(req.sessionId,{})
            // 设置session
            req.session = {}
        } else {
            // 设置session
            req.session = sessionData
        }
        // console.log('req session 1111111', req.session);

        return getPostData(req)
    }).then(postData => {
        req.body = postData

        // 处理blog路由

        // const blogData = handleBlogRouter(req,res)
        // if(blogData){
        //     res.end(JSON.stringify(blogData))
        //     return 
        // }
        const blogResult = handleBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData =>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                if(blogData){
                    res.end(JSON.stringify(blogData))
                }
            })
            return 
        }

        // 处理user路由
        // const userData = handleUserRouter(req,res)
        // if(userData){
        //     res.end(JSON.stringify(userData))
        //     return 
        // }
        const userResult = handleUserRouter(req,res)
        if(userResult){
            userResult.then(userData =>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                if(userData){
                    res.end(JSON.stringify(userData))
                }
            })
            return 
        }
        
        // 未命中路由，返回404
        res.writeHead(404,{"Content-type":"text/plain"})
        res.write("404 not found")
        res.end()
    })
}   
module.exports = serverHandle
// process.env.NODE_ENV