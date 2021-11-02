class AuthController{
    async login(ctx,next){ // 用户登录接口
       const {name} = ctx.request.body;
       console.log(name)
       ctx.body = `登录成功，欢迎${name}回来`
    }
}
module.exports = new AuthController()