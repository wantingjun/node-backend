const connection = require("../app/database")
const sqlFragment = `
SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
    JSON_OBJECT('id',u.id,'name',u.name) user
FROM moment m 
LEFT JOIN user u ON m.user_id = u.id
`
class momentService {

    async create(userId,content){
        const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`
        const [result] =await connection.execute(statement,[content,userId])
        return result;
    }

    async getMomentById(id){
        const statement = `${sqlFragment} WHERE m.id= ?;`
        const [result] =await connection.execute(statement,[id])
        return result;

    }
    async getMomentList(offset,size){ // 获取动态的数据库列表
       const statement = `${sqlFragment} LIMIT ?,?;`
       const [result] =await connection.execute(statement,[offset,size])
       return result;
    }
    async update(content,momentId){ // 对数据库进行修改 
        const statement = `UPDATE moment SET content =? WHERE id = ?;`
        const [result] = await connection.execute(statement,[content,momentId])
        return result;
    }
}

module.exports = new momentService()