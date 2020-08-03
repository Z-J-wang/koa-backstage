const {
    DataTypes
} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const table = sequelize.defineModel('sortofproduct', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }, // 类别名称
    imgSrc: {
        type: DataTypes.STRING,
        allowNull: true
    } // 图片
})

table.sync({
    alert: true
});

module.exports = table;