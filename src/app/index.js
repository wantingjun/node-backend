const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router/index')
const errorHandler = require('./error-handle')



const app = new Koa();

app.use(bodyParser())
useRoutes(app) // 调用并把app传进来
app.on('error',errorHandler) // 监听error，使用errorHandler 处理



module.exports = app;