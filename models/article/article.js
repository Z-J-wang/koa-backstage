const { DataTypes } = require('sequelize');
const sequelize = require('../../sqlConfig/dbConn');

// 文章
const table = sequelize.defineModel('article', {
	title: {
		type: DataTypes.STRING,
		unique: true
	}, // 标题
	content: DataTypes.STRING // 内容
});

table.sync({
	alert: true
});

module.exports = table;
