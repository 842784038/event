<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <el-form
      ref="userFormRef"
      :model="userForm"
      :rules="userFormRules"
      label-width="100px"
    >
      <el-form-item prop="username" label="登录名称">
        <el-input
          placeholder="登录名称"
          v-model="userForm.username"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item prop="nickname" label="用户昵称">
        <el-input placeholder="用户昵称" v-model="userForm.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="用户邮箱">
        <el-input placeholder="用户邮箱" v-model="userForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFn">提交修改</el-button>
        <el-button @click= 'resetFn'>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updateUserInfoAPI } from '@/api'
export default {
  name: 'UserInfo',
  components: {},
  props: {},
  data () {
    return {
      userForm: {
        username: this.$store.state.userInfo.username,
        nickname: '',
        email: ''
      },
      userFormRules: {
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '昵称必须是1-10的非空字符串', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    submitFn () {
      this.$refs.userFormRef.validate(async valid => {
        if (valid) {
          console.log(this.userForm)
          // 缺少id，所以添加一个
          this.userForm.id = this.$store.state.userInfo.id
          const { data: res } = await updateUserInfoAPI(this.userForm)
          if (res.code !== 0) return this.$message.error('更新用户信息失败')
          this.$message.success('更新成功')
          // 重新更新一下vuex的数据
          this.$store.dispatch('getUserInfoActions')
        } else {
          return false
        }
      })
    },
    resetFn () {
      this.$refs.userFormRef.resetFields()
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
