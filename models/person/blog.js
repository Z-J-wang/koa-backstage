const { DataTypes } = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const blog = sequelize.defineModel('blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publishTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    href: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imgSrc: DataTypes.STRING,
    digest: DataTypes.STRING
})

blog.sync({
    alert: true
});

module.exports = blog;