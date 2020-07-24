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
        res_code = 5000;
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
        res_code = 5000;
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

router.post('/updateProduct', async function (ctx, next) {
    const changeData = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await productBll.updated(changeData);
        if (ret) {
            res_data = ret;
            res_code = 1000;
            res_msg = "更新成功"
        } else {
            res_code = 5000;
            res_msg = "更新失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }

})

router.post('/delProduct', async function (ctx, next) {
    const cond = ctx.request.body
    console.log(cond)
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await productBll.delete(cond);
        console.log(ret)
        if (ret) {
            res_data = ret;
            res_code = 1000;
            res_msg = "删除成功"
        } else {
            res_code = 5000;
            res_msg = "删除失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res_code,
            msg: res_msg,
            data: res_data,
        }
    }

})

module.exports = router