<template>
  <div class="article_all">
    <div class="flex justify-between items-center">
      <el-menu :default-active="activeIndex" class="el-menu-demo w-1/3" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">文章管理</template>
          <el-menu-item index="1-1">分类列表</el-menu-item>
          <el-menu-item index="1-2"><router-link  to="FenLeiOperate">分类管理</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><router-link  to="UserList">用户管理</router-link></el-menu-item>
      </el-menu>
      <div class="w-1/3 flex searchBox">
        <!-- <input type="text" class="w-4/5 border" placeholder="输入用户手机号"> -->
        <el-form ref="form" label-width="70px">
          <el-form-item
            label="选择分类"
          >
            <el-cascader
              v-model="selectfenid"
			  :placeholder="selectfenleiName"
              @change="getFenLeiList()"
              clearable
              :options="fenleiAll"
              :props="SetKesDept"
			  ref="myCascader"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-if="status ==9" class="flex w-1/3 float-left">
      <span class="px-2 py-2 cursor-pointer hover:text-blue-500 text-sm" @click="goBackList">返回文章列表</span>
    </div>
    <div class="flex w-1/3 float-right">
      <el-button class="mr-3" type="primary" size="mini" plain>
        <router-link  to="ArticleUpload">上传新文章</router-link>
      </el-button>
      <el-button type="primary" size="mini" icon="el-icon-delete" @click="deleteAction" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
    </div>
    <div class="mt-10">
      <el-main>
        <el-table :data="tableData" stripe height="500" :header-row-style="{height:'40px'}" :row-style="{height:'40px'}">
          <el-table-column prop="id" label="ID" width="100" height="50">
          </el-table-column>
          <el-table-column prop="title" label="文章名标题" width="300">
          </el-table-column>
          <el-table-column prop="actionTitle" label="文章分类" width="150">
          </el-table-column>
          <el-table-column prop="createdTime" label="上传时间" width="150">
          </el-table-column>
          <el-table-column v-if="status == 9" prop="updateTime" label="删除时间" width="100">
          </el-table-column>
          <el-table-column label="操作" :width="status==1? '300':'150' ">
            <template slot-scope="scope">
              <el-button v-if="status ==1" type="primary" size="mini" round @click="updateNewsAction(scope.$index, scope.row)">编辑文章</el-button>
              <el-button v-if="status ==1" type="danger" size="mini" round @click="deleteNewsAction(scope.$index, scope.row)">删除文章</el-button>
              <el-button v-if="status ==9" type="primary" size="mini" round @click="reviewAction(scope.$index, scope.row)">恢复文章</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
	  <el-pagination
		  background
		  class="mb-10 text-center"
		  layout="prev, pager, next"
		  @current-change="getFenLeiList"
		  :page-size="pagesize"
		  :current-page.sync="currentPage"
		  :total="this.total">
	  </el-pagination>
    </div>
  </div>
</template>

