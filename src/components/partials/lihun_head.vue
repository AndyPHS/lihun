<template>
  <div>
    <div class="head flex items-center">
      <div class="w flex justify-between">
        <div class="flex justify-between items-center">
          <img class="mr-3" src="../../assets/images/lihun/logo.png" alt="">
          <el-divider direction="vertical"></el-divider>
          <span class="log_r">北京家理律师事务所出品</span>
        </div>
        <div class="flex justify-between items-center">
          <ul class="nav flex justify-around items-center">
            <li>
              <router-link to="Home">首页</router-link>
            </li>
            <li>
              <router-link to="Knowledge">离婚知识</router-link>
            </li>
            <li>
              <router-link to="MyConsult">定制我的离婚协议书</router-link>
            </li>
            <li><a href="http://www.jialilaw.com/" target="_blank">家理律所官网</a></li>
          </ul>
          <div v-if="this.isLogin==false" class="loginBox flex justify-around items-center">
            <span class="cursor-pointer" @click="loginAc">登录</span>
            <el-divider direction="vertical"></el-divider>
            <span class="cursor-pointer" @click="registAc">注册</span>
          </div>
          <div v-else class="flex justify-around items-center">
            <el-dropdown>
              <span class="el-dropdown-link text-blue-500 border-b border-blue-500 cursor-pointer">{{ this.userPhone }}<i class="el-icon-arrow-down el-icon--right"></i></span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  @click.native="goAgreementUser">个人中心</el-dropdown-item>
                <el-dropdown-item class="text-center" @click.native="liveOut">退出</el-dropdown-item>
              </el-dropdown-menu>
              <!-- <img class="ml-2 cursor-pointer" src="../../assets/images/lihun/user_icon.png" alt=""> -->
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div>
      <!-- 基础资料 -->
      <div v-if="dialogFormVisible==true" class="el-dialog__wrapper regist" style="z-index: 2001;">
        <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
          <div class="el-dialog__header"><span class="el-dialog__title"></span><button type="button" aria-label="Close" @click="closeDialog"
              class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div>
          <div class="el-dialog__body">
            <form class="el-form">
              <div class="flex mb-12 w-full items-center regist_header">
                <span :class="{'registOkbg':!this.zhuce}">1.填写注册资料</span>
                <span :class="{'registOkbg':this.zhuce}">2.完成注册</span>
              </div>
              <div v-if="this.zhuce">
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input type="number" v-model="form.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner">
                    </div>
                  </div>
                </div>
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input type="password" v-model="form.password" placeholder="请输入密码,由数字和字母组成(区分大小写)" autocomplete="off" class="el-input__inner">
                    </div>
                  </div>
                </div>
                <div class="yanzheng el-form-item">
                  <div class="el-form-item__content flex justify-between">
                    <input type="number" v-model="form.valueCode" placeholder="请输入验证码" autocomplete="off" class="el-input__inner">
                    <span class="spa" v-if="this.registYan == false" @click="getYan">获取验证码</span>
                    <el-button v-if="this.registYan" class="ml-5" type="primary" :loading="registYan">已发送,请查收</el-button>
                  </div>
                  <div class="el-form-item__content text-right underline text-blue-300 my-4">
                   <el-popover
                     placement="right"
                     width="400"
                     trigger="hover">
                     <div>
                       <h5>手机接收不到验证码，可能有以下几种原因</h5>
                       <ul>
                         <li>1) 输入的手机号错误；</li>
                         <li>2) 手机网络环境差；</li>
                         <li>3）手机已欠费；</li>
                         <li>4）将发送验证码的号码加入了黑名单或被手机中安装的安全软件拦截；</li>
                         <li>5）您曾向运营商申请屏蔽通知类短信；</li>
                         <li>6）系统出现了错误。</li>
                       </ul>
                       <p>若是您手机原因，您可以拨打手机网络运营商，转接到人工服务，说明情况以后由他们帮您处理。</p>
                       <p>若是系统出现错误，您需要耐心等待，若还是接收不到，可联系客服。</p>
                     </div>
                     <span class="underline cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
                   </el-popover>
                  </div>
                </div>
                <div class="text-center">
                  <el-checkbox-group v-model="checkOne" class="checkGroup" >
                    <el-checkbox  label="" @change="handleCheckedCitiesChange">我已阅读并同意《家文使用协议》</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="el-dialog__footer text-center mt-4 pb-12">
                  <span class="nextSt" @click="nextSt">下一步</span>
                </div>
              </div>
              <div v-else class="">
                 <dl>
                   <dt class="py-24">
                     <img class="inline-block mx-auto" src="../../assets/images/lihun/duigou.png" alt="">
                     <h2 class="text-center pt-3">恭喜您注册成功</h2>
                   </dt>
                   <dd class="registOk">
                     <span>开始定制我的协议</span>
                     <span>进入官网主页</span>
                   </dd>
                 </dl>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- 登录弹窗 -->
      <div v-if="dialogLogin==true" class="el-dialog__wrapper regist" style="z-index: 2001;">
        <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
          <div class="el-dialog__header"><span class="el-dialog__title"></span><button type="button" aria-label="Close" @click="closeLoginDialog"
              class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div>
          <div class="el-dialog__body">
            <form class="el-form">
              <div class="w-full text-xl text-center pt-12">
                登录
              </div>
              <div>
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input type="number" v-model="form.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner">
                    </div>
                  </div>
                </div>
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input type="password" v-model="form.password" placeholder="请输入密码,由数字和字母组成(区分大小写)" autocomplete="off" class="el-input__inner">
                    </div>
                  </div>
                </div>
                <div class="logyan el-form-item__content flex justify-between items-center">
                  <input type="text" v-model="form.valueCode" placeholder="请输入验证码" autocomplete="off" class="el-input__inner">
                  <div>
                    <img class="code_key_img inline-block mx-2" :src='identifyCodeMsg.codeUrl' :key='form.code_key'  alt="">
                  </div>
                  <span class="spa"  @click="changeCode">刷新验证码</span>

                </div>
                <div class="mt-3">
                  <p class="de text-right text-blue-400 mt-3">
                    <span class="cursor-pointer" @click="forgetAc">忘记密码</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="cursor-pointer" @click="goregist">注册</span>
                  </p>
                </div>
                <div class="el-dialog__footer text-center mt-10 pb-12">
                  <span class="nextSt" @click="loginBt">登录</span>
                  <p class="text-center pt-4">登录即表示阅读并同意《家文使用协议》</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- 重置密码弹窗1 -->
      <div v-if="forgetDialog==true" class="el-dialog__wrapper regist" style="z-index: 2001;">
        <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
          <div class="el-dialog__header"><span class="el-dialog__title"></span><button type="button" aria-label="Close" @click="closeforgetDialog"
              class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div>
          <div class="el-dialog__body">
            <form class="el-form">
              <div class="w-full text-xl text-left pt-12 pl-12">
                重置密码
              </div>
              <div>
                <div class="el-form-item py-20 mt-0">
                  <div class="el-form-item__content">
                    <div class="el-input p text-left">
                      <span class="inline-block text-lg">请输入要重置密码的手机号码</span>
                      <input type="number" v-model="form.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner">
                    </div>
                  </div>
                </div>
                <div class="el-dialog__footer text-center mt-10 pb-12">
                  <span class="nextSt" @click="forgetNext">下一步</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- 重置密码弹窗2 -->
      <div v-if="forgetDialog2==true" class="el-dialog__wrapper regist" style="z-index: 2001;">
        <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
          <div class="el-dialog__header"><span class="el-dialog__title"></span><button type="button" aria-label="Close" @click="closeforgetDialog2"
              class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div>
          <div class="el-dialog__body">
            <form class="el-form">
              <div class="w-full text-xl text-left pt-12 pl-12">
                重置密码
              </div>
              <div>
                <div class="py-5 mt-0">
                  <div class="el-form-item__content">
                    <div class="el-input p text-center">
                      <span class="inline-block text-lg py-3">您正在对账号<span class="text-red-500">{{this.form.phone}}</span>进行重置密码操作</span>
                      <div>
                        <img class="inline-block mb-3" src="../../assets/images/lihun/yanzheng01.png" alt="">
                        <img class="inline-block mb-3" src="../../assets/images/lihun/yanzheng02.png" alt="">
                      </div>
                      <p class="py-8 text-center">若上述方式均无法验证，您可以<span class="text-blue-500 underline" @click="xiufu">申请账号修复</span></p>
                    </div>
                  </div>
                </div>
                <div class="el-dialog__footer steall text-center pb-12 flex justify-between">
                  <span class="ste" @click="forgetPrev">上一步</span>
                  <span class="ste" @click="forgetNext2">下一步</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addUser, phoneCode, frontLogin} from '@/api/api/AgreementRequest.js'
