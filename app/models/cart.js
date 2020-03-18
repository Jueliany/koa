const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {Goods} = require('./goods')
const {User} = require('./user')
class Cart extends Model {
    //后台列表查询
    static async getCartList(user_id){
        const cart = await Cart.findAll({
            where: {
                user_id
            },
            include:[{
                model:Goods,
                as: 'goods'
            },{
                model:Goods,
                as: 'lens'
            }]
        })
        if(!cart){
            throw new global.errs.NotFound('查询失败')
        }
        return cart
    }
    static async getCount(user_id){
        const cart = await Cart.findAndCountAll({
            where: {
                user_id,
            },
            include:[{
                model:Goods,
                as: 'goods'
            }]
        })
        if(!cart){
            throw new global.errs.NotFound('查询失败')
        }
        return cart
         
    }
   
    //新增
    static async addCart(gid,lid, num, uid){
        const cart = await Cart.findOne({
            where: {
                user_id: uid,
                goods_id: gid,
                glass_id: lid,
            }
        })
        let data = {
            user_id: uid,
            number: num,
            glass_id: lid,
            goods_id: gid
        }
        if(!cart){
            console.log(1)
            const result = await Cart.create(data)
            if(!result){
                throw new global.errs.AuthFailed('加入失败')
            }
            return result
        }else{
            let id = cart.id;
            const result = await Cart.update({number:num},{
                where: {
                    id
                }
                
            })
            if(result[0] == 0){
                throw new global.errs.AuthFailed('加入失败')
            }
            return result
        }
        
    }
    //修改
    static async updateCart(id,data){
        const cart = await Cart.update(data,{
            where:{
                id
            }
        })
        if(cart[0] == 0){
            throw new global.errs.AuthFailed('修改失败')
        }
        return cart
    }
    //删除
    static async deleteCart(ids,uid){
        const cart = await Cart.destroy({
            where:{
                id:{[Op.in]:ids}
            }
        })
        if(!cart){
            throw new global.errs.AuthFailed('删除失败')
        }
        const list = await Cart.findAll({
            where: {
                user_id:uid
            },
            include:[{
                model:Goods,
                as: 'goods'
            },{
                model:Goods,
                as: 'lens'
            }]
        })
        if(!list){
            throw new global.errs.NotFound('查询失败')
        }
        return list
    }
    
}
Cart.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    goods_id: Sequelize.INTEGER,
    glass_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    number: Sequelize.INTEGER,
},{
    sequelize:db,
    tableName: 'cart'
})
Cart.belongsTo(Goods, {as:'goods',foreignKey: 'goods_id', targetKey: 'id'});
Cart.belongsTo(Goods, {as:'lens',foreignKey: 'glass_id', targetKey: 'id'});
Cart.belongsTo(User, {as:'user',foreignKey: 'user_id', targetKey: 'id'});
module.exports = {
    Cart    
}