<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto flex pb-10">
            <div class="w-2/3">
                <div class="text-left mt-5">
                    <h2 class="text-lg">{{pageInfo.court}}{{ pageInfo.case_action }}{{status}}</h2>
                    <h2 id="xinxi" class="py-2 text-orange-500">一、基本信息</h2>
                    <p class="my-1">律所案号：<span>{{ pageInfo.master_number }}</span></p>
                    <p class="my-1">裁判文书：<span>{{  pageInfo.case_number }}</span></p>
                    <p class="my-1">案由：<span>{{ pageInfo.case_action }}</span></p>
                    <p class="my-1">文书类型：<span>{{status}}</span></p>
                    <p class="my-1">法院：<span>{{ pageInfo.scourt }}</span></p>
                    <p class="my-1">审理程序：<span>{{ subject }}</span></p>
                    <p class="my-1">
                      <div v-for="(item, index) in pageInfo.courtPersonnel" :key="item.index">
                        <div v-if="item.status ===1" class="text-base">
                          <p v-if="item.name !=null " class="my-1">审判长：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===2" class="text-base">
                          <p v-if="item.name !=null " class="my-1">审判员：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===3" class="text-base">
                          <p v-if="item.name !=null " class="my-1">代理审判员：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===4" class="text-base">
                          <p v-if="item.name !=null " class="my-1">人民陪审员：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===5" class="text-base">
                          <p v-if="item.name !=null " class="my-1">法官助理：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===6" class="text-base">
                          <p v-if="item.name !=null " class="my-1">书记员：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===7" class="text-base">
                          <p v-if="item.name !=null " class="my-1">代理书记员：<span>{{item.name}}</span></p>
                        </div>
                      </div>
                    </p>
                    <div class="my-1">
                      <div>代理律师：</div>
                      <div class="mx-2 pl-5" v-for="(item, index) in pageInfo.lawyer" :key="item.index">
                        <span>{{ item.lawyerName }}</span><span class="ml-5">{{ item.lawyerOfficeName }}</span>
                      </div>
                    </div>
                    <div v-for="item in plaintiff" :key="item.status" >
                        <div v-if="item.status ===1" class="text-base">
                            <p class="my-1">原告：<span>{{item.name}}</span></p>
                        </div>
                        <div v-if="item.status ===2" class="text-base">
                            <p class="my-1">被告：<span>{{item.name}}</span></p>
                        </div>
                    </div>
                    <!--<p class="my-1">被告代理律师：<span>张三</span></p>-->
                    <h2 id="anqing" class="py-2 text-orange-500">二、基本案情</h2>
                    <p class="pr-10 my-1">
                      <span class="text-orange-500">案情概述：</span>
                      <span v-if="pageInfo.description !=null">{{pageInfo.description}}</span>
                      <span v-else>无</span>
                    </p>
                    <p class="pr-10 my-1">
                      <span class="text-orange-500">案情看点：</span>
                      <span v-if="pageInfo.description_spot !=null">{{pageInfo.description_spot}}</span>
                      <span v-else>无</span>
                    </p>
                    <div class="pr-10">
                        <h2 id="suoying" class="py-2 text-orange-500">三、案件缩影</h2>
                        <table class="suoying_table" v-if="pageInfo.case_epitome != null">
                            <thead>
                            <tr>
                                <td class="w-1/4">争议焦点</td>
                                <td class="w-1/4">原告观点</td>
                                <td class="w-1/4">被告观点</td>
                                <td class="w-1/4">法院观点</td>
                            </tr>
                            </thead>
                            <tbody v-for="item in pageInfo.case_epitome" :key="item.index">
                              <tr>
                                  <td rowspan="2">{{item.title}}</td>
                                  <td><h3 v-if="item.data.y.viewpoint != null "></h3><h3 v-else>无</h3>{{item.data.y.viewpoint}}</td>
                                  <td><h3 v-if="item.data.b.viewpoint != null "></h3><h3 v-else>无</h3>{{item.data.b.viewpoint}}</td>
                                  <td><h3 v-if="item.data.f.viewpoint != null "></h3><h3 v-else>无</h3>{{item.data.f.viewpoint}}</td>
                              </tr>
                              <tr>
                                  <td><h3 v-if="item.data.y.basis != null ">依据：</h3><h3 v-else>依据：无</h3>{{item.data.y.basis}}</td>
                                  <td><h3 v-if="item.data.b.basis != null ">依据：</h3><h3 v-else>依据：无</h3>{{item.data.b.basis}}</td>
                                  <td><h3 v-if="item.data.f.basis != null ">依据：</h3><h3 v-else>依据：无</h3>{{item.data.f.basis}}</td>
                              </tr>
                            </tbody>
                        </table>
                        <table v-else>
                          <span>无</span>
                        </table>
                    </div>
                    <div class="pr-10">
                        <h2 id="biaoqian" class="py-2 text-orange-500">四、标签池</h2>
                        <div class="h-12" v-if="pageInfo.label_case !='' ">
                            <ul class="">
                                <li class="mx-2 float-left"  v-for="item in pageInfo.label_case" :key="item.index">{{item.title}}</li>
                            </ul>
                        </div>
                        <div v-else>
                          <span>无</span>
                        </div>
                    </div>
                    <div class="pr-10">
                        <h2 id="zhaiyao" class="py-2 text-orange-500">五、证据适用摘要</h2>
                        <table class="evidence_table w-full"  v-if="pageInfo.case_evidence.y.length != 0 || pageInfo.case_evidence.b.length != 0">
                            <thead  v-if="pageInfo.case_evidence.y.length != 0 || pageInfo.case_evidence.b.length != 0">
                            <tr>
                                <td class="w-1/3">身份</td>
                                <td class="w-1/3">证据名称</td>
                                <td class="w-1/3">法院认定</td>
                            </tr>
                            </thead>
                            <thead v-else>
                              <span>无</span>
                            </thead>
                            <tbody>
                            <tr v-if="pageInfo.case_evidence.y.length != 0" v-for="item in pageInfo.case_evidence.y" :key="item.index">
                                <td class="w-1/3">原告</td>
                                <td class="w-1/3">{{ item.evidence }}</td>
                                <td class="w-1/3">{{item.f}}</td>
                            </tr>
                            <tr v-if="pageInfo.case_evidence.b.length != 0"  v-for="item in pageInfo.case_evidence.b" :key="item.index">
                                <td>被告</td>
                                <td>{{ item.evidence }}</td>
                                <td>{{item.f}}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table v-else>
                          <span>无</span>
                        </table>
                    </div>
                    <div>
                        <h2 id="falv" class="py-2 text-orange-500">六、法律依据</h2>
                        <ul>
                            <li v-for="(item,index) in pageInfo.legal_basis" :key="index" >
                                {{item.name}}第{{item.number}}条
                            </li>
                        </ul>
                    </div>
                    <div>
                      <h2 class="py-2 text-orange-500">七、查看图片版本</h2>
                      <ul>
                        <li v-for="item in pageInfo.imgs" :key="item.id"><img :src="item" alt=""></li>
                      </ul>
                    </div>
                </div>
            </div>
            <div class="w-1/3 pl-10 fixed top-10 right-0 text-left">
                <h2 class="text-left text-lg text-black mt-10">快速目录</h2>
                <ul class="text-left">
                    <li class="text-base py-2"><a href="#xinxi">一、基本信息</a></li>
                    <li class="text-base py-2"><a href="#anqing">二、基本案情</a></li>
                    <li class="text-base py-2"><a href="#suoying">三、案件缩影</a></li>
                    <li class="text-base py-2"><a href="#biaoqian">四、标签池</a></li>
                    <li class="text-base py-2"><a href="#zhaiyao">五、证据适用摘要</a></li>
                    <li class="text-base py-2"><a href="#falv">六、法律依据</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import HeadMenu from '@/components/HeadMenu'
  import {selectCaseData} from '@/api/api/requestLogin.js'
  import {selectCaseAction} from '@/api/api/requestLogin.js'

  export default {
    name: 'CaseCompleted',
    components: {
      HeadMenu,
    },
    data() {
      return {
        plaintiff: [],
        user: localStorage.getItem('name'),
        case_action: '',
        subject: '',
        status: '',    // 判决书类型
        lawContent: {
          lawList: [
            {'name': '《中华人民共和国婚姻法》', 'id': '1'},
            {'name': '《中华人民共和国民事诉讼法》', 'id': '2'},
            {'name': '《中华人民共和国继承法》', 'id': '3'},
            {'name': '《中华人民共和国民法总则》', 'id': '4'},
            {'name': '《中华人民共和国民法通则》', 'id': '5'},
            {'name': '《中华人民共和国合同法》', 'id': '6'},
            {'name': '《中华人民共和国涉外民事关系法律适用法》', 'id': '7'},
            {'name': '《最高人民法院关于适用<中华人民共和国婚姻法>若干问题的解释(一)》', 'id': '8'},
            {'name': '《最高人民法院关于适用<中华人民共和国婚姻法>若干问题的解释(二)》', 'id': '9'},
            {'name': '《最高人民法院关于适用<中华人民共和国婚姻法>若干问题的解释(三)》', 'id': '10'},
            {'name': '《最高人民法院关于适用<中华人民共和国婚姻法>若干问题的解释（二）的补充规定》', 'id': '11'},
            {'name': '《最高人民法院关于贯彻执行<中华人民共和国民法通则>若干问题的意见（试行）》', 'id': '12'},
            {'name': '《最高人民法院关于适用<中华人民共和国民事诉讼法>的解释》', 'id': '13'},
            {'name': '《最高人民法院关于人民法院审理离婚案件处理财产分割问题的若干具体意见》', 'id': '14'},
            {'name': '《最高人民法院关于人民法院审理离婚案件处理子女抚养问题的若干具体意见》', 'id': '15'},
            {'name': '《最高人民法院关于人民法院审理离婚案件如何认定夫妻感情确已破裂的若干具体意见》', 'id': '16'},
            {'name': '《最高人民法院关于民事诉讼证据的若干规定》', 'id': '17'}
          ],
          lawList_num: '',
          type: ''
        },
        pageInfo: {
          bad: null,
          case_action: null,
          case_costs: null,
          case_epitome: null,
          case_evidence: null,
          case_number: '',
          case_number_time: 2017,
          case_time: null,
          case_title: null,
          cid: 8,
          city: null,
          content: '',
          court: null,
          create_time: '',
          description: '',
          description_spot: null,
          good: null,
          id: localStorage.getItem('id'),
          imgs: '',
          json_content: '',
          label_case: '',
          lawyer: '',
          lawyer_type: null,
          legal_basis: null,
          master: null,
          master_number: null,
          order: null,
          plaintiff: '',
          scourt: null,
          status: null,
          subject: null,
          tid: null,
          time: null,
          title: '',
          uid: 1,
          view: null
        }
      }
    },
    mounted(){

    },
    created () {
      this.getInfo()
    },
    methods: {
      getInfo () {
        selectCaseData().then((data) => {
          this.pageInfo = data.data;
          this.pageInfo.imgs = JSON.parse(data.data.imgs);
          this.pageInfo.case_epitome = JSON.parse(data.data.case_epitome);
          this.pageInfo.case_evidence = JSON.parse(data.data.case_evidence);
          this.pageInfo.legal_basis = data.data.legal_basis;
          this.changeLegal_basis_type();
          this.pageInfo.label_case = JSON.parse(data.data.label_case);
          this.plaintiff = JSON.parse(data.data.plaintiff);
          this.pageInfo.lawyer = JSON.parse(data.data.lawyer);  // 代理律师
          this.pageInfo.courtPersonnel = JSON.parse(data.data.courtPersonnel)
          let subjectNum = this.pageInfo.subject;
          switch (subjectNum) {
            case 1: this.subject = '一审'; break
            case 2: this.subject = '二审'; break
            case 3: this.subject = '再审'; break
            case 4: this.subject = '其他'; break
          }
          // 左侧展示判决书类型
          let statusNum = this.pageInfo.status;
          switch (statusNum) {
            case 1: this.status = '判决书'; break
            case 2: this.status = '裁定书'; break
            case 3: this.status = '调解书'; break
            case 4: this.status = '其他'; break
          }
        }).catch((data) => {
          console.log(data)
        });
        // 将案由数字转为文字
        selectCaseAction().then((data) => {
          let aa = data.data.data;
          for (let i = 0; i < aa.length-1; i++){
            let bb = this.pageInfo.case_action;
            if(aa[i].id == bb) {
              this.case_action = aa[i].name;
              return this.case_action
            }
          }
        });
      },
      // 将法律数字变成文字
      changeLegal_basis_type () {
        let legal_basis_n = this.pageInfo.legal_basis;
        let legal_basis_text = this.lawContent.lawList;
        legal_basis_n.forEach(function (item1) {
          legal_basis_text.forEach(function (item2) {
            if (item1.lawId == item2.id) {
               item1.name =  item2.name;
            }
          })
        })
      }
    }
  }
</script>

<style scoped>
    .suoying_table tr td, .evidence_table tr td{
        border:1px solid orange;
        overflow: auto;
        text-align:center;
        padding:5px;
    }

</style>
