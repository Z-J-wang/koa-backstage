const model = require('../../util/model').tags;
const BaseDao = require('../util/baseDao');

class Dao extends BaseDao {
  constructor() {
    super(model);
  }
}

module.exports = Dao;
