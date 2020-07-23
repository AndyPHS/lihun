<template>
	<div class="mResetPassword">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">重置密码</h2>
		</div>
		<div class="min px-5 mt-10">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400 flex justify-start items-center">
						<span class="phone table text-base">+86</span>
						<el-divider direction="vertical"></el-divider>
						<input type="text" class="text-base text-gray-700 leading-loose" v-model="form.phone" placeholder="请输入手机号" readonly="readonly">
					</li>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpassword" placeholder="请输入新密码" ref="newformPassword">
					</li>
					<li class="mt-6 border-b border-grey-400">
						<input type="password" class="text-base leading-loose" v-model="form.newpasswordagain" placeholder="再次确认密码" ref="formPasswordAgain">
					</li>
				</ul>
				<span @click="resetPW">完成</span>
			</form>
		</div>
	</div>
</template>

<script>
import {updatePasswordPhone} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mResetPassword',
	data () {
		return {
			form:{
				phone: '',
				newpassword: '',
				newpasswordagain: ''
			}
		}
	},
	mounted () {
		this.getpohne()
	},
	methods: {
		getpohne () {
			this.form.phone = this.$route.query.phone
		},
		gohome () {
			this.$router.replace('/m/mhome')
		},
		resetPW () { // 设置新密码弹窗确认
			if( this.form.newpassword == ''){
				this.$message.error('密码不能为空')
				this.$refs.newformPassword.focus()
			} else if (this.form.newpassword == this.form.newpasswordagain){
				updatePasswordPhone({
					phone: this.form.phone,
					password: this.form.newpassword,
					passwordagain: this.form.newpasswordagain
				}).then((data) => {
					if(data.data.status_code ==200){
						this.$message({
							message: '新密码设置成功',
							type: 'success'
						})
						this.$router.replace('/m/mhome')
					} else {
						this.$message.error(data.data.message)
					}
				})
			} else if (this.form.newpasswordagain=='') {
				this.$message.error('重置密码不能为空')
				this.$refs.formPasswordAgain.focus()
			}
		},
	}
}
</script>

<style scoped="scoped">
	.mResetPassword{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.min ul li input{width: 100%;text-align: left;border:none;color: #c4c4c4;}
	.min ul li input:focus{outline: none;}
	.phone{display: table;}
	.min form>span{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 68px;}
	
</style>
