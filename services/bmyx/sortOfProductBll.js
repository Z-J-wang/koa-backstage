const Dao = require('../../dao').sortOfProductDao;

class Service {
    constructor() {
        this._dao = new Dao();
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