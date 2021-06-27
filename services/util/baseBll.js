/**
 * 基础 service 类，
 * 含有常用的、通用的方法
 */
class BaseService {
  constructor(Dao) {
    this._dao = new Dao();
  }

  /**
   * 获取全部数据
   */
  async find(condObj) {
    return await this._dao.find(condObj);
  }

  /**
   * 条件分页查询
   * @param {object} query // 查询条件
   * @returns
   */
  async findByPage(query) {
    const params = {
      start: query.start,
      pageSize: query.pageSize,
      condObj: query.condObj ? JSON.parse(query.condObj) : {},
    };
    return await this._dao.findByPage(
      params.start,
      params.pageSize,
      params.condObj
    );
  }

  /**
   * 新增一条记录
   * @param {object} newValue
   */
  async createNewObj(newObj) {
    return await this._dao.insert(newObj);
  }

  /**
   * 根据 id 查询一条记录
   */
  async findOne(id) {
    const info = await this._dao.findOne(id);

    return info;
  }

  /**
   * 更新
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

  /**
   * 删除
   * @param {object} id
   */
  async delete(id) {
    return await this._dao.delete(id);
  }
}

module.exports = BaseService;