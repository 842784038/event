<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
            <el-option v-for="item in cateList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="choseFn">筛选</el-button>
            <el-button type="info" size="small" @click="resetFn">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>
      <!-- 文章表各区域 -->
      <el-table :data="artList" style="width: 100%;" border stripe>
        <el-table-column label="文章标题" prop="title">
          <template v-slot="scope">
            <el-link type="info" :underline="false" @click="showDetailFn(scope.row.id)"> <i class="el-icon-view el-icon--right" style="margin-right: 20px; color: blue;"></i>{{ scope.row.title }} </el-link>
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="cate_name"></el-table-column>
        <el-table-column label="发表时间" prop="pub_date">
          <template v-slot="scope">
            <span>{{ $formatDate(scope.row.pub_date) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="danger" size="mini" @click="removeFn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChangeFn"
        @current-change="handleCurrentChangeFn"
        background
        :current-page.sync="q.pagenum"
        :page-sizes="[2,3,5,10]"
        :page-size.sync="q.pagesize"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
        hide-on-single-page>
      </el-pagination>
      <!-- 发表文章的 Dialog 对话框 -->
      <el-dialog
        title="发表文章"
        :visible.sync="pubDialogVisible"
        fullscreen
        :before-close="handleClose"
        @close="dialogCloseFn"
      >
        <el-form :model="pubForm" :rules="pubFormRules" ref="pubFormRef" label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文章分类" prop="cate_id">
            <el-select
              v-model="pubForm.cate_id"
              placeholder="请选择分类"
              style="width: 100%;"
            >
              <el-option v-for="item in cateList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章内容" prop="content">
            <quill-editor v-model="pubForm.content" @blur="contentChangeFn"></quill-editor>
          </el-form-item>
          <el-form-item prop="cover_img">
            <img src="../../assets/images/cover.jpg" alt="" class="cover-img" ref="imgRef">
            <br />
            <!-- 文件选择框，默认隐藏 -->
            <input type="file" style="display: none" accept="image/*" ref="iptFileRef" @change="changeCoverFn">
            <!-- 选择封面按钮 -->
            <el-button type="text" @click="selCoverFn"><i class="el-icon-plus"></i>选择封面</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="pubArticleFn('已发布')">发布</el-button>
            <el-button type="info" @click="pubArticleFn('草稿')">存为草稿</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 文章详情对话框 -->
      <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
        <h1 class="title">{{ artDetail.title }}</h1>
        <div class="info">
          <span>作者：{{ artDetail.nickname || artDetail.username }}</span>
          <span>发布时间：{{ $formatDate(artDetail.pub_date) }}</span>
          <span>所属分类：{{ artDetail.cate_name }}</span>
          <span>状态：{{ artDetail.state }}</span>
        </div>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 文章封面 -->
        <img v-if="artDetail.cover_img" :src="baseURL +artDetail.cover_img" alt="">
        <!-- 文章内容 -->
        <div v-html="artDetail.content" class="detail-box"></div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getArtCateListAPI, uploadArticleAPI, getArticleListAPI, getArtDetailAPI, delArticleAPI } from '@/api'
import { baseURL } from '@/utils/request'
import imgObj from '../../assets/images/cover.jpg'
export default {
  name: 'my-artList',
  data () {
    return {
      q: {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
      },
      pubForm: {
        title: '',
        tate_id: '',
        content: '',
        cover_img: '',
        state: ''
      },
      pubFormRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          {
            min: 1,
            max: 30,
            message: '文章标题的长度为1-30个字符',
            trigger: 'blur'
          }
        ],
        cate_id: [
          { required: true, message: '请选择文章标题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'change' }
        ],
        cover_img: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ]
      }, // 发布文章验证规则
      pubDialogVisible: false,
      cateList: [], // 后台返回分类数据
      artList: [],
      total: 0,
      detailVisible: false,
      artDetail: {}, // 文章详情
      baseURL // 服务器地址
    }
  },
  created () {
    // 请求分类数据
    this.initCateList()
    // 请求列表数据
    this.initArtListFn()
  },
  methods: {
    // 文章列表数据
    async initArtListFn () {
      const { data: res } = await getArticleListAPI(this.q)
      if (res.code !== 0) return this.$message.error('获取文章列表失败!')
      this.artList = res.data
      this.total = res.total
    },
    // 发布文章点击事件
    showPubDialogFn () {
      this.pubDialogVisible = true
    },
    // 对话框关闭前的回调
    async handleClose (done) {
      // 询问用户是否确认关闭对话框
      const confirmResult = await this.$confirm(
        '此操作将导致文章信息丢失, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      // 取消了关闭-阻止住, 什么都不干
      if (confirmResult === 'cancel') return
      // 确认关闭
      done()
    },
    // 获取文章分类列表
    async initCateList () {
      const { data: res } = await getArtCateListAPI()
      // console.log(res)
      if (res.code === 0) { this.cateList = res.data }
    },
    // 选择封面点击事件
    selCoverFn () {
      this.$refs.iptFileRef.click()
    },
    // 选择封面文件
    changeCoverFn (e) {
      const files = e.target.files
      if (files.length === 0) {
        this.pubForm.cover_img = null
        this.$refs.imgRef.setAttribute('src', imgObj)
      } else {
        this.pubForm.cover_img = files[0]
        // 把图片显示
        const url = URL.createObjectURL(files[0])
        this.$refs.imgRef.setAttribute('src', url)
      }
      this.$refs.pubFormRef.validateField('cover_img')
    },
    // 提交数据点击按钮
    pubArticleFn (str) {
      this.pubForm.state = str
      // 兜底校验
      this.$refs.pubFormRef.validate(async valid => {
        if (valid) {
          // console.log(this.pubForm)
          const fd = new FormData()
          fd.append('title', this.pubForm.title)
          fd.append('cate_id', this.pubForm.cate_id)
          fd.append('content', this.pubForm.content)
          fd.append('cover_img', this.pubForm.cover_img)
          fd.append('state', this.pubForm.state)
          const { data: res } = await uploadArticleAPI(fd)
          console.log(res)
          if (res.code !== 0) return this.$message.error('发布文章失败')
          this.$message.success('发布文章成功')
          // 关闭对话框
          this.pubDialogVisible = false
          // 刷新数据
          this.initArtListFn()
        } else {
          return false
        }
      })
    },
    // 富文本校验
    contentChangeFn () {
      this.$refs.pubFormRef.validateField('content')
    },
    // 新增文章对话框关闭时，清空表单
    dialogCloseFn () {
      this.$refs.pubFormRef.resetFields()
      this.$refs.imgRef.setAttribute('src', imgObj)
    },
    handleSizeChangeFn () {
      this.q.pagenum = 1
      this.initArtListFn()
    },
    handleCurrentChangeFn () {
      this.initArtListFn()
    },
    // 筛选按钮
    choseFn () {
      this.q.pagenum = 1
      this.q.pagesize = 3
      this.initArtListFn()
    },
    // 重置按钮
    resetFn () {
      this.q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
      }
      this.initArtListFn()
    },
    // 文章详情
    async showDetailFn (artId) {
      this.detailVisible = true
      const { data: res } = await getArtDetailAPI(artId)
      // console.log(res)
      this.artDetail = res.data
    },
    // 删除文章
    async removeFn (artId) {
      const { data: res } = await delArticleAPI(artId)
      // console.log(res)
      if (res.code !== 0) return this.$message.error(this.message)
      this.$message.success('删除文章成功')
      if (this.artList.length === 1) {
        if (this.q.pagenum > 1) {
          this.q.pagenum--
        }
      }
      this.initArtListFn()
    }
  }
}
</script>
<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
// 设置富文本编辑器的默认最小高度
// ::v-deep作用: 穿透选择, 正常style上加了scope的话, 会给.ql-editor[data-v-hash]属性, 只能选择当前页面标签或者组件的根标签
// 如果想要选择组件内的标签(那些标签没有data-v-hash值)所以正常选择选不中, 加了::v-deep空格前置的话, 选择器就会变成如下形式
// [data-v-hash] .ql-editor 这样就能选中组件内的标签的class类名了
::v-deep .ql-editor {
  min-height: 300px;
}
// 设置图片封面的宽高
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
.el-pagination{
  padding-top: 20px;
}
</style>
