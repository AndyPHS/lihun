<template>
  <div>
    <div class="bot">
      <div class="w">
        <div class="bot02 flex justify-between items-center">
          <div class="bot03 text-left text-white">
			  <p>©2017 北京家理律师事务所      备案号：<a href="https://beian.miit.gov.cn">京ICP备14011260号-4</a></p>
			</div>
          <dl class="w-1/5 text-white flex items-center">
            <dd>
              <img class="inline-block weichat" src="../../assets/images/lihun/weichat.png" alt="">
            </dd>
            <dt class="ml-5">
              <h2 class="mt-2">扫码关注</h2>
              <p class="text-sm">蜗牛小助手</p>
            </dt>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {addUser, phoneCode, frontLogin, verifyCode, updatePasswordPhone, usersSelect} from '@/api/api/AgreementRequest.js'

export default {
  name: 'lihun_bottom_com',
  data () {
    return {
	  
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>
  .bot{background-color: #2c2c2c;padding:23px 0 23px;color:#fff;}
  /* .bot02{border-color: #a0a0a0;padding-bottom: 15px;} */
  .bot02_l h2{padding-top:40px;line-height:47px;font-size: 18px;font-weight: bold;}
  .bot02_l p{font-size: 14px;}
  .bot03{padding-left: 54px;}
  .bot03 p{font-size: 14px;}
  .w{width: 1200px; margin: 0 auto;}
  .weichat{width: 70px;height: 70px;}
</style>
