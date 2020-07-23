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
						<input type="number" class="text-base leading-loose" v-model="form.phone" placeholder="请输入手机号" ref="loginfsPhone">
					</li>
					<li class="pt-8 border-b border-grey-400 relative">
						<input type="text" class="text-base leading-loose" v-model="form.valueCode" placeholder="请输入验证码" ref="formValueCode">
						<span class="yanzheng" v-show="loginFormregistYan" @click="loginFormgetYan">获取验证码</span>
						<span class="time" v-show="!loginFormregistYan">{{ loginFormcount }}s</span>
					</li>
				</ul>
				<span @click="resetnext">下一步</span>
			</form>
		</div>
		<div v-if="dengluerrorBox==true" class="fixed errorBox">
			{{errorMsg}}
		</div>
	</div>
</template>

<script>
import {phoneCodeV, phoneCode} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mForgetPassword',
	data () {
		return {
			form:{
				phone: '',
				valueCode: ''
			},
			loginFormregistYan: true, 
			dengluerrorBox: false, // 错误弹窗提示
			errorMsg: '',  // 错误提示
			loginFormcount: '', // 快捷登录倒计时60秒
			loginFormtimer: null,  // 快捷登录倒计时定时器
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () { // 返回上一页
			this.$router.replace('/m/mhome')
		},
		resetnext () { // 去重置密码
			if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
				this.dengluerrorBox = true
				this.errorMsg = '手机号有误，请重新填写'
				setTimeout(()=>{
					this.dengluerrorBox = false
				},1000)
				this.$refs.loginfsPhone.focus()
				return false; 
			} else if(!(/^\d{6}$/.test(this.form.valueCode))){
				this.dengluerrorBox = true
				this.errorMsg = '验证码有误，请重新填写'
				setTimeout(()=>{
					this.dengluerrorBox = false
				},1000)
				this.$refs.formValueCode.focus()
				return false; 
			} else {
				phoneCodeV({   // 单独验证手机号
				  phone: this.form.phone,
				  type: 3,
				  code: this.form.valueCode
				}).then((data)=>{
					if (data.data.status_code == 200) {
						this.$router.push({
							path: '/m/mResetPassword',
							query: {
								phone: this.form.phone
							}
						})
					} else {
						this.dengluerrorBox = true
						this.errorMsg = '验证码有误，请重新填写'
						setTimeout(()=>{
							this.dengluerrorBox = false
						},1000)
						this.$refs.formValueCode.focus()
					}
				})
			}
		},
		loginFormgetYan () { // 快捷登录获取验证码
			this.form.valueCode = ''
			if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
				this.dengluerrorBox = true
				this.errorMsg = '手机号有误，请重新填写'
				setTimeout(()=>{
					this.dengluerrorBox = false
				},1000)
				this.$refs.loginfsPhone.focus()
				return false; 
			} else {
				// this.registYan = true
				phoneCode({
				  phone: this.form.phone,
				  type: 3
				}).then((data) => {
				  if (data.data.status_code !== 200) {
				    this.$message.error('手机号格式不正确')
				  } else {
					const TIME_COUNT = 60;
					 if (!this.loginFormtimer) {
					   this.loginFormcount = TIME_COUNT;
					   this.loginFormregistYan = false;
					   this.loginFormtimer = setInterval(() => {
					   if (this.loginFormcount > 0 && this.loginFormcount <= TIME_COUNT) {
						 this.loginFormcount--;
						} else {
						 this.loginFormregistYan = true;
						 clearInterval(this.loginFormtimer);
						 this.loginFormtimer = null;
						}
					   }, 1000)
					  }
				  }
				})
			}
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
	.errorBox{width: 200px;height: 40px;line-height: 40px;background-color:#feebef;color:#f81b1b;z-index: 2002;top:20px;left: 50%;margin-left: -100px;font-size: 15px;border-radius: 5px;}
</style>
