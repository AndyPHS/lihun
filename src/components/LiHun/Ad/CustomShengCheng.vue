<template>
  <div class="all">
    <lihun-head ref="lihun" v-on:headActiveEvent="getHeadActive"></lihun-head>
    <div class="w-full bg-color relative" v-loading="fullscreenLoading">
      <div class="shengcheng_w py-10">
        <div class="bg-white rounded-lg">
          <div class="outputword rounded-lg shadow-lg relative">
            <h2 class="py-2 text-2xl py-5 font-bold">{{ this.TitleMsg }}</h2>
            <div class="fanhuitianxie absolute">
              <span @click="GoBasicInformationPage">返回填写</span>
            </div>
            <div class="fanhuilist">
              <span @click="returnUserList">返回文书列表</span>
            </div>
            <div class="w-full">
              <div class="text-left px-4 py-3 msg">
                <div  class="w-2/3" v-if="this.status_code ==330">
                  <h2>以下<span class="text-red-500">必填项</span>未填写，请<span  @click="GoBasicInformationPage" class="text-blue-600">返回继续填写</span></h2>
                  <ul>
                    <li v-for="(item, index) in missField" :key="index">{{index+1}}、{{item.problemTitle}}</li>
                  </ul>
                </div>
                <div v-if="this.status_code ==200 && this.$route.params.content==undefined">
                  <div id="outputwordmsg" v-html="this.outputWord"></div>
                </div>
				<div v-if="this.$route.params.content!==undefined">
				  <div id="outputwordmsg" v-html="this.outputWord"></div>
				</div>
              </div>
              <div class="my-4 save_box">
                <span v-if="this.$route.params.content==undefined" class="save_box_span re" @click='SaveQuestionnaire'>保 存</span>
                <span class="save_box_span re" @click='DownLoadWord'>下载协议</span>
              </div>
            </div>
            <el-dialog title="免责条款" :visible.sync="dialogDownLoadWenJuan">
              <div class="text-left mianze px-2">
				<h2>尊敬的蜗牛家事用户：</h2>
                <p class="leading-loose">欢迎您使用蜗牛家事系统！为了让您更好地达成协议，维护您的合法权益，请您在下载、使用协议前仔细阅读、充分了解并清楚知晓以下重要内容：</p>
                <p class="leading-loose">离婚协议自双方办理离婚登记后生效，因此在约定离婚协议条款时应具体、全面，尽量避免双方离婚后因草率、随意订立条款而引起诉讼纠纷。</p>
                <p class="leading-loose">离婚协议约定内容应符合法律强制性规定，例如，不得限制离婚后一方的再婚自由，不得概括约定一方名下所有财产归其所有等，否则会导致协议部分条款效力待定或无效。</p>
                <p class="leading-loose">签订离婚协议时应明确各类财产的具体信息和离婚后归属，例如房产写明地址、在谁名下、取得时间、出资情况、离婚后归谁所有、是否支付补偿；银行存款写明数额、在谁名下、开户行、账号、离婚后归谁所有、是否支付补偿等，否则可能因无法确定财产具体信息或归属而引起纠纷。</p>
                <p class="leading-loose">由于夫妻共同财产具有复杂性和变化性，若在订立时涉及新型财产（例如：网上店铺、虚拟财产等）和非常规分割方式的约定，建议您委托律师专业起草协议，以更好的避免相关协议风险。</p>
                <p class="leading-loose">蜗牛家事基于《中华人民共和国婚姻法（2001修正）》和最高法院关于适用《中华人民共和国婚姻法》若干问题的三个司法解释等法律规定，系统数据来源于数千份真实的离婚协议书样本，具有内容专业、信息精准的特点。在填写和修改离婚协议时，用户提供的信息须真实、完整、准确，因信息不真实、不准确、不完整或输入错误而造成的一切后果均由用户自行承担。</p>
              </div>
              <div class="mt-5">
              <el-checkbox v-model="form.type">本人已仔细阅读上述内容，充分了解、清楚知晓并自愿承担离婚协议可能带来的风险。</el-checkbox>
              </div>
              <div slot="footer" class="dialog-footer tishi_bot pb-3">
                <span class="cbt" @click="canceldialogDownLoadWenJuan">取 消</span>
                <span class="cbt re" @click="dialogDownLoadWenJuanOk">确 定</span>
              </div>
            </el-dialog>
            <el-dialog title="保存问卷" :visible.sync="dialogSavedWenJuan">
              <el-form :model="userWenJuan">
                 <el-form-item label="名称" :label-width="formLabelWidth" class="mb-1">
                  <el-input v-model="userWenJuan.title" class="w-2/3" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer tishi_bot pb-3">
                <span class="cbt" @click="canceldialogSaveWenJuan">取 消</span>
                <span class="cbt re"  @click="dialogSaveWenJuanOk">保 存</span>
              </div>
            </el-dialog>
            <el-dialog title="提示" :visible.sync="dialogTiShi" class="tishi">
              <h2 class="text-red-500 text-xl text-center py-8">请确认已经保存该协议</h2>
              <div slot="footer" class="dialog-footer tishi_bot pb-3">
                <span class="cbt" @click="canceldialogTiShi">取消返回</span>
                <span class="cbt re" @click="alreadySave">确认已保存，返回列表</span>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
      <div class="absolute hidden returnUserList right-0">
        <el-button type="primary" @click="returnUserList">返回文书列表</el-button>
        <el-button type="primary" @click="saveWenShu">保存</el-button>
      </div>
    </div>
	<lihun-bottom></lihun-bottom>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import lihun_bottom from '../../partials/lihun_bottom.vue'
