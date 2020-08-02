const Sequelize = require('sequelize');
const sqlConfig = require('./index');
const moment = require('moment')

console.log('init sequelize...');

const sequelize = new Sequelize(sqlConfig.DATABASE, sqlConfig.USERNAME, sqlConfig.PASSWORD, {
    host: sqlConfig.HOST,
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00' //东八时
})

exports.sequelize = sequelize;
exports.defineModel = defineModel;


// (async function () {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })();

const ID_TYPE = Sequelize.BIGINT(11);

/**
 * model 定义初始化函数
 * @param {string} name 表名
 * @param {object} attributes 表字段集合
 */
function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                // allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    };
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false,
        get() {
            const createdAt = this.getDataValue('createdAt')
            return moment(createdAt).format('YYYY-MM-DD');
        }
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
        allowNull: false,
        get() {
            const updatedAt = this.getDataValue('updatedAt')
            return moment(updatedAt).format('YYYY-MM-DD');
        }
    };
    attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,    // 显示声明数据库表名
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    obj.updatedAt = Date.now();
                    obj.version++;
                }
            }
        }
    });
}