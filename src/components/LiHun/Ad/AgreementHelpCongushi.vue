<template>
	<div class="all">
		<lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
		<div class="c_m w flex justify-center">
			<div class="c_m_r text-left pb-10">
				<div class="pt-10 text-center">
					<h2 class="text-center pb-4 text-bold text-25">关于离婚协议书的产品故事</h2>
				</div>
				<div class="m_r_m pb-5">
					<div class="py-3">
					  <video src="http://woniujiashi.jialilaw.com/images/wnjs.mp4" id="player" controls="controls" width="900" height="339" poster="../../../assets/images/lihun/video_img.jpeg" >
					  	当前浏览器不支持 video直接播放，点击这里下载视频： <a href="http://woniujiashi.jialilaw.com/images/wnjs.mp4">下载视频</a>
					  </video>
					</div>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">2018年的一天，一位当事人通过朋友辗转联系，千里迢迢来到北京，上门委托我们起诉。她风尘仆仆、面容憔悴的样子与其他客户迥然不同。我们得知，她来自南方的一个三线城市，由于找寻专业婚姻律师未果，才四处打听，找到了我们。</span></p>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">如此周折的起因是一份离婚协议，她和前夫离婚前，在网上找了一份据说“结构清晰、条文丰富”的离婚协议模板。经过仔细修改，不料仍在离婚后发生了房产纠纷。当事人是一个普通公司职员，收入不高，只有一套房子是她今后安身立命的资产。通过她提供的离婚协议，我们发现其中条款杂乱冗长，重要约定模棱两可。我们十分同情她的遭遇，想尽各种方法与对方协商谈判；耗时几个月来回奔波，只为尽全力搜集更多有利于当事人的证据。最终我们成功帮她赢回了应得的房产。所有的煎熬焦虑，其中的奔走艰辛，一切的努力付出，得到了回报。然而，当事人不仅花费了大量金钱和时间，还因此丢掉了工作，代价着实惨重。</span></p>
					<p style="text-align: center; font-size: 14px; font-family: DengXian; white-space: normal; line-height: 3em; text-indent: 0em;"><img
						 src="http://jializhishi.oss-cn-beijing.aliyuncs.com/uploads/ueditor/php/upload/image/20200717/1594976305106787.jpeg"
						 title="1594976305106787.jpeg" alt="WechatIMG9.jpeg"></p>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">我们受理过很多起类似这样的离婚后财产纠纷案件，理解当事人想尽快离婚的心情，但离婚协议涉及的权利义务十分复杂，现有网上的离婚协议大多都是模板，并不能完全契合当事人的实际情况，很多当事人因专业受限而忽略了协议中的风险隐患，最终被一堆麻烦缠身。我们希望发挥自己所长，尽自己所能，在网上开辟一块小天地，引导协议双方在线起草、签订离婚协议，减少他们的后顾之忧，助他们开启崭新人生。基于此，我们汇集丰富、专业的起草经验，将每一份离婚协议抽丝剥茧、重新组合，运用智能技术形成了这个离婚协议自动生成系统。</span></p>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">无论何时何地，您都可以享受便捷的线上定制服务。</span></p>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">无论您的诉求为何，您只需花费最少的时间，即可拥有一份个性化专属协议。</span></p>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">不用担心隐患和风险，我们为您提供最便捷、安全、专业的定制环境。</span></p>
					<p style="text-align: justify; font-size: 14px; font-family: DengXian; white-space: normal; text-indent: 32px; line-height: 3em;"><span
						 style="font-size: 18px;">相信我们，选择我们，我们始终与您同在。</span></p>
				</div>
				<div>
					<div class="dingzhi">
						<div @click="goDingZhi" class="shouyedingzhibtn mx-auto">
							<img class="inline-block" src="../../../assets/images/lihun/ding_icon.png" alt="">
							<span class="inline-block text-white">免费定制离婚协议书</span>
						</div>
					</div>
				</div>
				<div class="m_r_b py-6 px-6 hidden">
					<div class="flex items-center m_r_b_t">
						<div></div>
						<span class="font-bold text-sm">相关知识</span>
					</div>
					<ul class="mt-6">
						<li class="mb-2 text-sm list-disc list-inside">小孩子抚养权判定标准</li>
						<li class="mb-2 text-sm list-disc list-inside">小孩子抚养权判定标准</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="live"></div>
		<lihun-bottom></lihun-bottom>
	</div>
