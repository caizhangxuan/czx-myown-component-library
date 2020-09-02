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
        value = str.replace(/^\s*/g,"");
        if(value){
            return value
        }else{
            return ''
        }
    }
};
// 验证是否是数字
export const NUmValid = (str) =>{
    let temp = /^[0-9]*$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};
// 验证是否是浮点型数字，^([1-9][0-9]*)+(.[0-9]{1,2})?$
export const FloatValid = (str) =>{
    let temp = /^([1-9][0-9]*)+(.[0-9]{1,2})?$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};
// 验证是否是大于0的数字^(0|[1-9][0-9]*)$
export const IntegerValid = (str) =>{
    let temp = /^([1-9][0-9]*)$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};


// 正则表达，验证是否是英文和数字组成
export const EngNumValid = (str) =>{
    let temp = /^[A-Za-z0-9]+$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};

// 验证是否是中英文^[\u4E00-\u9FA5A-Za-z0-9_]+$
export const ChinEngValid = (str) =>{
    let temp = /^[\u4E00-\u9FA5A-Za-z0-9]+$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};

// 验证是否包含中英文以及标点符号\\w*|\\W*|[\\u4e00-\\u9fa5]
export const ContentValid = (str) =>{
    let temp = /^\w*|\W|[\u4E00-\u9FA5]/g;
    let strRemove = spaceKeyValid(str);         // 检验是否为空
    let value = temp.test(str);
    if(strRemove){
        return value
    }else{
        return ''
    }
};

// 验证邮箱
export const eMailValid = (str) =>{
    let temp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};


// 验证手机号
export const phoneValid = (str) =>{
    let temp = /^1[3-9]\d{9}$/g;
    let value = temp.test(str);
    if(value){
        return str
    }else{
        return ''
    }
};


// 针对图形验证码，获取随机数
export const randomCode = (n) => {
    // eslint-disable-next-line no-undef
    let codeList = _.sampleSize(code.code, n);
    return codeList.join('')
};

// 上传图片的时候
export const uploadImg = (file,fileList) =>{
    if(file.raw.type === 'image/png' || file.raw.type === 'image/png' || file.raw.type === 'image/jpeg'){
        return fileList;
    }else{
        this.$message.error('请上传正确的图片格式');
        return []
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
    // eslint-disable-next-line no-unused-vars
    let s = date.getSeconds();        // 秒
    s = s < 10 ? '0'+s :s;

    let callback;

    // 返回的模式是 2020/02/20 20:20
    switch (type) {
        case 1:
            callback = Y + '/' + M + '/' + D + ' ' + hour + ':' + m;
            break
    }
    return callback
};

// 统计的柱状图
// eslint-disable-next-line no-unused-vars
export const chartBar = (para,theme,opts,title) => {
    let pieChart = echarts.init(para,theme,opts);
    let option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    return pieChart.setOption(option)
};

// 当上传的图片是多张的时候，需要获取图片的存储路径
export const ImgConversion = (para) => {
    return new Promise(resolve => {
        let temp = para.map(item => {
            return item.httpUrl;
        });
        resolve(temp.join())
    })
};
