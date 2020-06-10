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
                        <div v-if="mo.title== '子女信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个子女信息</h2>
                        </div>
                        <div v-if="mo.title== '代位继承人信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个代位继承人信息</h2>
                        </div>
                        <div v-if="mo.title== '转继承人信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个转继承人信息</h2>
                        </div>
                        <div v-if="mo.title== '非法定继承信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个非法定继承信息</h2>
                        </div>
                        <div v-if="mo.title== '兄弟姐妹信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个兄弟姐妹信息</h2>
                        </div>
                        <div v-if="mo.title== '房产' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个房产</h2>
                        </div>
                        <div v-if="mo.title== '存款' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个存款</h2>
                        </div>
                        <div v-if="mo.title== '车辆' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个车辆</h2>
                        </div>
                        <div v-if="mo.title== '其他' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个其他</h2>
                        </div>
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <div v-if="mo.title== '原告基本信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2885,index)">删除原告基本信息</div>
                        </div>
                        <div v-if="mo.title== '被告基本信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2886,index)">删除被告基本信息</div>
                        </div>
                        <div v-if="mo.title== '子女信息'" class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(mo.num,index)">删除子女信息</div>
                        </div>
                        <div v-if="mo.title== '代位继承人信息'" class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(mo.num,index)">删除代位继承人信息</div>
                        </div>
                        <div v-if="mo.title== '转继承人信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(mo.num,index)">删除转继承人信息</div>
                        </div>
                        <div v-if="mo.title== '非法定继承信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(mo.num,index)">删除非法定继承信息</div>
                        </div>
                        <div v-if="mo.title== '兄弟姐妹信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2989,index)">删除兄弟姐妹信息</div>
                        </div>
                        <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3027,index)">删除房产</div>
                        </div>
                        <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3028,index)">删除存款</div>
                        </div>
                        <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3029,index)">删除车辆</div>
                        </div>
                        <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(3030,index)">删除其他</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div v-if="mo.title== '原告基本信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(2885)">添加原告基本信息</div>
                    </div>
                    <div v-if="mo.title== '被告基本信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2886)">添加被告基本信息</div>
                    </div>
                    <div v-if="mo.title== '子女信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(mo.num)">添加子女信息</div>
                    </div>
                    <div v-if="mo.title== '代位继承人信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(mo.num)">添加代位继承人信息</div>
                    </div>
                    <div v-if="mo.title== '转继承人信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(mo.num)">添加转继承人信息</div>
                    </div>
                    <div v-if="mo.title== '非法定继承信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(mo.num)">添加非法定继承信息</div>
                    </div>
                    <div v-if="mo.title== '兄弟姐妹信息' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2989)">添加兄弟姐妹信息</div>
                    </div>
                    <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3027)">添加房产</div>
                    </div>
                    <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3028)">添加存款</div>
                    </div>
                    <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3029)">添加车辆</div>
                    </div>
                    <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                      <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(3030)">添加其他</div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成继承纠纷起诉状吗？</h2>
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
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
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
            modle: null, // 关键问题显示出现那套模板  1(是) 模板A   2(否) 模板B
            daiweijichengflag: null,  //小问卷中是代位继承是否   1是   2否
            zhuanjichengflag: null,  // 小问卷中是转继承是否   1是   2否
            feifadingjichengflag: null, // 小问卷中父母是否有遗嘱/遗赠/遗赠扶养协议 1均有 2均无 3父亲有，母亲无 4父亲无，母亲有
            feifadingjichengflag2: null, // 小问卷是否是法定继承  1是  2否
            formLabelWidth: '80px',   // 表单标签宽度
            dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
            userWenJuan:{ // 修改用户问卷
              title: '',     // 标题
            },
            aa: {
              yuangaoinfo: [],    //原告基本信息1
              beigaoinfo: [],   // 被告基本信息2
              beijichenginfo: [], //3
              peiou: [], //4
              fuqin: [], //5
              muqin: [],//6
              zinv: [],//7
              xiongdi: [],//8
              zufu: [],//9
              zumu: [],//10
              waizufu: [],//11
              waizumu: [],//12
              daiweijicheng: [],//13
              zhuanjicheng: [],//14
              feifadingjicheng: [],//15
              fangchan: [],//16
              cunkuan: [],//17
              cheliang: [],//18
              qita: [],//19
              anyou: [],//20
              susongqingqiu: [],//21
              qisufayuan: []//22
            },
            IsShow: false,
            mokuai: [
              {title: '原告基本信息', part: 'yuangaoinfo',id:1,num:2885},
              {title: '被告基本信息', part: 'beigaoinfo',id:2,num:2886},

              {title: '房产', part: 'fangchan',id:16,num:3027},
              {title: '存款', part: 'cunkuan',id:17,num:3028},
              {title: '车辆', part: 'cheliang',id:18,num:3029},
              {title: '其他', part: 'qita',id:19,num:3030},
              {title: '案由', part: 'anyou',id:20,num:3043},
              {title: '诉讼请求', part: 'susongqingqiu',id:21,num:3044},
              {title: '起诉法院', part: 'qisufayuan',id:22,num:3045}
            ],
            active: 0,
            missMsgBox: false,      // 错误信息默认不显示
            missMsg: [],   // 验证的时候漏填项
            missAlert: true, // 尚未填写的信息弹框
            status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
            missField: [], // 未填写项目
            flag: false, // 生成协议弹窗是否出现开关
            qpidTip:null  // 当前模块的qpid变量
          }
      },
      name: 'JiChengJiuFenBasic',

      beforeMount () {
      },
      mounted () {
      	this.getChuShi()
        this.getyuangaoinfo() // 查询双方原告基本信息模块数据
        this.getbeigaoinfo()
        this.getfangchan()
        this.getcunkuan()
        this.getcheliang()
        this.getqita()
        this.getanyou()
        this.getsusongqingqiu()
        this.getqisufayuan()
       },
      methods: {
        getChuShi () {
        	  let that = this
          getOnlyValue({ // 小问卷是否选择同时继承父母遗产且继承人只为子女或孙子女
            qpid:2884,
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            let modle = JSON.parse(data.data.data)
            that.modle = modle
             this.getbeijichenginfo()
             this.getzinv()
             this.getdaiweijicheng()
             this.getzhuanjicheng()
             this.getfeifadingjicheng()
             if(that.modle==1){ // 小问卷2884选是
             getOnlyValue({
               qpid:2980,
               quid: Number(localStorage.getItem('quid')) //用户的问卷id
             }).then((data)=>{
               if(data.data.data==1){
                 getOnlyValue({
                   qpid:2981,
                   quid: Number(localStorage.getItem('quid')) //用户的问卷id
                 }).then((data)=>{
                   var getmodel = JSON.parse(data.data.data);
                   if(getmodel.indexOf("1") > -1){
                     this.getpeiou();
                   }
                   if(getmodel.indexOf("2") > -1){
                    this.getfuqin();
                   }
                   if(getmodel.indexOf("3") > -1){
                     this.getmuqin();
                   }

                 })
               }else{
                 getOnlyValue({
                   qpid:2982,
                   quid: Number(localStorage.getItem('quid')) //用户的问卷id
                 }).then((data)=>{
                   console.log(data.data.data)
                   let getmodel = JSON.parse(data.data.data)
                   if(getmodel.indexOf("1") > -1){
                     this.getxiongdi();
                   }
                   if(getmodel.indexOf("2") > -1){
                    this.getzufu();
                   }
                   if(getmodel.indexOf("3") > -1){
                     this.getzumu();
                   }
                   if(getmodel.indexOf("4") > -1){
                     this.getwaizufu();
                   }
                   if(getmodel.indexOf("5") > -1){
                     this.getwaizumu()
                   }
                 })
               }
             })
	          }
          }).catch((data)=>{
          })
          getOnlyValue({  // 小问卷是否选择转继承
            qpid:2944,
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            this.zhuanjichengflag = JSON.parse(data.data.data)
          }).catch((data)=>{
          })
          getOnlyValue({  // 小问卷父母是否有遗嘱/遗赠/遗赠扶养协议
            qpid:2957,
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            this.feifadingjichengflag = JSON.parse(data.data.data)
          }).catch((data)=>{
          })
          getOnlyValue({  // 小问卷是否是法定继承
            qpid:2976,
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
           this.feifadingjichengflag2 = JSON.parse(data.data.data)
          }).catch((data)=>{
          })

        },
        getyuangaoinfo () { // 查询双方原告基本信息模块数据
          returnQuestionnaireJson({'qpid': 2885}).then((data)=>{
            this.aa.yuangaoinfo = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.yuangaoinfo==undefined){
              userAddAnswer({
                value: 1,  // 值
                qpid: 2885, // 关联id
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
          returnQuestionnaireJson({'qpid': 2886}).then((data)=>{
            this.aa.beigaoinfo = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.beigaoinfo==undefined){
              userAddAnswer({
                value: 1,  // 值
                qpid: 2886, // 关联id
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{
                this.getbeigaoinfo()
              }).catch((data)=>{

              })
            }
          }).catch((data)=>{
          })
        },
        getbeijichenginfo () {
          if(this.modle==2){
            returnQuestionnaireJson({'qpid': 2921}).then((data)=>{
              this.aa.beijichenginfo = data.data.data
              this.mokuai.push({
                title: '被继承人信息',
                part: 'beijichenginfo',
                id: 3,
                num:2921
              })
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
          }else if(this.modle==1){
            returnQuestionnaireJson({'qpid': 2969}).then((data)=>{
              this.aa.beijichenginfo = data.data.data
              this.mokuai.push({
                title: '被继承人信息',
                part: 'beijichenginfo',
                id: 3,
                num:2969
              })
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
          }
        },
        getzinv () {
          if(this.modle==2){
            returnQuestionnaireJson({'qpid': 2938}).then((data)=>{
              this.aa.zinv = data.data.data
              this.mokuai.push({
                title: '子女信息',
                part: 'zinv',
                id: 4,
                num:2938
              })
              if(this.aa.zinv==undefined){
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 2938, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                  this.refreshzinv1()
                }).catch((data)=>{

                })
              }
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
          }else if(this.modle==1){
            getOnlyValue({
              qpid:2981,
              quid: Number(localStorage.getItem('quid')) //用户的问卷id
            }).then((data)=>{
              var getmodel = JSON.parse(data.data.data);
              if(getmodel.indexOf("4") > -1){
                returnQuestionnaireJson({'qpid': 2988}).then((data)=>{
                  this.aa.zinv = data.data.data
                  this.mokuai.push({
                    title: '子女信息',
                    part: 'zinv',
                    id: 7,
                    num:2988
                  })
                  if(this.aa.zinv==undefined){
                    userAddAnswer({
                      value: 1,  // 值
                      qpid: 2988, // 关联id
                      quid: localStorage.getItem('quid') //用户的问卷id
                    }).then((data)=>{
                      this.refreshzinv2()
                    }).catch((data)=>{

                    })
                  }
                  this.mokuai.sort(this.compare('id'));
                }).catch((data)=>{
                })
              }

            })
          }
        },
        refreshzinv1 () {
        		returnQuestionnaireJson({'qpid': 2938}).then((data)=>{
              this.aa.zinv = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshzinv2 () {
        		returnQuestionnaireJson({'qpid': 2988}).then((data)=>{
              this.aa.zinv = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getdaiweijicheng () {
          if(this.modle==2){
          	getOnlyValue({  // 小问卷是否选择代位继承
	            qpid:2943,
	            quid: Number(localStorage.getItem('quid')) //用户的问卷id
	          }).then((data)=>{
	            let daiweijichengflag = JSON.parse(data.data.data);
	            this.daiweijichengflag = daiweijichengflag
	            if(this.daiweijichengflag==1){
	              returnQuestionnaireJson({'qpid': 2945}).then((data)=>{
	                this.aa.daiweijicheng = data.data.data
	                this.mokuai.push({
	                  title: '代位继承人信息',
	                  part: 'daiweijicheng',
	                  id: 5,
	                  num:2945
	                })
	                if(this.aa.daiweijicheng==undefined){
	                  userAddAnswer({
	                    value: 1,  // 值
	                    qpid: 2945, // 关联id
	                    quid: localStorage.getItem('quid') //用户的问卷id
	                  }).then((data)=>{
	                    this.refreshdaiweijicheng1()
	                  }).catch((data)=>{

	                  })
	                }
	                this.mokuai.sort(this.compare('id'));
	              }).catch((data)=>{
	              })
	            }
	          }).catch((data)=>{
	          })

          }else if(this.modle==1){
          	getOnlyValue({  // 小问卷是否选择代位继承
	            qpid:2943,
	            quid: Number(localStorage.getItem('quid')) //用户的问卷id
	          }).then((data)=>{
	            let daiweijichengflag = JSON.parse(data.data.data);
	            this.daiweijichengflag = daiweijichengflag
	            if(this.daiweijichengflag==1){
	              returnQuestionnaireJson({'qpid': 3061}).then((data)=>{
	                this.aa.daiweijicheng = data.data.data
	                this.mokuai.push({
	                  title: '代位继承人信息',
	                  part: 'daiweijicheng',
	                  id: 13,
	                  num:3061
	                })
	                if(this.aa.daiweijicheng==undefined){
	                  userAddAnswer({
	                    value: 1,  // 值
	                    qpid: 3061, // 关联id
	                    quid: localStorage.getItem('quid') //用户的问卷id
	                  }).then((data)=>{
	                    this.refreshdaiweijicheng2()
	                  }).catch((data)=>{

	                  })
	                }
	                this.mokuai.sort(this.compare('id'));
	              }).catch((data)=>{
	              })
	            }
	          }).catch((data)=>{
	          })

          }
        },
        refreshdaiweijicheng1 () {
        		returnQuestionnaireJson({'qpid': 2945}).then((data)=>{
              this.aa.daiweijicheng = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshdaiweijicheng2 () {
        		returnQuestionnaireJson({'qpid': 3061}).then((data)=>{
              this.aa.daiweijicheng = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getzhuanjicheng () {
          if(this.modle==2){
          	getOnlyValue({  // 小问卷是否选择转继承
	            qpid:2944,
	            quid: Number(localStorage.getItem('quid')) //用户的问卷id
	          }).then((data)=>{
	            let zhuanjichengflag = JSON.parse(data.data.data)
	            this.zhuanjichengflag = zhuanjichengflag
	            if(this.zhuanjichengflag==1){
	              returnQuestionnaireJson({'qpid': 2946}).then((data)=>{
	                this.aa.zhuanjicheng = data.data.data
	                this.mokuai.push({
	                  title: '转继承人信息',
	                  part: 'zhuanjicheng',
	                  id: 6,
	                  num:2946
	                })
	                if(this.aa.zhuanjicheng==undefined){
	                  userAddAnswer({
	                    value: 1,  // 值
	                    qpid: 2946, // 关联id
	                    quid: localStorage.getItem('quid') //用户的问卷id
	                  }).then((data)=>{
	                    this.refreshzhuanjicheng1()
	                  }).catch((data)=>{

	                  })
	                }
	                this.mokuai.sort(this.compare('id'));
	              }).catch((data)=>{
	              })
	            }
	          }).catch((data)=>{
	          })
          }else if(this.modle==1){
          	getOnlyValue({  // 小问卷是否选择转继承
	            qpid:2944,
	            quid: Number(localStorage.getItem('quid')) //用户的问卷id
	          }).then((data)=>{
	            let zhuanjichengflag = JSON.parse(data.data.data)
	            this.zhuanjichengflag = zhuanjichengflag
	            if(this.zhuanjichengflag==1){
	              returnQuestionnaireJson({'qpid': 3062}).then((data)=>{
	                this.aa.zhuanjicheng = data.data.data
	                this.mokuai.push({
	                  title: '转继承人信息',
	                  part: 'zhuanjicheng',
	                  id: 14,
	                  num:3062
	                })
	                if(this.aa.zhuanjicheng==undefined){
	                  userAddAnswer({
	                    value: 1,  // 值
	                    qpid: 3062, // 关联id
	                    quid: localStorage.getItem('quid') //用户的问卷id
	                  }).then((data)=>{
	                    this.refreshzhuanjicheng2()
	                  }).catch((data)=>{

	                  })
	                }
	                this.mokuai.sort(this.compare('id'));
	              }).catch((data)=>{
	              })
	            }
	          }).catch((data)=>{
	          })

          }
        },
        refreshzhuanjicheng1 () {
        		returnQuestionnaireJson({'qpid': 2946}).then((data)=>{
              this.aa.zhuanjicheng = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshzhuanjicheng2 () {
        		returnQuestionnaireJson({'qpid': 3062}).then((data)=>{
              this.aa.zhuanjicheng = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getfeifadingjicheng () {
          if(this.modle==2){
          	getOnlyValue({  // 小问卷父母是否有遗嘱/遗赠/遗赠扶养协议
	            qpid:2957,
	            quid: Number(localStorage.getItem('quid')) //用户的问卷id
	          }).then((data)=>{
	            let feifadingjichengflag = JSON.parse(data.data.data)
	            this.feifadingjichengflag =feifadingjichengflag
	            if(this.feifadingjichengflag!==2){
	              returnQuestionnaireJson({'qpid': 3063}).then((data)=>{
	                this.aa.feifadingjicheng = data.data.data
	                this.mokuai.push({
	                  title: '非法定继承信息',
	                  part: 'feifadingjicheng',
	                  id: 7,
	                  num:3063
	                })
	                this.mokuai.sort(this.compare('id'));
	                if(this.aa.feifadingjicheng==undefined){
	                  userAddAnswer({
	                    value: 1,  // 值
	                    qpid: 3063, // 关联id
	                    quid: localStorage.getItem('quid') //用户的问卷id
	                  }).then((data)=>{
	                    this.refreshfeifadingjicheng1()
	                  }).catch((data)=>{

	                  })
	                }
	              }).catch((data)=>{
	              })
	            }
	          }).catch((data)=>{
	          })

          }else if(this.modle==1){
          	getOnlyValue({  // 小问卷是否是法定继承
	            qpid:2976,
	            quid: Number(localStorage.getItem('quid')) //用户的问卷id
	          }).then((data)=>{
	            let feifadingjichengflag2 = JSON.parse(data.data.data)
	            this.feifadingjichengflag2 =feifadingjichengflag2
	           if(this.feifadingjichengflag2==2){
	              returnQuestionnaireJson({'qpid': 2958}).then((data)=>{
	                this.aa.feifadingjicheng = data.data.data
	                this.mokuai.push({
	                  title: '非法定继承信息',
	                  part: 'feifadingjicheng',
	                  id: 15,
	                  num:2958
	                })
	                this.mokuai.sort(this.compare('id'));
	                if(this.aa.feifadingjicheng==undefined){
	                  userAddAnswer({
	                    value: 1,  // 值
	                    qpid: 2958, // 关联id
	                    quid: localStorage.getItem('quid') //用户的问卷id
	                  }).then((data)=>{
	                    this.refreshfeifadingjicheng2()
	                  }).catch((data)=>{

	                  })
	                }
	              }).catch((data)=>{
	              })
	            }
	          }).catch((data)=>{
	          })

          }
        },
        refreshfeifadingjicheng1 () {
        		returnQuestionnaireJson({'qpid': 3063}).then((data)=>{
              this.aa.feifadingjicheng = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshfeifadingjicheng2 () {
        		returnQuestionnaireJson({'qpid': 2958}).then((data)=>{
              this.aa.feifadingjicheng = data.data.data
              this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getpeiou () {
          returnQuestionnaireJson({'qpid': 2974}).then((data)=>{
            this.aa.peiou = data.data.data;
            this.mokuai.push({
              title: '配偶信息',
              part: 'peiou',
              id: 4,
              num:2974
            });
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getfuqin () {
          returnQuestionnaireJson({'qpid': 2986}).then((data)=>{
            this.aa.fuqin = data.data.data
            this.mokuai.push({
              title: '父亲信息',
              part: 'fuqin',
              id: 5,
              num:2986
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getmuqin () {
          returnQuestionnaireJson({'qpid': 2987}).then((data)=>{
            this.aa.muqin = data.data.data
            this.mokuai.push({
              title: '母亲信息',
              part: 'muqin',
              id: 6,
              num:2987
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getxiongdi () {
          returnQuestionnaireJson({'qpid': 2989}).then((data)=>{
            this.aa.xiongdi = data.data.data
            this.mokuai.push({
              title: '兄弟姐妹信息',
              part: 'xiongdi',
              id: 8,
              num:2989
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshxiongdi () {
          returnQuestionnaireJson({'qpid': 2989}).then((data)=>{
            this.aa.xiongdi = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getzufu () {
          returnQuestionnaireJson({'qpid': 2990}).then((data)=>{
            this.aa.zufu = data.data.data
            this.mokuai.push({
              title: '祖父信息',
              part: 'zufu',
              id: 9,
              num:2990
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getzumu () {
          returnQuestionnaireJson({'qpid': 2991}).then((data)=>{
            this.aa.zumu = data.data.data
            this.mokuai.push({
              title: '祖母信息',
              part: 'zumu',
              id: 10,
              num:2991
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getwaizufu () {
          returnQuestionnaireJson({'qpid': 2992}).then((data)=>{
            this.aa.waizufu = data.data.data
            this.mokuai.push({
              title: '外祖父信息',
              part: 'waizufu',
              id: 11,
              num:2992
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshwaizufu () {
          returnQuestionnaireJson({'qpid': 2992}).then((data)=>{
            this.aa.waizufu = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getwaizumu () {
          returnQuestionnaireJson({'qpid': 2993}).then((data)=>{
            this.aa.waizumu = data.data.data
            this.mokuai.push({
              title: '外祖母信息',
              part: 'waizumu',
              id: 12,
              num:2993
            })
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        refreshwaizumu () {
          returnQuestionnaireJson({'qpid': 2993}).then((data)=>{
            this.aa.waizumu = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getfangchan () {
          returnQuestionnaireJson({'qpid': 3027}).then((data)=>{
            this.aa.fangchan = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getcunkuan () {
          returnQuestionnaireJson({'qpid': 3028}).then((data)=>{
            this.aa.cunkuan = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getcheliang () {
          returnQuestionnaireJson({'qpid': 3029}).then((data)=>{
            this.aa.cheliang = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getqita () {
          returnQuestionnaireJson({'qpid': 3030}).then((data)=>{
            this.aa.qita = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getanyou () {
          returnQuestionnaireJson({'qpid': 3043}).then((data)=>{
            this.aa.anyou = data.data.data
            this.mokuai.sort(this.compare('id'));
            }).catch((data)=>{
            })
        },
        getsusongqingqiu () {
          returnQuestionnaireJson({'qpid': 3044}).then((data)=>{
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
        getqisufayuan () {
          returnQuestionnaireJson({'qpid': 3045}).then((data)=>{
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
                if(e==2885){
                  this.getyuangaoinfo()
                }else if(e==2886){
                  this.getbeigaoinfo()
                }else if(e==2938){
                  this.refreshzinv1()
                }else if(e==2988){
                  this.refreshzinv2()
                }else if(e==2945){
                  this.refreshdaiweijicheng1()
                }else if(e==3061){
                  this.refreshdaiweijicheng2()
                }else if(e==2946){
                  this.refreshzhuanjicheng1()
                }else if(e==3062){
                  this.refreshzhuanjicheng2()
                }else if(e==3063){
                  this.refreshfeifadingjicheng1()
                }else if(e==2989){
                  this.refreshxiongdi()
                }else if(e==3027){
                  this.getfangchan()
                }else if(e==3028){
                  this.getcunkuan()
                }else if(e==3029){
                  this.getcheliang()
                }else if(e==3030){
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
                if(e==2885){
                  this.getyuangaoinfo()
                }else if(e==2886){
                  this.getbeigaoinfo()
                }else if(e==2938){
                  this.refreshzinv1()
                }else if(e==2988){
                  this.refreshzinv2()
                }else if(e==2945){
                  this.refreshdaiweijicheng1()
                }else if(e==3061){
                  this.refreshdaiweijicheng2()
                }else if(e==2946){
                  this.refreshzhuanjicheng1()
                }else if(e==3062){
                  this.refreshzhuanjicheng2()
                }else if(e==3063){
                  this.refreshfeifadingjicheng1()
                }else if(e==2989){
                  this.refreshxiongdi()
                }else if(e==3027){
                  this.getfangchan()
                }else if(e==3028){
                  this.getcunkuan()
                }else if(e==3029){
                  this.getcheliang()
                }else if(e==3030){
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
            localStorage.setItem('qpid', 2885)
            demoYanZheng({
              qpid: 2885
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
            localStorage.setItem('qpid', 2886)
            demoYanZheng({
              qpid: 2886
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
          }else if(this.mokuai[this.active].title == '被继承人信息'){
            if(this.modle==2){
              this.qpidTip=2921
            }else if(this.modle==1){
              this.qpidTip=2969
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '被继承人信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '配偶信息'){
            if(this.modle==1){
              this.qpidTip=2974
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '配偶信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '父亲信息'){
            if(this.modle==1){
              this.qpidTip=2986
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '父亲信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '母亲信息'){
            if(this.modle==1){
              this.qpidTip=2987
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '母亲信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '子女信息'){
            if(this.modle==2){
              this.qpidTip=2938
            }else if(this.modle==1){
              this.qpidTip=2988
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '子女信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '兄弟姐妹信息'){
            if(this.modle==1){
              this.qpidTip=2989
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '兄弟姐妹信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '祖父信息'){
            if(this.modle==1){
              this.qpidTip=2990
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '祖父信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '祖母信息'){
            if(this.modle==1){
              this.qpidTip=2991
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '祖母信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '外祖父信息'){
            if(this.modle==1){
              this.qpidTip=2992
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '外祖父信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '外祖母信息'){
            if(this.modle==1){
              this.qpidTip=2993
            }else{
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '外祖母信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '代位继承人信息'){
            if(this.modle==2){
              this.qpidTip=2945
            }else{
              this.qpidTip=3061
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '代位继承人信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '转继承人信息'){
            if(this.modle==2){
              this.qpidTip=2946
            }else if(this.modle==1){
              this.qpidTip=3062
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '转继承人信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '非法定继承信息'){
            if(this.modle==2){
              this.qpidTip=3063
            }else if(this.modle==1){
              this.qpidTip=2958
            }
            localStorage.setItem('qpid', this.qpidTip)
            demoYanZheng({
              qpid: this.qpidTip
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '非法定继承信息信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '房产'){
            localStorage.setItem('qpid', 3027)
            demoYanZheng({
              qpid: 3027
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
          }else if(this.mokuai[this.active].title == '存款'){
            localStorage.setItem('qpid', 3028)
            demoYanZheng({
              qpid: 3028
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
          }else if(this.mokuai[this.active].title == '车辆'){
            localStorage.setItem('qpid', 3029)
            demoYanZheng({
              qpid: 3029
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
          }else if(this.mokuai[this.active].title == '其他'){
            localStorage.setItem('qpid', 3030)
            demoYanZheng({
              qpid: 3030
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
          }else if(this.mokuai[this.active].title == '案由'){
            localStorage.setItem('qpid', 3043)
            demoYanZheng({
              qpid: 3043
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
          }else if(this.mokuai[this.active].title == '诉讼请求'){
            localStorage.setItem('qpid', 3044)
            demoYanZheng({
              qpid: 3044
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
            localStorage.setItem('qpid', 3045)
            demoYanZheng({
              qpid: 3045
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
                this.$router.replace("/JiChengJiuFenPersonalize");
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
