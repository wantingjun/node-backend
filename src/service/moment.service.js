const connection = require("../app/database")

class momentService {

    async create(userId,content){
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
        const [result] =await connection.execute(statement,[content,userId])
        return result;
    }
}

module.exports = new momentService()