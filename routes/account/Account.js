const router = require('koa-router')()
const AccountBll = require('../../service').accountBll

const service = new AccountBll();

router.prefix('/api/account')

/**
 * 获取当前账户的信息
 */
router.get('/getCurrentAccount', async function (ctx, next) {
    const token = ctx.header.authorization;

    let res_data,
        res_code,
        res_msg;

    try {
        res_code = 1000;
        res_msg = "查询成功！";
        res_data = await service.findOne({ token: token});
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
 * 条件查询
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
    const token = ctx.header.authorization;
    
    let res_data,
        res_code,
        res_msg;

    try {
        let ret = await service.createOne(newAccount, token);
        res_data = ret.data;
        res_code = ret.code;
        res_msg = ret.msg;
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
 * 修改账户信息
 */
router.post('/updateAccount', async function (ctx, next) {
    const changeData = ctx.request.body;
    const token = ctx.header.authorization;

    let res_data,
        res_code,
        res_msg;
    try {
        let ret = await service.updated(changeData, token);
        res_code = ret.code;
        res_msg = ret.msg;
        res_data = ret.data;
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

/**
 * 登陆
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
        res_data = {
            token: ret.token
        }
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

module.exports = router