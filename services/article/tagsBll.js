const Dao = require('../../util/dao').tagsDao;
const BaseService = require('../util/baseBll');

class TagsService extends BaseService {
  constructor() {
    super(Dao);
    this._dao = new Dao();
  }

  /**
   * 判断 tags 中的 tag 是否存在，不存在则新增
   * @param {string} tags
   */
  async isExist(tags) {
    if (!tags) {
      return false;
    }
    const arr_tags = tags.split('-'); // 将传输过来的标签转为数组
    arr_tags.forEach((tag) => {
      this._dao.findOrCreate(tag);
    });
  }
}

module.exports = TagsService;
