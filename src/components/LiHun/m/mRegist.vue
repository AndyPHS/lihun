<template>
	<div class="mRegist">
		<div class="com_head mx-3  relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">注册</h2>
			<span @click="gologin" class="login">登录</span>
		</div>
		<div class="min px-5 mt-10">
			<form action="">
				<ul>
					<li class="mt-6 border-b border-grey-400 flex justify-start items-center">
						<span class="phone table text-base">+86</span>
						<el-divider direction="vertical"></el-divider>
						<input type="number" class="text-base leading-loose" v-model="form.phone" placeholder="请输入手机号" ref="zhucePhone">
					</li>
					<li class="pt-8 border-b border-grey-400 relative">
						<input type="text" class="text-base leading-loose" v-model="form.valueCode" placeholder="请输入验证码" ref="zhuceValueCode">
						<span class="yanzheng" v-show="registYan" @click="getYan">获取验证码</span>
						<span class="time" v-show="!registYan">{{ count }}s</span>
					</li>
					<li class="pt-8 border-b border-grey-400 relative">
						<div class="el-form-item">
						  <div class="el-form-item__content">
							  <el-input placeholder="设置密码" class="text-base" v-model="form.password" show-password  ref="zhucePassword"></el-input>
						  </div>
						</div>
					</li>
				</ul>
				<span @click="registAc">注 &nbsp;册</span>
				<div class="read mt-6 flex items-center justify-center">
					<img @click="changeSelectAc" v-if="this.checkOne==true" class="" src="../../../assets/images/lihun/m/m_select_icon.png" alt="">
					<img @click="changeSelectAc" v-if="this.checkOne==false" src="../../../assets/images/lihun/m/m_unselect_icon.png" alt="">
					<h3>我已阅读并同意<span @click="goshiyongxieyi">《蜗牛家事用户注册和使用协议》</span></h3>
				</div>
			</form>
		</div>
		<div v-if="dengluerrorBox==true" class="fixed errorBox">
			{{errorMsg}}
		</div>
	</div>
</template>

<script>
import {phoneCode, addUser} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mRegist',
	data () {
		return {
			form:{
				phone: '',
				password: '',
				valueCode: ''
			},
			dengluerrorBox: false,
			checkOne: false,  // 是否阅读协议
			registYan: true, // 注册时候手机验证码状态
			count: '', // 倒计时60秒
			timer: null,  // 倒计时定时器
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () { // 返回上一页
			this.$router.replace('/m/mhome')
		},
		goshiyongxieyi () { // 查看协议
			this.$router.replace('/m/mShiyongxieyi')
		},
		changeSelectAc () { // 是否阅读协议
			this.checkOne = !this.checkOne
		},
		gologin () { // 去登录
			this.$router.replace('/m/mLogin')
		},
		registAc () { // 点击注册
			if (this.checkOne == false ){
				this.dengluerrorBox = true
				this.errorMsg = '请先阅读蜗牛家事使用协议'
				setTimeout(()=>{
					this.dengluerrorBox = false
				},1000)
			} else {
				if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
					this.dengluerrorBox = true
					this.errorMsg = '手机号有误，请重新填写'
					setTimeout(()=>{
						this.dengluerrorBox = false
					},1000)
					this.$refs.zhucePhone.focus()
					return false; 
				} else if(this.form.password =='') {
				  this.dengluerrorBox = true
				  this.errorMsg = '密码不能为空'
				  setTimeout(()=>{
				  	this.dengluerrorBox = false
				  },1000)
				  this.$refs.zhucePassword.focus()
				} else if(this.form.valueCode==null|| this.form.valueCode.length != 6){
				  this.dengluerrorBox = true
				  this.errorMsg = '验证码不正确'
				  setTimeout(()=>{
				  	this.dengluerrorBox = false
				  },1000)
				  this.$refs.zhuceValueCode.focus()
				} else {
				  addUser({
					phone: this.form.phone,
					password: this.form.password,
					code: JSON.parse(this.form.valueCode)
				  }).then((data) => {
					if (data.data.status_code === 200) {
					  this.$message({
						message: '恭喜你，注册成功',
						type: 'success'
					  })
					  this.$router.replace('/m/mhome')
					  localStorage.setItem('token', data.data.data.token) // 存储token
					  localStorage.setItem('phone', this.userPhone)
					  localStorage.setItem('name', this.UserName)
					  localStorage.setItem('isLogin', true)
					  this.form = {}
					  
					} else if(data.data.status_code === 103){
					   this.dengluerrorBox = true
					   this.errorMsg = '手机号已注册'
					   setTimeout(()=>{
					   	this.dengluerrorBox = false
					   },1000)
					} else {
						this.$message({
							message: data.data.message,
							type: 'error'
						})
					}
				  }) 
				}
			}
		},
		getYan () { // 获取验证码
			if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
				this.dengluerrorBox = true
				this.errorMsg = '手机号有误，请重新填写'
				setTimeout(()=>{
					this.dengluerrorBox = false
				},1000)
				this.$refs.zhucePhone.focus()
				return false; 
			} else {
				// this.registYan = true
				phoneCode({
				  phone: this.form.phone,
				  type: 1
				}).then((data) => {
				  if (data.data.status_code !== 200) {
				    this.$message.error('手机号格式不正确')
				  } else {
					const TIME_COUNT = 60;
					 if (!this.timer) {
					   this.count = TIME_COUNT;
					   this.registYan = false;
					   this.timer = setInterval(() => {
					   if (this.count > 0 && this.count <= TIME_COUNT) {
						 this.count--;
						} else {
						 this.registYan = true;
						 clearInterval(this.timer);
						 this.timer = null;
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
	.errorBox{width: 200px;height: 40px;line-height: 40px;background-color:#feebef;color:#f81b1b;z-index: 2002;top:20px;left: 50%;margin-left: -100px;font-size: 15px;border-radius: 5px;}
</style>
