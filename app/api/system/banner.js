const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Banner} = require('../../models/banner')
const common = require('../../common/common')
const router = new Router({
    prefix:'/system/banner'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.post('/list',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const banner = await Banner.getBannerList(body.pageSize, body.pageNum, body.state, body.goods_id,body.keyWord)

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: banner
    }
})

router.get('/mini/list', async (ctx,next)=>{
    const body = ctx.request.body;
    const banner = await Banner.getBannerList(100, 1, 1)

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: banner
    }
})

router.post('/add',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const banner = await Banner.addBanner(body)
    ctx.body = {
        resultCode:0,
        resultMsg: '添加成功',
        data: banner
    }
})

router.post('/find',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const banner = await Banner.findBanner(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: banner
    }
})

router.post('/update',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const banner = await Banner.updateBanner(body.id,body.data)
    ctx.body = {
        resultCode:0,
        resultMsg: '修改成功',
        data: banner
    }
})

router.post('/delete',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const banner = await Banner.deleteBanner(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: '删除成功',
        data: banner
    }
})
module.exports = router