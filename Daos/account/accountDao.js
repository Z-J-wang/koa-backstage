const model = require('../../util/model').account;

class Dao {

    constructor() { }

    /**
     * 条件查询
     * @param {object} condObj 查询条件 默认为空对象
     */
    async find(condObj = {}) {
        return await model.findAll({
            where: condObj
        });
    }

    /**
     * 条件查询一条记录
     * @param {object} condObj 查询条件 默认为空对象
     */
    async findOne(condObj = {}) {
        return await model.findOne({
            where: condObj
        });
    }

    /**
     * 新增一条记录
     * @param {object} newItem
     */
    async insert(newItem) {
        return model.create(newItem)
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
     * @param {object} idObj
     */
    async delete(idObj) {
        return await model.destroy({ where: idObj });
    }
}

module.exports = Dao;