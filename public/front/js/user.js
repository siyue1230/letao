$(function(){
  $.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    dataType: 'json',
    success: function(info){
      if(info.error === 400){
        location.href = 'login.html';
      }else{
        var htmlStr = template('userTpl',info);
        $('#userInfo').html(htmlStr);
      }
    }
  })

  //2.退出功能
  $('#logout').click(function(){
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function(info){
        if( info.success ){
          location.href = 'login.html';
        }
      }
    })
  })
})