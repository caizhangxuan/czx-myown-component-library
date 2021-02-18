<script>
/**
 * Created by CZX on 2020/12/28
 * 对el-dialog进行二次封装，一些通用属性汇总
 *
 */


export default {
  name: 'Dialog',
  props:{
    title:{
      type:String,
      default:'提示'
    },
    visible:{
      type:Boolean,
      default:false
    },
    width:{
      type:[String,Number],
      default:'50%'
    },
    appendToBody:{
      type:Boolean,
      default:false
    },
    destroyOnClose:{
      type:Boolean,
      default:false
    },
    open:{
      type:Function,
      default:()=>{

      }
    },
    opened:{
      type:Function,
      default:()=>{

      }
    },
    close:{
      type:Function,
      default:()=>{

      }
    },
    closed:{
      type:Function,
      default:()=>{

      }
    },
    beforeClose:{
      type:Function,
      default:()=>{

      }
    }

  },

  data(){
    return{

    }
  },
  methods:{

  },
  computed:{
    diaVisible:{
      get:function(){
        return this.visible
      },
      set:function(val){
        this.$emit('update:visible',val)
      }
    }
  }
}
</script>

<template>
  <el-dialog
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="diaVisible"
    center
    v-dialog-drag
    :width="width"
    :append-to-body="appendToBody"
    @open="open()"
    @opened="opened()"
    @close="close()"
    @closed="closed()"
    :before-close="beforeClose()"
    :destroy-on-close="destroyOnClose"
  >
    <slot></slot>
  </el-dialog>
</template>

<style scoped>

</style>
