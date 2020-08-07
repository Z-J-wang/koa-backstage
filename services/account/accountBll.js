const Dao = require('../../dao').accountDao;
const jwt = require('../../util/token');
const encrypt = require('../../util/encrypt');
const { decode } = require('jsonwebtoken');

class Service {
    constructor() {
        this._dao = new Dao();
    }

    /**
     * 新增一条记录
     * @param {object} newRecord
     */
    async createOne(newRecord, token) {
        const res = {
            code: 1000,
            msg: '',
            data: {}
        };

        let hasOne = await this._dao.find({
            account: newRecord.account
        })

        if (!jwt.hasAuth(newRecord.auth, token)) {
            // 判断用户是否由权限创建该权限的账户
            res.code = 5000;
            res.msg = "您的权限不够";
        } else if (hasOne && hasOne.length > 0) {
            // 判断系统是否已存在该账户
            res.code = 5000;
            res.msg = "账户已经存在！";
        } else if (newRecord.account.length < 6 && newRecord.account.length > 18) {
            res.code = 3000;
            res.msg = "账户长度应该改6至18个字符长度间！";
        } else if (newRecord.password.length < 6 && newRecord.password.length > 18) {
            res.code = 3000;
            res.msg = "密码长度应该改6至18个字符长度间！";
        } else {
            newRecord.password = encrypt.encryptPwd(newRecord.password);
            res.code = 1000;
            res.msg = "账户添加成功！"
            res.data = await this._dao.insert(newRecord);
        }

        return res;
    }

    /**
     * 获取全部数据
     */
    async find(params = {}) {
        return await this._dao.find(params);
    }

    /**
     * 条件查询一条记录
     * @param {object} params 
     */
    async findOne(params) {
        return await this._dao.findOne(params);
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj, token) {
        const cond = {
            id: changeObj.id
        }

        let ret_msg = '';
        let ret_code = 5000;
        let ret_data = '';

        if (!jwt.hasAuth(changeObj.auth, token)) {
            // 判断用户是否由权限创建该权限的账户
            ret_code = 5000;
            ret_msg = "您的权限不够";
        } else {
            let updated_ret = await this._dao.updated(changeObj, cond);
            if (updated_ret) {
                ret_code = 1000;
                ret_msg = "修改成功！";
                ret_data = updated_ret;
            } else {
                ret_code = 2000;
                ret_msg = "修改失败！"
            }
        }

        return { code: ret_code, msg: ret_msg, data: ret_data }
    }

    /**
     * 删除
     * @param {object} id 
     */
    async delete(id) {
        return await this._dao.delete(id);
    }

    /**
     * 登陆
     * @param {*} params 
     */
    async login(params) {
        let ret_msg = '';
        let ret_code = 5000;
        let ret_token = '';
        let account = params.account;
        let pwd = params.password;
        let accountInfo = await this._dao.findOne({ account: account });

        if (accountInfo == null) {
            ret_msg = "没有当前账户信息";
            ret_code = 3000;
        } else if (encrypt.comparePwd(pwd, accountInfo.password)) {
            ret_token = jwt.createToken(accountInfo.account, accountInfo.auth);
            let ret = await this.updatedToken(accountInfo, ret_token)
            if (ret) {
                ret_code = 1000;
                ret_msg = "登录成功！"
            } else {
                ret_code = 3000;
                ret_msg = "数据库出错！"
            }
        } else {
            ret_code = 3000;
            ret_msg = "密码错误！"
        }

        return { msg: ret_msg, code: ret_code, token: ret_token };
    }


    /**
     * 将 Token 插入账户信息
     * @param {*} accountInfo 账户信息
     * @param {*} token 
     */
    async updatedToken(accountInfo, token) {
        let flat = false;
        let ret = await this._dao.updated({ token: token }, { id: accountInfo.id });

        if (ret && ret.length > 0) {
            flat = true
        }

        return flat;
    }
}

module.exports = Service;