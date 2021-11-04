const momentService = require("../service/moment.service")
class MomentController{
    async create(ctx,next){
        // 1. 获取数据(user_id, content,)
        const userId = ctx.user.id
        const content = ctx.request.body.content;
        console.log(userId,content)
        //2. 数据插入数据库
        const result = await momentService.create(userId,content)
        ctx.body = result
    }

    async detail(ctx,next){
        //1. 获取数据（monmentId),符合restful风格
        const momentId = ctx.params.momentId
        // 2. 根据id去查询这条数据
        const result = await momentService.getMomentById(momentId);
    
        ctx.body = result[0]
    }
    async list (ctx,next){
        //1. 获取数据（offset，size）在query中
        const {offset,size} = ctx.query;
        //2. 查询列表
        const result = await momentService.getMomentList(offset,size);
        ctx.body = result
    }
}


module.exports = new MomentController()