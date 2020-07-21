const experienceDao = require('../dao').experienceDao;

class ExperienceService {
    constructor() {
        this._experienceDao = new experienceDao();
    }


    /**
     * 新增一条记录
     * @param {object} newValue 
     */
    async createBasicinfo(newValue) {
        return await this._experienceDao.insert(newValue);
    }

    /**
     * 获取全部数据
     */
    async findAll() {
        return await this._experienceDao.findAll();
    }

    /**
     * 获取 basicinfo 表的第一条记录
     */
    async findOne() {
        const info = await this._experienceDao.findOne();

        // 将形如“xx-xx”地址转化为数组
        info.placeOfBirth = info.placeOfBirth.split('-');
        info.presentAddress =  info.presentAddress.split('-');

        return info;
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        try {
            const info = await this.findOne();
            const cond = {
                id: info.id
            }
            changeObj.placeOfBirth = changeObj.placeOfBirth.join('-');
            changeObj.presentAddress = changeObj.presentAddress.join('-');
            
            return await this._experienceDao.updated(changeObj, cond);
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = ExperienceService;