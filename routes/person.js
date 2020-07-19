const router = require('koa-router')()
const basicInfoBll = require('../service').basicInfoBll


const basicinfon = new basicInfoBll();


router.prefix('/person')

router.get('/', async function (ctx, next) {
    console.log("The table for the User model was just (re)created!");

    const findall = await basicinfon.findOne();

    ctx.body = findall
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.post('/update', async function (ctx, next) {

    const changeData = ctx.request.body
    await basicinfon.updated(changeData)
    
    try {

        ctx.body = true;
    } catch (error) {
        ctx.body = error;
    }

})

module.exports = router