const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Article} = require('../../models/article')
const common = require('../../common/common')
const router = new Router({
    prefix:'/system/article'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.post('/list',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.getArticleList(body.pageSize, body.pageNum, body.state,body.keyWord)

    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: article
    }
})

router.post('/add',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.addArticle(body)
    ctx.body = {
        resultCode:0,
        resultMsg: '添加成功',
        data: article
    }
})

router.post('/find',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.findArticle(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: 'OK',
        data: article
    }
})

router.post('/update',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.updateArticle(body.id,body.data)
    ctx.body = {
        resultCode:0,
        resultMsg: '修改成功',
        data: article
    }
})

router.post('/delete',new Auth(8).m, async (ctx,next)=>{
    const body = ctx.request.body;
    const article = await Article.deleteArticle(body.id)
    ctx.body = {
        resultCode:0,
        resultMsg: '删除成功',
        data: article
    }
})
module.exports = router