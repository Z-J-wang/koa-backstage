## 报错：Sequelize Unknown column 'createdAt' in 'field list'

#### 原因
> Sequelize 默认启用时间戳。在启用时间戳时，Sequelize自动为 `findAll()` 的 `select` 语句增加两个属性：`createdAt` 和 `updatedAt`。当我们在定义 model 时没有增加这两个属性就会报上面的错误。

#### 解决方法
> 1. 在model创建的时候禁用时间戳

```js
sequelize.define('User', {
  // ... (attributes)
}, {
   timestamps: false
});
```
> 2.在`sequelize`连接 `mysql` 的时候，直接禁用所有时间戳开启：

```js
const sequelize = new Sequelize('sequelize_test', 'root', null, {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
```

> 参考文献：[Sequelize Unknown column 'createdAt' in 'field list'?](https://blog.csdn.net/xgangzai/article/details/90614400)

***

## 报错：SequelizeDatabaseError: Table 'person_db.basicinfos' doesn't exist

#### 原因
> **表名推断**：默认情况下，当未提供表名时，Sequelize会自动将模型名称复数并将其用作表名。

#### 解决方法：
> 方法一：在model创建的时候禁用表名推断
```js
sequelize.define('User', {
  // ... (attributes)
}, {
  freezeTableName: true
});
```
> 方法二：直接提供表名
```js
sequelize.define('User', {
  // ... (attributes)
}, {
  tableName: 'Employees'
});
```
***

## Data types - 数据类型

参考网址：https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-dataType

> Sequelize.STRING                      // VARCHAR(255)
> Sequelize.STRING(1234)                // VARCHAR(1234)
> Sequelize.STRING.BINARY               // VARCHAR BINARY
> Sequelize.TEXT                        // TEXT
> Sequelize.TEXT('tiny')                // TINYTEXT
> 
> Sequelize.INTEGER                     // INTEGER
> Sequelize.BIGINT                      // BIGINT
> Sequelize.BIGINT(11)                  // BIGINT(11)
> 
> Sequelize.FLOAT                       // FLOAT
> Sequelize.FLOAT(11)                   // FLOAT(11)
> Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
> 
> Sequelize.REAL                        // REAL        PostgreSQL only.
> Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
> Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.
> 
> Sequelize.DOUBLE                      // DOUBLE
> Sequelize.DOUBLE(11)                  // DOUBLE(11)
> Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)
> 
> Sequelize.DECIMAL                     // DECIMAL
> Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
> 
> Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
> Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision 
> Sequelize.DATEONLY                    // DATE without time.
> Sequelize.BOOLEAN                     // TINYINT(1)
> 
> Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
> Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
> 
> Sequelize.JSON                        // JSON column. PostgreSQL only.
> Sequelize.JSONB                       // JSONB column. PostgreSQL only.
> 
> Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
> Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
> 
> Sequelize.UUID                        //   PostgreSQL 和 SQLite 中为 UUID, MySQL 中为CHAR(36) BINARY (使用 defaultValue: Sequelize.UUIDV1 或 Sequelize.UUIDV4 生成默认值)
> 
> Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.
> 
> Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.
> 
> Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
> Sequelize.GEOMETRY('POINT')           // Spatial column with geomerty type.  PostgreSQL (with PostGIS) or MySQL only.
> Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geomerty type and SRID.  PostgreSQL (with PostGIS) or MySQL only.



## koa2 + VueCLI 4.0 + axios 跨域问题

最近在学习nodeJS 的内容。用 koa2 搭建了一个项目。在进行前后端串接的时候遇到了跨越的问题。

跨域的解决有两个方向：

