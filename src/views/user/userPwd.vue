<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <el-form
      :model="pwdForm"
      status-icon
      :rules="pwdFormRules"
      ref="pwdFormRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input type="password" v-model="pwdForm.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input type="password" v-model="pwdForm.new_pwd"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input type="password" v-model="pwdForm.re_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePwdFn">修改密码</el-button>
        <el-button @click="resetFn">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { updatePwdAPI } from '@/api'
export default {
  data () {
    // 原密码与新密码不能相同
    const samePwd = (rules, value, callback) => {
      if (value === this.pwdForm.old_pwd) {
        callback(new Error('新旧密码不能相同'))
      } else {
        callback()
      }
    }
    // 新密码与确认密码必须相同
    const rePwd = (rules, value, callback) => {
      if (value !== this.pwdForm.re_pwd) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      pwdForm: {
        old_pwd: '',
        new_pwd: '',
        re_pwd: ''
      },
      pwdFormRules: {
        old_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15非空字符串',
            trigger: 'blur'
          }
        ],
        new_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15非空字符串',
            trigger: 'blur'
          },
          { validator: samePwd, trigger: 'blur' }
        ],
        re_pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^\S{6,15}$/,
            message: '密码长度必须是6-15非空字符串',
            trigger: 'blur'
          },
          { validator: rePwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    updatePwdFn () {
      this.$refs.pwdFormRef.validate(async valid => {
        // 未通过校验
        if (!valid) return false
        const { data: res } = await updatePwdAPI(this.pwdForm)
        if (res.code !== 0) return this.$message.error('旧密码不正确')
        this.$message.success('更新密码成功')
        this.$refs.pwdFormRef.resetFields()
        this.$store.commit('updateToken', '')
        this.$store.commit('updateUserInfo', {})
        this.$router.push('/login')
      })
    },
    resetFn () {
      this.$refs.pwdFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
