const Router = require('koa-router')

const {avatarHandle} = require ('../middleware/file.middleware')
const {verifyAuth }= require('../middleware/auth.middleware')
const {saveAvatarInfo} = require('../controller/file.controller')
const filrRouter = new Router({prefix:"/upload"})

// 增加中间件：保存图像，图像信息(自身信息+图像信息)，包括mimetype,filename,userId,size
//vfilrRouter.post('/avatar',登录,中间件（保存图像）,中间件（保存图片信息）)

filrRouter.post('/avatar',verifyAuth,avatarHandle,saveAvatarInfo)
module.exports = filrRouter