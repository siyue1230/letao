$(function(){
  //要进行搜索历史记录管理，要进行本地存储操作，所以我们需要约定一个键名，专门用于历史记录管理，键名：search_list

  //下面3行代码，用于假数据初始化
  // var arr = ["阿迪王","阿迪","耐克","匡威"];
  // var jsonStr = JSON.stringify(arr);
  // localStorage.setItem( "search_list",jsonStr);
  //功能1.搜索历史记录渲染
  //(1) 从本地存储中读取历史记录 jsonStr
  //(2) 解析 jsonStr， 转成数组
  //(3) 结合模板引擎渲染
  
  render();

  //读取历史记录，并且以数组的形式返回
  function getHistory(){
    //没有数据时，读取出来是null，需要做类型处理
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse( jsonStr); 
    return arr;
  }

  //读取历史记录，得到数组，并进行页面重新渲染
  function render(){
    var arr = getHistory();
    var htmlStr = template( 'history_tpl',{arr:arr});
    $('.lt_history').html(htmlStr);
  }


  //功能2.清空历史记录功能
  //(1) 添加清空点击事件（事件委托绑定事件）
  //(2) 使用 removeItem() 清除本地存储的内容
  //(3) 页面重新渲染

  $('.lt_history').on('click','.icon_empty', function(){

    //确认框 confirm
    //参数1：确认框内容
    //参数2：标题文本
    //参数3：按钮文本，数组
    //参数4：关闭确认框后的回调函数
    mui.confirm('你确定要清空历史记录吗？','温馨提示',['取消','确认'],function( e ){
      if(e.index === 1 ){
        localStorage.removeItem('search_list');
        render();
      }
    });


    
  })

  //功能3.删除单条历史记录：删除是数组中的某一项
  //(1) 通过事件委托绑定点击事件
  //(2) 取出数组，从自定义属性中读取下标，通过下标删除数组中的对应项
  //    splice(从哪开始，删几个，添加的项1，添加项2，...);
  //(3) 将修改后的数组，转成jsonStr，存储到本地
  //(4) 重新渲染
  $('.lt_history').on('click','.icon_delete',function(){
    var arr = getHistory();
    var index = $(this).data('index');
    arr.splice(index, 1);
    localStorage.setItem('search_list',JSON.stringify(arr));
    render();
  })

})