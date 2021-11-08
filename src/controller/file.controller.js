const fileService = require('../service/file.service')
class fileController{
    async saveAvatarInfo(ctx,next){ // 保存图像相关信息
        //1. 获取图像信息
        console.log(123)
        console.log(ctx.req.file)
        const {mimetype,filename,size} = ctx.req.file;
        const {id} = ctx.user
        // 2.将图像信息数据保存到数据库中
        const result = await fileService.createAvatar(filename,mimetype,size,id)
        //3.返回结果
        ctx.body = result;
    }
}

module.exports = new fileController()