<script>
  import VXETable from 'vxe-table'
  import XEUtils from 'xe-utils'
  // import CZXFilter from './tableFilterInput'
  /**
   * Created by CZX on 2020/08/21
   *  @receive
   *    tableData                    Array           表格的数据
   *    tableConfig                  Object          表格的配置，包括
   *      header                      Array            表格的表头 (接受code/name/status/icon)
   *      tableOperation              Object           表格的操作列的数据,包括title/width/list
   *      toolbar                     Array            表格的工具栏菜单项（接受code 按键类型，name 按钮名称，status 主题色，icon 图标）
   *    searchHeight                Number           表格上层的查询条件的表单高度
   *    tableLoading                Boolean          在获取数据的时候是否需要家在的loading动画
   *
   */

  export default {
    // components: { CZXFilter },
    props: {
      tableData:{
        type: Array,
        default: () => []
      },
      tableConfig:{
        type:Object,
        default:()=> {}
      },
      tableLoading:{
        type:Boolean,
        default:false
      },
      searchHeight:{
        type:Number,
        default:0
      },
      defaultSelectRows:{
        type:Array,
        default:()=>[]
      },
      progressShow: {
        type: Boolean,
        default: false
      },
      progressData: {
        type: Number,
        default: 0
      },
      treeLazyMethod:{
        type:Function,
        default:null
      },
      hoverLoading: {
        type: Boolean,
        default: false
      },
      hoverData: {
        type: Array,
        default: () => []
      },
      defaultProps: {
        type:Object,
        default:()=> {
         return {
           children: 'children',
           label: 'name'
         }
        }
      },
      levelData:{
        type:Object,
        default:()=>{
          return {}
        }
      },
      configHeight:{
        type:[String,Number],
        default:null
      },
      splitPath:{
        type:String,
        default:''
      },
      // 是否需要刷新
      ifRefresh:{
        type:Boolean,
        default:true
      },
      // 是否是树状结构
      ifTree:{
        type:Boolean,
        default:false
      },
      // 复选框是否可以选中，数据中的某个字段
      checkboxProp:{
        type:String,
        default:''
      },
      // checkboxProp如果填这个属性，那么字段的值对应是什么
      checkboxClickValue:{
        type:[String,Boolean],
        default:null
      }
    },
    data() {
      return {
        tableHeight: document.documentElement.clientHeight,
        selectRow: null,
        checkBoxList:[],
        offTopHeight:0
      }
    },
    methods:{
      findList () {
        return new Promise(resolve => {
          this.$emit('refresh')
          resolve()
        })
      },
      barClick(code,$event){
        console.log(code,$event)
      },
      // 表格的点击，编辑，查看等事件
      handleChoose(index, row, param) {
        let para = Object.assign({}, row);
        let paraId = {
          id: para.id,
          index:index
        };
        switch (param.typeId) {
          case 'check':
            this.$emit('checkOperation', para);
            break;
          case 'edit':
            this.$emit('editOperation', para);
            break;
          case 'del':
            this.$emit('delOperation', paraId);
            break;
          case 'qrCode':
            this.$emit('codeOperation', para);
            break;
          case 'log':
            // 日志
            this.$emit('logOperation', para);
            break;
          case 'statistical':
            this.$emit('statisticalOperation', para);
            break;
          case 'order':
            this.$emit('orderOperation', para);
            break;
          case 'synchronous':
            // 同步
            this.$emit('synchronousOperation', para);
            break;
          case 'transfer':
            // 转让
            this.$emit('transferOperation', para);
            break;
          case "set":
            this.$emit('setConfig',para);
            break;
          case "startOne":
            // 执行一次
            this.$emit('startOne',paraId)
            break;
          case "start":
              //执行
            this.$emit('start',para)
            break;
          case "stop":
            // 流程任务终止
            this.$emit('stop',paraId)
            break;
          case "scheduling":
            this.$emit('schedulingOperation',para)
            break;

        }
      },
      // 工具栏的点击事件
      toolbarClick(para){
        switch (para.code) {
          case 'search':
            this.$emit('toolbarSearch');
            break;
          case 'add':
            this.$emit('toolbarAdd');
            break;
          case 'reset':
            this.$emit('toolbarReset')
            break;
          case 'upload':
            // 导入-上传
            this.$emit('toolbarUpload');
            break;
          case 'download':
            this.$emit('toolbarDownload')
            break;
          case 'save':
            this.$emit('toolbarSave')
            break;
          case 'addLabel':
            // 添加标签
            this.$emit('labelAdd');
            break;
          case 'nanotubes':
            // 脚本纳管
            this.$emit('nanotubes');
            break;
          case 'synchronous':
            // 同步
            this.$emit('toolbarSynchronous');
            break;
          case 'serverSynchronous':
            // 同步
            let serverTemp = this.$refs.czxTable.getCheckboxRecords();
            if(serverTemp.length > 0){
              this.$emit('toolbarServerSynchronous',serverTemp);
            }else{
              this.$message.warning('请选择需要下发的数据')
            }
            break;
          case 'scheduling':
            this.$emit('toolbarScheduling');
            break;
          case 'batchDel':
            // 批量删除
            let temp = this.$refs.czxTable.getCheckboxRecords();
            if(temp.length > 0){
              let para = temp.map(item => item.id)
              this.$emit('toolbarBatchDel',para);
            }else{
              this.$message.warning('请选择需要删除的设备')
            }
            break;
          case 'batchDevice':
            // 批量设备选择
            this.$emit('toolbarBatchDevice',para);
            break;
          case 'transferSelected':
            // 批量设备选择的时候的选中一些数据
            let batch = this.$refs.czxTable.getCheckboxRecords();
            if(batch.length > 0){
              let batchPara = batch.map(item => item.id)
              this.$emit('toolbarTransferSelected',batchPara);
            }else{
              this.$message.warning('请先勾选数据条目')
            }
            break;
          case 'deviceConfig':
            this.$emit('toolbarDeviceConfig');
            break;
          case 'importResult':
            this.$emit('toolbarImportResult');
            break;
          case 'downloadTemp':
            this.$emit('toolbarDownloadTemp');
            break;
          case 'viewResult':
            this.$emit('toolbarViewResult');
            break;
          // 单选框的时候的确定
          case 'radioConfirm':
            let radio = this.$refs.czxTable.getRadioRecord();
            this.$emit('toolbarRadioConfirm',radio);
            break;
          case 'devicePerform':
            // 设备中心的执行
            let perform = this.$refs.czxTable.getCheckboxRecords();
            this.$emit('toolbarDevicePerform',perform);
            break;

        }
      },
      // 复选框的全选事件
      selectAllEvent({checked,records}){
        console.log(checked,records)
        this.checkBoxList = records;
      },
      // 复选框的点击事件
      selectChangeEvent({checked,records}){
        this.checkBoxList = records;
      },
      // 获取当前已经选中的复选框
      getCheckSelect(){
        return new Promise(resolve => {
          let selectRecords = this.$refs.czxTable.getCheckboxRecords()
          let temp = selectRecords.map(item => item.id)
          resolve(temp)
        })
      },
      // 懒加载的时候的方法
      loadChildrenMethod({row}){
        return this.treeLazyMethod(row)
      },
      showHover(labelId){
        this.$emit('hoverPop',labelId)
      },
      cellClickEvent ({row,column}) {
        // console.log('单元格点击事件',row,column)
        if(!!column.property){
          this.$emit('currentChange',row)
        }
      },
      // 单选的事件
      radioChangeEvent ({ row }) {
        this.selectRow = row
        this.$emit('radioChange',row)
      },
      // 清除单选
      clearRadioRowEvent () {
        this.selectRow = null
        this.$refs.czxTable.clearRadioRow()
      },
      // 开关的事件
      switchChange(row){
        this.$emit('tableSwitch',row)
      },
      // 当前行选中事件
      currentChangeEvent({row}){
        // this.$emit('currentChange',row)
      },

      // 层级标签
      labelFilter(cellValue){
        let temp
        if(cellValue){
          if(typeof(cellValue) === 'string'){
            let strTemp = cellValue.split(',')
            let strArr = strTemp.map(item => {
              return (this.levelData[item] ? this.levelData[item].tagName : '')
            })
            temp = []
            temp[0] = strArr.join('/')
            return temp
          }else{
            temp = cellValue.map(item => {
              let tempSplit = item.split(',')           // 分割后
              let level = tempSplit.map(res => parseInt(res))
              let level2 = level.map(item => {
                return (this.levelData[item] ? this.levelData[item].tagName : '')
              })
              return level2.join('/')
            })
          }
        }
        return temp
      },
      checkColumnMethod({column}) {
        if(column.type === 'checkbox' || column.type === 'radio'){
          return false
        }else{
          return true
        }
        // return !['id'].includes(column.property)
      },
      // 设备中心的时候专用，显示品牌型号
      showDeviceCommand(){
        this.$refs.czxTable.showColumn(this.$refs.czxTable.getColumnByField('brand'))
        this.$refs.czxTable.showColumn(this.$refs.czxTable.getColumnByField('fun'))
        this.$refs.czxTable.showColumn(this.$refs.czxTable.getColumnByField('model'))
      },
      hideDeviceCommand(){
        this.$refs.czxTable.hideColumn(this.$refs.czxTable.getColumnByField('brand'))
        this.$refs.czxTable.hideColumn(this.$refs.czxTable.getColumnByField('fun'))
        this.$refs.czxTable.hideColumn(this.$refs.czxTable.getColumnByField('model'))
      },
      deviceFormatter({  row, column  }){
        let temp
       switch (column.title){
         case '品牌':
           temp = row.labelInfo[2]
           break;
         case '功能':
           temp = row.labelInfo[1]
           break;
         case '型号':
           temp = row.labelInfo[0]
           break;
         default:
           temp = ''
           break;
       }
        return temp
      },
      // 执行过程的Ip点击
      typeIfClick(row){
        this.$emit('typeIfClick',row.ip)
      },
      checkBoxMethods({row}){
        if(!!this.checkboxProp){
          return row[this.checkboxProp] === this.checkboxClickValue
        }else{
          return true
        }
      },
      // 清除排序
      clearSort(){
        this.$refs.czxTable.clearSort()
      },
      // 排序的方法
      sortMethod({ column, property, order }){
        // console.log(1,column,property,order)
        // this.$emit('sortTable',property,order)
      },
      sortChange({ column, property, order}){
        // console.log(2,column,property,order)
        this.$emit('sortTable',property,order)
      },
      ceshi(){
        console.log(23323323)
      }
    },
    computed:{
      TableViewHeight:function() {
        if(!!this.configHeight){
          return this.configHeight
        }else {
          if (!!this.searchHeight) {
            this.tableHeight = document.documentElement.clientHeight - 132 - this.searchHeight
            return this.tableHeight
          }else{
            this.tableHeight = 0.65 * document.documentElement.clientHeight
            return this.tableHeight
          }
        }
      },
    },
    created() {

      // 创建一个支持列内容的筛选
      // VXETable.renderer.add('FilterContent', {
      //   // 不显示底部按钮，使用自定义的按钮
      //   isFooter: false,
      //   // 筛选模板
      //   renderFilter (h, renderOpts, params) {
      //     return [
      //       <CZXFilter params={ params } />
      //     ]
      //   },
      //   // 重置数据方法
      //   filterResetMethod ({ options }) {
      //     options.forEach(option => {
      //       option.data = { vals: [], sVal: '' }
      //     })
      //   },
      //   // 筛选数据方法
      //   filterMethod ({ option, row, column }) {
      //     const { vals } = option.data
      //     const cellValue = XEUtils.get(row, column.property)
      //     return vals.includes(cellValue)
      //   },
      //   // 自动化调度的前置任务
      //   formatterFrontTemplate(){
      //
      //   },
      //
      //
      //
      // })
    },
    mounted() {

    },
    updated() {

    }
  }
