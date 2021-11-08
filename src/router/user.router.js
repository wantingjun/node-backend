const Router = require('koa-router')
const {create,avatarInfo} = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleware/user.middleware')
// 路径和中间件处理的映射
const userRouter = new Router({prefix:'/users'}) // 接口前缀
userRouter.post('/', verifyUser,handlePassword,create) //restful,增加拦截中间件，判断用户名是否正确,加密password
userRouter.get('/:userId/avatar',avatarInfo)//获取用户头像
module.exports = userRouter