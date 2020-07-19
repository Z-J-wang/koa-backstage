const basicinfoDao = require('../dao').basicinfoDao;

class BasicinfoService {
    constructor(){
        this._basicinfoDao = new basicinfoDao();
    }

    /**
     * 获取全部数据
     */
    async findAll(){
        return await this._basicinfoDao.findAll();
    }

    /**
     * 获取 basicinfo 表的第一条记录
     */
    async findOne(){
        return await this._basicinfoDao.findOne();
    }

    /**
     * 更新 basicinfo 新增
     * @param {object} changeObj 修改的值
     */
    async updated(changeObj){
        const info = await this.findOne();
        const cond = {id: info.id}
        return await this._basicinfoDao.updated(changeObj, cond);
    }
}

module.exports = BasicinfoService;