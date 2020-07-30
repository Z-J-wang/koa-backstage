const product = require('../../model').product;
const sortofproduct = require('../../model').sortOfProduct;
class ProductDao {

    constructor() { }

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
    async find(start, pageSize, condObj = {}) {

        return await product.findAndCountAll({
            raw: true,
            order: [],
            offset: Number(start) || 0, // 前端分页组件传来的起始偏移量
            limit: Number(pageSize) || 10, // 前端分页组件传来的一页显示多少条
            where: condObj,
            include: [{
                model: sortofproduct,
                as: "sort",
                attributes: ['name'],  // 查询 sortofproduct 表的name字段
            }]
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

    /**
 * 删除
 * @param {object} id 
 */
    async delete(id) {
        return await product.destroy({ where: id });
    }
}

module.exports = ProductDao;