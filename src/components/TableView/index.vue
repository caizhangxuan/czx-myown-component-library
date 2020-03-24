<template>
    <section style="width:100%">
        <!--
        dataList       表格的数据        type Array
        -->
        <el-table
                :data="dataList"
                border
                style="width: 100%;"
                highlight-current-row
                v-loading="load"
                @expand-change="changeExpand"
                row-key="id"
                :expand-row-keys="expandList"
        >
            <!--
              ifExpend    是否启用表格行展开功能
            -->
            <el-table-column type="expand" v-if="ifExpand">
                <template slot-scope="props">
                    <el-form label-position="left">
                        <el-row>
                            <template v-for="(item,index) in tableHeader">
                                <el-col :span="12">
                                    <el-form-item :label="item.name" :key="index" v-if="item.isWangEditor">
                                        <span v-html="props.row[item.value]"></span>
                                    </el-form-item>
                                    <el-form-item :label="item.name" :key="index"
                                                  v-else-if="item.value !== 'created_at' && item.value !== 'updated_at'">
                                        <span>{{ props.row[item.value]}}</span>
                                    </el-form-item>
                                </el-col>
                            </template>
                        </el-row>
                    </el-form>
                </template>
            </el-table-column>
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
                                :src="`${baseUrl}/${scope.row[item.value]}`"
                                alt
                                width="100%"
                                class="image"
                        >
                    </template>
                </el-table-column>
                <!--角色-->
                <el-table-column :prop="item.value" :label="item.name" align="center" :formatter="roleDifference"
                                 v-else-if="item.isRole" :key="index">
                </el-table-column>
                <!--类型-->
                <el-table-column :prop="item.value" :label="item.name" align="center" :formatter="typeFormatter"
                                 v-else-if="item.isType" :key="index">
                </el-table-column>
                <!--内容-->
                <el-table-column :prop="item.value" :label="item.name" align="center" v-else-if="item.isContent"
                                 show-overflow-tooltip :key="index">
                </el-table-column>
                <!--状态开关-->
                <el-table-column :prop="item.value" :label="item.name" align="center" v-else-if="item.isStatus"
                                 :key="index">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row[item.value]" :active-value="active" :inactive-value="inactive"
                                   @change="switchChange(scope.$index,scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <!--富文本编辑器-->
                <el-table-column :prop="item.value" :label="item.name" align="center" v-else-if="item.isWangEditor"
                                 show-overflow-tooltip :key="index">
                    <template slot-scope="scope">
                        <section v-html="scope.row[item.value]"></section>
                    </template>
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
            <el-table-column :label="tableOperation.operation" min-width="150" align="center" v-if="!!tableOperation">
                <template slot-scope="scope">
                    <!--list里面，包括：title,typeId,type,isPlain-->
                    <template v-for="(item,index) in tableOperation.list">
                        <el-button
                                :type="item.type"
                                :plain="item.isPlain"
                                size="small"
                                @click="handleChoose(scope.$index,scope.row,item)"
                                :key="index"
                                style="margin-top:4px;"
                        >{{item.title}}
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    // import {ApiConfig} from "../../../static/HttpConfig";

    export default {
        name: "TableView",
        props: {
            dataList: {
                type: Array,
                default: () => []
            },
            ifExpand: {
                type: Boolean,
                default: false
            },
            tableHeader: {
                type: Array,
                default: () => []
            },
            tableOperation: {
                type: Object,
                default: () => {
                }
            },
            roleData: {
                type: Object,
                default: () => {
                }
            },
            typeData: {
                type: Object,
                default: () => {
                }
            },
            load: {
                type: Boolean,
                default: false
            },
            active: {
                type: [Number, String],
                default: 1
            },
            inactive: {
                type: [Number, String],
                default: 0
            }
        },
        data() {
            return {
                // baseUrl: ApiConfig.ImgUrl,
                baseUrl: 'https://www.baidu.com',
                checkVisible: false,
                expandList: []
            }
        },
        methods: {
            roleDifference(row, column, cellValue) {
                return this.roleData[cellValue]
            },
            typeFormatter(row, column, cellValue) {
                return this.typeData[cellValue]
            },
            switchChange(index, row) {
                this.$emit("switchHandle", row)
            },
            // 行展开的时候，出发的事件
            changeExpand(row, expandedRows) {
                // if(expandedRows.length > 0){
                //     this.expandList.splice(0,1,row.id)
                // }
                // console.log(expandedRows);
            },
            // 表格的点击，编辑，查看等事件
            handleChoose(index, row, param) {
                let para = Object.assign({}, row);
                let paraId = {
                    id: para.id
                };
                switch (param.typeId) {
                    case 'check':
                        this.$emit('checkOperation', para);
                        break;
                    case 'edit':
                        this.$emit('editOperation', para);
                        break;
                    case 'del':
                        this.$emit('delOperation', index);
                        break;
                    case 'qrCode':
                        this.$emit('codeOperation', para);
                        break;
                    case 'log':
                        this.$emit('logOperation', para);
                        break;
                    case 'statistical':
                        this.$emit('statisticalOperation', para);
                        break;
                    case 'order':
                        this.$emit('orderOperation', para);
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>
