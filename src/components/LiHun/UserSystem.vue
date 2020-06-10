<template>
  <div>
    <head-menu ref="headMenu"></head-menu>
    <div class="container mx-auto">
      <div class="flex justify-between items-center py-5">
        <div class="head_left" v-show="questionnaireDemo==true">
          <div class="shai">筛选</div>
          <el-select v-model="questionnaireTypeSelect" @change="questionnaireTypeChange" placeholder="请选择">
            <el-option
              v-for="(item, index) in questionnaireType"
              :key="index"
              :label="item.index"
              :value="item">
            </el-option>
          </el-select>
          <el-select v-model="questionnaireSelecter" @change="questionnaireChange" placeholder="请选择">
            <el-option
              v-for="(item, index) in questionnaireAll"
              :key="index"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="">
          <el-button type="primary" plain @click="addNewWenJuan">新增问卷</el-button>
        </div>
      </div>


      <!-- 问卷列表 -->
      <div v-show='ListShow' class="relative">
        <div class="absolute right-0 delete">
          <i class="el-icon-delete"  @click="deleteWenJuanIcon"></i>
        </div>
        <el-table
          :data="this.QuestionnaireSelectArr"
          height="500"
          style="width: 100%">
          <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope" >
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="bottom">
                <p class="my-2 hover:text-blue-500 cursor-pointer" @click="Renaming(scope.$index, scope.row)">重命名</p>
                <p class="my-2 hover:text-blue-500 cursor-pointer" @click="NewCopy(scope.$index, scope.row)">新建副本</p>
                <p class="my-2 hover:text-blue-500 cursor-pointer" @click="ToHead(scope.$index, scope.row)">置顶（取消置顶）</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title }}</el-tag>
                  <i class="el-icon-more ml-2"></i>
                  <span v-if="scope.row.orderId == 1" class="ml-2 px-1 font-weight rounded-sm border border-red-800 text-red-800">顶</span>
                </div>
              </el-popover>

            </template>
          </el-table-column>
          <el-table-column
            label="历史版本"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="190">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;">{{scope.row.createdTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" >
              <el-button
                size="mini"
                @click="ViewWenJuan(scope.$index, scope.row)">查看</el-button>
              <el-button
                size="mini"
                @click="EditWenJuan(scope.$index, scope.row)">编辑</el-button>
              <!-- <el-button v-show="questionnaireTypeSelect =='起诉状类'"
                size="mini"
                @click="TestEditWenJuan(scope.$index, scope.row)">测试编辑</el-button>   -->
              <el-button
                size="mini"
                @click="DownLoadWenJuan(scope.$index, scope.row)">下载</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="DeleteWenJuan(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 回收站列表 -->
      <div v-show='DeleteShow'>
        <div class="cursor-pointer text-blue-500 text-left" @click='returnListShow'>返回文书列表</div>
        <el-table
          :data="QuestionnaireSelectDeleteArr"
          height="500"
          style="width: 100%">
          <el-table-column
            label="状态"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="名称"
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建人: {{ scope.row.userId }}</p>
                <p>创建时间: {{ scope.row.createdTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="历史版本"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">暂无</span>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="190">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;">{{scope.row.createdTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="RenewWenJuan(scope.$index, scope.row)">恢复</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="DeleteWasteWenJuan(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 查看问卷 -->
    <div class="chakan" v-show="dialogViewWenJuan">
      <div class="chakanbox">
        <div class="chakanmin">
          <h2>{{this.chooseList.title}}</h2>
          <div id="outputwordmsg" v-html="this.neirong"></div>
        </div>
        <span class="closechakan" @click="closedialogViewWenJuan">X</span>
      </div>
    </div>

    <!-- 下载弹框 -->
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceldialogDownLoadWenJuan">取 消</el-button>
        <el-button type="primary" @click="dialogDownLoadWenJuanOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 重命名 -->
    <el-dialog title="重新命名" :visible.sync="dialogRenamimg">
      <el-form :model="chooseList">
        <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="chooseList.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceldialogRenamimg">取 消</el-button>
        <el-button type="primary" @click="dialogRenamimgOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新建副本 -->
    <el-dialog title="新建副本" :visible.sync="dialogNewCopy">
      <el-form :model="chooseList">
        <el-form-item label="副本名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="chooseList.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="canceldialogNewCopy">取 消</el-button>
        <el-button type="primary" @click="dialogNewCopyOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改问卷弹出框 -->
   <!--  <el-dialog title="修改问卷" :visible.sync="dialogEditWenJuan">
      <el-form :model="addMsg">
         <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" :label-width="formLabelWidth" class="mb-1">
          <el-select v-model="addMsg.type" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionnaireType"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能用途" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.purpose" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
            <el-radio-group v-model="addMsg.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditQuestionnaire">取 消</el-button>
        <el-button type="primary" @click="EditQuestionnaireOk">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>

</template>
<script>
import HeadMenu from '@/components/HeadMenu' // 添加公共头部
import {questionnaire} from '@/api/api/requestLogin.js' // 获取问卷类型
import {selectUserQuestionnaire} from '@/api/api/requestLogin.js' // 查找用户问卷
import {selectUserDeleteQuestionnaire} from '@/api/api/requestLogin.js' // 查找用户回收站
import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js' // 修改用户问卷
import {outPutWord} from '@/api/api/requestLogin.js' // 生成数据
import {userAddQuestionnaire} from '@/api/api/requestLogin.js' // 新增用户问卷
import {copyUserQuestionnaire} from '@/api/api/requestLogin.js' // 新增副本
import {questionnaireSelect} from '@/api/api/requestLogin.js' // 查询问卷
import {userUpdateOrderId} from '@/api/api/requestLogin.js' // 置顶

import {addQuestionnaire} from '@/api/api/requestLogin.js' // 新增问卷
import {updateQuestionnaire} from '@/api/api/requestLogin.js' // 新增问卷
import {deleteQuestionnaire} from '@/api/api/requestLogin.js' // 删除问卷

// import {answer} from '@/api/api/requestLogin.js'
export default {
  data () {
    return {
      neirong:'',
      questionnaireDemo: true,
      questionnaireType: {}, // 问卷数组类型
      chooseQuestionnaireType: null, // 选择的数组类型
      questionnaireTypeSelect: '', // 选择问卷数组类型
      questionnaireTypeSelectNum: null, // 选择问卷数组类型数字
      questionnaireSelecter: null, // 选择问卷
      statusType: 1, // 状态 1正常 2回收站
      questionnaireAll: [], // 问卷类型
      QuestionnaireSelectArr: [], // 获取问卷
      QuestionnaireSelectDeleteArr: [], // 获取垃圾筐内的问卷列表
      dialogDownLoadWenJuan: false, // 点击下载弹出免责弹窗
      form: { // 是否阅读免责条款
        type: false
      },
      ListShow: true, // 用户列表
      DeleteShow: false, // 回收站用户列表
      chooseList: {
        title: '这是标题',
        exemption: '这是免责条款', // 免责条款 0未填写 1填写
        qid: null, // 问卷id
        status: null, // 状态 1正常 2回收站 3彻底删除
        content: '这是内容', // 内容
        orderId: null, // 是否置顶 1置顶 0不置顶
        complete: null // 是否完成 0未完成 1完成
      },
      dialogViewWenJuan: false, // 查看问卷
      dialogRenamimg: false, // 重命名弹窗
      dialogNewCopy: false, // 新建副本
      formLabelWidth: '80px', // 表单标签宽度
      // dialogEditWenJuan: false,  // 编辑问卷弹框
      addMsg: { // 新增问卷字段
        title: '', // 标题
        type: null, // 问卷类型
        description: '', // 备注
        purpose: '', // 用途
        status: null // 是否禁止访问
      }
    }
  },
  name: 'WenJuan',
  components: {
    HeadMenu
  },
  mounted () {
    this.getQuestionnaire() // 获取问卷类型
    this.getSelectUserQuestionnaire() // 查找用户问卷
  },
  methods: {
    getSelectUserQuestionnaire () { // 查找用户问卷
      selectUserDeleteQuestionnaire({
        status: 1
      }).then((data) => {
        if (data.data.status_code == 200) {
          this.QuestionnaireSelectArr = data.data.data
          this.statusType = 1
        } else {
          this.$message({
            message: '问卷获取失败',
            type: 'error'
          })
        }
      })
    },
    objOfValueToArr(object) {
        var arr = [];
        var i = 0;
        for (var item in object) {
            arr[i] = object[item];
            i++;
        }
        return arr;
    },
    getQuestionnaire () { // 获取问卷类型
      // 获取子组件数据
      const roleType = localStorage.getItem("roleType")
      if(roleType=='questionnaireDemo'){
        this.questionnaireDemo = false;
        this.questionnaireSelecter = 3;
      }
      localStorage.getItem("roleType")
      questionnaire().then((data) => {
        if (data.data.status_code == 200) {
          this.questionnaireType = data.data.data.questionnaireType
          // console.log(this.questionnaireType)
        } else {
          this.$message({
            message: '问卷类型获取失败',
            type: 'error'
          })
        }
        // console.log(this.QuestionnaireSelectArr)
      }).catch((data) => {

      })
    },
    questionnaireTypeChange () {
      if (this.questionnaireTypeSelect == '协议书类') {
        localStorage.setItem('questionnaireType', 1)
        this.questionnaireTypeSelectNum = 1
      } else if (this.questionnaireTypeSelect == '起诉状类') {
        localStorage.setItem('questionnaireType', 2)
        this.questionnaireTypeSelectNum = 2
      } else if (this.questionnaireTypeSelect == '申请书类') {
        localStorage.setItem('questionnaireType', 3)
        this.questionnaireTypeSelectNum = 3
      }
      questionnaireSelect({
        type: this.questionnaireTypeSelectNum
      }).then((data) => {
        this.questionnaireAll = data.data.data
      }).catch((data) => {

      })
      // console.log(this.questionnaireTypeSelect)
    },
    questionnaireChange () {
      selectUserQuestionnaire({
        qid: this.questionnaireSelecter,
        status: 1
      }).then((data) => {
        if (data.data.status_code == 200) {
          // console.log(data.data.data)
          this.QuestionnaireSelectArr = data.data.data
          this.statusType = 1
          // console.log(this.QuestionnaireSelectArr)
        } else {
          this.$message({
            message: '问卷获取失败',
            type: 'error'
          })
        }
      }).catch((data) => {

      })
    },
    ViewWenJuan (index, row) { // 点击查看问卷
      this.chooseList.content = ''
      this.dialogViewWenJuan = true
      localStorage.setItem('quid', row.id)
      this.chooseList.title = row.title
      outPutWord().then((data) => {
        if (data.data.status_code == 200) {
          // localStorage.removeItem('quid');
          this.neirong = data.data.data.content
        } else if (data.data.status_code == 330) {
          this.$message({
            message: '问卷未填写完，无法查看',
            type: 'error'
          })
        } else {
          this.$message({
            message: '获取失败请联系后台',
            type: 'error'
          })
        }
      }).catch((data) => {

      })
    },
    closedialogViewWenJuan(){
      this.dialogViewWenJuan = false;
    },
    deleteWenJuanIcon () { // 点击回收站按钮
      this.ListShow = false
      this.DeleteShow = true
      this.questionnaireTypeSelect = ''
      // this.questionnaireSelect = null
      selectUserDeleteQuestionnaire({
        // qid: this.questionnaireSelect,
        status: 2
      }).then((data) => {
        if (data.data.status_code == 200) {
          this.QuestionnaireSelectDeleteArr = data.data.data
          this.statusType = 2
          // console.log(this.QuestionnaireSelectDeleteArr)
        } else {
          this.$message({
            message: '问卷获取失败',
            type: 'error'
          })
        }
      }).catch((data) => {

      })
    },
    returnListShow () {
      this.ListShow = true
      this.DeleteShow = false
      this.getSelectUserQuestionnaire()
    },
    addNewWenJuan () { // 新增问卷
      if (this.questionnaireSelecter == null) {
        this.$message({
          message: '请先选择需要新增的问卷类型',
          type: 'error'
        })
      } else {
        localStorage.setItem('qid', this.questionnaireSelecter)
        userAddQuestionnaire({
          qid: this.questionnaireSelecter
        }).then((data) => {
          localStorage.setItem('quid', data.data.data)
          // localStorage.removeItem('qid');
          if (this.questionnaireSelecter == 9) { // 继承纠纷诉状跳转页面
            localStorage.setItem('questionnaireType', 2) // 1代表协议书类，2代表起诉状类 ，3申请书类
            this.$router.replace('/JiChengJiuFenStart')
          } else if (this.questionnaireSelecter == 10) { // 离婚起诉状跳转页面
            localStorage.setItem('questionnaireType', 2) // 1代表协议书类，2代表起诉状类 ，3申请书类
            this.$router.replace('/QiSuBasicInformation')
          } else if (this.questionnaireSelecter == 3) { // 离婚协议书跳转页
            localStorage.setItem('questionnaireType', 1)
            this.$router.replace('/ChuShi')
          } else if (this.questionnaireSelecter == 17) { // 婚前财产协议书跳转页
            localStorage.setItem('questionnaireType', 1)
            this.$router.replace('/HunQianStart')
          } else if (this.questionnaireSelecter == 19) { // 婚内财产协议书跳转页
            localStorage.setItem('questionnaireType', 1)
            this.$router.replace('/HunNeiStart')
          } else if (this.questionnaireSelecter == 16) { // 调查取证申请书
            localStorage.setItem('questionnaireType', 3)
            this.$router.replace('/DiaoChaQuZhengStart')
          } else if (this.questionnaireSelecter == 20) { // 保全申请书
            localStorage.setItem('questionnaireType', 3)
            this.$router.replace('/BaoQuanStart')
          } else if (this.questionnaireSelecter == 21) { // 抚养权起诉状
            localStorage.setItem('questionnaireType', 2)
            this.$router.replace('/FuYangQuanBasic')
          } else if (this.questionnaireSelecter == 22) { // 抚养费起诉状
            localStorage.setItem('questionnaireType', 2)
            this.$router.replace('/FuYangFeiBasic')
          } else if (this.questionnaireSelecter == 23) { // 分家析产纠纷起诉状
            localStorage.setItem('questionnaireType', 2)
            this.$router.replace('/FenJiaXiChanStart')
          } else if (this.questionnaireSelecter == 24) { // 民间借贷纠纷起诉状
            localStorage.setItem('questionnaireType', 2)
            this.$router.replace('/MinJianJieDaiBasic')
          } else if (this.questionnaireSelecter == 25) { // 证人出庭作证申请书
            localStorage.setItem('questionnaireType', 3)
            this.$router.replace('/ZhengRenChuTingBasic')
          } else if (this.questionnaireSelecter == 26) { // 评估申请书
            localStorage.setItem('questionnaireType', 3)
            this.$router.replace('/PingGuStart')
          } else if (this.questionnaireSelecter == 27) { // 婚后财产纠纷起诉状
            localStorage.setItem('questionnaireType', 2)
            this.$router.replace('/HunHouCaiChanStart')
          } else if (this.questionnaireSelecter == 28) { // 笔迹鉴定申请书
            localStorage.setItem('questionnaireType', 3)
            this.$router.replace('/BiJiJianDingBasic')
          } else if (this.questionnaireSelecter == 29) { // 精神状态鉴定申请书
            localStorage.setItem('questionnaireType', 3)
            this.$router.replace('/JingShenZhuangTaiBasic')
          }
        }).catch((data) => {
        })
      }
    },
    EditWenJuan (index, row) { // 点击修改问卷
      localStorage.setItem('quid', row.id) // 获取文本内容用
      localStorage.setItem('qid', row.qid) // 查询标签时候用
      if (row.qid == 3) { // 离婚协议书
        localStorage.setItem('questionnaireType', 1)
        this.$router.replace('/BasicInformation')
      } else if (row.qid == 9) { // 继承纠纷起诉状
        localStorage.setItem('questionnaireType', 2)
        this.$router.replace('/JiChengJiuFenBasic')
      } else if (row.qid == 17) { // 婚前财产协议
        localStorage.setItem('questionnaireType', 1)
        this.$router.replace('/HunQianBasic')
      } else if (row.qid == 19) { // 婚内财产协议
        localStorage.setItem('questionnaireType', 1)
        this.$router.replace('/HunNeiBasic')
      } else if (row.qid == 10) { // 离婚起诉状
        if (row.complete == 2) {
          this.$router.replace('/QiSuBasicInformation')
        } else {
          this.$router.replace('/QiSuComplate')
        }
        localStorage.setItem('questionnaireType', 2)
      } else if (row.qid == 21) { // 抚养权起诉状
        if (row.complete == 2) {
          this.$router.replace('/FuYangQuanBasic')
        } else {
          this.$router.replace('/FuYangQuanPersonalize')
        }
        localStorage.setItem('questionnaireType', 2)
      } else if (row.qid == 22) { // 抚养费起诉状
        if (row.complete == 2) {
          this.$router.replace('/FuYangFeiBasic')
        } else {
          this.$router.replace('/FuYangFeiPersonalize')
        }
        localStorage.setItem('questionnaireType', 2)
      } else if (row.qid == 23) { // 分家析产起诉状
        if (row.complete == 2) {
          this.$router.replace('/FenJiaXiChanBasic')
        } else {
          this.$router.replace('/FenJiaXiChanPersonalize')
        }
        localStorage.setItem('questionnaireType', 2)
      } else if (row.qid == 24) { // 民间借贷纠纷起诉状
        if (row.complete == 2) {
          this.$router.replace('/MinJianJieDaiBasic')
        } else {
          this.$router.replace('/MinJianJieDaiPersonalize')
        }
        localStorage.setItem('questionnaireType', 2)
      } else if (row.qid == 16) { // 调查取证申请书
        if (row.complete == 2) {
          this.$router.replace('/DiaoChaQuZhengBasic')
        } else {
          this.$router.replace('/DiaoChaQuZhengPersonalize')
        }
        localStorage.setItem('questionnaireType', 3)
      } else if (row.qid == 20) { // 保全申请书
        if (row.complete == 2) {
          this.$router.replace('/BaoQuanBasic')
        } else {
          this.$router.replace('/BaoQuanPersonalize')
        }
        localStorage.setItem('questionnaireType', 3)
      } else if (row.qid == 25) { // 证人出庭作证申请书
        if (row.complete == 2) {
          this.$router.replace('/ZhengRenChuTingBasic')
        } else {
          this.$router.replace('/ZhengRenChuTingPersonalize')
        }
        localStorage.setItem('questionnaireType', 3)
      } else if (row.qid == 26) { // 评估申请书
        localStorage.setItem('questionnaireType', 3)
        if (row.complete == 2) {
          this.$router.replace('/PingGuBasic')
        } else {
          this.$router.replace('/PingGuPersonalize')
        }
      } else if (row.qid == 27) { // 婚后财产纠纷起诉状
        localStorage.setItem('questionnaireType', 2)
        if (row.complete == 2) {
          this.$router.replace('/HunHouCaiChanBasic')
        } else {
          this.$router.replace('/HunHouCaiChanPersonalize')
        }
      } else if (row.qid == 28) { // 笔迹鉴定申请书
        localStorage.setItem('questionnaireType', 3)
        if (row.complete == 2) {
          this.$router.replace('/BiJiJianDingBasic')
        } else {
          this.$router.replace('/BiJiJianDingPersonalize')
        }
      } else if (row.qid == 29) { // 精神状态鉴定申请书
        localStorage.setItem('questionnaireType', 3)
        if (row.complete == 2) {
          this.$router.replace('/JingShenZhuangTaiBasic')
        } else {
          this.$router.replace('/JingShenZhuangTaiPersonalize')
        }
      } else { // 其他数据的提示
        this.$message({
          message: '此数据为垃圾数据，不做处理',
          type: 'error'
        })
      }
    },

    canceldialogDownLoadWenJuan () { // 点击下载弹框中取消按钮
      this.dialogDownLoadWenJuan = false
    },
    DownLoadWenJuan (index, row) { // 点击下载按钮进行下载
      localStorage.setItem('quid', row.id)
      this.dialogDownLoadWenJuan = true
    },
    dialogDownLoadWenJuanOk () {
      if (this.form.type) {
        outPutWord().then((data) => {
          if (data.status == 200) {
            window.open('http://office365.aladdinlaw.com:3921/word/' + data.data.data.wordFilePath)
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
    DeleteWenJuan (index, row) { // 删除问卷
      localStorage.setItem('qid', row.qid)
      this.$confirm('此操作将把文件放入回收站, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.setItem('quid', row.id)
        userUpdateQuestionnaire({
          status: 2
        }).then((data) => {
          if (data.data.status_code == 200) {
            localStorage.removeItem('quid')
            this.QuestionnaireSelectArr.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error('删除失败，请联系后台小姐姐')
          }
        }).catch((data) => {
          this.$message.error('删除失败，请联系后台小姐姐')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    RenewWenJuan (index, row) { // 点击回收站里边的恢复文件按钮 恢复操作
      this.$confirm('确认恢复此文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.setItem('quid', row.id)
        userUpdateQuestionnaire({
          status: 1
        }).then((data) => {
          if (data.data.status_code == 200) {
            localStorage.removeItem('quid')
			var qid = this.questionnaireSelecter
			if(qid==null){
				this.getSelectUserQuestionnaire();
			}else{
				this.questionnaireChange()
			}
            this.deleteWenJuanIcon()
            this.$message({
              message: '恢复成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error('恢复失败，请联系管理员')
          }
        }).catch((data) => {
          this.$message.error('恢复失败，请联系管理员')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消恢复'
        })
      })
    },
    DeleteWasteWenJuan (index, row) { // 点击回收站里边的删除文件按钮 删除操作
      this.$confirm('此操作将彻底删除文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.setItem('quid', row.id)
        userUpdateQuestionnaire({
          status: 3
        }).then((data) => {
          if (data.data.status_code == 200) {
            localStorage.removeItem('quid')
            this.deleteWenJuanIcon()
			var qid = this.questionnaireSelecter
			if(qid==null){
				this.getSelectUserQuestionnaire();
			}else{
				this.questionnaireChange()
			}
            this.selectUserDeleteQuestionnaire()
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            })
          } else {
            this.$message.error('删除失败，请联系管理员')
          }
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
    Renaming (index, row) { // 点击重命名按钮
      this.dialogRenamimg = true
      this.chooseList.title = row.title
      localStorage.setItem('quid', row.id)
    },
    canceldialogRenamimg () { // 点击重命名弹窗取消按钮
      this.dialogRenamimg = false
      this.chooseList.title = ''
    },
    dialogRenamimgOk () { // 点击重命名弹窗确定按钮
      userUpdateQuestionnaire({
        title: this.chooseList.title
      }).then((data) => {
        if (data.data.status_code == 200) {
          localStorage.removeItem('quid')
          var qid = this.questionnaireSelecter
          if(qid==null){
          	this.getSelectUserQuestionnaire();
          }else{
          	this.questionnaireChange()
          }
          this.$message({
            message: '重命名成功',
            type: 'success',
            duration: 1000
          })
          this.dialogRenamimg = false
          this.chooseList.title = ''
        } else {
          this.$message.error('重命名失败，请联系管理员')
        }
      }).catch((data) => {
        this.$message.error('重命名失败，请联系管理员')
      })
    },
    NewCopy (index, row) { // 点击新建副本按钮
      this.dialogNewCopy = true
      this.chooseList.title = row.title
      localStorage.setItem('quid', row.id)
    },
    canceldialogNewCopy () { // 点击新建副本弹窗取消按钮
      this.dialogNewCopy = false
    },
    dialogNewCopyOk () { // 点击新建副本弹窗确定按钮
      copyUserQuestionnaire({
        title: this.chooseList.title
      }).then((data) => {
        if (data.data.status_code == 200) {
          localStorage.removeItem('quid')
          var qid = this.questionnaireSelecter
          if(qid==null){
          	this.getSelectUserQuestionnaire();
          }else{
          	this.questionnaireChange()
          }
          this.$message({
            message: '新增副本成功',
            type: 'success',
            duration: 1000
          })
          this.dialogNewCopy = false
          this.chooseList.title = ''
        } else {
          this.$message.error('新增副本失败，请联系管理员')
        }
      }).catch((data) => {
        this.$message.error('重命名失败，请联系管理员')
      })
    },
    ToHead (index, row) { // 点击置顶
      localStorage.setItem('quid', row.id)
      this.chooseList.orderId = row.orderId
      userUpdateOrderId().then((data) => {
        if (data.data.status_code == 200) {
          localStorage.removeItem('quid')
          // this.questionnaireChange()
          if (this.chooseList.orderId == 1) {
            this.$message({
              message: '取消置顶',
              type: 'success',
              duration: 1000
            })
            var qid = this.questionnaireSelecter
            if(qid==null){
            	this.getSelectUserQuestionnaire();
            }else{
            	this.questionnaireChange()
            }
          } else {
            this.$message({
              message: '置顶成功',
              type: 'success',
              duration: 1000
            })
            var qid = this.questionnaireSelecter
            if(qid==null){
            	this.getSelectUserQuestionnaire();
            }else{
            	this.questionnaireChange()
            }
          }
          this.dialogNewCopy = false
          this.chooseList.title = ''
        } else {
          this.$message.error('置顶失败，请联系管理员')
        }
      }).catch((data) => {

      })
    }
  }
}
</script>
<style scoped>
.head_left{width:500px;display: flex;justify-content: space-between;align-items: center;margin: 1rem 0;}
.head_left .shai{width:100px;}
.el-select {margin-right: 10px !important;}
.ban{width:220px !important;}
.delete{top:10px;z-index: 1;right: 30px;cursor: pointer;}
.el-form-item{margin-bottom:10px !important;}
.chakan{width: 100vw;height: 100vh;background-color: rgba(0,0,0,0.5);position: fixed;top:0;left: 0;}
.chakanbox{width: 760px;height: 500px;position: absolute;top:55%;left: 50%;margin-top:-300px;margin-left: -380px;background-color: #fff;padding:20px;}
.chakanmin h2{font-size: 20px; font-weight: bold;color: #000000;padding:10px;border-bottom: 1px solid #dddddd;}
#outputwordmsg{height: 400px;overflow-y:scroll;white-space: pre-wrap;text-align: left;}
#outputwordmsg p{font-weight:bolder !important;}
.closechakan{position: absolute;top: 0;right: 0;margin: 10px 15px;cursor: pointer;}
</style>
