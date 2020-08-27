const svgCaptcha = require('svg-captcha')
const router = require('koa-router')()

router.prefix('/api/verification-code')

// 获取验证码
router.get('/getCode', async (ctx) => {
    let captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size: 4,    //验证码长度
        fontSize: 50,   //字体大小
        width: 100,
        height: 40,
        noise: 2,
        ignoreChars: '0o1i'
        // background: '#cc8801'
    });
    ctx.session.captcha = captcha.text.toLowerCase();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
});

module.exports = router
