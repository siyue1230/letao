//这个JS功能，用于拦截未登录用户
$.ajax({
  type: 'get',
  url: '/employee/checkRootlogin',
  dataType: 'json',
  success: function(info){
    if(info.error === 400){
      location.href = "login.html";
    }
    if( info.success){
      console.log('当前用户已登录');
    }
  }
})