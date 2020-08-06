const jwt = require('jsonwebtoken');
const secret = require('./secret');
const AccountDao = require('../dao').accountDao;

const Dao = new AccountDao();

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

/**
 * 通过 token 查询数据库中是否存在该 token。
 * @param {*} token 
 */
async function isAuthorization(token){
    let flat = false;
    let select_ret = await Dao.findOne({token: token});
    if(select_ret){
        let verify_ret = this.verifyToken(select_ret.token)
        if(verify_ret){
            flat = true
        }
    }

    return flat;
}

module.exports = {
    createToken,
    verifyToken,
    isAuthorization
}