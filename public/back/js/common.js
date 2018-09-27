//实现进度条功能，使用NProgress插件

//开启进度条
// NProgress.start();

// //关闭进度条
// NProgress.done();

$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done();
})


//公共效果
$(function(){
  //1.二级菜单切换效果
  $('.lt_aside .category').click(function(){
    $('.lt_aside .child').stop().slideToggle();
  })

  //2.左侧菜单栏切换
  $('.icon_menu').click(function(){
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
  })

  $('.icon_logout').click(function(){
    $('#logoutModal').modal('show');
  })
  $('#logoutBtn').click(function(){
    $.ajax({
      type: 'get',
      url:'/employee/employeeLogout',
      dataType: 'json',
      success: function(info){
        if(info.success){
          location.href = "login.html";
        }
      }
    })
  })
  //4.登录拦截功能（如果当前用户没登录，需要拦截到登录页，前端不知道，后端知道，所以要发送请求获取用户登录状态）
  // $.ajax({
  //   type: 'get',
  //   url: '/employee/checkRootLogin',
  //   dataType: 'json',
  //   success:function(info){
  //     if(info.error === 400){
  //       location.href = "login.html";
  //     }
  //     // if(info.success){
  //     // 已登录，让用户继续访问即可
  //     // }
  //   }
  // })
})

