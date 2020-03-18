//导入模块
const Koa = require('koa');
const parser = require('koa-bodyparser');
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
require('./app/models/article')
// 实例化koa对象
const app = new Koa();
app.use(async (ctx, next)=> {//配置跨域 允许任何来源请求
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
  });
app.use(catchError) //异常处理
app.use(parser({ //设置上传文件大小大小为5M
  formLimit:"5mb",
  jsonLimit:"5mb",
  textLimit:"5mb",
  enableTypes: ['json', 'form', 'text']
})) 
InitManager.initCore(app);//初始化对象
app.listen(3000)//监听3000端口
console.log('app is starting !')