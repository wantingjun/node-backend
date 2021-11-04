const errorType = require('../constants/error-types');
const service = require('../service/user.service')
const authService = require('../service/auth.service')
const md5password = require('../utils/password-handle')
const {PUBLIC_KEY} = require('../app/config')
const jwt = require('jsonwebtoken');
const authRouter = require('../router/auth.router');


const verifyLogin = async (ctx,next)=>{ // 登陆是的验证，用户是否存在与数据库，账号密码对不对
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

const verifyAuth = async(ctx,next)=>{ // 检验用户是否登陆
    console.log('验证授权的middleware')
    // 1. 取出token
    const authorization = ctx.headers.authorization
    if(!authorization){ // 处理不带token的情况
        const err = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit("error",err,ctx)
    }
    const token = authorization.replace("Bearer ",'') // 注意bearer后面的空格不要丢了
    // 2. 验证token(id,name,iat,exp)
    // 验证成功会得到携带的信息和时间等等
    // 没有成功用trycatch
    try{
        const result = jwt.verify(token,PUBLIC_KEY,{ 
            algorithms:["RS256"]
        })
        ctx.user = result; // 把result保存起来
        await next()
    } catch(error){
        const err = new Error(errorType.UNAUTHORIZATION)
        // console.log(error)
        ctx.app.emit("error",err,ctx)

    }
}
 /**
 * 1.很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2.接口: 业务接口系统/后端管理系统
 *  一对一: user -> role
 *  多对多: role -> menu(删除动态/修改动态)
 */
const verifyPermission = async(ctx,next)=>{ // 权限中间件，判断用户是否具备这个权限。
    console.log("验证权限的middleware")
    //1. 获取参数
    const {momentId} = ctx.params
    const {id} = ctx.user;// 用户的id
    console.log(ctx.user)
    //2.查询是否具备权限
    try{
        const isPermission = await authService.checkMoment(momentId, id)
        if(!isPermission) throw new Error() // 没有权限,抛出异常，进入catch
        await next();
    } catch(error){
        const err = new Error(errorType.UNPERMISSION)
        return ctx.app.emit("error",err,ctx)
    }
}
module.exports = {
    verifyLogin,verifyAuth,verifyPermission
}