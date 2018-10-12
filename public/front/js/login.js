$(function(){
  //登录操作
  //(1) 给登录按钮添加点击事件
  //(2) 获取用户名和密码
  //(3) 发送请求，进行登录
  $('#loginBtn').click(function(){
    var username = $('#username').val();
    var password = $('#password').val();
    if(username.trim() === ''){
      mui.toast('请输入用户名');
      return;
    }
    if(password.trim() === ''){
      mui.toast('请输入用户名');
      return;
    }
    $.ajax({
      type: 'post',
      url:'/user/login',
      data:{
        username: username,
        password: password
      },
      dataType: 'json',
      success: function(info){
        if(info.error === 403){
          mui.toast('用户名或者密码错误');
          return;
        }
        if(location.search.indexOf('retUrl') != -1){
          location.href = location.search.replace('?retUrl=','');
        }else{
          location.href = 'user.html';
        }
      }
    })
  })
})