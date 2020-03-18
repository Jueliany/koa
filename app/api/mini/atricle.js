const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Article} = require('../../models/article')
const common = require('../../common/common')
const router = new Router({
    prefix:'/mini/article'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.get('/list', async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.getMiniArticleList()

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: article
    }
})

router.post('/find', async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.findMiniArticle(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: article
    }
})

module.exports = router