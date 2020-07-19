## 问题一：Sequelize Unknown column 'createdAt' in 'field list'

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

## 问题二：SequelizeDatabaseError: Table 'person_db.basicinfos' doesn't exist

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
