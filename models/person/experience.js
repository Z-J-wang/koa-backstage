const {DataTypes} = require('sequelize')
const sequelize = require('../sqlConfig/dbConn');

const experience = sequelize.defineModel('experience', {
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

experience.sync();

module.exports = experience;