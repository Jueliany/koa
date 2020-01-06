const {Sequelize,Model} = require('sequelize')
const {db} = require('../../core/db')
class Goods extends Model {

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
module.exports = {
    Goods    
}