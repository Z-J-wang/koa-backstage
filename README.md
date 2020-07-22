# koa-backstage
> 本项目基于 koa 搭建的后台 server。项目运行使用了 nodemon

### Project setup
```
npm install
```

### 项目启动
```
npm run dev
```
> 如果 port 被占用
1. 获取 port 的 pid
```
netstat -ano
```
2. kill 线程
```
tskill <pid>
```

### Git commit 规范

#### 格式：
```
<type>(<scope>): <subject>
```
> type（必需）、scope（可选）和subject（必需）

#### 字段解析

> ##### type
> + feat：新功能（feature）
> + fix：修补bug
> + docs：文档（documentation）
> + style： 格式（不影响代码运行的变动）
> + refactor：重构（即不是新增功能，也不是修改bug的代码变动）
> + test：增加测试
> + chore：构建过程或辅助工具的变动
> ***
> ##### scope
> `scope` 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
> ****
> ##### subject
> `subject` 是 commit 目的的简短描述，不超过50个字符。
>***

#### res.code
1. 