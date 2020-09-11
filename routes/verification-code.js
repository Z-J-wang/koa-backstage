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
        noise: 2,   // 干扰线条的数量
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        color: true,    //  验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        // background: '#eee'
    });
    ctx.session.captcha = captcha.text.toLowerCase();
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
});

module.exports = router
