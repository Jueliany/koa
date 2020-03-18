module.exports = {
    environment: 'dev',
    database:{//数据库连接信息
        dbName:'eyeglasses',
        host:'120.27.237.29',
        port:3306,
        user:'eyeglasses',
        password: '519200.'
    },
    security:{//token令牌加密，时间
        secretKey:'y51920j',
        expiresIn:60*60*24
    },
    wx:{//微信小程序appid appSecret 获取用户信息地址
        appId:'wx61ff1358aeb3c755',
        appSecret:'c9af2b603d71c0ae4fbb5f5a24828971',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}