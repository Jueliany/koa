const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {Goods} = require('./goods')
const {User} = require('./user')
const {Address} = require('./address')
class Order extends Model {
    static async getType(typeId){
        const type = await Order.findOne({
            where:{
                id:typeId
            }
        })
        return type
    }

    static async getTypeList(typeIdList){
        const types = await Order.findAll({
            where:{
                id: {
                    [Op.in]:typeIdList
                }
            }
        })


        return types
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
    aftersale_state: Sequelize.INTEGER,
    order_price: Sequelize.DECIMAL,
    express_number: Sequelize.STRING,
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