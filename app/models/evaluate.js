const {Sequelize,Model,Op} = require('sequelize')
const {Goods} = require('./goods')
const {User} = require('./user')
const {Order} = require('./order')
const {db} = require('../../core/db')
class Evaluate extends Model {
    //后台列表查询
    static async getEvaluateList(goods_id=-1){
        const evaluate = await Evaluate.findAndCountAll({
            where: {
                goods_id,
            },
            order: [['created_at', 'DESC']],
            include:[{
                model:Goods,
                as: 'good'
            },{
                model:User,
                as: 'user'
            }]
        })
        if(!evaluate){
            throw new global.errs.NotFound('查询失败')
        }
        return evaluate
    }
    //详情
    static async findEvaluate(id){
        const evaluate = await Evaluate.findOne({
            where:{
                id
            }
        })
        if(!evaluate){
            throw new global.errs.NotFound('查询失败')
        }
        return evaluate
    }
    //新增
    static async creatEvaluate(data){
        const evaluate = await Evaluate.create(data)
        if(!evaluate){
            throw new global.errs.AuthFailed('新增失败')
        }
        
        let now = Date.now();
        console.log(data)
        const order = await Order.update({evaluate_id:evaluate.id,evaluate_datetime:now},{
            where:{
                id: data.order_id
            }
        })
        if(order[0] == 0){
            throw new global.errs.AuthFailed('失败')
        }
        return order
    }
    //修改
    static async updateEvaluate(id,data){
        const evaluate = await Evaluate.update(data,{
            where:{
                id
            }
        })
        if(evaluate[0] == 0){
            throw new global.errs.AuthFailed('修改失败')
        }
        return evaluate
    }
    //删除
    static async deleteEvaluate(id){
        const evaluate = await Evaluate.destroy({
            where:{
                id
            }
        })
        if(!evaluate){
            throw new global.errs.AuthFailed('删除失败')
        }
        return evaluate
    }

}
Evaluate.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    evaluate: Sequelize.STRING,
    point: Sequelize.INTEGER,
    goods_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    order_id: Sequelize.INTEGER,
},{
    sequelize:db,
    tableName: 'evaluate'
})
Evaluate.belongsTo(Goods, {as:'good',foreignKey: 'goods_id', targetKey: 'id'});
Evaluate.belongsTo(User, {as:'user',foreignKey: 'user_id', targetKey: 'id'});
module.exports = {
    Evaluate    
}