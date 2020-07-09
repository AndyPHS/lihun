<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="py-12">
        <div class="c_m_t">协议书定制帮助</div>
        <div class="flex justify-between items-top mt-12 h-500">
          <div class="c_m_l">
            <!-- <div class="c_m_l_t">
              <span class="ding_btn"><router-link to="CustomAgreement">定制我的协议书</router-link></span>
            </div> -->
            <div class="mt-10">
              <h3 class="text-center text-lg font-bold">协议书帮助</h3>
              <ul class="mt-5">
                <li v-for="(item, index) in fenleiAll" :key="index" class="text-base leading-loose cursor-pointer hover:font-bold text-center">
                  <h2 :class="ins === index?'default_active':'default'" @click="searchList(item, index)">{{ item.title }}</h2>
                  <!-- <ul class="pl-2" v-if="item.data.length>0">
                    <li v-for="($item, $index) in item.data" :key="$index" @click="searchList($item, $index)">{{ $item.title }}</li>
                  </ul> -->
                </li>
              </ul>
            </div>
          </div>
          <div class="c_m_r text-left">
            <div class="m_r_m">
              <ul class="">
                <li v-for="(item, index) in tableData" :key="index"  class="pb-8 border-b cursor-pointer" @click="goKnowledgeMin(item.id)">
                  <div class="py-8 flex justify-between items-center">
                    <h2 class="w-4/5 overflow-hidden hover:underline">{{ item.title }}</h2>
                    <span class="w-1/5 text-right">{{ item.createdTime }}</span>
                  </div>
                  <p>{{ item.description }}</p>
                </li>
              </ul>
			  <el-pagination
				  v-if="!this.tableDataNull"
				  background
				  class="my-10 mt-2 text-center"
				  layout="prev, pager, next"
				  @current-change="startList"
				  :page-size="pagesize"
				  :current-page.sync="currentPage"
				  :total="total">
			  </el-pagination>
			  <div class="errorMin" v-if="this.tableDataNull">
			    <div class="mt-20 text-center mx-auto">
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

      </div>
    </div>
    <div class="live hidden"></div>
	<lihun-bottom></lihun-bottom>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import lihun_bottom from '../../partials/lihun_bottom.vue'
import {selectAction, selectFaIDNews} from '@/api/api/AgreementRequest.js'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'AgreementHelp',
  components: {
    'lihun-head': lihun_head,
	'lihun-bottom': lihun_bottom
  },
  data () {
    return {
	  keyMsg: '', // 关键词搜索
      fenleiAll: [], // 文章分类汇总
      tableData: [], // 分类文章汇总
      firstType: null,  // 初始化分类
      ins: 0,
	  // 分页
	  first_page_url: '',
	  last_page_url: '',
	  next_page_url: '',
	  path: '',
	  from: 1,
	  per_page: null,
	  last_page: null,
	  userList: [],
	  currentPage: 1, // 初始页
	  pagesize: 10, //    每页的数据
	  total: 0, // 总页数
    }
  },
  mounted () {
    this.getWenType()
	localStorage.setItem('topins',2)
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
    getWenType () { // 查询分类
      selectAction().then((data) => {
        this.fenleiAll = data.data[1].data
        if (this.$route.params.id != undefined) {
          this.firstType = this.$route.params.id
        } else {
          this.firstType = this.fenleiAll[0].id
        }
        this.startList()
      })
    },
    startList () { // 初始化页面查找第一个分类下的文章
	  this.tableDataNull = false
      selectFaIDNews({
        status: 1,
        faId: this.firstType,
		page: this.currentPage
      }).then((data) => {
        this.tableData = data.data.data.data
		this.total = data.data.data.total
		if (this.tableData.length == 0 ) {
			this.tableDataNull = true
		}
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		document.documentElement.scrollTop = document.body.scrollTop =0; 
      })
    },
    searchList (item, index) { // 点击分类查找文章
	  if (index ==0){
		  this.goKnowledgeMin (17)
	  } else if (index ==2){
		  this.goKnowledgeMin (45)
	  } else {
		  this.ins = index
		  this.tableDataNull = false
		  selectFaIDNews({
		    status: 1,
		    faId: item.id,
		  		page: this.currentPage
		  }).then((data) => {
		    this.tableData = data.data.data.data
		  		this.total = data.data.data.total
		  		if (this.tableData.length == 0 ) {
		  			this.tableDataNull = true
		  			this.keyMsg = item.title
		  		}
		  })
	  }
    },
	// 初始页currentPage、初始每页数据数pagesize和数据data
	// 上一页
	nextClick () {
	  console.log('下一页')
	  
	},
	prevClick () {
	  console.log('上一页')
	},
	// pagesize (size) {
	//   this.pagesize = size
	// },
	handleCurrentChange (currentPage) {
	  this.currentPage = currentPage// 点击第几页
	}
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;margin-bottom: 39px;}
.c_m_t{margin-left: 239px;text-align: center;font-size: 25px;font-weight: bold;}
.h-500{height: 500px;}
.c_m_l{width: 239px;border-right: 1px solid #eceff4;}
.ding_btn{width: 153px;height: 37px;margin:0 auto;text-align: center;line-height: 37px;border-radius: 18px;font-size: 16px;color: #fff;font-weight: bold;display: inline-block;background-color: #ff3f68;border: 1px solid #ff3f68;}
.c_m_l_t{}
.c_m_r{width: 950px;padding-left: 65px;padding-right: 65px;border-left: none;}
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 22px;color: #6a6a6a;}
.m_r_m ul li span{color: #d1d1d1;font-size: 14px;}
.m_r_m ul li p{font-size: 15px;color: #818181;line-height: 28px;white-space: nowrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.default_active{color:red}
.default{color:#343434;}
/* .errorMin{height: 500px;} */
</style>
