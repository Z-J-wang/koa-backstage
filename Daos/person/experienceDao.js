const experience = require('../../model').experience;

class ExperienceDao {

    constructor() {}

    /**
     * 新增一条记录
     * @param {object} newBasicinfo 
     */
    async insert(newBasicinfo) {
        return experience.create(newBasicinfo)
    }

    /**
     * 获取全部数据
     */
    async findAll() {
        return await experience.findAll();
    }

    /**
     * 获取第一条记录
     * @param {object} condObj 查询条件 默认为空对象
     */
    async findOne(condObj = {}) {
        return await experience.findOne({
            where: condObj
        });
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
        return await experience.update(updateObj, {
            where: condObj
        })
    }
}

module.exports = ExperienceDao;