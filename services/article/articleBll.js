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
		const ret = await this._dao.find({ title: newObj.title });
		if (ret.length) {
			return { code: 5000, msg: '文章标题已存在' };
		}
		newObj.tags = newObj.tags.join('-');
		this._tagsBll.isExist(newObj.tags);
		this._categoriesBll.isExist(newObj.category);
		return { code: 1000, data: await this._dao.insert(newObj) };
	}

	/**
	 * 重写：更新
	 * @param {object} changeObj 修改的值
	 */
	async updated(changeObj) {
		try {
			if (!changeObj.id) {
				return { code: 5000, msg: '缺少ID' };
			}
			const ret = await this._dao.findOne({ title: changeObj.title });
			if (ret.id !== changeObj.id) {
				return { code: 5000, msg: '文章标题已存在' };
			}
			changeObj.tags = changeObj.tags.join('-');
			this._tagsBll.isExist(changeObj.tags);
			this._categoriesBll.isExist(changeObj.category);
			const changedData = await this._dao.updated(changeObj, {
				id: changeObj.id
			});
			return {
				code: 1000,
				data: await this._dao.findOne({ id: changedData.id }),
				msg: '更新成功'
			};
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * 浏览量自增
	 * @param {number} id
	 */
	async pageViewAutoIncre(id) {
		try {
			const info = await this.findOne({ id: id });
			console.log(info);
			if (!info.id) {
				return false;
			}
			const cond = {
				id: info.id
			};

			return await this._dao.updated({ pageViews: ++info.pageViews }, cond);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = articleService;
