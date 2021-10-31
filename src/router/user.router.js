const Router = require('koa-router')
const {
    create
} = require('../controller/user.controller')

// 路径和中间件处理的映射
const userRouter = new Router({prefix:'/users'}) // 接口前缀
userRouter.post('/',create) //restful

module.exports = userRouter