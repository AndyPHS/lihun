<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="w-full bg-color relative" v-loading="fullscreenLoading">
      <div class="w py-10">
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
                <div v-if="this.status_code ==200">
                  <div id="outputwordmsg" v-html="outputWord"></div>
                </div>
              </div>
              <div class="my-4 save_box">
                <span class="save_box_span" @click='SaveQuestionnaire'>保 存</span>
                <span class="save_box_span re" @click='DownLoadWord'>下载协议</span>
              </div>
            </div>
            <el-dialog title="免责条款" :visible.sync="dialogDownLoadWenJuan">
              <div class="text-left">
                <p class="leading-loose">1.办理离婚登记后，备案于民政局的离婚协议是生效的，很难反悔。因此，签订离婚协议书时要心平气和、保持理智，注意协议内容的合理性、合法性和可操作性，不要过于简单、宽泛。</p>
                <p class="leading-loose">2.双方系自愿离婚。一方或双方非自愿离婚的，本协议无效。</p>
                <p class="leading-loose">3.若房产仍在按揭贷款中的，在离婚协议书分割房产前，要注意银行是否同意变更主贷人或减少共同抵押人，以免离婚协议书约定无法实际执行。</p>
                <p class="leading-loose">4.对债务承担的约定，除非经债权人同意，否则该约定对债权人没有约束力，债权人依然有权要求夫妻双方对债务承担连带责任。</p>
                <p class="leading-loose">5.在离婚时，很难有证据证明对方存在隐瞒或转移夫妻共同财产的行为。因此，应明确对该行为所涉及财产的处置方式，便于事后追溯，以达到警戒及惩处的作用。</p>
                <p class="leading-loose">6.应约定违约条款，若给付义务人不按期履行，其就会受到罚息的压力，从而可以达到惩戒的目的。</p>
                <p class="leading-loose">7.离婚协议书不因双方签字盖章即生效，而是自正式离婚后生效。</p>
                <p class="leading-loose">8.把房产赠与孩子时需要注意一些风险：孩子成年后独自处分房产给父母带来不便的情形；房子没有办理过户时，房子所有权并没有转移，如果房产上存在其他纠纷，依然存在被其他第三人主张权利的风险；考虑孩子偏向对方，对自己产生不公平的情形。</p>
                <p class="leading-loose">9.孩子归夫妻双方共同抚养时，需要注意双方各自抚养的时间选择不能重合和有空档，否则日后会引起不必要的纠纷。</p>
              </div>
              <div>
              <el-checkbox v-model="form.type">我已核实上述内容并确认无误</el-checkbox>
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
              <h2 class="text-red-500 text-xl text-center py-8">确认已经保存该文件</h2>
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

  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import {outPutWord} from '@/api/api/AgreementRequest.js' // 离婚协议书生成数据接口
import {getWord} from '@/api/api/AgreementRequest.js' // 起诉状生成数据接口
import {userUpdateQuestionnaire} from '@/api/api/AgreementRequest.js' // 修改离婚协议书
export default {
  name: 'CustomShengCheng',
  components: {
    'lihun-head': lihun_head
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
  mounted () {
    this.GetOutPutWord() // 获取离婚协议书
  },
  methods: {
    GetOutPutWord () { // 获取协议
      this.fullscreenLoading = true
      this.TitleMsg = '离婚协议书'
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
      this.dialogTiShi = true
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
    }

  }
}
</script>
<style >
.bg-color{background: #eee;}
.w{width: 1200px;margin:0 auto;}
.fanhuitianxie {top:34px;right: 44px;margin:0}
.fanhuitianxie span{width: 132px;height: 35px;font-size: 16px;text-align: center;line-height: 35px;border:1px solid #343434;color:#343434;border-radius: 18px;display: inline-block;}
.fanhuilist{position: absolute;top:127px;right: 44px;margin: 0;}
.fanhuilist span{width: 132px;height: 35px;font-size: 16px;text-align: center;line-height: 35px;border:1px solid #343434;color:#343434;border-radius: 18px;display: inline-block;}
.containermin{width:800px;}
.returnUserList{top:110px;right: 20px;}
.outputword{padding:20px;border:1px solid #ecf5ec;}
.outputword>h2{border-bottom: 1px solid #dbe2db;}
.outputword .msg{white-space:pre-wrap;}
#outputwordmsg{width: 900px;margin:0 20px}
#outputwordmsg p{font-weight:bolder !important;}
.returnUserList{top:110px;right: 20px;}
.tishi .el-dialog__header{text-align: left;padding-left: 50px;}
.tishi .el-dialog__header h2{font-size: 25px;}
.tishi .el-dialog__header .el-dialog__title{font-size: 25px;}
.tishi_bot{width:502px;margin:0 auto;display: flex;justify-content: space-between;}
.cbt{width: 218px;height: 38px;line-height: 38px;text-align: center;color: #535353;border:1px solid #535353;font-size: 16px;border-radius: 19px;display: inline-block;}

.el-dialog{width: 640px !important;}
.save_box{width: 430px;margin:0 auto;display: flex;justify-content: space-between;padding-bottom: 100px;}
.save_box_span{width: 192px;height: 38px;line-height: 38px;text-align: center;color: #535353;border:1px solid #535353;font-size: 16px;border-radius: 19px;display: inline-block;cursor: pointer;}

.re{background-color: #ff3f68;border: 1px solid #ff3f68;color: #fff;}
</style>
