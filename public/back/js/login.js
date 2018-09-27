$(function(){
  //1.进行表单校验配置
  //实现表单校验功能，进行表单校验初始化
  $('#form').bootstrapValidator({
    //指定校验时显示的图标，固定写法
    feedbackIcons:{
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //配置校验字段
    fields:{
      username:{
        //配置校验规则，注意不要少了s
        validators:{
          //非空校验
          notEmpty:{
            //提示信息
            message:"当前用户名不能为空"
          },
          //长度校验
          stringLength:{
            min: 2,
            max: 6,
            message: "用户名长度必须是2-6位"
          },
          //callback专门用于配置回调的说明
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          notEmpty:{
            message:"密码不能为空"
          },
          stringLength:{
            min:6,
            max:12,
            message:"密码长度必须是6-12位"
          },
          //callback专门用于配置回调的说明
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  })

  //2.通过submit按钮进行提交表单，可以让表单校验插件进行校验
  //思路：注册表单校验成功事件，阻止默认的表单提交，通过ajax进行提交
  $('#form').on('success.form.bv',function(e){
    //阻止表单默认的表单提交
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      //通过表单序列化快速获取表单值
      data:$('#form').serialize(),
      dataType:'json',
      success: function(info){
        if(info.success){
          //登录成功，跳转到首页
          location.href = "index.html";
        }
        if(info.error === 1000){
          //alert('用户名不存在')
          //将表单用户名校验状态从成功更新成失败，并且给用户提示
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }
        if(info.error === 1001){
          //alert('密码错误')
          //将表单用户名校验状态从成功更新成失败，并且给用户提示
          $('#form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
        }
      }
    })
  })

  //3.解决reset重置bug，添加重置功能
  $('[type="reset"]').click(function(){
    //调用插件的方法进行重置
    //resetForm(boolean)
    //1.true,表示将表单内容和校验状态都重置
    //2.false，只重置校验状态
    $('#form').data('bootstrapValidator').resetForm();
  })
})