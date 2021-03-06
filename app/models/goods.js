const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {Category} = require('./category')
class Goods extends Model {
    //后台列表查询
    static async getGoodList(limit = 10,start = 1,type = 1,categoryId = -1,state = -1,keyWord = ""){
        const good = await Goods.findAndCountAll({
            where: {
                id : {
                    [Op.not]:1,
                },
                name: {
                    [Op.like]:'%' + keyWord + '%'
                },
                type,
                category_id: categoryId > 0  ? categoryId : {[Op.not]:1,},
                state: state != -1 ? state : {[Op.not]:2}
            },
            offset: (start - 1) * limit,
            limit,
            include:[{
                model:Category,
                as: 'category'
            }]
        })
        if(!good){
            throw new global.errs.NotFound('查询失败')
        }
        return good
    }
    //获取商品下拉
    static async getGoodSelectList(){
        const good = await Goods.findAll({
            where: {
                id : {
                    [Op.not]:1,
                },
                type: 1,
                state: 1
            },
            attributes:['id','name']
        
        })
        if(!good){
            throw new global.errs.NotFound('查询失败')
        }
        return good
    }

    //获取商品详情
    static async findGood(id){
        const good = await Goods.findOne({
            where:{
                id
            },
            attributes:['name','type','category_id','price','stock_number','sold_number','state','brief','detail','url',]
        })
        if(!good){
            throw new global.errs.NotFound('查询失败')
        }
        return good
    }
    //小程序获取商品详情
    static async findMiniGood(id){
        const good = await Goods.findOne({
            where:{
                id
            },
         })
        if(!good){
            throw new global.errs.NotFound('查询失败')
        }
        good.increment('look_number').then(function(user){
        console.log('success');
        })
        return good
    }
    //新增
    static async addGood(data){
        const good = await Goods.create(data)
        if(!good){
            throw new global.errs.AuthFailed('新增失败')
        }
        return good
    }
    //修改
    static async updateGood(id,data){
        const good = await Goods.update(data,{
            where:{
                id
            }
        })
        if(good[0] == 0){
            throw new global.errs.AuthFailed('修改失败')
        }
        return good
    }
    //删除
    static async deleteGood(id){
        const good = await Goods.destroy({
            where:{
                id
            }
        })
        if(!good){
            throw new global.errs.AuthFailed('删除失败')
        }
        return good
    }
    
    //获取热门商品
    static async getHotGoods(){
        const good = await Goods.findAll({
            where:{
                type:1
            },
            limit:8,
            order:[['sold_number', 'DESC']]
        })
        if(!good){
            throw new global.errs.NotFound('查询失败')
        }
        return good
    }
    
    //获取下单商品
    static async getBookingGoodList(gid,lid){
        const goods = await Goods.findOne({
            where: {
                id : gid,
                state: 1
            },
            attributes:['id','name','price','category_id','stock_number','url']
    
        })
        let glass = 0;
        if(lid != 1){
            glass = await Goods.findOne({
                where: {
                    id : lid,
                    state: 1
                },
                attributes:['id','name','price','category_id','stock_number','url']    
            })
        }
        
        if(!goods){
            throw new global.errs.NotFound('查询失败')
        }
        let info = {goods,glass}
        return info
    }

    //获取推荐商品
    static async getRecommendGoods(category_id){
        const good = await Goods.findAll({
            where:{
                category_id,
                type:1
            },
            limit:2,
            order:[['sold_number', 'DESC']]
        })
        if(!good){
            throw new global.errs.NotFound('查询失败')
        }
        return good
    }
    


}
Goods.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: Sequelize.INTEGER,
    name: Sequelize.STRING,
    category_id: Sequelize.INTEGER,
    stock_number: Sequelize.INTEGER,
    look_number: Sequelize.INTEGER,
    state: Sequelize.INTEGER,
    choiceness: Sequelize.INTEGER,
    sold_number: Sequelize.INTEGER,
    brief: Sequelize.STRING,
    detail: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    url: Sequelize.STRING,
},{
    sequelize:db,
    tableName: 'goods'
})
Goods.belongsTo(Category, {as:'category',foreignKey: 'category_id', targetKey: 'id'});
module.exports = {
    Goods    
}