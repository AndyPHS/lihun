<template>
    <div>
        <head-menu></head-menu>
        <div class="mx-10 px-2 pb-10">
            <div class="w-1/2 panjue float-left pb-10 border-1 border-r pr-1">
                <div class="py-6">
                    <h2 class="text-xl mb-2">{{pageInfo.title}}</h2>
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="查看图片版本" name="first">
                            <ul>
                                <li v-for="item in pageInfo.imgs" :key="item.id"><img :src="item" alt=""></li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="查看word版本" name="second">
                            <div>
                                <h2 class="text-xl py-2">{{pageInfo.court}}{{status}}</h2>
                                <p class="text-right py-2 mr-5">{{pageInfo.case_number}}</p>
                                <textarea :rows='80' id="textarea_left" class="textarea w-full" placeholder="" v-model="pageInfo.content" readonly="readonly"  @blur="updateInfo({content:pageInfo.content})"></textarea>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="w-1/2 write float-right pb-10">
                <div class="mx-3">
                    <h2 class="my-4 py-2 text-xl text-left border-b border-1">
                        <span class="">案件样式编辑</span>
                    </h2>
                    <div class="pl-5">
                        <textarea :rows="1" class="text-xl text-center py-2 w-full" v-model="pageInfo.court" @blur="updateInfo({court:pageInfo.court})"></textarea>
                        <textarea :rows="1" class="text-xl text-center py-2 w-full" v-model="status" @blur="updateInfo({status:pageInfo.status})"></textarea>
                        <textarea :rows="1" class="text-right py-2 mr-5 w-full" v-model="pageInfo.case_number" @blur="updateInfo({case_number:pageInfo.case_number})"></textarea>
                        <textarea :rows="80" class="textarea w-full" placeholder="" v-model="pageInfo.content"  @blur="updateInfo({content:pageInfo.content})"></textarea>
                        <el-row class="my-5">
                            <el-button type="primary" round @click="goNewPage()">前往修改页面</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import HeadMenu from '@/components/HeadMenu'      // 添加公共头部
  import {updateCaseData} from '@/api/api/requestLogin.js'   // 修改页面信息
  import {selectCaseData} from '@/api/api/requestLogin.js'   // 查询案件


  export default {
    components: {
      HeadMenu,
    },
    name: 'ArrangementCase',
    data() {
      return {
        imgs: [],
        status: '',
        textarea1: '',
        pageInfo:{
          id: '',
          tid: null,
          court: null,      // 法院
          courtId: null,    //
          scourt: null,
          title: '',   // 标题
          master_number: '',        // 律所案号
          time: null,
          status: null,           // 文书类型
          case_action: null,      // 案由
          case_number: '',
          subject: null,
          lawyer_type: null,
          case_costs: null,
          case_time: null,
          order: null,
          master: null,
          case_number_time: 2017,
          view: null,
          good: null,
          bad: null,
          description: '',         // 案情概述
          description_spot: null,  // 案情看点
          case_epitome: null,    // 案件缩影
          case_evidence: null,  // 证据摘要
          legal_basis: null,   //法律依据
          cid: 2,
          content: '',       // 判决书内容
          imgs: '',          // 判决书图片
          json_content: '',
          label_case: '[{\"lid\":6}]',   // 标签
          lawyer: '',
          legal_basis: [],     //法律依据
          plaintiff: ''
        },
        case_action: {
          name:''
        },
        court: null,
        showFlag: false,
        radio: '',
        activeName: 'first'

      }
    },
    mounted(){
      this.getInfo(); // 获取页面信息
    },
    created(){

    },
    updated () {
    },
    methods: {
      handleClick(tab, event) {   // 图片和文本切换
      },
      getInfo () {  // 获取页面信息
        selectCaseData().then((data) => {
          this.pageInfo = data.data;
          this.pageInfo.imgs = JSON.parse(data.data.imgs)

          // 左侧展示判决书类型
          let statusNum = this.pageInfo.status;
          switch (statusNum) {
            case 1: this.status = '民事判决书'; break
            case 2: this.status = '民事裁定书'; break
            case 3: this.status = '民事调解书'; break
            case 4: this.status = '其他'; break
          }
        }).catch((data)=>{
           this.$router.replace("/");
        });
      },
      // 修改页面提交信息
      updateInfo (e) {
        updateCaseData(e).then((data) =>{
        })
      },
      // 生成页面
      goNewPage () {
        this.$router.replace("/UpdateCase");
      },
      // 高亮显示关键字
      highlightMsg () {
        let searchVal = ['向本院提出诉讼请求', '事实与理由', '本院认定如下', '本院认为', '判决如下', '依据', '辩称']
        let text = document.getElementById('caseMsg').innerHTML;
        for (var i = 0 ; i < searchVal.length ; i++) {
          let reg = new RegExp('(' + searchVal[i] + ')', 'ig');
          text = text.replace(reg, '<b class="text-white bg-green-500">$1</b>');
          caseMsg.innerHTML = text;
        }
      }
    }
}
</script>

<style scoped lang="less">
    .panjue, .write{
      height: 800px;
      overflow-y: scroll;
      overflow-x: hidden;
    }
    textarea{
      outline:0 none;
      resize:none;
      line-height:2.0;
      text-indent:2em;
    }
    .el-select{
        width: 100%;
    }
    .el-form-item{
        margin-bottom:12px !important;
    }
    .el-textarea__inner{
        min-height: 120px !important;
        line-height: 30px !important;
    }
    .el-col-12{
        width: 100% !important;
        .el-autocomplete{
            width: 100%;
        }
    }
    b{
        color:red;
    }
    #caseMsg{
        line-height:30px !important;
    }

</style>
