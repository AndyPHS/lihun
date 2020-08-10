<template>
  <div>
    <div class="head flex items-center">
      <div class="w flex justify-between">
        <div class="flex justify-between items-center">
		  <router-link to="/"><img class="mr-3 cursor-pointer" src="../../assets/images/lihun/logo.png" alt=""></router-link>
          
          <el-divider class="hidden md:block" direction="vertical"></el-divider>
          <span class="log_r hidden md:block">离婚协议书</span>
        </div>
        <div class="flex justify-between items-center">
          <ul class="nav flex justify-around items-center">
			<li v-for="(item,index) in nav" :key="index" :class="topins == index?'activered':'default'" @click="goDingZhi(index)">
				{{ item.name }}
			</li>
          </ul>
          <div v-if="this.isLogin==false" class="loginBox flex justify-around items-center">
            <span class="cursor-pointer hover:underline" @click="loginAc">登录</span>
            <el-divider direction="vertical"></el-divider>
            <span class="cursor-pointer hover:underline" @click="registAc">注册</span>
          </div>
		  
          <div v-else class="flex justify-around items-center relative">
			<div @click="dengluBox = !dengluBox">
				<span v-if="this.UserName== 'null' || this.UserName== undefined " class="el-dropdown-link text-b border-b border-blue-500 cursor-pointer">{{ this.userPhone }}<i class="el-icon-arrow-down el-icon--right"></i></span>
				<span v-else class="el-dropdown-link text-b cursor-pointer hover:underline">{{ this.UserName }}<i class="el-icon-arrow-down el-icon--right"></i></span>
			</div>
			<div v-if="this.dengluBox" class="absolute denglu" id="dengluBox">
				<ul>
					<li class="cursor-pointer" @click="goMyconsult">我的协议</li>
					<li class="cursor-pointer" @click="goAgreementUser">个人中心</li>
					<li class="cursor-pointer" @click="liveOut">退出</li>
				</ul>
			</div>
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
          <div class="el-dialog__body" id="dialogFormVisible">
            <form class="el-form">
              <div class="flex mb-12 w-full items-center regist_header">
                <span :class="{'registOkbg':!this.zhuce}" class="cursor-pointer">1.填写注册资料</span>
                <span :class="{'registOkbg':this.zhuce}" class="cursor-pointer">2.完成注册</span>
              </div>
              <div v-if="this.zhuce">
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input type="text" v-model="form.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner" ref="zhucePhone">
                    </div>
                  </div>
                </div>
                <div class="el-form-item">
                  <div class="el-form-item__content">
					  <el-input placeholder="请输入密码" v-model="form.password" show-password ref="zhucePassword"></el-input>
                  </div>
                </div>
                <div class="yanzheng el-form-item">
                  <div class="el-form-item__content flex justify-between">
					<div class="relative">
					  <input v-model="form.valueCode" placeholder="请输入验证码" autocomplete="off" class="el-input__inner" ref="zhuceValueCode">
					  <div class="wenti">
						 <el-popover
						 placement="right"
						 width="400"
						 trigger="click">
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
						 <!-- <span class="hover:font-bold cursor-pointer text-blue-500" slot="reference">收不到验证码？</span> -->
						 <div class="wenhaobox" slot="reference"></div>
						 <!-- <img src="../../assets/images/lihun/wenhao.png" alt=""> -->
						 </el-popover>
					  </div>
					</div>
                    <span class="spa hover:underline" v-show="registYan" @click="getYan">获取验证码</span>
                    <span v-show="!registYan" class="spa" type="primary" :loading="registYanType">已发送({{ count }}s）</span>
                  </div>
                  <div class="el-form-item__content flex justify-end mt-2 my-4">
					<!-- <div>
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
						 <span class="hover:font-bold cursor-pointer text-blue-500" slot="reference">收不到验证码？</span>
					   </el-popover>
				    </div> -->
					<div class="flex items-center ml-2">
						<!-- <el-divider class="hidden md:block" direction="vertical"></el-divider> -->
						<span  class="inline-block text-gray-500">已有账号，<span @click="goLoginAction" class="inline-block underline text-blue-500 hover:font-bold cursor-pointer">登录</span></span>
					</div>
                  </div>
                </div>
                
                <div class="el-dialog__footer text-center mt-4">
                  <span class="nextSt" @click="nextSt">注 &nbsp;册</span>
                </div>
				<div class="text-center pb-12">
				  <div class="flex justify-start items-center mx-auto" style="width: 342px;">
					  <img style="width:16px;height:16px" class="inline-block" @click="changeSelectAc" v-if="this.checkOne==false" src="../../assets/images/lihun/unchecked.png" alt="">
					  <img style="width:16px;height:16px" class="inline-block" @click="changeSelectAc" v-if="this.checkOne==true" src="../../assets/images/lihun/checked.png" alt="">
					  <p class="ml-1">我已阅读并同意<span @click="handleCheckedCitiesChange" class="hover:font-bold underline inline-block text-blue-500">《蜗牛家事用户注册和使用协议》</span></p>
				  </div>
				</div>
              </div>
              <div v-else class="">
                 <dl>
                   <dt class="py-24">
                     <img class="inline-block mx-auto" src="../../assets/images/lihun/duigou.png" alt="">
                     <h2 class="text-center pt-3">恭喜您注册成功</h2>
                   </dt>
                   <dd class="registOk">
                     <span @click="gologin">开始定制我的协议</span>
                     <span @click="goguanwang">进入官网主页</span>
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
          <div class="el-dialog__body" id='dialogLogin'>
            <form class="el-form">
              <div class="flex mb-12 w-full items-center regist_header">
                <span @click="dengluTabAc" :class="{'registOkbg':!this.dengluTab}" class="cursor-pointer">快捷登录</span>
                <span @click="dengluTabAc" :class="{'registOkbg':this.dengluTab}" class="cursor-pointer">账号登录</span>
              </div>
              <div v-if="this.dengluTab == false">
                <div class="el-form-item">
                  <div class="el-form-item__content">
                    <div class="el-input">
                      <input type="text" v-model="loginForm.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner" ref="loginmmPhone">
                    </div>
                  </div>
                </div>
                <div class="el-form-item mt-5">
                  <div class="el-form-item__content">
                    <el-input placeholder="请输入密码(区分大小写)" v-model="loginForm.password" show-password  ref="loginmmPassword"></el-input>
                  </div>
                </div>
               <!-- <div class="logyan el-form-item__content flex justify-between items-center">
                  <input type="text" v-model="loginForm.valueCode" placeholder="请输入验证码(区分大小写)" autocomplete="off" class="el-input__inner" ref="loginValueCode">
                  <div>
                    <img class="code_key_img inline-block mx-2" :src='identifyCodeMsg.codeUrl' :key='form.code_key'  alt="">
                  </div>
                  <span class="spa hover:underline"  @click="changeCode">刷新验证码</span>

                </div> -->
                <div class="mt-3">
                  <p class="de text-right text-blue-400 mt-3">
                    <span class="underline inline-block hover:font-bold cursor-pointer text-blue-500" @click="forgetAc">忘记密码</span>
                    <el-divider direction="vertical"></el-divider>
                    <span class="underline inline-block hover:font-bold cursor-pointer text-blue-500" @click="goregist">注册</span>
                  </p>
                </div>
                <div class="el-dialog__footer text-center mt-6 pb-12">
                  <span class="nextSt" @click="loginBt">登录</span>
                  <p class="text-center pt-4">登录即表示阅读并同意<span @click="checkXieyi" class="text-blue-500 cursor-pointer underline hover:font-bold">《蜗牛家事用户注册和使用协议》</span></p>
                </div>
              </div>
			  <div v-if="this.dengluTab == true">
				  <div class="el-form-item">
				    <div class="el-form-item__content">
				      <div class="el-input">
				        <input type="text" v-model="loginForm.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner" ref="loginfsPhone">
				      </div>
				    </div>
				  </div>
				  <div class="yanzheng el-form-item mt-5">
				    <div class="el-form-item__content flex justify-between">
				      <div class="relative">
						  <input v-model="loginForm.valueCode" placeholder="请输入验证码" autocomplete="off" class="el-input__inner" ref="loginfsValueCode">
						  <div class="wenti">
						     <el-popover
						  	 placement="right"
						  	 width="400"
						  	 trigger="click">
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
						  	 <!-- <span class="hover:font-bold cursor-pointer text-blue-500" slot="reference">收不到验证码？</span> -->
							 <div class="wenhaobox" slot="reference"></div>
							 <!-- <img src="../../assets/images/lihun/wenhao.png" alt=""> -->
						     </el-popover>
						  </div>
					  </div>
					  
				      <span class="spa hover:underline" v-show="loginFormregistYan" @click="loginFormgetYan">获取验证码</span>
				      <span v-show="!loginFormregistYan" class="spa" type="primary" :loading="loginFormregistYanType">已发送({{ loginFormcount }}s）</span>
				    </div>
				    <div class="el-form-item__content flex justify-end mt-2 underline text-blue-300 my-4">
						
						<div class="flex items-center ml-2">
							
							<span @click="goRegistAction" class="inline-block hover:font-bold cursor-pointer text-blue-500">注册账号</span>
						</div>
				    </div>
				  </div>
				  <div class="el-dialog__footer text-center mt-5 pb-12">
				    <span class="nextSt" @click="fastloginBt">登录</span>
				    <p class="text-center pt-4">登录即表示阅读并同意<span @click="checkXieyi" class="text-blue-500 cursor-pointer underline hover:font-bold">《蜗牛家事用户注册和使用协议》</span></p>
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
          <div class="el-dialog__body" id="forgetDialog">
            <form class="el-form">
              <div class="w-full text-xl text-left pt-12 pl-12">
                重置密码
              </div>
              <div>
                <div class="el-form-item py-10 mt-0" style="margin-top: 0;">
                  <div class="el-form-item__content">
                    <div class="el-input p text-left">
                      <span class="inline-block text-lg">请输入要重置密码的手机号码</span>
                      <input v-model="newform.phone" placeholder="请输入手机号码" autocomplete="off" class="el-input__inner" ref="newformPhone">
                    </div>
                  </div>
                </div>
                <div class="el-dialog__footer text-center pb-12">
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
          <div class="el-dialog__body"  id="forgetDialog2">
            <form class="el-form">
              <div class="w-full text-xl text-left pt-12 pl-12">
                重置密码
              </div>
              <div>
                <div class="py-5 mt-0">
                  <div class="el-form-item__content">
                    <div class="el-input p text-center">
                      <span class="inline-block text-lg py-3">您正在对账号<span class="text-red-500">{{this.newform.phone}}</span>进行重置密码操作</span>
                      <div>
                        <img @click="byPhone" class="inline-block cursor-pointer mb-3" src="../../assets/images/lihun/yanzheng01.png" alt="">
                        <!-- <img @click="byEmail" class="inline-block mb-3" src="../../assets/images/lihun/yanzheng02.png" alt=""> -->
                      </div>
                      
					  <div class="el-form-item__content">
					   <span class="inline-block ">若上述方式均无法验证，您可以</span>
					   <el-popover
							 placement="right"
							 width="300"
							 trigger="hover">
							 <div>
							   <h5>请拨打客服电话，申请人工修复</h5>
							   <p class="py-2">电话：010-5210 1314</p>
							 </div>
							 <span class="underline hover:font-bold cursor-pointer text-blue-500" slot="reference">申请账号修复</span>
					   </el-popover>
					  </div>
                    </div>
                  </div>
                </div>
                <div class="el-dialog__footer steall text-center pb-12 flex justify-between">
                  <span class="ste" @click="forgetPrev">上一步</span>
                  <span class="ste" @click="byPhone">下一步</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
	  <!-- 通过手机找回验证手机 -->
	  <div v-if="dialogFindByPhone==true" class="el-dialog__wrapper regist registsp" style="z-index: 2001;">
		  <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
			  <div class="el-dialog__header">
				  <div class="w-full text-xl text-left pt-10 pl-10">
				  		重置密码
				  </div>
				  <span class="el-dialog__title"></span><button type="button" aria-label="Close" @click="closeFindByPhone"
			      class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div>
			  <div class="el-dialog__body" id="dialogFindByPhone">
			    <form class="el-form">
				  
			      <div class="text-left">
			        <!-- <div class="el-form-item">
			          <div class="el-form-item__content">
			            <div class="el-input">
			              <input type="text" v-model="newform.phone" placeholder="请输入手机号码"  disabled="disabled" autocomplete="off" class="el-input__inner">
			            </div>
			          </div>
			        </div> -->
					<span class="yanphone inline-block text-lg py-3">请获取<span class="text-red-500">{{this.newform.phone}}</span>手机验证码</span>
			        <div class="yanzheng el-form-item">
			          <div class="el-form-item__content flex justify-between">
			            <input v-model="newform.valueCode" placeholder="请输入验证码" autocomplete="off" class="el-input__inner" ref="newformValueCode">
			            <span class="spa hover:underline" v-show="registYan" @click="findYan">获取验证码</span>
			            <el-button v-show="!registYan" class="ml-5" type="primary" :loading="registYanType">已发送，请查收（{{ SetPwagainCount }}s）</el-button>
			          </div>
			          <div class="el-form-item__content text-right underline text-blue-300 my-4">
					   <el-popover
					   	 placement="right"
					   	 width="300"
					   	 trigger="hover">
					   	 <div>
					   	   <h5>请拨打客服电话，申请人工修复</h5>
					   	   <p class="py-2">电话：010-5210 1314</p>
					   	 </div>
					   	 <span class="underline hover:font-bold cursor-pointer text-blue-500" slot="reference">申请账号修复</span>
					   </el-popover>
					   <el-divider direction="vertical"></el-divider>
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
					   
					   
					   <!-- <div class="el-form-item__content">
					    <span class="inline-block ">若上述方式均无法验证，您可以</span>
					    
					   </div> -->
			          </div>
			        </div>
			        <div class="el-dialog__footer steall flex justify-between text-center mt-4 pb-12">
					  <span class="ste" @click="resetPrev">上一步</span>
			          <span class="ste" @click="resetnext">下一步</span>
			        </div>
			      </div>
			    </form>
			  </div>
		  </div>
	  </div>
	  <div v-if="dialogPhonePw==true" class="el-dialog__wrapper regist" style="z-index: 2001;">
		  <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh;">
			  <div class="el-dialog__header">
				  <div class="w-full text-xl text-center pt-10 pl-10">
				  		设置新密码
				  </div>
				  <span class="el-dialog__title"></span><button type="button" aria-label="Close" @click="closePhonePw"
			      class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></button></div>
			  <div class="el-dialog__body"  id="dialogPhonePw">
			    <form class="el-form">
			      <div>
					<div class="el-form-item">
					  <div class="el-form-item__content">
					    <el-input placeholder="请输入密码" v-model="newform.password" show-password ref="newformPassword"></el-input>
					  </div>
					</div>
					<div class="el-form-item mt-5">
					  <div class="el-form-item__content">
					    <el-input placeholder="请确认密码" v-model="newform.passwordAgain" show-password ref="newformPasswordAgain"></el-input>
					  </div>
					</div>
			        <div class="el-dialog__footer steall flex justify-between text-center mt-10 pb-12" style="margin-top:30px;">
					  <span class="ste" @click="resetPWprev">上一步</span>
			          <span class="ste" @click="resetPW">完成</span>
			        </div>
			      </div>
			    </form>
			  </div>
		  </div>
	  </div>
	  <div v-if="dengluerrorBox==true" class="fixed errorBox">
		  {{errorMsg}}
	  </div>
	  <!-- 退出弹窗 -->
	  <el-dialog title="退出账号" left :visible.sync="dialogExit">
	  	<div class="mx-auto text-center text-lg text-red-500 py-5">请确认是否退出账号</div>
	  	<div slot="footer" class="dialog-footer tishi_bot pb-3">
	  		<span class="cbt" @click="canceldialogExit">取 消</span>
	  		<span class="cbt re" @click="dialogExitOk">确 定</span>
	  	</div>
	  </el-dialog>
    </div>
  </div>
</template>

<script>
import {addUser, phoneCode, codeLoginPhone,frontLogin, phoneCodeV, verifyCode, updatePasswordPhone, usersSelect} from '@/api/api/AgreementRequest.js'

export default {
  name: 'lihun_head',
  props:[
	  name
  ],
  data () {
    return {
	  dialogExit: false, // 退出提示弹窗
	  dengluBox: false, // 右上角个人中心表框
	  dengluerrorBox: false, // 登录错误弹窗提示
	  dialogFindByPhone: false, // 通过手机号找回密码弹窗
	  dialogPhonePw: false,  // 新密码弹窗
      dialogFormVisible: false, // 注册弹窗
      dialogLogin: false, // 登录弹窗
      userPhone: null, // 登录后存储用户手机号
      isLogin: false,  // 判断用户是否登录
	  errorMsg: '',
	  count: '', // 倒计时60秒
	  timer: null,  // 倒计时定时器
	  loginFormcount: '', // 快捷登录倒计时60秒
	  loginFormtimer: null,  // 快捷登录倒计时定时器
	  SetPwagainCount: '', // 3重置密码倒计时
	  SetPwagainTimer: null,  // 倒计时定时器
	  loginForm: {
		  phone: null,
		  password: '',
		  valueCode: null
	  },
      form: {
        phone: null,
        password: '',
        valueCode: null, // 验证码
        code_key: '' // 验证码的KEY
      },
	  UserName: null,
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
      registYan: true, // 注册时候手机验证码状态
	  loginFormregistYan: true, 
	  registYanType: false,
	  loginFormregistYanType: false,
      zhuce: true, // 注册成功状态码
	  dengluTab: true, // 登录方式的切换
      forgetDialog: false, // 忘记密码弹窗
      forgetDialog2: false ,// 忘记密码2
	  innerVisible: false,
	  topins:-1, // 导航状态
	  nav:[
		  {name: '首页'},
		  {name: '离婚知识'},
		  {name: '定制离婚协议书'},
		  {name: '离婚协议书范文'},
	  ]
    }
  },
  mounted () {
    this.changeCode()
	this.getUserMsg()
	document.addEventListener('mouseup', this.queryHide)
  },
  // 清除click监听
    beforeDestroy () {
      // document.removeEventListener('click',this.queryHide)
    },
  methods: {
	  queryHide (e) {
		  var dialogLogin_con = document.getElementById('dialogLogin')
		  if(dialogLogin_con) {
		    if(!dialogLogin_con.contains(e.target)) {
		  	this.dialogLogin = false
		    }
		  }
		  var dialogFormVisible_con = document.getElementById('dialogFormVisible')
		  if(dialogFormVisible_con) {
		    if(!dialogFormVisible_con.contains(e.target)) {
		  	this.dialogFormVisible = false
		    }
		  }
		  var forgetDialog_con = document.getElementById('forgetDialog')
		  if(forgetDialog_con) {
		    if(!forgetDialog_con.contains(e.target)) {
		  	this.forgetDialog = false
		    }
		  }
		  var forgetDialog2_con = document.getElementById('forgetDialog2')
		  if(forgetDialog2_con) {
		    if(!forgetDialog2_con.contains(e.target)) {
		  	this.forgetDialog2 = false
		    }
		  }
		  var dialogFindByPhone_con = document.getElementById('dialogFindByPhone')
		  if(dialogFindByPhone_con) {
		    if(!dialogFindByPhone_con.contains(e.target)) {
		  	this.dialogFindByPhone = false
		    }
		  }
		  var dialogPhonePw_con = document.getElementById('dialogPhonePw')
		  if(dialogPhonePw_con) {
		    if(!dialogPhonePw_con.contains(e.target)) {
		  	this.dialogPhonePw = false
		    }
		  }
		  
		  var dengluBox_con = document.getElementById('dengluBox')
		  if(dengluBox_con) {
		    if(!dengluBox_con.contains(e.target)) {
		  	this.dengluBox = false
		    }
		  }
		// if ((!this.$refs.queryBox.contains(e.target)) && (!this.$refs.queryDown.contains(e.target))) {
	 //  /* 关闭元素 */
		//   // this.dialogLogin = false
		//   // this.dialogFormVisible = false
		//   // this.forgetDialog = false
		//   // this.forgetDialog2 = false
		//   // this.dialogFindByPhone = false
		//   // this.dialogPhonePw = false
		// }
	  },
	  dengluTabAc () { // 登录方式切换
		  this.dengluTab = !this.dengluTab
	  },
	getUserMsg () { // 查询用户基本信息
	  this.UserName = localStorage.getItem('name')
	  this.topins = localStorage.getItem('topins')
	  this.userPhone = localStorage.getItem('phone')
	},
	goHome () { // 点击图标返回首页
		localStorage.setItem('topins',0)
		if(this.$route.path=='/CustomBasic' || this.$route.path=='/CustomAgreement' || this.$route.path=='/CustomQueDing' || this.$route.path=='/CustomShengCheng' ) {
			const {href} = this.$router.resolve({
				path: '/',
				params: {
				  topins: this.topins
				}
			})
			window.open(href, '_blank')
		} else {
			this.$router.replace('/')
		}
		
	},
	goDingZhi (index) { // 点击定制如果没有登录则直接让登录，如果登录则直接跳转到定制页面	  
		this.topins = index
		this.$emit('headActiveEvent',this.topins)
		if(this.$route.path=='/CustomBasic' || this.$route.path=='/CustomAgreement' || this.$route.path=='/CustomQueDing' || this.$route.path=='/CustomShengCheng' ){
			if(index == 0){
				localStorage.setItem('topins',0)
				const {href} = this.$router.resolve({
					path: '/',
					params: {
					  topins: this.topins
					}
				})
				window.open(href, '_blank')
			} else if (index == 1){
				localStorage.setItem('topins',1)
				const {href} = this.$router.resolve({
					path: '/lhzs/',
					params: {
					  topins: this.topins
					}
				})
				window.open(href, '_blank')
			} else if(index == 2){
				localStorage.setItem('topins',2)
				var isLogin = localStorage.getItem('token')
				if (isLogin == undefined){
					this.dialogLogin = true
				} else {
					// this.$router.resolve('/dzlhxys')
					const {href} = this.$router.resolve({
						path: '/dzlhxys',
						params: {
						  topins: this.topins
						}
					})
					window.open(href, '_blank')
				}
			} else if(index == 3){
				localStorage.setItem('topins',3)
				const {href} = this.$router.resolve({
					path: '/lhxys',
					params: {
					  topins: this.topins
					}
				})
				window.open(href, '_blank')
			} else if (index == 4){
				window.open('http://www.jialilaw.com/', '_blank')
			}
		} else {
			if(index == 0){
				window.location.href="/"
				
				// this.$router.replace('/')
				// const {href} = this.$router.replace({
				// 	path: '/',
				// 	params: {
				// 	  topins: this.topins
				// 	}
				// })
				// window.open(href, '_blank')
			} else if (index == 1){
				localStorage.setItem('topins',1)
				// const {href} = this.$router.replace({
				// 	path: '/lhzs/',
				// 	params: {
				// 	  topins: this.topins
				// 	}
				// })
				window.location.href = '/lhzs.html'
			} else if(index == 2){
				var isLogin = localStorage.getItem('token')
				if (isLogin == undefined){
					this.dialogLogin = true
				} else {
					// this.$router.replace('/dzlhxys')
					const {href} = this.$router.replace({
						path: '/dzlhxys',
						params: {
						  topins: this.topins
						}
					})
					// window.open(href, '_blank')
				}
			}else if(index == 3){
				localStorage.setItem('topins',3)
				// const {href} = this.$router.replace({
				// 	path: '/lhxys',
				// 	params: {
				// 	  topins: this.topins
				// 	}
				// })
				window.location.href = '/lhxys.html'
			} else if (index == 4){
				window.location.href = 'http://www.jialilaw.com/', '_blank'
			}
		}
		this.topins = localStorage.getItem('topins')
	},
    goAgreementUser () {
	  this.topins = -1
	  this.$emit('headActiveEvent',this.topins)
	  if(this.$route.path=='/CustomBasic' || this.$route.path=='/CustomAgreement' || this.$route.path=='/CustomQueDing' || this.$route.path=='/CustomShengCheng' ) {
		  const {href} = this.$router.resolve({
		  	path: '/AgreementUser',
		  	params: {
		  	  topins: this.topins
		  	}
		  })
		  window.open(href, '_blank')
	  } else {
		  this.$router.replace('/AgreementUser')
	  }
	  this.dengluBox = false
    },
	goMyconsult () { // 点击我的协议返回到协议列表
		this.topins = 2
		this.$emit('headActiveEvent',this.topins)
		if(this.$route.path=='/CustomBasic' || this.$route.path=='/CustomAgreement' || this.$route.path=='/CustomQueDing' || this.$route.path=='/CustomShengCheng' ) {
				  const {href} = this.$router.resolve({
				  	path: '/dzlhxys',
				  	params: {
				  	  topins: this.topins
				  	}
				  })
				  window.open(href, '_blank')
		} else {
				  this.$router.replace('/dzlhxys')
		}
		this.dengluBox = false
	},
    liveOut () { // 点击退出登录
	  this.dialogExit = true
	  this.$cookieStore.delCookie('token')
	  this.$cookieStore.delCookie('userInfo')
    },
	canceldialogExit () { // 取消退出
		this.dialogExit = false
	},
	dialogExitOk () {  // 确认退出
		this.topins = 0
		this.$emit('headActiveEvent',this.topins)
		this.isLogin = false
		this.dengluBox = false
		localStorage.removeItem('token') // 存储token
		localStorage.removeItem('phone')
		localStorage.removeItem('isLogin')
		localStorage.removeItem('name')
		this.$router.replace('/')
		this.dialogExit = false
	},
    registAc () { // 点击注册按钮
      this.form = {}
      this.dialogFormVisible = true
	  this.registYan = true
    },
    closeDialog () { // 点击注册弹窗关闭按钮
      this.dialogFormVisible = false
      this.registYan = true
	  this.zhuce = true
    },
	changeSelectAc () {
		this.checkOne = !this.checkOne
	},
	goLoginAction () {  // 已有账号，去登录
		this.dialogFormVisible = false
		this.dialogLogin = true
	},
	goRegistAction () {  // 没有账号去注册
		this.dialogFormVisible = true
		this.dialogLogin = false
	},
    handleCheckedCitiesChange () {
      // const {href} = this.$router.resolve({
      // 	path: '/UserAgreement'
      // })
      // window.open(href, '_blank')
	  window.open('/userAgreement.html')
    },
	loginFormgetYan () { // 快捷登录获取验证码
		if(!(/^1[3456789]\d{9}$/.test(this.loginForm.phone))){
			this.dengluerrorBox = true
			this.errorMsg = '手机号码不正确'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.loginfsPhone.focus()
			return false; 
		} else {
			// this.registYan = true
			phoneCode({
			  phone: this.loginForm.phone,
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
    getYan () { // 获取验证码
		if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
			this.dengluerrorBox = true
			this.errorMsg = '手机号码不正确'
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
    nextSt () { // 点击注册成功下一步
	  if(!(/^1[3456789]\d{9}$/.test(this.form.phone))){
		this.dengluerrorBox = true
		this.errorMsg = '手机号码不正确'
		setTimeout(()=>{
			this.dengluerrorBox = false
		},1000)
		this.$refs.zhucePhone.focus()
		return false; 
	  } else if(this.form.password =='') {
		  this.$message.error('密码不正确');
		  this.$refs.zhucePassword.focus()
	  } else if(this.form.valueCode==null|| this.form.valueCode.length != 6){
		  this.$message.error('验证码不正确');
		  this.$refs.zhuceValueCode.focus()
	  } else {
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
				  
				  this.$message({
					message: '登录成功',
					type: 'success'
				  })
				  localStorage.setItem('topins',0)
				  var tel = this.form.phone
				  this.userPhone = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
				  localStorage.setItem('token', data.data.data.token) // 存储token
				  localStorage.setItem('phone', this.userPhone)
				  localStorage.setItem('name', this.UserName)
				  localStorage.setItem('isLogin', true)
				  this.form = {}
				  this.isLogin = true
				  // this.loginFormregistYan = true
				  this.$emit('sendPhone', this.form.phone)
					usersSelect().then((data) => {
						if (data.data.name !=null) {
							var testName = data.data.name
							this.UserName = testName.replace(/^(.).*(.)$/,"$1**")
						} else {
							this.UserName = data.data.name
						}
						localStorage.setItem('name', this.UserName)
						this.getUserMsg()
					})
				} else {
				  this.$message({
					message: data.data.message,
					type: 'error'
				  })
				}
			  }) 
		  } else {
			  this.dengluerrorBox = true
			  this.errorMsg = '请先阅读蜗牛家事使用协议'
			  setTimeout(()=>{
				this.dengluerrorBox = false
			  },1000)
		  }
	  }
    },
	gologin () { // 去登陆
		this.dialogFormVisible = false
		// this.dialogLogin = true
		this.form.valueCode = ''
		this.zhuce = true
		this.$router.replace('/dzlhxys')
		localStorage.setItem('topins',2)
	},
    loginAc () { // 点击登录按钮
      this.form.phone = ''
      this.form.password = ''
      this.form.valueCode = ''
      this.dialogLogin = true
	  this.loginForm.phone = ''
	  this.loginForm.password = ''
	  this.loginForm.valueCode = ''
	  this.dengluTab = true
	  this.loginFormregistYan = true
    },
    closeLoginDialog () { // 点击登录关闭按钮
      this.dialogLogin = false
	  localStorage.setItem('topins',0)
    },
    goregist () { // 点击登录弹窗中的注册按钮
      this.form = {}
      this.dialogLogin = false
      this.dialogFormVisible = true
    },
	goguanwang () { // 登录官网
		this.dialogFormVisible = false
		// window.open('http://www.jialilaw.com/', '_blank')
		this.zhuce = true
	},
	checkPhone (phoneNum) { // 手机号验证
		var phone = phoneNum
		if(!(/^1[3456789]\d{9}$/.test(phone))){ 
			this.dengluerrorBox = true
			this.errorMsg = '手机号码不正确'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			return false; 
		} 
	},
	CheckPassWord (password) {//必须为字母加数字且长度不小于8位
	   var str = password;
	    if (str == null || str.length <8) {
	        return false;
			this.$message.error('密码长度至少为8位数');
	    }
	    var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
	    if (!reg1.test(str)) {
	        return false;
			this.$message.error('密码必须包含数字字母');
	    }
	    var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
	    if (reg.test(str)) {
	        return true;
	    } else {
	        return false;
	    }
	},
	fastloginBt () { //快捷登录按钮
		if(!(/^1[3456789]\d{9}$/.test(this.loginForm.phone))){
			this.dengluerrorBox = true
			this.errorMsg = '手机号码不正确'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.loginfsPhone.focus()
			return false; 
		} else if(!(/^\d{6}$/.test(this.loginForm.valueCode))){
			this.dengluerrorBox = true
			this.errorMsg = '验证码有误，请重新填写'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.loginfsValueCode.focus()
			return false; 
		} else {
			codeLoginPhone({
				phone: this.loginForm.phone,
				code: this.loginForm.valueCode
			}).then((data)=>{
				if(data.data.status_code ===200){
				  this.dialogLogin = false
				  this.$message({
				    message: '登录成功',
				    type: 'success'
				  })
				  localStorage.setItem('topins',0)
				  var tel = this.loginForm.phone
				  this.userPhone = tel.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
				  localStorage.setItem('token', data.data.data.token) // 存储token
				  localStorage.setItem('phone', this.userPhone)
				  localStorage.setItem('isLogin', true)
				  this.loginForm = {}
				  this.isLogin = true
				  this.loginFormregistYan = true
				  this.$emit('sendPhone', this.loginForm.phone)
					usersSelect().then((data) => {
						if (data.data.name !=''){
							var testName = data.data.name
							this.UserName = testName.replace(/^(.).*(.)$/,"$1**")
						}
						localStorage.setItem('name', this.UserName)
						this.getUserMsg()
					})
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
	},
    loginBt () { // 点击登录中的登录按钮
		if(!(/^1[3456789]\d{9}$/.test(this.loginForm.phone))){
			this.dengluerrorBox = true
			this.errorMsg = '手机号码不正确'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.loginmmPhone.focus()
			return false; 
		} else if(this.loginForm.password =='') {
			this.$message.error('密码不正确');
			this.$refs.loginmmPassword.focus()
		} else {
			frontLogin({
			  phone: this.loginForm.phone,
			  password: this.loginForm.password
			}).then((data) => {
			  if(data.data.status_code ===200){
			    this.dialogLogin = false
			    this.$message({
			      message: '登录成功',
			      type: 'success'
			    })
			    this.userPhone = this.loginForm.phone
				localStorage.setItem('topins',0)
			    localStorage.setItem('token', data.data.data.token) // 存储token
			    localStorage.setItem('phone', this.loginForm.phone)
			    localStorage.setItem('isLogin', true)
			    this.loginForm = {}
			    this.isLogin = true
			    this.$emit('sendPhone', this.userPhone)
				usersSelect().then((data) => {
					if (data.data.name !=''){
						var testName = data.data.name
						this.UserName = testName.replace(/^(.).*(.)$/,"$1**")
					}
					localStorage.setItem('name', this.UserName)
					this.getUserMsg()
				})
			  } else {
				if (data.data.status_code=="102") {
					this.dengluerrorBox = true
					this.errorMsg = '密码不正确'
					setTimeout(()=>{
						this.dengluerrorBox = false
					},1000)
					this.$refs.loginmmPassword.focus()
				}else if (data.data.status_code=="101") {
					this.dengluerrorBox = true
					this.errorMsg = '用户名错误'
					setTimeout(()=>{
						this.dengluerrorBox = false
					},1000)
					this.$refs.loginmmPhone.focus()
				} else {
					this.$message.error(data.data.message);
				}
			  }
			})
		}
    },
	checkXieyi () { // 查看协议
		// const {href} = this.$router.resolve({
		// 	path: '/UserAgreement'
		// })
		// window.open(href, '_blank')
		window.open('/userAgreement.html')
	},
    changeCode (val) { // 获取验证码
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
	byPhone () { // 点击通过验证手机找回密码
		this.forgetDialog2 = false
		this.dialogFindByPhone = true
	},
	closeFindByPhone () {
		this.dialogFindByPhone = false
		this.newform.valueCode = null
	},
	findYan () { // 找回密码获取验证码
		this.newform.valueCode = null
		if(!(/^1[3456789]\d{9}$/.test(this.newform.phone))){
			this.$message.error('手机号码不正确'); 
			return false; 
		} else {
			// this.registYan = true
			phoneCode({
			  phone: this.newform.phone,
			  type: 3
			}).then((data) => {
			  if (data.data.status_code !== 200) {
			    this.$message.error('手机号格式不正确')
			  } else {
				const TIME_COUNT = 60;
				 if (!this.SetPwagainTimer) {
				   this.SetPwagainCount = TIME_COUNT;
				   this.registYan = false;
				   this.SetPwagainTimer = setInterval(() => {
				   if (this.SetPwagainCount > 0 && this.SetPwagainCount <= TIME_COUNT) {
					 this.SetPwagainCount--;
					} else {
					 this.registYan = true;
					 clearInterval(this.SetPwagainTimer);
					 this.SetPwagainTimer = null;
					}
				   }, 1000)
				  }
			  }
			})
		}
	},
	resetPrev () {
		this.dialogFindByPhone = false
		this.forgetDialog = true
	},
	resetnext () {
		if(!(/^\d{6}$/.test(this.newform.valueCode))){
			this.dengluerrorBox = true
			this.errorMsg = '验证码有误，请重新填写'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.newformValueCode.focus()
			return false; 
		} else {
			phoneCodeV({   // 单独验证手机号
			  phone: this.newform.phone,
			  type: 3,
			  code: this.newform.valueCode
			}).then((data)=>{
				if (data.data.status_code == 200) {
					this.dialogFindByPhone = false
					this.dialogPhonePw = true
				} else {
					this.dengluerrorBox = true
					this.errorMsg = '验证码有误，请重新填写'
					setTimeout(()=>{
						this.dengluerrorBox = false
					},1000)
					this.$refs.newformValueCode.focus()
				}
			})
			
		}
	},
	closePhonePw () { // 关闭设置新密码弹窗
		this.dialogPhonePw = false
		this.newform.password = ''
		this.newform.passwordAgain = ''
		this.newform.valueCode = null
	},
	resetPWprev () { // 设置新密码弹窗上一步
		this.dialogPhonePw = false
		this.dialogFindByPhone = true
	},
	resetPW () { // 设置新密码弹窗确认
		if( this.newform.password == '' ||  this.newform.passwordAgain==''){
			this.dengluerrorBox = true
			this.errorMsg = '密码不能为空'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.newformPassword.focus()
		} else if (this.newform.password !== this.newform.passwordAgain){
			this.dengluerrorBox = true
			this.errorMsg = '密码输入不一致，请重新输入'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.newformPassword.focus()
		}else if (this.newform.password == this.newform.passwordAgain){
			updatePasswordPhone({
				phone: this.newform.phone,
				password: this.newform.password,
				passwordagain: this.newform.passwordAgain
			}).then((data) => {
				if(data.data.status_code ==200){
					this.$message({
						message: '新密码设置成功',
						type: 'success'
					})
					this.dialogPhonePw = false
					this.dialogLogin = true
				} else {
					this.dengluerrorBox = true
					this.errorMsg = data.data.message
					setTimeout(()=>{
						this.dengluerrorBox = false
					},1000)
				}
			})
		} else if (this.newform.passwordAgain=='') {
			this.dengluerrorBox = true
			this.errorMsg = '重置密码不能为空'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.newformPasswordAgain.focus()
		}
	},
	byEmail () { // 点击通过邮箱找回密码
		
	},
    forgetAc () { // 点击忘记密码
      this.forgetDialog = true
      this.form.phone = ''
      this.dialogLogin = false
	  this.newform.phone = null
    },
    closeforgetDialog () { // 点击忘记密码弹窗关闭按钮
      this.forgetDialog = false
	  this.newform.valueCode = null
    },
    forgetNext () { // 点击忘记密码弹窗1下一步
		if(!(/^1[3456789]\d{9}$/.test(this.newform.phone))){
			this.dengluerrorBox = true
			this.errorMsg = '手机号码不正确'
			setTimeout(()=>{
				this.dengluerrorBox = false
			},1000)
			this.$refs.newformPhone.focus()
			return false; 
		} else {
			this.forgetDialog = false
			this.dialogFindByPhone = true
		}
    },
    forgetPrev () { // 点击忘记密码弹窗2上一步
      this.forgetDialog = true
      this.forgetDialog2 = false
    },
    forgetNext2 () { // 点击忘记密码弹窗2下一步

    },
    xiufu () {
      this.innerVisible =true
    },
    closeforgetDialog2 () {
      this.forgetDialog2 = false
    }
  }
}
</script>

<style scoped>
	@media (min-width: 1200px) {
		.w {
		  width: 1200px;
		  margin: 0 auto;
		}
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
    width: 556px;
    font-size: 18px;
	/* margin-right: 25px; */
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
.denglu{position: absolute;top:30px;right: -10px;z-index: 3;border: 1px solid #fcf6f6;width: 100px;border-radius: 5px;background-color: #fff;box-shadow: 0px 0px 5px 0px #ddd7d7;}
.denglu ul li{text-align: center;width: 100%;font-size: 15px;height: 35px;line-height: 35px;border-bottom: 1px solid #e1dcdc;}
.denglu ul li:last-of-type{border-bottom: none;}
.denglu ul li:hover{color:#557ce1}
  .regist .el-dialog__header {padding: 0px 0}
  .regist_header>span{width: 50%; font-size: 22px; text-align: center;padding: 16px 0;}
  .registOkbg{background-color: #eceff4;}
  .regist{background-color: rgba(0,0,0,0.5);}
  .regist .el-dialog{width: 640px;}
  .regist .el-dialog__body{padding:0px 0px;}
  .regist .el-dialog__body .el-form-item:first-of-type{margin-top: 46px;margin-bottom:22px}
  .registsp .el-dialog__body .el-form-item:first-of-type{margin-top: 0px;margin-bottom:22px}
  .regist .el-form-item__content, .de{width: 485px;margin:0 auto;}
  .regist .el-dialog__headerbtn{top:-30px;right: 0px;}
  .regist .el-dialog__headerbtn .el-dialog__close{color: #fff;}
  .yanphone{margin:20px 90px;}
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
  .registOk span:first-of-type{border:1px solid #ff3f68;color: #ff3f68;}
  .registOk span:first-of-type:hover{color: #fff;background-color: #ff3f68;}
  .registOk span:last-of-type{border:1px solid #535353;color:#535353;}
  .registOk span:last-of-type:hover{color: #fff;background-color: #ff3f68;border:1px solid #ff3f68;}
  .steall{width: 525px;margin:0 auto;}
  .ste{width: 220px;height: 38px;text-align: center;line-height: 38px;border-radius: 19px;font-size: 18px;display: inline-block;}
  .ste:first-of-type{border:1px solid #343434;color:#343434;}
  .ste:first-of-type:hover{background-color: #ff3f68;color:#fff;border:1px solid #ff3f68}
  .ste:last-of-type{border:1px solid #ff3f68;color:#ff3f68;}
  .ste:last-of-type:hover{background-color: #ff3f68;color:#fff;}
  .activered{color:#ff3f68;}
  .default{color:#343434;}
  .text-b{color:#557ce1}
  .errorBox{width: 300px;height: 48px;line-height: 48px;background-color:#feebef;color:#f81b1b;z-index: 2002;top:20px;left: 50%;margin-left: -150px;font-size: 15px;border-radius: 5px;}
  .tishi_bot {
  	width: 502px;
  	margin: 0 auto;
  	display: flex;
  	justify-content: space-between;
  }
  
  .cbt {
  	width: 218px;
  	height: 38px;
  	line-height: 38px;
  	text-align: center;
  	color: #535353;
  	border: 1px solid #535353;
  	font-size: 16px;
  	border-radius: 19px;
  	display: inline-block;
  }
  .cbt:hover{
  	color: #fff;
  	border: 1px solid #ff3f68;
  	background-color: #ff3f68;
  }
  .re {
  	color: #ff3f68;
  	border: 1px solid #ff3f68;
  }
  .wenti{position: absolute;right: 16px;top:10px}
  .wenhaobox{width: 17px;height: 17px;border-radius: 50%;background:url(../../assets/images/lihun/wenhao.png)no-repeat;}
  .wenhaobox:hover{background:url(../../assets/images/lihun/wenhao_active.png)no-repeat;}
</style>
