const Dao = require('../../util/dao').tagsDao;
const BaseService = require('../util/baseBll');

class TagsService extends BaseService {
  constructor() {
    super(Dao);
    this._dao = new Dao();
  }

  /**
   * 判断 tags 中的 tag 是否存在，不存在则新增
   * @param {Array} tags
   */
  async isExist(tags) {
    // const arr_tags = tags.split('-');
    const allTags = await this.find();
    allTags.forEach(element => {
      console.log(element);
    });
    // return await this._dao.insert(newObj);
  }
}

module.exports = TagsService;
