const db = require('../db/index')
exports.ev_essay = (req, res) =>{
    //查询语句
    const select = 'select * from ev_essay order by id desc limit 2'
    db.query(select, (err,results) =>{
        if (err) res.cc(err)
        //查询到的数据返回给前台
        return res.send(results)
    })
}
