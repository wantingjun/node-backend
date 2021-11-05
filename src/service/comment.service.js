const connection = require('../app/database')
class CommonService{
    async create(momentId,content,userId){
        console.log(momentId,content,userId)
        const statement = `INSERT INTO comment (content, moment_id,user_id) VALUES (?,?,?);`
        const [result] = await connection.execute(statement,[content,momentId,userId])
        return result
    }
}
module.exports = new CommonService()