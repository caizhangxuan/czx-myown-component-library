<template>
    <section>
        <!--
        dataList       表格的数据        type Array
        -->
        <el-table :data="TestData" border style="width: 100%;" highlight-current-row v-loading="load">

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
                <el-table-column :prop="item.value" :label="item.name" align="center" :formatter="timeFormatter" v-else-if="item.isTime" :key="index">
                </el-table-column>
                <!--角色-->
                <el-table-column :prop="item.value" :label="item.name" align="center" :formatter="roleDifference" :key="index"
                                 v-else-if="item.isRole">
                </el-table-column>

                <el-table-column :prop="item.value" :label="item.name" align="center" v-else :key="index">
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
            <el-table-column :label="tableOperation ? tableOperation.operation : ''" align="center" v-if="tableOperation">
                <template slot-scope="scope">
                    <!--查看，属性check-->
                    <el-button type="text" size="small" v-if="tableOperation.check && tableOperation.check.isShow"
                               @click="handleChoose(scope.$index,scope.row,'check')">{{tableOperation.check.title}}
                    </el-button>
                    <!--编辑，属性edit-->
                    <el-button type="text" size="small" v-if="tableOperation.edit && tableOperation.edit.isShow"
                               @click="handleChoose(scope.$index,scope.row,'edit')">{{tableOperation.edit.title}}
                    </el-button>
                    <!--删除，属性del-->
                    <el-button type="text" size="small" v-if="tableOperation.del && tableOperation.del.isShow"
                               @click="handleChoose(scope.$index,scope.row,'del')">{{tableOperation.del.title}}
                    </el-button>
                    <!--日志，属性log-->
                    <el-button type="text" size="small" v-if="tableOperation.log && tableOperation.log.isShow">
                        {{tableOperation.log.title}}
                    </el-button>
                    <!--统计，属性statistical-->
                    <el-button type="text" size="small"
                               v-if="tableOperation.statistical && tableOperation.statistical.isShow">
                        {{tableOperation.statistical.title}}
                    </el-button>
                    <!--订单，属性order-->
                    <el-button type="text" size="small" v-if="tableOperation.order && tableOperation.order.isShow">
                        {{tableOperation.order.title}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    import {formatterTime} from '../../utils'
    import {getList} from './util'
    // import DataTemp from './table'

    export default {
        name: "TableView",
        props: ['dataList', 'tableHeader', 'tableOperation', 'roleData', "load","isTest"],
        data() {
            return {
                baseUrl: 'https://image.jianlingtech.com/',
            }
        },
        methods: {
            timeFormatter(row, column, cellValue) {
                return formatterTime(cellValue, 1)
            },
            roleDifference(row, column, cellValue) {
                return this.roleData[cellValue]
            },
            handleChoose(index, row, type) {
                let para = Object.assign({}, row);
                switch (type) {
                    case 'check':
                        this.$emit('checkOperation', para);
                        break;
                    case 'edit':
                        this.$emit('editOperation', index);
                        break;
                    case 'del':
                        this.$emit('delOperation', index);
                        break;
                }
            }
        },
        mounted() {
            console.log(getList());
        },
        computed:{
            TestData:function () {
                let para;
                if(this.isTest){
                    para = getList();
                    return para.data
                }else{
                    para = this.dataList;
                    return para
                }
            }
        }
    }
</script>

<style scoped>

</style>
