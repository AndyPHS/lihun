<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
	  return {
		  reload: this.reload
	  }
  },
  data() {
	  return{
		  isRouterAlive: true                    //控制视图是否显示的变量
	  }
  },
  methods: {
	  _isMobile() {
	  	 let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	  	 return flag;
	  },
	  reload () {
		  this.isRouterAlive = false
		  this.$nextTick(function(){
			  this.isRouterAlive = true
		  })
	  }
  },
  mounted () {
	  if (this._isMobile()) {
		this.$router.replace('/m/mhome');
	  }
  }
}
</script>

<style>

@import "./common/css/app.css";

@import "./common/css/tailwindcss.css";
@import "./common/font/font.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* font-family: '微软雅黑'; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
