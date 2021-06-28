const model = require('../../util/model').tags;
const BaseDao = require('../util/baseDao');

class Dao extends BaseDao {
	constructor() {
		super(model);
	}

	/**
	 * 查询数据表中是否存在 tag, 不存在则创建
	 * @param {*} name tag name
	 * @returns
	 */
	async findOrCreate(name) {
		return await this._model.findOrCreate({
			where: { name: name }
		});
	}
}

module.exports = Dao;
