const {DataTypes} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const product = sequelize.defineModel('product', {
    name: DataTypes.STRING,
    nowPrice:DataTypes.DECIMAL(10, 2),
    oldPrice: DataTypes.DECIMAL(10, 2),
    imgSrc: DataTypes.STRING,
    detail: DataTypes.STRING
})

product.sync();

module.exports = product;