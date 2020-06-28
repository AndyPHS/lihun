<template>
  <div>
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <el-carousel :interval="5000" arrow="always" height="550px">
      <el-carousel-item>
        <div class="swiper01">
          <div class="w flex justify-between items-center swi">
            <div class="swiper01_min">
              <p>离婚协议在线生成，20分钟个性化定制</p>
              <h2 class="font-thin">已累计起草2585份</h2>
              <div>
                <img @click="goDingZhi" class="cursor-pointer" src="../../../assets/images/lihun/swiper_btn.png" alt="">
              </div>
            </div>
            <div>
              <img src="../../../assets/images/lihun/swiper01_img01.png" alt="">
            </div>
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item >
        <div class="swiper01">
          <div class="w flex justify-between items-center swi">
            <div class="swiper01_min">
              <p>离婚协议书自动生成，20分钟专属定制</p>
              <h2 class="font-thin">已累计定制3500份</h2>
              <div>
                <img @click="goDingZhi" class="cursor-pointer" src="../../../assets/images/lihun/swiper_btn.png" alt="">
              </div>
            </div>
            <div>
              <img src="../../../assets/images/lihun/swiper01_img01.png" alt="">
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="wuqu">
      <div class="head_com">
        <h2>常见离婚协议误区</h2>
        <span>准备离婚图省事 &nbsp; 草草签字就了事 &nbsp; 招来一堆麻烦事</span>
      </div>
      <div class="w flex justify-between">
        <dl class="w-1/4 cursor-pointer mr-10" @click="goKnowledgeMin(21)">
          <dt>
            <img src="../../../assets/images/lihun/wuqu01.png" alt="">
          </dt>
          <dd>
            <p>找网上协议模板</br>能尽快离婚就行</p>
          </dd>
        </dl>
        <dl class="w-1/4 cursor-pointer mr-10" @click="goKnowledgeMin(21)">
          <dt>
            <img src="../../../assets/images/lihun/wuqu02.png" alt="">
          </dt>
          <dd>
            <p>离婚协议</br>可以随意修改</p>
          </dd>
        </dl>
        <dl class="w-1/4 cursor-pointer mr-10" @click="goKnowledgeMin(21)">
          <dt>
            <img src="../../../assets/images/lihun/wuqu03.png" alt="">
          </dt>
          <dd>
            <p>签完离婚协议</br>就一劳永逸了</p>
          </dd>
        </dl>
        <dl class="w-1/4 cursor-pointer" @click="goKnowledgeMin(21)">
          <dt>
            <img src="../../../assets/images/lihun/wuqu04.png" alt="">
          </dt>
          <dd>
            <p>双方签字后</br>协议立即生效</p>
          </dd>
        </dl>
      </div>
      <div class="moreZhiShi">
        <span @click="goMoreKnowledge" class="cursor-pointer">更多离婚知识 ></span>
      </div>
    </div>
    <div class="fuwu">
      <div class="head_com">
        <h2>专业离婚协议定制服务</h2>
        <span>基于家理起草的1000+份离婚协议书研发</span>
      </div>
      <div class="w flex justify-between">
        <dl class="w-1/5">
          <dt>
            <img class="inline-block" src="../../../assets/images/lihun/fuwu_01.png" alt="">
            <h3>安全</h3>
          </dt>
          <dd>
            <p>自主操作</br>隐私保护</p>
          </dd>
        </dl>
        <dl class="w-1/5">
          <dt>
            <img class="inline-block" src="../../../assets/images/lihun/fuwu_02.png" alt="">
            <h3>定制</h3>
          </dt>
          <dd>
            <p>非网上模板</br>量体裁衣</p>
          </dd>
        </dl>
        <dl class="w-1/5">
          <dt>
            <img class="inline-block" src="../../../assets/images/lihun/fuwu_03.png" alt="">
            <h3>便捷</h3>
          </dt>
          <dd>
            <p>随时随地,便捷高效</br>20分钟完成</p>
          </dd>
        </dl>
        <dl class="w-1/5">
          <dt>
            <img class="inline-block" src="../../../assets/images/lihun/fuwu_04.png" alt="">
            <h3>专业</h3>
          </dt>
          <dd>
            <p>10+年专业经验</br>服务50000+客户</p>
          </dd>
        </dl>
        <dl class="w-1/5">
          <dt>
            <img class="inline-block" src="../../../assets/images/lihun/fuwu_05.png" alt="">
            <h3>服务</h3>
          </dt>
          <dd>
            <p>大改微调,在线操作</br>不限次数</p>
          </dd>
        </dl>
      </div>
    </div>
    <div class="guanyu">
      <div class="head_com">
        <h2>关于离婚协议在线生成</h2>
        <span>基于大数据研发</span>
      </div>
      <div class="w guanyu_min flex justify-between">
        <div>
          <video src="http://sem.jialilaw.com/sem/video/xuanchuan.mp4" id="player" controls="controls" width="600" height="339" poster="../../../assets/images/lihun/guanyu_video.png" >
          	当前浏览器不支持 video直接播放，点击这里下载视频： <a href="http://sem.jialilaw.com/sem/video/xuanchuan.mp4">下载视频</a>
          </video>
        </div>
        <div class="guanyu_min_r">
          <div class="guanyu_min_r_con">
            <div class="text-left w-full">
				<img class="inline-block" src="../../../assets/images/lihun/yinhao1.png" alt="">
			</div>
			<ul>
				<li>无论何时何地，您都可以享受便捷的线上定制服务。
