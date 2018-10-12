$(function(){
  var key = getSearch('key');
  //功能1.将搜索关键字，设置给input
  $('.search_input').val(key);

  render();
  function render(){

    //清空原有数据，显示成loading效果
    $('.lt_product').html('<div class="loading"></div>');
    var params = {};
    params.proName = $('.search_input').val();
    params.page = 1;
    params.pageSize = 100;
    var $current = $('.lt_sort a.current');
    if($current.length > 0){
      var sortName = $current.data('type');
      var sortValue = $current.find('i').hasClass('fa-angel-down') ? 2 : 1;
      params[sortName] = sortValue;
    }
    setTimeout(function(){

      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data:{
          proName: $('.search_input').val(),
          page: 1,
          pageSize: 100
        },
        dataType: 'json',
        success: function(info){
          var htmlStr = template('tpl',info);
          $('.lt_product').html(htmlStr);
        }
      })
    },500)
  }

  //功能2.点击搜索功能
  //(1) 添加点击事件
  //(2) 获取搜索关键字，发送ajax请求，进行页面重新渲染
  $('.search_btn').click(function(){
    render();
  })


  //功能3.实现排序功能
  //(1) 给需要排序的按钮，添加点击事件
  //(2) 如果当前按钮没有current类，加上current类，其他的移除（排他）
  //(3) 如果当前按钮有current类，切换箭头方向即可
  $('.lt_sort a[data-type]').click(function(){
    if($(this).hasClass('current')){
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }else{
      $(this).addClass('current').siblings().removeClass('current');
    }
    render();
  })
})