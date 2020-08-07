const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const person = require('./routes/person')
const bmyx_product = require('./routes/bmyx/Product')
const bmyx_sortOfProduct = require('./routes/bmyx/SortOfProduct')
const bmyx_Notice = require('./routes/bmyx/Notice')
const account = require('./routes/account/Account')
const tokenFn = require('./util/token')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next();
    tokenFilter(ctx)
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

/**
 * token 验证
 */
async function tokenFilter(ctx) {
    // 过滤 OPTIONS 请求
    if (ctx.method == 'OPTIONS') {
        return false;
    }
    let url = ctx.url;
    let allowpage = [
        '/api/account/login',
        '/api/bmyx/findBySearch',
        '/api/bmyx/getProductsByCond',
        '/api/bmyx/getData'
    ];
    let token = ctx.header.authorization;
    if (allowpage.indexOf(url) <= -1) {
        if (await tokenFn.isAuthorization(token)) {
            ctx.body = {
                code: 401,
                msg: "token 验证失败",
            }
        }
    }
}

// 配置跨域
app.use(
    cors({
        origin: function (ctx) { //设置允许来自指定域名请求
            // if (ctx.url === '/test') {
            //     return '*'; // 允许来自所有域名请求
            // }
            return ctx.header.origin; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

// routes 路由配置
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(person.routes(), person.allowedMethods())
app.use(account.routes(), account.allowedMethods())
app.use(bmyx_product.routes(), bmyx_product.allowedMethods())
app.use(bmyx_Notice.routes(), bmyx_Notice.allowedMethods())
app.use(bmyx_sortOfProduct.routes(), bmyx_sortOfProduct.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});



module.exports = app