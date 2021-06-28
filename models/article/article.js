const { DataTypes } = require('sequelize');
const sequelize = require('../../sqlConfig/dbConn');

// 文章
const table = sequelize.defineModel('article', {
  title: {
    type: DataTypes.STRING(100),
    unique: true,
  }, // 标题
  introduction: DataTypes.STRING(500), // 简介
  category: DataTypes.STRING(50), // 分类
  tags: DataTypes.STRING(100), // 标签数组
  content: DataTypes.TEXT, // 内容
});

table.sync({
  alert: true,
});

module.exports = table;
