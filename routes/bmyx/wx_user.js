const router = require('koa-router')()
const wx = require('../../util/wx')
router.prefix('/api/bmyx')

/**
 * 微信小程序登录验证
 */
router.get('/wx_login', async function (ctx, next) {
    let res_data,
        res_code,
        res_msg;

    let code = ctx.request.query.code;
    try {
        let ret = await wx.getOpenID(code);
        if (ret.openid){
            res_code = 1000;
            res_msg = "登录成功";
        }else{
            res_code = 5000;
            res_msg = "登录失败";
            res_data = ret;
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

/**
 * 修改产品信息
 */
router.post('/updateNotice', async function (ctx, next) {
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

module.exports = router