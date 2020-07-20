## 报错：Sequelize Unknown column 'createdAt' in 'field list'

#### 原因
> Sequelize 默认启用时间戳。在启用时间戳时，Sequelize自动为 `findAll()` 的 `select` 语句增加两个属性：`createdAt` 和 `updatedAt`。当我们在定义 model 时没有增加这两个属性就会报上面的错误。

#### 解决方法
> 1. 在model创建的时候禁用时间戳

```js
sequelize.define('User', {
  // ... (attributes)
}, {
   timestamps: false
});
```
> 2.在`sequelize`连接 `mysql` 的时候，直接禁用所有时间戳开启：

```js
const sequelize = new Sequelize('sequelize_test', 'root', null, {
    host: "127.0.0.1",
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});
```

> 参考文献：[Sequelize Unknown column 'createdAt' in 'field list'?](https://blog.csdn.net/xgangzai/article/details/90614400)

***

## 报错：SequelizeDatabaseError: Table 'person_db.basicinfos' doesn't exist

#### 原因
> **表名推断**：默认情况下，当未提供表名时，Sequelize会自动将模型名称复数并将其用作表名。

#### 解决方法：
> 方法一：在model创建的时候禁用表名推断
```js
sequelize.define('User', {
  // ... (attributes)
}, {
  freezeTableName: true
});
```
> 方法二：直接提供表名
```js
sequelize.define('User', {
  // ... (attributes)
}, {
  tableName: 'Employees'
});
```
***

## Data types - 数据类型

参考网址：https://itbilu.com/nodejs/npm/V1PExztfb.html#definition-dataType

> Sequelize.STRING                      // VARCHAR(255)
> Sequelize.STRING(1234)                // VARCHAR(1234)
> Sequelize.STRING.BINARY               // VARCHAR BINARY
> Sequelize.TEXT                        // TEXT
> Sequelize.TEXT('tiny')                // TINYTEXT
> 
> Sequelize.INTEGER                     // INTEGER
> Sequelize.BIGINT                      // BIGINT
> Sequelize.BIGINT(11)                  // BIGINT(11)
> 
> Sequelize.FLOAT                       // FLOAT
> Sequelize.FLOAT(11)                   // FLOAT(11)
> Sequelize.FLOAT(11, 12)               // FLOAT(11,12)
> 
> Sequelize.REAL                        // REAL        PostgreSQL only.
> Sequelize.REAL(11)                    // REAL(11)    PostgreSQL only.
> Sequelize.REAL(11, 12)                // REAL(11,12) PostgreSQL only.
> 
> Sequelize.DOUBLE                      // DOUBLE
> Sequelize.DOUBLE(11)                  // DOUBLE(11)
> Sequelize.DOUBLE(11, 12)              // DOUBLE(11,12)
> 
> Sequelize.DECIMAL                     // DECIMAL
> Sequelize.DECIMAL(10, 2)              // DECIMAL(10,2)
> 
> Sequelize.DATE                        // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
> Sequelize.DATE(6)                     // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision 
> Sequelize.DATEONLY                    // DATE without time.
> Sequelize.BOOLEAN                     // TINYINT(1)
> 
> Sequelize.ENUM('value 1', 'value 2')  // An ENUM with allowed values 'value 1' and 'value 2'
> Sequelize.ARRAY(Sequelize.TEXT)       // Defines an array. PostgreSQL only.
> 
> Sequelize.JSON                        // JSON column. PostgreSQL only.
> Sequelize.JSONB                       // JSONB column. PostgreSQL only.
> 
> Sequelize.BLOB                        // BLOB (bytea for PostgreSQL)
> Sequelize.BLOB('tiny')                // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
> 
> Sequelize.UUID                        //   PostgreSQL 和 SQLite 中为 UUID, MySQL 中为CHAR(36) BINARY (使用 defaultValue: Sequelize.UUIDV1 或 Sequelize.UUIDV4 生成默认值)
> 
> Sequelize.RANGE(Sequelize.INTEGER)    // Defines int4range range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.BIGINT)     // Defined int8range range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.DATE)       // Defines tstzrange range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.DATEONLY)   // Defines daterange range. PostgreSQL only.
> Sequelize.RANGE(Sequelize.DECIMAL)    // Defines numrange range. PostgreSQL only.
> 
> Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // Defines array of tstzrange ranges. PostgreSQL only.
> 
> Sequelize.GEOMETRY                    // Spatial column.  PostgreSQL (with PostGIS) or MySQL only.
> Sequelize.GEOMETRY('POINT')           // Spatial column with geomerty type.  PostgreSQL (with PostGIS) or MySQL only.
> Sequelize.GEOMETRY('POINT', 4326)     // Spatial column with geomerty type and SRID.  PostgreSQL (with PostGIS) or MySQL only.
