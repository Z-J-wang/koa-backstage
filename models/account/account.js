const {
    DataTypes
} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const table = sequelize.defineModel('account', {
    account: {
        type: DataTypes.STRING,
        unique: true
    }, // 公告内容
    password: DataTypes.STRING, // 是否滚动
    auth: DataTypes.BOOLEAN, // 是否滚动
    token:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

table.sync({
    alert: true
});

module.exports = table;