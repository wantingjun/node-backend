const errorType = require('../constants/error-types')
const errorHandler = (error,ctx)=>{
    let status,message;
    switch (error.message){
        case  errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400; // bad request 参数有问题
            message ="用户名或密码不能为空"
            break;
        case  errorType.USER_ALREADY_EXISTS:
            status = 409; // conflict 
            message ="用户名已存在"
            break;
        case  errorType.USER_DOES_NOT_EXISTS:
            status = 400; // 参数错误，用户不存在
            message ="用户不存在"
            break;         
        case  errorType.PASSWORD_IS_INCORRECT:
            status = 400; // 密码错误
            message ="密码不正确"
            break;    
        case  errorType.UNAUTHORIZATION:
            status = 401; // 未授权
            message ="无效的token"
            break;        
        default:
            status = 404;
            message = "NOT FOUND"
    }

    ctx.status = status;
    ctx.body = message

}

module.exports = errorHandler
