const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const router = new Router({
    prefix:'/v1/goods'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.get('/list',new Auth(8).m, async (ctx,next)=>{
    const path = ctx.params;
    const query = ctx.request.query;;
    const header = ctx.request.header;
    const body = ctx.request.body;
    console.log(52220)

    // const v = new PositveInterValidator().validate(ctx)
    console.log(52220)
    ctx.body = {
        key:111
    }
})

module.exports = router