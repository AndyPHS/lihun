<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="py-12">
        <div class="c_m_t">协议书定制帮助</div>
        <div class="flex justify-between items-center mt-12">
          <div class="c_m_l">
            <div class="c_m_l_t">
              <span class="ding_btn"><router-link to="CustomAgreement">定制我的协议书</router-link></span>
            </div>
            <div class="mt-10">
              <h3 class="text-center text-lg font-bold">帮助分类</h3>
              <ul class="mt-5 pl-10">
                <li v-for="(item, index) in fenleiAll" :key="index" class="text-base leading-loose text-left">
                  <h2 :class="ins === index?'default_active':'default'" @click="searchList(item, index)">{{ item.title }}</h2>
                  <ul class="pl-2" v-if="item.data.length>0">
                    <li v-for="($item, $index) in item.data" :key="$index" @click="searchList($item, $index)">{{ $item.title }}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="c_m_r text-left">
            <div class="m_r_m">
              <ul class="">
                <li v-for="(item, index) in tableData" :key="index"  class="pb-8 border-b cursor-pointer" @click="goKnowledgeMin(item.id)">
                  <div class="py-8 flex justify-between items-center">
                    <h2 class="w-4/5 overflow-hidden">{{ item.title }}</h2>
                    <span class="w-1/5 text-right">{{ item.createdTime }}</span>
                  </div>
                  <p>{{ item.description }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import {selectAction, selectFaIDNews} from '@/api/api/AgreementRequest.js'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'AgreementHelp',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      fenleiAll: [], // 文章分类汇总
      tableData: [], // 分类文章汇总
      firstType: null,  // 初始化分类
      ins: 0
    }
  },
  mounted () {
    this.getWenType()
  },
  methods: {
    goKnowledgeMin (id) {
      this.$router.push({
        name: 'KnowledgeCon',
        params: {
          id: id
        }
      })
    },
    getWenType () { // 查询分类
      selectAction().then((data) => {
        this.fenleiAll = data.data
        if (this.$route.params.id != undefined) {
          this.firstType = this.$route.params.id
        } else {
          this.firstType = this.fenleiAll[0].id
        }
        this.startList()
      })
    },
    startList () { // 初始化页面查找第一个分类下的文章
      selectFaIDNews({
        status: 1,
        faId: this.firstType
      }).then((data) => {
        this.tableData = data.data.data
      })
    },
    searchList (item, index) { // 点击分类查找文章
      this.ins = index
      selectFaIDNews({
        status: 1,
        faId: item.id
      }).then((data) => {
        this.tableData = data.data.data
      })
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: 100vh;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_t{margin-left: 239px;text-align: center;font-size: 25px;font-weight: bold;}
.c_m_l{width: 239px;border-right: 1px solid #eceff4;}
.ding_btn{width: 153px;height: 37px;margin:0 auto;text-align: center;line-height: 37px;border-radius: 18px;font-size: 16px;color: #fff;font-weight: bold;display: inline-block;background-color: #ff3f68;border: 1px solid #ff3f68;}
.c_m_l_t{}
.c_m_r{width: 950px;padding-left: 65px;padding-right: 65px;}
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.default_active{color:red}
.default{color:#343434;}
</style>
