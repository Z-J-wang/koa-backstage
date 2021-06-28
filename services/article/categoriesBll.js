const Dao = require('../../util/dao').categoriesDao;
const BaseService = require('../util/baseBll');

class TagsService extends BaseService {
	constructor() {
		super(Dao);
		this._dao = new Dao();
	}

	/**
	 * 判断 category 是否存在，不存在则新增
	 * @param {string} category
	 */
	async isExist(category) {
    console.log(category);
		if (!category) {
			return false;
		}

		this._dao.findOrCreate(category);
	}
}

module.exports = TagsService;
