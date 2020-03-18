
const bcrypt = require('bcryptjs')
const {Sequelize,Model} = require('sequelize')
const {db} = require('../../core/db')
class User extends Model {
    //邮箱登录
    static async verifyRmailPassword(email, plainPassword){
        const user = await User.findOne({
            where:{
                email,
            }
        })
        if(!user){
            throw new global.errs.NotFound('邮箱不存在')
        }
        if(!user.state){
            throw new global.errs.NotFound('帐号已经停用')
        }
        const correct = bcrypt.compareSync(
            plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }
    static async verifyUserPassword(nickname, plainPassword){
        const user = await User.findOne({
            where:{
                nickname
            }
        })
        if(!user){
            throw new global.errs.NotFound('帐号不存在')
        }
        if(!user.state){
            throw new global.errs.NotFound('帐号已经停用')
        }
        const correct = bcrypt.compareSync(
            plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }
    static async getUserByOpenid(openid){
        const user = await User.findOne({
            where:{
                openid
            }
        })
        return user
    }
    static async registerByOpenid(openid) {
        return await User.create({
            type: 0,
            openid
        })
    }
    static async getAdminList() {
        const user = await User.findAndCountAll({
            where:{
                type:1,
            }
        })
        
        return user
    }
    //新增
    static async addUser(data){
        let nickname = data.nickname;
        const user1 = await User.findOne({
            where:{
                nickname
            }
        })
        if(user1){
            throw new global.errs.NotFound('帐号已存在')
        }
        const user = await User.create(data)
        if(!user){
            throw new global.errs.AuthFailed('新增失败')
        }
        return user
    }
    static async updateUser (id,data){
        const user = await User.update(data,{
            where:{
                id
            }
        })
        if(user[0] == 0){
            throw new global.errs.AuthFailed('修改失败')
        }
        return user
    }
}
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    state: Sequelize.INTEGER,
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }
    },
    type:Sequelize.INTEGER,
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize:db,
    tableName:'user'
})
module.exports = {User}