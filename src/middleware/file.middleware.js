const Multer = require('koa-multer')
const {AVATAR_PATH} = require("../constants/file-path")

const avatarUpload = Multer({ // 保存文件到本地
    dest:AVATAR_PATH
})
const avatarHandle = avatarUpload.single('avatar');

module.exports = {avatarHandle}