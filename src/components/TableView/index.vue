<template>
  <section>
    <!--
    dataList       表格的数据        type Array
    -->
    <el-table :data="dataList" border style="width: 100%;" highlight-current-row v-loading="load">

      <!--
      tableHeader       表头的数据          type Array
      name              表头的名称          type String
      value             表头的字段          type String
      isImg             是否是图片          type Boolean
      isTime            是否时间戳          type Boolean
      -->
      <template v-for="(item,index) in tableHeader">
        <!--图片-->
        <el-table-column :prop="item.value" :label="item.name" align="center" v-if="item.isImg" :key="index">
          <template slot-scope="scope">
            <img
              :src="`${baseUrl}${scope.row.img}`"
              alt
              width="100%"
              class="image"
            >
          </template>
        </el-table-column>
        <!--时间戳-->
        <el-table-column :prop="item.value" :label="item.name" align="center" :formatter="timeFormatter" v-else-if="item.isTime" sortable>
        </el-table-column>
        <!--角色-->
        <el-table-column :prop="item.value" :label="item.name" align="center" :formatter="roleDifference" v-else-if="item.isRole">
        </el-table-column>

        <el-table-column :prop="item.value" :label="item.name" align="center" v-else>
        </el-table-column>
      </template>

      <!--
      tableOperation      表格的按钮操作         type Object
      operation           操作的表头名称         type String
      check               是否有查看按钮         type Object,{isShow: Boolean(是否展示按钮),title: String (按钮的名称)}
      edit                是否有编辑按钮         type Object,{isShow: Boolean(是否展示按钮),title: String (按钮的名称)}
      del                 是否有删除按钮         type Object,{isShow: Boolean(是否展示按钮),title: String (按钮的名称)}
      log                 是否有日志按钮         type Object,{isShow: Boolean(是否展示按钮),title: String (按钮的名称)}
      statistical         是否有统计按钮         type Object,{isShow: Boolean(是否展示按钮),title: String (按钮的名称)}
      order               是否有订单按钮         type Object,{isShow: Boolean(是否展示按钮),title: String (按钮的名称)}
      -->
      <el-table-column :label="tableOperation.operation"  min-width="150" align="center">
        <template slot-scope="scope" >
          <!--list里面，包括：title,typeId,type,isPlain-->
          <template v-for="(item,index) in tableOperation.list">
            <el-button :type="item.type" :plain="item.isPlain" size="small"  @click="handleChoose(scope.$index,scope.row,item)" :key="index" style="margin-top:4px;">{{item.title}}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
  import {formatterTime} from '../js'
  export default {
    name: "TableView",
    props:{
      dataList:{
        type:Array,
        default:() => []
      },
      tableHeader:{
        type:Array,
        default:() => []
      },
      tableOperation:{
        type:Object,
        default:()=> {
          return {
            operation:"操作"
          }
        }
      },
      roleData:{
        type:Object,
        default:() =>{}
      },
      load:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        baseUrl:'https://image.jianlingtech.com/',
        checkVisible:false,
      }
    },
    methods:{
      timeFormatter(row, column, cellValue){
        return formatterTime(cellValue,1)
      },
      roleDifference(row,column,cellValue){
        return this.roleData[cellValue]
      },
      handleChoose(index,row,param){
        let para = Object.assign({},row);
        switch (param.typeId) {
          case 'check':
            this.$emit('checkOperation',para);
            break;
          case 'edit':
            this.$emit('editOperation',index);
            break;
          case 'del':
            this.$emit('delOperation',index);
            break;
        }
      }
    }
  }
</script>

<style scoped>

</style>
