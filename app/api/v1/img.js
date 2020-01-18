const Router = require('koa-router')
const {PositveInterValidator} = require('../../validator/validator')
const {Goods} = require('../../models/goods')
const common = require('../../common/common')
var fs = require('fs')
const router = new Router({
    prefix:'/v1/img'
});
const {
    Auth
} = require('../../../middlewares/auth')

router.post('/upload', async (ctx,next)=>{
    const body = ctx.request.body;
    let imgData = body.base64;
    let fileType = imgData.split(";base64,")[0].split("image/")[1];
    //过滤data:URL
    let imgName = "pic"+(new Date()).valueOf();;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer.from(base64Data, 'base64');
    const img = await new Promise((resolve,reject)=>{ 
        fs.writeFile("./app/img/"+imgName+"."+fileType , dataBuffer, (err) => {
            if(err){
                reject(err)
            }else{
                let picUrl ='http://'+ ctx.request.header.host + '/v1/img/url/' +imgName + "."+fileType;
                resolve({picUrl})
            }
        });
    });
    if(img.picUrl){
        ctx.body = {
            resultCode:0,
            resultMsg: 'OK',
            url: img.picUrl
        }
    }
})

router.get('/url/:img', async (ctx,next)=>{
    const fileName = ctx.params.img   
    ctx.body = fs.createReadStream("./app/img/"+fileName);
})

module.exports = router