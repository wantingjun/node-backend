const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')

class AuthController{
    async login(ctx,next){ // 用户登录接口
       const {id,name} = ctx.user // 获取基本信息
       const token = jwt.sign({id,name},PRIVATE_KEY,{ // 生成token
        expiresIn: 60*60*24, // 60s* 60min*2h
        algorithm:"RS256"
       })
       // const {name} = ctx.request.body;
       // ctx.body = `登录成功，欢迎${name}回来`
       ctx.body = {
           id,name,token
       }
    }

    async success(ctx,next){
        ctx.body ="授权成功"

    }
}
module.exports = new AuthController()