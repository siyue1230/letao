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