<template>
	<div class="muser">
		<div class="muser_head">
			<div class="com_head mx-3 relative">
				<img @click="gohome" src="../../../assets/images/lihun/m/back_white_icon.png" alt="">
				<h2 class="py-4 font-bold text-center text-white text-lg">个人中心</h2>
			</div>
			<div class="user_head px-4 py-8">
				<dl class="flex justify-start items-center">
					<dt class="mx-5">
						<img class="photoMsg" v-if="this.userMsg.photo ==null" src="../../../assets/images/lihun/user_img.png" alt="">
						<img class="photoMsg" v-else :src="this.userMsg.photo" alt="">
					</dt>
					<dd class="text-white font-bold text-base">{{this.userMsg.phone}}</dd>
				</dl>
			</div>
		</div>
		<div class="user_min mx-5">
			<ul>
				<li>
					<h2 class="text-base">我的协议书</h2>
					<img @click="tomyconsult" src="../../../assets/images/lihun/m/m_right_icon.png" alt="">
				</li>
				<li>
					<h2 class="text-base">姓名</h2>
					<span>
					   <span>{{ this.userMsg.name }}</span>
					   <img @click="renameAc" src="../../../assets/images/lihun/m/m_right_icon.png" alt="" style="margin-top: 2px;">
					</span>
				</li>  
				<li  @click="resexAc">
					<h2 class="text-base">性别</h2>
					<span v-if="this.userMsg.sex===1">
						<span>男</span>
						<img src="../../../assets/images/lihun/m/m_right_icon.png" alt="" style="margin-top: 2px;">
					</span>
					<span v-if="this.userMsg.sex===2">
						<span>女</span>
						<img src="../../../assets/images/lihun/m/m_right_icon.png" alt="" style="margin-top: 2px;">
					</span>
				</li>
				<li>
					<h2 class="text-base">修改密码</h2>
					<img @click="toupdatepassword" src="../../../assets/images/lihun/m/m_right_icon.png" alt="">
				</li>
				<li>
					<h2 class="text-base">客服电话</h2>
					<span>400-8989-818</span>
				</li>
			</ul>
			<span @click="loginOut" class="tuichu">退出登录</span>
		</div>
		<div v-if="namedialog" class="mianze">
			<div class="mianzeBox">
				<h2 class="text-base font-bold text-center py-5">修改姓名</h2>
				<div class="text-left  px-5">
					<el-form :model="userMsg" >
					  <el-form-item label="" :label-width="formLabelWidth">
					    <el-input v-model="userMsg.name" autocomplete="off" ref="userMsgName" placeholder="请输入您的姓名"></el-input>
					  </el-form-item>
					</el-form>
				  <!-- <input type="text" v-model="userMsg.name" placeholder="请输入您的姓名" ref="userMsgName"> -->
				</div>
				<div class="px-5 mt-2 flex justify-between pb-3 pt-5">
				  <span class="cbt" @click="cancelnamedialog">取 消</span>
				  <span class="cbt re" @click="renamedialog">确 定</span>
				</div>
			</div>
		</div>
		<div v-if="sexdialog" class="sexAll">
			<div class="sexBox">
				<ul>
					<li @click="changesex(1)" class="text-center">男</li>
					<li @click="changesex(2)" class="text-center">女</li>
					<li @click="closesexdialog" class="text-center">取消</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import {usersSelect, updateUserName} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mUser',
	data () {
		return {
			userMsg: {
				name: '',
				sex: 1,
				phone: '',
				photo: ''
			},
			isLogin: false,
			namedialog: false,
			formLabelWidth: '0px',
			sexdialog: false
		}
	},
	mounted () {
		this.getUserMsg() // 查询用户信息
	},
	methods: {
		getUserMsg () {
			usersSelect().then((data) => {
			  if (data.data.status_code == 401) {
				  localStorage.removeItem('token') // 存储token
				  this.isLogin = false
				  // this.$router.replace('/m/mhome')
				  window.location.href = "/"
			  } else  {
				  this.userMsg.photo = data.data.photo
				  this.userMsg.name = data.data.name
				  this.userMsg.phone = data.data.phone
				  this.userMsg.sex = data.data.sex
				  this.isLogin = true
			  }
			})
		},
		gohome () {
			window.location.href = "/"
		},
		tomyconsult () {
			this.$router.replace('/m/mMyconsult')
		},
		toupdatepassword () {
			this.$router.replace('/m/mUpdatePassword')
		},
		loginOut () { // 退出登录
			localStorage.removeItem('token') // 存储token
			window.location.href = "/"
			this.$cookieStore.delCookie("token")
		},
		renameAc () { // 点击弹出修改姓名弹窗
			this.namedialog = true
		},
		cancelnamedialog () { // 取消修改姓名
			this.namedialog = false
		},
		renamedialog () { // 确定修改姓名
			var nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
			if( !nameReg.test(this.userMsg.name)) {
			  this.$message({
				message: '名字过长请重新输入',
				type: 'error'
			  })
			  this.$refs.userMsgName.focus()
			} else {
			  updateUserName({
				name: this.userMsg.name,
				sex: this.userMsg.sex
			  }).then((data) => {
				if (data.data.status_code == 200) {
				  this.namedialog = false
				  this.$message({
				    message: '修改成功',
				    type: 'success'
				  })
				  this.getUserMsg()
				} else {
				  this.$message.error(data.data.message)
				}
			  })
			}
		},
		resexAc () {
			this.sexdialog = true
		},
		changesex (e) { // 修改性别
			updateUserName({
				name: this.userMsg.name,
				sex: e
			}).then((data) => {
				if (data.data.status_code == 200) {
				  this.sexdialog = false
				  this.$message({
					message: '修改成功',
					type: 'success'
				  })
				  this.getUserMsg()
				} else {
				  this.$message.error(data.data.message)
				}
			})
		},
		closesexdialog () {
			this.sexdialog = false
		}
	}
}
</script>

