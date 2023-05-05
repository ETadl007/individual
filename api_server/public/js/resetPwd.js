function nextBtn() {
    let username = $("#user_s").val()
    let password = $("#user_pwd").val()
    if (username === '' || username === null || password === '' || password === null) {
        alert("请重新输入")
    }else{
        $.ajax({
            method:'post',
            url:"http://127.0.0.1/api/resetpwd",
            data:{
                "username" : username,
                "password" : password
            },
            success:function(res){
                alert(res.message)
            }
        })
    }

}