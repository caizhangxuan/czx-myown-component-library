<template>
    <!--终端状态，头部-->
    <section class="head">
      <el-row>
        <el-col :span="24">
          <section class="head-terminalContainer" :id="barId" style="height:40rem;"></section>
        </el-col>
      </el-row>
    </section>
</template>

<script>
  import {chartBar} from '../../utils'
  export default {
    name: "LineChart",
    props:{
      title:{
        type:String,
        default:'柱状图'
      },
      barId:{
        type:String,
        default:'myBar'
      }
    },
    data() {
      return {
        msg:'用户增长',
      }
    },
    methods:{

    },
    mounted(){
      //获取折线图
      let para = document.getElementById(this.barId);
      chartBar(para,{},{},this.title);
    }
  }
</script>

<style scoped>
  .head{
    background-color: #FFF;
  }
  .head-terminalContainer{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
</style>
