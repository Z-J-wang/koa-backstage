const Dao = require('../../util/dao').articleDao;
const BaseService = require('../util/baseBll');
const TagsBll = require('./tagsBll')


class articleService extends BaseService {
  constructor() {
    super(Dao);
    this._dao = new Dao();
    this._tagsService = new TagsBll();
    // this._tagsService.createNewObj({name: 'Js'})
    this._tagsService.isExist();
  }

  /**
   * 重写： 新增一条记录
   * @param {object} newValue
   */
  async createNewObj(newObj) {
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
        id: info.id,
      };
      return await this._dao.updated(changeObj, cond);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = articleService;
