const service = require("../service/label.service")

class labelController{
    async create(ctx,next){
        const {name} = ctx.request.body;
        const result = await service.create(name)
        ctx.body = result;

    }

}

module.exports = new labelController()