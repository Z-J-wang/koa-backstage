const bcrypt = require('bcrypt');

/**
 * 加密密码
 * @param {string} pwd 
 */
function encryptPwd(pwd){
    return bcrypt.hashSync(pwd, 10);
}

/**
 * 密码校验
 * @param {string} checkPwd 要检验的密码
 * @param {string} encryptPwd 加密后的密码
 */
function comparePwd(checkPwd, encryptPwd){
    return bcrypt.compareSync(checkPwd, encryptPwd)
}

module.exports = {
    encryptPwd,
    comparePwd
}