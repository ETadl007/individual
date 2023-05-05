//导入数据库操作模块
const db = require('../db/index')
//用这个包生成token字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('./config')
//导入 bcryptjs 
const bcrypt = require('bcryptjs')

//注册用户的处理函数
exports.regUser = (req, res) =>{
    //获取客户端用户信息
    const userinfo = req.body
    //对表单的数据进行效验
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不能为空！')
    }
    //查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, [userinfo.username], (err,results)=>{
        //执行 sql 语句失败
        if(err){
            return res.cc({status:1, message:err.message})
        } 
        if(results.length > 0){
            return res.cc('用户名被占用，请更换其他用户名')
        }
        //调用bcrypt对密码加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into ev_users set ?'
        //插入新用户
        db.query(sql, {username:userinfo.username,password:userinfo.password}, (err,results)=>{
            //执行 sql 语句失败
            if(err) {
                return res.cc({status:1, message:err.message})
            }
            //sql 语句执行成功，但不影响行数
            if(results.affectedRows !== 1){
                return res.cc('注册用户失败，请稍后再试！')
            }
            //注册成功
            return res.send({status:0,message:'注册成功'})
        })
    })
}

//登录的处理函数
exports.login = (req, res) =>{
    //接收表单数据
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, (err,results) =>{
        //执行sql 语句
        if(err) res.cc(err)
        //执行 sql 语句成功，但是查询数据条不等于1
        if(results.length !== 1) return res.cc('用户名或密码错误')
        //拿着用户输入的密码，和数据库的密码进行对比
        const comparRrsults = bcrypt.compareSync(userinfo.password ,results[0].password)
        //如果对比的结果等于 false ，则证明用户输入的密码错误
        if(!comparRrsults){
            return res.cc('登录失败')
        }
        // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
        const user = { ...results[0], password: '', user_pic: '' }
        // 生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token:  tokenStr,
            username:userinfo.username
          })
    })
}

exports.resetpwd = (req, res) =>{
    //接收表单数据
    const userinfo = req.body
    const select = 'select * from ev_users where username=?'
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    db.query(select, [userinfo.username], (err,results)=>{
        if(err){
            return res.cc({status:1, message:err.message})
        }
        if(results.length > 0){
            const update =  `update ev_users set password=? where username='${userinfo.username}'`
            db.query(update, [userinfo.password], (err,results)=>{
                return res.cc('重置成功')
            })
        }else{
            return res.cc('用户名不存在')
        }
    })
}