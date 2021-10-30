## 结构
* main.js：主入口
* app:
* controller
* router:路由
* service：
* util
## 过程
1. 使用`npm install nodemon -D`开发运行
* 在package.jsn中添加
```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./src/index.js"
  },
```
* 执行`npm start`就可以运行了
### app
1. 和app相关的全放到app文件夹里
2. 启动端口，mysql等账号密码，不要固定写死在程序里，要把环境变量相关配置放到.env文件中
* 使用`dotenv`把。env的变量加载到process.env中
* 在app文件夹下增加`config.js`文件，然后再index.js中导入
```
const dotenv = require('dotenv')
dotenv.config()
```
## 用户注册接口
1. 使用`koa`只能使用`use`，没法区分`post`。所以安装一下`koa-router`
