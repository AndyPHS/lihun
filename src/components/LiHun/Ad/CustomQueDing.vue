<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="c_m_h flex justify-between items-center px-12">
        <h2>
          定制我的协议书
        </h2>
        <div class="c_m_h_r">
          <span><router-link to="AgreementHelp">协议书定制帮助</router-link></span>
        </div>
      </div>
      <div class="c_m_m mx-auto">
        <div>
          <el-form >
            <div class="ml-5">
              <div class="text-lg text-left my-2">根据您填写的信息，您与配偶生育有{{ this.ChuShiMsg.child }}个子女，需要处理的夫妻共同财产有<span class="inline" v-if="this.ChuShiMsg.house">房产、</span><span class="inline" v-if="this.ChuShiMsg.car">车子、</span><span class="inline" v-if="this.ChuShiMsg.money">存款、</span><span class="inline" v-if="this.ChuShiMsg.liCai">理财、</span><span class="inline" v-if="this.ChuShiMsg.jiaDian">家具家电</span>以及<span class="inline" v-if="this.ChuShiMsg.zhaiQuan">债权</span><span class="inline" v-if="this.ChuShiMsg.zhaiWu">债务</span>。为了更高效地为您定制专属协议，建议您在填写前先准备好下列材料：</div>
              <div>
                <div class="w-full mx-auto py-10">
                  <ul class="px-10 flex flex-wrap">
                    <li class="w-1/3 text-left pl-12 lis_red" v-for="(item, index) in this.ChuShiMsgArr" :key="index">{{index+1}}、{{ item.title }}</li>
                  </ul>
                </div>
              </div>
              <div class="text-lg clear-both text-left py-2">
                协议定制共有基本信息、婚姻状况、子女信息、财产信息、债权债务信息五个板块，预计耗时20分钟，请您安排好时间。
              </div>
            </div>
          </el-form>
          <div class="my-8">
            <div class="w-40 mx-auto">
              <div class="dingzhi" @click="NextPage">
                开始定制
              </div>
            </div>
          </div>
          <div class="flex justify-between flex-wrap pt-10">
            <div class="w-1/2 text-left mb-8 px-4">
              <div class="w-full mb-2">示例一（结婚证）：</div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/jiehunzheng01.png" alt="结婚证图片">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4">
              <div class="w-full mb-2">
                示例二（身份证）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/idcard.png" alt="身份证示例图">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4">
              <div class="w-full mb-2">
                示例三（户口本）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/hukouben01.png" alt="户口本图片">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4">
              <div class="w-full mb-2">
                示例四（银行账户）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/yinhangzhanghu01.png" alt="银行账户">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4">
              <div class="w-full mb-2">
                示例五（存折）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/cunzhe01.png" alt="存折">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.house">
              <div class="w-full mb-2">
                示例六（房产证）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/fangchanzheng01.jpg" alt="房产证">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.house">
              <div class="w-full mb-2">
                示例七（房屋买卖合同）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/fangwumaimaihetong01.png" alt="房屋买卖合同">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.liCai">
              <div class="w-full mb-2">
                示例八（理财协议）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/licaixieyi01.jpg" alt="理财协议">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.car">
              <div class="w-full mb-2">
                示例九（机动车登记证）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/jidongchedengjizheng01.jpg" alt="机动车登记证">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.car">
              <div class="w-full mb-2">
                示例十（机动车行驶证）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/jidongchexingshizheng01.jpg" alt="机动车行驶证">
              </div>
            </div>
            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.baoXian">
              <div class="w-full mb-2">
                示例十一（保险合同）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/baoxian01.jpg" alt="保险合同">
              </div>
            </div>

            <div class="w-1/2 text-left mb-8 px-4" v-if="this.ChuShiMsg.child !=='' ">
              <div class="w-full mb-2">
                示例十二（孩子出生证明）：
              </div>
              <div class="shili_img">
                <img src="@/assets/images/lihun/haizichushengzhengming01.jpg" alt="孩子出生证明">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import {getOnlyValue} from '@/api/api/AgreementRequest.js'    // 获取单独问题的值
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'CustomQueDing',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      ChuShiMsgArr: [
        {
          title: '结婚证（示例一）',
          img: ''
        },
        {
          title: '身份证（示例二）',
          img: ''
        },
        {
          title: '户口本（示例三）',
          img: ''
        },
        {
          title: '银行账户（示例四）',
          img: ''
        },
        {
          title: '存折（示例五）',
          img: ''
        }
      ],
      ChuShiMsg:{
        child: '',
        house: false,
        car: false,
        money: false,
        baoXian: false,
        liCai: false,
        jiaDian: false,
        zhaiQuan: false,
        zhaiWu: false
      }
    }
  },
  mounted () {
    this.getMsg(); // 获取初始页面的信息
  },
  methods: {
    getId (index) {
      return 'box_' + index
    },
    getMsg () {
      getOnlyValue({
        qpid: 520, // 关联id
        quid: Number(localStorage.getItem('quid')) //用户的问卷id
      }).then((data)=>{

        let getmodel = JSON.parse(data.data.data)
        getmodel.forEach((item)=>{
          if(item==1){
            this.ChuShiMsg.house = true
            this.ChuShiMsgArr.push({
                title: '房产证（示例六）',
                img: ''
             })
            this.ChuShiMsgArr.push({
                title: '房屋买卖合同（示例七）',
                img: ''
             })
          }else if(item==2){
            this.ChuShiMsg.money = true
          }else if(item==3){
            this.ChuShiMsgArr.push({
                title: '理财协议（示例八）',
                img: ''
             })
            this.ChuShiMsg.liCai = true
          }else if(item==4){
            this.ChuShiMsgArr.push({
                title: '机动车登记证（示例九）',
                img: ''
             })
            this.ChuShiMsgArr.push({
                title: '机动车行驶证（示例十）',
                img: ''
             })
            this.ChuShiMsg.car = true
          }else if(item==5){
            this.ChuShiMsg.jiaDian = true
          }else if(item==6){
            this.ChuShiMsg.baoXian = true
            this.ChuShiMsgArr.push({
                title: '保险合同（示例十一）',
                img: ''
             })
          }
        })

      }).catch((data)=>{

      })
      getOnlyValue({
        qpid: 654, // 关联id
        quid: Number(localStorage.getItem('quid')) //用户的问卷id
      }).then((data)=>{
        let getmodel = JSON.parse(data.data.data)
        getmodel.forEach((item)=>{
          if(item==1){
             this.ChuShiMsg.zhaiQuan = true
          }else if(item==2){
             this.ChuShiMsg.zhaiWu = true
          }
        })
      }).catch((data)=>{

      })
      getOnlyValue({
        qpid: 518, // 关联id
        quid: Number(localStorage.getItem('quid')) //用户的问卷id
      }).then((data)=>{
        if(data.data.data ==1){
          this.ChuShiMsg.child = '一'
        }else if(data.data.data ==2){
          this.ChuShiMsg.child = '二'
        }else if(data.data.data ==3){
          this.ChuShiMsg.child = '三'
        }else if(data.data.data ==4){
          this.ChuShiMsg.child = '四'
        }else if(data.data.data ==5){
          this.ChuShiMsg.child = '五'
        }else if(data.data.data ==6){
          this.ChuShiMsg.child = '六'
        }else if(data.data.data ==7){
          this.ChuShiMsg.child = '七'
        }
        if(data.data.data !== ''){
           this.ChuShiMsgArr.push({
              title: '孩子出生证明（示例十二）',
              img: ''
           })
        }
      }).catch((data)=>{

      })
    },
    NextPage () {
      this.$router.replace("/CustomBasic");
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;}
.c_m_h{height:109px;border-bottom: 2px solid #f2f4f7;margin-top: 39px;}
.c_m_h h2{width:243px;font-size: 25px;color:#535353;font-weight: bold;}
.c_m_h_r{width:542px;text-align: right;}
.c_m_h_r span{display: inline-block;width: 151px;height: 35px;border:1px solid #535353;text-align: center;line-height: 35px;border-radius: 18px;font-size:16px;color:#535353;font-weight: bold;}
.c_m_h_r span:hover{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;cursor:pointer}
.toubu{height: 150px}
.c_m_m{padding:40px 100px;}
.lis_red{color:#ff5375;}
.dingzhi{width: 193px;height: 40px;line-height: 40px;background-color:#ff5375;color:#fff;border-radius: 20px;font-size: 18px;cursor: pointer;text-align: center;}
.shili_img{width:490px;height: 320px;margin: 0 auto;}
</style>
