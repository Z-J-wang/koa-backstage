const product = require('../../model').Product;

class ProductDao {

    constructor() {}

    /**
     * 新增一条记录
     * @param {object} newProduct 
     */
    async insert(newProduct) {
        return product.create(newProduct)
    }

    /**
     * 条件查询
     * @param {object} condObj 查询条件 默认为空对象
     */
    async find(condObj = {}) {
        return await product.findAll({
            raw: true,
            order:[],
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
        return await product.update(updateObj, {
            where: condObj
        })
    }
}

module.exports = ProductDao;