const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
class Category extends Model {
}
Category.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
},{
    sequelize:db,
    tableName: 'category'
})
module.exports = {
    Category    
}