webpackJsonp([29],{"+PBt":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=l("rb8n"),i=l("A+nQ"),a={components:{HeadMenu:s.a},data:()=>({pageInfo:[{id:"",title:"",type:""}],titleSearchMsg:"",list:{title:"问题名称",type:"问题类型",control:"操作"},user:{title:"",type:"",re:"",status:"",imgs:[]},add_answer:[{status:"",label:""}],treeId:null,treeList:[],treeTitle:"",dataFilterValueArr:[],selectVagueValueArr:[],whereThead:{title:"标题",tiaojian:"条件",value:"值",control:"操作"},whereItemConfig:{relationId:null,type:null,value:null},TiaoJianList:[{title:"等于",value:"1"},{title:"小于",value:"2"},{title:"大于",value:"3"},{title:"大于等于",value:"4"},{title:"小于等于",value:"5"},{title:"不等于",value:"6"},{title:"包含",value:"7"}],whereType:{1:"等于",2:"小于",3:"大于",4:"小于等于",5:"大于等于",6:"不等于",7:"包含"},defaultProps:{children:"child",label:"title"},problemId:null,nodeChild:null,problemqAdd:{questionnaireId:localStorage.getItem("qid"),problemId:null,problemTitle:"",problemType:null,orderId:null,description:"",fqaspId:null,important:null,id:null,type:null,class:null,title:"",where:[{problemId:null,type:"",value:null}]},selectQpWhereList:[],problemType:{},problemRe:{},UserRole:[],chooseUserRole:[],selectOnlyLisg:[],min:"",dialogFormVisible:!1,dialogQuestionAdd:!1,dialogQuestionConfig:!1,dialogQuestionConfigUpdate:!1,dialogaddTreeTitle:!1,dialogConfigTreeTitle:!1,formLabelWidth:"80px",first_page_url:"",last_page_url:"",next_page_url:"",path:"",from:1,per_page:null,last_page:null,userList:[],currentPage:1,pagesize:20,area:"",pageNum:1}),mounted(){this.handleQuestionList(),this.QuestionArrOk(),this.selectTree(),this.selectOnlyQuestion()},methods:{handleQuestionList(){Object(i.J)({page:this.currentPage}).then(e=>{this.pageInfo=e.data.data.data,this.min=e.data.data}).catch(e=>{})},encodeSearchParams(e){const t=[];return Object.keys(e).forEach(l=>{let s=e[l];void 0===s?s="":"[object Object]"===Object.prototype.toString.call(e[l])?Object.keys(e[l]).forEach(s=>{t.push([s,encodeURIComponent(e[l][s])].join("="))}):Array.isArray(e[l])?t.push(l+"=["+e[l]+"]"):t.push([l,encodeURIComponent(s)].join("="))}),t.join("&")},titleSearch(){Object(i.K)("title="+this.titleSearchMsg).then(e=>{this.pageInfo=e.data.data.data,this.min=e.data.data,this.total=e.data.total}).catch(e=>{console.log(e)})},QuestionArrOk(){Object(i.c)().then(e=>{this.problemType=e.data.data.problemType,this.problemRe=e.data.data.problemRe})},bangdingQuestion(e){localStorage.setItem("pid",e),Object(i.S)({questionnaireId:localStorage.getItem("qid"),problemId:this.problemqAdd.problemId,orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.fqaspId,important:this.problemqAdd.important,type:this.problemqAdd.type,class:this.problemqAdd.class,title:this.problemqAdd.title}).then(e=>{}).catch(e=>{}),this.selectOnlyQuestion()},add_answer_btn(){this.add_answer.push({status:"",label:""})},addWhere(){Object(i.f)({relationId:this.whereItemConfig.relationId,type:this.whereItemConfig.type,value:this.whereItemConfig.value}).then(e=>{this.whereItemConfig.relationId="",this.whereItemConfig.type="",this.whereItemConfig.value="",this.selectQpWhere()}).catch(e=>{})},deleteWhere(e){localStorage.setItem("qpWhereId",e),Object(i.q)().then(e=>{this.selectQpWhere(),this.$message({type:"success",message:"删除成功!"})}).catch(e=>{})},selectTree(){Object(i.L)().then(e=>{this.treeList=e.data.data.data,this.treeTitle=e.data.data.title}).catch(e=>{console.log("请求失败")})},handleTreeJieDian(){this.problemqAdd.type=this.$refs.tree.currentNode.node.data.type,this.problemqAdd.problemId=this.$refs.tree.currentNode.node.data.problemId,this.problemqAdd.problemTitle=this.$refs.tree.currentNode.node.data.problemTitle,this.problemqAdd.problemType=this.$refs.tree.currentNode.node.data.problemType,this.problemqAdd.important=this.$refs.tree.currentNode.node.data.important,this.problemqAdd.id=this.$refs.tree.currentNode.node.data.id,this.problemqAdd.fqaspId=this.$refs.tree.currentNode.node.data.fqaspId,this.problemqAdd.orderId=this.$refs.tree.currentNode.node.data.orderId,this.nodeChild=this.$refs.tree.currentNode.node.data.child,this.problemqAdd.title=this.$refs.tree.currentNode.node.data.title,this.problemqAdd.description=this.$refs.tree.currentNode.node.data.description},getCheckedNodes(){console.log(this.$refs.tree.getCheckedNodes())},getCheckedKeys(){console.log(this.$refs.tree.getCheckedKeys())},setCheckedNodes(){this.$refs.tree.setCheckedNodes([{id:5,label:"二级 2-1"},{id:9,label:"三级 1-1-1"}])},setCheckedKeys(){this.$refs.tree.setCheckedKeys([3])},resetChecked(){this.$refs.tree.setCheckedKeys([])},addTreeTitle(){this.problemqAdd.title="",this.problemqAdd.orderId=null,this.dialogaddTreeTitle=!0},addTreeTitleOk(){null==this.problemqAdd.id?Object(i.b)({questionnaireId:localStorage.getItem("qid"),orderId:0,fqaspId:0,class:this.problemqAdd.class,type:1,title:this.problemqAdd.title}).then(e=>{this.problemqAdd.orderId=null,this.problemqAdd.title="",this.problemqAdd.class="",this.dialogaddTreeTitle=!1,this.selectTree()}).catch(e=>{}):Object(i.b)({questionnaireId:localStorage.getItem("qid"),orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.id,class:this.problemqAdd.class,type:1,title:this.problemqAdd.title}).then(e=>{this.problemqAdd.title="",this.problemqAdd.class="",this.dialogaddTreeTitle=!1,this.selectTree()}).catch(e=>{})},configTreeTitleOk(){Object(i.S)({questionnaireId:localStorage.getItem("qid"),problemId:this.problemqAdd.problemId,orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.fqaspId,important:this.problemqAdd.important,type:this.problemqAdd.type,class:this.problemqAdd.class,title:this.problemqAdd.title}).then(e=>{this.problemqAdd.title="",this.problemqAdd.class="",this.problemqAdd.type="",this.problemqAdd.orderId=null,this.problemqAdd.important=null,localStorage.removeItem("qpid"),this.dialogConfigTreeTitle=!1,this.selectTree()}).catch(e=>{})},updateTree(){localStorage.setItem("qpid",this.problemqAdd.id),1==this.problemqAdd.type?this.dialogConfigTreeTitle=!0:(this.dialogQuestionConfigUpdate=!0,this.selectQpWhere(),localStorage.setItem("pid",this.problemqAdd.problemId),this.selectOnlyQuestion(),this.dataFilterValueArr=[{title:this.problemqAdd.problemTitle,id:this.problemqAdd.problemId}])},deletedTree(){this.$confirm("此操作将删除该问题, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{Object(i.p)(this.problemqAdd.id).then(e=>{this.selectTree(),this.$message({type:"success",message:"删除成功!"})}).catch(e=>{this.$message({type:"info",message:"有子集无法删除"})}),this.problemqAdd.id=null}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},delete_answer_btn(e){this.add_answer.splice(e,1)},dbclickQuestion(e){this.dialogQuestionConfig=!0,localStorage.setItem("pid",e),this.problemqAdd.problemId=e,this.selectOnlyQuestion()},selectOnlyQuestion(){Object(i.H)().then(e=>{this.selectOnlyLisg=e.data.child,this.problemqAdd.problemType=e.data[0].type}).catch(e=>{})},selectQpWhere(){Object(i.I)().then(e=>{this.selectQpWhereList=e.data.data}).catch(e=>{})},addQuestionConfig(){6==this.problemqAdd.type||7==this.problemqAdd.type||8==this.problemqAdd.type||9==this.problemqAdd.type?Object(i.b)({questionnaireId:localStorage.getItem("qid"),problemId:this.problemqAdd.problemId,orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.id,important:this.problemqAdd.important,type:this.problemqAdd.type,class:this.problemqAdd.class,title:this.problemqAdd.title,description:this.problemqAdd.description}).then(e=>{this.problemqAdd.title="",this.problemqAdd.class="",this.problemqAdd.type="",this.problemqAdd.orderId=null,this.problemqAdd.important=null,this.problemqAdd.description="",localStorage.setItem("qpid",e.data.data),localStorage.removeItem("qpid"),this.dialogQuestionConfig=!1,this.selectTree()}).catch(e=>{}):Object(i.b)({questionnaireId:localStorage.getItem("qid"),problemId:this.problemqAdd.problemId,orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.id,important:this.problemqAdd.important,type:this.problemqAdd.type,class:this.problemqAdd.class,title:this.problemqAdd.title,description:this.problemqAdd.description}).then(e=>{this.dialogQuestionConfig=!1,this.problemqAdd.title="",this.problemqAdd.class="",this.problemqAdd.type="",this.problemqAdd.orderId=null,this.problemqAdd.important=null,this.problemqAdd.description="",this.selectTree()}).catch(e=>{})},addQuestionConfigUpdate(){6==this.problemqAdd.type||7==this.problemqAdd.type||8==this.problemqAdd.type||9==this.problemqAdd.type?Object(i.S)({questionnaireId:localStorage.getItem("qid"),problemId:this.problemqAdd.problemId,orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.fqaspId,important:this.problemqAdd.important,type:this.problemqAdd.type,class:this.problemqAdd.class,title:this.problemqAdd.title,description:this.problemqAdd.description}).then(e=>{this.problemqAdd.title="",this.problemqAdd.class="",this.problemqAdd.type="",this.problemqAdd.orderId=null,this.problemqAdd.important=null,this.problemqAdd.description="",localStorage.removeItem("qpid"),this.dialogQuestionConfigUpdate=!1,this.selectTree()}).catch(e=>{}):Object(i.S)({questionnaireId:localStorage.getItem("qid"),problemId:this.problemqAdd.problemId,orderId:this.problemqAdd.orderId,fqaspId:this.problemqAdd.fqaspId,important:this.problemqAdd.important,type:this.problemqAdd.type,class:this.problemqAdd.class,title:this.problemqAdd.title,description:this.problemqAdd.description}).then(e=>{this.dialogQuestionConfigUpdate=!1,this.problemqAdd.title="",this.problemqAdd.class="",this.problemqAdd.type="",this.problemqAdd.orderId=null,this.problemqAdd.important=null,this.problemqAdd.description="",this.selectTree()}).catch(e=>{})},dataFilter(e){Object(i.K)("title="+e).then(e=>{this.dataFilterValueArr=e.data.data.data}).catch(e=>{})},select_vague(e){Object(i.P)("title="+e).then(e=>{this.selectVagueValueArr=e.data}).catch(e=>{})},handleSizeChange(e){this.pagesize=e},handleCurrentChange(e){this.currentPage=e},handleQuestionAdd(){this.user.title="",this.user.type="",this.user.status="",this.dialogQuestionAdd=!0},addNewQuestion(){Object(i.g)({title:this.user.title,type:this.user.type,re:this.user.re,status:this.user.status}).then(e=>{this.user.title="",this.user.type="",this.user.re="",this.user.status="",this.handleQuestionList(),localStorage.setItem("pid",e.data.data),this.add_answer.forEach(e=>{Object(i.d)({status:1,label:e.label}).then(e=>{console.log("添加成功")})}),this.dialogQuestionAdd=!1}).catch(e=>{})},handleCheckedCitiesChange(e){this.chooseUserRole=e},updataQuestionMsg(){1==this.user.type&&Object(i.T)({title:this.user.title,type:this.user.type,re:this.user.re,status:this.user.status}).then(e=>{this.user.title="",this.user.type="",this.user.re="",this.user.status="",localStorage.removeItem("pid"),this.handleQuestionList(),this.dialogFormVisible=!1}),6==this.user.type||7==this.user.type||8==this.user.type||9==this.user.type?Object(i.T)({title:this.user.title,type:this.user.type,status:this.user.status}).then(e=>{this.user.title="",this.user.type="",this.user.status="",this.add_answer.forEach(e=>{Object(i.d)({status:1,label:e.label}).then(e=>{console.log("添加成功")})}),localStorage.removeItem("pid"),this.handleQuestionList(),this.dialogFormVisible=!1}):Object(i.T)({title:this.user.title,type:this.user.type,status:this.user.status}).then(e=>{this.user.title="",this.user.type="",this.user.status="",localStorage.removeItem("pid"),this.handleQuestionList(),this.dialogFormVisible=!1})},deleteQuestion(e){this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{Object(i.r)(e).then(e=>{this.handleQuestionList()}),this.$message({type:"success",message:"删除成功!"})}).catch(()=>{this.$message({type:"info",message:"已取消删除"})})},handleDrop(e,t,l,s){console.log(e,t,l,s),this.$confirm("此操作将移动该模块位置, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{Object(i.R)({qpid:e.data.id,fqaspId:t.data.fqaspId}).then(e=>{this.$message({type:"success",message:"排序成功!"}),this.selectTree()}).catch(e=>{this.$message({type:"error",message:"排序失败!"})})}).catch(()=>{this.$message({type:"info",message:"已取消移动"})})},handleRemove(e,t){console.log(e,t)},handlePreview(e){console.log(e)},handleExceed(e,t){this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${e.length} 个文件，共选择了 ${e.length+t.length} 个文件`)},beforeRemove(e,t){return this.$confirm(`确定移除 ${e.name}？`)}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("head-menu"),e._v(" "),l("div",{staticClass:"container mx-auto flex"},[l("div",{staticClass:"w-1/2"},[l("div",{staticClass:"border border-1 rounded"},[l("h2",{staticClass:"text-xl py-2 cursor-pointer",on:{click:function(t){return e.addTreeTitle()}}},[e._v(e._s(e.treeTitle))]),e._v(" "),l("div",{staticClass:"h-40 overflow-scroll"},[l("el-tree",{ref:"tree",attrs:{data:e.treeList,"default-expand-all":"","node-key":"id","empty-text":"加载中，请稍后！","highlight-current":"",props:e.defaultProps,draggable:!0},on:{"node-click":function(t){return e.handleTreeJieDian()},"node-drop":e.handleDrop}})],1),e._v(" "),l("div",{staticClass:"w-2/3 text-left flex justify-around py-3"},[l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.addTreeTitle}},[e._v("新增")]),e._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.updateTree}},[e._v("修改")]),e._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.deletedTree}},[e._v("删除")])],1)])]),e._v(" "),l("div",{staticClass:"w-1/2 mx-2"},[l("div",{staticClass:"w-full"},[l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.handleQuestionAdd}},[e._v("新增问题")])],1),e._v(" "),l("div",{staticClass:"py-2 text-lg relative my-2"},[l("el-form",{staticClass:"flex justify-around"},[l("el-form-item",{staticClass:"mb-0",attrs:{label:"搜索","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-2/3",attrs:{autocomplete:"off",placeholder:"请输入问题名称"},model:{value:e.titleSearchMsg,callback:function(t){e.titleSearchMsg=t},expression:"titleSearchMsg"}})],1),e._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:e.titleSearch}},[e._v("搜索问题")])],1)],1),e._v(" "),l("div",{staticClass:"py-2 text-lg relative"},[e._v("问题列表")]),e._v(" "),l("div",{staticClass:"text-center question_list"},[l("table",{staticClass:"w-full"},[l("thead",[l("tr",e._l(e.list,function(t){return l("td",{key:t.index,staticClass:"headstyle w-1/6 text-center border text-black font-bold py-2"},[e._v(e._s(t))])}),0)]),e._v(" "),l("tbody",e._l(e.pageInfo,function(t,s){return l("tr",{key:s},[l("td",{staticClass:"border text-black hover:cursor-pointer"},[e._v(e._s(t.title))]),e._v(" "),l("td",{staticClass:"border text-black"},[e._v(e._s(e.problemType[t.type]))]),e._v(" "),l("td",{staticClass:"border text-black justify-around"},[l("div",{staticClass:"flex justify-around py-1 w-2/3 mx-auto"},[l("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(l){return e.dbclickQuestion(t.id)}}},[e._v("添加")])],1)])])}),0)])]),e._v(" "),l("el-pagination",{staticClass:"my-10",attrs:{background:"",layout:"prev, pager, next","page-size":e.pagesize,"current-page":e.currentPage,total:this.min.total},on:{"current-change":e.handleQuestionList,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1)]),e._v(" "),l("el-dialog",{attrs:{title:"新增问题",visible:e.dialogQuestionAdd},on:{"update:visible":function(t){e.dialogQuestionAdd=t}}},[l("el-form",{attrs:{model:e.user}},[l("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.user.title,callback:function(t){e.$set(e.user,"title",t)},expression:"user.title"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"选择问题类型"},model:{value:e.user.type,callback:function(t){e.$set(e.user,"type",t)},expression:"user.type"}},e._l(e.problemType,function(e,t){return l("el-option",{key:t,attrs:{label:e,value:t}})}),1)],1),e._v(" "),1==e.user.type?l("el-form-item",{attrs:{label:"验证类型","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"选择输入类型"},model:{value:e.user.re,callback:function(t){e.$set(e.user,"re",t)},expression:"user.re"}},e._l(e.problemRe,function(e,t){return l("el-option",{key:t,attrs:{label:e,value:t}})}),1)],1):e._e(),e._v(" "),e._l(e.add_answer,function(t,s){return 6==e.user.type||7==e.user.type||8==e.user.type||9==e.user.type?l("div",{key:s,staticClass:"flex justify-between "},[l("el-form-item",{attrs:{label:"选项名称","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:t.label,callback:function(l){e.$set(t,"label",l)},expression:"item.label"}})],1),e._v(" "),l("div",[l("el-button",{on:{click:e.add_answer_btn}},[e._v("添加")]),e._v(" "),l("el-button",{on:{click:function(t){return e.delete_answer_btn(s)}}},[e._v("删除")])],1)],1):e._e()}),e._v(" "),l("el-form-item",{attrs:{label:"是否禁用","label-width":e.formLabelWidth}},[l("el-radio-group",{model:{value:e.user.status,callback:function(t){e.$set(e.user,"status",t)},expression:"user.status"}},[l("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),l("el-radio",{attrs:{label:2}},[e._v("否")])],1)],1)],2),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogQuestionAdd=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addNewQuestion}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改问题",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{attrs:{model:e.user}},[l("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.user.title,callback:function(t){e.$set(e.user,"title",t)},expression:"user.title"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"选择问题类型"},model:{value:e.user.type,callback:function(t){e.$set(e.user,"type",t)},expression:"user.type"}},e._l(e.problemType,function(t,s){return l("el-option",{key:s,attrs:{label:t,value:s}},[e._v(e._s(t))])}),1)],1),e._v(" "),1==e.user.type?l("el-form-item",{attrs:{label:"验证类型","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"选择输入类型"},model:{value:e.user.re,callback:function(t){e.$set(e.user,"re",t)},expression:"user.re"}},e._l(e.problemRe,function(t,s){return l("el-option",{key:s,attrs:{label:t,value:s}},[e._v(e._s(t))])}),1)],1):e._e(),e._v(" "),e._l(e.add_answer,function(t,s){return 6==e.user.type||7==e.user.type||8==e.user.type||9==e.user.type?l("div",{key:s,staticClass:"flex justify-between"},[l("el-form-item",{attrs:{label:"选项名称","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:t.label,callback:function(l){e.$set(t,"label",l)},expression:"item.label"}})],1),e._v(" "),l("div",[l("el-button",{on:{click:e.add_answer_btn}},[e._v("添加")]),e._v(" "),l("el-button",{on:{click:function(t){return e.delete_answer_btn(s)}}},[e._v("删除")])],1)],1):e._e()}),e._v(" "),l("el-form-item",{attrs:{label:"是否禁用","label-width":e.formLabelWidth}},[l("el-radio-group",{model:{value:e.user.status,callback:function(t){e.$set(e.user,"status",t)},expression:"user.status"}},[l("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),l("el-radio",{attrs:{label:2}},[e._v("否")])],1)],1)],2),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.updataQuestionMsg}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"问题配置",visible:e.dialogQuestionConfig},on:{"update:visible":function(t){e.dialogQuestionConfig=t}}},[l("el-form",{attrs:{model:e.problemqAdd}},[l("el-form-item",{staticClass:"mb-1",attrs:{label:"标题","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.title,callback:function(t){e.$set(e.problemqAdd,"title",t)},expression:"problemqAdd.title"}})],1),e._v(" "),l("div",[l("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[l("el-radio-group",{model:{value:e.problemqAdd.type,callback:function(t){e.$set(e.problemqAdd,"type",t)},expression:"problemqAdd.type"}},[l("el-radio",{attrs:{label:2}},[e._v("不可重复")]),e._v(" "),l("el-radio",{attrs:{label:3}},[e._v("可重复")])],1)],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{type:"number",autocomplete:"off"},model:{value:e.problemqAdd.orderId,callback:function(t){e.$set(e.problemqAdd,"orderId",t)},expression:"problemqAdd.orderId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"Class","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.class,callback:function(t){e.$set(e.problemqAdd,"class",t)},expression:"problemqAdd.class"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"是否必填","label-width":e.formLabelWidth}},[l("el-radio-group",{model:{value:e.problemqAdd.important,callback:function(t){e.$set(e.problemqAdd,"important",t)},expression:"problemqAdd.important"}},[l("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),l("el-radio",{attrs:{label:2}},[e._v("否")])],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"小贴士","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{type:"textarea",rows:3,autocomplete:"off"},model:{value:e.problemqAdd.description,callback:function(t){e.$set(e.problemqAdd,"description",t)},expression:"problemqAdd.description"}})],1),e._v(" "),6==e.problemqAdd.type||7==e.problemqAdd.type||8==e.problemqAdd.type||9==e.problemqAdd.type?l("div",[l("div",{staticClass:"relative wenti"},[l("span",{staticClass:"h-1"}),e._v(" "),l("span",{staticClass:"px-2 py-2 border absolute left-0 top-0 z-10 bg-white"},[e._v("问题关系配置")])]),e._v(" "),l("div",{staticClass:"clear-both"}),e._v(" "),l("div",[l("el-form-item",{attrs:{label:"绑定的值","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"选择绑定的值"},model:{value:e.whereItemConfig.value,callback:function(t){e.$set(e.whereItemConfig,"value",t)},expression:"whereItemConfig.value"}},e._l(e.selectOnlyLisg,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"问题","label-width":e.formLabelWidth}},[l("el-select",{attrs:{filterable:"","filter-method":e.select_vague,placeholder:"请选择"},model:{value:e.whereItemConfig.relationId,callback:function(t){e.$set(e.whereItemConfig,"relationId",t)},expression:"whereItemConfig.relationId"}},e._l(e.selectVagueValueArr,function(e){return l("el-option",{key:e.id,attrs:{label:e.qpTitle,value:e.id}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"条件","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.whereItemConfig.type,callback:function(t){e.$set(e.whereItemConfig,"type",t)},expression:"whereItemConfig.type"}},e._l(e.TiaoJianList,function(e){return l("el-option",{key:e.value,attrs:{label:e.title,value:e.value}})}),1)],1),e._v(" "),l("div",{staticClass:"my-2"},[l("el-button",{on:{click:e.addWhere}},[e._v("添加关系")])],1)],1),e._v(" "),l("div",[l("table",{staticClass:"w-full"},[l("thead",[l("tr",e._l(e.whereThead,function(t){return l("td",{key:t.index,staticClass:"headstyle w-1/6 text-center border text-black font-bold py-2"},[e._v(e._s(t))])}),0)]),e._v(" "),l("tbody",e._l(e.selectQpWhereList,function(t,s){return l("tr",{key:s},[l("td",{staticClass:"border text-black hover:cursor-pointer"},[e._v(e._s(t.title))]),e._v(" "),l("td",{staticClass:"border text-black"},[e._v(e._s(e.whereType[t.qrtype]))]),e._v(" "),l("td",{staticClass:"border text-black"},[e._v(e._s(t.label))]),e._v(" "),l("td",{staticClass:"border text-black justify-around"},[l("div",{staticClass:"flex justify-around py-2 w-2/3 mx-auto"},[l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(l){return e.deleteWhere(t.qpWhereId)}}},[e._v("删除")])],1)])])}),0)])])]):e._e()],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogQuestionConfig=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addQuestionConfig}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改配置",visible:e.dialogQuestionConfigUpdate},on:{"update:visible":function(t){e.dialogQuestionConfigUpdate=t}}},[l("el-form",{attrs:{model:e.problemqAdd}},[l("el-form-item",{staticClass:"mb-1",attrs:{label:"标题","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.title,callback:function(t){e.$set(e.problemqAdd,"title",t)},expression:"problemqAdd.title"}})],1),e._v(" "),l("div",[l("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[l("el-radio-group",{model:{value:e.problemqAdd.type,callback:function(t){e.$set(e.problemqAdd,"type",t)},expression:"problemqAdd.type"}},[l("el-radio",{attrs:{label:2}},[e._v("不可重复")]),e._v(" "),l("el-radio",{attrs:{label:3}},[e._v("可重复")])],1)],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{type:"number",autocomplete:"off"},model:{value:e.problemqAdd.orderId,callback:function(t){e.$set(e.problemqAdd,"orderId",t)},expression:"problemqAdd.orderId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"Class","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.class,callback:function(t){e.$set(e.problemqAdd,"class",t)},expression:"problemqAdd.class"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"是否必填","label-width":e.formLabelWidth}},[l("el-radio-group",{model:{value:e.problemqAdd.important,callback:function(t){e.$set(e.problemqAdd,"important",t)},expression:"problemqAdd.important"}},[l("el-radio",{attrs:{label:1}},[e._v("是")]),e._v(" "),l("el-radio",{attrs:{label:2}},[e._v("否")])],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"小贴士","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{type:"textarea",rows:3,autocomplete:"off"},model:{value:e.problemqAdd.description,callback:function(t){e.$set(e.problemqAdd,"description",t)},expression:"problemqAdd.description"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"绑定问题","label-width":e.formLabelWidth}},[l("el-select",{attrs:{filterable:"","filter-method":e.dataFilter,placeholder:"请选择"},on:{change:function(t){return e.bangdingQuestion(e.problemqAdd.problemId)}},model:{value:e.problemqAdd.problemId,callback:function(t){e.$set(e.problemqAdd,"problemId",t)},expression:"problemqAdd.problemId"}},e._l(e.dataFilterValueArr,function(e){return l("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})}),1)],1),e._v(" "),6==e.problemqAdd.problemType||7==e.problemqAdd.problemType||8==e.problemqAdd.problemType||9==e.problemqAdd.problemType?l("div",[l("div",{staticClass:"relative wenti"},[l("span",{staticClass:"h-1"}),e._v(" "),l("span",{staticClass:"px-2 py-2 border absolute left-0 top-0 z-10 bg-white"},[e._v("问题关系配置")])]),e._v(" "),l("div",{staticClass:"clear-both"}),e._v(" "),l("div",[l("el-form-item",{attrs:{label:"绑定的值","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"选择绑定的值"},model:{value:e.whereItemConfig.value,callback:function(t){e.$set(e.whereItemConfig,"value",t)},expression:"whereItemConfig.value"}},e._l(e.selectOnlyLisg,function(e,t){return l("el-option",{key:t,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"问题","label-width":e.formLabelWidth}},[l("el-select",{attrs:{filterable:"","filter-method":e.select_vague,placeholder:"请选择"},model:{value:e.whereItemConfig.relationId,callback:function(t){e.$set(e.whereItemConfig,"relationId",t)},expression:"whereItemConfig.relationId"}},e._l(e.selectVagueValueArr,function(e){return l("el-option",{key:e.id,attrs:{label:e.qpTitle,value:e.id}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"条件","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:"请选择"},model:{value:e.whereItemConfig.type,callback:function(t){e.$set(e.whereItemConfig,"type",t)},expression:"whereItemConfig.type"}},e._l(e.TiaoJianList,function(e){return l("el-option",{key:e.value,attrs:{label:e.title,value:e.value}})}),1)],1),e._v(" "),l("div",{staticClass:"my-2"},[l("el-button",{on:{click:e.addWhere}},[e._v("添加关系")])],1)],1),e._v(" "),l("div",[l("table",{staticClass:"w-full"},[l("thead",[l("tr",e._l(e.whereThead,function(t){return l("td",{key:t.index,staticClass:"headstyle w-1/6 text-center border text-black font-bold py-2"},[e._v(e._s(t))])}),0)]),e._v(" "),l("tbody",e._l(e.selectQpWhereList,function(t,s){return l("tr",{key:s},[l("td",{staticClass:"border text-black hover:cursor-pointer"},[e._v(e._s(t.title))]),e._v(" "),l("td",{staticClass:"border text-black"},[e._v(e._s(e.whereType[t.qrtype]))]),e._v(" "),l("td",{staticClass:"border text-black"},[e._v(e._s(t.label))]),e._v(" "),l("td",{staticClass:"border text-black justify-around"},[l("div",{staticClass:"flex justify-around py-2 w-2/3 mx-auto"},[l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(l){return e.deleteWhere(t.qpWhereId)}}},[e._v("删除")])],1)])])}),0)])])]):e._e()],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogQuestionConfigUpdate=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addQuestionConfigUpdate}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"添加标题",visible:e.dialogaddTreeTitle},on:{"update:visible":function(t){e.dialogaddTreeTitle=t}}},[l("el-form",{attrs:{model:e.problemqAdd}},[l("el-form-item",{attrs:{label:"标题","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.title,callback:function(t){e.$set(e.problemqAdd,"title",t)},expression:"problemqAdd.title"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{type:"number",autocomplete:"off"},model:{value:e.problemqAdd.orderId,callback:function(t){e.$set(e.problemqAdd,"orderId",t)},expression:"problemqAdd.orderId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"class","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.class,callback:function(t){e.$set(e.problemqAdd,"class",t)},expression:"problemqAdd.class"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogaddTreeTitle=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.addTreeTitleOk}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改标题",visible:e.dialogConfigTreeTitle},on:{"update:visible":function(t){e.dialogConfigTreeTitle=t}}},[l("el-form",{attrs:{model:e.problemqAdd}},[l("el-form-item",{attrs:{label:"标题","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.title,callback:function(t){e.$set(e.problemqAdd,"title",t)},expression:"problemqAdd.title"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{type:"number",autocomplete:"off"},model:{value:e.problemqAdd.orderId,callback:function(t){e.$set(e.problemqAdd,"orderId",t)},expression:"problemqAdd.orderId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"class","label-width":e.formLabelWidth}},[l("el-input",{staticClass:"w-1/2",attrs:{autocomplete:"off"},model:{value:e.problemqAdd.class,callback:function(t){e.$set(e.problemqAdd,"class",t)},expression:"problemqAdd.class"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogConfigTreeTitle=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.configTreeTitleOk}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]};var o=l("VU/8")(a,r,!1,function(e){l("jZCy")},"data-v-270292aa",null);t.default=o.exports},jZCy:function(e,t){}});
//# sourceMappingURL=29.02ce6c8a84d63f89296b.js.map