+ 其一，前端设置api代理

  ```js
  // vue.config.js  
  devServer: {
      proxy: {
        '/api': {
          target: '',
          changeOrigin: true, // 允许websockets跨域
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      } // 代理转发配置，用于调试环境
    }
  ```

  关于 `vue.config.js` 更多配置可查看：[关于 Vue CLI 4.0 的 vue.config.js 基本配置范例(jquery、图片压缩、CSS modules)](https://blog.csdn.net/weixin_44869002/article/details/106826503)

+ 其二，后端设置允许跨域。(本文所用的就是这个)

  关于后端的跨域配置基本有两种。

  1. 使用原生的 koa2 代码配置；

     ```js
     app.use(async (ctx, next) => {
         ctx.set('Access-Control-Allow-Origin', '*');
         ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
         ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
         if (ctx.method == 'OPTIONS') {
             ctx.body = 200;
         } else {
             await next();
         }
     })
     
     ```

  2. 使用中间件 `koa2-cors` (推荐)	

     ```js
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
     ```



但是呢！依照各位大佬的方法在koa2的app.js后面添加相应的配置。可就是一直不生效。

```js
// app.js app.js 是 koa2-generator 生成的
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const person = require('./routes/person')
const cors = require('koa2-cors')

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
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 路由配置
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(person.routes(), person.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

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

module.exports = app
```



多方测试之后，悲催的发现。根本不是跨域配置问题。而是跨域配置代码放置的问题。我将配置代码移到`routes`上面就可以。仔细一想，跨域是为`routes`定义的api配置的。确实应该放在前面。

```js
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const person = require('./routes/person')
const cors = require('koa2-cors')

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

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next();
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 路由配置
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(person.routes(), person.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});



module.exports = app
```
## Sequelize 条件查询
```js
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

User.findAll({
 raw: true,
  order: [
      ['name', 'DESC']
  ],  // 排序
  where: {
    // name: 'cheny', // 精确查询
    mobile_no: {
      // 模糊查询
      [Op.like]:'%' +mobile_no + '%'
    }
  },
  attributes:['id','name']， // 控制查询字段
})
```
****
## 外键
```js
product.belongsTo(sortofproduct, {
    as: 'sort',
    foreignKey: 's_Id', // 外键名
    targetKey: 'id'     // 不设定，则默认id字段
});
```

上面的设定是，在`product`表添加一个外键`s_Id`，关联的是表`sortofproduct`的`id`。并且重命名为`sortofproduct`为`sort`。

```js
// findAndCountAll这个API既查找还统计满足条件的记录数
await StudentModel.findAndCountAll({
    where: criteria, // 这里传入的是一个查询对象，因为我的查询条件是动态的，所以前面构建好后才传入，而不是写死
    offset: start, // 前端分页组件传来的起始偏移量
    limit: Number(pageSize), // 前端分页组件传来的一页显示多少条
    include: [{ // include关键字表示关联查询
        model: ClassModel, // 指定关联的model
        as:'cla', // 由于前面建立映射关系时为class表起了别名，那么这里也要与前面保持一致，否则会报错
        attributes: [['name','className'], 'rank'], // 这里的attributes属性表示查询class表的name和rank字段，其中对name字段起了别名className
    }],
    raw:true // 这个属性表示开启原生查询，原生查询支持的功能更多，自定义更强
}).then(
    result => {
        total = result.count; // 如果成功，则可以获取到记录条数
        list = result.rows; // 如果成功，则可以获取到记录集合
    }).catch(err => {
    getLogger().error("xxx-findAndCountAll occur error:", err);
});
```

## Sequelize 联表查询

```js
    product.findAndCountAll({
        where: {id: 1}
        include: [{
            model: sortofproduct,
            as: "sort",
            attributes: ['name'],  // 查询 sortofproduct 表的name字段
        }]
```
注意：如果查询条件为附属表的属性,则需要有$$包裹属性。如：` where: {"$sort.id$": 1}`

## Sequelize OR 模糊查询

```js
where: {
        [Op.or]: [
            {
                'name': {
                    [Op.like]: `%${search}%`
                }
            },
            {
                "$sort.name$": {
                    [Op.like]: `%${search}%`
                }
            }
        ]
    }
```
这里的`Op` 需要手动引入

```
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
```
> 注意：在低版本的`sequelize`(v5 之前) 这里的`[Op.or]` 和 `[Op.like]` 是 `$or` 和 `$like`。
> 可参考 v4 的文档说明：https://itbilu.com/nodejs/npm/VJIR1CjMb.html#model-attributes
> 在 v5 为了考虑操作符的安全性，放弃之前操作符的写法。具体说明如下：https://itbilu.com/nodejs/npm/sequelize-docs-v5.html#querying-operators-security

## 查询设置`raw: true`导致 Getters 失效
这是个大坑。坑了我好久。

## 查询设置`raw: true`,导致连表查询的附属表字段格式化为字符串