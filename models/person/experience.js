const {DataTypes} = require('sequelize')
const sequelize = require('../../sqlConfig/dbConn');

const experience = sequelize.defineModel('experience', {
    theme: DataTypes.STRING,
    dateTime: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            let data = this.getDataValue('dateTime');
            let list = [];
            if (data) {
                list = data.split('至');
            }
            return list;
        },
        set(val) {
            this.setDataValue('dateTime', val.join('至'))
        }
    },
    detail: DataTypes.STRING
})

experience.sync({
    alert: true
});

module.exports = experience;