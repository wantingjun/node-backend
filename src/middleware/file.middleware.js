const Multer = require('koa-multer')
const {AVATAR_PATH,PICTURE_PATH} = require("../constants/file-path")
const Jimp = require("jimp")
const path = require("path")
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

const pictureResize = async (ctx,next)=>{
    //1. 获取所有的图像信息
    const files = ctx.req.files;
    console.log(files)
    //2. 对图像进行处理（sharp库，或者jimp库）
    for(let file of files){
        const destPath = path.join(file.destination,file.filename) // 存储位置
        console.log(destPath)
        Jimp.read(file.path).then(image=>{
            image.resize(1280,Jimp.AUTO).write(`${destPath}-large`)
            image.resize(640,Jimp.AUTO).write(`${destPath}-middle`)
            image.resize(320,Jimp.AUTO).write(`${destPath}-small`)
        })
        
    }
    await next()
}
module.exports = {avatarHandle,pictureHandle,pictureResize}