<template>
  <div class="all">
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <div class="c_m w flex justify-between">
      <div class="c_m_l text-left pb-10">
		  <div class="mt-10">
		  	<el-breadcrumb separator-class="el-icon-arrow-right text-sm">
		  	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  	  <el-breadcrumb-item :to="{ path: '/Knowledge' }">离婚知识</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/Knowledge' }">{{this.insName}}</el-breadcrumb-item>
			  <el-breadcrumb-item>正文</el-breadcrumb-item>
		  	</el-breadcrumb>
		  </div>
		  <!-- <div class="min_top">
		  	<img src="../../../assets/images/lihun/top_left.png" alt="">
		  	<img src="../../../assets/images/lihun/top_right.png" alt="">
		  </div> -->
        <div class="c_m_r_m text-center mt-10">
          <h2 class="text-center pb-4 text-bold text-25">{{ this.wenCon.title }}</h2>
		  <div>
			  <span class="inline-block pb-6 text-14">{{ this.wenCon.time }}</span>
			  <span v-if="this.wenCon.view !=null" class="inline-block pb-6 text-14 ml-4">帮助 {{ this.wenCon.view }} 人</span>
			  <span v-if="this.wenCon.view ==null" class="inline-block pb-6 text-14 ml-4">帮助 1245 人</span>
		  </div>
          
        </div>
		
        <div class="m_r_m pb-5" v-html="wenCon.con"></div>
        <div class="m_r_b py-6 px-6">
          <div class="flex items-center m_r_b_t">
            <div></div>
            <span class="font-bold text-sm">相关知识</span>
          </div>
          <ul class="mt-6">
            <li v-for="(item, index) in relevantAll" :key="index" class="mb-2 text-sm list-disc cursor-pointer hover:underline list-inside" @click="goKnowledgeMin(item.id)">{{ item.title }}</li>
          </ul>
        </div>
		<!-- <div class="min_bottom mt-5">
			<img src="../../../assets/images/lihun/bottom_left.png" alt="">
			<img src="../../../assets/images/lihun/bottom_right.png" alt="">
		</div> -->
      </div>
	  <div class="c_m_r">
	    <div class="">
	      <h3 class="hot_title text-left font-bold">
			  热门推荐
			  <img src="../../../assets/images/lihun/hot_icon.png" alt="">
		  </h3>
	      <ul class="mt-5 zhishiul">
	        <li v-for="(item, index) in hotAll.slice(0,6)" :key="index" class="text-base text-left cursor-pointer" @click="goKnowledgeMin(item.id)">
	          <div class="flex justify-between items-center">
				  <div class="flex hot_min items-center">
					 <img v-if="index==0" class="mr-2" src="../../../assets/images/lihun/hot1.png" alt="">
					 <img v-if="index==1" class="mr-2" src="../../../assets/images/lihun/hot2.png" alt="">
					 <img v-if="index==2" class="mr-2" src="../../../assets/images/lihun/hot3.png" alt="">
					 <i class="mr-2 shuzi inline-block" v-if="index==3">4</i>
					 <i class="mr-2 shuzi inline-block" v-if="index==4">5</i>
					 <i class="mr-2 shuzi inline-block" v-if="index==5">6</i>
					 <h2 class="text-xl font-bold">{{item.title}}</h2> 
				  </div>
				  <span class="text-sm text-gray-500" v-if="item.view!==null">帮助{{item.view}}人</span>
				  <span class="text-sm text-gray-500" v-if="item.view==null">帮助{{2514}}人</span>
			  </div>
			  <p class="mt-2">{{item.description}}</p>
	        </li>
	      </ul>
		  
	    </div>
		<div class="py-5">
			<img src="../../../assets/images/lihun/hot_mid.png" alt="">
		</div>
		<div>
			<h3 class="hot_title text-left font-bold">
				知识精选
			</h3>
			<ul class="mt-5 jingxuan">
				<li v-for="(item, index) in jingxuanAll" :key="index" class="text-base text-left  cursor-pointer" @click="goKnowledgeMin(item.id)">
					{{item.title}}
				</li>
			</ul>
		</div>
		<div class="hidden flex px-10 py-10 justify-around items-center">
			<img src="../../../assets/images/lihun/gongzhonghao.png" alt="">
			<div>
				<h2 class="text-xl">扫码关注</h2>
				<p class="text-base">蜗牛小助手</p>
			</div>
		</div>
	  </div>
    </div>
    <div class="live"></div>
	<lihun-bottom></lihun-bottom>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import lihun_bottom from '../../partials/lihun_bottom.vue'
