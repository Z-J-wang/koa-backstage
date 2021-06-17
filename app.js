const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const tokenFn = require('./util/token');
const session = require('koa-session');
const sessionConfig = require('./config/session.config');
const secret = require('./config/secret');
const { logger_koa4, accessLogger } = require('./config/logger');

// route 引入部分 start ---------------------------------------------------
const index = require('./routes/index');
const users = require('./routes/users');
const person = require('./routes/person/person');
const experience = require('./routes/person/experience');
const blog = require('./routes/person/blog');
const message = require('./routes/person/message');
const bmyx_product = require('./routes/bmyx/Product');
const bmyx_sortOfProduct = require('./routes/bmyx/SortOfProduct');
const bmyx_Notice = require('./routes/bmyx/Notice');
const wx_user = require('./routes/bmyx/wx_user');
const account = require('./routes/account/Account');
const verificationCode = require('./routes/verification-code');
const article = require('./routes/article/article');
// route 引入部分 end ---------------------------------------------------

app.keys = [secret]; /*cookie的签名*/

//配置session的中间件
app.use(session(sessionConfig, app)); // maxAge--cookie的过期时间

// error handler
onerror(app);

// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text']
	})
);
app.use(json());
app.use(logger());
app.use(accessLogger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
	views(__dirname + '/views', {
		extension: 'ejs'
	})
);

// logger
app.use(async (ctx, next) => {
	const start = new Date();
	await next();
	tokenFilter(ctx); // token 验证
	const ms = new Date() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

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
		'/api/bmyx/getData',
		'/api/bmyx/getSort',
		'/api/bmyx/getNotice',
		'/api/bmyx/wx_login',
		'/api/verification-code/getCode',
		'/api/person/getBasicinfo',
		'/api/person/getExperiences',
		'/api/person/getExperiences',
		'/api/person/getBlogs',
		'/api/person/createMsg'
	];
	let token = ctx.header.authorization;
	if (
		url.split('/')[1] === 'api' &&
		allowpage.indexOf(url.split('?')[0]) <= -1
	) {
		if (!token || (await tokenFn.isAuthorization(token))) {
			ctx.body = {
				code: 401,
				msg: 'token 验证失败'
			};
		}
	}
}

// 配置跨域
app.use(
	cors({
		origin: function (ctx) {
			//设置允许来自指定域名请求
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
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// 共同部分
app.use(account.routes(), account.allowedMethods());
app.use(verificationCode.routes(), verificationCode.allowedMethods());

// 个人网址部分
app.use(blog.routes(), blog.allowedMethods());
app.use(person.routes(), person.allowedMethods());
app.use(message.routes(), message.allowedMethods());
app.use(experience.routes(), experience.allowedMethods());

// BMYX 部分
app.use(wx_user.routes(), wx_user.allowedMethods());
app.use(bmyx_Notice.routes(), bmyx_Notice.allowedMethods());
app.use(bmyx_product.routes(), bmyx_product.allowedMethods());
app.use(bmyx_sortOfProduct.routes(), bmyx_sortOfProduct.allowedMethods());

// 文章
app.use(article.routes(), article.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
	logger_koa4.error(err);
	console.error('server error', err, ctx);
});

module.exports = app;
