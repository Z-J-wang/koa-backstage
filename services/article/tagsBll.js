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
    const allTags = await this.find(); // 查询数据库中全部的 tag
    const IsExistTag = [];
    allTags.forEach((elem) => {
      // 提取 allTags 记录中的name，组成 IsExistTag 数组
      IsExistTag.push(elem.name);
    });

    arr_tags.forEach((tag) => {
      // 逐一判断传输过来的标签是否已经在数据库中存在，不存在则新增
      if (IsExistTag.indexOf(tag) === -1) {
        this._dao.insert({ name: tag });
      }
    });
  }
}

module.exports = TagsService;
