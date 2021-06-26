const router = require('koa-router')()
const ExperienceBll = require('../../util/service').experienceBll


const experienceBll = new ExperienceBll();


router.prefix('/api/person')

/**
 * 查询
 */
router.get('/getExperiences', async function (ctx, next) {
    const query = ctx.request.query;    // 条件
    const res = {};                     // response 数据对象
    try {
        res.data = await experienceBll.find(query);
        if (res.data) {
            res.code = 1000;
            res.msg = "数据获取成功"
        } else {
            res.code = 5000;
            res.msg = "数据获取失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res.code,
            msg: res.msg,
            data: res.data
        }
    }
})

/**
 * 新增
 */
router.post('/createExperience', async function (ctx, next) {
    const newObj = ctx.request.body
    const res = {};                     // response 数据对象
    try {
        res.data = await experienceBll.createNewObj(newObj);
        if (res.data) {
            res.code = 1000;
            res.msg = "添加成功"
        } else {
            res.code = 5000;
            res.msg = "添加失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res.code,
            msg: res.msg,
            data: res.data
        }
    }
})

/**
 * 修改
 */
router.post('/updateExperience', async function (ctx, next) {
    const changedObj = ctx.request.body
    const res = {};                     // response 数据对象
    try {
        let ret = await experienceBll.updated(changedObj);
        if (ret) {

            res.data = await experienceBll.find(0, 10, { id: ret });
            res.code = 1000;
            res.msg = "更新成功"
        } else {
            res.code = 5000;
            res.msg = "更新失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res.code,
            msg: res.msg,
            data: res.data,
        }
    }
})

/**
 * 删除
 */
router.post('/deleteExperience', async function (ctx, next) {
    const params = ctx.request.body
    const res = {};                     // response 数据对象
    try {
        let ret = await experienceBll.delete(params);
        if (ret) {
            res.code = 1000;
            res.msg = "删除成功"
        } else {
            res.code = 5000;
            res.msg = "删除失败";
        }
    } catch (error) {
        console.log(error)
        ctx.body = "数据库出错";
    } finally {
        ctx.body = {
            code: res.code,
            msg: res.msg,
            data: res.data,
        }
    }

})

module.exports = router