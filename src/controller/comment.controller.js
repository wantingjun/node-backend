const service = require('../service/comment.service')
class commentController{
    async create(ctx,next){
        // 1. 获取数据
        const {momentId,content} = ctx.request.body
        const {id} = ctx.user
        // 2. 插入数据里
        const result = await service.create(momentId,content,id)
        ctx.body = result

    }
    async reply(ctx,next){ // 回复评理
        // 1. 获取数据
        const {momentId,content} = ctx.request.body
        const {commentId} = ctx.params
        const {id} = ctx.user
        // 2. 插入数据里
        const result = await service.reply(momentId,content,id,commentId)
        ctx.body = result

    }
    async update(ctx,next){ // 更新评论 
        const {commentId} = ctx.params
        const {content} = ctx.request.body
        // 2. 数据
        const result = await service.update(commentId,content)

        ctx.body = result

    }
    async remove(ctx,next){
        const {commentId} = ctx.params
        // 2
        const result = await service.remove(commentId)
        ctx.body = result

    }
    async list(ctx,next){
        const {momentId} = ctx.query
        const result = await service.getCommentsByMomentId(momentId)
        ctx.body = result

    }
}
module.exports = new commentController()