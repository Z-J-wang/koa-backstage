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
        return await this._productDao.find(params.start, params.pageSize, params.cond);
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        const cond = {
            id: changeObj.id
        }

        return await this._productDao.updated(changeObj, cond);
    }

    /**
     * 删除
     * @param {object} id 
     */
    async delete(id){
        return await this._productDao.delete(id);
    }
}

module.exports = BasicinfoService;