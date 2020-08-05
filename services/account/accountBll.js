const Dao = require('../../dao').accountDao;

class Service {
    constructor() {
        this._dao = new Dao();
    }


    async login(params){
        let ret_msg = '';
        let ret_code = 5000;
        let account = params.account;
        let pwd = params.password;
        let accountInfo = await this._dao.find({ account: account});
        if (accountInfo == null){
            ret_msg = "没有当前账户信息";
            ret_code = 2000;
        } else if (pwd === accountInfo.password){
            ret_code = 1000;
            ret_msg = "登录成功！"
        } else {
            ret_code = 3000;
            ret_msg = "密码错误！"
        }

        return {msg: ret_msg, code: ret_code};
    }
    /**
     * 新增一条记录
     * @param {object} newRecord 
     */
    async createOne(newRecord) {
        return await this._dao.insert(newRecord);
    }

    /**
     * 获取全部数据
     */
    async find(params = {}) {
        return await this._dao.find(params);
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        const cond = {
            id: changeObj.id
        }

        return await this._dao.updated(changeObj, cond);
    }

    /**
     * 删除
     * @param {object} id 
     */
    async delete(id) {
        return await this._dao.delete(id);
    }
}

module.exports = Service;