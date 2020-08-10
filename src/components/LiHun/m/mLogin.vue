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
							  <input type="password" placeholder="请输入密码" class="text-base" v-model="form.password" show-password ref="loginmmPassword">
						  </div>
						</div>
					</li>
					<p v-if="this.activeIndex=='2' " class="w-full pt-2 text-right">
						<span @click="forgetpasswordAc" class="forgetspan text-sm">忘记密码?</span>
					</p>
				</ul>
				<span @click="fastloginBt">登 &nbsp;录</span>
				<div class="read mt-6 flex items-center justify-center">
					<h3>登录即表示阅读并同意<span @click="goshiyongxieyi">《蜗牛家事用户注册和使用协议》</span></h3>
				</div>
			</form>
		</div>
		<div v-if="dialogxieyi" class="mianze">
			<div class="mianzeBox">
				<img @click="closedialogxieyi" src="../../../assets/images/lihun/m/close_icon14.png" alt="">
				<h2 class="text-base text-center py-3">蜗牛家事用户注册和使用协议</h2>
				<div class="text-left mianzeMin px-2">
				  <p class="leading-loose">
				      <strong>【审慎阅读】</strong>在您申请注册流程中点击同意前，应当认真阅读以下协议。请您务必审慎阅读、充分理解协议中相关条款内容。
				  </p>
				  <p class="leading-loose">
				     如您对协议有任何疑问，可向客服咨询。
				  </p>
				  <p class="leading-loose">
				      <strong>【特别提示】</strong>当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分阅读、理解并接受协议的全部内容。
				  </p>
				  <p class="leading-loose">
				      <strong><span style="text-decoration:underline;"><span style=";color:black">阅读协议的过程中，如果您不同意相关协议或其中任何条款的规定，您应立即停止注册程序。</span></span></strong>
				  </p>
				  <p class="leading-loose">
				      一、协议声明
				  </p>
				  <p class="leading-loose">
				      请您在注册成为蜗牛家事用户前务必仔细阅读本协议，若您不同意本协议的任意内容，或者无法准确理解蜗牛家事对条款的解释，请不要进行后续操作；若您注册成为蜗牛家事用户，则表示您对本协议的全部内容已充分阅读并认可和同意遵守。同时，承诺遵守中国法律、法规、规章及其他政府规范性文件的规定，如有违反而造成任何法律后果，您将以本人名义独立承担所有相应的法律责任。
				  </p>
				  <p class="leading-loose">
				      二、定义及解释
				  </p>
				  <p class="leading-loose">
				      （一）蜗牛家事账户
				  </p>
				  <p class="leading-loose">
				      指您通过注册获得蜗牛家事账号以供您使用蜗牛家事各项服务的账户。
				  </p>
				  <p class="leading-loose">
				      （二）账户获得
				  </p>
				  <p class="leading-loose">
				      当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可获得蜗牛家事账户并成为蜗牛家事用户。
				  </p>
				  <p class="leading-loose">（三）账户使用</p>
				  <p class="leading-loose">
				      您有权使用您设置或确认的姓名、手机号码（以下简称“账户名称”）及您设置的密码（账户名称及密码合称“账户”）登录蜗牛家事。
				  </p>
				  <p class="leading-loose">
				      三、用户注册
				  </p>
				  <p class="leading-loose">
				      （一）&nbsp;用户注册资格
				  </p>
				  <p class="leading-loose">请您确认，在您开始注册程序使用蜗牛家事前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。
				  </p>
				  <p class="leading-loose">
				      （二）注册信息
				  </p>
				  <p class="leading-loose">
				      2.1 在使用蜗牛家事服务时，您应当按页面的提示准确完整地提供您的信息（包括您的姓名及电子邮件地址、联系电话等），以便蜗牛家事与您联系。您了解并同意，您有义务保持您提供信息的真实性及有效性。
				  </p>
				  <p class="leading-loose">
				      2.2 您的账户为您自行设置并由您保管，蜗牛家事任何时候均不会主动要求您提供您的账户密码。因此，建议您务必保管好您的账户，并确保您在每个上网时段结束时退出登录并以正确步骤离开蜗牛家事。
				  </p>
				  <p class="leading-loose">
				      账户因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，蜗牛家事并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。
				  </p>
				  <p class="leading-loose">
				      四、使用规则
				  </p>
				  <p class="leading-loose">
				      （一）用户在使用蜗牛家事过程中, 必须遵循国家的相关法律法规, 不得发布危害国家安全、色情、暴力、侵犯版权等任何合法权利等非法内容; 也不得利用蜗牛家事发布含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、或其它道德上令人反感的内容。
				  </p>
				  <p class="leading-loose">
				      （二）蜗牛家事可依其合理判断, 对违反有关法律法规或本协议约定; 或侵犯、妨害、威胁任何人权利或安全的内容, 或者假冒他人的行为, 蜗牛家事有权停止传输任何前述内容, 并有权依其自行判断对违反本条款的任何用户采取适当的法律行动, 包括但不限于, 删除具有违法性、侵权性、不当性等内容, 阻止其使用蜗牛家事全部或部分网络服务, 并且依据法律法规保存有关信息并向有关部门报告等。
				  </p>
				  <p class="leading-loose">
				      <span style="color:black">五、版权声明</span>
				  </p>
				  <p class="leading-loose">
				      除非蜗牛家事另行声明，蜗牛家事推出的所有官方产品及其他信息（包括文字、图标、图片、照片、音频、视频、图表、色彩组合、版面设计等）的所有权利（包括著作权、商标权、专利权、商业秘密及其他相关权利）均归北京家理律师事务所所有。未经北京家理律师事务所事先许可，任何人擅自使用上述内容和信息，可能会侵犯北京家理律师事务所的权利，我们将会追究侵权者的法律责任。如有宣传、展示等任何使用需要，请您务必取得北京家理律师事务所的事先许可。
				  </p>
				  <p class="leading-loose">
				      六、协议变更
				  </p>
				  <p class="leading-loose">本协议内容包括以下条款及已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。蜗牛家事有权根据需要不定时地制定、修改本协议或各类规则，如本协议及规则有任何变更，一切变更以本网站最新公布的内容为准。经修订的协议、规则一经公布，立即自动生效，对新协议、规则生效之后注册的用户发生法律效力。对于协议、规则生效之前注册的用户，若用户在新规则生效后继续使用本网站提供的各项服务，则表明用户已充分阅读并认可和同意遵守新的协议或规则。若您拒绝接受新的协议和规则，您必须放弃使用蜗牛家事提供的各项服务（包括但不限于使用用户名和密码登录蜗牛家事、进行定制或修改操作等）。
				  </p>
				  <p class="leading-loose">
				      七、法律适用、管辖与其他
				  </p>
				  <p class="leading-loose">
				      （一）本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。
				  </p>
				  <p class="leading-loose">（二）您因使用蜗牛家事服务所产生及与蜗牛家事服务有关的争议，由蜗牛家事与您协商解决。协商不成时，任何一方均可向被告所在地有管辖权的人民法院提起诉讼。
				  </p>
				  <p class="leading-loose">三）本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。
				  </p>
				  <p class="leading-loose">
				      八、用户的违约及处理
				  </p>
				  <p class="leading-loose">
				      （一）违约认定
				  </p>
				  <p class="leading-loose">发生如下情形之一的，视为您违约：
				  </p>
				  <p class="leading-loose">
				      （1）使用蜗牛家事服务时违反有关法律法规规定的；
				  </p>
				  <p class="leading-loose">
				      （2）违反本协议或本协议补充协议约定的。
				  </p>
				  <p class="leading-loose">
				      （二）违约处理措施
				  </p>
				  <p class="leading-loose">2.1 蜗牛家事可根据相应规则立即对相应信息进行删除、屏蔽处理。
				  </p>
				  <p class="leading-loose">2.2 您在蜗牛家事实施的行为，蜗牛家事可依据相应规则对您执行账户中止向您提供部分或全部服务等处理措施。如您的行为构成根本违约的，蜗牛家事可查封您的账户，终止向您提供服务。&nbsp;
				  </p>
				  <p class="leading-loose">
				      （三）赔偿责任
				  </p>
				  <p class="leading-loose">
				      如您的行为使蜗牛家事遭受损失（包括自身的直接经济损失、商誉损失及对外支付的赔偿金、和解款、律师费、诉讼费等间接经济损失），您应赔偿蜗牛家事上述全部损失。
				  </p>
				  <p class="leading-loose">
				      如您的行为使蜗牛家事遭受第三人主张权利，蜗牛家事可在对第三人承担金钱给付等义务后就全部损失向您追偿。
				  </p>
				</div>
			</div>
		</div>
		<div v-if="dengluerrorBox==true" class="fixed errorBox">
			{{errorMsg}}
		</div>
	</div>
