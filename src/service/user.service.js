class UserService {
    async create(user){
        console.log("用户数据保存到数据库：",user)
        return "创建用户成功"
    }
}
module.exports = new UserService()