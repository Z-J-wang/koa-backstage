const router = require('koa-router')()
const ProductBll = require('../service').productBll


const productBll = new ProductBll();


router.prefix('/api/person')

router.get('/getBasicinfo', async function (ctx, next) {
    try {
        const findall = await productBll.findAll();
        ctx.body = findall
    } catch (error) {
        console.log(error);

        ctx.body = "数据库出错"
    }

})

router.post('/create', async function (ctx, next) {
    const changeData = ctx.request.body
    let result = '';
    try {
        result = await productBll.createOne(changeData);
    } catch (error) {
        console.log(error)
        result = error
        ctx.status = 400;
    }

    ctx.body = result
})

router.post('/update', async function (ctx, next) {

    const changeData = ctx.request.body
    try {
        let ret = await productBll.updated(changeData);
        if(ret === 400) {
            ctx.code = 4000
        }
        ctx.body = await productBll.updated(changeData);
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    }

})

module.exports = router