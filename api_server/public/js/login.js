//判断手机号
function nextBtn() {
    let username = $("#user_s").val()
    let password = $("#user_pwd").val()
        $.ajax({
            method:'post',
            url:"http://127.0.0.1/api/reguser",
            data:{
                "username" : username,
                "password" : password
            },
            success:function(res){
              console.log(res)
            }
        })
}

