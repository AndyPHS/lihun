<template>
  <div>
    <div class="bot">
      <div class="w">
        <!-- <div class="bot01 text-left hidden text-white">
          <span class="cursor-pointer hover:underline" @click="goNewpage(0)">首页</span>
          <el-divider class="mx-5" direction="vertical"></el-divider>
          <span class="cursor-pointer hover:underline"  @click="goNewpage(1)">离婚知识</span>
          <el-divider class="mx-5" direction="vertical"></el-divider>
          <span class="cursor-pointer hover:underline"  @click="goNewpage(2)">定制我的离婚协议书</span>
          <el-divider class="mx-5" direction="vertical"></el-divider>
          <span class="cursor-pointer hover:underline"  @click="goNewpage(3)">家理律所官网</span>
        </div> -->
        <div class="bot02 border-b-2 flex justify-between  items-end">
          <div class="w-1/3 text-left text-white bot02_l">
            <h2>联系我们</h2>
            <p>时间：周一至周五 09:00-18:00 </p>
            <p>地址：北京市朝阳区建国门外大街22号赛特大厦3层</p>
          </div>
          <dl class="w-1/5 text-white flex items-center">
            <dd>
              <img class="inline-block" src="../../assets/images/lihun/weichat.png" alt="">
            </dd>
            <dt class="ml-5">
              <h2 class="mt-2">扫码关注</h2>
              <p class="text-sm">蜗牛小助手</p>
            </dt>
          </dl>
        </div>
        <div class="bot03 text-left text-white">
          <p>©2017 北京家理律师事务所      备案号：京ICP备14011260号-4      京公网安备：11010502037274号</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addUser, phoneCode, frontLogin, verifyCode, updatePasswordPhone, usersSelect} from '@/api/api/AgreementRequest.js'

export default {
  name: 'lihun_head',
  props:[
	  name
  ],
  data () {
    return {
	  dengluBox: false, // 右上角个人中心表框
	  dengluerrorBox: false, // 登录错误弹窗提示
	  dialogFindByPhone: false, // 通过手机号找回密码弹窗
	  dialogPhonePw: false,  // 新密码弹窗
      dialogFormVisible: false, // 注册弹窗
      dialogLogin: false, // 登录弹窗
      userPhone: null, // 登录后存储用户手机号
      isLogin: false,  // 判断用户是否登录
	  errorMsg: '',
      form: {
        phone: null,
        password: '',
        valueCode: null, // 验证码
        code_key: '' // 验证码的KEY
      },
	  name: '',
	  newform: {
		  phone: null, // 新密码
		  valueCode: null, // 新验证码
		  password: '',  // 新密码
		  passwordAgain: '' //新密码重复
	  },
      identifyCodeMsg: {
        type:'text',
        placeholder: '请输入验证码',
        value: '',
        codeUrl: '',
        widthClass: 'vertical'
      },
      checkOne: false,
      registYan: false, // 注册时候手机验证码状态
	  registYanType: false,
      zhuce: true, // 注册成功状态码
      forgetDialog: false, // 忘记密码弹窗
      forgetDialog2: false ,// 忘记密码2
	  innerVisible: false,
	  topins:-1, // 导航状态
	  nav:[
		  {name: '首页'},
		  {name: '离婚知识'},
		  {name: '定制我的离婚协议书'},
		  {name: '家理律所官网'},
	  ]
    }
  },
  mounted () {
  },
  methods: {
	goNewpage (e) {
		if(this.$route.path=='/CustomBasic' || this.$route.path=='/CustomAgreement' || this.$route.path=='/CustomQueDing' || this.$route.path=='/CustomShengCheng' ){
			if (e==0) {
				localStorage.setItem('topins',0)
				const {href} = this.$router.resolve({
					path: '/'
				})
				window.open(href, '_blank')
			} else if (e==1) {
				localStorage.setItem('topins',1)
				const {href} = this.$router.resolve({
					path: '/Knowledge'
				})
				window.open(href, '_blank')
			} else if (e==2) {
				localStorage.setItem('topins',2)
				const {href} = this.$router.resolve({
					path: '/MyConsult'
				})
				window.open(href, '_blank')
			}  else if (e==3) {
				localStorage.setItem('topins',-1)
				window.open('http://www.jialilaw.com/', '_blank')
			}
		} else {
			if (e==0) {
				localStorage.setItem('topins',0)
				this.$router.replace('/')
			} else if (e==1) {
				localStorage.setItem('topins',1)
				this.$router.replace('/Knowledge')
			} else if (e==2) {
				localStorage.setItem('topins',2)
				this.$router.replace('/MyConsult')
			}  else if (e==3) {
				localStorage.setItem('topins',-1)
				window.open('http://www.jialilaw.com/', '_blank')
			}
		}
	},
	goDingZhi (e) {
		this.$refs.lihun.goDingZhi(2)
	}
	
  }
}
</script>

<style scoped>
  .bot{background-color: #2c2c2c;padding:23px 0 51px;color:#fff;}
  .bot01{display: flex;align-items: center;}
  .bot01 span{font-size: 16px;}
  .bot02{border-color: #a0a0a0;padding-bottom: 15px;}
  .bot02_l h2{padding-top:40px;line-height:47px;font-size: 18px;font-weight: bold;}
  .bot02_l p{font-size: 14px;}
  .bot03{padding-top: 15px;}
  .bot03 p{font-size: 14px;}
  .w{width: 1200px; margin: 0 auto;}
</style>
