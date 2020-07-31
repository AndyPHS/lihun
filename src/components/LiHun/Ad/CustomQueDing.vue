<template>
	<div class="all">
		<div class="w-full bg-white" style="margin-bottom: 13px;">
			<div class="w c_m_h flex justify-between items-center px-12">
			  <h2>
				<img class="inline-block mr-5" src="../../../assets/images/lihun/logo.png" alt="">
			    定制我的协议书
			  </h2>
			  <div class="c_m_h_r">
				<span @click="goHome">返回首页</span>
			    <div class="help ml-5" @click="goAgreementHelp">协议书定制帮助</div>
			  </div>
			</div>
		</div>
		<div class="c_m w">
			<div class="c_m_m mx-auto">
				<div>
					<h2 class="c_m_m_tit">所需材料</h2>
					<el-form>
						<div class="ml-5">
							<div class="text-lg text-left mt-8">根据您填写的信息，您与配偶
								<span v-if="this.ChuShiMsg.child !='' ">生育有{{ this.ChuShiMsg.child }}个子女，</span>需要处理的夫妻共同财产为:
								
								
							</div>
							<div class="cailist flex flex-wrap">
								<span class="inline" v-if="this.CommonCaiChan.fangchan">房产</span>
								<span class="inline" v-if="this.CommonCaiChan.cheliang">车辆</span>
								<span class="inline" v-if="this.CommonCaiChan.cunkuan">存款</span>
								<span class="inline" v-if="this.CommonCaiChan.licai">理财</span>
								<span class="inline" v-if="this.CommonCaiChan.gongjijin">公积金</span>
								<span class="inline" v-if="this.CommonCaiChan.baoxian">保险</span>
								<span class="inline" v-if="this.CommonCaiChan.guquangufen">股权（股份）</span>
								<span class="inline" v-if="this.CommonCaiChan.gupiaozhanghu">股票账户</span>
								<span class="inline" v-if="this.CommonCaiChan.jiajujiadian">家具家电</span>
								<span class="inline" v-if="this.CommonCaiChan.zhubaoshoushi">珠宝首饰收藏品</span>
								<span class="inline" v-if="this.CommonCaiChan.zhuaijuan">债券</span>
								<span class="inline" v-if="this.CommonCaiChan.dianpu">店铺</span>
								<span class="inline" v-if="this.CommonCaiChan.zhaijidi">宅基地房屋</span>
								<span class="inline" v-if="this.ChuShiMsg.zhaiQuan">债权</span>
								<span class="inline" v-if="this.ChuShiMsg.zhaiWu">债务</span>
								<span class="inline" v-if="this.CommonCaiChan.fangchan == false && this.CommonCaiChan.cheliang == false && this.CommonCaiChan.cunkuan == false && this.CommonCaiChan.licai == false && this.CommonCaiChan.baoxian == false && this.CommonCaiChan.guquangufen == false && this.CommonCaiChan.gupiaozhanghu == false && this.CommonCaiChan.jiajujiadian == false && this.CommonCaiChan.zhubaoshoushi == false && this.CommonCaiChan.zhuaijuan == false && this.CommonCaiChan.dianpu == false && this.CommonCaiChan.zhaijidi == false && this.ChuShiMsg.zhaiQuan == false && this.ChuShiMsg.zhaiWu == false">无</span>
							</div>
							<!-- <div>
								<div class="w-full mx-auto py-10">
									<ul class="shili flex flex-wrap">
										<li class="lis_red" v-for="(item, index) in this.ChuShiMsgArr" :key="index">{{index+1}}、{{ item.title }}<span class="">{{ item.title2 }}</span></li>
									</ul>
								</div>
							</div> -->
							<div class="text-left">为了更高效地为您定制专属协议，建议您在填写前先准备好下列材料：</div>
						</div>
					</el-form>
					
					<div class="flex flex-wrap pt-10">
						<div class="tupian">
							<div class="w-full tupian_tit">1.结婚证</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/jiehunzheng01.png" alt="结婚证图片">
							</div>
						</div>
						<div class="tupian">
							<div class="w-full tupian_tit">
								2.身份证
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/idcard.png" alt="身份证示例图">
							</div>
						</div>
						<div class="tupian">
							<div class="w-full tupian_tit">
								3.户口本
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/hukouben01.png" alt="户口本图片">
							</div>
						</div>
						<div class="tupian">
							<div class="w-full tupian_tit">
								4.银行账户
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/yinhangzhanghu01.png" alt="银行账户">
							</div>
						</div>
						<div class="tupian">
							<div class="w-full tupian_tit">
								5.存折
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/cunzhe01.png" alt="存折">
							</div>
						</div>
						<div class="tupian" v-if="this.ChuShiMsg.house">
							<div class="w-full tupian_tit">
								6.房产证
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/fangchanzheng01.jpg" alt="房产证">
							</div>
						</div>
						<div class="tupian" v-if="this.ChuShiMsg.house">
							<div class="w-full tupian_tit">
								7.房屋买卖合同
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/fangwumaimaihetong01.png" alt="房屋买卖合同">
							</div>
						</div>
						<div class="tupian" v-if="this.ChuShiMsg.liCai">
							<div class="w-full tupian_tit">
								8.理财协议
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/licaixieyi01.jpg" alt="理财协议">
							</div>
						</div>
						<div class="tupian" v-if="this.ChuShiMsg.car">
							<div class="w-full tupian_tit">
								9.机动车登记证
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/jidongchedengjizheng01.jpg" alt="机动车登记证">
							</div>
						</div>
						<div class="tupian" v-if="this.ChuShiMsg.car">
							<div class="w-full tupian_tit">
								10.机动车行驶证
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/jidongchexingshizheng01.jpg" alt="机动车行驶证">
							</div>
						</div>
						<div class="tupian" v-if="this.ChuShiMsg.baoXian">
							<div class="w-full tupian_tit">
								11.保险合同
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/baoxian01.jpg" alt="保险合同">
							</div>
						</div>

						<div class="tupian" v-if="this.ChuShiMsg.child !=='' ">
							<div class="w-full tupian_tit">
								12.孩子出生证明
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/haizichushengzhengming01.jpg" alt="孩子出生证明">
							</div>
						</div>
						<div class="tupian" v-if="this.CommonCaiChan.dianpu">
							<div class="w-full tupian_tit">
								13.营业执照
							</div>
							<div class="shili_img">
								<img src="@/assets/images/lihun/yingyezhizhao.jpeg" alt="孩子出生证明">
							</div>
						</div>
					</div>
					<div class="bankuai">
						<h2>协议定制共有六个板块，预计耗时20分钟。</h2>
						<p>定制过程中，系统会自动保存您填写的信息。</p>
						<ul>
							<li>
								<img src="../../../assets/images/lihun/jibenxinxi.png" alt="">
								<h6>基本信息</h6>
							</li>
							<li>
								<img src="../../../assets/images/lihun/hunyinzhuangkuang.png" alt="">
								<h6>婚姻状况</h6>
							</li>
							<li>
								<img src="../../../assets/images/lihun/zinvfuyang.png" alt="">
								<h6>子女抚养</h6>
							</li>
							<li>
								<img src="../../../assets/images/lihun/caichanfenge.png" alt="">
								<h6>财产分割</h6>
							</li>
							<li>
								<img src="../../../assets/images/lihun/zhaiquanzhaiwu.png" alt="">
								<h6>债权债务</h6>
							</li>
							<li>
								<img src="../../../assets/images/lihun/teshuyueding.png" alt="">
								<h6>特殊约定</h6>
							</li>
						</ul>
					</div>
					<div class="my-8">
						<div class="dingzhi_btn mx-auto">
							<div class="dingzhi" @click="NextPage">
								开始定制我的协议
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<lihun-bottom-common></lihun-bottom-common>
	</div>
