<template>
	<div class="mKnowledgeMin">
		<div class="com_head mx-3 border-b border-gray-400 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">{{userWenJuan.title}}</h2>
			<span @click="DownLoadWord" class="inline-block download">下载</span>
		</div>
		<div class="min px-4 mt-4">
			<div id="outputwordmsg" v-html="this.outputWord"></div>
		</div>
	</div>
</template>

<script>
import {getWord, outPutWord} from '@/api/api/AgreementRequest.js'
export default {
	name: 'mAgreement',
	data() {
		return {
			userWenJuan: {
				title: ''
			},
			outputWord: ''
		}
	},
	mounted() {
		this.GetOutPutWord()
	},
	beforeMount () {
	  
	},
	methods: {
		GetOutPutWord () { // 获取协议
		  this.userWenJuan.title = this.$route.params.title
		  this.outputWord = this.$route.params.content
		  // outPutWord().then((data) => {
			 //  if (data.data.status_code == 200) {
			 //    this.outputWord = data.data.data.content
				// this.userWenJuan.title = data.data.data.title
			 //  } else {
				//   alert('查看失败，请返回')
				//   this.$router.replace('/m/mMyconsult')
			 //  }
		  // })
		},
		gohome() {
			this.$router.replace('/m/mMyconsult')
		},
		DownLoadWord () {
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
		}
	}
}
</script>

<style scoped="scoped">
	.mKnowledgeMin {
		max-width: 40rem;
		margin: 0 auto
	}

	.com_head img {
		width: 12px;
		height: 24px;
		position: absolute;
		left: 0;
		top: 17px;
	}

	.download {
		color: #557ce1;
		position: absolute;
		right: 11px;
		top: 17px;
		padding: 3px 6px;
		border: 1px solid #557ce1;
		border-radius: 3px;
		font-size: 15px;
	}
	#outputwordmsg {text-align: left;}
</style>
