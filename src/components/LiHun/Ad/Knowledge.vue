<template>
  <div class="all">
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <div class="c_m w flex justify-between" name="top">
      <div class="c_m_l">
        <div class="">
          <h3 class="text-22 text-center font-bold">离婚知识</h3>
          <ul class="mt-5 px-16 text-center ml-3 zhishiul">
            <li v-for="(item, index) in fenleiAll" :key="index" class="text-base mb-3 leading-loose text-left">
              <h2 :class="ins === item.id?'default_active':'default'">{{ item.title }}</h2>
              <ul class="" v-if="item.data.length>0">
                <li v-for="($item, $index) in item.data" :key="$index" class="text-base cursor-pointer hover:font-bold leading-loose text-left">
					<h2 :class="ins === $item.id?'default_active':'default_erji'"  @click="searchList($item, $index)">{{ $item.title }}</h2>
				</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="c_m_r text-left">
		
        <div class="border-b pb-10 pt-16">
          <div action="" class="keyinput flex justify-between items-center">
            <input class="ml-3" v-model="keyMsg" type="text" placeholder="请输入要搜索的内容关键词" autocomplete="off" @keyup.enter="searchAction">
            <img @click="searchAction" class="cursor-pointer" src="../../../assets/images/lihun/searchM_icon.png" alt="">
          </div>
          <ul class="c_m_r_t flex pt-3">
            <li class="w-1/5 text-left hover:font-bold ml-3 underline cursor-pointer" @click="goKnowledgeMin(20)">协议书如何谈判</li>
            <li class="w-1/5 text-left hover:font-bold ml-3 underline cursor-pointer" @click="goKnowledgeMin(21)">离婚协议常见误区</li>
            <li class="w-1/5 text-left hover:font-bold ml-3 underline cursor-pointer" @click="goKnowledgeMin(25)">离婚方式与选择</li>
          </ul>
        </div>
        <div class="m_r_m">
          <ul v-if="!this.tableDataNull" class="min_l">
            <li v-for="(item, index) in tableData" :key="index"  class="pb-6 border-b cursor-pointer" @click="goKnowledgeMin(item.id)">
              <div class="pt-6 pb-4 flex justify-between items-center">
                <h2 class="w-4/5 overflow-hidden hover:underline" v-html="item.title"></h2>
				<span class="w-1/8 text-sm mr-3 text-left font-thin">帮助&nbsp;<span>{{ item.view }}</span><span v-if="item.view==null ">1254</span> 人</span>
                <!-- <span class="w-1/5 text-right">{{ item.createdTime }}</span> -->
				<span v-if="item.description==undefined" class="w-1/5 text-right">{{ item.createdTime }}</span>
				 
              </div>
              <p v-if="item.content==undefined" v-html="item.description"></p>
			  <p v-if="item.content !==undefined" v-html="item.content"></p>
            </li>
          </ul>
		  <el-pagination
			  v-if="!this.tableDataNull"
			  background
			  href="#top"
			  class="my-10 text-center"
			  layout="prev, pager, next"
			  @current-change="startList"
			  :page-size="pagesize"
			  :current-page.sync="currentPage"
			  :total="total">
		  </el-pagination>
          <div class="errorMin" v-if="this.tableDataNull">
            <div class="pt-40 text-center mx-auto">
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
	<!-- 共用底部 -->
	<lihun-bottom></lihun-bottom>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import lihun_bottom from '../../partials/lihun_bottom.vue'
import {selectAction, selectFaIDNews, selectOsNews, addUserNewsLog, stopUserNewsLog} from '@/api/api/AgreementRequest.js'
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'Knowledge',
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
      ins: -1,
	  tableDataNull: false, // 无文章
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
	this.getIns()
  },
  methods: {
	getIns () {
		if (this.$route.params.ins === undefined ) {
			this.ins =0
		} else {
			this.ins = this.$route.params.ins
		}
	},
    goKnowledgeMin (id) {
	  var keyword
	  if( this.keyMsg ==''){
		  keyword = '/'
	  } else {
		  keyword = this.keyMsg
	  }
	  var isLogin = localStorage.getItem('token')
	  if (isLogin !== undefined){
	  	addUserNewsLog({
		  key_word: keyword,
		  newsId: id,
		  type: 3
	  	}).then((data) => {
		  localStorage.setItem('unlId',data.data.data)
	  	})
	  }
      this.$router.push({
        path: `/KnowledgeCon/${id}`,
      })
	  localStorage.setItem('KnowledgeId',id)
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
	  this.tableDataNull = false
      selectFaIDNews({
        status: 1,
        faId: 18,
		page: this.currentPage
      }).then((data) => {
		  if(data.data.status_code ==200){
			  this.tableData = data.data.data.data
			  this.total = data.data.data.total
			  if (this.tableData.length == 0 ) {
			  	this.tableDataNull = true
			  }
			   var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
				document.documentElement.scrollTop = document.body.scrollTop =0; 
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
	  this.ins = item.id
	  this.tableDataNull = false
	  var isLogin = localStorage.getItem('token')
	  if (isLogin !== undefined){
		  addUserNewsLog({
			  key_word: item.title,
			  type: 2
		  }).then((data) => {
		  		  // console.log('搜索栏目')
		  })
	  }
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
    },
    searchAction () {
		if(this.keyMsg ==''){
			this.$message.error('请输入关键词')
		} else {
			selectOsNews({title:this.keyMsg}).then((data) => {
				if ( data.data.status_code ==200 ) {
					this.tableData = data.data.data
					this.ins = null
					this.tableDataNull = false
					if (this.tableData.length == 0 ) {
						this.tableDataNull = true
					}
				} else {
					this.$message.error('查询失败，请重新尝试')
				}
			})
			var isLogin = localStorage.getItem('token')
			if (isLogin !== undefined) {
				addUserNewsLog({
					key_word: this.keyMsg,
					type: 1
				}).then((data) => {
					// console.log('关键词搜索文章')
				})
			}
		}
    },
	getHeadActive (data) {
		localStorage.setItem('topins',data)
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
<style scoped>
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;margin-top: 39px;}
.c_m_l{width: 239px;padding:75px 0;}
.c_m_r{width: 960px;padding-left: 65px;padding-right: 65px;border-left: 2px solid #eceff4;}
.keyinput{width: 680px;height: 34px;border:1px solid #c9c9c9;line-height: 34px;font-size: 16px;color:#535353;margin: 0 auto;border-radius: 17px;}
.keyinput input{height: 32px;line-height: 34px;width: 626px;border:none;}
.keyinput input:focus{border:none;outline: none;}
.keyinput img{display: inline-block;margin-right: 15px;}
.c_m_r_t{width: 680px;margin:0 auto;}
.c_m_r_t li{font-size: 14px;color:#818181}
.m_r_m ul li{border-color: #eceff4;}
.m_r_m ul li h2{font-size: 18px;color: #6a6a6a;font-weight: bold;}
.m_r_m ul li h2 em{color:red;margin-right: 3px;}
.m_r_m ul li span{font-size: 12px;width: 80px;}
.m_r_m ul li p{font-size: 14px;color: #818181;line-height: 28px;white-space: pre-wrap;text-indent: 2em;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;}
.m_r_m ul li p em{color:red;margin:0 3px;}
.default_active{color:red}
.default{color:#343434;}
.default_erji{color: #818181;font-size: 15px;}
.errorMin{height: 500px;}
/* .min_l{height: 500px;overflow-y: scroll;} */
::-webkit-scrollbar {
	width:1px;
	background-color: #FFF;
}
.text-22{font-size: 22px;}
/* .zhishiul{padding-left: 56px;} */
</style>
