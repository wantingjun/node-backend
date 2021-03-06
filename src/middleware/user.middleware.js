// 关于用户的中间件
const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const verifyUser  = async (ctx,next)=>{ 
    //1、获取用户名和密码
    const {name,password} = ctx.request.body;
    //2. 判断name和assword不为空
    console.log(name,password)
    if(!name || !password || name.length== '' || password ==''){
        // 返回错误信息
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx) //把错误信息发射出去
    }

    //3. 判断这次注册的name是没有注册过的
    const result = await service.getUserByName(name)
    if(result.length){
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit("error",error,ctx)
    }

    await next()
}
const handlePassword= async (ctx,next)=>{
    let  {password} = ctx.request.body;
    //console.log(password)
    ctx.request.body.password = md5password(password)//加密之后的密码
    // console.log(ctx.request.body.password)
    await next();

}
module.exports= {
    verifyUser,handlePassword
}