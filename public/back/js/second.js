$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        var htmlStr = template('secondTpl',info);
        $('tbody').html( htmlStr);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage:info.page,//当前页
          totalPages:Math.ceil( info.total / info.size),//总页数
          onPageClicked:function(event, originalEvent, type,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            render();
          }
        });
      }
    })

  }

  $('#addBtn').click(function(){
    $('#addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        var htmlStr = template('dropdownTpl',info);
        $('.dropdown-menu').html( htmlStr);
      } 
    })
  });

  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);
    var id = $(this).data('id');
    $('[name="categoryId"]').val(id);
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
  $('#fileupload').fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
      var picUrl = data.result.picAddr;
      $('#imgBox img').attr('src',picUrl);
      $('[name="brandLogo"]').val(picUrl);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
    }
  });


  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      //校验用户名，对应name表单的name属性
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类名称'
          },
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }    
  })
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success:function(info){
        if(info.success){
          $('#addModal').modal('hide');
          currentPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm(true);
          $('#dropdownTxt').text('请选择一级分类');
          $('#imgBox img').attr('src','images/none.png');
        }
      }
    })
  });

  

})