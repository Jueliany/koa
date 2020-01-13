const {Sequelize,Model,Op} = require('sequelize')
const {db} = require('../../core/db')
const {User} = require('./user')
class Address extends Model {
    static async getType(typeId){
        const type = await Address.findOne({
            where:{
                id:typeId
            }
        })
        return type
    }

    static async getTypeList(typeIdList){
        const types = await Address.findAll({
            where:{
                id: {
                    [Op.in]:typeIdList
                }
            }
        })
        return types
    }
}
Address.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    user_id: Sequelize.INTEGER,
    people_name: Sequelize.STRING,
    province_id: Sequelize.INTEGER,
    city_id: Sequelize.INTEGER,
    area_id: Sequelize.INTEGER,
    detailed_address: Sequelize.STRING,
    detail: Sequelize.STRING,
    phone_number: Sequelize.STRING,
},{
    sequelize:db,
    tableName: 'address'
})
Address.belongsTo(User, {as:'categoryName',foreignKey: 'user_id', targetKey: 'id'});
module.exports = {
    Address    
}