<template>
	<div class="mKnowledgeMin">
		<div class="com_head mx-3 border-b border-gray-400 relative">
			<img @click="gohome" src="../../../assets/images/lihun/m/back_icon.png" alt="">
			<h2 class="py-4 text-bold text-center text-lg">{{userWenJuan.title}}</h2>
			<span @click="DownLoadWord" class="inline-block download">下载</span>
		</div>
		<div class="min px-4 mt-4">
			<!-- <div id="outputwordmsg" v-html="this.outputWord"></div> -->
			<img :src="this.pdfSrc" alt="">
			<!-- iframe :src="this.mesUrl" frameborder="0" height="560" width="100%"></iframe> -->
			<!-- <pdf
			      v-for="i in numPages"
			      ref="pdfs"
			      :src="pdfSrc"
			      :key="i"
			      :page="i"
			    >
			</pdf> -->
		</div>
		<div v-if="dialogxieyi" class="mianze">
			<div class="mianzeBox">
				<h2 class="text-base text-center py-3">免责条款</h2>
				<div class="text-left mianzeMin px-2">
				  <h2>尊敬的蜗牛家事用户：</h2>
				  <p class="leading-loose">欢迎您使用蜗牛家事系统！为了让您更好地达成协议，维护您的合法权益，请您在下载、使用协议前仔细阅读、充分了解并清楚知晓以下重要内容：</p>
				  <p class="leading-loose">离婚协议自双方办理离婚登记后生效，因此在约定离婚协议条款时应具体、全面，尽量避免双方离婚后因草率、随意订立条款而引起诉讼纠纷。</p>
				  <p class="leading-loose">离婚协议约定内容应符合法律强制性规定，例如，不得限制离婚后一方的再婚自由，不得概括约定一方名下所有财产归其所有等，否则会导致协议部分条款效力待定或无效。</p>
				  <p class="leading-loose">签订离婚协议时应明确各类财产的具体信息和离婚后归属，例如房产写明地址、在谁名下、取得时间、出资情况、离婚后归谁所有、是否支付补偿；银行存款写明数额、在谁名下、开户行、账号、离婚后归谁所有、是否支付补偿等，否则可能因无法确定财产具体信息或归属而引起纠纷。</p>
				  <p class="leading-loose">由于夫妻共同财产具有复杂性和变化性，若在订立时涉及新型财产（例如：网上店铺、虚拟财产等）和非常规分割方式的约定，建议您委托律师专业起草协议，以更好的避免相关协议风险。</p>
				  <p class="leading-loose">蜗牛家事基于《中华人民共和国婚姻法（2001修正）》和最高法院关于适用《中华人民共和国婚姻法》若干问题的三个司法解释等法律规定，系统数据来源于数千份真实的离婚协议书样本，具有内容专业、信息精准的特点。在填写和修改离婚协议时，用户提供的信息须真实、完整、准确，因信息不真实、不准确、不完整或输入错误而造成的一切后果均由用户自行承担。</p>
				</div>
				<div class="mt-5 read px-5 flex items-top justify-center">
					<img  @click="changeSelectAc" v-if="this.checkOne==true" class="" src="../../../assets/images/lihun/m/m_select_icon.png" alt="">
					<img  @click="changeSelectAc" v-if="this.checkOne==false" src="../../../assets/images/lihun/m/m_unselect_icon.png" alt="">
					<p class="text-xs wrap">本人已仔细阅读上述内容，充分了解、清楚知晓并自愿承担离婚协议可能带来的风险。</p>
				</div>
				<div class="px-5 mt-2 flex justify-between pb-3">
				  <span class="cbt" @click="canceldialogDownLoadWenJuan">取 消</span>
				  <span class="cbt re" @click="dialogDownLoadWenJuanOk">确 定</span>
				</div>
			</div>
		</div>
		<div v-if="dengluerrorBox==true" class="fixed errorBox">
			{{errorMsg}}
		</div>
	</div>
