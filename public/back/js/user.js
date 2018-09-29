$(function(){
  var currentPage = 1;
  var pageSize = 5;
  //声明一个全局可用的变量，专门收集id
  var currentId;

  //1.一进入页面，发送ajax请求，请求用户列表数据，通过模板引擎，进行渲染
  render();
  function render(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        var htmlStr = template('tpl',info);
        $('tbody').html(htmlStr);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size),
          currentPage: info.page,
          onPageClicked: function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
      
    })
  }
  //2.点击启用禁用按钮，显示模态框，通过事件委托绑定事件
  $('tbody').on('click','.btn',function(){
    //显示模态框
    $('#userModal').modal('show');
    //获取当前要修改的用户id
    currentId = $(this).parent().data('id');
    //点击禁用按钮，用户状态修改为禁用
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
  })
  
  //3.点击模态框的确定按钮，实现修改用户状态
  $('#submitBtn').on('click',function(){
    //发送ajax请求，需要用户id，和isDelete(将用户改成什么状态)
    $.ajax({
      type: 'post',
      url:'/user/updateUser',
      data:{
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function(info){
        if(info.success){
          $('#userModal').modal('hide');
          render();
        }
      }
    })
  })
})
