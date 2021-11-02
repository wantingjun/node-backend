// 关于用户的中间件
const errorType = require('../constants/error-types')
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

    await next()
}
module.exports= {
    verifyUser
}