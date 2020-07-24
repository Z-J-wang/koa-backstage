const {
    DataTypes
} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const table = sequelize.defineModel('sortOfProduct', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }, // 类别名称
})

table.sync({
    alter: true
});

module.exports = table;