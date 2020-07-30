const model = require('../../model').sortOfProduct;

class Dao {

    constructor() {}

    /**
     * 新增一条记录
     * @param {object} newItem
     */
    async insert(newItem) {
        return model.create(newItem)
    }

    /**
     * 条件查询
     * @param {object} condObj 查询条件 默认为空对象
     */
    async find(condObj = {}) {
        return await model.findAll({
            raw: true,
            order: [],
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

module.exports = Dao;