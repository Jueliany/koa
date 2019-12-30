const {HttpException} = require('../core/http-exception')
const catchError = async (ctx, next)=>{
    try {
        await next()
    } catch (error) {
        const isHttpException = error instanceof HttpException
        const isDev = global.config.environment === 'dev'
        if(!isHttpException && isDev){
            throw error
        }
        if(isHttpException){
            ctx.body = {
                msg:error.msg,
                erroe_code:error.errorCode,
                request : `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        }else{
            ctx.body = {
                msg: 'we make a mistake',
                error_code: 999,
                request : `${ctx.method} ${ctx.path}`
            }
            ctx.status = 502
        }
        
    }
}
module.exports = catchError