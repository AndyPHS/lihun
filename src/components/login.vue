
<template>
    <div class="login-box">
        <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
        <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto" show-message>
            <span class="login-title text-xl">欢迎登录</span>
            <div style="margin-top: 5px"></div>
            <el-form-item label="用户名" prop="name">
                <el-col :span="22">
                    <el-input type="text" v-model="loginForm.name"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-col :span="22">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <el-col :span="22">
                    <el-input :type="identifyCodeMsg.type"
                              v-model="loginForm.code"
                              :placeholder="identifyCodeMsg.placeholder"
                              @changeCode="changeCode">
                    </el-input>
                    <div class="vertical_code_block clear">
                        <div class="vertical_code_item vertical_code_figure" id="v_container" @click="changeCode">
                            <img :src='identifyCodeMsg.codeUrl' :key="loginForm.code_key" alt="">
                        </div>
                    </div>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginSubmit('loginForm')" v-html="denglu">{{denglu}}</el-button>
                <!-- <el-button type="primary" :loading="true">加载中</el-button> -->
                <!--<el-button type="primary" @click="onRegit('loginForm')">注册</el-button>-->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import {requestLogin} from '@/api/api/requestLogin.js'
  import {verifyCode} from '@/api/api/requestLogin.js'
  import {usersSelect} from '@/api/api/requestLogin.js'  // 查询角色
  // import vertical from '@/common/js/gVerify.js'
export default {
    name: "login",
    data() {
      return {
        permissions: [], // 用户权限
        permissionId: [], // 用户权限数组列表
        roles: [],
        rolesId: [],
        loginForm: {
          name: '',
          password: '',
          code:'',
          code_key:''
        },
        identifyCodeMsg:{
          type:'text',
          placeholder: '请输入验证码',
          value: '',
          codeUrl: '',
          widthClass: 'vertical'
        },
        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        loginFormRules: {
          name: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '验证码不可为空', trigger: 'blur'}
          ]
        },
        verifyCode: '', // 验证图形
        ifShade: false,
        denglu:'登录'

      }
    },
  mounted(){
    if(localStorage.getItem('roleType')=='questionnaireDemo'){
      localStorage.removeItem('roleType')
    }
    this.changeCode();
  },
    methods: {

      loginSubmit(formName) {
        // if(this.loginForm.name == "" || this.loginForm.password == ""){
        //   this.errorAlert('用户名和密码不能为空')
        // }else{
        //   this.denglu = '登录'
        // }

        // 为表单绑定验证功能
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
            requestLogin(this.loginForm).then((data)=>{
              if(data.data.status_code==200){
                localStorage.setItem('name', this.loginForm.name);
                // localStorage.setItem('password', this.loginForm.password);
                localStorage.setItem('token', data.data.data.token)
                usersSelect().then((data)=>{
                    this.permissions = data.data.permissions
                    this.roles = data.data.roles;
                    if (this.permissions !== []) {
                        this.permissions.forEach((item)=>{
                          this.permissionId.push(item.id)
                        })
                        this.roles.forEach((item)=>{
                          this.rolesId.push(item.name)
                        })
                        if (this.rolesId.indexOf('questionnaireDemo') > -1) {
                          localStorage.setItem('roleType', 'questionnaireDemo')
                          this.$router.replace("/UserSystem");
                          // this.$router.push({path:'/UserSystem?type=questionnaireDemo'});
                        } else {
                          this.$router.replace("/FileList");

                          // this.$router.push({path:'/FileList'});
                        }
                    }
                })
              }else if(data.data.status_code==100){
                this.errorAlert(data.data.message)
                // this.$router.replace("/FileList");
              }else if(data.data.status_code==102){
                this.errorAlert(data.data.message)
              }else{
                return
              }
              // this.showDialog = true
            }).catch((data)=>{
              this.errorAlert('密码或验证码错误，请重试')
              // console.log(data.message)
              if(data.data.status_code == 100 ){
                this.errorAlert('验证码错误')
              }else if(data.data.status_code == 102 ){
                this.errorAlert('密码错误')
              }

            });
          } else {
            this.errorAlert('重新登录')
            return false;
          };
        });
      },
      errorAlert(e) {
        this.$message.error(e);
      },
      changeCode (val) {
        verifyCode({cache:new Date().getTime()}).then((data)=>{
          this.identifyCodeMsg.codeUrl = data.data.img;
          this.loginForm.code_key = data.data.key;
        })

        this.identifyCodeMsg.codeUrl = val
      }
    }
  }
</script>

<style scoped lang="less">
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px palegreen;
    }
    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #66CD00;
        font-size: 30px;
        font-weight: bold;
    }
    .vertical_block {
    //.width;
        width: 5.8rem;
        margin: 0 auto;
    .vertical_code_block {
        position: absolute;
        right: 0.3rem;
        top: 0;
        width: 1.8rem;
        height:36px;

    .vertical_code_item {
        float: left;
        width: 1.8rem;
    }

    .vertical_code_figure {
        width: 1.8rem;
        height: 0.44 * 2rem;
    }
    }
    }

    .vertical_block > * {
        display: inline-block;
        float: left;
    }
</style>
