const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {Goods} = require('./goods')
const {User} = require('./user')
class Order extends Model {
    static async getOrderList(start = 1, limit = 10,glasses_id,order_number,order_state, product_type,aftersale_state){
        
        const orders = await Order.findAndCountAll({
            where: {
                order_number: {
                    [Op.like]:'%' + order_number + '%'
                },
                glasses_id: {
                    [Op.like]:'%' + glasses_id + '%'
                },
                order_state: order_state >= 0  ? order_state : {[Op.not]:-1,},
                product_type: product_type >= 0  ? product_type : {[Op.not]:-1,},
                aftersale_state: aftersale_state >= 0  ? aftersale_state : {[Op.not]:-1,},
            },
            offset: (start - 1) * limit,
            limit,
            include:[{
                model:Goods,
                as: 'glasses'
            },
            {
                model:Goods,
                as: 'lens'
            }]
        })
        if(!orders){
            throw new global.errs.NotFound('查询失败')
        }
        return orders
    }

    static async findOrder(id){
        const order = await Order.findOne({
            where:{
                id
            }
        })
        if(!order){
            throw new global.errs.NotFound('查询失败')
        }
        return order
    }

    //修改
    static async updateOrder(id,data){
        const order = await Order.update(data,{
            where:{
                id
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }
    //创建订单
    static async creatOrder(data){   
        const goods1 = await Goods.findGood(data.glasses_id)
        if(goods1.stock_number >= data.goods_number){
            let stock_number = goods1.stock_number - data.goods_number;
            let sold_number = goods1.sold_number + data.goods_number
            const goods2 = await Goods.updateGood(data.glasses_id,{stock_number, sold_number})
            const order = await Order.create(data)
            if(!order){
                throw new global.errs.AuthFailed('创建订单失败')
            } 
        }else{
            throw new global.errs.AuthFailed('商品数量不足')
        }
        
        
        return goods1
    }
    //小程序订单列表
    static async getMiniOrderList(order_state,user_id){
        const orders = await Order.findAll({
            where: {
                user_id,
                order_state: order_state >= 0  ? order_state : {[Op.not]:-1,},
            },
            order:[['created_at', 'DESC']],
            include:[{
                model:Goods,
                as: 'glasses'
            },
            {
                model:Goods,
                as: 'lens'
            }]
        })
        if(!orders){
            throw new global.errs.NotFound('查询失败')
        }

        return orders
    }

    //订单详情
    static async findOrder(id){
        const order = await Order.findOne({
            where:{
                id
            },
            include:[{
                model:Goods,
                as: 'glasses'
            },
            {
                model:Goods,
                as: 'lens'
            }]
        })
        if(!order){
            throw new global.errs.NotFound('查询失败')
        }
        return order
    }
    //付款
    static async payOrder(order_number,data){
        const order = await Order.update(data,{
            where:{
                order_number
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }
    //取消 
    static async cancelOrder(order_number){
        const order = await Order.update({order_state:4},{
            where:{
                order_number
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }
    //修改
    static async updateOrder(id,data){
        const order = await Order.update(data,{
            where:{
                id
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }

    //确认收货
    static async confirmOrder(order_number,data){
        const order = await Order.update(data,{
            where:{
                order_number
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }

    //修改状态
    static async updateMiniOrder(order_number,data){
        const order = await Order.update(data,{
            where:{
                order_number
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }
    //获取订单信息支付
    static async getBookingInfo(order_number){
        const order = await Order.findAll({
            where:{
                order_number
            },
            include:[{
                model:Goods,
                as: 'glasses'
            },
            {
                model:Goods,
                as: 'lens'
            }]
            
        })
        if(!order){
            throw new global.errs.NotFound('查询失败')
        }
        return order
    }


}
Order.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_number: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    glasses_id: Sequelize.INTEGER,
    lens_id: Sequelize.INTEGER,
    product_type: Sequelize.INTEGER,
    glasses_type: Sequelize.INTEGER,
    left_deg: Sequelize.DECIMAL,
    right_deg: Sequelize.DECIMAL,
    ipd: Sequelize.INTEGER,
    left_cylinder: Sequelize.DECIMAL,
    right_cylinder: Sequelize.DECIMAL,
    left_axis: Sequelize.DECIMAL,
    right_axis: Sequelize.DECIMAL,
    order_state: Sequelize.INTEGER,
    order_price: Sequelize.DECIMAL,
    goods_number: Sequelize.INTEGER,   
    order_remark: Sequelize.STRING,
    address:Sequelize.STRING,
    manname:Sequelize.STRING,
    phone:Sequelize.STRING,
    aftersale_state: Sequelize.INTEGER,
    evaluate_id: Sequelize.INTEGER,
    evaluate_datetime: Sequelize.DATE,
    express_number: Sequelize.STRING,
    aftersale_remark: Sequelize.STRING,
    aftersale_price: Sequelize.DECIMAL,
    aftersale_bcs: Sequelize.STRING,
    aftersale_express: Sequelize.STRING,
    aftersale_state: Sequelize.INTEGER,
    pay_datetime: Sequelize.DATE,
    get_datetime: Sequelize.DATE,
    send_datetime: Sequelize.DATE,
},{
    sequelize:db,
    tableName: 'order'
})
Order.belongsTo(User, {as:'user',foreignKey: 'user_id', targetKey: 'id'});
Order.belongsTo(Goods, {as:'glasses',foreignKey: 'glasses_id', targetKey: 'id'});
Order.belongsTo(Goods, {as:'lens',foreignKey: 'lens_id', targetKey: 'id'});
module.exports = {
    Order    
}