<template>
  <el-row style="padding:10px 20px;">
    <el-col :span="24" style="padding-left:20px;" v-show="addVisible">
      <FormSearch :searchParam="tableConfig" ref="searchForm" @searchSubmit="labelSearch"/>

      <VXETable
        :search-height="formSearchHeight"
        :table-data="tableData"
        :table-config="tableConfig"
        :table-loading="tableLoad"
        @refresh="refreshTable"
        @editOperation="editTable"
        @delOperation="deleteTable"
        @toolbarSearch="labelSearch"
        @toolbarAdd="toolAdd"
        @toolbarReset="toolReset"
        @tableSwitch="switchChange"
        @setConfig="configFlow"
      ></VXETable>
      <pagation @sizeChange="pageSizeChange" @currentChange="currentPageChange" :total="pageTotal" style="margin-top: 10px;text-align: center"></pagation>
    </el-col>
    <TemplateAdd ref="templateAdd" @newClosed="initConfiguration" :templateForm="rowData"/>
    <ScriptAdd v-show="!addVisible"  @goBack="backToM" :parentRow="parentData" :flow-data="flowData" ref="flow"/>
  </el-row>
</template>

<script>
  import VXETable from '../../../components/VXE/Table'
  import pagation from '../../../components/page/index'
  import configuration from './table.json'
  import { getScriptList, updateStatus, delTask, getFlowData } from './api/api'
  import ScriptAdd from './component/add'
  import TemplateAdd from './component/newTemplate'
  import FormSearch from "@/components/FormSearchLabel/index"

  export default {
    name: "index",
    components:{pagation,VXETable,ScriptAdd,TemplateAdd,FormSearch},
    data() {
      return {
        msg: '模版名称：',
        formSearchHeight:0,
        tableConfig:configuration,
        tableLoad:false,
        tableData:[],
        pageTotal:0,
        addVisible:true,
        searchParam:{
          director:'',
          name:'',
          pageNum:1,
          pageSize:10
        },
        rowData:{
          name:'',
          director:'',
          description:''
        },
        parentData:{},
        flowData:{
          nodeDataArray: [],
          linkDataArray: []
        },
      }
    },
    methods:{
      pageSizeChange(pageSize){
        this.searchParam.pageSize = pageSize;
        this.initConfiguration();
      },
      currentPageChange(page){
        this.searchParam.pageNum = page;
        this.initConfiguration();
      },
      // 页面刷新
      refreshTable(){
        this.initConfiguration();
      },
      // 编辑操作
      editTable(para){
        if(para.status === 0){
          this.rowData = Object.assign(this.rowData,para)
          this.$refs.templateAdd.addVisible = true;
        }else{
          this.$message.info('上线模版无法进行编辑')
        }
      },
      // 删除
      deleteTable(paraID){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTask(paraID).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.initConfiguration()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      labelSearch(){
        this.$refs.searchForm.searchSubmit().then(res => {
          console.log('表单的查询操作',res)
          this.searchParam = Object.assign(this.searchParam,res)
          this.initConfiguration()
        })

      },

      // 新增按钮
      toolAdd(){
        console.log('新增的按钮操作')
        this.rowData = {
          name:'',
          director:'',
          description:''
        }
        this.$refs.templateAdd.addVisible = true;
      },
      // 重置页面
      toolReset(){
        this.searchParam = {
          description:'',
          director:'',
          name:'',
          pageNum:1,
          pageSize:10
        }
        this.initConfiguration();
      },
      // 上下线状态切换
      switchChange(para){
        console.log('开关',para)
        let temp = {
          id:para.id
        }
        updateStatus(temp).then(res => {
          if(res.code === 200){
            this.$message.success(res.msg)
          }else{
            this.$message.warning(res.msg)
          }
        })
      },
      // 设计流程
      configFlow(para){
        let temp = {
          jobId:para.id
        }
        getFlowData(temp).then(res => {
          console.log(res.data)
          this.flowData = res.data ?  res.data : { nodeDataArray: [], linkDataArray: [] }
          this.parentData = para;
          this.addVisible = false
          this.$refs.flow.goIndex ++;
        })
      },
      // 流程设计页面返回的事件
      backToM(){
        this.addVisible = true
        this.initConfiguration();
      },
      // 初始化页面
      initConfiguration(){
        this.tableLoad = true;
        getScriptList(this.searchParam).then(res => {
            this.tableData = res.data.list;
            this.pageTotal = res.data.total;
            this.tableLoad = false;
        })
      }
    },
    mounted() {
      this.formSearchHeight = this.$refs.searchForm.clientHeight
      this.initConfiguration();
    }
  }
</script>

<style scoped>

</style>
