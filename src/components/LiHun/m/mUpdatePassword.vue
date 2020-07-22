<template>
	<div class="mUpdatePassword">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">修改密码</h2>
		</div>
		<div class="min px-5 mt-10">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.oldpassword" placeholder="请输入原密码" ref="oldpassword">
					</li>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpassword" placeholder="请输入新密码" ref="newpassword">
					</li>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpasswordagain" placeholder="请确认新密码" ref="newpasswordagain">
					</li>
				</ul>
				<span @click="updatepasswordAc">确认修改新密码</span>
			</form>
		</div>
	</div>
</template>

<script>
import {remakePassword} from '@/api/api/AgreementRequest.js'
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
		},
		updatepasswordAc () {
			if (this.form.oldpassword =='') {
				alert('原密码不能为空')
				this.$refs.oldpassword.focus()
			} else  if(this.form.newpassword == '') {
				alert('新密码不能为空')
				this.$refs.newpassword.focus()
			} else if ( this.form.newpasswordagain == '') {
				alert('新密码格式不正确')
				this.$refs.newpasswordagain.focus()
			} else if (this.form.newpassword !==this.form.newpasswordagain){
				alert('新密码输入不一致')
			} else {
				remakePassword({
					oldPassword: this.form.oldpassword,
					newPassword: this.form.newpassword
				}).then((data)=>{
					alert('修改成功')
					this.$router.replace('/m/mhome')
				})
			}
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
