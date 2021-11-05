const Router = require('koa-router');
const { verifyAuth ,verifyPermission} = require('../middleware/auth.middleware');
const {create,reply,update,remove} = require('../controller/comment.controller')
const commentRouter = new Router({prefix:'/comment'});

commentRouter.post('/',verifyAuth,create) // 发布评论
commentRouter.post('/:commentId/reply',verifyAuth,reply) // 回复评论
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update) // 修改评论
commentRouter.delete('/:commentId',verifyAuth,remove) // 删除评论
module.exports = commentRouter