<script>
import {selectActionBack} from '@/api/api/AgreementRequest.js' // 查询文章类型
import {deleteNews} from '@/api/api/AgreementRequest.js' // 删除文章
import {recoveryNews} from '@/api/api/AgreementRequest.js' // 恢复文章
import {selectNews,selectFaIDNews} from '@/api/api/AgreementRequest.js' // 查询文章
import {selectFaIDNewsBack} from '@/api/api/AgreementRequest.js' // 通过分类查询文章
export default{
  name: 'Article',
  data () {
    return {
      SetKesDept: { // 自定义  级联选择器value label
        value: 'id',
        label: 'title',
        children: 'data',
        checkStrictly: true
      },
      activeIndex: '1',
      tableData: [],
      status: 1,
      fenleiAll: [], // 全部分类
      selectFenLei: null, // 已选分类数组
	  selectfenid: null, // 已选分类ID
	  selectfenleiName: '', // 已选分类名称
      fullscreenLoading: false ,// 加载图标
	  // 分页
	  first_page_url: '',
	  last_page_url: '',
	  next_page_url: '',
	  path: '',
	  from: 1,
	  per_page: null,
	  last_page: null,
	  userList: [],
	  currentPage: 1, // 初始页
	  pagesize: 10, //    每页的数据
	  total: 0, // 总页数
    }
  },
  mounted () {
    this.getFenlei()
    this.getFenLeiList()
  },
  methods: {
    getFenlei () { // 查询分类汇总
      selectActionBack().then((data) => {
        this.fenleiAll = data.data
      })
    },
    goBackList () { // 返回文章列表
      this.status = 1
      this.getFenLeiList()
    },
    getFenLeiList () { // 查询总文章
	  var that = this;
	  that.total = null;
	  that.tableData = []
      this.fullscreenLoading = true;
	  console.log(that.selectfenid)
      if (that.selectfenid != null && that.selectfenid.length != 0) {
		that.selectfenid = this.$refs["myCascader"].getCheckedNodes()[0].value;
		that.selectfenleiName = this.$refs["myCascader"].getCheckedNodes()[0].label;
        selectFaIDNews({
          status: 1,
          faId: that.selectfenid,
		  page: this.currentPage
        }).then((data) => {
          this.tableData = data.data.data.data;
		  that.total = data.data.data.total;
          this.fullscreenLoading = false;
		  this.$refs.myCascader.dropDownVisible = false;
        })
      } else {
        selectNews({
          status: 1,
		  page: this.currentPage
        }).then((data) => {
          this.tableData = data.data.data.data
		  that.total = data.data.data.total;
          this.fullscreenLoading = false
        })
      }
    },
    deleteAction () { // 点击回收站按钮
	  var that = this;
      this.fullscreenLoading = true
      this.tableData = []
	  that.total = null;
      this.status = 9
      if (that.selectfenid != null && that.selectfenid.length != 0) {
		that.selectfenid = this.$refs["myCascader"].getCheckedNodes()[0].value;
		that.selectfenleiName = this.$refs["myCascader"].getCheckedNodes()[0].label;
        selectFaIDNews({
          status: 9,
          faId: that.selectfenid,
		  page: this.currentPage
        }).then((data) => {
          this.fullscreenLoading = false
          this.tableData = data.data.data.data
		  that.total = data.data.data.total;
		  this.$refs.myCascader.dropDownVisible = false;
        })
      } else {
        selectNews({
          status: 9
        }).then((data) => {
          that.fullscreenLoading = false
          that.tableData = data.data.data.data
		  that.total = data.data.data.total;
        })
      }
    },
    deleteNewsAction (index, rows) { // 删除文章
      this.$confirm('确认删除此文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteNews({
          id: rows.id
        }).then((data) => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateNewsAction (index, rows) { // 更新文章
      this.$router.push({
        path: '/ArticleUpload',
        name: 'ArticleUpload',
        params: {
          rows: rows.id
        }
      })
    },
    reviewAction (index, rows) { // 恢复文章
      this.$confirm('确认恢复此文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        recoveryNews({
          id: rows.id
        }).then((data) => {
          this.tableData.splice(index, 1)
          this.$message({
            type: 'success',
            message: '恢复成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消恢复'
        })
      })
    },
	// 初始页currentPage、初始每页数据数pagesize和数据data
	// 上一页
	nextClick () {
	  console.log('下一页')
	},
	prevClick () {
	  console.log('上一页')
	},
	// pagesize (size) {
	//   this.pagesize = size
	// },
	handleCurrentChange (currentPage) {
	  this.currentPage = currentPage// 点击第几页
	}
  }
}
</script>

<style scoped>
.article_all{
  width: 1080px;
  margin:20px auto;
}
.searchBox{
  align-items: center;

}
.searchBox .search_icon{margin-bottom: 20px;margin-left: 10px;}
</style>
