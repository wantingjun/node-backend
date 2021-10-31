const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const userRouter = require('../router/user.router')
const app = new Koa();

app.use(bodyParser())
app.use(userRouter.routes());//把所有路径放进来
app.use(userRouter.allowedMethods)  // 
module.exports = app;