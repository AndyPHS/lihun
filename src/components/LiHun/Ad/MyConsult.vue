<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="c_m_h flex justify-between items-center px-12">
        <h2>
          我的协议书
        </h2>
        <div class="c_m_h_r flex justify-between items-center">
          <span @click="dingzhiBtn"><router-link to="CustomAgreement">定制我的协议书</router-link></span>
          <router-link to="AgreementHelp">协议书定制说明</router-link>
          <a class="hover:text-blue-400" href="">协议书如何谈判</a>
          <!-- <span><router-link to="UserAgreement">协议书定制说明</router-link></span>
          <span>协议书如何谈判</span> -->
        </div>
      </div>
      <div class="c_m_m px-12">
        <div v-if="this.wenshuList.length !== 0 " class="c_m_m_m ">
          <div class="c_m_m_h flex justify-between items-center">
            <h2 class="w-1/2 text-center font-bold">协议书详情</h2>
            <div class="c_m_m_h_r w-1/2 flex justify-around items-center">
              <span class="w-1/3 inline-block text-center font-bold">版本</span>
              <span class="w-1/3 inline-block text-center font-bold">状态</span>
              <span class="w-1/3 inline-block text-center font-bold">操作</span>
            </div>
          </div>
          <ul>
            <li v-for="(item, index) in wenshuList" :key="index">
              <h4 class="flex justify-between items-center px-6">
                <div class="flex w-1/2">
                  <span class="inline-block">{{ item.UpdateTime }}</span>
                  <span class="inline-block ml-10">文书编号:{{ item.agreement_number }}</span>
                </div>
                <div class="w-1/6 flex justify-around items-center pl-5">
                  <span class="inline-block cursor-pointer underline text-blue-500 text-sm" @click="NewCopy(item, index)">创建副本</span>
                  <span class="inline-block cursor-pointer underline text-blue-500 text-sm" @click="DeleteWenJuan(item, index)">删除</span>
                </div>
              </h4>
              <div class="c_m_m_m_m flex justify-between items-center">
                <h2 class="w-1/2 overflow-hidden pl-6 text-left">
                  {{ item.title }}
                </h2>
                <div class="w-1/2 flex justify-around items-center">
                  <dl class="w-1/3">
                    <dt>第10版本</dt>
                    <dd>
                      查看历史版本
                    </dd>
                  </dl>
                  <dl v-if="item.complete == 2" class="w-1/3">
                    <dt>起草中</dt>
                    <dd @click="goOnTianxie(item.id)" class="text-red-300">
                      继续起草
                    </dd>
                  </dl>
                  <dl v-if="item.complete == 1" class="w-1/3 ">
                    <dt>起草完</dt>
                    <dd @click="goComplete(item.id)">
                      查看协议书
                    </dd>
                  </dl>
                  <!-- 已完成complete 1 -->
                  <div v-if="item.complete == 1" class="w-1/3 c_m_m_m_m_r flex justify-around">
                    <span @click="DownLoadWord(item.id)" class="inline-block">下 载</span>
                    <span v-if="item.status ==4" class="inline-block">已签订</span>
                    <span v-if="item.status ==5" class="inline-block">未签订</span>
                  </div>
                  <!-- 未完成 -->
                  <div v-if="item.complete == 2" class="w-1/3 c_m_m_m_m_r_n flex justify-around">
                    <span class="inline-block">下 载</span>
                    <span v-if="item.status ==4" class="inline-block">已签订</span>
                    <span v-if="item.status ==5" class="inline-block">未签订</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="no_consult ">
          <div class="w py-20">
            <img class="inline-block mb-6" src="../../../assets/images/lihun/no_consult_icon.png" alt="">
            <h3 class="text-base text-center">暂无协议书，可以点击<span class="inline-block text-red-500 underline cursor-pointer" @click="dingzhiBtn">定制我的协议书</span></h3>
          </div>
        </div>
        <!-- 下载时的免责 -->
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
        <!-- 新建副本 -->
        <el-dialog title="新建副本" :visible.sync="dialogNewCopy">
          <el-form :model="chooseList">
            <el-form-item label="副本名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="chooseList.title" class="w-2/3" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer tishi_bot pb-3">
            <span class="cbt" @click="canceldialogNewCopy">取 消</span>
            <span class="cbt re" @click="dialogNewCopyOk">确 定</span>
          </div>
        </el-dialog>
      </div>

    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import {userAddQuestionnaire} from '@/api/api/AgreementRequest.js'
