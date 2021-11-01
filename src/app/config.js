const dotenv = require('dotenv') // 将环境变量读进来
dotenv.config()
module.exports = {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD

}  =  process.env