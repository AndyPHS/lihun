<template>
	<div class="muser">
		<div class="muser_head">
			<div class="com_head mx-3 relative">
				<img @click="gohome" src="../../../assets/images/lihun/m/back_white_icon.png" alt="">
				<h2 class="py-4 font-bold text-center text-white text-lg">个人中心</h2>
			</div>
			<div class="user_head px-4 py-8">
				<dl class="flex justify-start items-center">
					<dt class="mx-5">
						<img class="photoMsg" v-if="this.userMsg.photo ==null" src="../../../assets/images/lihun/user_img.png" alt="">
						<img class="photoMsg" v-else :src="this.userMsg.photo" alt="">
					</dt>
					<dd class="text-white font-bold text-base">{{this.userMsg.phone}}</dd>
				</dl>
			</div>
		</div>
		<div class="user_min mx-5">
			<ul>
				<li>
					<h2 class="text-base">我的协议书</h2>
					<img @click="tomyconsult" src="../../../assets/images/lihun/m/m_right_icon.png" alt="">
				</li>
				<li>
					<h2 class="text-base">姓名</h2>
					<span>{{ this.userMsg.name }}</span>
				</li>  
				<li>
					<h2 class="text-base">性别</h2>
					<span v-if="this.userMsg.sex===1">男</span>
					<span v-if="this.userMsg.sex===2">女</span>
				</li>
				<li>
					<h2 class="text-base">修改密码</h2>
					<img @click="toupdatepassword" src="../../../assets/images/lihun/m/m_right_icon.png" alt="">
				</li>
				<li>
					<h2 class="text-base">客服电话</h2>
					<span>400-8989-818</span>
				</li>
			</ul>
			<span @click="loginOut" class="tuichu">退出登录</span>
		</div>
	</div>
</template>

<script>
import {usersSelect} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mUser',
	data () {
		return {
			userMsg: {
				name: '',
				sex: 1,
				phone: '',
				photo: ''
			},
			isLogin: false
		}
	},
	mounted () {
		this.getUserMsg() // 查询用户信息
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
				  this.userMsg.name = data.data.name
				  this.userMsg.phone = data.data.phone
				  this.userMsg.sex = data.data.sex
				  this.isLogin = true
			  }
			})
		},
		gohome () {
			this.$router.replace('/m/mhome')
		},
		tomyconsult () {
			this.$router.replace('/m/mMyconsult')
		},
		toupdatepassword () {
			this.$router.replace('/m/mUpdatePassword')
		},
		loginOut () { // 退出登录
			localStorage.removeItem('token') // 存储token
			this.$router.replace('/m/mhome')
		}
		
	}
}
</script>

<style scoped="scoped">
	.muser{max-width: 40rem;margin:0 auto}
	.muser_head {background-color: #557ce1;border-bottom: 1px solid #6085e3;}
	.com_head img:first-of-type{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.user_head dl dt img{width: 70px;height: 70px;display: inline-block;border-radius: 50%;}
	.user_min ul{margin-top:25px}
	.user_min ul li{border-bottom: 1px solid #c4c4c4; display: flex;justify-content: space-between;align-items: center;padding:12px 0;}
	.user_min ul li:first-of-type{border-top:1px solid #c4c4c4}
	.user_min ul li h2{color: #535353;font-weight: bold;}
	.user_min ul li img{width: 9px;height: 17px;display: inline-block;}
	.user_min ul li span{color: #a4a4a4;}
	.tuichu{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 88px;}
</style>
