//判断用户密码是否正确
function nextBtn(){
    let username =$("#username").val()
    let password =$("#password").val()
    $.ajax({
        method:'post',
        url:"http://127.0.0.1/api/login",
        data:{
            "username" : username,
            "password" : password,
        },
        success:function(res){
            // window.location.href = './index.html'
            // alert('登录成功')
            
            // setInterval(showTime, 1000);
            console.log(res)
        }
    })
}
