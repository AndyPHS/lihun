<template>
	<div class="msearchPage">
		<div class="com_head mx-5 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<div class="searchBox">
				<div class="search_min flex justify-between items-center">
					<input v-model="keyMsg" class="text-center text-lg" type="text" placeholder="请输入关键词">
					<img @click="searchAction" src="../../../assets/images/lihun/searchM_icon.png" alt="">
				</div>
			</div>
		</div>
		<div v-if="fastSearch" class="min px-10 mt-6">
			<ul class="flex flex-wrap">
				<li @click="gomin(26)" class="text-left leading-loose mr-4">离婚需要多长时间</li>
				<li @click="gomin(21)" class="text-left leading-loose">离婚协议常见误区</li>
				<li @click="gomin(32)" class="text-left leading-loose">诉讼离婚流程</li>
			</ul>
		</div>
		<div class="min_list mx-5">
			<ul class="mt-4">
				<li v-for="(item, index) in tableData" @click="gomin(item.id)" :key="index" >
					<h2 class="py-4">{{ item.title }}</h2>
					<p class="text-sm" v-html="item.content"></p>
				</li>
			</ul>
		</div>
		<div class="mx-5 min_no"  v-if="this.tableDataNull">
			<img src="../../../assets/images/lihun/m/msearch_noresult.png" alt="">
			<p class="text-sm">共找到<span>0条</span>与<span>"{{keyMsg}}"</span>相关的内容 可尝试更换不同的关键词重新进行搜索</p>
		</div>
	</div>
</template>

<script>
import {selectOsNews, addUserNewsLog, stopUserNewsLog} from '@/api/api/AgreementRequest.js'	
export default {
	name: 'msearchPage',
	data () {
		return {
			fastSearch: true,
			tableData: [],  // 搜索的列表
			keyMsg: '',
			tableDataNull: false
		}
	},
	mounted () {
	
	},
	methods: {
		gohome () {
			this.$router.replace('/m/mKnowledge')
		},
		searchAction () { // 关键词搜索
			if(this.keyMsg ==''){
				this.$message.error('请输入关键词')
			} else {
				selectOsNews({title:this.keyMsg}).then((data) => {
					if ( data.data.status_code ==200 ) {
						this.tableData = data.data.data
						this.fastSearch = false
						this.tableDataNull = false
						if (this.tableData.length == 0 ) {
							this.tableDataNull = true
						}
					} else {
						this.$message.error('查询失败，请重新尝试')
					}
				})
				var isLogin = localStorage.getItem('token')
				if (isLogin !== undefined) {
					addUserNewsLog({
						key_word: this.keyMsg,
						type: 1
					}).then((data) => {
						// console.log('关键词搜索文章')
					})
				}
			}
		},
		gomin (id) { // 详情页
			// this.$router.replace('/m/mKnowledgeMin')
			this.$router.push({
			  path: `/m/mKnowledgeMin/${id}`,
			})
			localStorage.setItem('mKnowledgeMin',id)
		},
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
