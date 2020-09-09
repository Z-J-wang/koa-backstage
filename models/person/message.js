const { DataTypes } = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const message = sequelize.defineModel('message', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    datetime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    website: DataTypes.STRING,
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

message.sync({
    alert: true
});

module.exports = message;