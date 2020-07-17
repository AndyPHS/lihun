<template>
	<div class="mKnowledgeMin">
		<div class="com_head mx-3 border-b border-gray-400 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-xl">离婚知识-正文</h2>
		</div>
		<div class="min px-3">
			<h2 class="py-4 text-bold text-center text-xl">离婚方式与选择</h2>
			<div class="flex pb-4 justify-between">
				<span class="inline-block text-sm text-gray-400">帮助459人</span>
				<span class="inline-block text-sm text-gray-400">20-06-30</span>
			</div>
			<div class="text-base text-left con">
				<p>离婚有两种方式，协议离婚和起诉离婚。相比而言，协议离婚是比较快的离婚方式，双方达成一致意见，去民政局办理离婚登记手续即可。若双方没有办法达成协议，也可以委托律师代理谈判，代理您与对方谈离婚条件，若依然不同意则尽快提起诉讼，律师也可以在法庭上申请法官组织双方调解，法官组织调解的成功率相较于律师而言会更高一些，可以舍弃一些非必要条件作交换，来换取双方尽快离婚。若调解无望，则只能督促法官尽快依法判决了。当然，协议离婚、谈判和诉讼离婚彼此之间并不冲突，您可以三步并行，在提起离婚诉讼的同时，和对方协商或是谈判离婚。若谈判协商成功，二人直接到民政局办理离婚后再到法院撤诉即可。</p>
			</div>
			<div class="aboutArticle my-8 px-5 py-5">
				<div class="text-left flex items-center">
					<span class="gui"></span>
					<span class="text-base block font-bold">相关知识</span>
				</div>
				<div class="mt-3">
					<ul class="ml-2 text-left">
						<li class="text-sm leading-loose">离婚市值尝试</li>
						<li class="text-sm leading-loose">离婚市值尝试</li>
						<li class="text-sm leading-loose">离婚市值尝试</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mKnowledgeMin',
	data () {
		return {
			
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mKnowledge')
		}
	}
}
</script>

<style scoped="scoped">
	.mKnowledgeMin{max-width: 40rem;margin:0 auto}
	.com_head img{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.con{color:#535353;}
	.aboutArticle{background-color: #eeeeee;}
	.gui{width: 3px;height: 15px;display: inline-block;background-color: #557ce1;margin-right: 4px;}
</style>
