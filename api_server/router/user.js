const express =  require('express')
const path =  require('path')
//创建路由对象
const router = express.Router()

//导入用户路由处理函数模块
const userHandler = require("../router_handler/user")
const dynsmics = require("../router_handler/dynsmics")
const essay = require("../router_handler/essay")
// 1. 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')

//注册新用户
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)
//登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)
//密码重置接口
router.post('/resetpwd',userHandler.resetpwd)
//动态的数据添加
router.post('/sendDynamics',dynsmics.senddy)
//动态的数据查询
router.get('/index.html',dynsmics.indexData)
router.get('/article',dynsmics.article)
//文章的查询接口
router.get('/essay',essay.ev_essay)
//将路由对象共享出去
module.exports = router