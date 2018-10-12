$(function(){
  function render(){

    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success: function(info){
        if(info.error === 400){
          location.href = 'login.html';
        }else{
          var htmlStr = template('tpl', {list:info});
          $('.lt_main .mui-scroll').html(htmlStr);
          mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
        }
      }
    })
  }

  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto: true,
        callback :function(){
          render();
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
})