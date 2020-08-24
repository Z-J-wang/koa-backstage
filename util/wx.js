const http = require('https')

function getOpenID(js_code) {
    let appid = 'wx25fd9a63915fd479',
        secret = '14956292a0cf9d71b1eb7e8463514a96',
        url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`;

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