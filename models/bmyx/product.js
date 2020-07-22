const {DataTypes} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const product = sequelize.defineModel('product', {
    name: DataTypes.STRING,                 // 产品名字
    sort: DataTypes.STRING,                 // 分类
    nowPrice:DataTypes.DECIMAL(10, 2),      // 今天价格
    oldPrice: DataTypes.DECIMAL(10, 2),     // 昨天价格
    imgSrc: DataTypes.STRING,               // 图片
    detail: DataTypes.STRING                // 介绍
})

product.sync();

module.exports = product;