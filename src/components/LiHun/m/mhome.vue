<template>
	<div class="mmin">
		<div class="mhead flex justify-between items-center">
			<div class="mhead_l flex justify-between items-center">
				<router-link to="/mhome"><img class="mlogo" src="../../../assets/images/lihun/m/mlogo.png" alt=""></router-link>
				<el-divider class="" direction="vertical"></el-divider>
				<span class="log_r ">离婚协议书</span>
			</div>
			<div class="denglu flex justify-around items-center">
				<span>登录</span>
				<el-divider class="" direction="vertical"></el-divider>
				<span>注册</span>
			</div>
		</div>
		
	</div>
</template>

<script>
// 引入移动端框架vant
// import { Button } from 'vant'
</script>

<style scoped="scoped">
	.mmin{max-width: 40rem; margin:0 auto}
	.mhead_l span{font-size: 10px;color: #b7b7b7;}
	.mlogo{width: auto;}
	.denglu{font-size: 12px;color:#547ce0;}
	.mhead{margin: 0.8125rem 1.5rem;}
</style>
