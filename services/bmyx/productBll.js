const productDao = require('../../util/dao').productDao;

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
        return await this._productDao.find(params.start, params.pageSize, params.condObj);
    }

    /**
     * 搜索模糊查询
     * @param {*} params 
     */
    async findBySearch(params) {
        return await this._productDao.findBySearch(params.start, params.pageSize, params.search);
    }

    /**
     * 根据 name 或者 sort 模糊查询
     * @param {*} params 
     */
    async searchByNameOrSort(params) {
        let searchName = '',
            searchSort = '';
        console.log(params)
        if (params.type === 'name') {
            searchName = params.text;
        } else if (params.type === 'sort') {
            searchSort = params.text;
        }

        return await this._productDao.searchByNameOrSort(params.start, params.pageSize, searchName, searchSort);
    }

    /**
     * 更新 basicinfo 
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        const cond = {
            id: changeObj.id
        }

        return await this._productDao.updated(changeObj, cond);
    }


    /**
     * 商品上下架
     * @param {object} changeObj 修改的值
     */
    async changeProductBan(changeObj) {
        const cond = {
            id: changeObj.id
        }
        const banStaue = {
            ban: changeObj.ban
        }
        return await this._productDao.updated(banStaue, cond);
    }

    /**
     * 删除
     * @param {object} id 
     */
    async delete(id) {
        return await this._productDao.delete(id);
    }
}

module.exports = BasicinfoService;