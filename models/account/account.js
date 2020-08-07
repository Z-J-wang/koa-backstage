const {
    DataTypes
} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const table = sequelize.defineModel('account', {
    account: {
        type: DataTypes.STRING,
        unique: true
    }, // 账户
    password: DataTypes.STRING, // 密码
    auth: DataTypes.SMALLINT, // 权限 0，1，2
    token:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

table.sync({
    alert: true
});

module.exports = table;