const { DataTypes } = require('sequelize');
const sequelize = require('../../sqlConfig/dbConn');

// 标签
const table = sequelize.defineModel('tags', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
});

table.sync({
  alert: true,
});

module.exports = table;