</template>
<script>
	import lihun_head from '../../partials/lihun_head.vue'
	import lihun_bottom from '../../partials/lihun_bottom.vue'
	import {
		selectNewsContent,
		selectAction,
		addUserNewsLog,
		stopUserNewsLog
	} from '@/api/api/AgreementRequest.js' // 查询文章
	// import {answer} from '@/api/api/requestLogin.js'
	export default {
		name: 'AgreementHelpCon',
		components: {
			'lihun-head': lihun_head,
			'lihun-bottom': lihun_bottom
		},
		data() {
			return {
				fenleiAll: [], // 文章分类汇总
				keyMsg: '', // 关键词搜索
				wenCon: { // 文章内容
					title: '',
					time: '',
					con: '',
					view: null
				},
				ins: 0,
				dingzhiBtn: false
			}
		},
		mounted() {
			this.getWenZhangCon()
			this.getWenType()
		},
		methods: {
			goKnowledgeMin(id) {
				this.$router.push({
					name: 'AgreementHelpCon',
					params: {
						id: id
					}
				})
				localStorage.setItem('AgreementHelpId', id)
			},
			getWenZhangCon() { // 查询单独文章
				var Id = localStorage.getItem('AgreementHelpId')
				if (Id == 45) {
					this.dingzhiBtn = true
				}
				selectNewsContent({
					id: Id
				}).then((data) => {
					this.wenCon.title = data.data.data.title;
					this.wenCon.time = data.data.data.createdTime;
					this.wenCon.con = data.data.data.content;
					this.wenCon.view = data.data.data.view;
					this.ins = data.data.data.faId
				})
			},
			getWenType() { // 查询分类
				selectAction().then((data) => {
					// 获取离婚帮助
					this.fenleiAll = data.data[1].data
				})
			},
			searchList(item, index) { // 点击文章分类跳转到文章列表页
				var isLogin = localStorage.getItem('token')
				if (isLogin !== undefined) {
					stopUserNewsLog().then((data) => {
						// localStorage.removeItem('unlId')
					})
					addUserNewsLog({
						key_word: item.title,
						type: 2
					}).then((data) => {
						localStorage.setItem('unlId', data.data.data)
					})
				}
				if (index == 0) {
					localStorage.setItem('AgreementHelpId', 17)
					this.getWenZhangCon()
				} else if (index == 2) {
					localStorage.setItem('AgreementHelpId', 45)
					this.getWenZhangCon()
				} else {
					this.$router.push({
						name: 'AgreementHelp',
						params: {
							id: item.id
						}
					})
				}
			},
			goDingZhi() { // 定制按钮
				this.$refs.lihun.goDingZhi(2)
				if (!!window.ActiveXObject || "ActiveXObject" in window) {
					alert('为了您有更好的体验，建议您使用360浏览器，谷歌浏览器')
				}
			},
			getHeadActive(data) {
				localStorage.setItem('topins', data)
			}
		}
	}
</script>
<style scoped>
	.live {
		height: 39px;
		background-color: #f2f4f7;
		width: 100%;
	}

	.all {
		background-color: #f2f4f7;
		height: auto;
	}

	.w {
		width: 1200px;
		margin: 0 auto;
	}

	.c_m {
		background-color: #fff;
		margin-top: 39px;
	}

	.c_m_l {
		width: 239px;
		padding: 150px 0;
	}

	.c_m_r {
		width: 960px;
		padding-left: 65px;
		padding-right: 65px;
	}

	.dingzhi {
		text-align: center;
		padding: 35px 0;
	}

	.dingzhi img {
		display: none;
	}

	.shouyedingzhibtn {
		width: 300px;
		height: 50px;
		background-color: #ff3f68;
		display: flex;
		align-items: center;
		border-radius: 25px;
		justify-content: center
	}

	.shouyedingzhibtn:hover {
		background-color: #ff6687;
		cursor: pointer;
	}

	.shouyedingzhibtn span {
		font-size: 24px;
		margin-left: 10px;
	}

	.m_r_m ul li {
		border-color: #eceff4;
	}

	.m_r_m ul li h2 {
		font-size: 22px;
		color: #6a6a6a;
	}

	.m_r_m ul li span {
		color: #d1d1d1;
		font-size: 14px;
	}

	.m_r_m ul li p {
		font-size: 15px;
		color: #818181;
		line-height: 28px;
		white-space: pre-wrap;
		text-indent: 2em;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
	}

	.m_r_b {
		background-color: #f2f4f7;
	}

	.m_r_b_t>div {
		width: 2px;
		height: 15px;
		background-color: #343434;
		margin-right: 8px;
	}

	.m_r_b_t span {
		font-size: 15px;
	}

	.text-25 {
		font-size: 25px;
		color: #535353;
	}

	.text-14 {
		font-size: 14px;
		color: #c0c0c0;
	}

	.default_active {
		color: red
	}

	.default {
		color: #343434;
	}

	.shouyedingzhibtn {
		width: 300px;
		height: 50px;
		background-color: #ff3f68;
		display: flex;
		align-items: center;
		border-radius: 25px;
		justify-content: center
	}

	.shouyedingzhibtn:hover {
		background-color: #ff6687;
		cursor: pointer;
	}

	.shouyedingzhibtn span {
		font-size: 24px;
		margin-left: 10px;
	}
</style>
