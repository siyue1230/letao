$(function(){

  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));
  var option1 = {
    title:{
      text: '2017年 注册人数',
      textStyle:{
        color: 'red',
      }
    },
    tooltip: {},
    legend:{
      data:['人数']
    },
    xAxis:{
      data:['1月','2月','3月','4月','5月','6月']
    },
    yAxis:{},
    series:[{
      name:'人数',
      type:'bar',
      data:[1000,1500,2500,1300,1800,2400]
    }]
  };
  echarts_1.setOption(option1);

  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));
  var option2 = {
    title:{
      text: '热门品牌销售',
      subtext: '2017年6月',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter:"{a} <br/>{b} : {c} ({d}%)"
    },
    legend:{
      orient: 'vertical',
      left: 'left',
      data:['耐克','阿迪','李宁','耐克王','李宁王']
    },
    series:[{
      name:'品牌销售',
      type:'pie',
      radius: '50%',
      center: ['50%','60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'李宁'},
        {value:135, name:'耐克王'},
        {value:1548, name:'李宁王'}
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 50,
          shadowOffsetX: 0,
          shadowColor: 'yellow'
        }
      }
    }]
  }
  echarts_2.setOption(option2);
})