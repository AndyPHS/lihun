<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w flex justify-between">
      <div class="c_m_l">
        <div class="pt-10">
          <h3 class="text-center text-lg font-bold">离婚知识</h3>
          <ul class="mt-5">
            <li v-for="(item, index) in fenleiAll" :key="index" class="text-base leading-loose text-center">
              <h2 :class="ins === index?'default_active':'default'" @click="searchList(item, index)">{{ item.title }}</h2>
              <!-- <ul class="pl-2" v-if="item.data.length>0">
                <li v-for="($item, $index) in item.data" :key="$index" @click="searchList($item, $index)">{{ $item.title }}</li>
              </ul> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="c_m_r text-left">
        <div class="border-b pb-10 pt-16">
          <div action="" class="keyinput flex justify-between items-center">
            <input class="ml-3" v-model="keyMsg" type="text" placeholder="请输入要搜索的内容关键词" autocomplete="off" >
            <img @click="searchAction" class="cursor-pointer" src="../../../assets/images/lihun/searchM_icon.png" alt="">
          </div>
          <ul class="c_m_r_t flex pt-3">
            <li class="w-1/3 text-left hover:underline cursor-pointer">2020年婚姻法最新规定</li>
            <li class="w-1/3 text-left hover:underline cursor-pointer">女方争取抚养权的技巧</li>
            <li class="w-1/3 text-left hover:underline cursor-pointer">男方争取抚养权的技巧</li>
          </ul>
        </div>
        <div class="m_r_m">
          <ul class="">
            <li v-for="(item, index) in tableData" :key="index"  class="pb-8 border-b cursor-pointer" @click="goKnowledgeMin(item.id)">
              <div class="py-8 flex justify-between items-center">
                <h2 class="w-4/5 overflow-hidden hover:underline" v-html="item.title"></h2>
                <span class="w-1/5 text-right">{{ item.createdTime }}</span>
              </div>
              <p v-if="item.content==undefined" v-html="item.description"></p>
			  <p v-if="item.content !==undefined" v-html="item.content"></p>
            </li>
          </ul>
          <div class="" v-if="this.tableDataNull">
            <div class="pt-12 text-center mx-auto">
              <img class="inline-block" src="../../../assets/images/lihun/no_consult_icon.png" alt="">
              <p class="text-center text-sm pt-5">
                共找到<span class="text-red-400 font-bold">0条</span> 与 <span class="text-red-400 font-bold">"{{ keyMsg }}"</span> 相关的内容</br>
                可尝试更换不同的关键词重新进行搜索
              </p>
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
import {selectAction, selectFaIDNews, selectOsNews} from '@/api/api/AgreementRequest.js'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'Knowledge',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      keyMsg: '', // 关键词搜索
      fenleiAll: [], // 文章分类汇总
      tableData: [], // 分类文章汇总
      firstType: null,  // 初始化分类
      ins: 0,
	  tableDataNull: false // 无文章
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
        this.fenleiAll = data.data[0].data
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
		  if(data.data.status_code ==200){
			  this.tableData = data.data.data
			  if (this.tableData.length == 0 ) {
			  	this.tableDataNull = true
			  }
		  } else if (data.data.status_code == 401) {
			  localStorage.removeItem('token') // 存储token
			  localStorage.removeItem('phone')
			  localStorage.removeItem('isLogin')
			  this.$message.error('账号过期，请重新登录')
			  this.$router.replace('/')
		  }
      })
    },
    searchList (item, index) { // 点击分类查找文章
      this.ins = index
      selectFaIDNews({
        status: 1,
        faId: item.id
      }).then((data) => {
        this.tableData = data.data.data
		if (this.tableData.length == 0 ) {
			this.tableDataNull = true
			this.keyMsg = item.title
		}
      })
    },
    searchAction () {
		selectOsNews({title:this.keyMsg}).then((data) => {
			if ( data.data.status_code ==200 ) {
				this.tableData = data.data.data
				this.ins = null
				if (this.tableData.length == 0 ) {
					this.tableDataNull = true
				}
			} else {
				this.$message.error('查询失败，请重新尝试')
			}
		})
    }
  }
}
</script>
<style>
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_l{width: 239px;padding:150px 0;}
.c_m_r{width: 960px;padding-left: 65px;padding-right: 65px;border-left: 2px solid #eceff4;}
.keyinput{width: 680px;height: 34px;border:1px solid #c9c9c9;line-height: 34px;font-size: 16px;color:#535353;margin: 0 auto;border-radius: 17px;}
.keyinput input{height: 32px;line-height: 34px;width: 626px;border:none;}
.keyinput input:focus{border:none;outline: none;}
.keyinput img{display: inline-block;margin-right: 15px;}
.c_m_r_t{width: 680px;margin:0 auto;}
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li h2 em{color:red;margin-right: 3px;}
.m_r_m ul li span{font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.m_r_m ul li p em{color:red;margin:0 3px;}
.default_active{color:red}
.default{color:#343434;}
</style>
