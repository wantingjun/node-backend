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
## 接口逻辑相关内容cotroller
* 放到controller文件夹下
* 以user.controller.js为例，新建UserController类，导出，然后在user.router.js中引入使用这个类中的方法，实际处理逻辑的还是在这个类里面
## 将数据库处理放入service下
* 在service目录下创建user.service.js文件，创建UserService类用于处理数据库，在`user.controller.js`处理接口逻辑时，如果需要对数据库进行操作，直接调用即可
## 解析post的body数据
* 使用koa-bodyparser
## 拦截中间件
* verifyUser验证用户
* 这些中间件写在middleware文件夹下
## 错误处理
* 发射错误
```
ctx.app.emit('error',error,ctx) //把错误信息发射出去
```
* 监听错误
```
app.on('error',errorHandler) // 监听error，使用errorHandler 处理

```
* 创建app/error-handle.js文件，处理错误
* 定义constants/error-types错误类型，在`app/error-handle.js`中调用错误类型
## 用户密码加密存储
* 用户密码在数据库里不能是明文的，要加密存储
* 新建utils/password-handle.js，使用MD5进行加密
## 登录凭证
* cookie+session、token（jwt）
## 登录相关（授权）
### 登录结构
* 创建auth.router
### 登录账号密码的校验
* 在登录路由插入中间件处理就可以了`authRouter.post('/login',login)`
1. 中间件verifyLogin
* 获取用户名和密码
* 判断name和assword不为空
* 判断用户是否存在（不存在就报错 ）
* 判断密码和数据库中的密码是否一致（加密比对）
## 重构路由
* 通过一行代码，把所有路由注册到app/index.js中
### 步骤
1. 在router文件夹下创建index.js
2. 在index.js到当前文件夹下的所有非index.js文件，然后倒入挂载
3. 在app/index.js中导入router/index.js
## token
### 颁发token
* 安装`npm install jsonwebtoken`
1. 在auth.controller.js/login添加颁发签名，使用jwt
2. 引入2个key，在`app/keys`下的`private.key`和`public.key`,把这2个key放入`config`文件中，便于调用
### 验证token
* 新建`verifyAuth`中间件
## moment动态模块
1. 发表动态
2. 获取动态
* 使用restful的api接口
* 注意params和query的区别
* 查询语句
3. 查询多条动态
4. 修改状态
* 中间件1`verifyAuth`：验证是否登陆。必须登录才能修改
* 中间件2`verifyPermission`： 验证是否有权限。普通用户只能修改自己的状态，管理员可以修改他人状态
1. 在router里定义接口
2. 登录中间件
3. 权限中间件：增加对应的service，查找当前momentID下符合user_id(当前登录用户)的记录检查是否具备权限，不具备抛出异常
3. 在update的controller里进行修改
## comment评论
### 创建评论表
```
CREATE TABLE IF NOT EXISTS `comment`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	moment_id INT NOT NULL,
	user_id INT NOT NULL,
	comment_id INT DEFAULT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY(moment_id) REFERENCES moment(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

```
### 创建评论
1. 提交评论的时候，需动态id和评论内容，和评论者id（通过token读到）
### 回复评论
### 修改评论
登录权限+ 用户权限
1. 怎么设置验证用户权限,统一的checkResource(通用性
2. 如何是指动态的tableName
1.使用闭包
2. 使用restful api的参数
### 删除评论
* 注意联动的删除
### 重新设计获取动态列表接口
* 增加每个动态评论数量字段
