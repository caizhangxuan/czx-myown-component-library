import code from './code'     //0-1，a-z,A-Z的数组，用来生成验证码

// 导入饼状图
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');         // 饼状图
require('echarts/lib/chart/line');        // 折线图
require('echarts/lib/chart/bar');         // 柱状图
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/title');


// 去除左右两边的空格
export const spaceKeyValid = (str) =>{
  let value;
  if(str){
    value = str.replace(/^\s*|\s*$/g,"");
    if(value === '' || value === undefined || !value ){
      return false
    }else{
      return value
    }
  }
};

// 判定输入的是否是整数
export const NumTest = (num) =>{
  let reg = /^-?[1-9]\d*$/;
  return reg.test(num) ? num : ''
};

// 判定是否是邮箱
export const EmailTest = (mail) => {
  let reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
  return reg.test(mail) ? mail : ''
};

// 针对图形验证码，获取随机数
export const randomCode = (n) => {
  let codeList = _.sampleSize(code.code, n);
  return codeList.join('')
};

// 上传图片的时候
export const uploadImg = (file) =>{
  if(file.type === 'image/png' || file.type === 'image/png' || file.type === 'image/jpeg'){
    return file;
  }else{
    this.$message.error('请上传正确的图片格式');
    return {}
  }
};

// 首页的饼状图
export const chartPie = (para,theme,opts,title) => {
  let pieChart = echarts.init(para,theme,opts);
  let option = {
    title: {
      text: title,
      left: 'left',
      padding:[20,0,0,20],
      textStyle:{
        color:'#303133',
        fontSize:18,
      }
    },
    color:['#509EFF','#50CBCC','#F36278','#FCD34D'],
    tooltip : {
      trigger: 'item',
      formatter: "{b} : {c}"
    },
    legend: {
      bottom:10,
      data: ['公众号', '官方网站','苹果端','安卓端'],
      itemWidth:9,
      itemHeight:9,
      itemStyle:{
        fontStyle:12,
      }
    },
    series : [
      {
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        selectedMode: 'single',
        label: {
          formatter:"{d}%",
          color:['#000']
        },
        data:[
          {value:535, name: '公众号'},
          {value:1000, name: '官方网站'},
          {value:634, name: '苹果端'},
          {value:735, name: '安卓端'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return pieChart.setOption(option)
};

// 首页的折线图
export const chartLine = (para,theme,opts,title) => {
  let lineChart = echarts.init(para,theme,opts,);
  let option = {
    color:['#5ca2f8','#78c87d'],
    title: {
      text: title,
      left: 'left',
      padding:[20,0,0,20],
      textStyle:{
        color:'#303133',
        fontSize:18,

      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      top: 10,
      bottom:10,
      padding:[40,0,0,0],

      left: 'center',
      data:['web','mobile'],

    },
    grid: {
      left: '3%',
      right: '4%',
      top: '18%',
      bottom:'10%',
      containLabel: true
    },
    toolbox: {
      bottom:'0',
      left:'center',
      feature: {
        saveAsImage: {},
        dataView:{},
        magicType: {
          type: ['line', 'bar', 'stack','tiled']
        },
        restore:{}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'web',
        type:'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data:[120, 132, 101, 134, 90, 230, 210]
      },
      {
        name:'mobile',
        type:'line',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        data:[220, 182, 191, 234, 290, 330, 310]
      },
    ]
  };
  lineChart.setOption(option);
};

// 时间戳的封装
export const formatterTime = (time,type) =>{
  let date = new Date(time);
  let Y = date.getFullYear();       // 年
  let M = date.getMonth()+1;        // 月
  M = M < 10 ? '0'+ M : M;
  let D = date.getDate();           // 日
  D = D < 10 ? '0'+ D : D;
  let hour = date.getHours();       // 时
  hour = hour < 10 ? '0'+hour :hour;
  let m = date.getMinutes();        // 分
  m = m < 10 ? '0'+m :m;
  // let s = date.getSeconds();        // 秒
  // s = s < 10 ? '0'+s :s;

  let callback;

  // 返回的模式是 2020/02/20 20:20
  switch (type) {
    case 1:
      callback = Y + '/' + M + '/' + D + ' ' + hour + ':' + m;
      break;
    case 2:
      callback = Y + '年' + M + '月' + D + '日 ' + hour + ':' + m;
  }
  return callback
};

// 获取随机地点
