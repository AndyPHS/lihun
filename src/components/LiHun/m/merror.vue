<template>
	<div class="mmin">
		<div class="mhead flex justify-between items-center">
			<div class="mhead_l py-1 flex justify-between items-center">
				<router-link  class="mlogo" to="/m/mhome"><img src="../../../assets/images/lihun/m/mlogo.png" alt=""></router-link>
				<el-divider class="" direction="vertical"></el-divider>
				<span class="text-sm ">离婚协议书</span>
			</div>
			<div v-if="this.isLogin==true" class="touxiang">
				<img v-if="this.userMsg.photo == null || this.userMsg.photo =='' " @click="gomuser" src="../../../assets/images/lihun/m/user_img.png" alt="">
				<img v-else @click="gomuser" :src="this.userMsg.photo" alt="">
			</div>
			<div v-if="this.isLogin==false" class="denglu text-base flex justify-around items-center">
				<span @click="goLogin">登录</span>
				<el-divider class="" direction="vertical"></el-divider>
				<span @click="goRegist">注册</span>
			</div>
		</div>
		<div class="m_min">
			<img src="../../../assets/images/lihun/m/404m.png" alt="">
			<h2 class="text-center text-xl text-blue-500 py-3">哎呀！网页找不到了！</h2>
			<p class="text-center text-sm text-gray-500">可能原因有：网站可能在进行维护或出现了程序问题</p>
		</div>
		<!-- 共用底部 -->
		<m-bottom></m-bottom>
	</div>
</template>

<script>
import m_bottom from '../../partials/m_bottom.vue'
import {usersSelect} from '@/api/api/AgreementRequest.js'
export default {
	name: 'merror',
	components: {
	  'm-bottom': m_bottom
	},
	data () {
		return {
			userMsg:{
				photo: ''
			},
			isLogin: false
		}
	},
	mounted () {
		this.getUserMsg()
	},
	methods: {
		getUserMsg () {
			usersSelect().then((data) => {
			  if (data.data.status_code == 401) {
				  localStorage.removeItem('token') // 存储token
				  this.isLogin = false
				  this.$router.replace('/m/mhome')
			  } else  {
				  this.userMsg.photo = data.data.photo
				  this.isLogin = true
			  }
			})
		},
		goQueDing () { // 去定制离婚协议书页面
			this.$router.replace('/m/mQueDing')
		},
		goKnowledge () { // 去离婚知识页面
			this.$router.replace('/m/mKnowledge')
		},
		gomAgreementModel () { // 协议书模板
			this.$router.replace('/m/mAgreementModel')
		},
		goLogin () { // 去登录
			this.$router.replace('/m/mLogin')
		},
		goRegist () { // 去注册
			this.$router.replace('/m/mRegist')
		},
		gomuser () {
			this.$router.replace('/m/mUser')
		},
		
	}
}
</script>

<style scoped="scoped">
	.mmin{max-width: 40rem;margin:0 auto}
	.mhead_l span{color: #b7b7b7;}
	.mlogo{width:94px;height: 31px;display: inline-block;}
	.denglu{color:#547ce0;}
	.mhead{margin: 0.8125rem 1.5rem;}
	.m_min{padding-top:100px;padding-bottom: 100px;}
	.m_min img{display: inline-block;width: 150px;margin:0 auto;}
	.touxiang img{display: inline-block;width: 32px;height: 32px;border-radius: 50%;}
</style>
