const errorType = require('../constants/error-types');
const { use } = require('../router/user.router');
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
const verifyLogin = async (ctx,next)=>{
    // 1. 获取用户名和密码
    const {name,password} = ctx.request.body;
   //2. 判断name和assword不为空
   console.log(name,password)
   if(!name || !password){
       // 返回错误信息
       const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
       return ctx.app.emit('error',error,ctx) //把错误信息发射出去
   }

   // 3. 判断用户是否存在（不存在就报错 ）
   const result = await service.getUserByName(name);
   const user = result[0]
   if(!user){
       const error = new Error(errorType.USER_DOES_NOT_EXISTS)
       return ctx.app.emit("error",error,ctx)
   }

    // 4. 判断密码和数据库中的密码是否一致（加密比对）   
    if(md5password(password) !== user.password){ // 密码错误
        const error = new Error(errorType.PASSWORD_IS_INCORRECT) //抛出错误
        return ctx.app.emit("error",error,ctx)
    }

    ctx.user = user

    await next()

}
module.exports = {
    verifyLogin
}