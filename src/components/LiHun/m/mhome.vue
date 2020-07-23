<template>
	<div class="mmin">
		<div class="mhead flex justify-between items-center">
			<div class="mhead_l py-1 flex justify-between items-center">
				<router-link  class="mlogo" to="/m/mhome"><img src="../../../assets/images/lihun/m/mlogo.png" alt=""></router-link>
				<el-divider class="" direction="vertical"></el-divider>
				<span class="text-sm ">离婚协议书</span>
			</div>
			<div v-if="this.isLogin==true" class="touxiang">
				<img v-if="this.userMsg.photo == null || this.userMsg.photo =='' " @click="gomuser" src="../../../assets/images/lihun/m/user_img.png" alt="">
				<img v-else @click="gomuser" :src="this.userMsg.photo" alt="">
			</div>
			<div v-if="this.isLogin==false" class="denglu text-base flex justify-around items-center">
				<span @click="goLogin">登录</span>
				<el-divider class="" direction="vertical"></el-divider>
				<span @click="goRegist">注册</span>
			</div>
		</div>
		<div class="m_nav w-full">
			<ul class="flex justify-between items-center py-2">
				<li @click="goKnowledge" class="text-white text-base text-bold">离婚知识</li>
				<li @click="goQueDing" class="text-white text-base text-bold">定制离婚协议书</li>
				<li @click="gomAgreementModel" class="text-white text-base text-bold">离婚协议书范文</li>
			</ul>
		</div>
		<div class="m_swiper">
			<el-carousel :interval="5000" arrow="always" height="170px">
				<el-carousel-item >
					<div class="swiper01 swiperCommon">
					  <img class="inline-block" src="../../../assets/images/lihun/m/home_swiper02.jpg" alt="">
					</div>
				</el-carousel-item>
				<el-carousel-item >
					<div class="swiper01 swiperCommon">
					  <img class="inline-block" src="../../../assets/images/lihun/m/home_swiper03.jpg" alt="">
					</div>
				</el-carousel-item>
				<el-carousel-item >
					<div class="swiper01 swiperCommon">
					  <img class="inline-block" src="../../../assets/images/lihun/m/home_swiper04.jpg" alt="">
					</div>
				</el-carousel-item>
				<el-carousel-item >
					<div class="swiper01 swiperCommon">
					  <img class="inline-block" src="../../../assets/images/lihun/m/home_swiper01.jpg" alt="">
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="m_wuqu">
			<div class="m_wuqu_t py-8 text-center">
				<h2 class="text-xl">常见离婚协议误区</h2>
				<span class="text-xs px-2 mt-2 border rouded-sm">准备离婚图省事   草草签字就了事   招来一堆麻烦事</span>
			</div>
			<div class="m_wuqu_min pb-10">
				<ul class="flex justify-between px-3">
					<li @click="goKnowledgeMin(21)">
						<img src="../../../assets/images/lihun/m/home_wuqu01.png" alt="">
						<p class="text-sm">找网上协议模板能尽快离婚就行</p>
					</li>
					<li @click="goKnowledgeMin(21)">
						<img src="../../../assets/images/lihun/m/home_wuqu02.png" alt="">
						<p class="text-sm">离婚协议书可以随意修改</p>
					</li>
				</ul>
				<ul class="flex justify-between px-3 mt-3">
					<li @click="goKnowledgeMin(21)">
						<img src="../../../assets/images/lihun/m/home_wuqu03.png" alt="">
						<p class="text-sm">签完离婚协议书就一劳永逸了</p>
					</li>
					<li @click="goKnowledgeMin(21)">
						<img src="../../../assets/images/lihun/m/home_wuqu04.png" alt="">
						<p class="text-sm">双方签字后协议立即生效</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="m_fuwu">
			<div class="m_fuwu_t py-8 text-center">
				<h2 class="text-xl">专业离婚协议书定制服务</h2>
				<span class="text-xs mt-2 px-2 border border-gray-500 rouded-sm">基于家理起草的1000+份离婚协议书研发</span>
			</div>
			<div class="m_fuwu_min flex justify-around flex-wrap">
				<dl>
					<dt>
						<img src="../../../assets/images/lihun/m/home_fuwu01.png" alt="">
					</dt>
					<dd>
						<h3>安全</h3>
						<p>自主操作，隐私保护</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../../assets/images/lihun/m/home_fuwu02.png" alt="">
					</dt>
					<dd>
						<h3>定制</h3>
						<p>非网上模板</p>
						<p>量体裁衣</p>
					</dd>
				</dl>
				<dl>
					<dt>
						<img src="../../../assets/images/lihun/m/home_fuwu03.png" alt="">
					</dt>
					<dd>
						<h3>便捷</h3>
						<p>随时随地，便捷高效</p>
						<p>20分钟完成</p>
					</dd>
				</dl>
				<dl class="mt-3">
					<dt>
						<img src="../../../assets/images/lihun/m/home_fuwu04.png" alt="">
					</dt>
					<dd>
						<h3>专业</h3>
						<p>10+年专业经验</p>
						<p>服务50000+客户</p>
					</dd>
				</dl>
				<dl class="mt-3">
					<dt>
						<img src="../../../assets/images/lihun/m/home_fuwu05.png" alt="">
					</dt>
					<dd>
						<h3>服务</h3>
						<p>大改微调，在线操作</p>
						<p>不限次数</p>
					</dd>
				</dl>
			</div>
		</div>
		<div class="m_gushi">
			<div class="m_gushi_t py-8 text-center">
				<h2 class="text-xl">关于离婚协议书的产品故事</h2>
				<span class="text-xs px-2 mt-2 border rouded-sm">关于离婚协议书的产品故事</span>
			</div>
			<div class="m_gushi_min pb-10 px-3">
				<p class="text-sm text-left">2018年的一天，一位当事人通过朋友辗转联系，千里迢迢来到北京，上门委托我们起诉。她风尘仆仆、面容憔悴的样子与其他客户迥然不同。我们得知，她来自南方的一个三线城市，由于找寻专业婚姻律师未果，才四处打听，找到了我们…………</p>
				<span  @click="goKnowledgeMin(45)" class="text-right text-sm  underline">查看></span>
			</div>
		</div>
		<div class="m_yanfa">
			<div class="m_yanfa_t py-8 text-center">
				<h2 class="text-xl">专业离婚协议书定制服务</h2>
				<span class="text-xs mt-2 px-2 border border-gray-500 rouded-sm">基于家理起草的1000+份离婚协议书研发</span>
			</div>
			<div class="m_yanfa_min pb-8">
				<ul class="flex justify-between px-3">
					<li>
						<h2>10+年</h2>
						<div class="text-xs">
							<p>团队专注</p>
							<p>婚姻家事法律服务10+年</p>
						</div>
					</li>
					<li>
						<h2>100+件专业经验</h2>
						<div class="text-xs">
							<p>家理出庭律师均拥有100+件</p>
							<p>婚姻家事案件经验</p>
						</div>
					</li>
				</ul>
				<ul class="flex justify-between px-3 mt-3">
					<li>
						<h2>20000+咨询</h2>
						<div class="text-xs">
							<p>每年为近30000人提供免费</p>
							<p>婚姻家事法律咨询</p>
						</div>
					</li>
					<li>
						<h2>10.3亿元</h2>
						<div class="text-xs">
							<p>单个案件标的额</p>
							<p>最高达10.3亿元</p>
						</div>
					</li>
				</ul>
				<div class="pingjia px-3 pt-10">
					<el-carousel :interval="5000" arrow="always" height="160px" indicator-position="outside">
						<el-carousel-item >
							<div class="swiper01 swiperCommon">
							  <div class="bg-white py-6 px-5 flex justify-between items-center">
								  <img src="../../../assets/images/lihun/m/mhome_swiperimg01.png" alt="">
								  <div class="text-left px-5">
									  <h2 class="text-base">王女士 北京</h2>
									  <span class="mb-2 block text-xs text-gray-500">2020.07.05</span>
									  <p class="text-xs">这个网站的离婚知识通俗易懂，内容很全面，一下子懂了很多，写协议的时候也不那么懵了。</p>
								  </div>
							  </div>
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="swiper01 swiperCommon">
							  <div class="bg-white py-6 px-5 flex justify-between items-center">
								  <img src="../../../assets/images/lihun/m/mhome_swiperimg01.png" alt="">
								  <div class="text-left px-5">
									  <h2 class="text-base">赵女士 湖北</h2>
									  <span class="mb-2 block text-xs text-gray-500">2020.05.01</span>
									  <p class="text-xs">这个文书生成挺好用的，对比了一下自己在网上下载的模板，也不懂该怎么填，回答选择问题就好了。</p>
								  </div>
							  </div>
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="swiper01 swiperCommon">
							  <div class="bg-white py-6 px-5 flex justify-between items-center">
								  <img src="../../../assets/images/lihun/m/mhome_swiperimg01.png" alt="">
								  <div class="text-left px-5">
									  <h2 class="text-base">李女士 河南</h2>
									  <span class="mb-2 block text-xs text-gray-500">2020.02.01</span>
									  <p class="text-xs">协议内容很详细，操作也简单，比自己写的专业多了！学了很多专业知识，让我少走了很多弯路。</p>
								  </div>
							  </div>
							</div>
						</el-carousel-item>
						<el-carousel-item >
							<div class="swiper01 swiperCommon">
							  <div class="bg-white py-6 px-5 flex justify-between items-center">
								  <img src="../../../assets/images/lihun/m/mhome_swiperimg01.png" alt="">
								  <div class="text-left px-5">
									  <h2 class="text-base">孙女士 河北</h2>
									  <span class="mb-2 block text-xs text-gray-500">2020.03.15</span>
									  <p class="text-xs">朋友推荐过来的，里面的内容很详细，里面关于离婚谈判技巧的介绍，让我顺利争取到了应得的利益。</p>
								  </div>
							  </div>
							</div>
						</el-carousel-item>
					</el-carousel>
				</div>
			</div>
		</div>
		<div class="m_liucheng">
			<div class="m_liucheng_t py-8 text-center">
				<h2 class="text-xl">使用流程</h2>
				<span class="text-xs px-2 mt-2 border rouded-sm">20分钟即可完成专属定制</span>
			</div>
			<div class="m_liucheng_min pb-10 mx-3">
				<img src="../../../assets/images/lihun/m/m_liucheng_min.png" alt="">
			</div>
		</div>
		<!-- 共用底部 -->
		<m-bottom></m-bottom>
	</div>
