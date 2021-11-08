const connection = require('../app/database')

class labelService {
    async create(name){ // 创建label
        const statement = `INSERT INTO label (name) VALUES (?);`
        const [result] = await connection.execute(statement,[name])
        return result

    }
    async getLabelByName(name){ // 查询数据库中，是否有name的label
        const statement = `SELECT * FROM label WHERE name = ?;`
        const [result] = await connection.execute(statement,[name]);
        return result[0]
    }
    async getLabels(limit,offset){
        const statement = `SELECT * FROM label LIMIT ?,?;`
        const [result] = await connection.execute(statement,[offset,limit]);
        return result
    }

}
module.exports = new labelService()