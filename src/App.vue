<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  data() {
	  return{
		  // isRouterAlive: true                    //控制视图是否显示的变量
	  }
  },
  methods: {
	  
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
