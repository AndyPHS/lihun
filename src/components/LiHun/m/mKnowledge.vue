<template>
	<div class="mqueding">
		<div class="queding_head">
			<div class="com_head mx-3 relative">
				<img @click="gohome" src="../../../assets/images/lihun/m/back_white_icon.png" alt="">
				<h2 class="py-4 font-bold text-center text-white text-base">离婚知识</h2>
				<img src="../../../assets/images/lihun/m/m_search_icon.png" alt="">
			</div>
			<div class="px-2">
				<ul class="flex justify-around">
					<li class="text-base active_nav text-white">热门</li>
					<li class="text-base text-white">离婚</li>
					<li class="text-base text-white">子女</li>
					<li class="text-base text-white">财产</li>
					<li class="text-base text-white">过错</li>
					<li class="text-base text-white">其他</li>
				</ul>
			</div>
		</div>
		<div class="nav_list px-3 py-3">
			<div class="nav_min">
				<ul class="text-sm flex">
					<li>离婚常识</li>
					<li>离婚常识</li>
					<li>离婚常识</li>
					<li>离婚常识</li>
					<li>离婚常识</li>
					<li>离婚常识</li>
				</ul>
			</div>
		</div>
		<div class="mx-3 lihunmin">
			<ul>
				<li class="border-b text-left pt-2 pb-4">
					<h2 class="py-2 font-bold text-base">离婚需要多长时间</h2>
					<p class="text-sm">如果是协议离婚，在双方达成一致意见后就可以去民政局办理离婚手续了。如果选择诉讼离婚，离婚案件按……..</p>
				</li>
				<li class="border-b text-left pt-2 pb-4">
					<h2 class="py-2 font-bold text-base">离婚需要多长时间</h2>
					<p class="text-sm">如果是协议离婚，在双方达成一致意见后就可以去民政局办理离婚手续了。如果选择诉讼离婚，离婚案件按……..如果是协议离婚，在双方达成一致意见后就可以去民政局办理离婚手续了。如果选择诉讼离婚，离婚案件按……..</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mKnowledge',
	data () {
		return {
			
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mhome')
		}
	}
}
</script>

<style scoped="scoped">
	.mqueding{max-width: 40rem;margin:0 auto}
	.queding_head {background-color: #557ce1;border-bottom: 1px solid #6085e3;}
	.com_head img:first-of-type{width: 12px;height: 24px;position: absolute;left: 0;top: 17px;}
	.com_head img:last-of-type{width: 23px;height: 23px;position: absolute;right: 0;top: 17px;}
	.nav_list{background-color: #e5e5e5;-webkit-box-sizing: border-box;box-sizing: border-box;overflow: hidden;}
	.nav_min{height: 100%;overflow-x: scroll;overflow-y: hidden;-webkit-overflow-scrolling: touch;}
	.nav_list ul{width: 120%;height: 100%;display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center;justify-content: flex-start;}
	.nav_list ul li{width: 75px;}
	.active_nav{border-bottom: 3px solid goldenrod;}
	.lihunmin ul li h2{color: #535353;}
	.lihunmin ul li p{color: #727272;overflow: hidden;line-height: 25px;max-height: 50px;position: relative;}
	.lihunmin ul li p::after{
		content: "......";
		   position: absolute;
		   bottom: 0;
		   right: 5px;
		   padding-left: 40px;
		   background: -webkit-linear-gradient(left, transparent, #fff 55%);
		   background: -o-linear-gradient(right, transparent, #fff 55%);
		   background: -moz-linear-gradient(right, transparent, #fff 55%);
		   background: linear-gradient(to right, transparent, #fff 55%);
	}
	::-webkit-scrollbar {display: none;height: 1px;}
</style>
