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
      <p class="text-left ml-2 text-sm py-3">
        <span class="mx-1">{{ user.name }}</span>
        <span class="ml-2">{{ user.created_at }}</span>注册，
        手机号：<span class="mx-2">{{ user.phone }},</span>
        邮箱：<span class="mx-2">{{ user.email }}</span>
       <!-- 购买次数: <span>1</span>次,
        购买时间: <span>2020.05.14</span> -->
      </p>
    </div>
    
	<div class="c_m_m">
		<div v-if="this.userMsg.length !== 0 " class="c_m_m_m ">
			<ul class="c_m_m_h flex justify-between items-center border-b-2">
				<li class="w-1/5 text-center leading-loose">id</li>
				<li class="w-1/5 text-center leading-loose">协议书名称</li>
				<li class="w-1/5 text-center leading-loose">协议书编号</li>
				<li class="w-1/5 text-center leading-loose">创建时间</li>
				<li class="w-1/5 text-center leading-loose">是否完成</li>
				<li class="w-1/5 text-center leading-loose">历史版本</li>
			</ul>
			<ul class="min_l">
				<li v-for="(item, index) in userMsg" :key="index">
					<ul class=" flex justify-between items-center border-b-2">
						<li class="w-1/5 text-center leading-loose">{{ index }}</li>
						<li class="w-1/5 text-center leading-loose">{{ item.title }}</li>
						<li class="w-1/5 text-center leading-loose">{{ item.agreement_number }}</li>
						<li class="w-1/5 text-center leading-loose">{{ item.createdTime }}</li>
						<li class="w-1/5 text-center leading-loose"><span v-if="item.complete ==1">是</span><span v-if="item.complete ==2">否</span></li>
						<li class="w-1/5 text-center leading-loose" ><span v-if="item.historys.length>0"  @click="checkHistory(index)" class="text-blue-400 hover\:text-blue-600 cursor-pointer">点击查看历史版本</span></li>
					</ul>
					<div v-if="historys == index" class="c_m_m_m_child">
						<ul>
							<li v-for="($item, $index) in item.historys" :key="$index">
								<ul class="text-gray-500 flex justify-between items-center border-b-2">
									<li class="w-1/5 text-center leading-loose">{{ $index }}</li>
									<li class="w-1/5 text-center leading-loose">{{ $item.title }}</li>
									<li class="w-1/5 text-center leading-loose">{{ $item.agreement_number }}</li>
									<li class="w-1/5 text-center leading-loose">{{ $item.createdTime }}</li>
									<li class="w-1/5 text-center leading-loose"><span v-if="$item.complete ==1">是</span><span v-if="$item.complete ==2">否</span></li>
									<li class="w-1/5 text-center leading-loose" ></li>
								</ul>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="this.userMsg.length == 0 " class="no_consult ">
			<div class="w py-40">
				<img class="inline-block mb-6" src="../../../assets/images/lihun/no_consult_icon.png" alt="">
				<h3 class="text-base text-center leading-loose">暂无协议书</h3>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import {selectOnlyUserQuestionnaire} from '@/api/api/AgreementRequest.js'
 export default{
   name: 'UserWenShu',
   data() {
     const item = {
       date: '2016-05-02',
       name: '王小虎',
       address: '测试'
     };
     return {
       activeIndex: '2',
       phoneVal: null, // 输入手机号查找
       tableData: Array(20).fill(item),
       row: null,
	   user: {},  // 用户信息
	   userMsg: [] ,// 用户信息
	   historys: -1, // 历史版本
	   // currentPage:1, //初始页
	   // pagesize:20,    //    每页的数据
	   // pageNum: 1, // 第几页
	   // min: '',
     }
   },
   mounted () {
	   this.getParams()
   },
   methods: {
     getParams () {
       // 取到路由带过来的参数
       let routerParams = this.$route.params
	   this.user = routerParams
       // 将数据放在当前组件的数据内
       this.row = routerParams.row
	   selectOnlyUserQuestionnaire({
		   status: 1,
		   uid: this.row
	   }).then((data)=>{
		   this.userMsg = data.data.data
		   console.log(this.userMsg)
	   })
     },
	 checkHistory (index) { // 查看历史版本
	 	if( this.historys == index ){
	 		 this.historys = -1
	 	} else {
	 		this.historys = index
	 	}
	 },
     backUserList () {
       this.$router.push({
         path: '/UserList',
         name: 'UserList'
       })
     }
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
