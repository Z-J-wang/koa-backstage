const experienceDao = require('../../dao').experienceDao;

class ExperienceService {
    constructor() {
        this._experienceDao = new experienceDao();
    }

    /**
     * 获取全部数据
     */
    async find(query) {
        const params = {
            start: query.start,
            pageSize: query.pageSize,
            condObj: query.condObj ? JSON.parse(query.condObj) : {}
        }
        return await this._experienceDao.find(params.start, params.pageSize, params.condObj);
    }

    /**
     * 新增一条记录
     * @param {object} newValue 
     */
    async createNewObj(newObj) {
        return await this._experienceDao.insert(newObj);
    }


    /**
     * 获取 basicinfo 表的第一条记录
     */
    async findOne(id) {
        const info = await this._experienceDao.findOne(id);

        return info;
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        try {
            const info = await this.findOne(changeObj.id);
            if (!info.id){
                return false;
            }
            const cond = {
                id: info.id
            }
            return await this._experienceDao.updated(changeObj, cond);
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * 删除
     * @param {object} id 
     */
    async delete(id) {
        return await this._experienceDao.delete(id);
    }
}

module.exports = ExperienceService;