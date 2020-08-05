<template>
  <div class="article_all">
    <div class="flex justify-between items-center">
      <el-menu :default-active="activeIndex" class="el-menu-demo w-1/3" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">文章管理</template>
          <el-menu-item index="1-1"><router-link  to="Article">分类列表</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link  to="FenLeiOperate">分类管理</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="2">用户管理</el-menu-item>
      </el-menu>
      <div class="w-1/3 flex searchBox">
        <!-- <input type="text" class="w-4/5 border" placeholder="输入用户手机号"> -->
        <el-form ref="form" label-width="70px">
          <el-form-item
            label="快速查找">
            <el-col :span="24">
              <el-input v-model="phoneVal" size="mini" type="number" placeholder="输入用户手机号" ref="formPhoneVal"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="cursor-pointer search_icon">
          <img @click="searchAc" src="../../../assets/images/search_icon.png" alt="">
        </div>
      </div>
    </div>

    <div>
      <el-main>
        <el-table :data="pageInfo" stripe height="500" :header-row-style="{height:'40px'}" :row-style="{height:'40px'}">
          <el-table-column prop="id" label="ID" width="80" height="50">
          </el-table-column>
          <el-table-column prop="name" label="用户名" width="80">
          </el-table-column>
          <el-table-column prop="created_at" label="注册时间" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="150">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="150">
          </el-table-column>
          <!-- <el-table-column prop="name" label="购买次数" width="80">
          </el-table-column>
          <el-table-column prop="name" label="购买时间" width="120">
          </el-table-column> -->
          <el-table-column prop="name" label="上次登录时间" width="120">
          </el-table-column>
          <el-table-column prop="name" label="文书信息" width="120">
            <template slot-scope="scope">
              <el-button type="success" size="mini" round @click="GoUserWenShu(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="操作日志" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" round @click="GoUserOperate(scope.$index, scope.row)">日志</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
	  <el-pagination
	      background
	      class="my-10"
	      layout="prev, pager, next"
	      @current-change="handleUserList"
	      :page-size="pagesize"
	      :current-page.sync="currentPage"
	      :total="this.min.total">
	  </el-pagination>
    </div>
	<div v-if="dengluerrorBox==true" class="fixed errorBox">
		{{errorMsg}}
	</div>
  </div>
</template>

<script>
import {selectUserBack, selectUserBackByPhone} from '@/api/api/AgreementRequest.js'
 export default{
   name: 'UserList',
   data() {
     const item = {
       date: '2016-05-02',
       name: '王小虎',
       address: '测试',
       id: 1
     };
     return {
       activeIndex: '2',
	   dengluerrorBox: false,
	   errorMsg: '',
       phoneVal: null, // 输入手机号查找
       tableData: Array(20).fill(item),
	   pageInfo:[
	    {
	       created_at: " ",
	       email: " ",
	       fid: null,
	       id: null,
	       last_login: null,
	       name: " ",
	       password: " ",
	       phone: " ",
	       photo: " ",
	       qqpucount: null,
	       remember_token: null,
	       sex: null,
	       status: null,
	       type: null,
	       updated_at: " "
	    }
	   ],
	   currentPage:1, //初始页
	   pagesize:20,    //    每页的数据
	   pageNum: 1, // 第几页
	   min: '',
     }
   },
   mounted () {
     this.handleUserList()   //获取用户列表
   },
   methods: {
	 handleUserList () { // 获取用户
	     selectUserBack({page:this.currentPage}).then((data)=>{
	         this.pageInfo = data.data.data.data
	         this.min = data.data.data
	     }).catch((data)=>{
	         this.$router.replace("/");
	     })
	 },
	 handleSizeChange (size) {   // 点击分页
	     this.pagesize = size;
	 },
	 handleCurrentChange (currentPage) {    //点击哪一页
	     this.currentPage = currentPage;
	 },
     GoUserWenShu(index, row) { // 跳转文书下载历史界面
       this.$router.push({
         path: '/UserWenShu',
         name: 'UserWenShu',
         params: {
           row: row.id,
		   name: row.name,
		   created_at: row.created_at,
		   phone: row.phone,
		   email: row.email
		   
         }
       })
       // console.log(row.id)
     },
     GoUserOperate(index,row) { // 跳转用户操作历史界面
	   // localStorage.setItem('uid',row.id)
       this.$router.push({
         path: '/UserOperate',
         name: 'UserOperate',
         params: {
           row: row.id,
		   name: row.name,
		   created_at: row.created_at,
		   phone: row.phone,
		   email: row.email,
		   qqpucount: row.qqpucount
         }
       })
     },
	 searchAc(){
		 if(!(/^1[3456789]\d{9}$/.test(this.phoneVal))){
			this.dengluerrorBox = true
			this.errorMsg = '手机号有误，请重新填写'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.formPhoneVal.focus()
			return false; 
		 } else {
			 selectUserBackByPhone({
				 page:this.currentPage,
				 phone:this.phoneVal
			 }).then((data)=>{
				 this.pageInfo = data.data.data.data
				 this.min = data.data.data
			 }).catch((data)=>{
				 this.$router.replace("/");
			 })
		 }
		 
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
.errorBox{width: 300px;height: 48px;line-height: 48px;background-color:#feebef;color:#f81b1b;z-index: 3000;top:20px;left: 50%;margin-left: -150px;font-size: 15px;border-radius: 5px;}
</style>
