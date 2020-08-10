<template>
	<div class="mqueding">
		<div class="com_head mx-3 border-b border-gray-400 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">定制离婚协议书</h2>
		</div>
		<div class="mx-2">
			<p class="text-red-600 text-left text-sm py-6">手机端仅供查看所需材料；如需定制，请前往PC端操作。</p>
		</div>
		<div class="mx-3">
			<h2 class="text-base text-bold py-4 text-center">所需材料</h2>
			<p class="suojin text-sm text-left">为了更高效地为您定制专属协议，建议您在填写前准备好以下资料。</p>
			<ul class="cailiao flex justify-between flex-wrap">
				<li class="mt-5">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_cailiao01.png" alt="">
				</li>
				<li class="mt-5">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_cailiao02.png" alt="">
				</li>
				<li class="mt-5">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_cailiao03.png" alt="">
				</li>
				<li class="mt-5">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_cailiao04.png" alt="">
				</li>
			</ul>
			<p class="text-xl text-center py-4">……</p>
		</div>
		<div class="bankuai mx-3">
			<h2 class="text-base text-bold py-4 text-center">所需材料</h2>
			<ul class="flex justify-between flex-wrap">
				<li class="mb-3">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_bankuai01.png" alt="">
				</li>
				<li class="mb-3">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_bankuai02.png" alt="">
				</li>
				<li class="mb-3">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_bankuai03.png" alt="">
				</li>
				<li class="mb-3">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_bankuai04.png" alt="">
				</li>
				<li class="mb-3">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_bankuai05.png" alt="">
				</li>
				<li class="mb-3">
					<img class="w-full" src="../../../assets/images/lihun/m/queding_bankuai06.png" alt="">
				</li>
			</ul>
		</div>
		<div class="m_liucheng">
			<div class="m_liucheng_t py-8 text-center">
				<h2 class="text-xl">使用流程</h2>
				<span class="text-xs px-2 mt-2 border rouded-sm">20分钟即可完成专属定制</span>
			</div>
			<div class="m_liucheng_min pb-10 mx-3">
				<img src="../../../assets/images/lihun/m/m_liucheng_min.png" alt="">
			</div>
		</div>
		<!-- 共用底部 -->
		<m-bottom></m-bottom>
	</div>
</template>

<script>
import m_bottom from '../../partials/m_bottom.vue'
export default {
	name: 'mQueDing',
	components: {
	  'm-bottom': m_bottom
	},
	data () {
		return {
			
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/')
		}
	}
}
</script>

<style scoped="scoped">
	.mqueding{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.m_liucheng_t h2{color: #535353;}
	.suojin{text-indent: 2em;}
	.cailiao li{width: 48%;}
	.bankuai ul li{width: 31%;}
</style>
