const Dao = require('../../util/dao').articleDao;
const BaseService = require('../util/baseBll');
const TagsBll = require('./tagsBll');
const CategoriesBll = require('./categoriesBll');

class articleService extends BaseService {
	constructor() {
		super(Dao);
		this._dao = new Dao();
		this._tagsBll = new TagsBll();
		this._categoriesBll = new CategoriesBll();
	}

	/**
	 * 条件分页查询
	 * @param {object} query // 查询条件
	 * @returns
	 */
	async findByPage(query) {
		return await this._dao.findByPage(
			query.page,
			query.pageSize,
			query.search,
			query.category,
			query.sort
		);
	}

	/**
	 * 重写： 新增一条记录
	 * @param {object} newValue
	 */
	async createNewObj(newObj) {
		newObj.tags = newObj.tags.join('-');
		this._tagsBll.isExist(newObj.tags);
		this._categoriesBll.isExist(newObj.s);
		return await this._dao.insert(newObj);
	}

	/**
	 * 重写：更新
	 * @param {object} changeObj 修改的值
	 */
	async updated(changeObj) {
		try {
			const info = await this.findOne(changeObj.id);
			if (!info.id) {
				return false;
			}
			const cond = {
				id: info.id
			};
			changeObj.tags = changeObj.tags.join('-');
			this._tagsBll.isExist(changeObj.tags);
			this._categoriesBll.isExist(changeObj.category);
			return await this._dao.updated(changeObj, cond);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = articleService;
