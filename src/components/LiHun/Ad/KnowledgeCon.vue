<template>
  <div class="all">
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <div class="c_m w flex justify-between">
      <div class="c_m_l hidden">
        <div class="">
          <h3 class="text-22 text-left font-bold">离婚知识</h3>
          <ul class="mt-5 zhishiul">
            <li v-for="(item, index) in fenleiAll" :key="index" class="text-base leading-loose hover:font-bold text-left">
              <h2 :class="ins === item.id?'default_active':'default'" @click="searchList(item, index)">{{ item.title }}</h2>
              <ul class="pl-5 " v-if="item.data.length>0">
                <li v-for="($item, $index) in item.data" :key="$index" class="text-base cursor-pointer hover:font-bold leading-loose text-left">
					<h2 :class="ins === $item.id?'default_active':'default_erji'"  @click="searchList($item, $index)">{{ $item.title }}</h2>
				</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="c_m_r text-left pb-10">
		  <div class="mt-10">
		  	<el-breadcrumb separator-class="el-icon-arrow-right text-sm">
		  	  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		  	  <el-breadcrumb-item :to="{ path: '/Knowledge' }">离婚知识</el-breadcrumb-item>
			  <el-breadcrumb-item :to="{ path: '/Knowledge' }">离婚</el-breadcrumb-item>
			  <el-breadcrumb-item>正文</el-breadcrumb-item>
		  	</el-breadcrumb>
		  </div>
		  <div class="min_top">
		  	<img src="../../../assets/images/lihun/top_left.png" alt="">
		  	<img src="../../../assets/images/lihun/top_right.png" alt="">
		  </div>
        <div class="c_m_r_m text-center">
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
		<div class="min_bottom mt-5">
			<img src="../../../assets/images/lihun/bottom_left.png" alt="">
			<img src="../../../assets/images/lihun/bottom_right.png" alt="">
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
import {selectNewsContent, selectAction, addUserNewsLog, stopUserNewsLog} from '@/api/api/AgreementRequest.js' // 查询文章
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'KnowledgeCon',
  components: {
    'lihun-head': lihun_head,
	'lihun-bottom': lihun_bottom
  },
  data () {
    return {
      fenleiAll: [], // 文章分类汇总
      keyMsg: ''  ,// 关键词搜索
      wenCon: { // 文章内容
        title: '',
        time: '',
        con: '',
		view: null
      },
	  ins: 0,
	  relevantAll: []   // 相关文章
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
       // var Id = localStorage.getItem('KnowledgeId')
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
     getWenType () { // 查询分类
       selectAction().then((data) => {
         this.fenleiAll = data.data[0].data
       })
     },
     searchList (item, index) { // 点击文章分类跳转到文章列表页
	   localStorage.setItem('topins',1)
       this.$router.push({
         name: 'Knowledge',
         params: {
           id: item.id,
		   ins: index
         }
       })
     },
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
.c_m_l{width: 239px;padding:150px 0;}
.c_m_r{width: 890px;margin:0 auto;}
/* .c_m_r_m{width: 890px;} */
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.m_r_b{background-color: #f2f4f7;}
.m_r_b_t>div{width: 2px;height: 15px;background-color: #343434;margin-right: 8px;}
.m_r_b_t span{font-size: 15px;}
.text-25{font-size: 25px;color: #535353;}
.text-14{font-size: 14px;color:#c0c0c0;}
.default_active{color:red}
.default{color:#343434;}
.text-22{font-size: 22px;padding-left: 56px;}
.zhishiul{padding-left: 56px;}
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
</style>
