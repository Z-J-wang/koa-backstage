const jwt = require('jsonwebtoken');
const secret = require('./secret')

/**
 * 生成Token
 * @param {string} name 
 * @param {number} auth 
 */
function createToken(name, auth) {
    const payload = {
        name: name,
        auth: auth
    }

    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

/**
 * 验证Token
 * @param {string} token 
 */
 function verifyToken(token) {
    let ret = {};
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return false;
        }

        ret = decoded
    })

    return ret;
}

module.exports = {
    createToken,
    verifyToken
}