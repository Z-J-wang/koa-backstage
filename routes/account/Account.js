const router = require('koa-router')()
const AccountBll = require('../../service').accountBll


const service = new AccountBll();

router.prefix('/api/account')

/**
 * 获取全部账号
 */
router.post('/login', async function (ctx, next) {
    const account = ctx.request.body
    let res_data,
        res_code,
        res_msg;

    try {
        let ret = await service.login(account);
        res_code = ret.code;
        res_msg = ret.msg;
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


/**
 * 获取全部账号
 */
router.get('/getAccountByCond', async function (ctx, next) {
    const query = ctx.request.query;
    let res_data,
        res_code,
        res_msg;

    try {
        res_code = 1000;
        res_msg = "查询成功！";
        res_data = await service.find(query);
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

/**
 * 新增一个账号
 */
router.post('/createAccount', async function (ctx, next) {
    const newAccount = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await service.find({
            account: newAccount.account
        })
        if (ret && ret.length > 0) {
            res_code = 5000;
            res_msg = "该类别已经存在！"
        } else {
            res_code = 1000;
            res_msg = "新增成功";
            res_data = await service.createOne(newAccount);
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

/**
 * 修改产品信息
 */
router.post('/updateAccount', async function (ctx, next) {
    const changeData = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await service.updated(changeData);
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

/**
 * 删除一条产品数据
 */
router.post('/delAccount', async function (ctx, next) {
    const cond = ctx.request.body
    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await service.delete(cond);
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