const model = require('../../util/model').article;
const BaseDao = require('../util/baseDao');

// 文章
class Dao extends BaseDao {
  constructor() {
    super(model);
  }
}

module.exports = Dao;
