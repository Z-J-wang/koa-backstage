const router = require('koa-router')()
const ProductBll = require('../service').productBll


const productBll = new ProductBll();


router.prefix('/api/bmyx')

router.get('/getData', async function (ctx, next) {
    const cond = ctx.request.body
    let res_data,
        res_code,
        res_msg;

    try {
        res_code = 1000;
        res_msg = "查询成功！";
        res_data = await productBll.find(cond);
    } catch (error) {
        console.log(error)
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

router.post('/createProduct', async function (ctx, next) {
    const newData = ctx.request.body
    console.log(newData)
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await productBll.find({
            name: newData.name
        })
        if (ret.length > 0) {
            res_code = 5000;
            res_msg = "该产品已经存在！"
        } else {
            res_code = 1000;
            res_msg = "新增成功";
            res_data = await productBll.createOne(newData);
        }

    } catch (error) {
        console.log(error)
        res_msg = "后台出错！"
        res_data = error;
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }
})

router.post('/update', async function (ctx, next) {

    const changeData = ctx.request.body
    try {
        let ret = await productBll.updated(changeData);
        if (ret === 400) {
            ctx.code = 4000
        }
        ctx.body = await productBll.updated(changeData);
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    }

})

module.exports = router