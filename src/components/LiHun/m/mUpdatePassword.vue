<template>
	<div class="mUpdatePassword">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-xl">修改密码</h2>
		</div>
		<div class="min px-5 mt-10">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400">
						<input type="text" class="text-base leading-loose" v-model="form.oldpassword" placeholder="请输入原密码">
					</li>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpassword" placeholder="请输入新密码">
					</li>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpasswordagain" placeholder="请确认新密码">
					</li>
				</ul>
				<span>确认修改新密码</span>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mUpdatePassword',
	data () {
		return {
			form:{
				oldpassword: '',
				newpassword: '',
				newpasswordagain: ''
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
	.mUpdatePassword{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.min ul li input{width: 100%;text-align: left;border:none;color: #c4c4c4;}
	.min ul li input:focus{outline: none;}
	.min span{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 68px;}
</style>
