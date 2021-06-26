const basicinfoDao = require('../../util/dao').basicinfoDao;

class BasicinfoService {
    constructor() {
        this._basicinfoDao = new basicinfoDao();
    }


    /**
     * 新增一条记录
     * @param {object} newBasicinfo 
     */
    async createBasicinfo(newBasicinfo) {
        return await this._basicinfoDao.insert(newBasicinfo);
    }

    /**
     * 获取全部数据
     */
    async findAll() {
        return await this._basicinfoDao.findAll();
    }

    /**
     * 获取 basicinfo 表的第一条记录
     */
    async findOne() {
        const info = await this._basicinfoDao.findOne();

        // 将形如“xx-xx”地址转化为数组
        info.placeOfBirth = info.placeOfBirth.split('-');
        info.presentAddress = info.presentAddress.split('-');

        return info;
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj) {
        const info = await this.findOne();
        const cond = {
            id: info.id
        }
        changeObj.placeOfBirth = changeObj.placeOfBirth.join('-');
        changeObj.presentAddress = changeObj.presentAddress.join('-');

        return await this._basicinfoDao.updated(changeObj, cond);

    }
}

module.exports = BasicinfoService;