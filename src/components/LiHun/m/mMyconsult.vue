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
					<li v-for="(item, index) in wenshuList" :key="index" v-if="item.complete == 1" class="bg-white text-left mb-3 border border-e5e5e5">
						<h2 class="px-3 text-base font-bold text-535353 py-4">名称：{{ item.title }}</h2>
						<h2 class="px-3 text-base font-bold text-535353 pb-6">版本：第{{ item.number }}版</h2>
						<div class="px-3 flex justify-between text-gray-400 pb-2 border-b border-e5e5e5">
							<span class="inline-block w-1/2 text-2xs">创建时间：{{ item.UpdateTime }}</span>
							<span class="inline-block w-1/2 text-2xs">文书编号：{{ item.agreement_number }}</span>
						</div>
						<div class="flex py-2">
							<span class="w-1/2 text-center text-base text-6286e3 border-r" @click="DownLoadWord(item.id)">下载</span>
							<span class="w-1/2 text-center text-base text-6286e3" @click="goComplete(item)">查看</span>
						</div>
					</li>
				</ul>
			</div>
			<div class="noxieyi" v-if="this.wenshuList.length==0">
				暂无协议书
			</div>
		</div>
	</div>
</template>

<script>
import {selectUserQuestionnaire, getWord, userUpdateQuestionnaire} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mMyconsult',
	data () {
		return {
			wenshuList: [], // 文书汇总
		}
	},
	mounted () {
		this.getWenShu()
	},
	methods: {
		getWenShu() { // 查找用户文书
			selectUserQuestionnaire({
				qid: 3,
				status: 1
			}).then((data) => {
				if (data.data.status_code === 200) {
					this.wenshuList = data.data.data
				} else if (data.data.status_code === 401) { // token过期重新登录
					localStorage.removeItem('token') // 存储token
					localStorage.removeItem('phone')
					this.$message({
						message: '账号过期，请重新登录',
						type: 'error'
					})
					this.$router.replace('/m/mhome')
				} else {
					this.$message({
						message: '协议获取失败，请先登录',
						type: 'error'
					})
				}
			})
		},
		gohome () {
			this.$router.replace('/m/mKnowledge')
		},
		DownLoadWord (id) { // 下载离婚协议书
			localStorage.setItem('quid', id)
			getWord().then((data) => { // 申请书和起诉状等有个性化页面的下载路径
				if (data.data.status_code == 200) {
					window.open('http://office365.aladdinlaw.com:3921/word/' + data.data.data)
				} else {
					this.$message({
						message: '下载失败,请重新尝试',
						type: 'error'
					})
				}
			}).catch((data) => {
				this.$message({
					message: '下载失败,请联系管理员',
					type: 'error'
				})
			})
		},
		goComplete(item) { // 点击查看协议跳转到生成协议页面
			const e = item.id
			localStorage.setItem('quid', e)
			// this.$router.replace('/m/mAgreement')
			this.$router.push({
			  name: 'mAgreement',
			  params: {
				  title: item.title,
				  content: item.content
			  }
			})
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
	.noxieyi{height: 500px;line-height: 200px;}
</style>
