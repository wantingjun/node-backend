const connection = require('../app/database')
class CommonService{
    async create(momentId,content,userId){
        const statement = `INSERT INTO comment (content, moment_id,user_id) VALUES (?,?,?);`
        const [result] = await connection.execute(statement,[content,momentId,userId])
        return result
    }
    async reply(momentId,content,userId,commentId){
        console.log(momentId,content,userId,commentId)
        const statement = `INSERT INTO comment (content, moment_id,user_id,comment_id) VALUES (?,?,?,?);`;
        const [result] = await connection.execute(statement,[content,momentId,userId,commentId])
        console.log(result)
        return result
    }
}
module.exports = new CommonService()