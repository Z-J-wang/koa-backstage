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
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log(err);

            return;
        }

        return decoded;
    })
}

module.exports = {
    createToken,
    verifyToken
}