</li>
				<li>无论您的诉求为何，您只需花费最少的时间、金钱，即可拥有一份个性化专属协议。</li>
				<li>不用担心隐患和风险，我们为您提供最便捷、安全、专业的定制环境。</li>
				<li>相信我们，选择我们，我们始终与您同在。</li>
			</ul>
			<div class="text-right w-full">
				<img class="inline-block" src="../../../assets/images/lihun/yinhao2.png" alt="">
			</div>
          </div>
        </div>
      </div>
      <div class="dingzhi">
        <img @click="goDingZhi" class="cursor-pointer" src="../../../assets/images/lihun/swiper_btn.png" alt="">
      </div>
    </div>
    <div class="qianyue">
      <div class="head_com">
        <h2>家理出品，让您签“约”更放心</h2>
        <span>国内最大的婚姻家事律师事务所</span>
      </div>
      <div class="w quanyue_01 flex justify-between">
        <dl class="w-1/4 mr-4">
          <dt>10+年</dt>
          <dd class="flex items-center justify-center">
            <p class="text-center">团队专注婚姻家事法律服务10+年</p>
          </dd>
        </dl>
        <dl class="w-1/4 mr-4">
          <dt>100+件专业经验</dt>
          <dd>
            <p>家理出庭律师均拥有100+件</br>婚姻家事案件经验</p>
          </dd>
        </dl>
        <dl class="w-1/4 mr-4">
          <dt>20000+咨询</dt>
          <dd>
            <p>每年为近30000人提供了免费的</br>婚姻家事法律咨询</p>
          </dd>
        </dl>
        <dl class="w-1/4">
          <dt>10.3亿元</dt>
		  <dd class="flex items-center justify-center">
		    <p class="text-center">单个案件标的额最高达10.3亿元</p>
		  </dd>
        </dl>
      </div>
      <div class="w qianyue_02">
        <el-carousel :interval="5000" arrow="never" indicator-position="outside" height="254px">
            <el-carousel-item >
              <ul class="flex justify-between">
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
					<div class="pinjia_s">
						<dl>
							<dt>
								<img src="../../../assets/images/lihun/touxiang01.png" alt="">
							</dt>
							<dd>
								<h2>陈女士&nbsp;浙江</h2>
								<span>2020.04.28</span>
							</dd>
						</dl>
					</div>
					<p class="pinjia_p">有很多的不理解的都能在网站的离婚知识中找到解释，填的过程中还有很多注明，很贴心，又全面又专业。</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>吴先生&nbsp;张家口</h2>
                				<span>2020.06.19</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">试着写了一份，跟之前在网上随便下载的模板差别太大了，这里的协议看着就很认真专业，体验很好。</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>张女士&nbsp;邯郸</h2>
                				<span>2020.05.08</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">上手很简单，根据个人情况选内容填就可以了，个性化很强。还能无限修改，下载后直接就可以用，对整个过程都很满意。</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>彭先生&nbsp;石家庄</h2>
                				<span>2020.06.18</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">不用把个人信息告诉其他人，自己写完就能打印出来使用了，感觉特别安全。</p>
                </li>
              </ul>
            </el-carousel-item>
            <el-carousel-item >
              <ul class="flex justify-between">
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>张女士&nbsp;乌鲁木齐</h2>
                				<span>2020.06.19</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">这个系统还挺好用的，我年前就想离婚了，因为疫情也不敢去找律师。现在这个生成后直接就能用。很方便，在家就全搞定。</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
					<div class="pinjia_s">
						<dl>
							<dt>
								<img src="../../../assets/images/lihun/touxiang02.png" alt="">
							</dt>
							<dd>
								<h2>彭先生&nbsp;石家庄</h2>
								<span>2020.06.19</span>
							</dd>
						</dl>
					</div>
					<p class="pinjia_p">家理出品的离婚协议很专业，从开始到最后生成大概用了不到半小时，方便快捷，为智能系统点赞</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>郝先生&nbsp;吉林</h2>
                				<span>2020.05.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">这个文书生成挺好用的，对比了一下自己在网上下载的模板，也不懂该怎么填，这个蛮好的 回答选择问题就好了。</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>张女士&nbsp;北京</h2>
                				<span>2020.04.18</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">协议内容很详细，操作也简单，比自己写的专业多了！不仅完成了协议，还学了很多专业知识，让我少走了很多弯路，太好用了！</p>
                </li>
              </ul>
            </el-carousel-item>
            <el-carousel-item >
              <ul class="flex justify-between">
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>王先生&nbsp;北京</h2>
                				<span>2020.01.20</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">挺好用的，里面的东西也全，能满足我的需求，比自己随便写的安全多了。</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>李先生&nbsp;北京</h2>
                				<span>2020.03.15</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">很专业啊，完全物超所值！这年头专业的离婚协议少说好几千呢，这个又便宜又高质量，可以可以赚到了！</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>孙先生&nbsp;湖北</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">朋友推荐过来的，确实非常好，里面的内容很详细，里面关于离婚谈判技巧的介绍，让我顺利争取到了应得的利益。</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>钱女士&nbsp;北京</h2>
                				<span>2020.04.02</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">页面简洁，操作方便，价格实惠。用这个系统写了离婚协议，半个小时就搞定了，和律师写的没啥差别。良心系统！良心商家！赞！</p>
                </li>
              </ul>
            </el-carousel-item>
          </el-carousel>
      </div>
    </div>
    <div class="liucheng">
      <div class="head_com">
        <h2>使用流程</h2>
        <span>20分钟即可完成专属定制</span>
      </div>
      <div class="w liucheng_min ">
        <img class="inline-block" src="../../../assets/images/lihun/liucheng.png" alt="">
      </div>
      <div class="dingzhi">
        <img @click="goDingZhi" class="cursor-pointer" src="../../../assets/images/lihun/swiper_btn.png" alt="">
      </div>
    </div>
    <!-- 公共底部 -->
	<lihun-bottom></lihun-bottom>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import lihun_bottom from '../../partials/lihun_bottom.vue'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'Home',
  components:{
    'lihun-head':lihun_head,
	'lihun-bottom':lihun_bottom
  },
  data () {
    return{
    }
  },
  mounted () {
  },
  methods: {
	goDingZhi () {
		this.$refs.lihun.goDingZhi(2)
	},
	goMoreKnowledge () {
		this.$router.replace('Knowledge')
	},
	goKnowledgeMin (id) { // 协议书如何谈判
	  this.$router.push({
	    name: 'KnowledgeCon',
	    params: {
	      id: id
	    }
	  })
	},
	getHeadActive (data) {
		localStorage.setItem('topins',data)
	}
  }
}
</script>
<style scoped >
.swiper01{background: url(../../../assets/images/lihun/swiper01_bg.png)no-repeat;}
.w{width: 1200px; margin: 0 auto;}
.swi{padding:50px 0;}
.swiper01_min p{font-size: 25px;color:#02005b;font-weight: bold;}
.swiper01_min h2{font-size:53px;color:#02005b;margin-bottom: 80px;text-align: left;}

.head_com{width: 1200px;margin:0 auto;text-align: center;padding-top:110px;padding-bottom: 83px;}
.head_com h2{font-size:43px;color:#535353;height: 43px;line-height: 43px;}
.head_com span{font-size: 16px;color:#818181;padding:5px 13px;border:1px solid #535353;margin-top: 18px;display: inline-block;}
.wuqu dl {width: 290px;height:282px ;}
.wuqu dl dd{height: 76px;background-color:#91aad2;line-height: 76px;}
.wuqu dl dd p{font-size:18px;width:197px;color: #fff;line-height:30px;margin:0 auto;padding-top: 10px;}
.wuqu dl dd p:hover{text-decoration: underline;}
.moreZhiShi{padding:58px 0 116px}
.moreZhiShi span{width: 194px;height: 46px;border: 1px solid #ff3f68;color: #ff3f68;text-align: center;line-height: 46px;border-radius: 23px;display: inline-block;}
.fuwu{height:713px;width: 100%;background: url(../../../assets/images/lihun/fuwu_bg.png)no-repeat;background-size: 100% 100%;}
.fuwu dl dt h3{font-size: 30px;color:#535353;margin:16px 0 50px}
.fuwu dl dd p{color:#535353;width: 147px;margin:0 auto;font-size: 16px;display: inherit;}
.guanyu_min_r{width: 600px;height: 337px;background: #f2f4f7;position: relative;}
.guanyu_min_r .guanyu_min_r_con{width: 520px;height: 207px;margin:45px auto;font-size:16px;color:#737374;text-align: left;}
.guanyu_min_r_con ul{margin: 20px 0;}
.guanyu_min_r_con ul li{list-style: disc;color:#535353;line-height: 30px;list-style-position: inside;}
.dingzhi{text-align: center;padding:100px 0;}
.dingzhi img{display: inline-block;}
.quanyue_01{padding-bottom: 37px;}
.quanyue_01 dl dt{height: 102px;background-color: #fff;font-size:37px;color: #547ce0;line-height: 102px;text-align: center;}
.quanyue_01 dl dd{height: 82px;background-color:#547ce0;}
.quanyue_01 dl dd p{padding:16px;font-size: 16px;color: #fff;;}
.qianyue{background: url(../../../assets/images/lihun/qianyue.png)no-repeat;background-size: 100% 100%;}
.qianyue_02{padding-bottom: 70px;}
.qianyue_02 ul{height: 254px;}
.qianyue_02 ul li{height: 100%;}
.qianyue_02 ul li img{height: 100%;width: 100%;display: inline-block;}
.bot{background-color: #2c2c2c;padding:23px 0 97px;color:#fff;}
.bot01{display: flex;align-items: center;}
.bot01 span{font-size: 18px;}
.bot02{border-color: #a0a0a0;padding-bottom: 15px;}
.bot02_l h2{padding-top:79px;line-height:47px;font-size: 18px;font-weight: bold;}
.bot02_l p{font-size: 14px;}
.bot03{padding-top: 15px;}
.bot03 p{font-size: 14px;}
.pinjia_s{width: 198px;height: 58px;margin:0 auto}
.pinjia_s dl{display: flex;align-items: center;}
.pinjia_s dl dt {width: 53px;height: 53px;}
.pinjia_s dl dt img{display: inline-block;border-radius: 50%;}
.pinjia_s dl dd{margin-left: 16px;text-align: left;}
.pinjia_s dl dd h2{font-size: 16px;color: #5e5e5e;line-height: 18px;}
.pinjia_s dl dd span{display: inline-block;font-size: 12px;color: #bebebe;line-height: 18px;}
.pinjia_p{margin-top: 14px;line-height: 25px;color: #535353;text-align: left;font-size: 14px;height: 125px;overflow: hidden;}
.pinjia_li{width: 290px;height: 249px;background-color: #fff;}
</style>
