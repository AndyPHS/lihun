<template>
	<div class="mqueding">
		<div class="queding_head">
			<div class="com_head mx-3 relative">
				<img @click="gohome" src="../../../assets/images/lihun/m/back_white_icon.png" alt="">
				<h2 class="py-4 font-bold text-center text-white text-lg">离婚知识</h2>
				<img @click="goSearchPage" src="../../../assets/images/lihun/m/m_search_icon.png" alt="">
			</div>
			<div class="px-2 relative">
				<ul class="flex justify-around">
					<li :class="ins===0?'active_nav':'default' " @click="selectRemen" class="text-base text-white">热门</li>
					<li v-for="(item, index) in fenleiAll" :key="index" @click="checkChild(index)" class="text-base text-white">
					  <h2 :class="ins === (index+1)?'active_nav':'default'">{{ item.title }}</h2>
					  <div  v-if="childList == index" class="nav_list px-3">
					  	<div class="nav_min">
					  		<ul  v-if="item.data.length>0" class="text-sm flex">
					  			<li v-for="($item, $index) in item.data" :key="$index" :class="insChild === $item.id?'active_nav':'default'"  @click="searchList($item, $index)">{{ $item.title }}</li>
					  		</ul>
					  	</div>
					  </div>
					</li>
				</ul>
			</div>
		</div>
		<div v-if="lihunpart" class="lihunpart"></div>
		<div class="mx-3 lihunmin">
			<ul v-if="this.tableDataNull==true">
				<li v-for="(item, index) in tableData" :key="index" @click="gomin(item.id)" class="border-b text-left pt-2 pb-4">
					<h2 class="py-2 font-bold text-base">{{ item.title }}</h2>
					<p class="text-sm">{{ item.description }}</p>
				</li>
			</ul>
			<el-pagination
			  v-if="this.tableDataNull==true"
			  small
			  background
			  href="#top"
			  class="my-10 text-center"
			  layout="prev, pager, next"
			  @current-change="startList"
			  :page-size="pagesize"
			  :current-page.sync="currentPage"
			  :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import {selectAction, selectFaIDNews, selectOsNews, addUserNewsLog, stopUserNewsLog, newsHot} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mKnowledge',
	data () {
		return {
			fenleiAll: [], // 文章分类汇总
			tableData: [], // 分类文章汇总
			tableDataNull: false, // 无文章
			ins:0,
			insChild: 0,
			childList: -1,
			lihunpart: false,
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
		this.getWenType() // 查询分类
		this.selectRemen() // 默认显示热门文章
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mhome')
		},
		gomin (id) {
			// this.$router.replace('/m/mKnowledgeMin')
			this.$router.push({
			  path: `/m/mKnowledgeMin/${id}`,
			})
			localStorage.setItem('mKnowledgeMin',id)
		},
		goSearchPage () {
			this.$router.replace('/m/msearchPage')
		},
		getWenType () { // 查询分类
		  selectAction().then((data) => {
		    this.fenleiAll = data.data[0].data
		    if (this.$route.params.id != undefined) {
		      this.firstType = this.$route.params.id
		    } else {
		      this.firstType = this.fenleiAll[0].id
		    }
		    // this.startList() 
		  })
		},
		startList () { // 初始化页面查找第一个分类下的文章
		  this.tableDataNull = false
		  selectFaIDNews({
		    status: 1,
		    faId: 18,
			page: this.currentPage
		  }).then((data) => {
			  if(data.data.status_code ==200){
				  this.tableData = data.data.data.data
				  this.total = data.data.data.total
				  if (this.tableData.length == 0 ) {
				  	this.tableDataNull = true
				  }
				   var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
					document.documentElement.scrollTop = document.body.scrollTop =0; 
			  } else if (data.data.status_code == 401) {
				  localStorage.removeItem('token') // 存储token
				  localStorage.removeItem('phone')
				  localStorage.removeItem('isLogin')
				  this.$message.error('账号过期，请重新登录')
				  this.$router.replace('/')
			  }
		  })
		},
		checkChild (index) { // 查看二级栏目
			this.lihunpart = true
			this.ins = index+1
			this.childList = index
			
		},
		selectRemen () { // 查看热门
			this.lihunpart = false
			this.ins = 0
			this.childList = -1
			newsHot().then((data) => {
				if(data.data.status_code==200){
					this.tableDataNull = true
					this.tableData = data.data.data.qian
				} else if(data.data.status_code==401){
					this.$router.replace('/m/mhome')
				}
			})
		},
		searchList (item, index) { // 点击分类查找文章
		  this.insChild = item.id
		  
		  // var isLogin = localStorage.getItem('token')
		  // if (isLogin !== undefined){
			 //  addUserNewsLog({
				//   key_word: item.title,
				//   type: 2
			 //  }).then((data) => {
			 //  		  // console.log('搜索栏目')
			 //  })
		  // }
		  selectFaIDNews({
		    status: 1,
		    faId: item.id,
			page: this.currentPage
		  }).then((data) => {
		    this.tableData = data.data.data.data
			console.log(this.tableData)
			this.total = data.data.data.total
			if (this.tableData.length !== 0 ) {
				this.tableDataNull = true
				// this.keyMsg = item.title
			} else {
				this.tableDataNull = false
			}
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

<style scoped="scoped">
	.mqueding{max-width: 40rem;margin:0 auto}
	.queding_head {background-color: #557ce1;border-bottom: 1px solid #6085e3;}
	.com_head img:first-of-type{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.com_head img:last-of-type{width: 23px;height: 23px;position: absolute;right: 0;top: 17px;}
	.nav_list{background-color: #e5e5e5;-webkit-box-sizing: border-box;box-sizing: border-box;overflow: hidden;position: absolute;top: 28px;left: 0;width: 100%;}
	.nav_min{height: 100%;overflow-x: scroll;overflow-y: hidden;-webkit-overflow-scrolling: touch;}
	.nav_list ul{width: 120%;height: 100%;display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center;justify-content: flex-start;}
	.nav_list ul li{width: 75px;color: #343434;height: 45px;line-height: 45px;}
	.active_nav{border-bottom: 3px solid goldenrod;}
	.lihunpart{height: 45px;}
	.lihunmin ul li h2{color: #535353;}
	.lihunmin ul li p{color: #727272;overflow: hidden;line-height: 25px;max-height: 50px;position: relative;}
	.lihunmin ul li p::after{
		content: "......";
		   position: absolute;
		   bottom: 0;
		   right: 0;
		   padding-left: 40px;
		   background: -webkit-linear-gradient(left, transparent, #fff 55%);
		   background: -o-linear-gradient(right, transparent, #fff 55%);
		   background: -moz-linear-gradient(right, transparent, #fff 55%);
		   background: linear-gradient(to right, transparent, #fff 55%);
	}
	::-webkit-scrollbar {display: none;height: 1px;}
	/* .default_active{} */
</style>
