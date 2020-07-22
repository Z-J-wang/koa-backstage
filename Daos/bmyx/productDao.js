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
     * 获取全部数据
     */
    async findAll() {
        return await product.findAll();
    }

    /**
     * 获取第一条记录
     * @param {object} condObj 查询条件 默认为空对象
     */
    async findOne(condObj = {}) {
        return await product.findOne({
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