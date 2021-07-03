const Dao = require('../../util/dao').articleDao;
const BaseService = require('./baseBll');
const clearInvalidImage =require('../../util/common').clearInvalidImage
class articleService extends BaseService {
	constructor() {
		super(Dao);
		this._dao = new Dao();
    this._dao.find().then((res)=>{
			clearInvalidImage(res)
    });
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

	
}

module.exports = articleService;
