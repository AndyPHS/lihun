<template>
  <div class="all">
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <div class="c_m w" v-loading="fullscreenLoading">
      <div class="pt-12 px-12">
        <h2 class="text-left text-lg c_m_t">个人中心</h2>
        <div class="flex justify-around items-center" style="height: 500px;">
          <div class="m_l">
            <div class="flex justify-between mt-12">
              <h3 class="m_l_t font-bold">基础资料</h3>
              <span class="inline-block text-base hover:font-bold" @click="editBasic">编辑</span>
            </div>
            <div class="flex justify-between items-center">
              <ul class="xing mt-4">
                <li class="lis text-right">姓名:</li>
                <li class="lis text-right">性别:</li>
              </ul>
              <ul class="zan mt-4">
                <li class="lis text-left">
                  <span v-if="this.userMsg.name == null ">暂无</span>
				  <span v-else class="no-underline text-gray-400">{{this.userMsg.name}}</span>
                </li>
                <li class="lis text-left">
                  <span class="no-underline text-gray-400" v-if="this.userMsg.sex == 1">男</span>
                  <span class="no-underline text-gray-400" v-else-if="this.userMsg.sex == 2">女</span>
                  <span v-if="this.userMsg.sex == null ">暂无</span>
                </li>
              </ul>
            </div>
            <div class="mt-12">
              <h3 class="m_l_t font-bold">账号资料</h3>
            </div>
            <div class="flex justify-between items-center">
              <ul class="xing mt-4">
                <li class="lis text-right">手机号:</li>
                <li class="lis text-right">密码:</li>
                <li class="lis text-right">电子邮件:</li>
              </ul>
              <ul class="shou mt-4">
                <li class="lis text-left">
                  <span class="no-underline text-gray-400" v-if="this.userMsg.phone != ''">{{this.userMsg.phone}}</span>
                  <span v-else>暂无</span>
                </li>
                <li class="lis text-left">******</li>
                <li class="lis text-left">
                  <span class="no-underline text-gray-400" v-if="this.userMsg.email != null">{{this.userMsg.email}}</span>
                  <span v-else>暂无</span>
                </li>
              </ul>
              <ul class="xiu mt-4">
                <li class="lis text-left underline  hover:font-bold" @click="editPhone">修改</li>
                <li class="lis text-left underline  hover:font-bold" @click="editPassword">修改</li>
                <li class="lis text-left underline  hover:font-bold" @click="editEmail">修改</li>
              </ul>
            </div>
          </div>
          <div class="m_r w-1/3">
            <dl>
              <dt>
				<img v-if="this.userMsg.photo==null" class="inline-block toux" src="../../../assets/images/lihun/no_photo_img.jpg" alt="">
                <img v-else class="inline-block toux" :src="this.userMsg.photo" alt="">
              </dt>
              <dd @click="setImg">
                设置头像
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
    <div class="live"></div>
    <div class="text-left">
      <!-- 基础资料 -->
      <el-dialog title="编辑基础资料" :visible.sync="dialogFormVisible">
		<div class="pr-5 -ml-10">
			  <el-form :model="form" >
			    <el-form-item label="姓名" :label-width="formLabelWidth">
			      <el-input v-model="form.name" autocomplete="off" ref="formName"></el-input>
			    </el-form-item>
			    <el-form-item label="性别" :label-width="formLabelWidth">
			      <el-radio-group v-model="form.sex">
			        <el-radio label="1">男</el-radio>
			        <el-radio label="2">女</el-radio>
			      </el-radio-group>
			    </el-form-item>
			  </el-form>
		</div>
        <div slot="footer" class="dialog-footer pb-4">
			<div class="flex justify-around">
				<span class="anniu" @click="cancleBtn">取消</span>
				<span class="anniu" @click="saveBtn">保存</span>
			</div>
        </div>
      </el-dialog>
      <!-- 修改手机号01 -->
      <el-dialog title="修改手机号" :visible.sync="dialogPhone01">
        <el-form class="mt-6" :model="form">
          <h2 class="text-red-500 mb-2 ml-32">请输入{{this.userMsg.phone}}收到的验证码</h2>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.PhoneCode01" type="text" autocomplete="off" class="el-input__inner" ref="formPhoneCode01">
              </div>
			  <span class="spa hover:underline" v-show="IsGetCode01" @click="sendCode01">获取验证码</span>
			  <el-button v-show="!IsGetCode01" class="ml-5" type="primary" :loading="IsGetCode01">已发送，请查收（{{ PhoneCount }}s）</el-button>
			  <!-- <el-button v-if="this.IsGetCode01==false" class="ml-5" type="primary" @click="sendCode01">获取</el-button>
              <el-button v-if="this.IsGetCode01" class="ml-5" type="primary" :loading="IsGetCode01">已发送</el-button> -->
              
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu anniumima" @click="nextBtn">下一步</span>
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
            <span class="underline hover:font-bold cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
          </el-popover>
        </div>
      </el-dialog>
      <!-- 修改手机号02 -->
      <el-dialog title="修改手机号" :visible.sync="dialogPhone02">
        <el-form class="mt-6" :model="form">
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">手机号</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.newPhone" type="text" autocomplete="off" class="el-input__inner" ref="formNewPhone">
              </div>
			  
              <!-- <el-button v-if="this.IsGetCode02" class="ml-5" type="primary" :loading="IsGetCode02">已发送</el-button>
              <el-button v-if="this.IsGetCode02==false" class="ml-5" type="primary" @click="sendCode02">获取</el-button> -->
            </div>
          </div>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.PhoneCode02" type="text" autocomplete="off" class="el-input__inner" ref="formPhoneCode02">
              </div>
			  <span class="spa hover:underline" v-show="IsGetCode02" @click="sendCode02">获取验证码</span>
			  <el-button v-show="!IsGetCode02" class="ml-5" type="primary" :loading="IsGetCode02">已发送，请查收({{ count }}s)</el-button>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu anniumima" @click="savePhoneBtn">保存</span>
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
            <span class="underline hover:font-bold cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
          </el-popover>
        </div>
      </el-dialog>
      <!-- 修改密码01 -->
      <el-dialog title="修改密码" :visible.sync="dialogPassword01">
        <el-form class="mt-6" :model="form">
          <h2 class="text-red-500 mb-2 ml-32">请输入{{this.userMsg.phone}}收到的验证码</h2>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 80px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 100px;text-align: center;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.PasswordCode" autocomplete="off" class="el-input__inner" ref="formPasswordCode">
              </div>
			  <span class="spa hover:underline" v-show="IsGetPsCode01" @click="sendPsCode">获取验证码</span>
			  <el-button v-show="!IsGetPsCode01" class="ml-5" type="primary" :loading="IsGetPsCode01">已发送，请查收({{ PWcount }}s)</el-button>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu anniumima" @click="PassWordnextBtn">下一步</span>
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
            <span class="underline hover:font-bold cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
          </el-popover>
        </div>
      </el-dialog>
      <!-- 修改密码02 -->
      <el-dialog title="修改密码" :visible.sync="dialogPassword02">
        <el-form class="mt-6" :model="form">
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 150px;text-align:center">新密码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.passwordNew" type="password" autocomplete="off" class="el-input__inner" ref="formPasswordNew" style="width: 450px;">
              </div>

            </div>
          </div>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 150px;text-align:center">确认新密码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.passwordAgain" type="password" autocomplete="off" class="el-input__inner" ref="formPasswordAgain" style="width: 450px;">
              </div>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu" @click="PassWordsaveBtn">保存</span>
        </div>
      </el-dialog>
      <!-- 更新用户头像 -->
      <el-dialog title="设置头像" :visible.sync="dialogImg">
        <div class="touxiang">
            <form action="" class="text-center imbox">
			  <img v-if="this.userMsg.photo==''|| this.userMsg.photo==null " src="../../../assets/images/lihun/user_img.png" alt="">
			  <img v-else :src="this.userMsg.photo" alt="">
              <input name="imgs" class=" mx-auto mt-5 w-1/3" placeholder="上传头像" type="file" id='upfile' @change="selectFile">
            </form>
        </div>
        <h4 class="mt-3 text-center">图片格式JPG\JPEG\PNG\GIF格式，大小不超过10MB</h4>
        <div slot="footer" class="dialog-footer flex justify-around pb-4">
          <span class="anniu" @click="cancleImg">取消</span>
		  <span class="anniu" @click="saveImg">保存</span>
        </div>
      </el-dialog>
      <!-- 绑定邮箱 -->
      <el-dialog :title="this.isEmail==''?'绑定电子邮件':'修改电子邮件' " :visible.sync="dialogEmail01">
        <el-form class="mt-6" :model="form">
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">邮箱</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.email" type="text" autocomplete="off" class="el-input__inner" ref="formEmail">
              </div>
            </div>
          </div>
          <div data-v-6b6fd6b8="" class="el-form-item phoneBox">
            <label class="el-form-item__label" style="width: 120px;">验证码</label>
            <div class="el-form-item__content" style="margin-left: 120px;">
              <div data-v-6b6fd6b8="" class="el-input">
                <input  v-model="form.emailCode" type="text" autocomplete="off" class="el-input__inner" ref="formEmailCode">
              </div>
			  <span class="spa hover:underline" v-show="IsSendEmail" @click="sendEmailAc">获取验证码</span>
			  <el-button v-show="!IsSendEmail" class="ml-5" type="primary" :loading="IsSendEmail">已发送，请查收（{{ EmailCount }}s）</el-button>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer text-center pb-10">
          <span class="anniu" @click="saveEmailBtn">
			  <span v-if="this.isEmail==''">绑定</span>
			  <span v-if="this.isEmail!==''">修改</span>
		  </span>
        </div>
      </el-dialog>
    </div>
	<div v-if="dengluerrorBox==true" class="fixed errorBox">
		{{errorMsg}}
	</div>
	<lihun-bottom></lihun-bottom>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import lihun_bottom from '../../partials/lihun_bottom.vue'
