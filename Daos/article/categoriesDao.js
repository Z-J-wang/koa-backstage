const model = require('../../util/model').categories;
const BaseDao = require('../util/baseDao');

class Dao extends BaseDao {
	constructor() {
		super(model);
	}

	/**
	 * 查询数据表中是否存在 category, 不存在则创建
	 * @param {*} name category name
	 * @returns
	 */
	async findOrCreate(name) {
		return await this._model.findOrCreate({
			where: { name: name }
		});
	}
}

module.exports = Dao;
