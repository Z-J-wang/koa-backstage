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
    if (!category) {
      return false;
    }
    const allcategories = await this.find(); // 查询数据库中全部的 category
    const IsExistCategories = [];
    allcategories.forEach((elem) => {
      // 提取 allcategories 记录中的name，组成 IsExistCategories 数组
      IsExistCategories.push(elem.name);
    });

    if (IsExistCategories.indexOf(category) === -1) {
      this._dao.insert({ name: category });
    }
  }
}

module.exports = TagsService;
