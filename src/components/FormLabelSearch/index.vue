<script>
  /**
   *
   * Created by CZX on 2020/08/26
   * @params
   *  searchParam         Object          用来接受参数
   *      labelList:[
            {
              label:'模版名称',
              value:'name',
              placeholder:'请输入模版名称'
            },
          ]
   *
   *  @events
   *  searchSubmit         在输入框触发Enter事件的时候，向父组件触发searchSubmit事件，将表单内容传递上层，触发查询请求
   *
   */

  import {isIPV4} from '@/utils/Validate'

  export default {
    name: 'index',
    props: {
      searchParam: {
        type: Object,
        default: () => {}
      },
      ifNeedMore:{
        type:Boolean,
        default:false
      },
      // 截取的时候的长度
      sliceNumber:{
        type:Number,
        default:3
      },
      // 查询的按钮形式
      ifSearch:{
        type:Boolean,
        default:false
      },
      ifReset:{
        type:Boolean,
        default:false
      },
      selectOption:{
        type:Object,
        default:()=>{}
      }
    },
    data() {
      return {
        formData: {},               // 表单的数据对象
        pickerOptions: {            // 当需要时间选择器的时候，用来展示快捷选项的
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value: '',
        moreSearch:[],
        expand:false,
      }
    },
    methods: {
      // keyUp事件触发
      keyUpSubmit(){
        this.$emit('searchSubmit')
      },
      // 表单的上传的校验
      searchSubmit(){
        return new Promise(resolve => {
          this.$refs.formData.validate(valid => {
            if(valid){
              let temp = Object.assign({},this.formData)
              resolve(temp)
            }
          })
        })
      },
      // 表单的重置
      initForm(){
        return new Promise(resolve => {
          for(let key in this.formData){
            this.formData[key]  = ''
          }
          let temp = Object.assign({},this.formData)
          resolve(temp)
        })
      },
      // 规则校验为空,将左右两端的空格去除
      spaceValid(rule, value, callback){
        if(value){
          this.formData[rule.fullField] = value.replace(/(^\s*)|(\s*$)/g,"")
        }
        callback()
      },
      // IP4的校验
      IPValid(rule,value,callback){
        if(value){
          this.formData[rule.fullField] = value.replace(/(^\s*)|(\s*$)/g,"")
          if(isIPV4(this.formData[rule.fullField])){
            callback()
          }else{
            callback(new Error('请输入正确的IP地址'))
          }
        }
        callback()
      },
      // 输入框失去焦点的时候，将左右两边的空格去除
      blurReg(e){
        if(e.target.value){
          e.target.value = e.target.value.trim();
        }
      },
      // 是否需要高级搜索
      needHighSearch(){
        this.moreSearch = this.ifNeedMore ? this.searchParam.labelList.slice(0,this.sliceNumber) : this.searchParam.labelList
      },
      // 点击高级搜索的时候
      expandMore(){
        this.moreSearch = this.expand ? this.searchParam.labelList.slice(0,this.sliceNumber) : this.searchParam.labelList
        this.expand = !this.expand
      },
      oldSearch(){
        this.$emit('searchSubmit')
      },
      oldReset(){
        this.$emit('reset')
      }
    },
    mounted() {
      this.needHighSearch()
    }
  }
</script>

<template>
  <el-form class="formContainer" ref="formData" :model="formData" id="formData">
    <template v-for="(item,index) in moreSearch">
      <el-form-item
        class="content"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :rules="(item.ifDatePicker || item.template ||  item.ifSelect) ? [] : (item.ifIP ? [{validator:IPValid,trigger:'blur'}] : [{validator:spaceValid,trigger:'blur'}])"
      >
        <el-date-picker
          v-if="item.ifDatePicker"
          v-model="formData[item.value]"
          :type="item.type ? item.type : 'daterange'"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
          size="small"
          :style="'width:'+(item.width ? item.width : 240)+'px'"
          :picker-options="pickerOptions">
        </el-date-picker>

        <el-select
          v-else-if="item.ifSelect"
          :style="'width:'+(item.width ? item.width : '180') + 'px'"
          v-model="formData[item.value]"
          :placeholder="item.placeholder"
          size="small"
          clearable
        >
          <el-option
            v-for="res in selectOption[item.value]"
            :key="res[item.props.key]"
            :label="res[item.props.label]"
            :value="res[item.props.value]">
          </el-option>
        </el-select>

        <el-input
          :placeholder="item.placeholder ? item.placeholder : ('请输入'+item.label)"
          v-model="formData[item.value]"
          v-else
          :style="'width:'+(item.width ? item.width : '180') + 'px'"
          size="small"
          clearable
          @blur="blurReg"
          @keyup.enter.native="keyUpSubmit"
          />
      </el-form-item>
    </template>
    <el-form-item v-if="ifNeedMore">
      <el-button type="primary" size="mini" icon="el-icon-search" @click="oldSearch" v-show="ifSearch">查询</el-button>
      <el-button size="mini" icon="el-icon-refresh" v-show="ifReset" @click="oldReset">重置</el-button>
      <el-button type="text" v-show="!expand" size="mini" @click="expandMore"><i class="el-icon-d-arrow-left" style="transform: rotate(-90deg)"></i>高级搜索</el-button>
      <el-button type="text" size="mini" @click="expandMore" v-show="expand" ><i class="el-icon-d-arrow-left" style="transform: rotate(90deg)"></i>高级搜索</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
  .formContainer{
    display: flex;
    align-items: center;
    flex-wrap: wrap
  }
  .content {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 10px;
  }
</style>
