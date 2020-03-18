const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Order} = require('../../models/order')
const router = new Router({
    prefix:'/system/order'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.post('/list',new Auth(8).m, async (ctx,next)=>{
    const {
        aftersale_state,
        glasses_id,
        order_number,
        order_state,
        pageNum,
        pageSize,
        glasses_type,
    } = ctx.request.body;
    const orders = await Order.getOrderList(pageNum,pageSize,glasses_id,order_number,order_state, glasses_type,aftersale_state)

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: orders
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
    const order = await Order.findOrder(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})

router.post('/update',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const order = await Order.updateOrder(body.id,body.data)
    ctx.body = {
        resultCode:0,
        resultMsg: '修改成功',
        data: order
    }
})

module.exports = router