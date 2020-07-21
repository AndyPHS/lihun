<template>
	<div class="mForgetPassword">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">忘记密码</h2>
		</div>
		<div class="min px-5 pt-16">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400 flex justify-start items-center">
						<span class="phone table font-bold text-base">+86</span>
						<el-divider direction="vertical"></el-divider>
						<input type="number" class="text-base leading-loose" v-model="form.phone" placeholder="请输入手机号">
					</li>
					<li class="pt-8 border-b border-grey-400 relative">
						<input type="text" class="text-base leading-loose" v-model="form.vcode" placeholder="请输入验证码">
						<span class="yanzheng hidden">获取验证码</span>
						<span class="time">60s</span>
					</li>
				</ul>
				<span>下一步</span>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mForgetPassword',
	data () {
		return {
			form:{
				phone: '',
				vcode: ''
			},
			
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () { // 返回上一页
			this.$router.replace('/m/mhome')
		},
	}
}
</script>

<style scoped="scoped">
	.mForgetPassword{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.min ul li input{width: 100%;text-align: left;border:none;color: #343434;}
	.min ul li input:focus{outline: none;}
	.phone{display: table;}
	.min form>span{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 68px;}
	.yanzheng{position: absolute;top:20px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;border:1px solid #a5a5a5;border-radius: 5px;}
	.time{position: absolute;top:23px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;}
</style>