</template>
<script type="text/javascript" src="../../../assets/js/cookie.js"></script>
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
			dialogxieyi: false,
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () { // 返回上一页
			// this.$router.replace('/m/mhome')
			window.location.href = "/"
		},
		goshiyongxieyi () { // 查看协议
			this.dialogxieyi = true
		},
		closedialogxieyi () { // 关闭使用协议弹窗
			this.dialogxieyi = false
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
							console.log(data.data)
							if(data.data.status_code ===200){
							  this.dialogLogin = false
							  this.$message({
							    message: '登录成功',
							    type: 'success'
							  })
							  // this.$router.replace('/m/mhome')
							  window.location.href = '/'
							  // localStorage.setItem('topins',0)
							  // var tel = this.form.phone
							  // this.userPhone = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
							  localStorage.setItem('token', data.data.data.token) // 存储token
							  // this.$cookieStore.setCookie('token', data.data.data.token, data.data.data.expires_in);
							  $.cookie("token", data.data.data.token, { expires:data.data.data.expires_in})
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
							window.location.href = "/"
							// localStorage.setItem('topins',0)
						 //    this.userPhone = this.form.phone
						    localStorage.setItem('token', data.data.data.token) // 存储token
							// this.$cookieStore.setCookie('token', data.data.data.token, data.data.data.expires_in);
							 $.cookie("token", data.data.data.token, { expires:data.data.data.expires_in})
							
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
		forgetpasswordAc () {
			this.$router.replace('/m/mForgetPassword')
		}
	}
}
</script>