import {outPutWord} from '@/api/api/AgreementRequest.js' // 离婚协议书生成数据接口
import {getWord} from '@/api/api/AgreementRequest.js' // 起诉状生成数据接口
import {userUpdateQuestionnaire} from '@/api/api/AgreementRequest.js' // 修改离婚协议书
export default {
  name: 'CustomShengCheng',
  components: {
    'lihun-head': lihun_head,
	'lihun-bottom': lihun_bottom
  },
  data () {
    return {
      fullscreenLoading: false,
      questionnaireType: 1, // 问卷类型1 协议书类 2起诉状类，3申请书类
      downloadMsg: '', // 后台返回的下载资源
      outputWord: '', // 获取离婚协议书
      QiSuContent: [], // 起诉状内容
      TitleMsg: '', // 标题
      downLoadBtnMsg: '', // 下载按钮文字
      status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
      dialogDownLoadWenJuan: false, // 点击下载弹出免责弹窗
      form: {
        type: false
      },
      formLabelWidth: '80px', // 表单标签宽度
      dialogSavedWenJuan: false, // 点击保存弹出保存弹框
      userWenJuan: { // 修改用户问卷
        qid: null, // 问卷id
        status: null, // 状态 1正常 2回收站 3彻底删除
        content: '', // 内容
        title: '', // 标题
        exemption: null, // 免责条款 0未填写 1填写
        complete: null // 是否完成 0未完成 1完成
      },
      missField: [], // 未填写项目
      isGoBack: false, // 点击取消是否需要跳转
      dialogTiShi: false
    }
  },
  beforeMount () {
    this.GetOutPutWord() // 获取离婚协议书
  },
  methods: {
    GetOutPutWord () { // 获取协议
	  this.userWenJuan.title = this.$route.params.title
	  this.TitleMsg = '离婚协议书'
	  this.outputWord = this.$route.params.content
	  // console.log(this.outputWord)
	  if (this.$route.params.content==undefined){
		  this.fullscreenLoading = true
		  this.downLoadBtnMsg = '下载协议'
		  outPutWord().then((data) => {
		    this.status_code = data.data.status_code
		    this.fullscreenLoading = false
		    if (this.status_code == 330) {
		      this.missField = data.data.data
		    } else if (this.status_code == 200) {
		      this.outputWord = data.data.data.content
		    }
		  }).catch((data) => {
		    // this.$router.replace("/");
		  })
	  } else {
		 this.outputWord = this.$route.params.content
	  }
      
    },
    GoBasicInformationPage () { // 点击返回基本信息
      this.$router.replace('/CustomBasic')
    },
    dialogDownLoadWenJuanOk () { // 点击下载弹出确定按钮
      if (this.form.type) {
        getWord().then((data) => { // 申请书和起诉状等有个性化页面的下载路径
          if (data.data.status_code == 200) {
            window.open('http://office365.aladdinlaw.com:3921/word/' + data.data.data)
          }
          this.dialogDownLoadWenJuan = false
        }).catch((data) => {
          this.$message({
            message: '下载失败,请联系管理员',
            type: 'error'
          })
        })
      } else {
        this.$message({
          message: '请先勾选免责条款',
          type: 'error'
        })
      }
    },
    canceldialogDownLoadWenJuan () { // 点击下载弹框取消按钮
      this.dialogDownLoadWenJuan = false
    },
    DownLoadWord () { // 点击下载按钮
      this.dialogDownLoadWenJuan = true
    },
    SaveQuestionnaire () { // 点击保存弹出保存弹框
      this.dialogSavedWenJuan = true
      this.isGoBack = false
    },
    canceldialogSaveWenJuan () { // 取消保存按钮
      this.dialogSavedWenJuan = false
      if (this.isGoBack) {
        this.$router.replace('/MyConsult')
      }
    },
    dialogSaveWenJuanOk () { // 点击保存确定按钮保存
      userUpdateQuestionnaire({
        status: 1,
        title: this.userWenJuan.title,
        exemption: 1,
        complete: 1
      }).then((data) => {
        this.userWenJuan.title = ''
        this.dialogSavedWenJuan = false
        this.$router.replace('/MyConsult')
      }).catch((data) => {

      })
    },
    returnUserList () { // 返回协议列表
	  if (this.$route.params.content!==undefined) {
		  this.$router.replace('/MyConsult')
	  } else {
		 this.dialogTiShi = true
	  }
    },
    canceldialogTiShi () { // 取消返回
      this.dialogTiShi = false
    },
    alreadySave () { // 确认已保存，返回列表
      this.dialogTiShi = false
      this.$router.replace('/MyConsult')
    },
    saveWenShu () { // 保存文书
      this.dialogSavedWenJuan = true
    },
	getHeadActive (data) {
		localStorage.setItem('topins',data)
	}

  }
}
</script>
<style >
.bg-color{background: #eee;}
.shengcheng_w{width: 1000px;margin:0 auto;}
.fanhuitianxie {top:34px;right: 194px;margin:0}
.fanhuitianxie span{width: 132px;height: 35px;font-size: 16px;text-align: center;line-height: 35px;border:1px solid #343434;color:#343434;border-radius: 18px;display: inline-block;}
.fanhuitianxie span:hover{color: #fff;background-color: #ff3f68;border:1px solid  #ff3f68;}
.fanhuilist{position: absolute;top:34px;right: 44px;margin: 0;}
.fanhuilist span{width: 132px;height: 35px;font-size: 16px;text-align: center;line-height: 35px;border:1px solid #343434;color:#343434;border-radius: 18px;display: inline-block;}
.fanhuilist span:hover{color: #fff;background-color: #ff3f68;border:1px solid  #ff3f68;}
.containermin{width:800px;}
.returnUserList{top:110px;right: 20px;}
.outputword{padding:20px;border:1px solid #ecf5ec;}
.outputword>h2{border-bottom: 1px solid #dbe2db;height: 70px;}
.outputword .msg{white-space:pre-wrap;}
#outputwordmsg{width: 800px;margin:0 20px;padding-left: 100px;}
#outputwordmsg p{font-weight:bolder !important;}
.tishi .el-dialog__header{text-align: left;padding-left: 50px;}
.tishi .el-dialog__header h2{font-size: 25px;}
.tishi .el-dialog__header .el-dialog__title{font-size: 25px;}
.tishi_bot{width:502px;margin:0 auto;display: flex;justify-content: space-between;}
.cbt{width: 218px;height: 38px;line-height: 38px;text-align: center;color: #535353;border:1px solid #535353;font-size: 16px;border-radius: 19px;display: inline-block;}
.cbt:hover{background-color: #ff3f68;color: #fff;border:1px solid #ff3f68;}

.el-dialog{width: 640px !important;}
.save_box{width: 530px;margin:0 auto;display: flex;justify-content: space-between;padding-bottom: 100px;text-align: center;align-items: center;}
.save_box_span{width: 192px;height: 38px;line-height: 38px;text-align: center;color: #535353;border:1px solid #535353;font-size: 16px;border-radius: 19px;display: inline-block;cursor: pointer;margin:0 auto;}
.save_box_span:hover{background-color: #ff3f68;color: #fff;}
.mianze p{text-indent: 2em;}
.re{border: 1px solid #ff3f68;color: #ff3f68;}
</style>
