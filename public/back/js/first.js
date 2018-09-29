$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){

    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function( info ){
        //通过template方法生成htmlStr进行渲染
        var htmlStr = template('tpl',info);
        $('tbody').html( htmlStr );
        $('#paginator').bootstrapPaginator({
          //版本号
          bootstrapMajorVersion: 3,
          //总页数
          totalPages: Math.ceil(info.total / info.size),
          //当前页
          currentPage: info.page,
          //给页面添加点击事件
          //event 是插件包装过的对象
          //originalEvent 是原始的事件对象
          //type 指代当前点击的页码类型，page普通页码，first首页，last尾页，next下一页，prev上一页
          // page指代当前点击按钮对应的页码
          onPageClicked: function(event, originalEvent, type, page){
            currentPage = page;
            render();
          }
        })
      }
    })
    //分页初始化
  }


  //2.点击添加分类按钮，显示添加模态框
  $('#addBtn').click(function(){
    $('#addModal').modal('show');
  })

  //3.表单验证校验插件，实现表单校验功能
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类名字'
          }
        
        }
      }
    }
  })

  //4.注册表单校验成功事件，阻止校验成功时的默认提交，通过ajax提交
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function(info){
        if(info.success){
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
        }
      }
    })
  })
})