</template>

<script>
import m_bottom from '../../partials/m_bottom.vue'
import {usersSelect} from '@/api/api/AgreementRequest.js'
export default {
	name: 'Pay',
	components: {
	  'm-bottom': m_bottom
	},
	data () {
		return {
			userMsg:{
				photo: ''
			},
			isLogin: false
		}
	},
	mounted () {
		this.getUserMsg()
	},
	methods: {
		getUserMsg () {
			usersSelect().then((data) => {
			  if (data.data.status_code == 401) {
				  localStorage.removeItem('token') // 存储token
				  this.isLogin = false
				  this.$router.replace('/m/mhome')
			  } else  {
				  this.userMsg.photo = data.data.photo
				  this.isLogin = true
			  }
			})
		},
		goQueDing () { // 去定制离婚协议书页面
			this.$router.replace('/m/mQueDing')
		},
		goKnowledge () { // 去离婚知识页面
			this.$router.replace('/m/merror')
		},
		gomAgreementModel () { // 协议书模板
			this.$router.replace('/m/mAgreementModel')
		},
		goLogin () { // 去登录
			this.$router.replace('/m/mLogin')
		},
		goRegist () { // 去注册
			this.$router.replace('/m/mRegist')
		},
		gomuser () {
			this.$router.replace('/m/mUser')
		},
		goKnowledgeMin (id) { // 协议书如何谈判
		  this.$router.push({
		    path: `/m/mKnowledgeMin/${id}`,
		  })
		  localStorage.setItem('mKnowledgeMin',id)
		},
	}
}
</script>

