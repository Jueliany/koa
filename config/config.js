module.exports = {
    environment: 'dev',
    database:{
        dbName:'czy',
        host:'127.0.0.1',
        port:3306,
        user:'july',
        password: '519200.'
    },
    security:{
        secretKey:'y51920j',
        expiresIn:60*60*24
    },
    wx:{
        appId:'wx61ff1358aeb3c755',
        appSecret:'c9af2b603d71c0ae4fbb5f5a24828971',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}