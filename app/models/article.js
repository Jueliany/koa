const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
class Article extends Model {
    //后台列表查询
    static async getArticleList(limit = 10,start = 1,state = -1,keyWord = ""){
        console.log(state)
        const article = await Article.findAndCountAll({
            where: {
                id : {
                    [Op.not]:0,
                },
                name: {
                    [Op.like]:'%' + keyWord + '%'
                },
                state: state != -1 ? state : {[Op.not]:2}
            },
            offset: (start - 1) * limit,
            limit
        })
        if(!article){
            throw new global.errs.NotFound('查询失败')
        }
        return article
    }
    //小程序列表查询
    static async getMiniArticleList(){
        const article = await Article.findAndCountAll({
            where: {
                state: 1
            },
            order:[['created_at', 'DESC']],
        })
        if(!article){
            throw new global.errs.NotFound('查询失败')
        }
        return article
    }
     //小程序详情
     static async findMiniArticle(id){
        const article = await Article.findOne({
            where:{
                id
            }
        })
        if(!article){
            throw new global.errs.NotFound('查询失败')
        }
        article.increment('look_number').then(function(user){
        })
        return article
    }
    

    //详情
    static async findArticle(id){
        const article = await Article.findOne({
            where:{
                id
            }
        })
        if(!article){
            throw new global.errs.NotFound('查询失败')
        }
        return article
    }
    //新增
    static async addArticle(data){
        const article = await Article.create(data)
        if(!article){
            throw new global.errs.AuthFailed('新增失败')
        }
        return article
    }
    //修改
    static async updateArticle(id,data){
        const article = await Article.update(data,{
            where:{
                id
            }
        })
        if(article[0] == 0){
            throw new global.errs.AuthFailed('修改失败')
        }
        return article
    }
    //删除
    static async deleteArticle(id){
        const article = await Article.destroy({
            where:{
                id
            }
        })
        if(!article){
            throw new global.errs.AuthFailed('删除失败')
        }
        return article
    }

}
Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    pic_url: Sequelize.STRING,
    detail: Sequelize.STRING,
    look_number: Sequelize.INTEGER,
    state: Sequelize.INTEGER,
},{
    sequelize:db,
    tableName: 'article'
})
module.exports = {
    Article    
}