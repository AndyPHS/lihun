webpackJsonp([18],{"44DC":function(t,e){},rJ9E:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={name:"UE",data:()=>({editor:null}),props:{defaultMsg:{type:String},config:{type:Object},id:{type:String}},mounted(){const t=this;this.editor=UE.getEditor(this.id,this.config),this.editor.addListener("ready",function(){t.editor.setContent(t.defaultMsg)}),console.log("上传这堆错误不用理会，上传接口需自行开发配置")},methods:{getUEContent(){return this.editor.getContent()},getUEContentTxt(){return this.editor.getContentTxt()},setUEContent(t){return this.editor.setContent(t)}},destroyed(){this.editor.destroy()}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("script",{attrs:{id:this.id,type:"text/plain"}})])},staticRenderFns:[]},l=r("VU/8")(i,s,!1,null,null,null).exports,a=r("eFNP"),o={components:{UE:l},name:"ArticleUpload",data:()=>({SetKesDept:{value:"id",label:"title",children:"data",checkStrictly:!0},activeIndex:"1",defaultMsg:"",config:{initialFrameWidth:1080,initialFrameHeight:350},ue1:"ue1",fenleiAll:[],ruleForm:{title:"",description:"",content:"",faId:null,topping:""},articleId:null,rules:{title:[{required:!0,message:"请输入文章标题",trigger:"blur"},{max:30,message:"长度在 30个字符内",trigger:"blur"}],faId:[{required:!0,message:"请选择文章类型",trigger:"change"}],description:[{required:!0,message:"请填写文章简介",trigger:"blur"}],topping:[{required:!0,message:"文章是否置顶",trigger:"change"}]}}),mounted(){this.getFenlei(),this.getParams()},methods:{getFenlei(){Object(a.o)().then(t=>{this.fenleiAll=t.data})},getParams(){let t=this.$route.params.rows;this.articleId=t,null!=this.articleId&&(localStorage.setItem("articleId",this.articleId),Object(a.r)({id:this.articleId}).then(t=>{this.ruleForm.title=t.data.data.title,this.ruleForm.description=t.data.data.description,this.ruleForm.faId=t.data.data.faId,this.ruleForm.topping=JSON.stringify(t.data.data.topping),this.$refs.ue.setUEContent(t.data.data.content)}))},goBackList(){this.$router.replace("/Article")},getUEContent(){let t=this.$refs.ue.getUEContent();console.log(t)},getUEContentTxt(){let t=this.$refs.ue.getUEContentTxt();console.log(t)},submitForm(t){2==this.ruleForm.faId.length?this.ruleForm.faId=this.ruleForm.faId[1]:this.ruleForm.faId=this.ruleForm.faId[0];let e=this.$refs.ue.getUEContent();this.ruleForm.content=e,this.ruleForm.faId=this.ruleForm.faId,this.$refs[t].validate(t=>{Object(a.b)(this.ruleForm).then(t=>{200===t.data.status_code?(this.$message({showClose:!0,message:"文章上传成功",type:"success"}),this.ruleForm={}):this.$message.error("上传失败，请填写必填项")}).catch(t=>{this.$message({showClose:!0,message:"文章添加失败，请检查表单是否填写完整",type:"error"})})})},updateForm(t){let e=this.$refs.ue.getUEContent();this.ruleForm.content=e,this.$refs[t].validate(t=>{Object(a.v)({title:this.ruleForm.title,description:this.ruleForm.description,content:this.ruleForm.content,faId:this.ruleForm.faId.toString(),topping:this.ruleForm.topping}).then(t=>{200==t.data.status_code?(this.$message({showClose:!0,message:"文章更新成功",type:"success"}),this.ruleForm={},localStorage.removeItem("articleId"),this.articleId=null,this.$refs.ue.setUEContent("")):this.$message.error("更新失败，请填写必填项")}).catch(t=>{})})}}},n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"article_all"},[r("div",{staticClass:"flex justify-between items-center"},[r("el-menu",{staticClass:"el-menu-demo w-1/3",attrs:{"default-active":t.activeIndex,mode:"horizontal"}},[r("el-submenu",{attrs:{index:"1"}},[r("template",{slot:"title"},[t._v("文章管理")]),t._v(" "),r("el-menu-item",{attrs:{index:"1-1"}},[r("router-link",{attrs:{to:"Article"}},[t._v("分类列表")])],1),t._v(" "),r("el-menu-item",{attrs:{index:"1-2"}},[r("router-link",{attrs:{to:"FenLeiOperate"}},[t._v("分类管理")])],1)],2),t._v(" "),r("el-menu-item",{attrs:{index:"2"}},[r("router-link",{attrs:{to:"UserList"}},[t._v("用户管理")])],1)],1)],1),t._v(" "),r("div",{staticClass:"w-full text-right mt-3"},[r("span",{staticClass:"px-2 py-2 cursor-pointer hover:text-blue-500 text-sm",on:{click:t.goBackList}},[t._v("返回文章列表")])]),t._v(" "),r("div",{staticClass:"w-1/2 text-left pt-4"},[r("el-form",{ref:"ruleForm",attrs:{model:t.ruleForm,rules:t.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"文章标题",prop:"title"}},[r("el-input",{model:{value:t.ruleForm.title,callback:function(e){t.$set(t.ruleForm,"title",e)},expression:"ruleForm.title"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"文章分类"}},[r("el-cascader",{attrs:{clearable:"",options:t.fenleiAll,props:t.SetKesDept},model:{value:t.ruleForm.faId,callback:function(e){t.$set(t.ruleForm,"faId",e)},expression:"ruleForm.faId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"文章简介",prop:"description"}},[r("el-input",{attrs:{type:"textarea"},model:{value:t.ruleForm.description,callback:function(e){t.$set(t.ruleForm,"description",e)},expression:"ruleForm.description"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"是否置顶",prop:"topping"}},[r("el-radio-group",{model:{value:t.ruleForm.topping,callback:function(e){t.$set(t.ruleForm,"topping",e)},expression:"ruleForm.topping"}},[r("el-radio",{attrs:{label:"1"}},[t._v("是")]),t._v(" "),r("el-radio",{attrs:{label:"0"}},[t._v("否")])],1)],1),t._v(" "),r("div",{staticClass:"editor-container"},[r("UE",{ref:"ue",attrs:{defaultMsg:t.defaultMsg,config:t.config,id:t.ue1}})],1),t._v(" "),r("el-form-item",{staticClass:"py-3 mt-5"},[null==this.articleId?r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.submitForm("ruleForm")}}},[t._v("立即创建")]):t._e(),t._v(" "),null!=this.articleId?r("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateForm("ruleForm")}}},[t._v("确认修改")]):t._e()],1)],1)],1)])},staticRenderFns:[]};var u=r("VU/8")(o,n,!1,function(t){r("44DC")},"data-v-7be7f91c",null);e.default=u.exports}});
//# sourceMappingURL=18.2014833501df67de5f90.js.map