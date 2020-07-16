<template>
	<div class="mmin">
		<div class="mhead flex justify-between items-center">
			<div class="mhead_l py-1 flex justify-between items-center">
				<router-link  class="mlogo" to="/mhome"><img src="../../../assets/images/lihun/m/mlogo.png" alt=""></router-link>
				<el-divider class="" direction="vertical"></el-divider>
				<span class="log_r text-sm ">离婚协议书</span>
			</div>
			<div class="denglu text-base flex justify-around items-center">
				<span>登录</span>
				<el-divider class="" direction="vertical"></el-divider>
				<span>注册</span>
			</div>
		</div>
		<div class="m_nav w-full">
			<ul class="flex justify-between items-center py-2">
				<li class="text-white text-base text-bold">离婚知识</li>
				<li class="text-white text-base text-bold">定制离婚协议书</li>
				<li class="text-white text-base text-bold">离婚协议书范文</li>
			</ul>
		</div>
		
	</div>
</template>

<script>
// 引入移动端框架vant
// import { Button } from 'vant'
</script>

<style scoped="scoped">
	.mmin{margin:0 auto}
	.mhead_l span{color: #b7b7b7;}
	/* .mlogo{width: 26%;} */
	.denglu{color:#547ce0;}
	.mhead{margin: 0.8125rem 1.5rem;}
	.m_nav{background-color:#547ce0;}
	.m_nav ul{margin:0 1.5rem;}
</style>
