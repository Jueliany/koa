const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Goods} = require('../../models/goods')
const {Type} = require('../../models/type')
const common = require('../../common/common')
const router = new Router({
    prefix:'/v1/goods'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.post('/list',new Auth(8).m, async (ctx,next)=>{
    const body = common.switchBodytItem(ctx.request.body);
    const good = await Goods.getGoodList(body.pageSize, body.pageNum, body.type, body.category, body.state, body.keyWord)
    console.log(good.count)
    ctx.body = good
    
})

router.post('/add',new Auth(8).m, async (ctx,next)=>{
    const body = common.switchBodytItem(ctx.request.body);
    const good = await Goods.addGood(body)
    console.log(good.count)
    ctx.body = good
})
module.exports = router