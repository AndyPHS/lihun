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
                        <div v-if="mo.title== '申请人信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个申请人信息</h2>
                        </div>
                        <div v-if="mo.title== '证人信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个证人信息</h2>
                        </div>
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <div v-if="mo.title== '申请人信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(2796,index)">删除申请人信息</div>
                        </div>
                        <div v-if="mo.title== '证人信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(2813,index)">删除证人信息</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '申请人信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(2796)">添加申请人信息</div>
                      </div>
                      <div v-if="mo.title== '证人信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(2813)">添加证人信息</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成申请书吗？</h2>
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
          <h2>以下内容未填写无法跳转到下一步</h2>
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
import {returnQuestionnaireJson} from '@/api/api/requestLogin.js' // 查询问卷json
import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改离婚协议书
import {userAddAnswer} from '@/api/api/requestLogin.js' // 用户添加问卷的内容
import {userAddSelectAnswer} from '@/api/api/requestLogin.js' // 添加子女或者起诉原因等
import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js' // 删除子女或者起诉原因等
import {demoYanZheng} from '@/api/api/requestLogin.js' // 验证单独word demo
import {outPutWord} from '@/api/api/requestLogin.js' // 生成数据接口
export default {
  components: {
    QuestionModel
  },
  data () {
    return {
      a: {},
      formLabelWidth: '80px',   // 表单标签宽度
      dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
      userWenJuan: { // 修改用户问卷
        title: ''     // 标题
      },
      aa: {
        shenqinginfo: [], // 申请人信息
        zhengreninfo: [], // 证人信息
        shishiyuliyou: [], // 事实与理由
        zhengmingshishi: [], // 证明事实
        shenqingfayuan: [] // 申请法院
      },
      IsShow: false,
      mokuai: [
        {title: '申请人信息', part: 'shenqinginfo', id: 1,num:2796},
        {title: '证人信息', part: 'zhengreninfo', id: 2,num:2813},
        {title: '事实与理由', part: 'shishiyuliyou', id: 3,num:2824},
        {title: '证明事实', part: 'zhengmingshishi', id: 4,num:2825},
        {title: '申请法院', part: 'shenqingfayuan', id: 5,num:2826}
      ],
      active: 0,
      missMsgBox: false, // 错误信息默认不显示
      missMsg: [], // 验证的时候漏填项
      missAlert: true, // 尚未填写的信息弹框
      status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
      missField: [], // 未填写项目
      flag: false   // 生成协议弹窗是否出现开关

    }
  },
  name: 'BaoQuanBasic',

  beforeMount () {
    this.getshenqinginfo() // 查询申请人信息
    this.getzhengreninfo()
    this.getzhengmingshishi()
    this.getshishiyuliyou()
    this.getshenqingfayuan()
  },
  mounted () {

  },
  methods: {
    getshenqinginfo () { // 获取申请人信息模块数据
      returnQuestionnaireJson({'qpid': 2796}).then((data) => {
        this.aa.shenqinginfo = data.data.data
        if(this.aa.shenqinginfo==undefined){
          userAddAnswer({
            value: 1,  // 值
            qpid: 2796, // 关联id
            quid: localStorage.getItem('quid') //用户的问卷id
          }).then((data)=>{
            this.getshenqinginfo ()
          }).catch((data)=>{

          })
        }
      }).catch((data) => {
      })
    },
    getzhengreninfo(){ // 获取证人信息模块数据
      returnQuestionnaireJson({'qpid': 2813}).then((data) => {
        this.aa.zhengreninfo = data.data.data
        if(this.aa.zhengreninfo==undefined){
          userAddAnswer({
            value: 1,  // 值
            qpid: 2813, // 关联id
            quid: localStorage.getItem('quid') //用户的问卷id
          }).then((data)=>{
            this.getzhengreninfo()
          }).catch((data)=>{

          })
        }
      }).catch((data) => {
      })
    },
    getzhengmingshishi(){ // 获取证明事实模块数据
      returnQuestionnaireJson({'qpid': 2825}).then((data) => {
        this.aa.zhengmingshishi = data.data.data
        if(this.aa.zhengmingshishi[0][0].questions[0].answer == 1 || this.aa.zhengmingshishi[0][0].questions[0].answer == ""){
          this.aa.zhengmingshishi[0][0].questions[0].answer = []
        }else{
          this.aa.zhengmingshishi[0][0].questions[0].answer = JSON.parse(this.aa.zhengmingshishi[0][0].questions[0].answer)
        }
      }).catch((data) => {
      })
    },
    getshishiyuliyou(){ // 获取事实与理由模块数据
      returnQuestionnaireJson({'qpid': 2824}).then((data) => {
        this.aa.shishiyuliyou = data.data.data

      }).catch((data) => {
      })
    },
    getshenqingfayuan () {
      returnQuestionnaireJson({'qpid': 2826}).then((data) => { // 查询申请法院模块数据
        this.aa.shenqingfayuan = data.data.data
        let cityAnswer = JSON.parse(this.aa.shenqingfayuan[0][0].questions[0].answer)
        this.aa.shenqingfayuan[0][0].questions[0].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
      }).catch((data) => {
      })
    },

    userAddSelectAnswerAction (e) { // 添加多子女模块按钮
      this.$message({
        message: '添加中请稍后……',
        duration: 1000
      })
      userAddSelectAnswer({
        qpid: e,
        quid: localStorage.getItem('quid')
      }).then((data) => {
        if (data.data.status_code == 200) {
          if (e == 2796) {
            this.getshenqinginfo() // 刷新申请人信息
          } else if (e == 2813) {
            this.getzhengreninfo() // 刷新证人信息
          }
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        }
      }).catch((data) => {
        this.$message.error('添加失败，请联系管理员')
      })
    },
    userDeleteSelectAnswerAction (e, index) { // 删除多子女模块按钮
      this.$confirm('是否删除该选项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDeleteSelectAnswer({
          qpid: e,
          quid: localStorage.getItem('quid'),
          fornum: index + 1
        }).then((data) => {
          if (e == 2796) {
            this.getshenqinginfo() // 刷新申请人信息
          } else if (e == 2813) {
            this.getzhengreninfo() // 刷新证人信息
          }
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
        }).catch((data) => {
          this.$message.error('删除失败，请联系管理员')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    GoComplatePage () { // 点击个性化修改的时候先验证申请法院是否填写，如果填写则弹出框
      let mokuai =this.mokuai
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
    },
    quxiao () {
      this.IsShow = false
      this.flag = false
    },
    complate () {
      this.GetOutPutWord()
    },
    stepClick (val) {
      var _that = this
      _that.active = val
      localStorage.setItem('active', val)
    },
    prev () {
      --this.active
      if (this.active < 0) this.active = 0
    },
    next () {
      localStorage.setItem('active', this.active)
      if (this.mokuai[this.active].title == '申请人信息') {
        localStorage.setItem('qpid', 2796)
        demoYanZheng({
          qpid: 2796
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '申请人信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '证人信息') {
        localStorage.setItem('qpid', 2813)
        demoYanZheng({
          qpid: 2813
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '证人信息信息已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '事实与理由') {
        localStorage.setItem('qpid', 2824)
        demoYanZheng({
          qpid: 2824
        }).then((data) => {
          // console.log(data.data)
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '证明事实模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      }else if (this.mokuai[this.active].title == '证明事实') {
        localStorage.setItem('qpid', 2825)
        demoYanZheng({
          qpid: 2825
        }).then((data) => {
          // console.log(data.data)
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '证明事实模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      } else if (this.mokuai[this.active].title == '申请法院') {
        localStorage.setItem('qpid', 2826)
        demoYanZheng({
          qpid: 2826
        }).then((data) => {
          if (data.data.status_code == 330) {
            this.missMsgBox = true
            this.missMsg = data.data.data
          } else {
            this.$notify({
              title: '保存成功',
              message: '申请法院信息模块已成功保存',
              type: 'success'
            })
            if (this.active++ > this.mokuai.length - 1) ;
          }
        }).catch((data) => {
        })
      }
    },
    closeMissMsgBox () { // 关闭未填写项弹窗
      this.missMsgBox = false
      this.flag=false
    },
    GetOutPutWord () { // 获取离婚协议书未填写项
      outPutWord().then((data) => {
        this.status_code = data.data.status_code
        if (this.status_code == 330) {
          this.missField = data.data.data
          this.IsShow = false
        } else if (this.status_code == 200) {
          this.$router.replace('/ZhengRenChuTingPersonalize')
          this.missAlert = false
        }
      }).catch((data) => {
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
