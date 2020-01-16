const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {Goods} = require('./goods')
const {User} = require('./user')
const {Address} = require('./address')
class Order extends Model {
    static async getOrderList(start = 1, limit = 10,user_id,glasses_id,order_number,order_state, product_type,aftersale_state){
        
        const orders = await Order.findAndCountAll({
            where: {
                user_id: {
                    [Op.like]:'%' + user_id + '%'
                },
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
                model:Address,
                as: 'address'
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
}
Order.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order_number: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    address_id:Sequelize.INTEGER,
    glasses_id: Sequelize.INTEGER,
    sku_id: Sequelize.INTEGER,
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
    order_remark: Sequelize.STRING,
    aftersale_state: Sequelize.INTEGER,
    express_number: Sequelize.STRING,
    aftersale_remark: Sequelize.STRING,
    aftersale_price: Sequelize.DECIMAL,
    aftersale_bcs: Sequelize.STRING,
    aftersale_express: Sequelize.STRING,
    aftersale_state: Sequelize.INTEGER,
    pay_datetime: Sequelize.DATE,
    send_datetime: Sequelize.DATE,
},{
    sequelize:db,
    tableName: 'order'
})
Order.belongsTo(User, {as:'user',foreignKey: 'user_id', targetKey: 'id'});
Order.belongsTo(Address, {as:'address',foreignKey: 'address_id', targetKey: 'id'});
Order.belongsTo(Goods, {as:'glasses',foreignKey: 'glasses_id', targetKey: 'id'});
Order.belongsTo(Goods, {as:'lens',foreignKey: 'lens_id', targetKey: 'id'});
module.exports = {
    Order    
}