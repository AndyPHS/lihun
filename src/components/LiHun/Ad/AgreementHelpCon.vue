<template>
  <div class="all">
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <div class="c_m w flex justify-between">
      <div class="c_m_l">
        <div class="pt-10">
          <h3 class="text-center text-lg font-bold">协议书帮助</h3>
          <ul class="mt-5">
            <li v-for="(item, index) in fenleiAll" :key="index" class="text-base leading-loose hover:font-bold text-center">
              <h2 :class="ins === item.id?'default_active':'default'" @click="searchList(item, index)">{{ item.title }}</h2>
              <!-- <ul class="pl-2" v-if="item.data.length>0">
                <li v-for="($item, $index) in item.data" :key="$index"  @click="searchList($item)">{{ $item.title }}</li>
              </ul> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="c_m_r text-left pb-10">
        <div class="pt-10 text-center">
          <h2 class="text-center pb-4 text-bold text-25">{{ this.wenCon.title }}</h2>
          <span class="inline-block pb-6 text-14">{{ this.wenCon.time }}</span>
		  <span v-if="this.wenCon.view !=null" class="inline-block pb-6 text-14 ml-4">阅读量 {{ this.wenCon.view }}</span>
		  <span v-if="this.wenCon.view ==null" class="inline-block pb-6 text-14 ml-4">阅读量 1245</span>
        </div>
        <div class="m_r_m pb-5" v-html="wenCon.con"></div>
		<div v-if="dingzhiBtn">
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
import {selectNewsContent, selectAction, addUserNewsLog, stopUserNewsLog} from '@/api/api/AgreementRequest.js' // 查询文章
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'AgreementHelpCon',
  components: {
    'lihun-head': lihun_head,
	'lihun-bottom': lihun_bottom
  },
  data () {
    return {
      fenleiAll: [], // 文章分类汇总
      keyMsg: ''  ,// 关键词搜索
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
  mounted () {
    this.getWenZhangCon()
    this.getWenType()
  },
  methods: {
	  goKnowledgeMin (id) {
	    this.$router.push({
	      name: 'AgreementHelpCon',
	      params: {
	        id: id
	      }
	    })
	    localStorage.setItem('AgreementHelpId',id)
	  },
     getWenZhangCon () { // 查询单独文章
       var Id = localStorage.getItem('AgreementHelpId')
	   if (Id == 45){
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
     getWenType () { // 查询分类
       selectAction().then((data) => {
		 // 获取离婚帮助
         this.fenleiAll = data.data[1].data
       })
     },
     searchList (item, index) { // 点击文章分类跳转到文章列表页
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
		if (index ==0){
			localStorage.setItem('AgreementHelpId',17)
			this.getWenZhangCon ()
		} else if (index ==2){
			localStorage.setItem('AgreementHelpId',45)
			this.getWenZhangCon ()
		} else {
			this.$router.push({
			  name: 'AgreementHelp',
			  params: {
			    id: item.id
			  }
			})
		}
     },
	 goDingZhi () { // 定制按钮
	 	this.$refs.lihun.goDingZhi(2)
	 	if (!!window.ActiveXObject || "ActiveXObject" in window){ 
	 		alert('为了您有更好的体验，建议您使用360浏览器，谷歌浏览器')
	 	} 
	 },
	 getHeadActive (data) {
	 	localStorage.setItem('topins',data)
	 }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_l{width: 239px;padding:150px 0;}
.c_m_r{width: 960px;padding-left: 65px;padding-right: 65px;border-left: 2px solid #eceff4;}
.dingzhi{text-align: center;padding:35px 0;}
.dingzhi img{display: inline-block;}
.shouyedingzhibtn{width: 300px;height: 50px;background-color: #ff3f68;display: flex;align-items: center;border-radius: 25px;justify-content: center}
.shouyedingzhibtn:hover{background-color: #ff6687;cursor: pointer;}
.shouyedingzhibtn span{font-size:24px;margin-left: 10px;}
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.m_r_b{background-color: #f2f4f7;}
.m_r_b_t>div{width: 2px;height: 15px;background-color: #343434;margin-right: 8px;}
.m_r_b_t span{font-size: 15px;}
.text-25{font-size: 25px;color: #535353;}
.text-14{font-size: 14px;color:#c0c0c0;}
.default_active{color:red}
.default{color:#343434;}

.shouyedingzhibtn{width: 300px;height: 50px;background-color: #ff3f68;display: flex;align-items: center;border-radius: 25px;justify-content: center}
.shouyedingzhibtn:hover{background-color: #ff6687;cursor: pointer;}
.shouyedingzhibtn span{font-size:24px;margin-left: 10px;}
</style>
