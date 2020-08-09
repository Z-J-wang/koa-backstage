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
    imgSrcList: Sequelize.STRING, // 图片列表
    detail: Sequelize.STRING // 介绍
})

product.belongsTo(sortofproduct, {
    as: 'sort',
    foreignKey: 's_Id',
    targetKey: 'id'
});

product.sync({
    alert: true
});

module.exports = product;