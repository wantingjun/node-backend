const Router = require('koa-router')

const {avatarHandle,pictureHandle,pictureResize} = require ('../middleware/file.middleware')
const {verifyAuth }= require('../middleware/auth.middleware')
const {saveAvatarInfo,savePictureInfo} = require('../controller/file.controller')
const fileRouter = new Router({prefix:"/upload"})

// 增加中间件：保存图像，图像信息(自身信息+图像信息)，包括mimetype,filename,userId,size
//fileRouter.post('/avatar',登录,中间件（保存图像）,中间件（保存图片信息）)
//pictureResize:中间件，对图片的尺寸进行处理
fileRouter.post('/avatar',verifyAuth,avatarHandle,saveAvatarInfo) // 保存图像
fileRouter.post('/picture',verifyAuth,pictureHandle,pictureResize,savePictureInfo)

module.exports = fileRouter