</script>

<template>
  <section ref="tableContainer">
    <!--表格的工具栏-->
    <template v-if="tableConfig.toolbar && tableConfig.toolbar.length > 0">
      <vxe-toolbar custom ref="xToolbar"  :refresh="ifRefresh ? {query: findList} : null" @button-click="barClick">
        <template v-slot:buttons>
          <section class="toolbarContainer">
            <!-- 按钮组 -->
            <section>
              <template v-for="(item,index) in tableConfig.toolbar ">
                <el-tooltip
                  :disabled="item.title ? item.disabled : true"
                  effect="light"
                  :content="item.title" placement="top-end" :key="item.code + index">
                  <vxe-button :key="index" :status="item.status" @click="toolbarClick(item)" :icon="item.icon" :size="item.size ? item.size : null">
                    {{ item.name }}
                  </vxe-button>
                </el-tooltip>
              </template>
            </section>
            <!--进度条-->
            <el-progress v-show="progressShow" :text-inside="true" :stroke-width="15" :percentage="progressData"
                         style="width: 200px;" />
          </section>
        </template>
      </vxe-toolbar>
    </template>

    <vxe-table
      style="color:#424242;"
      :stripe="!ifTree"
      border
      round
      :loading="tableLoading"
      resizable
      highlight-current-row
      highlight-hover-row
      :max-height="TableViewHeight"
      :data="tableData"
      ref="czxTable"
      row-id="id"
      @current-change="currentChangeEvent"
      @checkbox-all="selectAllEvent"
      @checkbox-change="selectChangeEvent"
      :checkbox-config="{checkRowKeys: defaultSelectRows, highlight: true,checkMethod:checkBoxMethods}"
      :radio-config="{highlight: true}"
      @cell-click="cellClickEvent"
      @radio-change="radioChangeEvent"
      row-key
      :custom-config="{checkMethod:checkColumnMethod}"
      :tree-config="ifTree ? {children: 'children', hasChild: 'hasChildren',lazy:true, loadMethod: loadChildrenMethod} : null"
      :sort-config="{trigger: 'cell', defaultSort: {},orders:['asc', 'desc', null],sortMethod:sortMethod}"
      @sort-change="sortChange"
    >
      <template v-for="(item,index) in tableConfig.header">
        <!--slot插槽-->
        <!-- <vxe-table-column :type="item.type" :width="item.width" v-if="item.slot" :key="index"  :align="item.align ? item.align :'center'"> -->
          <!-- v-else-if="item.isDeviceCommand" -->
        <vxe-table-column
          v-if="item.slot"
          :type="item.type"
          :field="item.value"
          :title="item.name"
          :align="item.align ? item.align :'center'"
          :key="index"
          :min-width="item.width"
          :visible="item.visible ? !item.visible : true"
          :formatter="deviceFormatter"
          :sortable="item.sortable"
          :filters="item.filter ? [{data: {vals: [], sVal: ''}}] : null"
          :filter-render=" item.filter ? {name:'FilterContent'} : null"
          >
          <template v-slot="elslot">
            <slot
              :name="item.slot"
              :scope="{
                row: elslot.row,
                $rowIndex: elslot.$rowIndex,
                column: elslot.column,
              }"
            ></slot>
          </template>
        </vxe-table-column>
        <!--单选框-->
        <vxe-table-column :type="item.type" :width="item.width" v-else-if="item.type==='radio'" :key="index"  :align="item.align ? item.align :'center'">
          <template v-slot:header>
            <vxe-button type="text" @click="clearRadioRowEvent" :disabled="!selectRow">{{ item.name }}</vxe-button>
          </template>
        </vxe-table-column>

        <!--复选框-->
        <vxe-table-column :type="item.type" :width="item.width ? item.width : 40" v-else-if="item.type==='checkbox'" :key="index" />

        <!--设备中心专用的-->
        <vxe-table-column
          v-else-if="item.isDeviceCommand"
          :type="item.type"
          :field="item.value"
          :title="item.name"
          :align="item.align ? item.align :'center'"
          :key="index"
          :min-width="item.width"
          :visible="item.visible ? !item.visible : true"
          :formatter="deviceFormatter"
          :sortable="item.sortable"
          :filters="item.filter ? [{data: {vals: [], sVal: ''}}] : null"
          :filter-render=" item.filter ? {name:'FilterContent'} : null"
        />

        <!--分类-->
        <vxe-table-column
          v-else
          :field="item.value"
          :type="item.type"
          :title="item.name"
          :min-width="item.width"
          :align="item.align ? item.align :'center'"
          :key="index"
          :show-overflow="!item.overflow"
          :visible="item.visible ? !item.visible : true"
          :sortable="item.sortable"
          :filters="item.filter ? [{data: {vals: [], sVal: ''}}] : null"
          :filter-render=" item.filter ? {name:'FilterContent'} : null"
          :tree-node="item.hoverPopover ? item.ifTreeNode : null"
        >
          <!--switch开关-->
          <template v-if="item.type==='switch'" v-slot="{row}">
            <vxe-switch
              v-model="row.status"
              :on-value="item.onValue"
              :off-value="item.offValue"
              :on-label="item.onLabel"
              :off-label="item.offLabel"
              @change="switchChange(row)" />
          </template>
          <!--html插入-->
          <template v-else-if="item.type==='ifHtml'" v-slot="{row}">
            <span v-html="row[item.value]"></span>
          </template>
          <!--状态对应的不同含义-->
          <template v-else-if="item.type ==='taskStatus'" v-slot="{row}">
            <span>{{item.statusType[row[item.value]]}}</span>
          </template>
          <!--文件或者是方案-->
          <template v-else-if="item.type==='emergency'" v-slot="{row}">
            <span>{{row[item.value] === 'input' ? '方案' :'文件'}}</span>
          </template>
          <!--是否是脚本的路径-->
          <template v-else-if="item.type==='ScriptPath'" v-slot="{row}">
            <span>{{row['addType'] === 'input' ? '' : splitPath+(row[item.value] ? row[item.value] : '')}}</span>
          </template>
          <!--是否是应急的路径-->
          <template v-else-if="item.type==='emergencyPath'" v-slot="{row}">
            <span>{{row[item.outLog] === 'input' ? '' : item.path+row[item.value] }}</span>
          </template>
          <!--是否是自动化调度的显示方式-->
          <template v-else-if="item.type==='autoTemplate'" v-slot="{row}">
            <span>{{row[item.value] ? row[item.value][item.showChar] : ''}}</span>
          </template>
          <!--自动化调度的前置任务-->
          <template v-slot="{row}" v-else-if="item.type === 'frontTemplate'">
            <template v-for="(res,index) in row[item.value]" >
              <el-tooltip effect="light" :open-delay="700" :content="res[item.showChar]" placement="top-end" :key="index">
                <el-tag type="info" style="margin:0 5px 0 0;overflow:hidden;text-overflow:ellipsis;">
                  {{res[item.showChar]}}
                </el-tag>
              </el-tooltip>
            </template>
          </template>
          <!--是否是自动化调度的cron列表-->
          <template v-slot="{row}" v-else-if="item.type==='autoCron'">
            <template v-for="(res,index) in row[item.value]" >
              <el-tag type="info" class="cronTags" :key="index" v-if="!!res">
                {{res.name}}
              </el-tag>
            </template>
          </template>
          <!--调度流水中的流水查看的执行过程中IP点击-->
          <template v-else-if="item.type==='ifClick'" v-slot="{row}">
            <span class="clickText" @click="typeIfClick(row)">{{ row[item.value] }}</span>
          </template>
          <!--是否需要悬浮窗-->
          <template v-slot="{row}" v-else-if="item.hoverPopover">
            <el-popover placement="right" width="400" trigger="hover" @show="showHover(row.labelId)" :open-delay="500">
              <el-tree
                v-loading="hoverLoading"
                accordion
                default-expand-all
                :data="hoverData"
                node-key="id"
                ref="tableTree"
                :props="defaultProps"/>
              <span style="padding: 0; margin: 0; border: none;" slot="reference">{{ row.network }}</span>
            </el-popover>
          </template>
          <!--是否需要标签层级-->
          <template v-slot="{row}" v-else-if="item.ifLabel">
            <template v-for="(res,index) in labelFilter(row[item.value])" >
              <el-tooltip effect="light" :open-delay="700" :content="res" placement="top-end" :key="index">
                <el-tag type="info" style="margin:0 5px 0 0;width:100%;overflow:hidden;text-overflow:ellipsis;">
                  {{res}}
                </el-tag>
              </el-tooltip>
            </template>
          </template>
          <!--默认-->
          <template v-else v-slot="{row}">
            <span>{{row[item.value]}}</span>
          </template>
        </vxe-table-column>
      </template>
      <!--表格的操作列-->
      <vxe-table-column
        :title="tableConfig.tableOperation.title"
        fixed="right"
        :width="tableConfig.tableOperation.width"
        :min-width="tableConfig.tableOperation.minWidth"
        v-if="!!tableConfig.tableOperation"
        align="center"
      >
        <template slot-scope="scope">
          <template v-for="(item,index) in tableConfig.tableOperation.list">
            <el-tooltip effect="light" :hide-after='0' :content="item.title" placement="top-end" :key="item.typeId + index">
              <vxe-button
                style="padding:0;"
                :type="item.type" :icon="item.icon" @click="handleChoose(scope.$rowIndex,scope.row,item)" :key="index" round>{{item.buttonName}}</vxe-button>
            </el-tooltip>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
  </section>
</template>


<style scoped>
.toolbarContainer {
  display: flex;
  justify-content: space-between;
  align-items: center
}
.clickText{
  color:#409EFF;
}
.clickText:hover{
  cursor: pointer;
  text-decoration: underline;
}
.cronTags{
  margin:0 5px 0 0;
  max-width:100%;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>
