<template>
  <div class="w-full bg-color relative">
    <div class=" containermin mx-auto py-10">
      <div class="bg-white rounded-lg">
        <div class="outputword rounded-lg shadow-lg relative">
          <h2 class="py-2 text-2xl font-bold">{{ this.TitleMsg }}</h2>
          <div class="absolute top-0 right-0 mt-4 mr-6">
            <el-button class="text-right" type="primary" @click="GoBasicInformationPage">返回填写</el-button>
            <el-button class="text-right" type="primary" v-if="this.questionnaireType == 2 || this.questionnaireType == 3" @click="GoPersonalPage">返回个性化修改</el-button>
          </div>
          <div class="w-full">
            <div class="text-left px-4 py-3 msg">
              <div  class="w-2/3" v-if="this.status_code ==330">
                <h2>以下<span class="text-red-500">必填项</span>未填写，请<span  @click="GoBasicInformationPage" class="text-blue-600">返回继续填写</span></h2>
                <ul>
                  <li v-for="(item, index) in missField" :key="index">{{index+1}}、{{item.problemTitle}}</li>
                </ul>
              </div>
              <div v-if="this.status_code ==200" >
                <div id="outputwordmsg" v-html="outputWord"></div>
              </div>
              <div>
                <ul>
                  <li class="pb-2 text-left"  v-for="(item, index) in this.QiSuContent" :key="index">
                      <div  v-show="item.status == 1" v-html='item.content'></div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="my-4">
              <!-- <el-button class="text-right" type="primary" @click='DownLoadWord'>
                修改
              </el-button> -->
              <el-button class="text-right" type="primary" @click='SaveQuestionnaire'>
                保存
              </el-button>
              <el-button  class="text-right" type="primary" @click='DownLoadWord'>
                {{ downLoadBtnMsg }}
              </el-button>
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
            <div slot="footer" class="dialog-footer">
              <el-button @click="canceldialogDownLoadWenJuan">取 消</el-button>
              <el-button type="primary" @click="dialogDownLoadWenJuanOk">确 定</el-button>
            </div>
          </el-dialog>
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
        </div>
      </div>
    </div>
    <div class="absolute returnUserList right-0">
      <el-button type="primary" @click="returnUserList">返回文书列表</el-button>
      <el-button type="primary" @click="saveWenShu">保存</el-button>
    </div>
  </div>

