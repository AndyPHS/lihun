<template>
	<div class="all">
		<lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
		<div class="c_m w">
			<div class="c_m_h flex justify-between items-center px-12">
				<h2 class="text-left" style="font-size: 25px;">
					我的协议书
				</h2>
				<div class="c_m_h_r flex justify-between items-center">
					<span @click="dingzhiBtn">
						<router-link to="CustomAgreement">定制我的协议书</router-link>
					</span>
					<div class="mx-5 underline cursor-pointer hover:font-bold" @click="goBangZhu">
						协议书定制帮助
					</div>
					<!-- <div class="cursor-pointer hover:font-bold underline hover\:text-blue-400" @click="goKnowledgeMin(20)">协议书如何谈判</div> -->
				</div>
			</div>
			<div class="c_m_m px-12">
				<div v-if="this.wenshuList.length !== 0 " class="c_m_m_m ">
					<div class="c_m_m_h flex justify-between items-center">
						<h2 class="w-1/2 text-center font-bold">协议书详情</h2>
						<div class="c_m_m_h_r w-1/2 flex justify-around items-center">
							<span class="w-1/3 inline-block text-center font-bold">版本</span>
							<span class="w-1/3 inline-block text-center font-bold">状态</span>
							<span class="w-1/3 inline-block text-center font-bold">操作</span>
						</div>
					</div>
					<ul class="min_l">
						<li v-for="(item, index) in wenshuList" :key="index">
							<h4 class="flex justify-between items-center px-6">
								<div class="flex w-1/2 text-gray-600">
									<span class="inline-block">{{ item.UpdateTime }}</span>
									<span class="inline-block ml-10">文书编号:{{ item.agreement_number }}</span>
								</div>
								<div class="w-1/6 flex justify-end items-center pl-5">
									<span class="inline-block hover:font-bold cursor-pointer underline text-blue-500 text-sm" @click="NewCopy(item, index)">创建副本</span>
									<!-- <span class="inline-block cursor-pointer underline text-blue-500 text-sm" @click="DeleteWenJuan(item, index)">删除</span> -->
								</div>
							</h4>
							<div class="c_m_m_m_m flex justify-between items-center">
								<h2 class="w-1/2 overflow-hidden pl-6 text-left">
									{{ item.title }} <img @click="ReName(item, index)" class="ml-5 inline-block cursor-pointer" src="../../../assets/images/lihun/edit_icon.png" alt="">
								</h2>
								<div class="w-1/2 flex justify-around items-center">
									<dl class="w-1/3">
										<dt>第{{ item.number }}版</dt>
										<dd class="hover:font-bold" @click="checkHistory(index)">
											查看历史版本
										</dd>
									</dl>
									<dl v-if="item.complete == 2" class="w-1/3">
										<dt class="text-blue-400">起草中</dt>
										<dd @click="goOnTianxie(item.id)" class="text-red hover:font-bold">
											继续起草
										</dd>
									</dl>
									<dl v-if="item.complete == 1" class="w-1/3 ">
										<dt>起草完</dt>
										<dd class="hover:font-bold" @click="goComplete(item)">
											查看协议书
										</dd>
									</dl>
									<!-- 已完成complete 1 -->
									<div v-if="item.complete == 1" class="w-full c_m_m_m_m_r flex justify-end pr-6">
										<span @click="DownLoadWord(item.id)" class="inline-block">下 载</span>
										<!-- <span v-if="item.signed == 1" @click="isQianAction(item)" class="inline-block">已签订</span>
										<span v-if="item.signed == 0 " @click="isQianAction(item)" class="inline-block">未签订</span> -->
									</div>
									<!-- 未完成 -->
									<div v-if="item.complete == 2" class="w-1/3 c_m_m_m_m_r_n flex justify-end pr-6">
										<span class="inline-block">下 载</span>
										<!-- <span v-if="item.signed ==1" class="inline-block">已签订</span>
										<span v-if="item.signed ==0" class="inline-block">未签订</span> -->
									</div>
								</div>
							</div>
							<div v-if="historys == index" class="c_m_m_m_child">
								<ul>
									<li v-for="($item, $index) in item.historys" :key="$index">
										<h4 class="flex justify-between items-center px-6">
											<div class="flex w-1/2 text-gray-600">
												<span class="inline-block">{{ $item.UpdateTime }}</span>
												<span class="inline-block ml-10">文书编号:{{ $item.agreement_number }}</span>
											</div>
											<div class="w-1/6 flex justify-end items-center pl-5">
												<!-- <span class="inline-block cursor-pointer underline text-blue-500 text-sm" @click="NewCopy($item, $index)">创建副本</span> -->
												<!-- <span class="inline-block cursor-pointer underline text-blue-500 text-sm" @click="DeleteWenJuan($item, $index)">删除</span> -->
											</div>
										</h4>
										<div class="c_m_m_m_m flex justify-between items-center">
											<h2 class="w-1/2 overflow-hidden pl-12 text-left">
												{{ $item.title }} <img @click="ReName($item, $index)" class="ml-5 inline-block cursor-pointer" src="../../../assets/images/lihun/edit_icon.png" alt="">
											</h2>
											<div class="w-1/2 flex justify-around items-center">
												<dl class="w-1/3">
													<dt>第{{ $item.number }}版</dt>
												</dl>
												<dl v-if="$item.complete == 2" class="w-1/3">
													<dt class="text-blue-400">起草中</dt>
													<dd @click="goOnTianxie($item.id)" class="text-red hover:font-bold">
														继续起草
													</dd>
												</dl>
												<dl v-if="$item.complete == 1" class="w-1/3 ">
													<dt>起草完</dt>
													<dd class="hover:font-bold" @click="goComplete($item)">
														查看协议书
													</dd>
												</dl>
												<!-- 已完成complete 1 -->
												<div v-if="$item.complete == 1" class="w-full c_m_m_m_m_r flex justify-end pr-6">
													<span @click="DownLoadWord($item.id)" class="inline-block">下 载</span>
													<!-- <span v-if="$item.signed == 1" @click="isQianAction($item)" class="inline-block">已签订</span>
													<span v-if="$item.signed == 0 " @click="isQianAction($item)" class="inline-block">未签订</span> -->
												</div>
												<!-- 未完成 -->
												<div v-if="$item.complete == 2" class="w-1/3 c_m_m_m_m_r_n flex justify-end pr-6">
													<span class="inline-block">下 载</span>
													<!-- <span v-if="$item.signed ==1" class="inline-block">已签订</span>
													<span v-if="$item.signed ==0" class="inline-block">未签订</span> -->
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div v-if="this.wenshuList.length == 0 " class="no_consult ">
					<div class="w py-40">
						<img class="inline-block mb-6" src="../../../assets/images/lihun/no_consult_icon.png" alt="">
						<h3 class="text-base text-center">暂无协议书，可以点击<span class="inline-block text-red-500 underline cursor-pointer"
							 @click="dingzhiBtn">定制我的协议书</span></h3>
					</div>
				</div>
				<!-- 下载时的免责 -->
				<el-dialog title="免责条款" :visible.sync="dialogDownLoadWenJuan">
					<div class="text-left mianze px-2">
					  <h2>尊敬的家文用户：</h2>
					  <p class="leading-loose">欢迎您使用家文系统！为了让您更好地达成协议，维护您的合法权益，请您在下载、使用协议前仔细阅读、充分了解并清楚知晓以下重要内容：</p>
					  <p class="leading-loose">离婚协议自双方办理离婚登记后生效，因此在约定离婚协议条款时应具体、全面，尽量避免双方离婚后因草率、随意订立条款而引起诉讼纠纷。</p>
					  <p class="leading-loose">离婚协议约定内容应符合法律强制性规定，例如，不得限制离婚后一方的再婚自由，不得概括约定一方名下所有财产归其所有等，否则会导致协议部分条款效力待定或无效。</p>
					  <p class="leading-loose">签订离婚协议时应明确各类财产的具体信息和离婚后归属，例如房产写明地址、在谁名下、取得时间、出资情况、离婚后归谁所有、是否支付补偿；银行存款写明数额、在谁名下、开户行、账号、离婚后归谁所有、是否支付补偿等，否则可能因无法确定财产具体信息或归属而引起纠纷。</p>
					  <p class="leading-loose">由于夫妻共同财产具有复杂性和变化性，若在订立时涉及新型财产（例如：网上店铺、虚拟财产等）和非常规分割方式的约定，建议您委托律师专业起草协议，以更好的避免相关协议风险。</p>
					  <p class="leading-loose">家文基于《中华人民共和国婚姻法（2001修正）》和最高法院关于适用《中华人民共和国婚姻法》若干问题的三个司法解释等法律规定，系统数据来源于数千份真实的离婚协议书样本，具有内容专业、信息精准的特点。在填写和修改离婚协议时，用户提供的信息须真实、完整、准确，因信息不真实、不准确、不完整或输入错误而造成的一切后果均由用户自行承担。</p>
					</div>
					<div class="mt-5">
						<el-checkbox v-model="form.type">本人已仔细阅读上述内容，充分了解、清楚知晓并自愿承担离婚协议可能带来的风险。</el-checkbox>
					</div>
					<div slot="footer" class="dialog-footer tishi_bot pb-3">
						<span class="cbt" @click="canceldialogDownLoadWenJuan">取 消</span>
						<span class="cbt re" @click="dialogDownLoadWenJuanOk">确 定</span>
					</div>
				</el-dialog>
				<!-- 新建副本 -->
				<el-dialog title="新建副本" :visible.sync="dialogNewCopy">
					<el-form :model="chooseList">
						<el-form-item label="副本名称" label-width="130px" class="mb-1">
							<el-input v-model="chooseList.title" class="w-2/3" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer tishi_bot pb-3">
						<span class="cbt" @click="canceldialogNewCopy">取 消</span>
						<span class="cbt re" @click="dialogNewCopyOk">确 定</span>
					</div>
				</el-dialog>
				<!-- 重命名 -->
				<el-dialog title="重命名" :visible.sync="dialogReName">
					<el-form>
						<el-form-item label="名称" label-width="130px" class="mb-1">
							<el-input v-model="reNameTitle" class="w-2/3" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer tishi_bot pb-3">
						<span class="cbt" @click="canceldialogReName">取 消</span>
						<span class="cbt re" @click="dialogReNameOk">确 定</span>
					</div>
				</el-dialog>
				<!-- 离婚指导弹窗 -->
				<div class="zhidaopage myconsult"  v-if="this.dialogZhiDao == true">
					<div style="width: 761px;height: 554px;position: absolute;top:50%;left: 50%;margin-top: -280px;margin-left: -380px;background-color: #fff;">
						<div>
							<div class="text-right py-2">
								<span class="mr-4 mt-1" @click="closeZhiDao">X</span>
							</div>
							<div >
								<el-carousel :interval="5000" width="761" style="height: 550px;" arrow="always">
									<el-carousel-item v-for="item in zhidaoArr" :key="item" style="height: 550px;">
										<img :src="item" alt="">
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
					</div>
				</div>
				<!-- <div class="zhidaopage">
					<el-dialog title="" :visible.sync="dialogZhiDao">
						<el-carousel :interval="5000" width="761" arrow="always">
							<el-carousel-item v-for="item in zhidaoArr" :key="item">
								<img :src="item" alt="">
							</el-carousel-item>
						</el-carousel>
					</el-dialog>
				</div> -->
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
		userAddQuestionnaire
	} from '@/api/api/AgreementRequest.js'
	import {
		selectUserQuestionnaire,
		getWord,
		userUpdateQuestionnaire,
		copyUserQuestionnaire
	} from '@/api/api/AgreementRequest.js'
	export default {
		name: 'MyConsult',
		components: {
			'lihun-head': lihun_head,
			'lihun-bottom': lihun_bottom
		},
		data() {
			return {
				wenshuList: [], // 文书汇总
				historys: -1, // 历史版本
				dialogDownLoadWenJuan: false, // 免责弹窗
				form: { // 免责条款
					type: false
				},
				dialogReName: false, // 重命名弹窗
				reNameTitle: '',  // 新名字
				dialogNewCopy: false, // 新建副本弹窗
				chooseList: {
					title: '', // 新建副本
					number: null
				},
				name: '',
				formLabelWidth: '80px',
				dialogZhiDao: false,
				zhidaoArr: [ // 离婚指导轮播图
					'../../static/img/zhidao01.jpeg',
					'../../static/img/zhidao02.jpeg',
					'../../static/img/zhidao03.jpeg',
					'../../static/img/zhidao04.jpeg',
					'../../static/img/zhidao05.jpeg',
				]
			}
		},
		mounted() {
			this.getWenShu()
			localStorage.setItem('topins',2)
		},
		methods: {
			dingzhiBtn() { // 点击定制协议跳转到小问卷页面
				localStorage.setItem('qid', 3)
				userAddQuestionnaire({
				  qid: 3
				}).then((data)=>{
					localStorage.setItem('quid', data.data.data)
					this.$router.replace('/CustomAgreement')
				})
				// this.$router.replace('/Pay')
			},
			goBangZhu () { // 点击协议书定制帮助
				localStorage.setItem('topins',2)
				// this.$router.replace('/AgreementHelp')
				const {href} = this.$router.resolve({
					path: '/AgreementHelp'
				})
				window.open(href, '_blank')
			},
			getWenShu() { // 查找用户文书
				selectUserQuestionnaire({
					qid: 3,
					status: 1
				}).then((data) => {
					if (data.data.status_code === 200) {
						this.wenshuList = data.data.data
						if (this.wenshuList.length === 0) {
							this.dialogZhiDao = true
						}
					} else if (data.data.status_code === 401) { // token过期重新登录
						localStorage.removeItem('token') // 存储token
						localStorage.removeItem('phone')
						localStorage.removeItem('isLogin')
						this.$message({
							message: '账号过期，请重新登录',
							type: 'error'
						})
						this.$router.replace('/')
					} else {
						this.$message({
							message: '协议获取失败，请先登录',
							type: 'error'
						})
					}
				})
			},
			goComplete(item) { // 点击查看协议跳转到生成协议页面
				const e = item.id
				localStorage.setItem('quid', e)
				this.$router.push({
				  name: 'CustomShengCheng',
				  params: {
				    title: item.title,
					content: item.content
				  }
				})
			},
			goOnTianxie(e) { // 点击继续起草
				localStorage.setItem('quid', e)
				this.$router.replace('/CustomBasic')
			},
			checkHistory (index) { // 查看历史版本
				if( this.historys == index ){
					 this.historys = -1
				} else {
					this.historys = index
				}
			},
			dialogDownLoadWenJuanOk() { // 点击下载弹出确定按钮
				if (this.form.type) {
					getWord().then((data) => { // 申请书和起诉状等有个性化页面的下载路径
						if (data.data.status_code == 200) {
							window.open('http://office365.aladdinlaw.com:3921/word/' + data.data.data)
						}
						this.dialogDownLoadWenJuan = false
					}).catch((data) => {
						this.$message({
							message: '下载失败,请联系管理员',
							type: 'error'
						})
					})
				} else {
					this.$message({
						message: '请先勾选免责条款',
						type: 'error'
					})
				}
			},
			canceldialogDownLoadWenJuan() { // 点击下载弹框取消按钮
				this.dialogDownLoadWenJuan = false
			},
			DownLoadWord(e) { // 点击下载按钮
				this.form.type = false
				localStorage.setItem('quid', e)
				this.dialogDownLoadWenJuan = true
			},
			DeleteWenJuan(item, index) { // 删除问卷
				localStorage.setItem('qid', item.id)
				this.$confirm('确认删除此文书版本?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					localStorage.setItem('quid', item.id)
					userUpdateQuestionnaire({
						status: 2
					}).then((data) => {
						if (data.data.status_code == 200) {
							localStorage.removeItem('quid')
							this.getWenShu()
							this.$message({
								message: '删除成功',
								type: 'success',
								duration: 1000
							})
						} else {
							this.$message.error('删除失败，请联系后台小姐姐')
						}
					}).catch((data) => {
						this.$message.error('删除失败，请联系后台小姐姐')
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			},
			NewCopy(item, index) { // 点击新建副本按钮
				this.dialogNewCopy = true
				this.chooseList.number = item.number +1
				var texttitle = item.title
				if(texttitle.indexOf("版") != -1 ) {
					texttitle = texttitle.substring(0,texttitle.length-3);
					this.chooseList.title = texttitle + '第'+ this.chooseList.number + '版'
				} else {
					this.chooseList.title = item.title + '第'+ this.chooseList.number + '版'
				}
				
				localStorage.setItem('quid', item.id)
			},
			canceldialogNewCopy() { // 点击新建副本弹窗取消按钮
				this.dialogNewCopy = false
			},
			dialogNewCopyOk() { // 点击新建副本弹窗确定按钮
				copyUserQuestionnaire({
					title: this.chooseList.title
				}).then((data) => {
					if (data.data.status_code == 200) {
						localStorage.removeItem('quid')
						this.$message({
							message: '新增副本成功',
							type: 'success',
							duration: 1000
						})
						this.getWenShu()
						this.dialogNewCopy = false
						this.chooseList.title = ''
					} else {
						this.$message.error('新增副本失败，请联系管理员')
					}
				}).catch((data) => {
					this.$message.error('重命名失败，请联系管理员')
				})
			},
			ReName (item, index) { // 点击重新命名
				this.dialogReName = true
				this.reNameTitle = item.title
				localStorage.setItem('quid', item.id)
			},
			canceldialogReName() { // 点击重命名弹窗取消按钮
				this.dialogReName = false
				this.reNameTitle = ''
			},
			dialogReNameOk () { // 点击确定提交重新命名
				userUpdateQuestionnaire({
					title: this.reNameTitle
				}).then((data) => {
					this.getWenShu()
					this.dialogReName = false
				})
			},
			isQianAction(item) { // 签订与否切换
				var sta = item.signed
				if (sta == 1) {
					sta = 0
				} else {
					sta = 1
				}
				localStorage.setItem('quid', item.id)
				userUpdateQuestionnaire({
					signed: sta
				}).then((data) => {
					this.getWenShu()
				})
			},
			closeZhiDao () { // 关闭指导弹窗
				this.dialogZhiDao = false
			},
			goKnowledgeMin (id) { // 协议书如何谈判
			  localStorage.setItem('topins',1)
			  const {href} = this.$router.resolve({
			  	path: '/KnowledgeCon',
			  	params: {
			  	  id: id
			  	}
			  })
			  window.open(href, '_blank')
			  localStorage.setItem('KnowledgeId',id)
			},
			getHeadActive (data) {
				localStorage.setItem('topins',data)
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
	}

	.c_m_h {
		height: 109px;
		border-bottom: 2px solid #f2f4f7;
		margin-top: 39px;
	}
	.min_l{height: 500px;overflow-y: scroll;}
	::-webkit-scrollbar {
		width:1px;
		background-color: #FFF;
	}
	.c_m_h_r span {
		display: inline-block;
		width: 151px;
		height: 35px;
		border: 1px solid #535353;
		text-align: center;
		line-height: 35px;
		border-radius: 18px;
		font-size: 16px;
		color: #535353;
		font-weight: bold;
	}
	.c_m_h_r span:first-of-type{border: 1px solid #ff3f68;color:#ff3f68;}
	.c_m_h_r span:hover {
		border: 1px solid #ff3f68;
		background-color: #ff3f68;
		color: #fff;
		cursor: pointer
	}

	.c_m_m_h {
		font-size: 18px;
		color: #535353;
		height: 78px;
	}

	.c_m_m_m ul li h4 {
		height: 33px;
		font-size: 12px;
		background-color: #f2f4f7;
	}
	.c_m_m_m_child ul li h4{height: 30px;font-size: 12px;background-color: #fff;    border-top: 2px solid #f2f4f7;}
	.c_m_m_m_child .c_m_m_m_m{height: 75px;}
	.c_m_m_m_m {
		height: 98px;
	}
	.c_m_m_m_child .c_m_m_m_m h2 {color: #878787;font-weight:400;}
	.c_m_m_m_m h2 {
		font-size: 22px;
		font-weight: bold;
	}

	.c_m_m_m_m dl dt {
		font-size: 18px;
	}

	.c_m_m_m_m dl dd {
		font-size: 14px;
		color: #979797;
		text-decoration: underline;
		cursor: pointer;
	}

	.c_m_m_m_m dl dd.re {
		color: #ff7290;
	}

	.c_m_m_m_m dl dd.text-red {
		color: #ff7290;
	}

	.c_m_m_m_m_r span {
		width: 58px;
		height: 24px;
		text-align: center;
		line-height: 24px;
		border-radius: 12px;
		border: 1px solid #547ce0;
		color: #547ce0;
		font-size: 14px;
	}

	.c_m_m_m_m_r span:hover {
		background-color: #547ce0;
		color: #fff;
	}

	.c_m_m_m_m_r_n span {
		width: 58px;
		height: 24px;
		text-align: center;
		line-height: 24px;
		border-radius: 12px;
		border: 1px solid #cfcfcf;
		color: #cfcfcf;
		font-size: 14px;
	}

	.tishi_bot {
		width: 502px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.cbt {
		width: 218px;
		height: 38px;
		line-height: 38px;
		text-align: center;
		color: #535353;
		border: 1px solid #535353;
		font-size: 16px;
		border-radius: 19px;
		display: inline-block;
	}
	.cbt:hover{
		color: #fff;
		border: 1px solid #ff3f68;
		background-color: #ff3f68;
	}

	.zhidaopage {
		position: fixed;
		top:0;
		left: 0;
		z-index: 200;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,0.5);
	}

	.zhidaopage .el-dialog__wrapper .dialog{width: 761px;height: 554px;}
	.re {
		color: #ff3f68;
		border: 1px solid #ff3f68;
	}
	.mianze p{text-indent: 2em;}
	
</style>
