const Router = require('koa-router')


const momentRouter = new Router({prefix:'/moment'})

const {verifyAuth} = require('../middleware/auth.middleware')
const {create,detail,list} = require('../controller/moment.controller')

momentRouter.post('/',verifyAuth,create) // 发送动态
momentRouter.get('/:momentId',detail) //获取动态
momentRouter.get('/',list) //获取动态


module.exports = momentRouter