import {verifyCode} from '@/api/api/requestLogin.js'

export default {
  name: 'lihun_head',
  data () {
    return {
      dialogFormVisible: false, // 注册弹窗
      dialogLogin: false, // 登录弹窗
      userPhone: null, // 登录后存储用户手机号
      isLogin: false,  // 判断用户是否登录
      form: {
        phone: null,
        password: '',
        valueCode: null, // 验证码
        code_key: '' // 验证码的KEY
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
      zhuce: true, // 注册成功状态码
      forgetDialog: false, // 忘记密码弹窗
      forgetDialog2: false // 忘记密码2

    }
  },
  mounted () {
    this.changeCode()
  },
  methods: {
    goAgreementUser () {
      this.$router.replace('/AgreementUser')
    },
    liveOut () { // 点击退出登录
      this.isLogin = false
      localStorage.removeItem('token') // 存储token
      localStorage.removeItem('phone')
      localStorage.removeItem('isLogin')
    },
    registAc () { // 点击注册按钮
      this.form = {}
      this.dialogFormVisible = true
    },
    closeDialog () { // 点击注册弹窗关闭按钮
      this.dialogFormVisible = false
      this.registYan = false
    },
    handleCheckedCitiesChange () {
      console.log(this.checkOne)
    },
    getYan () { // 获取验证码
      if (this.form.phone != null) {
        phoneCode({
          phone: this.form.phone,
          type: 1
        }).then((data) => {
          if (data.data.status_code !== 200) {
            this.$message.error('手机号格式不正确')
          } else {
            this.registYan = true
            setInterval(function () {
              this.registYan = false
            }, 10000)
          }
        })
      } else {
        this.$message.error('手机号不能为空')
      }
    },
    nextSt () { // 点击注册成功下一步
      if (this.checkOne) {
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
            this.zhuce = false
          } else {
            this.$message({
              message: data.data.message,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '请先阅读家文使用协议',
          type: 'warning'
        })
      }
    },
    loginAc () { // 点击登录按钮
      this.form.phone = ''
      this.form.password = ''
      this.form.valueCode = ''
      this.dialogLogin = true
    },
    closeLoginDialog () { // 点击登录关闭按钮
      this.dialogLogin = false
    },
    goregist () { // 点击登录弹窗中的注册按钮
      this.form = {}
      this.dialogLogin = false
      this.dialogFormVisible = true
    },
    loginBt () { // 点击登录中的登录按钮
      frontLogin({
        phone: this.form.phone,
        password: this.form.password,
        code: this.form.valueCode,
        code_key: this.form.code_key
      }).then((data) => {
        if(data.data.status_code ===200){
          this.dialogLogin = false
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.userPhone = this.form.phone
          localStorage.setItem('token', data.data.data.token) // 存储token
          localStorage.setItem('phone', this.form.phone)
          localStorage.setItem('isLogin', true)
          this.form = {}
          this.isLogin = true
          this.$emit('sendPhone', this.userPhone)
        } else {
          this.$message.error(data.data.message);
        }
      })
    },
    changeCode (val) {
      verifyCode({cache:new Date().getTime()}).then((data) => {
        this.identifyCodeMsg.codeUrl = data.data.img
        this.form.code_key = data.data.key
      })
      this.userPhone = localStorage.getItem('phone')
      if (localStorage.getItem('isLogin') != undefined) {
        this.isLogin = localStorage.getItem('isLogin')
      } else {
        this.isLogin = false
      }
    },
    forgetAc () { // 点击忘记密码
      this.forgetDialog = true
      this.form.phone = ''
      this.dialogLogin = false
    },
    closeforgetDialog () { // 点击忘记密码弹窗关闭按钮
      this.forgetDialog = false
    },
    forgetNext () { // 点击忘记密码弹窗1下一步
      this.forgetDialog = false
      this.forgetDialog2 = true
    },
    forgetPrev () { // 点击忘记密码弹窗2上一步
      this.forgetDialog = true
      this.forgetDialog2 = false
    },
    forgetNext2 () { // 点击忘记密码弹窗2下一步

    },
    xiufu () {
      console.log('修复')
    },
    closeforgetDialog2 () {
      this.forgetDialog2 = false
    }
  }
}
</script>

<style scoped>
  .w {
    width: 1200px;
    margin: 0 auto;
  }

  .head {
    height: 92px;
    background-color: #fff;
  }

  .log_r {
    color: #878787;
    font-size: 14px;
  }

  .nav {
    width: 530px;
    font-size: 18px;
  }

  .nav li:hover {
    color: #547ce0;
    cursor: pointer;
  }

  .loginBox {
    width: 99px;
    height: 24px;
    border: 1px solid #547ce0;
    border-radius: 12px;
    margin-left: 38px;
    padding: 0 10px;
  }

  .loginBox span {
    font-size: 14px;
    color: #547ce0;
    cursor: pointer;
  }

  .regist .el-dialog__header {padding: 0px 0}
  .regist_header>span{width: 50%; font-size: 22px; text-align: center;padding: 16px 0;}
  .registOkbg{background-color: #eceff4;}
  .regist{background-color: rgba(0,0,0,0.5);}
  .regist .el-dialog{width: 640px;}
  .regist .el-dialog__body{padding:0px 0px;}
  .regist .el-dialog__body .el-form-item:first-of-type{margin-top: 46px;margin-bottom:22px}
  .regist .el-form-item__content, .de{width: 485px;margin:0 auto;}
  .regist .el-dialog__headerbtn{top:-30px;right: 0px;}
  .regist .el-dialog__headerbtn .el-dialog__close{color: #fff;}
  .yanzheng input{width: 348px;height: 40px;line-height: 40px;}
  .logyan input{width: 208px;height: 40px;line-height: 40px;}
  .code_key_img{width: 100px;}
  .yanzheng .spa{display: inline-block;width: 120px;height: 38px;line-height:38px;text-align: center;color: #fff;font-size:18px;background: #547ce0;cursor: pointer;border-radius: 10px;border:1px solid #547ce0;}
  .logyan .spa{display: inline-block;width: 120px;height: 38px;line-height:38px;text-align: center;color: #fff;font-size:18px;background: #547ce0;cursor: pointer;border-radius: 10px;border:1px solid #547ce0;}
  .el-form-item__content::after, .el-form-item__content::before{display: none;}
  .nextSt{display: inline-block;margin:0 auto;width: 317px;height: 38px;text-align: center;line-height: 38px;border: 1px solid #ff3f68;color:#ff3f68;cursor: pointer;border-radius: 19px;font-size: 18px;}
  .nextSt:hover{background-color: #ff3f68;color:#fff}
  .registOk{width: 428px;display: flex;margin: 0 auto;padding-bottom: 70px;justify-content: space-between;}
  .registOk span{width:194px;text-align: center;height: 38px;line-height: 38px;font-size: 18px;display: inline-block;cursor: pointer;border-radius: 19px;}
  .registOk span:first-of-type{border:1px solid #ff3f68;color: #fff;background-color: #ff3f68;}
  .registOk span:last-of-type{border:1px solid #535353;color:#535353;}
  .steall{width: 525px;margin:0 auto;}
  .ste{width: 220px;height: 38px;text-align: center;line-height: 38px;border-radius: 19px;font-size: 18px;}
  .ste:first-of-type{border:1px solid #343434;color:#343434;}
  .ste:first-of-type:hover{background-color: grey;color:#fff}
  .ste:last-of-type{border:1px solid red;color:red;}
  .ste:last-of-type:hover{background-color: red;color:#fff;}
</style>
