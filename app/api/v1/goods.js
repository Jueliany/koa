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
    const body = ctx.request.body;
    const good = await Goods.getGoodList(body.pageSize, body.pageNum, body.type, body.category, body.state, body.keyWord)

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: good
    }
    
})

router.post('/add',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.addGood(body)
    ctx.body = {
        resultCode:0,
        resultMsg: '添加成功',
        data: good
    }
})

router.post('/find',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.findGood(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: good
    }
})

router.post('/update',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.updateGood(body.id,body.data)
    ctx.body = {
        resultCode:0,
        resultMsg: '修改成功',
        data: good
    }
})

router.post('/delete',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const good = await Goods.deleteGood(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: '删除成功',
        data: good
    }
})
module.exports = router