let scrollFunc = function (e) {
    let nav = document.getElementById('header');

    e = e || window.event;
    if (e.wheelDelta) {  
        //判断浏览器IE，谷歌滑轮事件             
        if (e.wheelDelta > 0) { 
            //当滑轮向上滚动时
            nav.style.position = "fixed";
        }
        if (e.wheelDelta < 0) { 
            //当滑轮向下滚动时
            nav.style.position = "absolute";
        }
    } else if (e.detail) {  
        //Firefox滑轮事件
        if (e.detail < 0) { 
            //当滑轮向上滚动时
            nav.style.position = "fixed";
        }
        if (e.detail > 0) { 
            //当滑轮向下滚动时
            nav.style.position = "absolute";
        }
    }
}
document.addEventListener('DOMMouseScroll', scrollFunc, false);
document.onmousewheel = scrollFunc; 

function btns() {
    let username = $("#dybtn").val()
    if (username === '' || username === null) {
        alert("发送失败！")
    }else{
        $.ajax({
            method:'post',
            url:"http://127.0.0.1/api/sendDynamics",
            data:{
                username: username
            },
            success:function(res){
               alert(res)
                location.href = "../page/index.html"
            }

        })
    }
}

//右侧的动态
$(function(){
    $.ajax({
    method:'get',
    url:"http://127.0.0.1/api/index.html",
    success:function(res){
        let data = ''
        let box = ''
        let date = new Date();
        let month = date.getMonth()+1;           
        for (let i = 0; i < res.length; i++) {
            data += '<li class="pl-1"><a href="javascript:;" style="float:left">' + res[i]["dynamics"] + 
            '</a>' + '<span style="float:right" class="pr-1">' + 
            date.getFullYear() + '-' + month + '-'+ date.getDate() + ' ' + date.getHours() + ':'  + date.getMinutes() + '</span></li>';
            $('.data').html(data) 
        }
    }
    })
})

//左侧的动态
$(function(){
    $.ajax({
    method:'get',
    url:"http://127.0.0.1/api/article",
    success:function(res){
        let data = ''
        for (let i = 0; i < res.length; i++) {
            data += '<div class="flex-item"><p class="pt-2 pl-1">' + res[i]["ev_article"] + '</p></div>';
            $('.flex-row').html(data)
        }
    }
    })
})
//文章
$(function(){
    $.ajax({
    method:'get',
    url:"http://127.0.0.1/api/essay",
    success:function(res){
        let data = ''
        let datas = ''
        for (let i = 0; i < res.length; i++) {
            if (res[i] === res[0]) {
                data += '<p class="item-essay">' + res[i]["essay"] + '</p>';
                $('.ev-essay').html(data)
            }
            if (res[i] === res[1]) {
                datas += '<p class="item-essay">' + res[i]["essay"] + '</p>';
                $('.evtow-essay').html(datas)
            }
            const date = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
            localStorage.setItem('date', JSON.stringify(date))
            const postDate = JSON.parse(window.localStorage.getItem('date'))
            $('.essay-date').html(postDate)
        }
    }
    })
})


 $(function(){
    const name = localStorage.getItem('username')
    if(!name){
        $('.nameout').hide()
        $('.loginSegister').show()
        $('.logout').hide()
        $('html').hide()

        // let a = confirm("非法登录，请登录后再试！！")
        // if (a === true) {
        //     location.href = '../page/login.html'
        // }else{
            // location.href = '../../../index.html'
        // }
        
    }else{
        $('.loginSegister').hide()
        $('.name_val').html("欢迎  " + name)
    }
    
})

$('.logout').click(function(){
    $('.nameout').hide()
    location.href = '../page/login.html'
    localStorage.removeItem('username')
    $('.loginSegister').show()
    $('.logout').hide()
})

