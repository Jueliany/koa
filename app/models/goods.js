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
                category_id: categoryId > 0  ? categoryId : {
                    [Op.not]:1,
                },
                state: state >= 0 ? state : {
                    [Op.not]:2,
                }
            },
            offset: (start - 1) * limit,
            limit,
            include:[{
                model:Category,
                as: 'category'
            }]
        })
        if(!good){
            console.log('error')
        }
        return good
    }
    //xinzeng 
    static async addGood(data){
        const good = await Goods.create(data)
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
    state: Sequelize.INTEGER,
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