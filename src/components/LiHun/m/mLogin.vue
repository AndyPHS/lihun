<template>
	<div class="mLogin">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">登录</h2>
			<span @click="goregist" class="regist">注册</span>
		</div>
		<div class="mx-3">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item class="w-1/2 text-base" index="1">快捷登录</el-menu-item>
				<el-menu-item class="w-1/2 text-base" index="2">密码登录</el-menu-item>
			</el-menu>
		</div>
		<div class="min px-5 mt-10">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400 flex justify-start items-center">
						<span class="phone table text-base">+86</span>
						<el-divider direction="vertical"></el-divider>
						<input type="number" class="text-base leading-loose" v-model="form.phone" placeholder="请输入手机号" ref="loginfsPhone">
					</li>
					<li v-if="this.activeIndex=='1' " class="pt-8 border-b border-grey-400 relative">
						<input type="text" class="text-base leading-loose" v-model="form.valueCode" placeholder="请输入验证码" ref="loginfsValueCode">
						<span class="yanzheng" v-show="loginFormregistYan" @click="loginFormgetYan">获取验证码</span>
						<span class="time" v-show="!loginFormregistYan">{{ loginFormcount }}s</span>
					</li>
					<li v-if="this.activeIndex=='2' " class="pt-8 border-b border-grey-400 relative">
						<div class="el-form-item">
						  <div class="el-form-item__content">
							  <el-input placeholder="设置密码" class="text-base" v-model="form.password" show-password ref="loginmmPassword"></el-input>
						  </div>
						</div>
					</li>
				</ul>
				<span @click="fastloginBt">登 &nbsp;录</span>
				<div class="read mt-6 flex items-center justify-center">
					<h3>登录即表示阅读并同意<span @click="goshiyongxieyi(1)">《蜗牛家事用户注册和使用协议》</span></h3>
				</div>
			</form>
		</div>
		<div v-if="dengluerrorBox==true" class="fixed errorBox">
			{{errorMsg}}
		</div>
	</div>
</template>

<script>
import {phoneCode, codeLoginPhone, frontLogin} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mLogin',
	data () {
		return {
			activeIndex: '1',
			form:{
				phone: '',
				password: '',
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
		goshiyongxieyi (e) { // 查看协议
			this.$router.push({
				path: '/m/mShiyongxieyi',
				query: {
					route: e
				}
			})
		},
		goregist () { // 去注册
			this.$router.replace('/m/mRegist')
		},
		handleSelect(key, keyPath) {
		    // console.log(key, keyPath);
			this.activeIndex = key
	    },
		loginFormgetYan () { // 快捷登录获取验证码
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
				  type: 5
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
		fastloginBt () { //快捷登录按钮
			if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
				this.dengluerrorBox = true
				this.errorMsg = '手机号有误，请重新填写'
				setTimeout(()=>{
					this.dengluerrorBox = false
				},1000)
				this.$refs.loginfsPhone.focus()
				return false; 
			} else {
				if (this.activeIndex=='1') {
					if(!(/^\d{6}$/.test(this.form.valueCode))){
						this.dengluerrorBox = true
						this.errorMsg = '验证码有误，请重新填写'
						setTimeout(()=>{
							this.dengluerrorBox = false
						},1000)
						this.$refs.loginfsValueCode.focus()
						return false; 
					} else {
						codeLoginPhone({
							phone: this.form.phone,
							code: this.form.valueCode
						}).then((data)=>{
							if(data.data.status_code ===200){
							  this.dialogLogin = false
							  this.$message({
							    message: '登录成功',
							    type: 'success'
							  })
							  this.$router.replace('/m/mhome')
							  // localStorage.setItem('topins',0)
							  // var tel = this.form.phone
							  // this.userPhone = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
							  localStorage.setItem('token', data.data.data.token) // 存储token
							  // localStorage.setItem('phone', this.userPhone)
							  // localStorage.setItem('isLogin', true)
							  this.form = {}
							  // this.isLogin = true
							  this.loginFormregistYan = true
							 //  this.$emit('sendPhone', this.loginForm.phone)
								// usersSelect().then((data) => {
								// 	if (data.data.name !=''){
								// 		var testName = data.data.name
								// 		this.UserName = testName.replace(/^(.).*(.)$/,"$1**")
								// 	}
								// 	localStorage.setItem('name', this.UserName)
								// 	this.getUserMsg()
								// })
							} else { 
								if (data.data.status_code=="100") {
									this.dengluerrorBox = true
									this.errorMsg = '验证码错误'
									setTimeout(()=>{
										this.dengluerrorBox = false
									},1000)
									this.$refs.loginfsValueCode.focus()
								} else if (data.data.status_code=="101") {
									this.dengluerrorBox = true
									this.errorMsg = '用户名错误'
									setTimeout(()=>{
										this.dengluerrorBox = false
									},1000)
									this.$refs.loginfsPhone.focus()
								} else {
									this.$message.error(data.data.message);
								}
							}
						})
					}
				} else {
					if(this.form.password =='') {
						this.$message.error('密码不能为空');
						this.$refs.loginmmPassword.focus()
					} else {
						frontLogin({
						  phone: this.form.phone,
						  password: this.form.password
						}).then((data) => {
						  if(data.data.status_code ===200){
						    this.dialogLogin = false
						    this.$message({
						      message: '登录成功',
						      type: 'success'
						    })
							this.$router.replace('/m/mhome')
							// localStorage.setItem('topins',0)
						 //    this.userPhone = this.form.phone
						    localStorage.setItem('token', data.data.data.token) // 存储token
						    // localStorage.setItem('phone', this.form.phone)
						    // localStorage.setItem('isLogin', true)
						    this.form = {}
						    // this.isLogin = true
						    // this.$emit('sendPhone', this.userPhone)
							// usersSelect().then((data) => {
							// 	if (data.data.name !=''){
							// 		var testName = data.data.name
							// 		this.UserName = testName.replace(/^(.).*(.)$/,"$1**")
							// 	}
							// 	localStorage.setItem('name', this.UserName)
							// 	this.getUserMsg()
							// })
						  } else {
							this.$message.error(data.data.message);
						  }
						})
					}
				}
			}
		},
	}
}
</script>

<style scoped="scoped">
	.mLogin{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.regist{position: absolute;right: 0;top:17px;font-size: 15px;color:#547ce0}
	.min ul li input{width: 100%;text-align: left;border:none;color: #343434;}
	.min ul li input:focus{outline: none;}
	.phone{display: table;}
	.min form>span{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 68px;}
	.yanzheng{position: absolute;top:20px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;border:1px solid #a5a5a5;border-radius: 5px;}
	.time{position: absolute;top:23px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;}
	.read img{width: 13px;height: 13px;margin-right: 6px;}
	.read h3{color: #818181;font-size: 12px;display: inline-block;}
	.read h3 span{display: inline-block;color:#547ce0}
	.errorBox{width: 200px;height: 40px;line-height: 40px;background-color:#feebef;color:#f81b1b;z-index: 2002;top:20px;left: 50%;margin-left: -100px;font-size: 15px;border-radius: 5px;}
</style>
