const http = require('https')

/**
 * 获取微信的 OpenID
 * @param {string} js_code 小程序登录后获得的 code
 */
function getOpenID(js_code) {
    let appid = 'wx25fd9a63915fd479',
        wx_secret = '14956292a0cf9d71b1eb7e8463514a96',
        url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${wx_secret}&js_code=${js_code}&grant_type=authorization_code`;

    return new Promise((resolve, reject) => {
        http.get(url, function (res) {
            res.on('data', function (data) {
                let res = JSON.parse(data.toString())
                resolve(res)
            });
        }).on('error', function (err) {
            reject(err)
            console.log(err)
        });
    })
}

module.exports = {
    getOpenID
}