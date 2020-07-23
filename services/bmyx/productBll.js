const productDao = require('../../dao').productDao;

class BasicinfoService {
    constructor() {
        this._productDao = new productDao();
    }


    /**
     * 新增一条记录
     * @param {object} newRecord 
     */
    async createOne(newRecord) {
        return await this._productDao.insert(newRecord);
    }

    /**
     * 获取全部数据
     */
    async find(params) {
        return await this._productDao.find(params);
    }

    /**
     * 获取 basicinfo 表的第一条记录
     */
    async findOne() {
        const info = await this._productDao.findOne();

        return info;
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        if (changeObj.id) {
            return 400;
        }
        const cond = {
            id: changeObj.id
        }

        return await this._productDao.updated(changeObj, cond);
    }
}

module.exports = BasicinfoService;