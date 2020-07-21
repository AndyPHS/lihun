<template>
	<div class="muser">
		<div class="muser_head">
			<div class="com_head mx-3 relative">
				<img @click="gohome" src="../../../assets/images/lihun/m/back_white_icon.png" alt="">
				<h2 class="py-4 font-bold text-center text-white text-lg">个人中心</h2>
			</div>
			<div class="user_head px-4 py-8">
				<dl class="flex justify-start items-center">
					<dt class="mx-5"><img src="../../../assets/images/lihun/user_img.png" alt=""></dt>
					<dd class="text-white font-bold text-base">131****6600</dd>
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
					<span>奈落</span>
				</li>  
				<li>
					<h2 class="text-base">性别</h2>
					<span>男</span>
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
		</div>
	</div>
</template>

<script>
export default {
	name: 'mUser',
	data () {
		return {
			
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mhome')
		},
		tomyconsult () {
			this.$router.replace('/m/mMyconsult')
		},
		toupdatepassword () {
			this.$router.replace('/m/mUpdatePassword')
		}
		
	}
}
</script>

<style scoped="scoped">
	.muser{max-width: 40rem;margin:0 auto}
	.muser_head {background-color: #557ce1;border-bottom: 1px solid #6085e3;}
	.com_head img:first-of-type{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.user_head dl dt img{width: 70px;height: 70px;display: inline-block;}
	.user_min ul{margin-top:25px}
	.user_min ul li{border-bottom: 1px solid #c4c4c4; display: flex;justify-content: space-between;align-items: center;padding:12px 0;}
	.user_min ul li:first-of-type{border-top:1px solid #c4c4c4}
	.user_min ul li h2{color: #535353;font-weight: bold;}
	.user_min ul li img{width: 9px;height: 17px;display: inline-block;}
	.user_min ul li span{color: #a4a4a4;}
</style>
