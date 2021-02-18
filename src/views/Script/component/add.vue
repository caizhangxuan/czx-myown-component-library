<template>
  <el-row style="padding:10px 20px;">
    <section style="display: flex;align-items: center;justify-content: space-between">
      <p style="font-size:18px;font-weight: 700;letter-spacing: 5px;">流程设计</p>
      <section>
        <el-button @click="saveGo" type="primary">保存</el-button>
        <el-button @click="refreshGo">返回</el-button>
      </section>
    </section>

    <MyGo ref="myGojs" @double="drawOpen" :goData="flowData" :key="goIndex"/>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      size="50%;padding:20px;"
    >
      <VXETable
        :table-data="scriptData"
        :table-config="scriptConfig"
        :table-loading="tableLoad"
        :search-height="0"
        @toolbarReset="getScript"
        @toolbarSave="saveScript"
        @radioChange="radioSelect"
      />
      <Pagation
        ref="page"
        @sizeChange="handleSizeChange"
        @currentChange="handleCurrentChange"
        :total="total"
      ></Pagation>
    </el-drawer>
  </el-row>
</template>

<script>
import MyGo from '@/components/Gojs/index'
import VXETable from '@/components/VXE/Table'
import Pagation from '@/components/page/index'
import List from './draw.json'
import {addFlowTask,updateFlowData} from '../api/api'
import SearchForm from '@/views/CMDB/ciClassifiedManagement/components/searchForm'
import {getScriptData} from '@/api/scriptCenter/scriptManager'


export default {
  name: 'index',
  components: { SearchForm, VXETable, MyGo, Pagation },
  props:{
    parentRow:{       // 任务模版的信息
      type:Object,
      default:()=>{}
    },
    flowData:{
      type:Object,
      default:()=>{
        return {
          nodeDataArray: [],
          linkDataArray: []
        }
      }
    }
  },
  data() {
    return {
      goIndex:1,
      addVisible: false,
      drawer: false,
      direction: 'ltr',
      total: 0,
      tableLoad:false,
      scriptConfig: List,
      selectScript: {},
      selectNode: {},
      scriptData: [],
      templateForm: {
        name:'',
        director:'',
        description:''
      },
      scriptParam:{
        page:1,
        pageSize:10
      },
    }
  },
  methods: {
    handleClose(done) {

    },
    drawOpen(row) {
      this.selectNode = row
      this.drawer = true;
      this.tableLoad = true
      getScriptData(this.scriptParam).then(res => {
        if(res.code === 200){
          this.total = res.data.total;
          this.scriptData = res.data.data;
          this.tableLoad = false
        }
      }).catch(() => {
        this.tableLoad = false

      })
    },
    handleSizeChange(size) {

    },
    handleCurrentChange(page) {

    },
    //
    judgeCommit(para){
      return new Promise(resolve => {
        let temp = false;
        for(let i =0;i <para.length;i++){
          if(!para[i].scriptId){
            temp = false;
            break
          }else{
            temp = true
          }
        }
        resolve(temp)
      })
    },

    // 保存
    async saveGo() {
      if(this.parentRow.status === 1){
        this.$message.info('模版已上线，无法进行修改！')
      }else {
        this.$refs.myGojs.save().then(res => {
          let data = JSON.parse(res)
          // 顺序组
          let temp = [-1]
          data.linkDataArray.forEach(item => {
            data.linkDataArray.some(res => {
              if (res.from === temp[temp.length - 1]) {
                temp.push(res.to)
              }
            })
          })
          // 按照脚本执行顺序的数组
          let scriptArray = []
          temp.forEach(item => {
            data.nodeDataArray.some(res => {
              if (res.key === item && res.category==="nodeText") {
                scriptArray.push(res)
              }
            })
          })
          if(scriptArray.length > 0){
            // 判定
            this.judgeCommit(scriptArray).then(res => {
              if(res){
                data.scriptIds = scriptArray.map(item =>  item.scriptId)
                data.scriptIds = data.scriptIds.join(',')
                data.jobTemplateId = this.parentRow.id
                data.linkDataArray.forEach(item => {
                  item.point = item.points.join(',')
                  delete item.points
                })
                if(!!this.flowData.id){
                  data.id = this.flowData.id
                  updateFlowData(data).then(res => {
                    console.log(res)
                    if(res.code === 200){
                      this.$message.success(res.msg)
                      this.$emit('goBack')
                    }else{
                      this.$message.warning(res.msg)
                    }
                  })
                }else{
                  addFlowTask(data).then(res => {
                    console.log(res)
                    if(res.code === 200){
                      this.$message.success(res.msg)
                      this.$emit('goBack')
                    }else{
                      this.$message.warning(res.msg)
                    }
                  })
                }
              }else{
                this.$message.warning('请双击节点后选择相应的脚本，来完善流程！')
              }
            })
          }else{
            this.$message.warning('请完善脚本流程')
          }
          // console.log(scriptArray)
          // console.log(data)
          // console.log(temp)
        })
      }
    },
    refreshGo() {
      this.$emit('goBack')
    },
    // 重新获取脚本
    getScript() {

    },
    // 保存获取的脚本
    saveScript() {
      this.selectNode.part.data.text = this.selectScript.scriptName
      this.selectNode.part.data.scriptId = this.selectScript.id
      this.$refs.myGojs.updateGo(this.selectNode)
      this.drawer = false
    },
    radioSelect(para) {
      this.selectScript = para
    }
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
