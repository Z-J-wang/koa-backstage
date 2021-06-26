const model = require('../../util/model').categories;
const BaseDao = require('../util/baseDao');

class Dao extends BaseDao {
  constructor() {
    super(model);
  }
}

module.exports = Dao;
