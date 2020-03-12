<script>
/**
 *  @receive
 *  upUrl         String        图片上传的地址
 *  upHeader      Object        网络请求的请求头，一般是放token认证
 *  upExtraData   Object        除了图片的额外的一些字段，作为额外的字段来用
 *  imgList       Array         暂存图片的数组
 *  imgLimit      Number        图片的限制的数量
 *
 *  @return
 *  handleImgList     event       暂存图片的数组发生变化时触发的事件
 *  uploadSuccess     event       当图片上传成功后的触发的事件
 *
 * */

  export default {
    name: "ImgUpload",
    props:{
      upUrl:{
        type:String,
        default:''
      },
      upHeader:{
        type:Object,
        default: () => {}
      },
      upExtraData:{
        type:Object,
        default:() => {}
      },
      imgList:{
        type:Array,
        default:() => []
      },
      imgLimit:{
        type:Number,
        default:1
      }
    },
    data() {
      return {
        dialogImageUrl:'',
        dialogVisible:false,

      }
    },
    methods:{
      // 去除图片的
      handleRemove(file, fileList) {
        console.log('执行图片消除');
        this.$emit('handleImgList',fileList)
      },
      // 图片上传之前
      handleBefore(file) {
        console.log(file);
        if(file.type === 'image/jpeg' || file.type === 'image/png'){
          return true;
        }else{
          this.$message.error('请上传正确的图片格式');
          return false
        }
      },
      // 图片上传成功
      handleSuccess(response,file,fileList){
        console.log(fileList);
        console.log(response);
        file.httpUrl = response.data.path;
        this.$emit('handleImgList',fileList);
        this.$emit('uploadSuccess',response)
        // this.upSuccessUrl = response.data.path;
      },
      // 查看上传的图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>

<template>
  <section>
    <el-upload
      :action="upUrl"
      :auto-upload="true"
      list-type="picture-card"
      :limit="imgLimit"
      ref="upload"
      :data="upExtraData"
      :headers="upHeader"
      :file-list="imgList"
      :before-upload="handleBefore"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :on-success="handleSuccess"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<style scoped>

</style>
