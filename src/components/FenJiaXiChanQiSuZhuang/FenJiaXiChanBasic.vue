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
                        <div v-if="mo.title== '原告基本信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个原告基本信息</h2>
                        </div>
                        <div v-if="mo.title== '被告基本信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个被告基本信息</h2>
                        </div>
                        <div v-if="mo.title== '儿子' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个儿子</h2>
                        </div>
                        <div v-if="mo.title== '女儿' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个女儿</h2>
                        </div>
                        <div v-if="mo.title== '儿媳' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个儿媳</h2>
                        </div>
                        <div v-if="mo.title== '女婿' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个女婿</h2>
                        </div>
                        <div v-if="mo.title== '孙子' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个孙子</h2>
                        </div>
                        <div v-if="mo.title== '孙女' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个孙女</h2>
                        </div>
                        <div v-if="mo.title== '外孙' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个外孙</h2>
                        </div>
                        <div v-if="mo.title== '外孙女' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个外孙女</h2>
                        </div>
                        <div v-if="mo.title== '其他' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个其他</h2>
                        </div>
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <div v-if="mo.title== '原告基本信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(3132,index)">删除原告基本信息</div>
                        </div>
                        <div v-if="mo.title== '被告基本信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3133,index)">删除被告基本信息</div>
                          <div v-if="mo.title== '儿子' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3181,index)">删除儿子</div>
                          </div>
                          <div v-if="mo.title== '女儿' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3182,index)">删除女儿</div>
                          </div>
                          <div v-if="mo.title== '儿媳' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3183,index)">删除儿媳</div>
                          </div>
                          <div v-if="mo.title== '女婿' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3184,index)">删除女婿</div>
                          </div>
                          <div v-if="mo.title== '孙子' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3185,index)">删除孙子</div>
                          </div>
                          <div v-if="mo.title== '孙女' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3186,index)">删除孙女</div>
                          </div>
                          <div v-if="mo.title== '外孙' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3187,index)">删除外孙</div>
                          </div>
                          <div v-if="mo.title== '外孙女' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3188,index)">删除外孙女</div>
                          </div>
                          <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                            <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3189,index)">删除其他</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '原告基本信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(3132)">添加原告基本信息</div>
                      </div>
                      <div v-if="mo.title== '被告基本信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3133)">添加被告基本信息</div>
                      </div>
                      <div v-if="mo.title== '儿子' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3181)">添加儿子</div>
                      </div>
                      <div v-if="mo.title== '女儿' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3182)">添加女儿</div>
                      </div>
                      <div v-if="mo.title== '儿媳' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3183)">添加儿媳</div>
                      </div>
                      <div v-if="mo.title== '女婿' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3184)">添加女婿</div>
                      </div>
                      <div v-if="mo.title== '孙子' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3185)">添加孙子</div>
                      </div>
                      <div v-if="mo.title== '孙女' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3186)">添加孙女</div>
                      </div>
                      <div v-if="mo.title== '外孙' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3187)">添加外孙</div>
                      </div>
                      <div v-if="mo.title== '外孙女' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3188)">添加外孙女</div>
                      </div>
                      <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3189)">添加其他</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成分家析产起诉状吗？</h2>
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
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者起诉原因等
  import {getOnlyValue} from '@/api/api/requestLogin.js'    // 获取单独问题的值
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
              yuangaoinfo: [],    //原告基本信息1
              beigaoinfo: [],   // 被告基本信息2
              zufu:[],  // 3
              zumu:[], // 4
              waizufu:[],  // 5
              waizumu:[],// 6
              fuqin:[],// 7
              muqin:[],// 8
              erzi:[],// 9
              nver:[],// 10
              erxi:[],// 11
              nvxu:[],// 12
              sunzi:[],// 13
              sunnv:[],// 14
              waisun:[],// 15
              waisunnv:[],// 16
              qita:[],// 17
              shishiyuliyou:[],// 18
              susongqingqiu:[],// 19
              qisufayuan:[]// 20

            },
            IsShow: false,
            mokuai: [
              {title: '原告基本信息', part: 'yuangaoinfo',id:1,num:3132},
              {title: '被告基本信息', part: 'beigaoinfo',id:2,num:3133},
              {title: '事实与理由', part: 'shishiyuliyou',id:18,num:3277},
              {title: '诉讼请求', part: 'susongqingqiu',id:19,num:3292},
              {title: '起诉法院', part: 'qisufayuan',id:20,num:3296}
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
      name: 'FenJiaXiChanBasic',

      beforeMount () {
        this.getyuangaoinfo() // 查询双方原告基本信息模块数据
        this.getbeigaoinfo()
        this.getshishiyuliyou()
        this.getsusongqingqiu()
        this.getqisufayuan()
      },
      mounted () {
        this.getChuShi()
       },
      methods: {
        getChuShi () {
          getOnlyValue({
            qpid: 3172, // 关联id
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            let getmodel = JSON.parse(data.data.data)
            if(getmodel.indexOf("1") > -1){
              this.getzufu()
            }
            if(getmodel.indexOf("2") > -1){
              this.getzumu()
            }
            if(getmodel.indexOf("3") > -1){
              this.getwaizufu()
            }
            if(getmodel.indexOf("4") > -1){
              this.getwaizumu()
            }
            if(getmodel.indexOf("5") > -1){
              this.getfuqin()
            }
            if(getmodel.indexOf("6") > -1){
              this.getmuqin()
            }
            if(getmodel.indexOf("7") > -1){
              this.geterzi()
            }
            if(getmodel.indexOf("8") > -1){
              this.getnver()
            }
            if(getmodel.indexOf("9") > -1){
              this.geterxi()
            }
            if(getmodel.indexOf("10") > -1){
              this.getnvxu()
            }
            if(getmodel.indexOf("11") > -1){
              this.getsunzi()
            }
            if(getmodel.indexOf("12") > -1){
              this.getsunnv()
            }
            if(getmodel.indexOf("13") > -1){
              this.getwaisun()
            }
            if(getmodel.indexOf("14") > -1){
              this.getwaisunnv()
            }
            if(getmodel.indexOf("15") > -1){
              this.getqita()
            }
          }).catch((data)=>{
            console.log("保存失败")
          })
        },
        getyuangaoinfo () { // 查询双方原告基本信息模块数据
          returnQuestionnaireJson({'qpid': 3132}).then((data)=>{
            this.aa.yuangaoinfo = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.yuangaoinfo==undefined){
              userAddAnswer({
                value: 1,  // 值
                qpid: 3132, // 关联id
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{
                this.getyuangaoinfo()
              }).catch((data)=>{

              })
            }
          }).catch((data)=>{
          })
        },
        getbeigaoinfo(){
          returnQuestionnaireJson({'qpid': 3133}).then((data)=>{
            this.aa.beigaoinfo = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.beigaoinfo==undefined){
              userAddAnswer({
                value: 1,  // 值
                qpid: 3133, // 关联id
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{
                this.getbeigaoinfo()
              }).catch((data)=>{

              })
            }
          }).catch((data)=>{
          })
        },
        getzufu () {
          returnQuestionnaireJson({'qpid': 3175}).then((data)=>{
            this.aa.zufu = data.data.data
            this.mokuai.push({
              title: '祖父',
              part: 'zufu',
              id: 3,
              num:3175
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshzufu () {
          returnQuestionnaireJson({'qpid': 3175}).then((data)=>{
            this.aa.zufu = data.data.data
          }).catch((data)=>{
          })
        },
        getzumu () {
          returnQuestionnaireJson({'qpid': 3176}).then((data)=>{
            this.aa.zumu = data.data.data
            this.mokuai.push({
              title: '祖母',
              part: 'zumu',
              id: 4,
              num:3176
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshzumu () {
          returnQuestionnaireJson({'qpid': 3176}).then((data)=>{
            this.aa.zumu = data.data.data
          }).catch((data)=>{
          })
        },
        getwaizufu () {
          returnQuestionnaireJson({'qpid': 3177}).then((data)=>{
            this.aa.waizufu = data.data.data
            this.mokuai.push({
              title: '外祖父',
              part: 'waizufu',
              id: 5,
              num:3177
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshwaizufu () {
          returnQuestionnaireJson({'qpid': 3177}).then((data)=>{
            this.aa.waizufu = data.data.data
          }).catch((data)=>{
          })
        },
        getwaizumu () {
          returnQuestionnaireJson({'qpid': 3178}).then((data)=>{
            this.aa.waizumu = data.data.data
            this.mokuai.push({
              title: '外祖母',
              part: 'waizumu',
              id: 5,
              num:3178
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshwaizumu () {
          returnQuestionnaireJson({'qpid': 3178}).then((data)=>{
            this.aa.waizumu = data.data.data
          }).catch((data)=>{
          })
        },
        getfuqin () {
          returnQuestionnaireJson({'qpid': 3179}).then((data)=>{
            this.aa.fuqin = data.data.data
            this.mokuai.push({
              title: '父亲',
              part: 'fuqin',
              id: 7,
              num:3179
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshfuqin () {
          returnQuestionnaireJson({'qpid': 3179}).then((data)=>{
            this.aa.fuqin = data.data.data
          }).catch((data)=>{
          })
        },
        getmuqin () {
          returnQuestionnaireJson({'qpid': 3180}).then((data)=>{
            this.aa.muqin = data.data.data
            this.mokuai.push({
              title: '母亲',
              part: 'muqin',
              id: 8,
              num:3180
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshmuqin () {
          returnQuestionnaireJson({'qpid': 3180}).then((data)=>{
            this.aa.muqin = data.data.data
          }).catch((data)=>{
          })
        },
        geterzi () {
          returnQuestionnaireJson({'qpid': 3181}).then((data)=>{
            this.aa.erzi = data.data.data
            this.mokuai.push({
              title: '儿子',
              part: 'erzi',
              id: 9,
              num:3181
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refresherzi () {
          returnQuestionnaireJson({'qpid': 3181}).then((data)=>{
            this.aa.erzi = data.data.data
          }).catch((data)=>{
          })
        },
        getnver () {
          returnQuestionnaireJson({'qpid': 3182}).then((data)=>{
            this.aa.nver = data.data.data
            this.mokuai.push({
              title: '女儿',
              part: 'nver',
              id: 10,
              num:3182
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshnver () {
          returnQuestionnaireJson({'qpid': 3182}).then((data)=>{
            this.aa.nver = data.data.data
          }).catch((data)=>{
          })
        },
        geterxi () {
          returnQuestionnaireJson({'qpid': 3183}).then((data)=>{
            this.aa.erxi = data.data.data
            this.mokuai.push({
              title: '儿媳',
              part: 'erxi',
              id: 11,
              num:3183
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refresherxi () {
          returnQuestionnaireJson({'qpid': 3183}).then((data)=>{
            this.aa.erxi = data.data.data
          }).catch((data)=>{
          })
        },
        getnvxu () {
          returnQuestionnaireJson({'qpid': 3184}).then((data)=>{
            this.aa.nvxu = data.data.data
            this.mokuai.push({
              title: '女婿',
              part: 'nvxu',
              id: 12,
              num:3184
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshnvxu () {
          returnQuestionnaireJson({'qpid': 3184}).then((data)=>{
            this.aa.nvxu = data.data.data
          }).catch((data)=>{
          })
        },
        getsunzi () {
          returnQuestionnaireJson({'qpid': 3185}).then((data)=>{
            this.aa.sunzi = data.data.data
            this.mokuai.push({
              title: '孙子',
              part: 'sunzi',
              id: 13,
              num:3185
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshsunzi () {
          returnQuestionnaireJson({'qpid': 3185}).then((data)=>{
            this.aa.sunzi = data.data.data
          }).catch((data)=>{
          })
        },
        getsunnv () {
          returnQuestionnaireJson({'qpid': 3186}).then((data)=>{
            this.aa.sunnv = data.data.data
            this.mokuai.push({
              title: '孙女',
              part: 'sunnv',
              id: 14,
              num:3186
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshsunnv () {
          returnQuestionnaireJson({'qpid': 3186}).then((data)=>{
            this.aa.sunnv = data.data.data
          }).catch((data)=>{
          })
        },
        getwaisun () {
          returnQuestionnaireJson({'qpid': 3187}).then((data)=>{
            this.aa.waisun = data.data.data
            this.mokuai.push({
              title: '外孙',
              part: 'waisun',
              id: 15,
              num:3187
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshwaisun () {
          returnQuestionnaireJson({'qpid': 3187}).then((data)=>{
            this.aa.waisun = data.data.data
          }).catch((data)=>{
          })
        },
        getwaisunnv () {
          returnQuestionnaireJson({'qpid': 3188}).then((data)=>{
            this.aa.waisunnv = data.data.data
            this.mokuai.push({
              title: '外孙女',
              part: 'waisunnv',
              id: 16,
              num:3188
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshwaisunnv () {
          returnQuestionnaireJson({'qpid': 3188}).then((data)=>{
            this.aa.waisunnv = data.data.data
          }).catch((data)=>{
          })
        },
        getqita () {
          returnQuestionnaireJson({'qpid': 3189}).then((data)=>{
            this.aa.qita = data.data.data
            this.mokuai.push({
              title: '其他',
              part: 'qita',
              id: 17,
              num:3189
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshqita () {
          returnQuestionnaireJson({'qpid': 3189}).then((data)=>{
            this.aa.qita = data.data.data
          }).catch((data)=>{
          })
        },
        getshishiyuliyou () {
          returnQuestionnaireJson({'qpid': 3277}).then((data)=>{
            this.aa.shishiyuliyou = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getsusongqingqiu () {// 查询诉讼请求模块数据
          returnQuestionnaireJson({'qpid': 3292}).then((data)=>{
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
          returnQuestionnaireJson({'qpid': 3296}).then((data)=>{
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
                if(e==3132){
                  this.getyuangaoinfo()
                }else if(e==3133){
                  this.getbeigaoinfo()
                }else if(e==3181){
                  this.refresherzi()
                }else if(e==3182){
                  this.refreshnver()
                }else if(e==3183){
                  this.refresherxi()
                }else if(e==3184){
                  this.refreshnvxu()
                }else if(e==3185){
                  this.refreshsunzi()
                }else if(e==3186){
                  this.refreshsunnv()
                }else if(e==3187){
                  this.refreshwaisun()
                }else if(e==3188){
                  this.refreshwaisunnv()
                }else if(e==3189){
                  this.refreshqita()
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
                if(e==3132){
                  this.getyuangaoinfo()
                }else if(e==3133){
                  this.getbeigaoinfo()
                }else if(e==3181){
                  this.refresherzi()
                }else if(e==3182){
                  this.refreshnver()
                }else if(e==3183){
                  this.refresherxi()
                }else if(e==3184){
                  this.refreshnvxu()
                }else if(e==3185){
                  this.refreshsunzi()
                }else if(e==3186){
                  this.refreshsunnv()
                }else if(e==3187){
                  this.refreshwaisun()
                }else if(e==3188){
                  this.refreshwaisunnv()
                }else if(e==3189){
                  this.refreshqita()
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
          if(this.mokuai[this.active].title == '原告基本信息'){
            localStorage.setItem('qpid', 3132)
            demoYanZheng({
              qpid: 3132
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '原告基本信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '被告基本信息'){
            localStorage.setItem('qpid', 3133)
            demoYanZheng({
              qpid: 3133
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '被告基本信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '祖父'){
            localStorage.setItem('qpid', 3175)
            demoYanZheng({
              qpid: 3175
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '祖父信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '祖母'){
            localStorage.setItem('qpid', 3176)
            demoYanZheng({
              qpid: 3176
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '祖母信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '外祖父'){
            localStorage.setItem('qpid', 3177)
            demoYanZheng({
              qpid: 3177
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '外祖父信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '外祖母'){
            localStorage.setItem('qpid', 3178)
            demoYanZheng({
              qpid: 3178
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '外祖母信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '父亲'){
            localStorage.setItem('qpid', 3179)
            demoYanZheng({
              qpid: 3179
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '父亲信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '母亲'){
            localStorage.setItem('qpid', 3180)
            demoYanZheng({
              qpid: 3180
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '母亲信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '儿子'){
            localStorage.setItem('qpid', 3181)
            demoYanZheng({
              qpid: 3181
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '儿子信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '女儿'){
            localStorage.setItem('qpid', 3182)
            demoYanZheng({
              qpid: 3182
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '女儿信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '儿媳'){
            localStorage.setItem('qpid', 3183)
            demoYanZheng({
              qpid: 3183
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '儿媳信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '女婿'){
            localStorage.setItem('qpid', 3184)
            demoYanZheng({
              qpid: 3184
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '女婿信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '孙子'){
            localStorage.setItem('qpid', 3185)
            demoYanZheng({
              qpid: 3185
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '孙子信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '孙女'){
            localStorage.setItem('qpid', 3186)
            demoYanZheng({
              qpid: 3186
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '孙女信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '外孙'){
            localStorage.setItem('qpid', 3187)
            demoYanZheng({
              qpid: 3187
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '外孙信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '外孙女'){
            localStorage.setItem('qpid', 3188)
            demoYanZheng({
              qpid: 3188
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '外孙女信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '其他'){
            localStorage.setItem('qpid', 3189)
            demoYanZheng({
              qpid: 3189
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
          }else if(this.mokuai[this.active].title == '事实与理由'){
            localStorage.setItem('qpid', 3277)
            demoYanZheng({
              qpid: 3277
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
          }else if(this.mokuai[this.active].title == '诉讼请求'){
            localStorage.setItem('qpid', 3292)
            demoYanZheng({
              qpid: 3292
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
            localStorage.setItem('qpid', 3296)
            demoYanZheng({
              qpid: 3296
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
                this.$router.replace("/FenJiaXiChanPersonalize");
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
