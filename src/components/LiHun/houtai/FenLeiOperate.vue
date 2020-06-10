<template>
  <div class="article_all">
    <div class="flex justify-between items-center">
      <el-menu :default-active="activeIndex" class="el-menu-demo w-1/3" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">文章管理</template>
          <el-menu-item index="1-1"><router-link  to="Article">分类列表</router-link></el-menu-item>
          <el-menu-item index="1-2">分类管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><router-link  to="UserList">用户管理</router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="flex w-full justify-end py-2">
      <el-button size="mini" type="primary" @click="addFenLei">新增分类</el-button>
      <el-button class="mx-3" type="primary" size="mini" plain>
        <router-link  to="ArticleUpload">上传新文章</router-link>
      </el-button>
      <!-- <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteAction" v-loading.fullscreen.lock="fullscreenLoading"></el-button> -->
    </div>
    <div class=" w-full mx-auto">
      <h2 class="py-3 text-blue-500" v-loading.fullscreen.lock="fullscreenLoading">分类列表</h2>
      <el-table
        :data="fenleiAll"
        row-key="id"
        stripe
        height="400"
        :header-row-style="{height:'40px'}"
        :row-style="{height:'40px'}"
        default-expand-all
        :tree-props="{children: 'data'}">
        <el-table-column
          prop="id"
          label="ID"
          sortable
          height="50"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="分类名称"
          sortable
          width="250">
        </el-table-column>
        <el-table-column
          prop="description"
          label="分类描述"
          width="350">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round @click="updateFenLei(scope.$index, scope.row)">编辑分类</el-button>
            <el-button type="primary" size="mini" round @click="addChildFenLei(scope.$index, scope.row)">添加子分类</el-button>
            <el-button type="danger" size="mini" round @click="deleteFenLei(scope.$index, scope.row)">删除分类</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="py-4">
        
      </div>
    </div>
    <!-- 新增分类 -->
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible">
      <el-form :model="actionForm">
        <el-form-item label="分类标题" :label-width="formLabelWidth">
          <el-input v-model="actionForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类简介" :label-width="formLabelWidth">
          <el-input v-model="actionForm.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="this.addChild" type="primary" @click="addChildActionBtn">确 定</el-button>
        <el-button v-if="this.addChild == false" type="primary" @click="addActionBtn">确 定</el-button>

      </div>
    </el-dialog>
    <!-- 修改分类 -->
    <el-dialog title="修改分类" :visible.sync="updateDialogFormVisible">
      <el-form :model="actionForm">
        <el-form-item label="分类标题" :label-width="formLabelWidth">
          <el-input v-model="actionForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类简介" :label-width="formLabelWidth">
          <el-input v-model="actionForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-select v-model="actionForm.faId" placeholder="请选择父级分类">
            <el-option v-for="(item, index) in fenleiAll" :key="index" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateActionBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addAction} from '@/api/api/AgreementRequest.js' // 新增文章类型
import {deleteAction} from '@/api/api/AgreementRequest.js' // 删除文章类型
import {selectAction} from '@/api/api/AgreementRequest.js' // 查询文章类型
import {updateAction} from '@/api/api/AgreementRequest.js' // 修改文章类型

export default{
  name: 'ArticleUpload',
  data () {
    return {
      activeIndex: '1-2',
      fullscreenLoading: false, // 加载图标
      addChild: false, // 添加子分类
      fenleiAll: [], // 文章分类汇总
      dialogFormVisible: false, // 新增表单弹框
      updateDialogFormVisible: false, // 修改类型弹框
      formLabelWidth: '120px',
      actionForm: {
        title: '', // 标题
        description: '', // 简介
        faId: null, // 父ID
        id: null
      }
    }
  },
  mounted () {
    this.getFenlei() // 查询分类
  },
  methods: {
    getFenlei () { // 查询分类汇总
      this.fullscreenLoading = true
      selectAction().then((data) => {
        this.fullscreenLoading = false
        this.fenleiAll = data.data
      })
    },
    addFenLei () { // 新增分类
      this.dialogFormVisible = true
      this.actionForm.title = ''
      this.actionForm.description = ''
    },
    addActionBtn () { // 添加分类确认按钮
      addAction({
        title: this.actionForm.title,
        description: this.actionForm.description
      }).then((data) => {
        this.dialogFormVisible = false
        this.getFenlei()
      })
    },
    addChildFenLei (index, row) { // 添加子分类
      this.addChild = true
      this.dialogFormVisible = true
      this.actionForm.title = ''
      this.actionForm.description = ''
      this.actionForm.faId = row.id
    },
    addChildActionBtn () {
      addAction({
        title: this.actionForm.title,
        description: this.actionForm.description,
        faId: this.actionForm.faId
      }).then((data) => {
        this.dialogFormVisible = false
        this.getFenlei()
        this.addChild = false
      })
    },
    updateFenLei (index, row) { // 编辑分类
      this.updateDialogFormVisible = true
      // this.actionForm = {}
      this.actionForm.faId = row.faId
      this.actionForm.title = row.title
      this.actionForm.description = row.description
      localStorage.setItem('id', row.id)
    },
    updateActionBtn () {
      updateAction({
        title: this.actionForm.title,
        description: this.actionForm.description,
        faId: this.actionForm.faId
      }).then((data) => {
        this.updateDialogFormVisible = false
        this.getFenlei()
        localStorage.removeItem('id')
      })
    },
    deleteFenLei (index, row) { // 删除分类
      localStorage.setItem('id', row.id)
      this.$confirm('确认删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullscreenLoading = true
        deleteAction().then((data) => {
          this.fullscreenLoading = false
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getFenlei()
          localStorage.removeItem('id')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  }
}
</script>

<style scoped>
.article_all{
  width: 1080px;
  margin:20px auto;
}
</style>
