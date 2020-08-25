const sortofproduct = require('./sortofproduct');

const Sequelize = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const product = sequelize.defineModel('product', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }, // 产品名字
    nowPrice: Sequelize.DECIMAL(10, 2), // 今天价格
    oldPrice: Sequelize.DECIMAL(10, 2), // 昨天价格
    imgSrcList: {
        type: Sequelize.STRING,
        allowNull: true,
        get() {
            let data = this.getDataValue('imgSrcList');
            let list = [];
            if(data){
                list = data.split(';');
            }
            return list;
        },
        set(val){
            this.setDataValue('imgSrcList', val.join(';'))
        }
    }, // 图片列表
    detail: Sequelize.STRING, // 介绍
    ban: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

product.belongsTo(sortofproduct, {
    as: 'sort',
    foreignKey: 's_Id',
    targetKey: 'id'
});

product.sync({
    force: true
});

module.exports = product;