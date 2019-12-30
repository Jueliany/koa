const Router = require('koa-router')
const router = new Router();
const {PositveInterValidator} = require('../../validator/validator')

router.post('/v1/:id/goods/latest', (ctx,next)=>{
    const path = ctx.params;
    const query = ctx.request.query;;
    const header = ctx.request.header;
    const body = ctx.request.body;

    const v = new PositveInterValidator().validate(ctx)
    // if(true){
    //     const error = new global.errs.HttpException('为什么错误',550,404)
    //     throw error
    // }
    ctx.body = {
        key:111
    }
})

module.exports = router