$(function(){
  var productId = getSearch('productId');
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {
      id:productId
    },
    dataType: 'json',
    success: function(info){
      var htmlStr = template('productTpl',info);
      $('.lt_main .mui-scroll').html(htmlStr);
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
      });
      //手动初始化数字框
      mui('.mui-numbox').numbox()
    }
  })

  //2.添加购物车功能
  //(1) 添加点击事件
  //(2) 获取尺寸和数量，发送加入购物车请求
  //    后台自己检测用户是否登陆了
  //    a.如果没登录，直接返回，提示当前用户未登录，拦截到登录页
  //    b.如果登录了，进行添加购物车操作，返回添加的结果
  $('#addCart').click(function(){
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();
    if(!size){
      mui.toast('请选择尺码');
      return;
    }
    //根据用户选择的尺码和数量，发送添加购物车的请求
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId: productId,
        size: size,
        num: num
      },
      success: function(info){
        if(info.error === 400){
          location.href = 'login.html?retUrl=' + location.href;
          return;
        }
        if(info.success){
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if(e.index === 0){
              location.href = 'cart.html';
            }
          })
        }
      }
    })
  })
  //给尺码添加可选的点击功能
  $('.lt_main').on('click','.lt_size span',function(){
    $(this).addClass('current').siblings().removeClass('current');
  })
})