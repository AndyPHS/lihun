<template>
  <div class="w-full bg-gray-100 relative">
    <div class="container mx-auto">
      <div>
        <div class="py-6">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step :title="item.title" v-for="(item, index) in mokuai" :key="index"  @click.native ="stepClick(index)"></el-step>
          </el-steps>
        </div>
        <div v-for="(mo, key) in mokuai" :key="key" class="min">
          <div v-if="active=== key">
            <div>
              <el-form label-position="top" label-width="160px">
                <div class="text-left mx-auto bg-white px-5 py-5 border border-green-200 rounded-lg shadow-lg">
                  <!--遍历有几个孩子-->
                  <div>
                    <!--遍历孩子的基本信息-->
                    <div v-for="(item,index) in aa[mo.part]" :key="index">
                      <!-- 大问题块 -->
                      <div>
                        <!-- <div v-if="mo.title== '起诉原因' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个起诉原因</h2>
                        </div>
                        <div v-if="mo.title== '诉讼请求' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个诉讼请求</h2>
                        </div> -->
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <!-- <div v-if="mo.title== '起诉原因' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2670,index)">删除起诉原因</div>
                        </div>
                        <div v-if="mo.title== '诉讼请求' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2680,index)">删除诉讼请求</div>
                        </div> -->
                      </div>
                    </div>
                    <div>
                      <!-- <div v-if="mo.title== '起诉原因' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(2670)">添加起诉原因</div>
                      </div>
                      <div v-if="mo.title== '诉讼请求' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2680)">添加诉讼请求</div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成抚养权起诉状吗？</h2>
          <div class="queren flex mx-auto">
             <div class="w-24 mr-2">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='quxiao'>
                取消
              </div>
            </div>
            <div class="w-24">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='complate'>
                确认
              </div>
            </div>
          </div>
        </div>
        <div v-show="missMsgBox" id="missMsgBox" class="border border-green-200 rounded-lg shadow-lg">
          <h2>以下信息未填写无法跳转到下一步</h2>
          <div class="w-3/4 mx-auto text-red-500" style="overflow-y: scroll;height: 60%" >
            <ul>
              <li class="my-2 text-left" v-for="(item, index) in missMsg" :key="index">{{item.title}}</li>
            </ul>
          </div>
          <div class="queren flex mx-auto">
             <div class="w-24 mr-2">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='closeMissMsgBox'>
                取消
              </div>
            </div>
            <div class="w-24">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='closeMissMsgBox'>
                继续填写
              </div>
            </div>
          </div>
        </div>
        <div v-show="missAlert" id="missAlert" v-if="this.status_code == 330">
          <h2>尚未填写的信息</h2>
          <div class="px-1 mx-auto text-red-500" style="overflow-y: scroll;height: 380px;white-space: hidden" >
            <ul>
              <li class="my-1 mx-1 text-left" v-for="(item, index) in missField" :key="index">{{index+1}}、{{item.problemTitle}}</li>
            </ul>
          </div>
        </div>
        <el-dialog title="保存问卷" :visible.sync="dialogSavedWenJuan">
          <el-form :model="userWenJuan">
             <el-form-item label="名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="userWenJuan.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="canceldialogSaveWenJuan">取 消</el-button>
            <el-button type="primary" @click="dialogSaveWenJuanOk">保 存</el-button>
          </div>
        </el-dialog>
        <el-button v-if="active < this.mokuai.length && active > 0" class="my-5" @click="prev">上一步</el-button>
        <el-button v-if="active < this.mokuai.length-1 " class="my-5" @click="next">下一步</el-button>
        <el-button v-if="active==this.mokuai.length-1" class="my-5" @click="GoComplatePage">个性化修改</el-button>
      </div>
    </div>
    <div class="absolute returnUserList right-0">
      <el-button type="primary" @click="returnUserList">返回文书列表</el-button>
    </div>
  </div>
