<script>
/**
 * 分页器，update by CZX on 2019/12/2,
 *
 * @receive
 * total            String     数据总量
 * layoutList       String     菜单栏的功能模块，默认都有
 * ifBackground     Boolean    页码的背景色是否有
 *
 * @return
 * sizeChange       event       每页的数量发生变化
 * currentChange    event       当前页码发生变化
 *
 * @调用的时候
 * <pagation ref="page" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" :total="total"></pagation>
 *
 */
export default {
  name: 'paging',
  props: {
    total: {
      type: [Number, String],
      default: 0
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [25,50,100]
      }
    },
    layoutList: {
      type: String,
      default: 'total, sizes, prev, pager, next,jumper'
    },
    ifBackground: {
      type: Boolean,
      default: false
    },
    ifHideSingle:{
      type:Boolean,
      default:false
    },
    left:{
      type:Boolean,
      default:false
    },
    center:{
      type:Boolean,
      default:false
    },
    right:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      current: 1,
      pageSize:25
    }
  },
  methods: {
    //控制分页
    handleSizeChange(val) {
      this.pageSize = val
      this.current = 1
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      this.current = val
      this.$emit('currentChange', val)
    }
  },

}
</script>

<template>
  <el-pagination
    style="margin-top: 10px"
    :hide-on-single-page="ifHideSingle"
    :layout="layoutList"
    :background="ifBackground"
    :page-sizes="pageSizes"
    :current-page.sync="current"
    :page-size="pageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :class="center ? 'textCenter' : (right ? 'textRight' : 'textLeft') "
  >
  </el-pagination>
</template>

<style scoped>
.textLeft{
  text-align: left;
}
.textCenter{
  text-align: center;
}
.textRight{
  text-align: right;
}
</style>

