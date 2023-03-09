<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <img v-if="!avatar" class="the_img" src="../../assets/images/avatar.jpg" alt="">
      <img v-else :src="avatar" class="the_img" alt="">
      <div class="btn-box">
        <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="onFileChange">
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg">选择图片</el-button>
        <el-button type="success" icon="el-icon-upload" :disabled="avatar === ''" @click="uploadFn">上传头像</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatarAPI } from '@/api'
export default {
  components: {},
  props: {},
  data () {
    return {
      avatar: '' // 存储图片base64字符串地址或图片链接
    }
  },
  watch: {},
  computed: {},
  methods: {
    chooseImg () {
      this.$refs.iptRef.click()
    },
    onFileChange (e) {
      // console.log(e)
      const files = e.target.files
      // console.log(files)
      if (files.length === 0) {
        this.avatar = ''
      } else {
      // 选择了图片
      // 文件转链接
        // this.avatar = URL.createObjectURL(files[0])
      // 文件转base64字符串
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload = e => {
          // e.target.result的值就是base64的地址
          this.avatar = e.target.result
        }
      }
    },
    async uploadFn () {
      const { data: res } = await updateUserAvatarAPI(this.avatar)
      if (res.code !== 0) return this.$message.error('上传失败')
      this.$message.success('上传成功')
      this.$store.dispatch('getUserInfoActions')
      // 更新vuex的值
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img{
    width: 350px;
    height: 350px;
}
</style>
