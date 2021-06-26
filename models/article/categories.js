const { DataTypes } = require('sequelize');
const sequelize = require('../../sqlConfig/dbConn');

// 文章分类
const table = sequelize.defineModel('categories', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

table.sync({
  alert: true,
});

module.exports = table;
