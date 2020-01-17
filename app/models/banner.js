const {Sequelize,Model,Op} = require('sequelize')
const {Goods} = require('./goods')
const {db} = require('../../core/db')
class Banner extends Model {
    //后台列表查询
    static async getBannerList(limit = 10,start = 1,state = -1,goods_id=-1,keyWord = ""){
        console.log(state)
        const banner = await Banner.findAndCountAll({
            where: {
                id : {
                    [Op.not]:0,
                },
                name: {
                    [Op.like]:'%' + keyWord + '%'
                },
                state: state != -1 ? state : {[Op.not]:2}
            },
            offset: (start - 1) * limit,
            limit,
            include:[{
                model:Goods,
                as: 'good'
            }]
        })
        if(!banner){
            throw new global.errs.NotFound('查询失败')
        }
        return banner
    }
    //详情
    static async findBanner(id){
        const banner = await Banner.findOne({
            where:{
                id
            }
        })
        if(!banner){
            throw new global.errs.NotFound('查询失败')
        }
        return banner
    }
    //新增
    static async addBanner(data){
        const banner = await Banner.create(data)
        if(!banner){
            throw new global.errs.AuthFailed('新增失败')
        }
        return banner
    }
    //修改
    static async updateBanner(id,data){
        const banner = await Banner.update(data,{
            where:{
                id
            }
        })
        if(banner[0] == 0){
            throw new global.errs.AuthFailed('修改失败')
        }
        return banner
    }
    //删除
    static async deleteBanner(id){
        const banner = await Banner.destroy({
            where:{
                id
            }
        })
        if(!banner){
            throw new global.errs.AuthFailed('删除失败')
        }
        return banner
    }

}
Banner.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    pic_url: Sequelize.STRING,
    goods_id: Sequelize.INTEGER,
    state: Sequelize.INTEGER,
},{
    sequelize:db,
    tableName: 'banner'
})
Banner.belongsTo(Goods, {as:'good',foreignKey: 'goods_id', targetKey: 'id'});
module.exports = {
    Banner    
}