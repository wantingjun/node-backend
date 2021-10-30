const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();

// 路径和中间件处理的映射
const userRouter = new Router({prefix:'/users'}) // 接口前缀
userRouter.post('/',(ctx,next)=>{
    ctx.body ='创建用户成功'
}) //restful



app.use(userRouter.routes());//把所有路径放进来
app.use(userRouter.allowedMethods)  // 
module.exports = app;