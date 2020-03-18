const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Order} = require('../../models/order')
const common = require('../../common/common')
const router = new Router({
    prefix:'/mini/order'
});
const {
    Auth
} = require('../../../middlewares/auth')
//订单列表
router.post('/list', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const order = await Order.getMiniOrderList(body.state, ctx.auth.uid)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})

//付款

router.post('/pay', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    let now = Date.now();
    const order = await Order.payOrder(body.ordernum,{order_state:1,pay_datetime:now})
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})



//取消订单
router.post('/cancel', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    let now = Date.now();
    const order = await Order.cancelOrder(body.ordernum)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})

//获取订单下单信息
router.post('/bookingInfo', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const order = await Order.getBookingInfo(body.ordernum)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})
//获取订单详情
router.post('/info', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const order = await Order.getBookingInfo(body.ordernum)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})


//创建订单
router.post('/creat',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    let order = {};
    let order_number = tradeNo()
    let data = body;
    data.order_number = order_number;
    data.user_id = ctx.auth.uid;
    order = await Order.creatOrder(data)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        order_number
    }
})
//确认收货
router.post('/confirm', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    let now = Date.now();
    const order = await Order.confirmOrder(body.ordernum,{order_state:3,get_datetime:now})
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})
//申请退款
router.post('/refundOrder', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    let now = Date.now();
    const order = await Order.updateMiniOrder(body.ordernum,body.data)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})
//取消退款
router.post('/cancelRefund', new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    let now = Date.now();
    const order = await Order.updateMiniOrder(body.ordernum,{aftersale_state:5})
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: order
    }
})



const tradeNo = function () {
    const now = new Date()
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    String(month).length < 2 ? (month = Number("0" + month)) : month;
    String(day).length < 2 ? (day = Number("0" + day)) : day;
    String(hour).length < 2 ? (hour = Number("0" + hour)) : hour;
    String(minutes).length < 2 ? (minutes = Number("0" + minutes)) : minutes;
    String(seconds).length < 2 ? (seconds = Number("0" + seconds)) : seconds;
    const yyyyMMddHHmmss = `${year}${month}${day}${hour}${minutes}${seconds}`;
    return "GS" + yyyyMMddHHmmss  + Math.random().toString().substr(2, 5);
  };
module.exports = router