const connection = require("../app/database")
class AuthService {
    async checkResource(tableName,momentId,userId){ //查询mount是否具备权限
        try{
            // 查找当前momentID下符合user_id(当前登录用户)的记录
            const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id =? ;`
            const [result] = await connection.execute(statement,[momentId,userId])
            return result.length == 0? false:true; //没有查询到，就说明无权限
        } catch(error){
            console.log(error)
        }     
    }
}

module.exports = new AuthService()