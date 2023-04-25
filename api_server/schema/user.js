const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */

//用户名注册规则
const username = joi.string().alphanum().min(1).max(10).required()
//密码注册规则
const password = joi.string().pattern(/^[\S]{1,12}$/).required()

exports.reg_login_schema = {
    // 表示需要对 req.body 中的数据进行验证
    body: {
      username,
      password,
    },
  }
