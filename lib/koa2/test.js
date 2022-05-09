const Koa = require('./like-koa2')
const app = new Koa()

// logger
app.use(async (ctx, next) => {
  console.log(11)
  await next()
  console.log(1111)
  const rt = ctx['X-Response-Time']
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`)
})

// x-response-time
app.use(async (ctx, next) => {
  console.log(22)
  const start = Date.now()
  await next()
  console.log(2222)
  const ms = Date.now() - start
  ctx['X-Response-Time'] = `${ms}ms`
})

// response
app.use(async (ctx) => {
  console.log(33)
  ctx.res.end('This is like koa2')
  console.log(3333)
})

app.listen(8011)
