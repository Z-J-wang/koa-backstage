const model = require('../../util/model').article;
const BaseDao = require('../util/baseDao');
const { Op } = require('sequelize');

// 文章
class Dao extends BaseDao {
	constructor() {
		super(model);
	}

	/**
	 * 条件分页查询
	 * @param {*} startSeq // 首条数据的序号
	 * @param {*} pageSize  // 分页大小
	 * @param {*} condObj // 查询条件，默认空对象即全部查询
	 * @returns
	 */
	async findByPage(page = 1, pageSize = 10, search, category, sort = 'desc') {
		return await this._model.findAndCountAll({
			order: [['updatedAt', sort]],
			offset: Number((page - 1) * pageSize), // 前端分页组件传来的起始偏移量
			limit: Number(pageSize), // 前端分页组件传来的一页显示多少条
			where: {
				category: {
					[Op.like]: category ? category : '%' // category 不为空时，进行完全匹配；为空时，进行通配
				},
				[Op.or]: [
					{
						title: {
							[Op.like]: `%${search}%`
						}
					},
					{
						introduction: {
							[Op.like]: `%${search}%`
						}
					}
				]
			}
		});
	}
}

module.exports = Dao;
