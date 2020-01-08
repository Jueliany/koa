const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {Type} = require('./type')
class Goods extends Model {
    static async getGoodList(){
        const good = await Goods.findAll({
            where: {
                type : {
                    [Op.not]:3
                }
            },
            include:[{
                model:Type,
                as:'typeName'
            }]
        })
        if(!good){
            console.log('error')
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
    name: Sequelize.STRING,
    type: Sequelize.INTEGER,
    url: Sequelize.STRING,
},{
    sequelize:db,
    tableName: 'goods'
})
Goods.belongsTo(Type, {as:'typeName',foreignKey: 'type', targetKey: 'id'});
module.exports = {
    Goods    
}