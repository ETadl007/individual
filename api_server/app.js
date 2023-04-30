//导入 express 模块
const express = require('express')
// 导入配置文件
const config = require('./router_handler/config')
const path = require('path')
//创建 express 的服务器实例
const app = express()

//导入 cors 的中间件
const cors = require('cors')

//将 cors 注册为全局中间件
app.use(cors())

//解析表单数据的中间件
app.use(express.urlencoded({extended:false}))
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (err, status = 1) {
      res.send({
        // 状态
        status,
        // 状态描述，判断 err 是 错误对象 还是 字符串
        message: err instanceof Error ? err.message : err,
      })
    }
    next()
  })

// 解析 token 的中间件
const expressJWT = require('express-jwt')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))


// 响应数据的中间件
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})
// 错误中间件
app.use(function (err, req, res, next) {
    // 省略其它代码...
  
    // 捕获身份认证失败的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  
    // 未知错误...
  })

//导入注册用户模块
const userRouter = require('./router/user')
const bodyParser = require('body-parser')
app.use('/api',userRouter)

//调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80,()=>{
    console.log("api seever 跑起来了 http://127.0.0.1")
})