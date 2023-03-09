<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateBtnFn"
          >添加分类</el-button
        >
      </div>
      <el-table :data="cateList" style="width: 100%" border stripe>
        <el-table-column label="序号" width="100" type="index">
        </el-table-column>
        <el-table-column prop="cate_name" label="分类名称"> </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateCateBtnFn(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="delCateFn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title=title :visible.sync="dialogVisible" width="30%" @close="dialogCloseFn">
      <el-form :model="addForm" :rules="addRules" ref="addRef" label-width="80px">
        <el-form-item label="分类名称" prop= "cate_name">
          <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop= "cate_alias">
          <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmFn"
          >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getArtCateListAPI, addArtCateAPI, updateArtCateAPI, delArtCateAPI } from '@/api'
export default {
  components: {},
  props: {},
  name: 'ArtCate',
  data () {
    return {
      cateList: [],
      dialogVisible: false,
      addForm: {
        cate_name: '',
        cate_alias: ''
      },
      title: '',
      isEdit: false,
      editId: '',
      addRules: {
        cate_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
        ],
        cate_alias: [
          { required: true, message: '请输入分类别名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母数字', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    async getArtCateFn () {
      const { data: res } = await getArtCateListAPI()
      // console.log(res)
      this.cateList = res.data
    },
    // 添加分类里的确认
    confirmFn () {
      this.$refs.addRef.validate(async valid => {
        if (valid) {
          if (this.isEdit === false) {
            // 要新增
            const { data: res } = await addArtCateAPI(this.addForm)
            // console.log(res)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          } else {
            // 要修改
            this.addForm.id = this.editId
            const { data: res } = await updateArtCateAPI(this.addForm)
            if (res.code !== 0) return this.$message.error(res.message)
            this.$message.success(res.message)
          }
          this.getArtCateFn()
          this.dialogVisible = false
        } else {
          return false
        }
      })
    },
    // 添加分类按钮
    addCateBtnFn () {
      this.dialogVisible = true
      this.isEdit = false
      this.editId = ''
      this.title = '添加文章分类'
    },
    // 对话框关闭时的回调
    dialogCloseFn () {
      this.$refs.addRef.resetFields()
    },
    // 修改按钮
    updateCateBtnFn (obj) {
      // console.log(obj)
      this.dialogVisible = true
      this.title = '修改文章分类'
      this.isEdit = true
      this.editId = obj.id
      // 真实dom更新完后在进行数据回显
      this.$nextTick(() => {
        // 数据回显
        this.addForm.cate_name = obj.cate_name
        this.addForm.cate_alias = obj.cate_alias
      })
    },
    // 删除分类
    async delCateFn (obj) {
      const { data: res } = await delArtCateAPI(obj.id)
      // console.log(res)
      if (res.code !== 0) return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getArtCateFn()
    }
  },
  created () {
    this.getArtCateFn()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
