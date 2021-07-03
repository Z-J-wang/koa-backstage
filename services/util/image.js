const Dao = require('../../util/dao').articleDao;
const BaseService = require('./baseBll');

class articleService extends BaseService {
	constructor() {
		super(Dao);
		this._dao = new Dao();
    this._dao.findOne().then((res)=>{
			
      console.log(res.content);
			let reg = /[a-z0-9]*.png/igm

			let ret = reg.exec(res.content)
			console.log(res.content.match(reg))
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
