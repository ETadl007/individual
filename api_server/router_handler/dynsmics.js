const db = require('../db/index')
const fs = require('fs')
//文章管理
exports.senddy = (req, res) =>{
    let a = ''
    //获取表单的数据
    const userinfo = req.body
    // 定义sql语句
    const select = 'select * from sdynamics where dynamics=?'
    db.query(select, [userinfo.username], (err,results)=>{
        const inserts = 'insert into sdynamics(dynamics) values(?)'
        db.query(inserts, userinfo.username, (err, results)=>{
            if(err) res.cc(err) 
            return res.send("发送成功！！")
        })
    })
}

exports.indexData = (req, res) =>{
//查询语句
const select = 'select * from sdynamics'
db.query(select, (err,results) =>{
    if (err) res.cc(err)
    //查询到的数据返回给前台
    return res.send(results)
})
}   

exports.article = (req, res) =>{
    //查询语句
    const select = 'select * from article order by id desc limit 6'
    db.query(select, (err,results) =>{
        if (err) res.cc(err)
        //查询到的数据返回给前台
        return res.send(results)
    })
}  