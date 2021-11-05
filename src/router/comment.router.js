const Router = require('koa-router');
const { verifyAuth } = require('../middleware/auth.middleware');
const {create,reply} = require('../controller/comment.controller')
const commentRouter = new Router({prefix:'/comment'});

commentRouter.post('/',verifyAuth,create) // 发布评论
commentRouter.post('/:commentId/reply',verifyAuth,reply) // 回复评论


module.exports = commentRouter