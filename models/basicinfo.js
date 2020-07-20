const {DataTypes} = require('sequelize')
const sequelize = require('../sqlConfig/dbConn');

const basicinfo = sequelize.defineModel('basicinfo', {
    name: DataTypes.STRING,
    gender: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    birthday: DataTypes.DATEONLY,
    placeOfBirth: DataTypes.STRING,
    nationality: DataTypes.STRING,
    presentAddress: DataTypes.STRING,
    introducts: DataTypes.STRING
})

basicinfo.sync();

module.exports = basicinfo;