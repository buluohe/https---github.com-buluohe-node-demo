const http = require('http')
const slice = Array.prototype.slice

class likeExpress {
  constructor() {
    this.routes = {
      // 存放use注册的中间件
      all: [],
      // 存放get请求注册的中间件
      get: [],
      // 存放post请求注册的中间件
      post: []
    }
  }

  register(path) {
    const info = {}
    // 若第一个参数为字符串,则为指定路径的中间件，否则为根路径
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      // 从第一个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  match(url, method) {
    let stack = []
    if (url === '/favicon.ico') {
      return stack
    }
    // 获取routes
    let stackList = []
    stackList = stackList.concat(this.routes.all)

    stackList = stackList.concat(this.routes[method])
    stackList.forEach((item) => {
      if (url.indexOf(item.path) === 0) {
        // url === '/api/get-cookie' 且 item.path === '/'
        stack = stack.concat(item.stack)
      }
    })
    return stack
  }
  // 核心next机制
  handle(req, res, stack) {
    const next = () => {
      // 匹配第一个中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  callback() {
    return (req, res) => {
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const stackList = this.match(url, method)
      this.handle(req, res, stackList)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}
module.exports = () => {
  return new likeExpress()
}
