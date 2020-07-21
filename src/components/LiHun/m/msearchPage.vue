<template>
	<div class="msearchPage">
		<div class="com_head mx-5 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<div class="searchBox">
				<div class="search_min flex justify-between items-center">
					<input class="text-center text-lg" type="text" placeholder="请输入关键词">
					<img src="../../../assets/images/lihun/searchM_icon.png" alt="">
				</div>
			</div>
		</div>
		<div v-if="fastSearch" class="min px-10 mt-6">
			<ul class="flex flex-wrap">
				<li class="text-left leading-loose mr-4">离婚需要多长时间</li>
				<li class="text-left leading-loose">离婚协议常见误区</li>
				<li class="text-left leading-loose">关于离婚协议书的产品故事</li>
			</ul>
		</div>
		<div class="min_list hidden mx-5">
			<ul class="mt-4">
				<li>
					<h2 class="py-4">离婚需要多长时间</h2>
					<p class="text-sm">如果是协议离婚，在双方达成一致意见后就可以去民政局办理离婚手续了。如果选择诉讼离婚，离婚案件按</p>
				</li>
				<li>
					<h2 class="py-4">离婚需要多长时间</h2>
					<p class="text-sm">如果是协议离婚，在双方达成一致意见后就可以去民政局办理离婚手续了。如果选择诉讼离婚，离婚案件按</p>
				</li>
				<li>
					<h2 class="py-4">离婚需要多长时间</h2>
					<p class="text-sm">如果是协议离婚，在双方达成一致意见后就可以去民政局办理离婚手续了。如果选择诉讼离婚，离婚案件按</p>
				</li>
			</ul>
		</div>
		<div class="mx-5 min_no">
			<img src="../../../assets/images/lihun/m/msearch_noresult.png" alt="">
			<p class="text-sm">共找到<span>0条</span>与<span>"离婚"</span>相关的内容 可尝试更换不同的关键词重新进行搜索</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'msearchPage',
	data () {
		return {
			fastSearch: false
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
	.msearchPage{max-width: 40rem;margin:0 auto}
	.com_head{display: flex;justify-content: space-between;align-items: center;margin-top: 17px;}
	.com_head img{width: 12px;height: 24px;display: inline-block;}
	.searchBox{width: 90%;border:1px solid #535353;border-radius: 17px;height: 33px;background-color: #f7f7f7;}
	.search_min input{width: 90%;line-height: 31px;font-size: 18px;height: 31px;border:none;color:#343434;border-radius: 17px;margin-left: 10px;background-color: #f7f7f7;}
	.search_min input:focus{outline: none;}
	.search_min img{width: 22px;height: 22px;display: inline-block;margin-right: 10px;margin-left: 10px;}
	.min ul li{color: #838383;font-size: 16px;}
	.min_list ul li{border-bottom: 1px solid #c4c4c4;margin-top:8px;padding-bottom: 25px;}
	.min_list ul li h2{text-align: left;font-size: 18px;color:#535353;font-weight: bold;}
	.min_list ul li p{color: #727272;overflow: hidden;line-height: 25px;max-height: 50px;position: relative;text-align: left;font-size: 14px;}
	.min_list ul li p::after{
		content: "......";
	   position: absolute;
	   bottom: 0;
	   right: 5px;
	   padding-left: 20px;
	   background: -webkit-linear-gradient(left, transparent, #fff 55%);
	   background: -o-linear-gradient(right, transparent, #fff 55%);
	   background: -moz-linear-gradient(right, transparent, #fff 55%);
	   background: linear-gradient(to right, transparent, #fff 55%);
	}
	.min_no{padding:150px 50px}
	.min_no img{width: 120px;height: 80px;margin:0 auto;}
	.min_no p{margin-top: 14px;color: #535353;}
	.min_no p span{color:#ff6a8a;}
</style>
