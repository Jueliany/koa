const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Goods} = require('../../models/goods')
const common = require('../../common/common')
const router = new Router({
    prefix:'/mini/goods'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.post('/list', async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.getGoodList(body.pageSize, body.pageNum, body.type, body.category, body.state, body.keyWord)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: good
    }
})

//分类商品
router.post('/catalogGoods', async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.getGoodList(20, body.pageNum, 1, body.category, 1,"")
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: good
    }
})
//热门商品
router.get('/hot', async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.getHotGoods()

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: good
    }
})
//精选商品
router.get('/choiceness', async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.getChoicenessGoods()

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: good
    }
})
module.exports = router