</template>

<script>
import {getWord, outPutWord, pdfPdf} from '@/api/api/AgreementRequest.js'
import pdf from 'vue-pdf'
export default {
	name: 'mAgreement',
	data() {
		return {
			userWenJuan: {
				title: ''
			},
			outputWord: '',
			checkOne: false,
			dialogxieyi: false,
			dengluerrorBox: false,
			errorMsg: '',
			mesUrl: '',
			pdfSrc: '',
			numPages: []
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
		  this.mesUrl = 'http://localhost:8083/api/Questionnaire/v1/page/pdf_pdf/'+localStorage.getItem('quid') + '.pdf'
		  window.open(this.mesUrl);
		  // this.pdfSrc = pdf.createLoadingTask(this.mesUrl)
		  // this.pdfSrc.then(pdf => {
		  // 	// console.log('pdf', pdf)
		  // 	this.numPages = pdf.numPages
		  // })
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
		changeSelectAc () { // 是否阅读协议
			this.checkOne = !this.checkOne
		},
		canceldialogDownLoadWenJuan () { // 关闭提示
			this.dialogxieyi = false
		},
		dialogDownLoadWenJuanOk () {  // 下载协议
			// let ua = navigator.userAgent.toLowerCase();
			// let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
			// let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);  //ios终端
			if  (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
			    this.dengluerrorBox = true
			    this.errorMsg = '苹果用户请在电脑端或用安卓下载'
			    setTimeout(()=>{
			    	this.dengluerrorBox = false
			    },2000)
			  } else if (/(Android)/i.test(navigator.userAgent)) {
			    if (this.checkOne == false ){
			    	this.dengluerrorBox = true
			    	this.errorMsg = '请先阅读蜗牛家事使用协议'
			    	setTimeout(()=>{
			    		this.dengluerrorBox = false
			    	},1000)
			    } else {
			    	getWord().then((data) => { // 申请书和起诉状等有个性化页面的下载路径
			    		if (data.data.status_code == 200) {
			    			window.open('http://office365.aladdinlaw.com:3921/word/' + data.data.data)
			    		} else {
			    			this.dengluerrorBox = true
			    			this.errorMsg = '下载失败,请重新尝试'
			    			setTimeout(()=>{
			    				this.dengluerrorBox = false
			    			},1000)
			    		}
			    	}).catch((data) => {
			    		this.dengluerrorBox = true
			    		this.errorMsg = '下载失败,请联系管理员'
			    		setTimeout(()=>{
			    			this.dengluerrorBox = false
			    		},1000)
			    	})
			    }
			  }
			  // function isWeixinBrowser() {
				 //  return (/micromessenger/.test(ua)) ? true : false;
			  // }
		},
		DownLoadWord () {
			this.dialogxieyi = true
			this.checkOne = false
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
	.mianze{width: 100vw;height: 100vh;position: fixed;top: 0;left: 0; background: rgba(0,0,0,0.5);}
	.mianzeBox{width: 90%;margin:0 auto;height: 85%;background: #fff;margin-top: 5%;}
	.mianzeMin{height: 70%;overflow-y: scroll;}
	.mianzeMin h2{font-size: 14px;}
	.mianzeMin p{text-indent: 2em;font-size: 14px;}
	.read img{width: 13px;height: 13px;margin-right: 6px;margin-top: 2px;display: inline-block;}
	.read p{text-align: left;color: #ff4c72;}
	.cbt{width: 128px;height: 32px;text-align: center;line-height: 32px;font-size: 15px;border:1px solid #888888;border-radius: 16px;display: inline-block;}
	.re{border:1px solid #ff4c72;color: #ff4c72;}
	.errorBox{width: 80%;height: 40px;line-height: 40px;background-color:#feebef;color:#f81b1b;z-index: 2002;top:20px;margin-left: 10%;font-size: 15px;border-radius: 5px;}
</style>
