<template>
	<div class="mKnowledgeMin">
		<div class="com_head mx-3 border-b border-gray-400 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 v-if="this.lihunPart == false" class="py-4 text-bold text-center text-lg">离婚知识-正文</h2>
			<h2 v-if="this.lihunPart == true" class="py-4 text-bold text-center text-lg">关于离婚协议书的产品故事</h2>
		</div>
		<div class="min px-3">
			<h2 v-if="tit" class="py-4 text-bold text-center text-lg">{{ this.wenCon.title }}</h2>
			<div v-if="tit" class="flex pb-4 justify-between">
				<span v-if="this.wenCon.view !=null" class="inline-block text-sm text-gray-400">帮助{{ this.wenCon.view }}人</span>
				<span v-if="this.wenCon.view ==null" class="inline-block text-sm text-gray-400">帮助1356人</span>
				<span class="inline-block text-sm text-gray-400">{{ this.wenCon.time }}</span>
			</div>
			<div class="text-sm text-left con"  v-html="wenCon.con"></div>
			<div v-if="tit" class="aboutArticle my-8 px-5 py-5">
				<div class="text-left flex items-center">
					<span class="gui"></span>
					<span class="text-base block font-bold">相关知识</span>
				</div>
				<div class="mt-3">
					<ul class="ml-2 text-left">
						<li  v-for="(item, index) in relevantAll" :key="index" class="text-sm leading-loose" @click="goKnowledgeMin(item.id)">{{ item.title }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {selectNewsContent, selectAction, addUserNewsLog, stopUserNewsLog} from '@/api/api/AgreementRequest.js' // 查询文章
export default {
	name: 'mKnowledgeMin',
	data () {
		return {
			wenCon: { // 文章内容
			  title: '',
			  time: '',
			  con: '',
			  view: null
			},
			relevantAll: [],   // 相关文章
			lihunPart: false,
			tit: true
		}
	},
	mounted () {
		this.getWenZhangCon()
		window.addEventListener('scroll', this.scrollToTop)
	},
	destroyed () {
	  window.removeEventListener('scroll', this.scrollToTop)
	},
	methods: {
		gohome () {
			var Id = this.$route.params.id
			if (Id == 45) { 
				window.location.href = "/"
			} else {
				this.$router.replace('/m/mKnowledge')
			}
		},
		getWenZhangCon () { // 查询单独文章
		  // var Id = localStorage.getItem('KnowledgeId')
		  var Id = this.$route.params.id
		  if (Id == 45) {
			  this.lihunPart = true
			  this.tit = false
		  } else {
			  this.lihunPart = false
		  }
		  selectNewsContent({
		    id: Id
		  }).then((data) => {
		    this.wenCon.title = data.data.data.title;
		    this.wenCon.time = data.data.data.createdTime;
		    this.wenCon.con = data.data.data.content;
			this.wenCon.view = data.data.data.view;
			this.relevantAll = data.data.data.relevant;
				 // this.ins = data.data.data.faId
		  })
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
		    path: `/m/mKnowledgeMin/${id}`,
		  })
		  localStorage.setItem('mKnowledgeMin',id)
		  selectNewsContent({
		    id: id
		  }).then((data) => {
		    this.wenCon.title = data.data.data.title;
		    this.wenCon.time = data.data.data.createdTime;
		    this.wenCon.con = data.data.data.content;
			this.wenCon.view = data.data.data.view;
			this.relevantAll = data.data.data.relevant;
			// this.ins = data.data.data.faId
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

<style scoped="scoped">
	.mKnowledgeMin{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.con{color:#535353;}
	.con p span{font-size: 14px;}
	.aboutArticle{background-color: #eeeeee;}
	.gui{width: 3px;height: 15px;display: inline-block;background-color: #557ce1;margin-right: 4px;}
</style>
