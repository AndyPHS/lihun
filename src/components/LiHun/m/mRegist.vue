<template>
	<div class="mRegist">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-xl">注册</h2>
			<span class="login">登录</span>
		</div>
		<div class="min px-5 mt-10">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400 flex justify-start items-center">
						<span class="phone table text-base">+86</span>
						<el-divider direction="vertical"></el-divider>
						<input type="number" class="text-base leading-loose" v-model="form.phone" placeholder="请输入手机号">
					</li>
					<li class="pt-8 border-b border-grey-400 relative">
						<input type="text" class="text-base leading-loose" v-model="form.vcode" placeholder="请输入验证码">
						<span class="yanzheng hidden">获取验证码</span>
						<span class="time">60s</span>
					</li>
					<li class="mt-8 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpassword" placeholder="设置密码">
					</li>
				</ul>
				<span>注册</span>
				<div class="read mt-6 flex items-center justify-center">
					<img class="hidden" src="../../../assets/images/lihun/m/m_select_icon.png" alt="">
					<img src="../../../assets/images/lihun/m/m_unselect_icon.png" alt="">
					<h3>我已阅读并同意<span>《蜗牛家事用户注册和使用协议》</span></h3>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mRegist',
	data () {
		return {
			form:{
				phone: '',
				newpassword: '',
				vcode: ''
			}
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mUser')
		}
	}
}
</script>

<style scoped="scoped">
	.mRegist{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.login{position: absolute;right: 0;top:17px;font-size: 15px;color:#547ce0}
	.min ul li input{width: 100%;text-align: left;border:none;color: #343434;}
	.min ul li input:focus{outline: none;}
	.phone{display: table;}
	.min form>span{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 68px;}
	.yanzheng{position: absolute;top:20px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;border:1px solid #a5a5a5;border-radius: 5px;}
	.time{position: absolute;top:23px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;}
	.read img{width: 13px;height: 13px;margin-right: 6px;}
	.read h3{color: #818181;font-size: 12px;display: inline-block;}
	.read h3 span{display: inline-block;color:#547ce0}
</style>
