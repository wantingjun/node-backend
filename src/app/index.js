const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const errorHandler = require('./error-handle')



const app = new Koa();

app.use(bodyParser())
app.use(userRouter.routes());//把所有路径放进来
app.use(userRouter.allowedMethods)  // 
app.on('error',errorHandler) // 监听error，使用errorHandler 处理



module.exports = app;