<style scoped="scoped">
	.muser{max-width: 40rem;margin:0 auto}
	.muser_head {background-color: #557ce1;border-bottom: 1px solid #6085e3;}
	.com_head img:first-of-type{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.user_head dl dt img{width: 70px;height: 70px;display: inline-block;border-radius: 50%;}
	.user_min ul{margin-top:25px}
	.user_min ul li{border-bottom: 1px solid #c4c4c4; display: flex;justify-content: space-between;align-items: center;padding:12px 0;}
	.user_min ul li:first-of-type{border-top:1px solid #c4c4c4}
	.user_min ul li h2{color: #535353;font-weight: bold;}
	.user_min ul li img{width: 9px;height: 17px;display: inline-block;vertical-align: text-top;}
	.user_min ul li span{color: #a4a4a4;}
	.tuichu{display: inline-block;width: 100%;height: 38px;line-height: 38px;border-radius: 19px;border:1px solid #ff7f9a;color:#ff3f68;text-align: center;font-size: 16px;margin-top: 88px;}
	.mianze{width: 100vw;height: 100vh;position: fixed;top: 0;left: 0; background: rgba(0,0,0,0.5);}
	.sexAll{width: 100%;height: 100%;position: fixed;top: 0;left: 0; background: rgba(0,0,0,0.5);}
	.mianzeBox{width: 90%;left: 5%;height: 200px;background: #fff;margin-top:-100px;top:50%;position: absolute;}
	.sexBox{height: 133px;position: absolute;bottom:20px;width: 90%;left: 5%;background: #fff;}
	.sexBox ul li{height: 42px;line-height: 42px;font-size: 15px;border-bottom: 1px solid #c4c4c4;color: #4d4d4d;}
	.sexBox ul li:last-of-type{border-bottom: none;}
	.cbt{width: 128px;height: 32px;text-align: center;line-height: 32px;font-size: 15px;border:1px solid #888888;border-radius: 16px;display: inline-block;}
	.re{border:1px solid #ff4c72;color: #ff4c72;}
</style>
