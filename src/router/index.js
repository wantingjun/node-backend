const fs =require('fs')
const useRoutes = (app) =>{
    fs.readdirSync(__dirname).forEach(file=>{  //读取当前文件所在的目录
        if(file ==='index.js'){ // 跳过当前文件
            return ;
        }
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods());

    })
}

module.exports = useRoutes