<style scoped="scoped">
	.mLogin{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.regist{position: absolute;right: 0;top:17px;font-size: 15px;color:#547ce0}
	.min ul li input{width: 100%;text-align: left;border:none;color: #343434;}
	.min ul li input:focus{outline: none;}
	.forgetspan{display: inline-block;color:#547ce0}
	.phone{display: table;}
	.min form>span{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 68px;}
	.yanzheng{position: absolute;top:20px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;border:1px solid #a5a5a5;border-radius: 5px;}
	.time{position: absolute;top:23px;right: 0;padding:5px 7px;font-size: 15px;color: #727272;}
	.read img{width: 13px;height: 13px;margin-right: 6px;}
	.read h3{color: #818181;font-size: 12px;display: inline-block;}
	.read h3 span{display: inline-block;color:#547ce0}
	.errorBox{width: 80%;height: 40px;line-height: 40px;background-color:#feebef;color:#f81b1b;z-index: 2002;top:20px;margin-left: 10%;font-size: 15px;border-radius: 5px;}
	.mianze{width: 100vw;height: 100vh;position: fixed;top: 0;left: 0; background: rgba(0,0,0,0.5);}
	.mianzeBox{width: 90%;margin:0 auto;height: 85%;background: #fff;margin-top: 8%;position: relative;}
	.mianzeBox img{width: 20px;height: 20px;position: absolute;top:5px;right: 5px;}
	.mianzeMin{height: 90%;overflow-y: scroll;}
	.mianzeMin p{text-indent: 2em;font-size: 14px;}
</style>