<style scoped="scoped">
	.mmin{max-width: 40rem;margin:0 auto}
	.mhead_l span{color: #b7b7b7;}
	.mlogo{width:94px;height: 31px;display: inline-block;}
	.denglu{color:#547ce0;}
	.mhead{margin: 0.8125rem 1.5rem;}
	.m_nav{background-color:#547ce0;}
	.m_nav ul{margin:0 1.5rem;}
	.m_wuqu_t h2{color: #535353;}
	.m_wuqu_min ul li{width: 48%;height: 165px;}
	.m_wuqu_min ul li img{height:120px;width: 100%;display: block;}
	.m_wuqu_min ul li p{color: #fff;background-color: #91aad2;padding-left: 37px;padding-right: 37px;text-align: center;height: 45px;width: 100%;}
	.m_fuwu{background:url(../../../assets/images/lihun/m/m_fuwu_bg.png)no-repeat; background-size: cover;}
	.m_fuwu_t h2{color: #535353;}
	.m_fuwu_min{margin:0 1rem;padding-bottom: 35px;}
	.m_fuwu_min dl{width: 33%;}
	.m_fuwu_min dl dt img{width: 58px;height: 58px;margin:0 auto;}
	/* .m_fuwu_min dl dd {margin-top: 11px;} */
	.m_fuwu_min dl dd h3{font-size: 14px;font-weight: bold;color:#535353;margin:11px auto;}
	.m_fuwu_min dl dd p{font-size: 12px;color: #717172;text-align: center;}
	.m_gushi h2{color: #535353;}
	.m_gushi_min p{text-indent: 2em;color:#777777}
	.m_gushi_min span{display: inherit;color: #829fe8;}
	.m_yanfa_t h2{color: #535353;}
	.m_yanfa_min  ul li{width: 48%;height: 100px;}
	.m_yanfa_min  ul li h2{height: 50px;background-color: #fff;color:#547ce0;font-weight: 900;font-size: 18px;line-height: 50px;}
	.m_yanfa_min  ul li div{height: 50px;background-color: #547ce0;color:#fff;padding:7px 0px;}
	.m_yanfa{background:url(../../../assets/images/lihun/m/m_yanfa_bg.png)no-repeat; background-size: cover;}
	.m_liucheng_t h2{color: #535353;}
	.touxiang img{display: inline-block;width: 32px;height: 32px;border-radius: 50%;}
	.pingjia .swiperCommon p{line-height: 20px;}
</style>
