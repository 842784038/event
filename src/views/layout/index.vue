<template>
  <el-container class="main-contatiner">
    <el-header>
      <img src="../../assets/images/logo.png" alt="" />
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <img src="../../assets/images/logo.png" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="logoutFn">
          <i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div>
          <img :src="user_pic" alt="" v-if="user_pic" class="avatar" />
          <img
            src="../../assets/images/logo.png"
            alt=""
            v-else
            class="avatar"
          />
          <span>欢迎{{ nickname || username }}</span>
        </div>
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
        >
          <template v-for="item in menus">
            <el-menu-item v-if="!item.children" :index="item.indexPath" :key="item.indexPath">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
            <el-submenu v-else :index="item.indexPath" :key="item.indexPath">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="obj in item.children" :index="obj.indexPath" :key="obj.indexPath">
                  <i :class="obj.icon"></i
                  ><span>{{obj.title}}</span></el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>@ www.itheima.com</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMenusListAPI } from '@/api'
export default {
  name: 'my-layout',
  components: {},
  props: {},
  data () {
    return {
      menus: []
    }
  },
  watch: {},
  computed: {
    ...mapGetters(['nickname', 'username', 'user_pic'])
  },
  methods: {
    logoutFn () {
      // 添加确认提示框
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 确定
        .then(() => {
          // 清除vuex
          this.$store.commit('updateToken', '')
          this.$store.commit('updateUserInfo', {})
          // 退出到login
          this.$router.push('./login')
        })
        // 取消
        .catch(() => {})
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async getMenuListFn () {
      const res = await getMenusListAPI()
      // console.log(res)
      this.menus = res.data.data
      // console.log(this.menus)
    }
  },
  created () {
    this.getMenuListFn()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.main-contatiner {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
    div {
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      user-select: none;
      span {
        color: #fff;
        font-size: 12px;
      }
    }
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    // 溢出 滚动
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.avatar {
  //圆角
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  // 填充图片的方法
  object-fit: cover;
}
</style>
