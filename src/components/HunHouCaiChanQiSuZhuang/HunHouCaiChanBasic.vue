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
                        <div v-if="mo.title== '房产' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个房产</h2>
                        </div>
                        <div v-if="mo.title== '车辆' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个车辆</h2>
                        </div>
                        <div v-if="mo.title== '理财' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个理财</h2>
                        </div>
                        <div v-if="mo.title== '存款' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个存款</h2>
                        </div>
                        <div v-if="mo.title== '其他' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个其他</h2>
                        </div>
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(3471,index)">删除房产</div>
                        </div>
                        <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3472,index)">删除车辆</div>
                        </div>
                        <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3473,index)">删除理财</div>
                        </div>
                        <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3474,index)">删除存款</div>
                        </div>
                        <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3475,index)">删除其他</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(3471)">添加房产</div>
                      </div>
                      <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3472)">添加车辆</div>
                      </div>
                      <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3473)">添加理财</div>
                      </div>
                      <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3474)">添加存款</div>
                      </div>
                      <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3475)">添加其他</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成离婚后财产纠纷起诉状吗？</h2>
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
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
  import {userAddSelectAnswer} from '@/api/api/requestLogin.js'    // 添加子女或者起诉原因等
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者起诉原因等
 import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改离婚协议书
  import {demoYanZheng} from '@/api/api/requestLogin.js'    // 验证单独word demo
  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  export default {
    components: {
      QuestionModel
    },
      data () {
          return {
            a: {},
            aa: {
              jibenxinxi: [],    //原告基本信息1
              shishiyuliyou:[],// 18
              fangchan: [],   // 被告基本信息2
              cheliang:[],  // 3
              licai:[], // 4
              cunkuan:[],  // 5
              qita:[],// 6
              qisuyuanyin:[],// 7
              susongqingqiu:[],// 19
              qisufayuan:[]// 20

            },
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'jibenxinxi',id:1,num:3438},
              {title: '事实与理由', part: 'shishiyuliyou',id:2,num:3455},
              {title: '房产', part: 'fangchan',id:3,num:3471},
              {title: '车辆', part: 'cheliang',id:4,num:3472},
              {title: '理财', part: 'licai',id:5,num:3473},
              {title: '存款', part: 'cunkuan',id:6,num:3474},
              {title: '其他', part: 'qita',id:7,num:3475},
              {title: '起诉原因', part: 'qisuyuanyin',id:8,num:3502},
              {title: '诉讼请求', part: 'susongqingqiu',id:9,num:3504},
              {title: '起诉法院', part: 'qisufayuan',id:10,num:3505}
            ],
            active: 0,
            missMsgBox: false,      // 错误信息默认不显示
            formLabelWidth: '80px',   // 表单标签宽度
            dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
            userWenJuan:{ // 修改用户问卷
              title: '',     // 标题
            },
            missMsg: [],   // 验证的时候漏填项
            missAlert: true, // 尚未填写的信息弹框
            status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
            missField: [], // 未填写项目
            flag: false   // 生成协议弹窗是否出现开关
          }
      },
      name: 'RequestBasic',

      beforeMount () {
        this.getjibenxinxi() // 查询双方原告基本信息模块数据
        this.getshishiyuliyou()
        this.getfangchan()
        this.getcheliang()
        this.getlicai()
        this.getcunkuan()
        this.getqita()
        this.getqisuyuanyin()
        this.getsusongqingqiu()
        this.getqisufayuan()
      },
      mounted () {
       },
      methods: {
        getjibenxinxi () { // 查询双方原告基本信息模块数据
          returnQuestionnaireJson({'qpid': 3438}).then((data)=>{
            this.aa.jibenxinxi = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.jibenxinxi==undefined){
              userAddAnswer({
                value: 1,  // 值
                qpid: 3438, // 关联id
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{
                this.getjibenxinxi()
              }).catch((data)=>{

              })
            }
          }).catch((data)=>{
          })
        },
        getshishiyuliyou(){
          returnQuestionnaireJson({'qpid': 3455}).then((data)=>{
            this.aa.shishiyuliyou = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.shishiyuliyou==undefined){
              userAddAnswer({
                value: 1,  // 值
                qpid: 3455, // 关联id
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{
                this.getshishiyuliyou()
              }).catch((data)=>{

              })
            }
            this.aa.shishiyuliyou[0][0].questions[3].answer = JSON.parse(this.aa.shishiyuliyou[0][0].questions[3].answer)
            this.aa.shishiyuliyou[0][0].questions[5].answer = JSON.parse(this.aa.shishiyuliyou[0][0].questions[5].answer)
          }).catch((data)=>{
          })
        },
        getfangchan(){
          returnQuestionnaireJson({'qpid': 3471}).then((data)=>{
            this.aa.fangchan = data.data.data
          }).catch((data)=>{
          })
        },
        getcheliang () {
          returnQuestionnaireJson({'qpid': 3472}).then((data)=>{
            this.aa.cheliang = data.data.data
          }).catch((data)=>{
          })
        },
        getlicai () {
          returnQuestionnaireJson({'qpid': 3473}).then((data)=>{
            this.aa.licai = data.data.data
          }).catch((data)=>{
          })
        },
        getcunkuan ()  {
          returnQuestionnaireJson({'qpid': 3474}).then((data)=>{
            this.aa.cunkuan = data.data.data
          }).catch((data)=>{
          })
        },
        getqita () {
          returnQuestionnaireJson({'qpid': 3475}).then((data)=>{
            this.aa.qita = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getqisuyuanyin () {
          returnQuestionnaireJson({'qpid': 3502}).then((data)=>{
            this.aa.qisuyuanyin = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.qisuyuanyin[0][0].questions[0].answer == 1 || this.aa.qisuyuanyin[0][0].questions[0].answer == ""){
              this.aa.qisuyuanyin[0][0].questions[0].answer = []
            }else{
              this.aa.qisuyuanyin[0][0].questions[0].answer = JSON.parse(this.aa.qisuyuanyin[0][0].questions[0].answer)
            }
            if(this.aa.qisuyuanyin[0][1].questions[0].answer == 1 || this.aa.qisuyuanyin[0][1].questions[0].answer == ""){
              this.aa.qisuyuanyin[0][1].questions[0].answer = []
            }else{
              this.aa.qisuyuanyin[0][1].questions[0].answer = JSON.parse(this.aa.qisuyuanyin[0][1].questions[0].answer)
            }
          }).catch((data)=>{
          })
        },

        getsusongqingqiu () {// 查询诉讼请求模块数据
          returnQuestionnaireJson({'qpid': 3504}).then((data)=>{
            this.aa.susongqingqiu = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.susongqingqiu[0][0].questions[0].answer == 1 || this.aa.susongqingqiu[0][0].questions[0].answer == ""){
              this.aa.susongqingqiu[0][0].questions[0].answer = []
            }else{
              this.aa.susongqingqiu[0][0].questions[0].answer = JSON.parse(this.aa.susongqingqiu[0][0].questions[0].answer)
            }
          }).catch((data)=>{
          })
        },
        getqisufayuan () {// 查询起诉法院模块数据
          returnQuestionnaireJson({'qpid': 3505}).then((data)=>{
            this.aa.qisufayuan = data.data.data
            this.mokuai.sort(this.compare('id'));
            let cityAnswer = JSON.parse(this.aa.qisufayuan[0][0].questions[0].answer)
            this.aa.qisufayuan[0][0].questions[0].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
        },
        compare(property){
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2
          }
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
              if(data.data.status_code == 200 ){
                if(e==3471){
                  this.getfangchan()
                }else if(e==3472){
                  this.getcheliang()
                }else if(e==3473){
                  this.getlicai()
                }else if(e==3474){
                  this.getcunkuan()
                }else if(e==3475){
                  this.getqita()
                }
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
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
                if(e==3471){
                  this.getfangchan()
                }else if(e==3472){
                  this.getcheliang()
                }else if(e==3473){
                  this.getlicai()
                }else if(e==3474){
                  this.getcunkuan()
                }else if(e==3475){
                  this.getqita()
                }
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1000
                });
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
                this.flag = true
                this.IsShow = true;
              }
            }).catch((data)=>{
            })
          }
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
            localStorage.setItem('qpid', 3438)
            demoYanZheng({
              qpid: 3438
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
          }else if(this.mokuai[this.active].title == '事实与理由'){
            localStorage.setItem('qpid', 3455)
            demoYanZheng({
              qpid: 3455
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
          }else if(this.mokuai[this.active].title == '房产'){
            localStorage.setItem('qpid', 3471)
            demoYanZheng({
              qpid: 3471
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '房产信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '车辆'){
            localStorage.setItem('qpid', 3742)
            demoYanZheng({
              qpid: 3742
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '车辆信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '理财'){
            localStorage.setItem('qpid', 3473)
            demoYanZheng({
              qpid: 3473
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '理财信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '存款'){
            localStorage.setItem('qpid', 3474)
            demoYanZheng({
              qpid: 3474
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '存款信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '其他'){
            localStorage.setItem('qpid', 3475)
            demoYanZheng({
              qpid: 3475
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '其他信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '起诉原因'){
            localStorage.setItem('qpid', 3502)
            demoYanZheng({
              qpid: 3502
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '起诉原因信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '诉讼请求'){
            localStorage.setItem('qpid', 3504)
            demoYanZheng({
              qpid: 3504
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '诉讼请求信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '起诉法院'){
            localStorage.setItem('qpid', 3505)
            demoYanZheng({
              qpid: 3505
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '起诉法院信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
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
                this.$router.replace("/HunHouCaiChanPersonalize");
                this.missAlert = false
            }
          }).catch((data)=>{
          })
        },
        returnUserList(){
           this.$router.replace("/UserSystem");
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
</style>
