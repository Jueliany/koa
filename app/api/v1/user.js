const Router = require('koa-router')
const {User} = require('../../models/user')
const {RegisterValidator} = require('../../validator/validator')
const router = new Router({
    prefix:'/v1/user'
});
router.post('/register',async (ctx)=>{
        const v = new RegisterValidator().validate(ctx)
        const user = {
            email:v.get('body.email'),
            password:v.get('body.password2'),
            nickname:v.get('body.nickname')
        }
        user.create(user)
})
module.exports = router