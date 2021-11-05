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
    async reply(ctx,next){
        // 1. 获取数据
        const {momentId,content} = ctx.request.body
        const {commentId} = ctx.params
        const {id} = ctx.user
        // 2. 插入数据里
        const result = await service.reply(momentId,content,id,commentId)
        ctx.body = result

    }
}
module.exports = new commentController()