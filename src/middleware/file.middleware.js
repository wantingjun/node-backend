const Multer = require('koa-multer')
const {AVATAR_PATH,PICTURE_PATH} = require("../constants/file-path")
// 用户头像保存
const avatarUpload = Multer({ // 保存文件到本地
    dest:AVATAR_PATH
})
const avatarHandle = avatarUpload.single('avatar');

//图像保存
const pictureUpload = Multer({ // 保存文件到本地
    dest:PICTURE_PATH
})
const pictureHandle = pictureUpload.array('picture',9); //最多9张图
module.exports = {avatarHandle,pictureHandle}