</template>
<script>
  import QuestionModel from '../partials/QuestionModel.vue'   // 引入子组件
  import {returnQuestionnaireJson} from '@/api/api/requestLogin.js'    // 查询问卷json
  import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改离婚协议书
  import {userAddSelectAnswer} from '@/api/api/requestLogin.js'    // 添加子女或者起诉原因等
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者起诉原因等
  import {demoYanZheng} from '@/api/api/requestLogin.js'    // 验证单独word demo
  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  export default {
    components: {
      QuestionModel
    },
      data () {
          return {
            a: {},
            formLabelWidth: '80px',   // 表单标签宽度
            dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
            userWenJuan:{ // 修改用户问卷
              title: '',     // 标题
            },
            aa: {
              BasicInformation: [],    //基本信息
              anyou:[],
              shishi: [],  //事实与理由
              qisuyuanyin: [],   // 起诉原因
              susongqingqiu: [],   // 诉讼请求
              qisufayuan: []   // 起诉法院
            },
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'BasicInformation',id:1,num:2630},
              {title: '案由', part: 'anyou',id:2,num:2775},
              {title: '事实与理由', part: 'shishi',id:3,num:2647},
              {title: '起诉原因', part: 'qisuyuanyin',id:4,num:2668},
              {title: '诉讼请求', part: 'susongqingqiu',id:5,num:2678},
              {title: '起诉法院', part: 'qisufayuan',id:6,num:2675}
            ],
            active: 0,
            missMsgBox: false,      // 错误信息默认不显示
            missMsg: [],   // 验证的时候漏填项
            missAlert: true, // 尚未填写的信息弹框
            status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
            missField: [], // 未填写项目
            flag: false   // 生成协议弹窗是否出现开关
          }
      },
      name: 'RequestBasic',

      beforeMount () {
        this.getBasicInformation() // 查询双方基本信息模块数据
        this.getanyou()
        this.getshishi()   // 获取事实与理由
        this.getqisuyuanyin()
        this.getsusongqingqiu()
        this.getqisufayuan()
      },
      mounted () {
       },
      methods: {
        getBasicInformation () { // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 2630}).then((data)=>{
            this.aa.BasicInformation = data.data.data
          }).catch((data)=>{
          })
        },
        getanyou () { // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 2775}).then((data)=>{
            this.aa.anyou = data.data.data
          }).catch((data)=>{
          })
        },
        getshishi () {  // 查询事实与理由模块数据
          returnQuestionnaireJson({'qpid': 2647}).then((data)=>{
            this.aa.shishi = data.data.data
            let cityAnswer0 = JSON.parse(this.aa.shishi[0][0].questions[9].answer)
            this.aa.shishi[0][0].questions[9].answer = [TextToCode[cityAnswer0[0]].code,TextToCode[cityAnswer0[0]][cityAnswer0[1]].code,TextToCode[cityAnswer0[0]][cityAnswer0[1]][cityAnswer0[2]].code]
            let cityAnswer1 = JSON.parse(this.aa.shishi[0][0].questions[10].childQuestion[1][0].grandson[2][2].answer)
            this.aa.shishi[0][0].questions[10].childQuestion[1][0].grandson[2][3].answer = [TextToCode[cityAnswer1[0]].code,TextToCode[cityAnswer1[0]][cityAnswer1[1]].code,TextToCode[cityAnswer1[0]][cityAnswer1[1]][cityAnswer1[2]].code]
            let cityAnswer2 = JSON.parse(this.aa.shishi[0][0].questions[10].childQuestion[2][0].grandson[2][3].answer)
            this.aa.shishi[0][0].questions[10].childQuestion[2][0].grandson[2][3].answer = [TextToCode[cityAnswer2[0]].code,TextToCode[cityAnswer2[0]][cityAnswer2[1]].code,TextToCode[cityAnswer2[0]][cityAnswer2[1]][cityAnswer2[2]].code]
            let cityAnswer3 = JSON.parse(this.aa.shishi[0][0].questions[10].childQuestion[3][0].grandson[2][3].answer)
            this.aa.shishi[0][0].questions[10].childQuestion[3][0].grandson[2][3].answer = [TextToCode[cityAnswer3[0]].code,TextToCode[cityAnswer3[0]][cityAnswer3[1]].code,TextToCode[cityAnswer3[0]][cityAnswer3[1]][cityAnswer3[2]].code]
            let cityAnswer4 = JSON.parse(this.aa.shishi[0][0].questions[10].childQuestion[4][0].grandson[2][3].answer)
            this.aa.shishi[0][0].questions[10].childQuestion[4][0].grandson[2][3].answer = [TextToCode[cityAnswer4[0]].code,TextToCode[cityAnswer4[0]][cityAnswer4[1]].code,TextToCode[cityAnswer4[0]][cityAnswer4[1]][cityAnswer4[2]].code]
            let cityAnswer5 = JSON.parse(this.aa.shishi[0][0].questions[10].childQuestion[5][0].grandson[2][3].answer)
            this.aa.shishi[0][0].questions[10].childQuestion[5][0].grandson[2][3].answer = [TextToCode[cityAnswer5[0]].code,TextToCode[cityAnswer5[0]][cityAnswer5[1]].code,TextToCode[cityAnswer5[0]][cityAnswer5[1]][cityAnswer5[2]].code]
          }).catch((data)=>{
          })
        },
        getqisuyuanyin () {  // 查询起诉原因模块数据
          returnQuestionnaireJson({'qpid': 2668}).then((data)=>{
            this.aa.qisuyuanyin = data.data.data
            if(this.aa.qisuyuanyin[0][0].questions[0].answer == 1 || this.aa.qisuyuanyin[0][0].questions[0].answer == ""){
              this.aa.qisuyuanyin[0][0].questions[0].answer = []
            }else{
              this.aa.qisuyuanyin[0][0].questions[0].answer = JSON.parse(this.aa.qisuyuanyin[0][0].questions[0].answer)
            }
            if(this.aa.qisuyuanyin[0][0].questions[0].childQuestion[3][0].answer == 1 || this.aa.qisuyuanyin[0][0].questions[0].childQuestion[3][0].answer == ""){
              this.aa.qisuyuanyin[0][0].questions[0].childQuestion[3][0].answer = []
            }else{
              this.aa.qisuyuanyin[0][0].questions[0].childQuestion[3][0].answer = JSON.parse(this.aa.qisuyuanyin[0][0].questions[0].childQuestion[3][0].answer)
            }
          }).catch((data)=>{
          })
        },
        getsusongqingqiu () {// 查询诉讼请求模块数据
          returnQuestionnaireJson({'qpid': 2678}).then((data)=>{
            this.aa.susongqingqiu = data.data.data
            if(this.aa.susongqingqiu[0][0].questions[0].answer == 1 || this.aa.susongqingqiu[0][0].questions[0].answer == ""){
              this.aa.susongqingqiu[0][0].questions[0].answer = []
            }else{
              this.aa.susongqingqiu[0][0].questions[0].answer = JSON.parse(this.aa.susongqingqiu[0][0].questions[0].answer)
            }
          }).catch((data)=>{
          })
        },
        getqisufayuan () {// 查询起诉法院模块数据
          returnQuestionnaireJson({'qpid': 2675}).then((data)=>{
            this.aa.qisufayuan = data.data.data
            let cityAnswer = JSON.parse(this.aa.qisufayuan[0][0].questions[0].answer)
            this.aa.qisufayuan[0][0].questions[0].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
        },
        
        userAddSelectAnswerAction (e){   // 添加多子女模块按钮
            this.$message({
              message:'添加中请稍后……',
              duration: 1000
            });
            userAddSelectAnswer({
              qpid: e,
              quid: localStorage.getItem('quid')
            }).then((data)=>{

            }).catch((data)=>{
               this.$message.error('添加失败，请联系管理员');
            })
        },
        userDeleteSelectAnswerAction (e,index) { // 删除多子女模块按钮
          this.$confirm('是否删除该选项？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              userDeleteSelectAnswer({
                qpid: e,
                quid: localStorage.getItem('quid'),
                fornum: index+1
              }).then((data)=>{

              }).catch((data)=>{
                this.$message.error('删除失败，请联系管理员');
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        GoComplatePage () { // 点击个性化修改的时候先验证起诉法院是否填写，如果填写则弹出框
          let mokuai = this.mokuai
          for(var i =0;i<mokuai.length;i++){
            localStorage.setItem('qpid', mokuai[i].num)
            demoYanZheng({
              qpid: mokuai[i].num
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
                this.flag = false
                this.IsShow = false;
              }else{
                this.flag = true;
                this.IsShow = true;
              }
            }).catch((data)=>{
            })
          }
          // if(this.flag==true){
          //   this.IsShow = true;
          // }
        },
        quxiao (){
          this.IsShow = false;
          this.flag = false
        },
        complate () {
          this.GetOutPutWord();
        },
        stepClick (val) {
          var _that = this;
          _that.active = val;
          localStorage.setItem('active',val)
        },
        prev () {
          --this.active;
          if(this.active < 0 ) this.active = 0;
        },
        next () {
          localStorage.setItem('active',this.active)
          if(this.mokuai[this.active].title == '基本信息'){
            localStorage.setItem('qpid', 2630)
            demoYanZheng({
              qpid: 2630
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '基本信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '案由'){
            localStorage.setItem('qpid', 2775)
            demoYanZheng({
              qpid: 2775
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '案由信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '事实与理由'){
            localStorage.setItem('qpid', 2647)
            demoYanZheng({
              qpid: 2647
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '事实与理由信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '起诉原因'){
            localStorage.setItem('qpid', 2668)
            demoYanZheng({
              qpid: 2668
            }).then((data)=>{
              // console.log(data.data)
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '起诉原因模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '诉讼请求'){
            localStorage.setItem('qpid', 2678)
            demoYanZheng({
              qpid: 2678
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '诉讼请求信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '起诉法院'){
            localStorage.setItem('qpid', 2675)
            demoYanZheng({
              qpid: 2675
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '起诉法院信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1);
              }
            }).catch((data)=>{
            })
          }
        },
        closeMissMsgBox () {   // 关闭未填写项弹窗
          this.missMsgBox = false
          this.flag=false
        },
        GetOutPutWord () {   // 获取离婚协议书未填写项
          outPutWord().then((data)=>{
            this.status_code = data.data.status_code
            if(this.status_code == 330 ){
                this.missField = data.data.data
                this.IsShow = false;
            }else if(this.status_code == 200){
                this.$router.replace("/FuYangQuanPersonalize");
                this.missAlert = false
            }
          }).catch((data)=>{
          })
        },
        errorAlert(e) {
          this.$message.error(e);
        },
        canceldialogSaveWenJuan(){   // 取消保存按钮
          this.dialogSavedWenJuan = false;
          this.$router.replace("/UserSystem");
        },
        dialogSaveWenJuanOk(){  // 点击保存确定按钮保存
          userUpdateQuestionnaire({
            status: 1,
            title: this.userWenJuan.title,
            exemption: 1,
            complete: 2
          }).then((data)=>{
            this.userWenJuan.title = '';
            this.dialogSavedWenJuan = false;
            this.$router.replace("/UserSystem");
          }).catch((data)=>{

          })
        },
        returnUserList(){  // 返回协议列表
          this.dialogSavedWenJuan = true;
        }
      }
    }
</script>
<style>
html{height: 100%;background-color: #f7fafc;}
.min{width:600px;margin:0 auto;}
.ban{width:100% !important;}
.returnUserList{top:110px;right: 20px;}
.el-form-item{margin-bottom:8px !important;}
.el-form--label-top .el-form-item__label{padding-bottom:0 !important;}
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100% !important;}
.el-cascader{width:100% !important;}
.el-select{width:100% !important;}
#alert_xieyi{width:400px;height:300px;border:1px solid #343434;position:fixed;top:50%;margin-top:-150px;left:50%;margin-left:-200px;z-index: 1;background: #fff}
#alert_xieyi h2{margin-top:100px;}
#alert_xieyi .queren{width:80%;text-align: center;justify-content: space-around;margin-top:80px;margin-left: 20%}
#missMsgBox{width:400px;height:400px;position:fixed;top:50%;margin-top:-200px;left:50%;margin-left:-200px;z-index: 1;background: #e2e5d9}
#missMsgBox h2{margin:20px 0;font-weight: bold;font-size: 20px;}
#missMsgBox .queren{width:80%;justify-content: space-around;position: absolute;bottom:10px;left:10%;}
#missAlert{width:250px;height:450px;position:fixed;top:24%;right:2%;z-index: 1;background: #e2e5d9}
#missAlert h2{margin:20px 0;font-weight: bold;font-size: 20px;}
#caseMsg{line-height:30px !important;text-indent:2em;}
.el-tooltip__popper.is-dark{background-color: #f7fafc !important;color:#343434 !important; border:1px solid #eae3e3 !important;border-radius: 15px !important;box-shadow: 0px 0px 5px 2px #e6dddd}
.el-tooltip__popper {width: 200px !important;height: 150px !important;overflow-y: scroll !important;}
.el-radio{line-height: 30px !important;}
</style>
