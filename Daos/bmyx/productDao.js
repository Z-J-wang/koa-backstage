const product = require('../../model').product;
const sortofproduct = require('../../model').sortofproduct;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
    async find(start, pageSize, condObj) {
        return await product.findAndCountAll({
            order: [],
            offset: Number(start) || 0, // 前端分页组件传来的起始偏移量
            limit: Number(pageSize) || 10, // 前端分页组件传来的一页显示多少条
            where: condObj || {},
            include: [{
                model: sortofproduct,
                as: "sort",
                attributes: ['name'],  // 查询 sortofproduct 表的name字段
            }]
        });
    }

    /**
     * 模糊查询
     * @param {object} condObj 查询条件 默认为空对象
     */
    async findBySearch(start, pageSize, search) {
        return await product.findAndCountAll({
            order: [],
            offset: Number(start) || 0, // 前端分页组件传来的起始偏移量
            limit: Number(pageSize) || 10, // 前端分页组件传来的一页显示多少条
            where: {
                [Op.or]: [
                    {
                        'name': {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        "$sort.name$": {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            } || {},
            include: [{
                model: sortofproduct,
                as: "sort",
                attributes: ['name'],  // 查询 sortofproduct 表的name字段
            }]
        });
    }

    /**
     * 根据 name 或者 sort 模糊查询
     * @param {number} start 
     * @param {number} pageSize 
     * @param {string} searchName 
     * @param {string} searchSort 
     */
    async searchByNameOrSort(start, pageSize, searchName, searchSort) {
        return await product.findAndCountAll({
            order: [],
            offset: Number(start) || 0, // 前端分页组件传来的起始偏移量
            limit: Number(pageSize) || 10, // 前端分页组件传来的一页显示多少条
            where: {
                [Op.and]: [
                    {
                        'name': {
                            [Op.like]: `%${searchName}%`
                        }
                    },
                    {
                        "$sort.name$": {
                            [Op.like]: `%${searchSort}%`
                        }
                    }
                ]
            } || {},
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