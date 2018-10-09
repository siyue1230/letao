$(function(){
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render(){
    $.ajax({
      type: 'get',
      url:'/product/queryProductDetailList',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function(info){
        var htmlStr = template('productTpl',info);
        $('tbody').html(htmlStr);
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          totalPages: Math.ceil( info.total / info.size),
          currentPage: info.page,
          onPageClicked: function( a,b,c,currentPage){
            currentPage = page;
            render();
          },
          //itemTexts是一个函数，每个按钮在初始化的时候都会调用该函数，将该函数的返回值，作为按钮的文本
          //type:按钮的类型，page，first，last，prev，next
          //page：表示点击按钮跳转的页码
          //current：当前页
          itemTexts: function( type , page , current){
            switch(type){
              case 'page':
                return page;
              case 'first':
                return "首页";
              case 'last':
                return "尾页";
              case 'prev':
                return "上一页";
              case 'next':
                return "下一页";
            }
          },
          tooltipTitles:function(type , page , current){
            switch(type){
              case 'page':
                return "前往第" + page + "页";
              case 'first':
                return "首页";
              case 'last':
                return "尾页";
              case 'prev':
                return "上一页";
              case 'next':
                return "下一页";
            }
          }
        })
      }

    })
  }
  $('#addBtn').click(function(){
    $('addModal').modal('show');
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      dataType: 'json',
      success: function(info){

      }

    })
  })

  $('.dropdown-menu').on('click','a',function(){
    var txt = $(this).text();
    $('#dropdownTxt').text(txt);
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
  })
  $('#fileupload').fileupload({
    dataType:'json',
    done: function(){
      
    }
  })
})