import {selectNewsContent, newsHot, selectAction, addUserNewsLog, stopUserNewsLog} from '@/api/api/AgreementRequest.js' // 查询文章
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'KnowledgeCon',
  components: {
    'lihun-head': lihun_head,
	'lihun-bottom': lihun_bottom
  },
  data () {
    return {
      hotAll: [], // 文章分类汇总
	  jingxuanAll: [], //知识精选
      keyMsg: ''  ,// 关键词搜索
      wenCon: { // 文章内容
        title: '',
        time: '',
        con: '',
		view: null
      },
	  ins: null,
	  insName: '离婚',
	  relevantAll: [],   // 相关文章
	  fenleiAll: [],
    }
  },
  mounted () {
    this.getWenZhangCon()
    this.getWenType()
	localStorage.setItem('topins',1)
	window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  methods: {
     getWenZhangCon () { // 查询单独文章
       this.insName = localStorage.getItem('insName')
	   var Id = this.$route.params.id
       selectNewsContent({
         id: Id
       }).then((data) => {
         this.wenCon.title = data.data.data.title;
         this.wenCon.time = data.data.data.createdTime;
         this.wenCon.con = data.data.data.content;
		 this.wenCon.view = data.data.data.view;
		 this.relevantAll = data.data.data.relevant;
		 this.ins = data.data.data.faId
       })
     },
     getWenType () { // 查询热门文章和精彩推荐
       newsHot().then((data) => {
         this.hotAll = data.data.data.qian
		 this.jingxuanAll = data.data.data.hou
       })
     },
    //  searchList (item, index) { // 点击文章分类跳转到文章列表页
	   // localStorage.setItem('topins',1)
    //    this.$router.push({
    //      name: 'Knowledge',
    //      params: {
    //        id: item.id,
		  //  ins: index
    //      }
    //    })
    //  },
	getHeadActive (data) { // 导航选中状态
		localStorage.setItem('topins',data)
	},
	goKnowledgeMin (id) { // 相关文章
	  var isLogin = localStorage.getItem('token')
	  if (isLogin !== undefined) {
		 stopUserNewsLog().then((data) => {
		 		  
		 })
		 addUserNewsLog({
		   key_word: '/',
		   newsId: id,
		   type: 3
		 }).then((data) => {
		   localStorage.setItem('unlId', data.data.data)
		 }) 
	  }
	  this.$router.push({
	    path: `/KnowledgeCon/${id}`,
	  })
	  localStorage.setItem('KnowledgeId',id)
	  selectNewsContent({
	    id: id
	  }).then((data) => {
	    this.wenCon.title = data.data.data.title;
	    this.wenCon.time = data.data.data.createdTime;
	    this.wenCon.con = data.data.data.content;
		this.wenCon.view = data.data.data.view;
		this.relevantAll = data.data.data.relevant;
		this.ins = data.data.data.faId
	  })
	  const that = this
		let timer = setInterval(() => {
		  let ispeed = Math.floor(-that.scrollTop / 5)
		  document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
		  if (that.scrollTop === 0) {
			clearInterval(timer)
		  }
		}, 16)
	},
	scrollToTop () {
	    const that = this
	    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
	    that.scrollTop = scrollTop
	    if (that.scrollTop > 60) {
			
	    } else {
	      // that.btnFlag = false
	    }
	}
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_l{width: 870px;padding:0 69px;margin:38px auto;border-right: 2px solid #eceff4;}
.c_m_r{width: 325px;padding:38px 23px;}
/* .c_m_r_m{width: 890px;} */
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;margin-top: 10px;}
.m_r_b{background-color: #f2f4f7;}
.m_r_b_t>div{width: 2px;height: 15px;background-color: #343434;margin-right: 8px;}
.m_r_b_t span{font-size: 15px;}
.text-25{font-size: 25px;color: #535353;}
.text-14{font-size: 14px;color:#c0c0c0;}
.default_active{color:red}
.default{color:#343434;}
.hot_title{font-size: 20px;color: #547ce0;position: relative;width: 88px;}
.hot_title img{display: inline-block;position: absolute;top: -6px;right: -17px;}
.zhishiul{border-top: 1px solid #eceff4;}
.jingxuan{border-top: 1px solid #eceff4;}
.jingxuan li{border-bottom: 1px solid #eceff4; padding-top:15px;padding-bottom:15px;color: #9d9d9d;}
.zhishiul li{border-bottom: 1px solid #eceff4; padding-top:20px;padding-bottom:20px;}
.zhishiul li:first-of-type h2{color:#535353;}
.zhishiul li:nth-of-type(2) h2{color:#6a6a6a}
.zhishiul li:nth-of-type(3) h2{color:#535353}
.zhishiul li:nth-of-type(4) h2{color:#535353}
.zhishiul li:nth-of-type(5) h2{color:#535353}
.zhishiul li:nth-of-type(6) h2{color:#535353}
.zhishiul p{height: 52px;overflow: hidden;text-overflow: ellipsis;color:#959595;line-height: 26px; display: -webkit-box;  -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.min_top {
		width: 890px;
		display: flex;
		justify-content: space-between;
		padding-top: 33px;
		margin: 0 auto;
	}

	.min_bottom {
		width: 890px;
		display: flex;
		justify-content: space-between;
		padding-bottom: 50px;
		/* margin: 0 auto; */
		margin-top: 20px;
		
	}
	.hot_min img{display: inline-block;width: 12px;height: 26px;}
	.hot_min h2{width:170px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical;}
	.hot_min i{font-family: -webkit-pictograph;font-size: 28px;}
</style>
