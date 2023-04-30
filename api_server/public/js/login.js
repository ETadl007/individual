function nextBtn() {
    let username = $("#username").val()
    let password = $("#password").val()
    if (username === '' || username === '' && password === '' || password === '') {
        alert("输入有误，请重新输入！")
    }else{
        $.ajax({
            method:'post',
            url:"http://127.0.0.1/api/login",
            data:{
                "username" : username,
                "password" : password
            },
            success:function(res){
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', res.username);
                alert("登录成功")
                location.href = '../page/index.html'
            }
        })
    }
}
