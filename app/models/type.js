const {Sequelize,Model} = require('sequelize')
const {db} = require('../../core/db')
class Type extends Model {
    static async getType(typeId){
        const type = await Type.findOne({
            where:{
                id:typeId
            }
        })
        return type
    }
}
Type.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
},{
    sequelize:db,
    tableName: 'type'
})
module.exports = {
    Type    
}