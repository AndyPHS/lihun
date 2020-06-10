<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="m">
        <h2>
          若您需要定制一份离婚协议，请预先前往支付
        </h2>
        <dl>
          <dt class="py-10">
            <img class="inline-block" src="../../../assets/images/lihun/pay_page.png" alt="">
          </dt>
          <dd class="text-18">
            协议定价<span class="money">￥188</span>
          </dd>
        </dl>
        <div class="m_b">
          <span>返回我的协议列表</span>
          <span @click="goPay">去支付</span>
        </div>
      </div>
    </div>
    <!-- 正在验证 -->
    <el-dialog :visible.sync="dialogYanZheng">
      <div class="yanzheng">
        <img src="../../../assets/images/lihun/pay_yanzheng.png" alt="">
        <h2>正在验证，请稍后……</h2>
      </div>
    </el-dialog>
    <!-- 支付失败 -->
    <el-dialog :visible.sync="dialogFail">
      <div class="yanzheng">
        <img src="../../../assets/images/lihun/pay_fail.png" alt="">
        <h2>支付失败，请重新支付</h2>
      </div>
    </el-dialog>
    <!-- 支付成功 -->
    <el-dialog :visible.sync="dialogSucess">
      <div class="yanzheng">
        <img src="../../../assets/images/lihun/pay_success.png" alt="">
        <h2>支付成功，正在跳转……（{{ Time }}秒）</h2>
      </div>
    </el-dialog>
    <!-- 请确认是否支付 -->
    <el-dialog :visible.sync="dialogQueRen">
      <div class="yanzheng">
        <h2>请确认您是否已经支付</h2>
        <div class="m_b">
          <span @click="cancleQueRen">取消</span>
          <span @click="alreadyPay">我已支付，立即定制</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'Pay',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      dialogYanZheng: false, // 验证
      dialogFail: false, // 失败
      dialogSucess: false,  // 成功
      Time: 5,
      dialogQueRen: false  // 确认是否支付

    }
  },
  mounted () {

  },
  methods: {
    goPay () {
      // this.dialogYanZheng = true
      // this.dialogFail = true
      // this.dialogSucess = true
      // this.Timer()
      this.dialogQueRen = true
    },
    Timer () {
      setInterval(()=>{
        this.countDown()
      }, 1000)
    },
    countDown () {
      var that = this
      if (that.Time === 0 ) {
        this.dialogSucess = false
        this.Time = 5
        clearInterval(this.Timer())
      } else {
        that.Time = that.Time - 1
      }
    },
    cancleQueRen () {
      this.dialogQueRen = false
    },
    alreadyPay () {
      this.dialogQueRen = false
      this.$router.replace('/MyConsult')
    }
  }
}
</script>
<style scoped >
  .text-18{font-size: 18px;color: #343434;}
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.m{width: 530px;margin:0 auto;padding-top:58px;padding-bottom: 124px;}
.m h2{font-size: 25px;font-weight: bold;}
.money{font-size: 40px;display: inline-block;color: #ff3f68;}
.m_b{display: flex;justify-content: space-around;margin-top:70px;}
.m_b span{width: 191px;height: 38px;text-align: center;line-height: 38px;border: 1px solid #343434;cursor: pointer;border-radius: 19px;color: #343434;font-size:18px;}
.m_b span:last-of-type{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;}
.yanzheng{padding:5px 0 50px}
.yanzheng img{display: inline-block;margin-bottom: 50px;}
.yanzheng h2{font-size: 18px;text-align: center;}
</style>
