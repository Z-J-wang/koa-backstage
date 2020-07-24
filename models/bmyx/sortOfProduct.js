const {
    DataTypes
} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const table = sequelize.defineModel('sortofproduct', {
    name: {
        type: DataTypes.STRING,
        unique: true
    }, // 类别名称
})

table.sync({
    alert: true
});

module.exports = table;