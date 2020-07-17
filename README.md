# backstage-management-system
> 本项目基于 koa 搭建的后台 server。项目运行使用了 nodemon

## Project setup
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
