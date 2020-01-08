const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Goods} = require('../../models/goods')
const {Type} = require('../../models/type')
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
    // const good = await Goods.scope('bh').findAll({
    //     where: {
    //         type : [1,2]
    //     }
    // })
    const good = await Goods.getGoodList()
    console.log(good)
    // const TypeName = await Type.getType(good.type)
    // good.setDataValue('TypeName',TypeName.name)
    ctx.body = good
})

module.exports = router