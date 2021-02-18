<template>
  <div class="my-filter-content">
    <div class="my-fc-search">
      <div class="my-fc-search-top">
        <el-input v-model="option.data.sVal" placeholder="搜索" size="mini"   @input="searchEvent" @keyup.enter.native="submitSearch">
          <el-button slot="append" icon="el-icon-search" @click="submitSearch"></el-button>
        </el-input>
      </div>
      <div class="my-fc-search-content" v-loading="filterLoading">
        <template v-if="valList.length">
          <ul class="my-fc-search-list my-fc-search-list-head">
            <li class="my-fc-search-item">
              <vxe-checkbox v-model="isAll" :indeterminate="isIndeterminate" @change="changeAllEvent">全选</vxe-checkbox>
            </li>
          </ul>
          <ul class="my-fc-search-list my-fc-search-list-body">
            <li class="my-fc-search-item" v-for="(item, sIndex) in valList" :key="sIndex">
              <vxe-checkbox v-model="item.checked" @change="changeItemEvent">{{ item.value }}</vxe-checkbox>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="my-fc-search-empty">{{emptyText}}</div>
        </template>
      </div>
    </div>
    <div class="my-fc-footer">
      <vxe-button status="primary" @click="confirmFilterEvent">确认</vxe-button>
      <vxe-button @click="resetFilterEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script>
  import { EventBus } from "@/utils/bus";
  import XEUtils from 'xe-utils'
  // import { getDeviceCommandData } from '@/api/Equip/equip'


  export default {
    name: 'FilterContent',
    props: {
      params: Object,
      test:String
    },
    data () {
      return {
        size: 'mini', // 被所有子组件继承 size
        isAll: false,
        isIndeterminate: false,
        option: null,
        colValList: [],
        valList: [],
        filter:{
          labelId:null,
          pageNum:1,
          pageSize:50
        },
        filterData:[],
        ifSearch:false,
        filterLoading:false,
        emptyText:'无匹配项'
      }
    },
    watch: {
      params () {
        this.load()
      },
      colValList () {
        this.searchEvent()
      }
    },
    created () {
      console.log(this.test)
      this.load()
      this.searchEvent()
      this.submitSearch();
    },
    methods: {
      load () {
        // filters 可以配置多个，实际只用一个就可以满足需求了
        const { $table, column } = this.params
        // const { fullData } = $table.getTableData()
        const { fullData } = $table.getTableData()
        const option = column.filters[0]
        const { vals } = option.data
        const colValList = Object.keys(XEUtils.groupBy(fullData, column.property)).map(val => {
          return {
            checked: vals.includes(val),
            value: val
          }
        })
        // console.log(colValList)
        this.option = option
        this.colValList = colValList
        this.valList = colValList
      },
      searchEvent () {
        const { option, colValList } = this

        this.valList = option.data.sVal ? colValList.filter(item => item.value.indexOf(option.data.sVal) > -1) : colValList
        this.valList.forEach((item,index) => {
          if(item.value === "undefined"){
            item.value = ''
          }
        })
        this.updateCheckStatus()
      },
      changeAllEvent () {
        const { isAll } = this
        this.valList.forEach(item => {
          item.checked = isAll
        })
        this.isIndeterminate = false
      },
      updateCheckStatus () {
        const { valList } = this
        const isAll = valList.every(item => item.checked)
        this.isAll = isAll
        this.isIndeterminate = !isAll && valList.some(item => item.checked)
      },
      changeItemEvent () {
        this.updateCheckStatus()
      },
      confirmFilterEvent (evnt) {
        const { params, option, valList } = this

        const { data } = option
        const { $panel } = params
        data.vals = valList.filter(item => item.checked).map(item => item.value)
        option.checked = true
        // console.log(data.vals ,option.checked)
        // 是否需要查询
        console.log(this.ifSearch)
        if(this.ifSearch){
          EventBus.$emit('filterUpdate',this.filterData)
          this.$store.dispatch('changeFilter',this.filter)
        }
        if (data.vals.length==0){//一个没选点击确认的话
          $panel.resetFilter()
        }else{
          $panel.changeOption(evnt, true, option)
          $panel.confirmFilter()
        }
      },
      resetFilterEvent () {
        const { $panel } = this.params
        if(this.option.data.sVal === ''){
          $panel.resetFilter()
        }else{
          if(this.ifSearch){
            $panel.resetFilter()
            EventBus.$emit('reset')
          }else{
            if(this.colValList.length === 0){
              $panel.resetFilter()
            }else{
              $panel.resetFilter()
              EventBus.$emit('reset')
            }
          }

        }
      },
      // 确认案件事件
      async submitSearch(){
        this.filter = Object.assign(this.filter,this.$store.state.cmdbCi.filterParams)
        if(!!this.option.data.sVal && this.option.data.sVal.trim() !== ''){
          this.filterLoading = true
          let para =  this.params.column.own.field                // 获取当前字段
          this.filter[para] = this.option.data.sVal                   // 赋值
          console.log(this.filter)
          // let res =await getDeviceCommandData(this.filter).catch(err => console.log(err))
          let res ={}
          this.filterLoading = false
          if(!!res.data.list && res.data.list.length > 0){
            this.filterData = res.data;
            let temp = []
            res.data.list.forEach(item => {
              temp.push({checked: false,value:item[this.params.column.own.field]})
            })
            this.valList = temp;
            this.ifSearch = true;
          }else{
            this.valList = [];
          }
        }
      },
    },
  }
</script>

<style scoped>
  .my-filter-content {
    padding: 10px;
    user-select: none;
  }
  .my-filter-content .my-fc-search .my-fc-search-top {
    position: relative;
    padding: 5px 0;
  }
  .my-filter-content .my-fc-search .my-fc-search-top > input {
    border: 1px solid #ABABAB;
    padding: 0 20px 0 2px;
    width: 200px;
    height: 22px;
    line-height: 22px;
  }
  .my-filter-content .my-fc-search .my-fc-search-content {
    border: 1px solid #E2E4E7;
    padding: 2px 10px;
  }
  .my-filter-content .my-fc-search-empty {
    text-align: center;
    padding: 20px 0;
  }
  .my-filter-content .my-fc-search-list {
    margin: 0;
  }
  .my-filter-content .my-fc-search-list-body {
    overflow: auto;
    height: 120px;
  }
  .my-filter-content .my-fc-search-list .my-fc-search-item {
    padding: 2px 0;
    display: block;
    margin-left: -40px;
  }
  .my-filter-content .my-fc-footer {
    text-align: right;
    padding-top: 10px;
  }
  .my-filter-content .my-fc-footer button {
    padding: 0 15px;
    margin-left: 15px;
  }

</style>
