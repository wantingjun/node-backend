const connection = require('../app/database') // promise的形式
class UserService {
    async create(user){
        const {name,password}=user
       const statement =`INSERT INTO user (name,password) VALUES (?,?);`
       const result = await connection.execute(statement,[name,password]) 
        return result[0]
    }

    async getUserByName(name){
        const statement=`SELECT *FROM user WHERE name =?;`;
        const result = await connection.execute(statement,[name]);
        // console.log(result)
        return result[0]; // result[0]是得到的用户
    }
    async updateAvatarUrlById(avatarUrl,userId){ // user表里添加图像url
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`
        const [result] = await connection.execute(statement,[avatarUrl,userId])
        return result;
    }
}
module.exports = new UserService()