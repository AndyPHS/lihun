<template>
	<div class="mKnowledgeMin">
		<div class="com_head mx-3 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">我的协议书</h2>
		</div>
		<div class="min px-3">
			<p class="px-3 text-xs leading-loose py-3 min_head">手机端仅供查看或下载已有离婚协议书；如需定制，请前往PC端操作。</p>
			<div>
				<ul class="pb-4">
					<li class="bg-white text-left mb-3 border border-e5e5e5">
						<h2 class="px-3 text-base font-bold text-535353 py-4">名称：离婚协议书</h2>
						<h2 class="px-3 text-base font-bold text-535353 pb-6">版本：第一版</h2>
						<div class="px-3 flex justify-between text-gray-400 pb-2 border-b border-e5e5e5">
							<span class="inline-block w-1/2 text-2xs">创建时间：2020.7.10  10:25:22</span>
							<span class="inline-block w-1/2 text-2xs">文书编号：123456445645645</span>
						</div>
						<div class="flex py-2">
							<span class="w-1/2 text-center text-base text-6286e3 border-r" @click="downLoad">下载</span>
							<span class="w-1/2 text-center text-base text-6286e3" @click="goAgreement">查看</span>
						</div>
					</li>
					<li class="bg-white text-left mb-3 border border-e5e5e5">
						<h2 class="px-3 text-base font-bold text-535353 py-4">名称：离婚协议书</h2>
						<h2 class="px-3 text-base font-bold text-535353 pb-6">版本：第一版</h2>
						<div class="px-3 flex justify-between text-gray-400 pb-2 border-b border-e5e5e5">
							<span class="inline-block w-1/2 text-2xs">创建时间：2020.7.10  10:25:22</span>
							<span class="inline-block w-1/2 text-2xs">文书编号：123456445645645</span>
						</div>
						<div class="flex py-2">
							<span class="w-1/2 text-center text-base text-6286e3 border-r" @click="downLoad">下载</span>
							<span class="w-1/2 text-center text-base text-6286e3" @click="goAgreement">查看</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mMyconsult',
	data () {
		return {
			
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mKnowledge')
		},
		downLoad () {
			alert('下载协议')
		},
		goAgreement () {
			this.$router.replace('/m/mAgreement')
		}
	}
}
</script>

<style scoped="scoped">
	.mKnowledgeMin{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.min{background-color: #f4f4f4;}
	.min_head{color: #fc7f95;text-align: left;}
	.text-2xs{font-size: 10px;color: #b1b1b1;}
	.border-e5e5e5{border-color: #e5e5e5;}
	.text-6286e3{color:#6286e3}
	.text-535353{color: #535353;}
</style>
