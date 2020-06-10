<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="pb-12">
        <div class="c_m_t">协议书定制帮助</div>
        <div class="sheng_min">
          <h2>一、注册声明</h2>
          <p>（一）请您在注册成为家文用户前务必仔细阅读本协议，若您不同意本协议的任意内容，或者无法准确理解家文对条款的解释，请不要进行后续操作；若您注册成为家文用户，则表示您对本协议的全部内容已充分阅读并认可和同意遵守。同时，承诺遵守中国法律、法规、规章及其他政府规范性文件的规定，如有违反而造成任何法律后果，您将以本人名义独立承担所有相应的法律责任。</p>
          <p>（二）本协议内容包括以下条款及已经发布的或将来可能发布的各类规则。所有规则为本协议不可分割的一部分，与协议正文具有同等法律效力。家文有权根据需要不定时地制定、修改本协议或各类规则，如本协议及规则有任何变更，一切变更以本网站最新公布的内容为准。经修订的协议、规则一经公布，立即自动生效，对新协议、规则生效之后注册的用户发生法律效力。对于协议、规则生效之前注册的用户，若用户在新规则生效后继续使用本网站提供的各项服务，则表明用户已充分阅读并认可和同意遵守新的协议或规则。若您拒绝接受新的协议和规则，您必须放弃使用家文提供的各项服务（包括但不限于使用用户名和密码登录家文、在家文上进行电子合同签约、证据托管等）。
</p>
          <p>三）您使用家文即表示您同意家文将您的个人身份信息或企业信息及其签署的合同、其个人或企业的电子签名认证信息传输至公司合作的第三方认证机构以及司法鉴定机构，且前述信息保存至数字证书失效后5年，且该等信息不因您的账户锁定或注销而停止保存。</p>
          <h2>二、定义及解释</h2>
          <p>（一）家文账户</p>
          <p>指您通过注册获得家文账号以供您使用家文各项服务的账户。</p>
        </div>
      </div>
    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'

// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'AgreementHelp',
  components: {
    'lihun-head': lihun_head
  },
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
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: 100vh;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_t{font-size: 25px;line-height: 110px;width: 100%;border-bottom: 1px solid #f2f4f7;}
.sheng_min{padding:0 73px;}
.sheng_min h2{font-size: 15px;text-align: left;text-indent: 2em;font-weight: bold;line-height: 77px;}
.sheng_min p{font-size: 15px;margin-bottom: 39px;text-indent: 2em;text-align: left;}
</style>
