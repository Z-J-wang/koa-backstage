const basicinfo = require('../../model').basicinfo;

class BasicinfoDao {

    constructor() {}

    /**
     * 新增一条记录
     * @param {object} newBasicinfo 
     */
    async insert(newBasicinfo) {
        return basicinfo.create(newBasicinfo)
    }

    /**
     * 获取全部数据
     */
    async findAll() {
        return await basicinfo.findAll();
    }

    /**
     * 获取第一条记录
     * @param {object} condObj 查询条件 默认为空对象
     */
    async findOne(condObj = {}) {
        return await basicinfo.findOne({
            where: condObj
        });
    }

    /**
     * 更新
     * @param {object} updateObj 要更新的字段对象
     * @param {*} condObj 条件
     */
    async updated(updateObj, condObj) {
        if (!condObj) {
            return false;
        }
        return await basicinfo.update(updateObj, {
            where: condObj
        })
    }
}

module.exports = BasicinfoDao;