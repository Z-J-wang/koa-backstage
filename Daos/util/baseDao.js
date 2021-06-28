/**
 * BaseDao 为基础的 Dao 类，
 * 含有常用的、且通用的增删改查方法
 */
class BaseDao {
  constructor(model) {
    this._model = model;
  }

  /**
   * 条件查询
   * @param {object} condObj 查询条件 默认为空对象即全部查询
   */
  async find(condObj = {}) {
    return await this._model.findAll({
      where: condObj,
    });
  }

  /**
   * 条件查询一条记录
   * @param {object} condObj 查询条件 默认为空对象
   */
  async findOne(condObj = {}) {
    return await this._model.findOne({
      where: condObj,
    });
  }

  /**
   * 新增一条记录
   * @param {object} newItem
   */
  async insert(newItem) {
    return this._model.create(newItem);
  }

  /**
   * 更新
   * @param {object} updateObj 要更新的字段对象
   * @param {*} condObj 条件
   */
  async updated(updateObj, condObj) {
    if (!condObj) {
      return false;
    }
    return await this._model.update(updateObj, {
      where: condObj,
    });
  }

  /**
   * 删除
   * @param {object} idObj
   */
  async delete(idObj) {
    return await this._model.destroy({ where: idObj });
  }
}

module.exports = BaseDao;
