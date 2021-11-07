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
    async update(ctx,next){
        // 获取参数
        const {momentId} = ctx.params
        const {content} = ctx.request.body
        // 2. 修改内容
        const result = await momentService.update(content,momentId)
        //3. 返回内容
        ctx.body = result
    }
    async remove(ctx,next){
        // 1. 获取数据（momentId）
        const {momentId} = ctx.params
        //2.删除内容
        const result = await momentService.remove(momentId)
        // 3. 返回内容
        ctx.body = result 

    }
    async addLabels(ctx,next){
        // 获取标签和动态id
        const {labels} = ctx
        const {momentId} = ctx.params
        // 2.添加所有标签
        console.log(ctx)
        for (let label of labels){
            // 2.1判断标签是否已经和动态有过关系了
            const isExist = await momentService.hasLabel(momentId,label.id)
            if(!isExist){ // 这个moment下的这个标签不存在
                await momentService.addLabel(momentId,label.id)
            }
        }
        
        ctx.body = " 给动态添加标签成功"
    }
}


module.exports = new MomentController()