// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')

// 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 向外共享路由对象
module.exports = router