</template>
<script>
	// import lihun_head from '../../partials/lihun_head.vue'
	import lihun_bottom_com from '../../partials/lihun_bottom_com.vue'
	import {getOnlyValue, addQuestionnaireLog} from '@/api/api/AgreementRequest.js' // 获取单独问题的值
	// import {answer} from '@/api/api/requestLogin.js'
	export default {
		name: 'CustomQueDing',
		components: {
			'lihun-bottom-common': lihun_bottom_com
		},
		data() {
			return {
				ChuShiMsgArr: [{
						title: '结婚证',
						title2: '(示例一)',
						img: ''
					},
					{
						title: '身份证',
						title2: '(示例二)',
						img: ''
					},
					{
						title: '户口本',
						title2: '(示例三)',
						img: ''
					},
					{
						title: '银行账户',
						title2: '(示例四)',
						img: ''
					},
					{
						title: '存折',
						title2: '(示例五)',
						img: ''
					}
				],
				ChuShiMsg: {
					child: '',
					house: false,
					car: false,
					money: false,
					baoXian: false,
					liCai: false,
					jiaDian: false,
					zhaiQuan: false,
					zhaiWu: false
				},
				CommonCaiChan: {
					fangchan: false,
					cheliang: false,
					cunkuan: false,
					licai: false,
					gongjijin: false,
					baoxian: false,
					guquangufen: false,
					gupiaozhanghu: false,
					jiajujiadian: false,
					zhubaoshoushi: false,
					zhuaijuan: false,
					dianpu: false,
					zhaijidi: false
				}
			}
		},
		mounted() {
			this.getMsg(); // 获取初始页面的信息
			localStorage.setItem('topins',2)
		},
		methods: {
			getId(index) {
				return 'box_' + index
			},
			getMsg() {
				getOnlyValue({
					qpid: 520, // 关联id
					quid: Number(localStorage.getItem('quid')) //用户的问卷id
				}).then((data) => {

					let getmodel = JSON.parse(data.data.data)
					getmodel.forEach((item) => {
						if (item == 1) {
							this.ChuShiMsg.house = true
							this.CommonCaiChan.fangchan = true
							this.ChuShiMsgArr.push({
								title: '房产证',
								title2: '(示例六)',
								img: ''
							})
							this.ChuShiMsgArr.push({
								title: '房屋买卖合同',
								title2: '(示例七)',
								img: ''
							})
						} else if (item == 2) {
							this.ChuShiMsgArr.push({
								title: '机动车登记证',
								title2: '(示例九)',
								img: ''
							})
							this.ChuShiMsgArr.push({
								title: '机动车行驶证',
								title2: '(示例十)',
								img: ''
							})
							this.ChuShiMsg.car = true
							// this.ChuShiMsg.money = true
						} else if (item == 3) {
							this.CommonCaiChan.cunkuan = true
						} else if (item == 4) {
							this.ChuShiMsgArr.push({
								title: '理财协议',
								title2: '(示例八)',
								img: ''
							})
							this.ChuShiMsg.liCai = true
							this.CommonCaiChan.licai = true
						} else if (item == 5) {
							this.CommonCaiChan.gongjijin = true
							// this.ChuShiMsg.jiaDian = true
						} else if (item == 6) {
							this.ChuShiMsg.baoXian = true
							this.ChuShiMsgArr.push({
								title: '保险合同',
								title2: '(示例十一)',
								img: ''
							})
						}
						if (item == 1) {
							this.CommonCaiChan.fangchan = true
						} else if (item == 2) {
							this.CommonCaiChan.cheliang = true
						} else if (item == 3) {
							this.CommonCaiChan.cunkuan = true
						} else if (item == 4) {
							this.CommonCaiChan.licai = true
						} else if (item == 5) {
							this.CommonCaiChan.gongjijin = true
						} else if (item == 6) {
							this.CommonCaiChan.baoxian = true
						} else if (item == 7) {
							this.CommonCaiChan.guquangufen = true
						} else if (item == 8) {
							this.CommonCaiChan.gupiaozhanghu = true
						} else if (item == 9) {
							this.CommonCaiChan.jiajujiadian = true
						}
					})

				}).catch((data) => {

				})
				getOnlyValue({
					qpid: 654, // 关联id
					quid: Number(localStorage.getItem('quid')) //用户的问卷id
				}).then((data) => {
					let getmodel = JSON.parse(data.data.data)
					getmodel.forEach((item) => {
						if (item == 1) {
							this.ChuShiMsg.zhaiQuan = true
						} else if (item == 2) {
							this.ChuShiMsg.zhaiWu = true
						}
					})
				}).catch((data) => {

				})
				getOnlyValue({
					qpid: 3859, // 关联id
					quid: Number(localStorage.getItem('quid')) //用户的问卷id
				}).then((data) => {
					if (data.data.data == 1) {
						this.ChuShiMsg.child = '一'
					} else if (data.data.data == 2) {
						this.ChuShiMsg.child = '二'
					} else if (data.data.data == 3) {
						this.ChuShiMsg.child = '三'
					} else if (data.data.data == 4) {
						this.ChuShiMsg.child = '四'
					} else if (data.data.data == 5) {
						this.ChuShiMsg.child = '五'
					} else if (data.data.data == 6) {
						this.ChuShiMsg.child = '六'
					} else if (data.data.data == 7) {
						this.ChuShiMsg.child = '七'
					}
					if (data.data.data !== '') {
						this.ChuShiMsgArr.push({
							title: '孩子出生证明',
							title2: '(示例十二)',
							img: ''
						})
					}
				}).catch((data) => {

				})
				getOnlyValue({ // 其他财产
					qpid: 3853, // 关联id
					quid: Number(localStorage.getItem('quid')) //用户的问卷id
				}).then((data) => {
					let getmodel = JSON.parse(data.data.data)
					getmodel.forEach((item) => {
						if (item == 1) {
							this.CommonCaiChan.zhubaoshoushi = true
						} else if (item == 2) {
							this.CommonCaiChan.zhuaijuan = true
						} else if (item == 3) {
							this.CommonCaiChan.dianpu = true
						} else if (item == 4) {
							this.CommonCaiChan.zhaijidi = true
						}

					})
				}).catch((data) => {

				})
			},
			NextPage() {
				addQuestionnaireLog().then((data) => {
					// console.log(data.data.data)
				    localStorage.setItem('uqlId',data.data.data)	
				})
				this.$router.replace("/CustomBasic");
			},
			goHome () {
				localStorage.setItem('topins',0)
				const {href} = this.$router.resolve({
					path: '/'
				})
				window.open(href, '_blank')
			},
			goAgreementHelp () {
				localStorage.setItem('topins',1)
				const {href} = this.$router.resolve({
					path: '/AgreementHelp'
				})
				window.open(href, '_blank')
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
		height: 90px;
	}

	.c_m_h h2 {
		width: 350px;
		font-size: 25px;
		color: #535353;
		font-weight: bold;
	}

	.c_m_h_r {
		width: 542px;
		text-align: right;
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

	.c_m_h_r span:hover {
		border: 1px solid #ff3f68;
		background-color: #ff3f68;
		color: #fff;
		cursor: pointer
	}

	.toubu {
		height: 150px
	}

	.c_m_m {
		padding: 40px 100px;
	}
	.c_m_m_tit{font-size: 25px;color: #535353;width: 100%;text-align: center;font-weight: bold;}
	.shili{width: 770px;margin:0 auto;display: flex;justify-content: flex-start;}
	.lis_red {
		color: #ff3f68 ;
		width: 233px;
		height: 49px;
		line-height: 49px;
		text-align: center;
		border:1px solid #ff4a70;
		background-color: #fff6f8;
		border-radius: 5px;
		margin-bottom: 22px;
		font-size: 18px;
		margin-left: 20px;
	}
	.lis_red span{display: inline-block;font-size:16px;margin-left: 10px;}
	.dingzhi {
		width: 193px;
		height: 40px;
		line-height: 40px;
		background-color: #ff3f68;
		color: #fff;
		border-radius: 20px;
		font-size: 18px;
		cursor: pointer;
		text-align: center;
	}
	.dingzhi:hover{
		background-color: #ff6687;
	}
	.tupian{width:186px;height: 158px;background:#f4f4f4;border: 1px solid #e5e4e4;border-radius: 10px;margin-right: 14px;margin-bottom:37px;}
	.tupian_tit{font-size: 20px;color: #ff3f68;text-align: center;margin:18px 0 10px}
	.shili_img {
		width: 129px;
		height: 90px;
		margin: 0 auto;
	}
	.cailist{padding-top: 34px;padding-bottom: 34px;}
	.cailist span{padding:5px 12px;background-color:#fff4f6;border:1px solid #ff3f68;color:#ff3f68;border-radius: 5px; margin-right: 17px;margin-bottom: 19px;}
	.bankuai{width: 760px;margin:0 auto;}
	.bankuai h2{font-size: ;color:#ff5c7e;font-size: 24px;font-weight: bold;padding-top:23px}
	.bankuai p{font-size: 16px;color: #6a6a6a;margin-top: 10px;}
	.bankuai ul{display: flex;justify-content: space-between;margin: 60px auto;}
	.bankuai ul li{width:110px;height: 100px;background-color:#f4f4f4;color:#535353;border:1px solid #e5e5e5;border-radius: 10px;}
	.bankuai ul li img{display: inline;margin:20px 0 15px}
	.bankuai ul li h6{text-align: center;font-size:19px;color: #535353;font-weight: bold;}
	.dingzhi_btn{width: 192px;}
	.c_m_h_r .help{width: 151px;height: 35px;text-align: center;line-height: 35px;font-size:16px;color:#535353;display: initial;text-decoration: underline;}
	.c_m_h_r .help:hover{font-weight: bolder;cursor: pointer;}
</style>
