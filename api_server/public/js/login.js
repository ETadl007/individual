function nextBtn() {
    let username = $("#username").val()
    let password = $("#password").val()
    if (username === '' || username === '' && password === '' || password === '') {
        alert("输入有误，请重新输入！")
    }
    else{
        $.ajax({
            method:'post',
            url:"http://127.0.0.1/api/login",
            data:{
                "username" : username,
                "password" : password
            },
            success:function(res){
                if (res.status === 0) {
                    alert("登录成功")
                    localStorage.setItem('username', res.username);
                    location.href = '../page/index.html'
                }else{
                    alert(res.message)
                    $("#password").val('')
                }

            }
        })
    }
}
