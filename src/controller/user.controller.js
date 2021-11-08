const fs = require('fs');

const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const { AVATAR_PATH } = require('../constants/file-path');
class UserController{
    async create(ctx,next){
        // 获取用户请求传递的参数
        const user = ctx.request.body;

        //传数据，单独抽文件
        const result = await userService.create(user)
        //返回数据
        ctx.body = result;
    }
    async avatarInfo(ctx,next){
        //1. 用户的头像是哪个文件
        const {userId} = ctx.params;
        // 2. 获取头像info
        const avatarInfo = await fileService.getAvatarByUserId(userId)
        console.log(avatarInfo)
        // 提供图像信息
        ctx.response.set('content-type',avatarInfo.mimetype)//设置响应对象
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);// 读文件，以stream的形式返回
        

    }

}

module.exports = new UserController()