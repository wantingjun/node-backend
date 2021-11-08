const Multer = require('koa-multer')

const avatarUpload = Multer({ // 保存文件到本地
    dest:'./uploads/avatar'
})
const avatarHandle = avatarUpload.single('avatar');

module.exports = {avatarHandle}