const { DataTypes } = require('sequelize');
const sequelize = require('../../sqlConfig/dbConn');

const table = sequelize.defineModel('notice', {
	content: {
		type: DataTypes.STRING
	}, // 公告内容
	scrollable: DataTypes.BOOLEAN // 是否滚动
});

table.sync({
	alert: true
});

module.exports = table;
