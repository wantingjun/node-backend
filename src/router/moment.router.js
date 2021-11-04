const Router = require('koa-router')


const momentRouter = new Router({prefix:'/moment'})

const {verifyAuth,verifyPermission} = require('../middleware/auth.middleware')
const {create,detail,list,update,remove} = require('../controller/moment.controller')

momentRouter.post('/',verifyAuth,create) // 发送动态
momentRouter.get('/:momentId',detail) //获取动态
momentRouter.get('/',list) //获取动态
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update) //修改动态
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove) //删除动态



module.exports = momentRouter