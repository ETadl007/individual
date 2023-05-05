function nextBtn() {
    let username = $("#user_s").val()
    let password = $("#user_pwd").val()
    if (username === '' || username === '' && password === '' || password === '') {
        alert("输入有误，请重新输入！")
    }else{
        $.ajax({
            method:'post',
            url:"http://127.0.0.1/api/reguser",
            data:{
                "username" : username,
                "password" : password
            },
            success:function(res){
                if(res.status === 0){
                    alert(res.message)
                    location.href = '../page/login.html'
                }else{
                    alert(res.message)
                }
                
            }
        })
    }

}

