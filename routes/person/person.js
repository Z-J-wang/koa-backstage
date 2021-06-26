const router = require('koa-router')()
const basicInfoBll = require('../../util/service').basicInfoBll


const basicinfon = new basicInfoBll();


router.prefix('/api/person')

router.get('/getBasicinfo', async function (ctx, next) {
    try {
        const findall = await basicinfon.findOne();
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
        result = await basicinfon.createBasicinfo(changeData);
    } catch (error) {
        result = error
    }

    ctx.body = result
})

router.post('/update', async function (ctx, next) {

    const changeData = ctx.request.body
    try {
        ctx.body = await basicinfon.updated(changeData);
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    }

})

module.exports = router