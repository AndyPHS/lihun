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
                        <div v-if="mo.title== '存款' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个存款</h2>
                        </div>
                        <div v-if="mo.title== '理财' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个理财</h2>
                        </div>
                        <div v-if="mo.title== '车辆' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个车辆</h2>
                        </div>
                        <div v-if="mo.title== '保险' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个保险</h2>
                        </div>
                        <div v-if="mo.title== '家具家电' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个家具家电</h2>
                        </div>
                        <div v-if="mo.title== '股权' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个股权</h2>
                        </div>
                        <div v-if="mo.title== '债权' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个债权</h2>
                        </div>
                        <div v-if="mo.title== '债务' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个债务</h2>
                        </div>
                        <div v-if="mo.title== '其他财产' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个其他财产</h2>
                        </div>
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2172,index)">删除房产</div>
                        </div>
                        <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2283,index)">删除存款</div>
                        </div>
                        <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2485,index)">删除理财</div>
                        </div>
                        <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2224,index)">删除车辆</div>
                        </div>
                        <div v-if="mo.title== '保险' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2261,index)">删除保险</div>
                        </div>
                        <div v-if="mo.title== '家具家电' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2460,index)">删除家具家电</div>
                        </div>
                        <div v-if="mo.title== '股权' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2296,index)">删除股权</div>
                        </div>
                        <div v-if="mo.title== '债权' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2324,index)">删除债权</div>
                        </div>
                        <div v-if="mo.title== '债务' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2336,index)">删除债务</div>
                        </div>
                        <div v-if="mo.title== '其他财产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2309,index)">删除其他财产</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(2172)">添加房产</div>
                      </div>
                      <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2283)">添加存款</div>
                      </div>
                      <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2485)">添加理财</div>
                      </div>
                      <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2224)">添加车辆</div>
                      </div>
                      <div v-if="mo.title== '保险' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2261)">添加保险</div>
                      </div>
                      <div v-if="mo.title== '家具家电' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2460)">添加家具家电</div>
                      </div>
                      <div v-if="mo.title== '股权' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2296)">添加股权</div>
                      </div>
                      <div v-if="mo.title== '债权' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2324)">添加债权</div>
                      </div>
                      <div v-if="mo.title== '债务' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2336)">添加债务</div>
                      </div>
                      <div v-if="mo.title== '其他财产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2309)">添加其他财产</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成协议书吗？</h2>
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
        <el-button v-if="active==this.mokuai.length-1" class="my-5" @click="GoComplatePage">生成协议</el-button>
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
              BasicInformation: [], //基本信息
              hunyin: [], // 婚姻状况
              fangchan: [],  // 房产
              car: [],   // 车辆
              licai: [],   // 理财
              baoxian: [],   // 保险
              cunkuan: [],   // 存款
              jiaju: [],  //家具家电
              guquan: [],   // 股权
              qitacaichan: [], // 其他财产
              weilaicaichan: [], // 未来财产
              zhaiquan: [], // 债权
              zhaiwu: [], // 债务
              weilaizhaiquan: [], //未来债权
              weilaizhaiwu: [] // 未来债务
            },
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'BasicInformation',id:1, num:2151}, // 2151
              {title: '婚姻状况', part: 'hunyin',id:2, num:2364}, // 2364
              {title: '房产', part: 'fangchan',id:3, num:2172}, // 2172
              {title: '车辆', part: 'car',id:4, num:2224}, // 2224
              {title: '理财', part: 'licai',id:5, num:2485}, // 2485
              {title: '保险', part: 'baoxian',id:6, num:2261}, // 2261
              {title: '存款', part: 'cunkuan',id:7, num:2283}, // 2283
              {title: '家具家电', part: 'jiaju',id:8, num:2460}, // 2460
              {title: '股权', part: 'guquan',id:9, num:2296}, // 2296
              {title: '其他财产', part: 'qitacaichan',id:10, num:2309}, // 2309
              // {title: '未来财产', part: 'weilaicaichan',id:11, num:2690},  // 2690
              {title: '债权', part: 'zhaiquan',id:12, num:2324}, // 2324
              {title: '债务', part: 'zhaiwu',id:13, num:2336},  // 2336
              // {title: '未来债权', part: 'weilaizhaiquan',id:14, num:2692}, // 2692
              // {title: '未来债务', part: 'weilaizhaiwu',id:15, num:2693}, //2693
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
        this.gethunyin()
        this.getfangchan()
        this.getcar()
        this.getlicai()
        this.getbaoxian()
        this.getcunkuan()
        this.getjiaju()
        this.getguquan()
        this.getqitacaichan()
        this.getzhaiquan()
        this.getzhaiwu()
      },
      mounted () {
        this.getChuShi()
       },
      methods: {
        getChuShi () {
          getOnlyValue({
            qpid: 2360, // 关联id
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            if(data.data.data==1){
              this.getweilaicaichan()
            }
          })
          getOnlyValue({
            qpid: 2361, // 关联id
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            if(data.data.data==1){
              getOnlyValue({
                qpid: 2362, // 关联id
                quid: Number(localStorage.getItem('quid')) //用户的问卷id
              }).then((data)=>{
                let getmodel = JSON.parse(data.data.data)
                if(getmodel.indexOf("1") > -1){
                  this.getweilaizhaiquan()
                }else if(getmodel.indexOf("2") > -1){
                  this.getweilaizhaiwu()
                }

              })
            }
          })
        },
        getBasicInformation () { // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 2151}).then((data)=>{
            this.aa.BasicInformation = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        gethunyin () {  // 查询婚姻状况
          returnQuestionnaireJson({'qpid': 2364}).then((data)=>{
            this.aa.hunyin = data.data.data
            this.mokuai.sort(this.compare('id'));
            let cityAnswer = JSON.parse(this.aa.hunyin[0][0].questions[1].answer)
            this.aa.hunyin[0][0].questions[1].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
        },
        getfangchan () {  // 查询房产模块数据
          returnQuestionnaireJson({'qpid': 2172}).then((data)=>{
            this.aa.fangchan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getcar () {  // 查询车辆
          returnQuestionnaireJson({'qpid': 2224}).then((data)=>{
            this.aa.car = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getlicai () {// 查询理财
          returnQuestionnaireJson({'qpid': 2485}).then((data)=>{
            this.aa.licai = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getbaoxian () {// 查询保险
          returnQuestionnaireJson({'qpid': 2261}).then((data)=>{
            this.aa.baoxian = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getcunkuan () { // 查询存款
          returnQuestionnaireJson({'qpid': 2283}).then((data)=>{
            this.aa.cunkuan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getjiaju () { // 查询存款
          returnQuestionnaireJson({'qpid': 2460}).then((data)=>{
            this.aa.jiaju = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getguquan () {// 查询股权
          returnQuestionnaireJson({'qpid': 2296}).then((data)=>{
            this.aa.guquan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getqitacaichan () { // 查询其他财产
          returnQuestionnaireJson({'qpid': 2309}).then((data)=>{
            this.aa.qitacaichan = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.qitacaichan[0][0].questions[0].answer == 1 || this.aa.qitacaichan[0][0].questions[0].answer == ""){
              this.aa.qitacaichan[0][0].questions[0].answer = []
            }else{
              this.aa.qitacaichan[0][0].questions[0].answer = JSON.parse(this.aa.qitacaichan[0][0].questions[0].answer)
            }
          }).catch((data)=>{
          })
        },
        getweilaicaichan () { // 查询未来财产
          returnQuestionnaireJson({'qpid': 2690}).then((data)=>{
            this.aa.weilaicaichan = data.data.data
            this.mokuai.push({
              title: '未来财产',
              part: 'weilaicaichan',
              id: 11,
              num:2690
            })
            this.mokuai.sort(this.compare('id'));
            if(this.aa.weilaicaichan[0][0].questions[1].answer == 1 || this.aa.weilaicaichan[0][0].questions[1].answer == ""){
              this.aa.weilaicaichan[0][0].questions[1].answer = []
            }else{
              this.aa.weilaicaichan[0][0].questions[1].answer = JSON.parse(this.aa.weilaicaichan[0][0].questions[1].answer)
            }
            if(this.aa.weilaicaichan[0][0].questions[6].answer == 1 || this.aa.weilaicaichan[0][0].questions[6].answer == ""){
              this.aa.weilaicaichan[0][0].questions[6].answer = []
            }else{
              this.aa.weilaicaichan[0][0].questions[6].answer = JSON.parse(this.aa.weilaicaichan[0][0].questions[6].answer)
            }
          }).catch((data)=>{
          })
        },
        getzhaiquan () {// 查询债权
          returnQuestionnaireJson({'qpid': 2324}).then((data)=>{
            this.aa.zhaiquan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getzhaiwu () {// 查询债务
          returnQuestionnaireJson({'qpid': 2336}).then((data)=>{
            this.aa.zhaiwu = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getweilaizhaiquan () {// 查询未来债权
          returnQuestionnaireJson({'qpid': 2692}).then((data)=>{
            this.aa.weilaizhaiquan = data.data.data
            this.mokuai.push({
              title: '未来债权',
              part: 'weilaicaichan',
              id: 14,
              num:2692
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getweilaizhaiwu () {// 查询未来债务
          returnQuestionnaireJson({'qpid': 2693}).then((data)=>{
            this.aa.weilaizhaiwu = data.data.data
            this.mokuai.push({
              title: '未来债务',
              part: 'weilaicaichan',
              id: 15,
              num:2693
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        compare (property) {
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
                if(e==2172){
                  this.getfangchan()  // 刷新房产
                }else if(e==2283){
                  this.getcunkuan()  // 刷新存款
                }else if(e==2485){
                  this.getlicai()  // 刷新理财
                }else if(e==2224){
                  this.getcar()  // 刷新车辆
                }else if(e==2261){
                  this.getbaoxian()  // 刷新保险
                }else if(e==2460){
                  this.getjiaju()  // 刷新家具
                }else if(e==2296){
                  this.getguquan()  // 刷新股权
                }else if(e==2310){
                  this.getqitacaichan()  // 刷新其他财产
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
                if(e==2172){
                  this.getfangchan()  // 刷新房产
                }else if(e==2283){
                  this.getcunkuan()  // 刷新存款
                }else if(e==2485){
                  this.getlicai()  // 刷新理财
                }else if(e==2224){
                  this.getcar()  // 刷新车辆
                }else if(e==2261){
                  this.getbaoxian()  // 刷新保险
                }else if(e==2460){
                  this.getjiaju()  // 刷新家具
                }else if(e==2296){
                  this.getguquan()  // 刷新股权
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

        GoComplatePage () { // 点击个性化修改的时候先验证申请法院是否填写，如果填写则弹出框
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
            localStorage.setItem('qpid', 1320)
            demoYanZheng({
              qpid: 1320
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
          }else if(this.mokuai[this.active].title == '婚姻状况'){
            localStorage.setItem('qpid', 2364)
            demoYanZheng({
              qpid: 2364
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '婚姻状况已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '房产'){
            localStorage.setItem('qpid', 2172)
            demoYanZheng({
              qpid: 2172
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
            localStorage.setItem('qpid', 2224)
            demoYanZheng({
              qpid: 2224
            }).then((data)=>{
              // console.log(data.data)
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '车辆模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '理财'){
            localStorage.setItem('qpid', 2485)
            demoYanZheng({
              qpid: 2485
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '理财信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '保险'){
            localStorage.setItem('qpid', 2261)
            demoYanZheng({
              qpid: 2261
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '保险信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1);
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '存款'){
            localStorage.setItem('qpid', 2283)
            demoYanZheng({
              qpid: 2283
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '存款模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '家具家电'){
            localStorage.setItem('qpid', 2460)
            demoYanZheng({
              qpid: 2460
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '家具家电已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '股权'){
            localStorage.setItem('qpid', 2296)
            demoYanZheng({
              qpid: 2296
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '股权信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '其他财产'){
            localStorage.setItem('qpid', 2309)
            demoYanZheng({
              qpid: 2309
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '其他财产信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '未来财产'){
            localStorage.setItem('qpid', 2690)
            demoYanZheng({
              qpid: 2690
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '未来财产信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '债权'){
            localStorage.setItem('qpid', 2324)
            demoYanZheng({
              qpid: 2324
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '债权信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '债务'){
            localStorage.setItem('qpid', 2336)
            demoYanZheng({
              qpid: 2336
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '债务信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '未来债权'){
            localStorage.setItem('qpid', 2692)
            demoYanZheng({
              qpid: 2692
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '未来债权信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '未来债务'){
            localStorage.setItem('qpid', 2693)
            demoYanZheng({
              qpid: 2693
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '未来债务信息模块已成功保存',
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
          this.flag =false
        },
        GetOutPutWord () {   // 获取离婚协议书未填写项
          outPutWord().then((data)=>{
            this.status_code = data.data.status_code
            if(this.status_code == 330 ){
                this.missField = data.data.data
                this.IsShow = false;
            }else if(this.status_code == 200){
                this.$router.replace("/ShengChengXieYi");
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
</style>
