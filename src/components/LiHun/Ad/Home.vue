<template>
  <div>
    <lihun-head ref="lihun"></lihun-head>
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
            <p>2018年的一天，一位当事人通过朋友辗转联系，千里迢迢来到北京，上门委托我们起诉。她风尘仆仆、面容憔悴的样子与其他客户迥然不同。我们得知，她来自南方的一个三线城市，由于找寻专业婚姻律师未果，才四处打听，找到了我们。 </p>
            <p>如此周折的起因是一份离婚协议，她和前夫离婚前，在网上找了一份据说“结构清晰、条文丰富”的离婚协议模板。经过仔细修改，不料仍在离婚后发生了房产纠纷。当事人是一个普通公司职员，收入不高，只有一套房子是她今后安身立命的资产。通过她提供的离婚协议，我们发现其中条款杂乱冗长，重要约定模棱两可。我们十分同情她的遭遇，想尽各种方法与对方协商谈判；耗时几个月来回奔波，只为尽全力搜集更多有利于当事人的证据。最终我们成功帮她赢回了应得的房产。所有的煎熬焦虑，其中的奔走艰辛，一切的努力付出，得到了回报。然而，当事人不仅花费了大量金钱和时间，还因此丢掉了工作，代价着实惨重。</p>
			<p>我们受理过很多起类似这样的离婚后财产纠纷案件，理解当事人想尽快离婚的心情，但离婚协议涉及的权利义务十分复杂，现有网上的离婚协议大多都是模板，并不能完全契合当事人的实际情况，很多当事人因专业受限而忽略了协议中的风险隐患，最终被一堆麻烦缠身。我们希望发挥自己所长，尽自己所能，在网上开辟一块小天地，引导协议双方在线起草、签订离婚协议，减少他们的后顾之忧，助他们开启崭新人生。基于此，我们汇集丰富、专业的起草经验，将每一份离婚协议抽丝剥茧、重新组合，运用智能技术形成了离婚协议自动生成系统——家文。</p>
			<p>无论何时何地，您都可以享受便捷的线上定制服务。</p>
			<p>无论您的诉求为何，您只需花费最少的时间、金钱，即可拥有一份个性化专属协议。</p>
            <p>不用担心隐患和风险，我们为您提供最便捷、安全、专业的定制环境。</p>
			<p>相信我们，选择我们，我们始终与您同在。</p>
			
          </div>
		  <div class="luo">
		    <span class="blu"></span>
		    <h5>北京家理律师事务所</h5>
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
								<h2>王女士&nbsp;北京</h2>
								<span>2020.04.28</span>
							</dd>
						</dl>
					</div>
					<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
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
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
					<div class="pinjia_s">
						<dl>
							<dt>
								<img src="../../../assets/images/lihun/touxiang02.png" alt="">
							</dt>
							<dd>
								<h2>王女士&nbsp;北京</h2>
								<span>2020.04.28</span>
							</dd>
						</dl>
					</div>
					<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
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
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
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
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li mr-4 px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang01.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
                </li>
                <li class="w-1/4 pinjia_li px-8 py-8">
                	<div class="pinjia_s">
                		<dl>
                			<dt>
                				<img src="../../../assets/images/lihun/touxiang02.png" alt="">
                			</dt>
                			<dd>
                				<h2>王女士&nbsp;北京</h2>
                				<span>2020.04.28</span>
                			</dd>
                		</dl>
                	</div>
                	<p class="pinjia_p">家理始终坚持将细节做到极致，始终以工匠品质办案。家理团队精心研究大量文书案例</p>
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
    <div class="bot">
      <div class="w">
        <div class="bot01 text-left text-white">
          <span class="cursor-pointer"><router-link to="/">首页</router-link></span>
          <el-divider class="mx-5" direction="vertical"></el-divider>
          <span class="cursor-pointer"> <router-link to="Knowledge">离婚知识</router-link></span>
          <el-divider class="mx-5" direction="vertical"></el-divider>
          <span @click="goDingZhi(2)" class="cursor-pointer">定制我的离婚协议书</span>
          <el-divider class="mx-5" direction="vertical"></el-divider>
          <span class="cursor-pointer"><a href="http://www.jialilaw.com/" target="_blank">家理律所官网</a></span>
        </div>
        <div class="bot02 border-b-2 flex justify-between  items-end">
          <div class="w-1/3 text-left text-white bot02_l">
            <h2>联系我们</h2>
            <p>电话：400-8989-818    &nbsp;  时间：周一至周六 09:00-18:00 </p>
            <p>地址：北京市朝阳区建国门外大街22号赛特大厦3层</p>
          </div>
          <dl class="w-1/5 text-white">
            <dd>
              <img class="inline-block" src="../../../assets/images/lihun/weichat.png" alt="">
            </dd>
            <dt>
              <h2 class="mt-2">扫码关注</h2>
              <p class="text-sm">蜗牛说家事</p>
            </dt>
          </dl>
        </div>
        <div class="bot03 text-left text-white">
          <p>友情链接：<a href="http://www.jialilaw.com/" target="_blank">北京家理律师事务所</a></p>
          <p>©2017 北京家理律师事务所      备案号：京ICP备14011260号-2      京公网安备：11010502037274号</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'

// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'Home',
  components:{
    'lihun-head':lihun_head
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
.moreZhiShi{padding:58px 0 116px}
.moreZhiShi span{width: 194px;height: 46px;border: 1px solid #ff3f68;color: #ff3f68;text-align: center;line-height: 46px;border-radius: 23px;display: inline-block;}
.fuwu{height:713px;width: 100%;background: url(../../../assets/images/lihun/fuwu_bg.png)no-repeat;background-size: 100% 100%;}
.fuwu dl dt h3{font-size: 30px;color:#535353;margin:16px 0 50px}
.fuwu dl dd p{color:#535353;width: 147px;margin:0 auto;font-size: 16px;display: inherit;}
.guanyu_min_r{width: 600px;height: 337px;background: #f2f4f7;position: relative;}
.guanyu_min_r .guanyu_min_r_con{width: 510px;height: 207px;margin:45px auto;font-size:16px;color:#737374;text-align: left;overflow-y: scroll;}
.guanyu_min_r .guanyu_min_r_con p{text-indent: 2em;margin-bottom: 5px;}
.luo{position: absolute;bottom: 25px;right: 45px;text-align: right;}
.luo .blu{width: 80px;height: 3px;background:darkblue;display: inline-block;}
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
.pinjia_s{width: 168px;height: 58px;margin:0 auto}
.pinjia_s dl{display: flex;align-items: center;}
.pinjia_s dl dt img{display: inline-block;}
.pinjia_s dl dd{margin-left: 16px;text-align: left;}
.pinjia_s dl dd h2{font-size: 16px;color: #5e5e5e;line-height: 18px;}
.pinjia_s dl dd span{display: inline-block;font-size: 12px;color: #bebebe;line-height: 18px;}
.pinjia_p{margin-top: 34px;line-height: 25px;color: #535353;text-align: left;}
.pinjia_li{width: 290px;height: 249px;background-color: #fff;}
</style>
