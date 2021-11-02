const errorType = require('../constants/error-types')
const errorHandler = (error,ctx)=>{
    let status,message;
    switch (error.message){
        case  errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400; // bad request 参数有问题
            message ="用户名或密码不能为空"
            break;
        default:
            status = 404;
            message = "NOT FOUND"
    }

    ctx.status = status;
    ctx.body = message

}

module.exports = errorHandler
