const Dao = require('../../util/dao').noticeDao;

class Service {
    constructor() {
        this._dao = new Dao();
    }


    /**
     * 新增一条记录
     */
    async createOne() {
        return await this._dao.insert();
    }

    /**
     * 获取全部数据
     */
    async find() {
        const data = await this._dao.find();
        if (data === null){
            await this.createOne();
        }

        return await this._dao.find();
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