import {selectUserQuestionnaire, getWord, userUpdateQuestionnaire, copyUserQuestionnaire} from '@/api/api/AgreementRequest.js'
export default {
  name: 'MyConsult',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      wenshuList: [],  // 文书汇总
      dialogDownLoadWenJuan: false, // 免责弹窗
      form: { // 免责条款
        type: false
      },
      dialogNewCopy: false, // 新建副本弹窗
      chooseList: {
        title: '' // 新建副本
      },
      formLabelWidth: '80px'
    }
  },
  mounted () {
    this.getWenShu()
  },
  methods: {
    dingzhiBtn () { // 点击定制协议跳转到小问卷页面
      localStorage.setItem('qid', 3)
      userAddQuestionnaire({
          qid: 3
        }).then((data) => {
          localStorage.setItem('quid', data.data.data)
          localStorage.setItem('questionnaireType', 1)
          this.$router.replace('/CustomAgreement')
        })
    },
    getWenShu () { // 查找用户文书
      selectUserQuestionnaire({
        qid: 3,
        status: 1
      }).then((data) => {
        if (data.data.status_code === 200) {
          this.wenshuList = data.data.data
        } else {
          this.$message({
            message: '协议获取失败，请联系管理员',
            type: 'error'
          })
        }
      })
    },
    goComplete (e) { // 点击查看协议跳转到生成协议页面
      localStorage.setItem('quid', e)
      this.$router.replace('/CustomShengCheng')
    },
    goOnTianxie (e) { // 点击继续起草
      localStorage.setItem('quid', e)
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
    DownLoadWord (e) { // 点击下载按钮
      localStorage.setItem('quid', e)
      this.dialogDownLoadWenJuan = true
    },
    DeleteWenJuan (item, index) { // 删除问卷
      localStorage.setItem('qid', item.id)
      this.$confirm('确认删除此文书版本?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.setItem('quid', item.id)
        userUpdateQuestionnaire({
          status: 2
        }).then((data) => {
          if (data.data.status_code == 200) {
            localStorage.removeItem('quid')
            this.wenshuList.splice(index, 1)
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
    NewCopy (item, index) { // 点击新建副本按钮
      this.dialogNewCopy = true
      this.chooseList.title = item.title
      localStorage.setItem('quid', item.id)
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
          this.$message({
            message: '新增副本成功',
            type: 'success',
            duration: 1000
          })
          this.getWenShu()
          this.dialogNewCopy = false
          this.chooseList.title = ''
        } else {
          this.$message.error('新增副本失败，请联系管理员')
        }
      }).catch((data) => {
        this.$message.error('重命名失败，请联系管理员')
      })
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height: 100vh;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;}
.c_m_h{height:109px;border-bottom: 2px solid #f2f4f7;margin-top: 39px;}
.c_m_h h2{width:143px;font-size: 25px;color:#535353;font-weight: bold;}
.c_m_h_r{width:542px;}
.c_m_h_r span{display: inline-block;width: 151px;height: 35px;border:1px solid #535353;text-align: center;line-height: 35px;border-radius: 18px;font-size:16px;color:#535353;font-weight: bold;}
.c_m_h_r span:hover{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;cursor:pointer}
.c_m_m_h{font-size: 18px;color:#535353;height: 78px;}
.c_m_m_m ul li h4{height: 33px;font-size: 12px;background-color: #f2f4f7;}
.c_m_m_m_m{height: 98px;}
.c_m_m_m_m h2{font-size: 22px;font-weight: bold;}
.c_m_m_m_m dl dt{font-size: 18px;}
.c_m_m_m_m dl dd{font-size: 14px;color:#979797;text-decoration: underline;cursor: pointer;}
.c_m_m_m_m dl dd.re{color:#ff7290;}
.c_m_m_m_m_r span{width: 58px;height: 24px;text-align: center;line-height: 24px;border-radius: 12px;border:1px solid #547ce0;color:#547ce0;font-size: 14px;}
.c_m_m_m_m_r span:hover{background-color: #547ce0;color:#fff;}
.c_m_m_m_m_r_n span{width: 58px;height: 24px;text-align: center;line-height: 24px;border-radius: 12px;border:1px solid #cfcfcf;color:#cfcfcf;font-size: 14px;}
.tishi_bot{width:502px;margin:0 auto;display: flex;justify-content: space-between;}
.cbt{width: 218px;height: 38px;line-height: 38px;text-align: center;color: #535353;border:1px solid #535353;font-size: 16px;border-radius: 19px;display: inline-block;}


.re{background-color: #ff3f68;border: 1px solid #ff3f68;color: #fff;}
</style>
