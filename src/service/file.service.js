const connection = require('../app/database')
class fileService{
    async createAvatar(filename,mimetype,size,userId){ // 创建头像，保存图片信息到数据库
        const statement = `INSERT INTO avatar (filename, mimetype,size,user_id) VALUES (?,?,?,?);`
        const [result] = await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }

}

module.exports = new fileService()