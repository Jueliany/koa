const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const {User} = require('../../models/user')
const {success} = require('../../lib/helper')

const {RegisterValidator} = require('../../validator/validator')
const router = new Router({
    prefix:'/system/user'
});
router.post('/register',async (ctx)=>{
        const v = await new RegisterValidator().validate(ctx)
        const user = {
            email:v.get('body.email'),
            password:v.get('body.password2'),
            nickname:v.get('body.nickname')
        }
        await User.create(user)
        success()
})

router.get('/list',async (ctx)=>{
    const v = await User.getAdminList();
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: v
    }
})
router.post('/update',async (ctx)=>{
    const body = ctx.request.body;
    const v = await User.updateUser(body.id,body.data);
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: v
    }
})
router.post('/add', async (ctx,next)=>{
    const body = ctx.request.body;
    const u = await User.addUser(body)
    ctx.body = {
        resultCode:0,
        resultMsg: '添加成功',
        data: u
    }
})
module.exports = router