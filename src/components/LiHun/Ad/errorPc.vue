<template>
  <div>
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
	<div class="min py-10 w flex justify-around items-center">
		<div class="min_left">
			<h2 class="text-left font-weight text-2xl">哎呀！</h2>
			<h2 class="text-left font-weight py-3 text-2xl">页面找不到了！！</h2>
			<p class="text-left mb-3 text-lg">可能原因有：</p>
			<p class="text-left text-lg">页面不存在或者是网站正在维护或出现了程序问题</p>
		</div>
		<div class="min_rigth">
			<img src="../../../assets/images/lihun/404pc.png" alt="">
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
  name: 'errorPc',
  components:{
    'lihun-head':lihun_head,
	'lihun-bottom':lihun_bottom
  },
  data () {
    return{
    }
  },
  beforeMount() {
  	localStorage.setItem('topins',0)
  },
  mounted () {
	  localStorage.setItem('topins',0)
  },
  methods: {
	goDingZhi () {
		this.$refs.lihun.goDingZhi(2)
		if (!!window.ActiveXObject || "ActiveXObject" in window){ 
			alert('为了您有更好的体验，建议您使用360浏览器，谷歌浏览器')
		} 
	},
	goMoreKnowledge () {
		localStorage.setItem('topins',1)
		this.$router.replace('Knowledge')
	},
	goKnowledgeMin (id) { // 协议书如何谈判
	  localStorage.setItem('topins',1)
	  this.$router.push({
	    name: 'KnowledgeCon',
	    params: {
	      id: id
	    }
	  })
	  localStorage.setItem('KnowledgeId',id)
	},
	getHeadActive (data) {
		localStorage.setItem('topins',data)
	},
	goAgreementHelpMin (id) { // 产品故事
	  localStorage.setItem('topins',2)
	  const {href} = this.$router.resolve({
	  	path: 'AgreementHelpCon',
	  	params: {
	  	  id: id,
	  	}
	  })
	  window.open(href, '_blank')
	  localStorage.setItem('AgreementHelpId',id)
	},
  }
}
</script>
<style scoped >
.w{width: 1000px; margin: 0 auto;}

</style>
