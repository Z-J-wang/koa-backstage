const model = require('../../model').message;

class messageDao {

    constructor() { }

    /**
     * 新增一条记录
     * @param {object} newObj
     */
    async insert(newObj) {
        return model.create(newObj)
    }

    /**
     * 条件查询
     * @param {object} condObj 查询条件 默认为空对象
     */
    async find(start, pageSize, condObj) {
        return await model.findAndCountAll({
            order: [],
            offset: Number(start) || 0, // 前端分页组件传来的起始偏移量
            limit: Number(pageSize) || 10, // 前端分页组件传来的一页显示多少条
            where: condObj || {}
        });
    }

    /**
     * 获取第一条记录
     * @param {object} condObj 查询条件 默认为空对象
     */
    async findOne(condObj = {}) {
        return await model.findOne({
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
        return await model.update(updateObj, {
            where: condObj
        })
    }

    /**
     * 删除
     * @param {object} id 
     */
    async delete(id) {
        return await model.destroy({ where: id });
    }
}

module.exports = messageDao;