import {updateUserName, phoneCode, phoneCodeV, updatePhone, uploadUserPhoto, updatePasswordPhone2, sendEmail, updateUserEmail, usersSelect} from '@/api/api/AgreementRequest.js'

// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'AgreementUser',
  components: {
    'lihun-head': lihun_head,
	'lihun-bottom': lihun_bottom
  },
  data () {
    return {
	  fullscreenLoading: false, // 加载框
	  dengluerrorBox: false, // 登录错误弹窗提示
	  errorMsg: '',
      phoneNum: null, // 用户手机号
      dialogFormVisible: false, // 基本信息弹窗
      dialogPhone01: false, // 修改手机号第一个弹窗
      IsGetCode01: true, // 是否发送旧手机验证码
      dialogPhone02: false, // 修改手机号第二个弹窗
      IsGetCode02: true, // 是否发送新手机验证码
      dialogPassword01: false, // 修改密码第一个弹窗
      dialogPassword02: false, // 修改密码第二个弹窗
      dialogEmail01: false, // 邮件弹窗
      IsGetPsCode01: true, // 是否发送密码验证码
      IsSendEmail: true, // 是否发送电子邮件
      dialogImg: false, // 设置头像弹窗
	  PhoneCount: '', // 修改手机号倒计时60秒
	  PhoneTimer: null,  // 修改手机号倒计时定时器
	  PWcount: '', // 修改密码倒计时60秒
	  PWtimer: null,  // 修改密码倒计时定时器
	  EmailCount: '', // 修改邮件倒计时60秒
	  EmailTimer: null,  // 修改邮件密码倒计时定时器
	  count: '',
	  timer: null,
      form: {
        name: '',
        sex: '',
        email: '',
        emailCode: '', // 邮件验证码
        newPhone: '',
        PhoneCode01: '',
        PhoneCode02: '',
        PasswordCode: '',
        passwordNew: '',
        passwordAgain: '',
        userImg: 'https://p1.ssl.qhimg.com/dr/220__/t0175c8a184eb7a7f87.jpg'
      },
      userMsg: {
        name: '',
        phone: '',
        email: null,
        password: '',
        photo: ''
      },
	  rename: '', // 修改名字
      formLabelWidth: '120px',
	  isEmail: ''
    }
  },
  mounted () {
    this.getPhone()
    this.getUserMsg() // 查询用户基本信息
	localStorage.setItem('topins',-1)
  },
  methods: {
	hideEmailInfo (email) {  //身份证，姓名加星号
	     if (String (email).indexOf ('@') > 0) {
			 let newEmail, str = email.split('@'), _s = '';
	 
			 if (str[0].length > 4) {
				 _s = str[0].substr (0, 4);
				 for (let i = 0; i < str[0].length - 4; i++) {
					 _s += '*';
				 }
			 } else {
				 _s = str[0].substr (0, 1);
				 for (let i = 0; i < str[0].length - 1; i++) {
					 _s += '*';
				 }
			 }
			 newEmail = _s + '@' + str[1];
			 return newEmail;
		 } else {
			 return email;
		 }
	},
	formatName(name) {
	    let newStr;
	    if (name.length === 2) {
	    newStr = name.substr(0, 1) + '*';
	    } else if (name.length > 2) {
	      let char = '';
	      for (let i = 0, len = name.length - 2; i < len; i++) {
	        char += '*';
	      }
	      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
	    } else {
	      newStr = name;
	    }
	
	    return newStr;
	 },
    getUserMsg () { // 查询用户基本信息
      usersSelect().then((data) => {
		  if (data.data.status_code == 401) {
			  localStorage.removeItem('token') // 存储token
			  localStorage.removeItem('phone')
			  localStorage.removeItem('isLogin')
			  this.$message.error('账号过期，请重新登录')
			  this.$router.replace('/')
		  } else  {
			  if(data.data.phone !=null){
				  var tel = data.data.phone
				  this.userMsg.phone = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			  }
			  if (data.data.name !='') {
				  var testname = data.data.name
				  this.userMsg.name = this.formatName(testname)
				  this.rename = data.data.name
			  } else {
				  this.userMsg.name = data.data.name
			  }
			 
			  this.userMsg.sex = data.data.sex
			  var  markEmail = data.data.email
			  this.isEmail = data.data.email
			  this.userMsg.email = this.hideEmailInfo(markEmail)
			  this.userMsg.photo = data.data.photo
			  this.form.name = this.userMsg.name
			  this.form.sex = JSON.stringify(this.userMsg.sex)
			  localStorage.setItem('name',this.userMsg.name)
			  // console.log(data.data.name)
		  } 
      })
    },
    getPhone () { // 获取子组件的手机号
      this.phoneNum = localStorage.getItem('phone')
    },
    editBasic () { // 点击编辑基础资料
      this.dialogFormVisible = true
	  this.form.name = this.rename
    },
    saveBtn () { // 确认编辑基础资料
	  var nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	  if( !nameReg.test(this.form.name)) {
		  this.$message({
		    message: '您输入的姓名不正确',
		    type: 'error'
		  })
		  this.$refs.formName.focus()
	  } else {
		  updateUserName({
		    name: this.form.name,
		    sex: this.form.sex
		  }).then((data) => {
		  		this.fullscreenLoading = true
		    if (data.data.status_code == 200) {
		      this.dialogFormVisible = false
			  
		      this.getUserMsg()
			  setTimeout(()=>{
				
				this.$message({
				  message: '修改成功',
				  type: 'success'
				})
				this.fullscreenLoading = false
				let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
				// 之后将页面push进去
				this.$router.push(NewPage)
				// 再次返回上一页即可
				this.$router.go(-1)
			  },2000)
		  		  
		    } else {
		      this.$message.error(data.data.message)
		    }
		  })
	  }
      
      // this.dialogFormVisible = false
    },
    cancleBtn () { // 取消编辑基础资料
      this.dialogFormVisible = false
	  this.form.name = ''
	  this.form.sex = null
    },
    editPhone () { // 点击修改手机号
      this.dialogPhone01 = true
      this.form.PhoneCode01 = ''
    },
    sendCode01 () { // 发送修改手机号验证码
      phoneCode({
        phone: this.phoneNum,
        type: 2
      }).then((data) => {
        if (data.data.status_code == 200) {
          const TIME_COUNT = 60;
           if (!this.PhoneTimer) {
             this.PhoneCount = TIME_COUNT;
             this.IsGetCode01 = false;
             this.PhoneTimer = setInterval(() => {
				 if (this.PhoneCount > 0 && this.PhoneCount <= TIME_COUNT) {
				 this.PhoneCount--;
				} else {
				 this.IsGetCode01 = true;
				 clearInterval(this.PhoneTimer);
				 this.PhoneTimer = null;
				}
             }, 1000)
           }
        } else {
          this.$message.error('发送失败，请联系后台人员')
        }
      })
    },
    nextBtn () { // 手机号弹窗下一步	
	  if(!(/^\d{6}$/.test(this.form.PhoneCode01))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '验证码有误，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
		this.$refs.formPhoneCode01.focus()
	  	return false; 
	  } else {
		  phoneCodeV({   // 单独验证手机号
			  phone: this.phoneNum,
			  type: 2,
			  code: this.form.PhoneCode01
		  }).then((data)=>{
			  if (data.data.status_code == 200){
				  this.form.newPhone = ''
				  this.form.PhoneCode02 = ''
				  this.dialogPhone01 = false
				  this.dialogPhone02 = true
				  this.IsGetCode01 = false
			  } else {
				  this.dengluerrorBox = true
				  this.errorMsg = '验证码有误，请重新填写'
				  setTimeout(()=>{
				  	this.dengluerrorBox = false
				  },1000)
				  this.$refs.formPhoneCode01.focus()
			  }
			  
		  })
		  
	  }
    },
    sendCode02 () { // 发送新手机号验证码
	  if(!(/^1[3456789]\d{9}$/.test(this.form.newPhone))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '手机号有误，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
	  	this.$refs.formNewPhone.focus()
	  	return false; 
	  } else {
		phoneCode({
		  phone: this.form.newPhone,
		  type: 2
		}).then((data) => {
		  if (data.data.status_code == 200) {
		    const TIME_COUNT = 60;
		     if (!this.timer) {
		       this.count = TIME_COUNT;
		       this.IsGetCode02 = false;
		       this.timer = setInterval(() => {
				 if (this.count > 0 && this.count <= TIME_COUNT) {
				 this.count--;
				} else {
				 this.IsGetCode02 = true;
				 clearInterval(this.timer);
				 this.timer = null;
				}
		       }, 1000)
		     }
		  } else {
				   this.$message.error('手机号输入错误，请重新输入')
		  }
		})
	  }
    },
    savePhoneBtn () { // 保存新手机号
	  if(!(/^1[3456789]\d{9}$/.test(this.form.newPhone))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '手机号有误，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
	  	this.$refs.formNewPhone.focus()
	  	return false; 
	  } else if(!(/^\d{6}$/.test(this.form.PhoneCode02))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '验证码有误，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
		this.$refs.formPhoneCode02.focus()
	  	return false; 
	  } else {
		  updatePhone({
		    phone: this.form.newPhone,
		    code: this.form.PhoneCode02,
		    old_phone: this.phoneNum,
		    old_code: this.form.PhoneCode01
		  }).then((data) => {
		    if (data.data.status_code == 200) {
		      this.IsGetCode02 = false
		      this.phoneNum = this.form.newPhone
		      localStorage.setItem('phone', this.phoneNum)
		      this.dialogPhone02 = false
		      this.$message({
		        message: '手机号码修改成功',
		        type: 'success'
		      })
		      this.getUserMsg()
		    } else {
		      this.$message({
		        message: data.data.message,
		        type: 'error'
		      })
		    }
		  })
	  }
      
    },
    editPassword () { // 点击修改密码弹窗
      this.dialogPassword01 = true
	  this.form.PasswordCode = ''
	  this.IsGetPsCode01 = true
    },
    sendPsCode () {   // 发送修改密码验证码
      phoneCode({
        phone: this.phoneNum,
        type: 4
      }).then((data) => {
        if (data.data.status_code == 200) {
          const TIME_COUNT = 60;
           if (!this.PWtimer) {
             this.PWcount = TIME_COUNT;
             this.IsGetPsCode01 = false;
             this.PWtimer = setInterval(() => {
          	 if (this.PWcount > 0 && this.PWcount <= TIME_COUNT) {
          	 this.PWcount--;
          	} else {
          	 this.IsGetPsCode01 = true;
          	 clearInterval(this.PWtimer);
          	 this.PWtimer = null;
          	}
             }, 1000)
           }
        } else {
          this.$message.error('发送失败，请联系后台人员')
        }
      })
    },
    PassWordnextBtn () { // 修改密码弹窗下一步
	  if(!(/^\d{6}$/.test(this.form.PasswordCode))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '验证码有误，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
		this.$refs.formPasswordCode.focus()
	  	return false; 
	  } else {
		  phoneCodeV ({
		  	phone: this.phoneNum,
		  	type: 4,
		  	code: this.form.PasswordCode
		  }).then((data)=>{
		  	if (data.data.status_code == 200) {
			   this.dialogPassword01 = false
			   this.dialogPassword02 = true
			   this.IsGetPsCode01 = false
		  	} else {
			   this.dengluerrorBox = true
			   this.errorMsg = '验证码有误，请重新填写'
			   setTimeout(()=>{
				 this.dengluerrorBox = false
			   },1000)
			   this.$refs.formPasswordCode.focus()
		  	}
		  })
		  
	  }
    },
    PassWordsaveBtn () {
	  if(this.form.passwordNew==''){
		  this.dengluerrorBox = true
		  this.errorMsg = '密码不能为空'
		  setTimeout(()=>{
		  	this.dengluerrorBox = false
		  },1000)
		  this.$refs.formPasswordNew.focus()
	  } else if (this.form.passwordAgain=='') {
		  this.dengluerrorBox = true
		  this.errorMsg = '密码不能为空'
		  setTimeout(()=>{
		  	this.dengluerrorBox = false
		  },1000)
		  this.$refs.formPasswordAgain.focus()
	  } else if (this.form.passwordNew == this.form.passwordAgain) {
        updatePasswordPhone2({
          phone: this.phoneNum,
          password: this.form.passwordNew,
		  passwordagain: this.form.passwordAgain
        }).then((data) => {
          if (data.data.status_code == 200) {
            this.dialogPassword02 = false
            this.$message({
              message: '密码修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: data.data.message,
              type: 'error'
            })
          }
        })
      } else {
        this.$message({
          message: '密码输入不一致',
          type: 'error'
        })
      }
    },
    setImg () {
      this.dialogImg = true
    },
    saveImg () {
      const formData = new FormData()
      let imgFiles = $('#upfile')[0].files[0]
      formData.append('files', imgFiles)
      uploadUserPhoto(formData).then((data) => {
        if (data.data.status_code === 200) {
          this.$message({
            message: '头像更新成功',
            type: 'success'
          })
          this.dialogImg = false
          this.getUserMsg()
        } else {
          this.$message({
            message: data.data.message,
            type: 'error'
          })
        }
      })
    },
    cancleImg () {
      this.dialogImg = false
    },
    selectFile () {
      let imgFiles = $('#upfile')[0].files[0]
      if (imgFiles && imgFiles.length) {
        for (let item of imgFiles) {
          let size = item.size / 1024 / 1024
          if (size > 5) {
            this.$message.error('单张图片大小不能超过5M')
            return false
          }
        }
      }
    },
    editEmail () { // 绑定电子邮箱
      this.dialogEmail01 = true
    },
    saveEmailBtn () { // 确认绑定邮件
	  if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.form.email))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '邮箱格式不正确，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
		this.$refs.formEmail.focus()
	  	return false; 
	  } else {
		if(!(/^\d{6}$/.test(this.form.emailCode))){
			this.dengluerrorBox = true
			this.errorMsg = '验证码有误，请重新填写'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.formEmailCode.focus()
			return false; 
		} else {
			updateUserEmail({
			  email: this.form.email,
			  code: this.form.emailCode
			}).then((data) => {
			  if (data.data.status_code === 200) {
			    this.dialogEmail01 = false
			    this.$message({
			      message: '邮箱绑定成功',
			      type: 'success'
			    })
			    this.getUserMsg()
			  } else if(data.data.status_code == '32046') {
			    this.$message({
			      message: '验证码错误，请重新输入',
			      type: 'error'
			    })
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
    sendEmailAc () { // 发送邮件验证码
	  if (this.form.email==''){
		  this.dengluerrorBox = true
		  this.errorMsg = '邮箱不能为空，请重新填写'
		  setTimeout(()=>{
		  	this.dengluerrorBox = false
		  },1000)
		  this.$refs.formEmail.focus()
	  } else if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.form.email))){
	  	this.dengluerrorBox = true
	  	this.errorMsg = '邮箱格式不正确，请重新填写'
	  	setTimeout(()=>{
	  		this.dengluerrorBox = false
	  	},1000)
		this.$refs.formEmail.focus()
	  	return false; 
	  } else {
		 sendEmail({
		   email: this.form.email
		 }).then((data) => {
		   if (data.data.status_code == 200) {
		     const TIME_COUNT = 60;
		      if (!this.EmailTimer) {
		        this.EmailCount = TIME_COUNT;
		        this.IsSendEmail = false;
		        this.EmailTimer = setInterval(() => {
		     	 if (this.EmailCount > 0 && this.EmailCount <= TIME_COUNT) {
		     	 this.EmailCount--;
		     	} else {
		     	 this.IsSendEmail = true;
		     	 clearInterval(this.EmailTimer);
		     	 this.EmailTimer = null;
		     	}
		        }, 1000)
		      }
		   } else {
		     this.$message({
		       message: data.data.message,
		       type: 'error'
		     })
		   }
		 }).catch(()=>{
		 		  
		 }) 
	  }
    },
	getHeadActive (data) {
		localStorage.setItem('topins',data)
	}
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_t{font-size: 20px;}
.m_l{width: 320px;}
.m_l span{font-size: 15px;color:#829fe8;text-decoration: underline;cursor: pointer;}
.m_r dl dd{width: 87px;height: 25px;text-align: center;line-height: 25px;font-size: 15px;color: #547ce0; border:1px solid #547ce0;border-radius: 12px;margin:18px auto;}
.m_r dl dd:hover{background-color: #547ce0;color: #fff;}
.toux{width: 200px;height: 200px;border-radius: 50%;}
.m_l_t, .xing{width: 83px;}
.zan{width: 229px;}
.lis{font-size: 15px;color:#818181;margin:5px 0;}
.lis span{color:#818181;text-decoration: none;}
.shou{width: 198px;}
.xiu{width: 33px;}
.xiu li{color:#7696e6;cursor: pointer;}
.anniu{width: 220px;height: 40px;text-align: center;line-height: 40px;font-size: 18px;border:1px solid #878787;border-radius:20px;margin:0 20px;display: inline-block;cursor: pointer;}
.anniu:last-of-type{color:#ff3f68;border: 1px solid #ff3f68;}
.anniumima{color:#ff3f68;border: 1px solid #ff3f68;}
.anniu:hover{color:#fff;border: 1px solid #ff3f68;background-color: #ff3f68;}
/* .anniu:last-of-type:hover{color: #fff;background-color: #878787;} */
.phoneBox .el-form-item__content {display: flex !important;}
.phoneBox .el-input{width: 372px;}
.touxiang{width: 520px;height: 300px;margin:0 auto;background-color: #eceff4;}
.imbox{text-align: center;margin: 0;display: flex;flex-direction: column;align-items: center;padding-top: 40px;}
.imbox img{width: 149px;height: 149px;background: #fff;border-radius: 50%;display: inline-block;}
.errorBox{width: 300px;height: 48px;line-height: 48px;background-color:#feebef;color:#f81b1b;z-index: 3000;top:20px;left: 50%;margin-left: -150px;font-size: 15px;border-radius: 5px;}
.spa{display: inline-block;width: 120px;height: 38px;line-height:38px;text-align: center;color: #fff;font-size:16px;background: #547ce0;cursor: pointer;border-radius: 10px;border:1px solid #547ce0;margin-left: 20px;}
.regist .el-dialog{width: 640px;}
</style>
