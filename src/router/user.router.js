const Router = require('koa-router')
const {
    create
} = require('../controller/user.controller')
const {verifyUser} = require('../middleware/user.middleware')
// 路径和中间件处理的映射
const userRouter = new Router({prefix:'/users'}) // 接口前缀
userRouter.post('/', verifyUser,create) //restful,增加拦截中间件，判断用户名是否正确

module.exports = userRouter