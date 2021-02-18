<template>
  <el-dialog title="新增脚本模版" :visible.sync="addVisible" width="45%" center @close="closeDia">
      <el-form :model="templateForm" ref="templateForm" :rules="templateRules">
        <el-form-item label="模版名称" prop="name">
          <el-input v-model="templateForm.name" @blur="inputBlur($event,'name')"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="director">
          <el-input v-model="templateForm.director" @blur="inputBlur($event,'director')"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" rows="5" v-model="templateForm.description" @blur="inputBlur($event,'description')"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="saveGo" type="primary">保存</el-button>
        <el-button @click="refreshGo">返回</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {addTaskTemplate,editTaskTemplate} from '../api/api'

export default {
  name: 'index',
  props:{
    templateForm:{
      type:Object,
      default:()=>{}
    }
  },
  data() {
    return {
      addVisible:false,
      templateRules:{
        name:[{trigger: 'blur',required: true,message:'请输入模版名称'}],
        director:[{ trigger: 'blur',required: true,message:'请输入负责人'}],
        description:[{trigger: 'blur',required: true,message:'请填写描述'}]
      }
    }
  },
  methods: {
    saveGo() {
      if(!!this.templateForm.id){
        // 执行修改
        delete this.templateForm.updateTime
        delete this.templateForm.createTime
        delete this.templateForm.flowTemplate
        delete this.templateForm._XID
        delete this.templateForm.status
        delete this.templateForm.modifier
        editTaskTemplate(this.templateForm).then(res => {
          if(res.code === 200){
            this.$message.success(res.msg)
            this.addVisible = false
            this.$emit('newClosed')
          }else{
            this.$message.warning(res.msg)
          }
        })
      }else{
        // 执行新增
        this.$refs.templateForm.validate(valid => {
          if(valid){
            addTaskTemplate(this.templateForm).then(res => {
              if(res.code === 200){
                this.$message.success(res.msg)
                this.addVisible = false
                this.$emit('newClosed')
              }else{
                this.$message.warning(res.msg)
              }
            }).catch(err => {
              console.log(err)
            })
          }
        })

      }
    },
    inputBlur(e,prop){
      this.templateForm[prop] = this.templateForm[prop].replace(/(^\s*)|(\s*$)/g,"")
    },

    refreshGo() {
      this.addVisible = false
    },
    closeDia(){
      this.$refs.templateForm.resetFields()
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
