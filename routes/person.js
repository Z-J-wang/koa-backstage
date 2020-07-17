const router = require('koa-router')()

router.prefix('/person')

router.get('/', function (ctx, next) {
    console.log(ctx.query)
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router