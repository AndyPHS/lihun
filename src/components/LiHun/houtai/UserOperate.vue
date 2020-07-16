<template>
  <div class="article_all">
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1"><router-link  to="Article">文章管理</router-link></el-menu-item>
        <el-menu-item index="2">用户管理</el-menu-item>
      </el-menu>
      <div class="w-1/3 py-2">
        <div class="goback">
          <img class="mr-2" src="../../../assets/images/goback_icon.png" alt="">
          <span class="text-sm" @click="backUserList">返回用户列表</span>
        </div>
      </div>
    </div>
    <div>
      <p class="text-left ml-2 text-sm">
        <span class="text-2xl">浏览文章信息</span>
        <span class="mx-1">{{ user.name }}</span>
        <span>{{ user.created_at }}</span>注册，
        文书数量: <span>{{ user.qqpucount }},</span>
        手机号：<span class="mr-2">{{ user.phone }},</span>
        邮箱：<span class="mr-2">{{ user.email }}</span>
      </p>
    </div>
    <div>
      <el-main>
        <el-table :data="userMsg" stripe height="500" :header-row-style="{height:'40px'}" :row-style="{height:'40px'}">
          <el-table-column prop="key_word" label="站内搜索关键词" width="150" height="50">
          </el-table-column>
          <el-table-column prop="newsTitle" label="浏览文章名称" width="300">
          </el-table-column>
          <el-table-column prop="actionTitle" label="文章类别" width="150">
          </el-table-column>
          <el-table-column prop="created_time" label="打开时间" width="100">
          </el-table-column>
		  <el-table-column prop="stop_time" label="关闭时间" width="100">
		  </el-table-column>
          <el-table-column prop="source" label="文章来源" width="300">
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<script>
import {selectUserNewsLog} from '@/api/api/AgreementRequest.js'
 export default{
   name: 'UserOperate',
   data() {
     const item = {
       date: '2016-05-02',
       name: '王小虎',
       address: '测试',
       id: 1
     };
     return {
       activeIndex: '2',
       phoneVal: null, // 输入手机号查找
       tableData: Array(20).fill(item),
       row: null,
       user: {},  // 用户信息
       userMsg: []  // 用户信息
     }
   },
   methods: {
     getParams () {
       // 取到路由带过来的参数
       let routerParams = this.$route.params
       // 将数据放在当前组件的数据内
       this.user = routerParams
	   // 将数据放在当前组件的数据内
	   this.row = routerParams.row
	   selectUserNewsLog({
		   uid: this.row
	   }).then((data) => {
		   this.userMsg = data.data.data
		   
	   })
     },
     backUserList () {
       this.$router.push({
         path: '/UserList',
         name: 'UserList'
       })
     },
	  DateDiff(d1,d2){ // 时间差
	     var day = 24 * 60 * 60 *1000;
		 try{    
				 var dateArr = d1.split("-");
			var checkDate = new Date();
				 checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
			var checkTime = checkDate.getTime();
		   
			var dateArr2 = d2.split("-");
			var checkDate2 = new Date();
				 checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
			var checkTime2 = checkDate2.getTime();
			 
			var cha = (checkTime - checkTime2)/day;  
				 return cha;
			 }catch(e){
			return false;
		 }
	 }
   },
   mounted () {
     this.getParams ()
   },
   watch: {
   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
     '$route': 'getParams'
   }

 }
</script>

<style scoped>
.article_all{
  width: 1080px;
  margin:20px auto;
}
.goback{display: flex;align-items: center;cursor: pointer; color: #0066CC; padding: 10px;}
.goback:hover{color: #0055AA;}
</style>