</template>
<script>

  import {outPutWord} from '@/api/api/requestLogin.js'  // 离婚协议书生成数据接口
  import {getWord} from '@/api/api/requestLogin.js'  // 起诉状生成数据接口
  import {selectUqContent} from '@/api/api/requestLogin.js'  // 获取文本内容
  import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改离婚协议书


  export default {
      data () {
          return {
           questionnaireType:localStorage.getItem('questionnaireType'), // 问卷类型1 协议书类 2起诉状类，3申请书类
           downloadMsg: '', // 后台返回的下载资源
           outputWord: '',  // 获取离婚协议书
           QiSuContent: [],  // 起诉状内容
           TitleMsg: '',     // 标题
           downLoadBtnMsg: '', // 下载按钮文字
           status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
           dialogDownLoadWenJuan: false,  // 点击下载弹出免责弹窗
           form:{
            type: false
           },
            formLabelWidth: '80px',   // 表单标签宽度
           dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
           userWenJuan:{ // 修改用户问卷
            qid: null, // 问卷id
            status: null,  // 状态 1正常 2回收站 3彻底删除
            content: '',  // 内容
            title: '',     // 标题
            exemption: null, // 免责条款 0未填写 1填写
            complete: null   // 是否完成 0未完成 1完成
           },
           missField: [] ,// 未填写项目
           isGoBack: false   // 点击取消是否需要跳转
          }
      },
      name: 'WenJuan2',

      mounted () {
        this.GetOutPutWord () // 获取离婚协议书
      },
      methods: {
        GetOutPutWord () {   // 获取协议
          if(localStorage.getItem('questionnaireType')==1){ // 协议书类
            if(localStorage.getItem('qid')==3){
              this.TitleMsg = '离婚协议书';
            }else if(localStorage.getItem('qid')==17){
              this.TitleMsg = '婚前财产协议书';
            }else if(localStorage.getItem('qid')==19){
              this.TitleMsg = '婚内财产协议书';
            }
            this.downLoadBtnMsg = '下载协议';
            outPutWord().then((data)=>{
              this.status_code = data.data.status_code
              if(this.status_code == 330 ){
                  this.missField = data.data.data
              }else if(this.status_code == 200){
                  this.outputWord = data.data.data.content
              }

            }).catch((data)=>{
                // this.$router.replace("/");
            })
          }else if(localStorage.getItem('questionnaireType')==2 ){  // 起诉状类
            if(localStorage.getItem('qid')==10 ){
              this.TitleMsg = '离婚起诉状';
            }else if(localStorage.getItem('qid')==9 ){
              this.TitleMsg = '继承纠纷起诉状';
            }else if(localStorage.getItem('qid')==21 ){
              this.TitleMsg = '抚养权起诉状';
            }else if(localStorage.getItem('qid')==22 ){
              this.TitleMsg = '抚养费起诉状';
            }else if(localStorage.getItem('qid')==23 ){
              this.TitleMsg = '分家析产纠纷起诉状';
            }else if(localStorage.getItem('qid')==24 ){
              this.TitleMsg = '民间借贷起诉状';
            }else if(localStorage.getItem('qid')==27 ){
              this.TitleMsg = '离婚后财产纠纷起诉状';
            }

            this.downLoadBtnMsg = '下载起诉状';
            selectUqContent().then((data)=>{
              if(data.data.status_code == 200){
                 this.QiSuContent = data.data.data.content
              }else{
                  this.$message({
                    message: '获取获取文本失败',
                    type: 'error'
                  });
              }
            }).catch((data)=>{

            })
          }else if(localStorage.getItem('questionnaireType')==3){// 申请书类
            if(localStorage.getItem('qid')==16){
              this.TitleMsg = '调查取证申请书';
            }else if(localStorage.getItem('qid')==20){
              this.TitleMsg = '保全申请书';
            }else if(localStorage.getItem('qid')==25 ){
              this.TitleMsg = '证人出庭作证申请书';
            }else if(localStorage.getItem('qid')==26 ){
              this.TitleMsg = '评估申请书';
            }else if(localStorage.getItem('qid')==28 ){
              this.TitleMsg = '笔迹鉴定申请书';
            }else if(localStorage.getItem('qid')==29 ){
              this.TitleMsg = '精神状态鉴定申请书';
            }
            this.downLoadBtnMsg = '下载申请书';
            selectUqContent().then((data)=>{
              if(data.data.status_code == 200){
                 this.QiSuContent = data.data.data.content
              }else{
                  this.$message({
                    message: '获取获取文本失败',
                    type: 'error'
                  });
              }
            }).catch((data)=>{

            })
          }

        },
        GoBasicInformationPage(){   // 点击返回基本信息
          if(localStorage.getItem('qid')==3){ //离婚协议书
           this.$router.replace("/BasicInformation");
          }else if(localStorage.getItem('qid')==17){ // 婚前财产协议书
           this.$router.replace("/HunQianBasic");
          }else if(localStorage.getItem('qid')==19){ // 婚内财产协议书
           this.$router.replace("/HunNeiBasic");
          }else if(localStorage.getItem('qid')==10){ // 离婚起诉状
           this.$router.replace("/QiSuBasicInformation");
          }else if(localStorage.getItem('qid')==9){ // 继承纠纷起诉状
             this.$router.replace("/JiChengJiuFenBasic");
          }else if(localStorage.getItem('qid')==16){ // 调查取证申请书
           this.$router.replace("/DiaoChaQuZhengBasic");
          }else if(localStorage.getItem('qid')==20){ // 保全申请书
           this.$router.replace("/BaoQuanBasic");
          }else if(localStorage.getItem('qid')==21){ // 抚养权起诉状
           this.$router.replace("/FuYangQuanBasic");
          }else if(localStorage.getItem('qid')==22){ // 抚养费起诉状
           this.$router.replace("/FuYangFeiBasic");
          }else if(localStorage.getItem('qid')==23){ // 分家析产纠纷起诉状
           this.$router.replace("/FenJiaXiChanBasic");
          }else if(localStorage.getItem('qid')==24){ // 民间借贷起诉状
           this.$router.replace("/MinJianJieDaiBasic");
          }else if(localStorage.getItem('qid')==25){ // 证人出庭作证申请书
           this.$router.replace("/ZhengRenChuTingBasic");
          }else if(localStorage.getItem('qid')==26){ // 评估申请书
           this.$router.replace("/PingGuBasic");
          }else if(localStorage.getItem('qid')==27){ // 离婚后财产纠纷起诉状
           this.$router.replace("/HunHouCaiChanBasic");
          }else if(localStorage.getItem('qid')==28){ // 笔迹鉴定申请书
           this.$router.replace("/BiJiJianDingBasic");
          }else if(localStorage.getItem('qid')==29){ // 精神状态鉴定申请书
           this.$router.replace("/JingShenZhuangTaiBasic");
          }else{
            this.$message({
              message: '请先确定问卷类型，然后返回到具体填写页面，请联系前端管理员操作',
              type: 'error'
            });
          }
        },
        GoPersonalPage(){ // 申请书类和起诉状类有返回个性化页面
          if(localStorage.getItem('qid')==9){ //继承纠纷起诉状个性化页面
           this.$router.replace("/JiChengJiuFenPersonalize");
          }else if(localStorage.getItem('qid')==10){ // 离婚起诉状个性化页面
           this.$router.replace("/QiSuComplate");
          }else if(localStorage.getItem('qid')==16){ // 调查取证申请书个性化页面
           this.$router.replace("/DiaoChaQuZhengPersonalize");
          }else if(localStorage.getItem('qid')==20){ // 保全申请书个性化页面
           this.$router.replace("/BaoQuanPersonalize");
          }else if(localStorage.getItem('qid')==21){ // 抚养权起诉状个性化页面
           this.$router.replace("/FuYangQuanPersonalize");
          }else if(localStorage.getItem('qid')==22){ // 抚养费起诉状个性化页面
           this.$router.replace("/FuYangFeiPersonalize");
          }else if(localStorage.getItem('qid')==23){ // 分家析产纠纷起诉状
           this.$router.replace("/FenJiaXiChanPersonalize");
          }else if(localStorage.getItem('qid')==24){ // 民间借贷起诉状
           this.$router.replace("/MinJianJieDaiPersonalize");
          }else if(localStorage.getItem('qid')==25){ // 证人出庭作证申请书
           this.$router.replace("/ZhengRenChuTingPersonalize");
          }else if(localStorage.getItem('qid')==26){ // 评估申请书
           this.$router.replace("/PingGuPersonalize");
          }else if(localStorage.getItem('qid')==27){ // 离婚后财产纠纷起诉状
           this.$router.replace("/HunHouCaiChanPersonalize");
          }else if(localStorage.getItem('qid')==28){ // 笔迹鉴定申请书
           this.$router.replace("/BiJiJianDingPersonalize");
          }else if(localStorage.getItem('qid')==29){ // 精神状态鉴定申请书
           this.$router.replace("/JingShenZhuangTaiPersonalize");
          }else{
            this.$message({
              message: '返回失败，请先确定问卷类型，然后返回到指定页面',
              type: 'error'
            });
          }
        },
        dialogDownLoadWenJuanOk(){   // 点击下载弹出确定按钮
          if(this.form.type){
            if(localStorage.getItem('questionnaireType')==1){
              outPutWord().then((data)=>{ // 协议书类的下载路径
                if(data.status==200){
                  window.open('http://office365.aladdinlaw.com:3921/word/'+ data.data.data.wordFilePath)
                }
                this.dialogDownLoadWenJuan = false;
              }).catch((data)=>{
                this.$message({
                  message: '下载失败,请联系管理员',
                  type: 'error'
                });
              })
            }else if(localStorage.getItem('questionnaireType')==2 || localStorage.getItem('questionnaireType')==3 ){
              getWord().then((data)=>{ // 申请书和起诉状等有个性化页面的下载路径
                if(data.data.status_code==200){
                  window.open('http://office365.aladdinlaw.com:3921/word/'+ data.data.data)
                }
                this.dialogDownLoadWenJuan = false;
              }).catch((data)=>{
                this.$message({
                  message: '下载失败,请联系管理员',
                  type: 'error'
                });
              })
            }

          }else{
            this.$message({
              message: '请先勾选免责条款',
              type: 'error'
            });
          }

        },
        canceldialogDownLoadWenJuan(){  // 点击下载弹框取消按钮
          this.dialogDownLoadWenJuan = false;
        },
        DownLoadWord () {   // 点击下载按钮
          this.dialogDownLoadWenJuan = true;
        },
        SaveQuestionnaire(){    // 点击保存弹出保存弹框
          this.dialogSavedWenJuan = true;
          this.isGoBack = false;
        },
        canceldialogSaveWenJuan(){   // 取消保存按钮
          this.dialogSavedWenJuan = false;
          if(this.isGoBack){
            this.$router.replace("/UserSystem");
          }
        },
        dialogSaveWenJuanOk(){  // 点击保存确定按钮保存
          userUpdateQuestionnaire({
            status: 1,
            title: this.userWenJuan.title,
            exemption: 1,
            complete: 1
          }).then((data)=>{
            this.userWenJuan.title = '';
            this.dialogSavedWenJuan = false;
            this.$router.replace("/UserSystem");
          }).catch((data)=>{

          })
        },
        returnUserList () { // 返回协议列表
          this.$confirm('请确认已经保存该文书', '提示', {
            confirmButtonText: '确定已保存，返回列表',
            cancelButtonText: '取消返回',
            type: 'warning'
          }).then(() => {
            this.$router.replace('/UserSystem')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        },
        saveWenShu () { // 保存文书
          this.dialogSavedWenJuan = true
        }
      }
    }
</script>
<style scoped>
.bg-color{background: #eee;}
.containermin{width:800px;}
.returnUserList{top:110px;right: 20px;}
.outputword{padding:20px;border:1px solid #ecf5ec;}
.outputword>h2{border-bottom: 1px solid #dbe2db;}
.outputword .msg{white-space:pre-wrap;}
#outputwordmsg p{font-weight:bolder !important;}
.returnUserList{top:110px;right: 20px;}
/*#outputwordmsg{height: 500px;}*/
</style>
