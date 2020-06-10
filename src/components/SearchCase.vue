<template>
    <div>
       <head-menu></head-menu>
       <div class="container mx-auto">
            <div class="title">
                <ul class="flex  w-4/5 mx-auto my-3 text-lg">
                    <li v-for="(item,index) in title_search" :key="index" class="px-10 mx-2 py-1 border border-red-600 rounded-sm hover:bg-red-600 hover:text-white cursor-pointer" @click="tabSearch(item)">{{item.name}}</li>
                </ul>
            </div>
            <div class="flex w-4/5 mx-auto relative">
                <div class="w-10/12 border-2 rounded border-red-600 flex">
                    <div @click="showMaxBox">
                        <img class="rounded cursor-pointer" src="@/assets/images/maxsearch.png">
                    </div>
                    <div class="w-full h-full mx-2 searchBox relative">
                        <el-row class="demo-autocomplete">
                          <el-col :span="12" class="w-full input-w">
                            <el-autocomplete
                                  class="w-full border-none sousuo"
                                  popper-class="my-autocomplete"
                                  v-model="selectCase_action"
                                  :fetch-suggestions="querySearchCaseAction"
                                  placeholder="请输入案由"
                                  @select="handleSelectCaseAction">
                                <i
                                  class="el-icon-edit el-input__icon"
                                  slot="suffix"
                                  @click="handleIconClickCaseAction">
                                </i>
                                <template slot-scope="{ item }">
                                    <div class="name">{{ item.name }}</div>
                                </template>
                            </el-autocomplete>
                          </el-col>
                        </el-row>
                        <div class="searchChoose text-left hidden">
                          <div>
                            <h2 class="py-2 pl-5 bg-gray-500 text-white">案由</h2>
                            <ul>
                              <li class="text-sm py-1 pl-5">123</li>
                            </ul>
                          </div>
                          <div>
                            <h2 class="py-2 pl-5 bg-gray-500 text-white">法律依据</h2>
                            <ul>
                              <li class="text-sm py-1 pl-5">456</li>
                            </ul>
                          </div>
                          <div>
                            <h2 class="py-2 pl-5 bg-gray-500 text-white">争议焦点</h2>
                            <ul>
                              <li class="text-sm py-1 pl-5">456</li>
                            </ul>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="w-2/12 pt-2 bg-red-600 text-white -ml-1  border-2 border-red-600 cursor-pointer text-lg searchBtn" v-show='isSearchBtn'  @click="searchList()">搜索</div>
                <div class="border-2 rounded border-red-600 betterBox absolute" v-show='isShow'>
                   <div class="">
                        <el-form :model="this.selectCaseListMsg"  label-width="120px">
                            <div class="flex mt-5 pr-10">
                                <div class="w-1/2">
                                   <el-form-item label="案由" class="text-base">
                                        <el-row class="demo-autocomplete">
                                          <el-col :span="12" class="w-full input-w">
                                              <el-autocomplete
                                                      class="w-full"
                                                      popper-class="my-autocomplete"
                                                      v-model="selectCase_action"
                                                      :fetch-suggestions="querySearchCaseAction"
                                                      placeholder="请输入案由"
                                                      size="small"
                                                      @select="handleSelectCaseAction">
                                                  <i
                                                          class="el-icon-edit el-input__icon"
                                                          slot="suffix"
                                                          @click="handleIconClickCaseAction">
                                                  </i>
                                                  <template slot-scope="{ item }">
                                                      <div class="name">{{ item.name }}</div>
                                                  </template>
                                              </el-autocomplete>
                                          </el-col>
                                      </el-row>
                                    </el-form-item>
                                    <el-form-item label="标题" class="text-base">
                                        <el-input v-model="selectCaseListMsg.title" size="small" @blur="addChooseTitle({name:'标题', type: 'title',value: selectCaseListMsg.title})"></el-input>
                                    </el-form-item>
                                    <el-form-item label="案号" class="text-base">
                                        <el-input v-model="selectCaseListMsg.case_number" size="small" @blur="addChooseCaseNumber({name:'案号', type: 'case_number',value: selectCaseListMsg.case_number})"></el-input>
                                    </el-form-item>
                                    <el-form-item label="律所案号" class="text-base">
                                        <el-input v-model="selectCaseListMsg.master_number" size="small" @blur="addChooseMasterNumber({name:'律所案号', type: 'master_number',value: selectCaseListMsg.master_number})"></el-input>
                                    </el-form-item>
                                   <el-form-item label="法院" class="text-base">
                                        <el-row class="demo-autocomplete">
                                            <el-col :span="12" class="w-full input-w">
                                                <el-autocomplete
                                                        class="w-full"
                                                        popper-class="my-autocomplete"
                                                        v-model="selectCourt"
                                                        :fetch-suggestions="querySearch"
                                                        placeholder="请输入法院"
                                                        @input='checkCourt(selectCourt)'
                                                        size="small"
                                                        @select="handleSelect">
                                                    <i
                                                            class="el-icon-edit el-input__icon"
                                                            slot="suffix"
                                                            @click="handleIconClick">
                                                    </i>
                                                    <template slot-scope="{ item }">
                                                        <div class="name">{{ item.name }}</div>
                                                    </template>
                                                </el-autocomplete>
                                            </el-col>
                                        </el-row>
                                    </el-form-item>
                                    <el-form-item label="法院人员" class="text-base">
                                       <el-select class="w-full" v-model="selectCaseListMsg.courtPersonnel" size="small" filterable @change="addPersonalList()" >
                                            <el-option
                                                v-for="item in case_court_personnel"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                                 >{{ item.name}}
                                             </el-option>
                                         </el-select>
                                    </el-form-item>
                               </div>
                               <div class="w-1/2">
                                    <el-form-item label="律所" class="text-base">
                                       <el-select class="w-full" v-model="selectCaseListMsg.lawyerOffice" size="small" filterable @change="addlawyerOfficeList()" >
                                            <el-option
                                                v-for="item in courtList"
                                                :key="item.id"
                                                :value="item.id"
                                                :label="item.name"
                                                 >{{ item.name}}
                                             </el-option>
                                         </el-select>
                                    </el-form-item>
                                    <el-form-item label="律师" class="text-base">
                                       <el-select class="w-full" v-model="selectCaseListMsg.lawyer" size="small" filterable @change="addlawyerList()" >
                                            <el-option
                                                v-for="(item,index) in lawyerList"
                                                :key="index"
                                                :value="item.id"
                                                :label="item.name"
                                                 >{{ item.name}}
                                             </el-option>
                                         </el-select>
                                    </el-form-item>
                                    <el-form-item label="审判程序" class="text-base">
                                      <el-select class="w-full" v-model="selectCaseListMsg.subject" placeholder="审判程序" size="small" @change="addSubjectList()">
                                          <el-option
                                                v-for="(item,index) in subjectList"
                                                :key="index"
                                                :value="item.id"
                                                :label="item.name"
                                                 >{{ item.name}}
                                             </el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item label="文书类型" class="text-base">
                                      <el-select class="w-full" v-model="selectCaseListMsg.case_type" placeholder="文书类型" size="small" @change="addCaseTypeList()">
                                          <el-option
                                                v-for="(item,index) in case_type"
                                                :key="index"
                                                :value="item.type"
                                                :label="item.name"
                                                 >{{ item.name}}
                                             </el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item label="审判时间" class="text-base">
                                        <el-date-picker
                                         class="time-width"
                                          v-model="selectCaseListMsg.case_time"
                                          type="datetime"
                                          size="small"
                                          value-format="yyyy-MM-dd HH:mm:ss"
                                          @change="addChooseCaseTime({name:'审判时间', type: 'case_time',value: selectCaseListMsg.case_time})"
                                          placeholder="选择日期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item label="内容" class="text-base">
                                        <el-input v-model="selectCaseListMsg.content" size="small" @blur="addChooseContent({name:'内容', type: 'content',value: selectCaseListMsg.content})"></el-input>
                                    </el-form-item>
                               </div>

                            </div>
                            <div class="flex">
                                <el-form-item label="法律依据" class="text-base flex" >
                                  <div class="flex w-full justify-around" id="falv">
                                    <el-select
                                      class="legal_basis"
                                      v-model="law.lawId"
                                      @change="console(law.lawId)"
                                      placeholder="请选择法律"
                                      size="small"
                                    >
                                        <el-option v-for="(item,index) in lawContent.lawList" :label="item.name" :key="index" :value="item.id"></el-option>
                                    </el-select>
                                    <div id="lawyer_list" class="flex">
                                      <span class="ml-3 mr-1">第</span>
                                        <el-input
                                            type="number"
                                            v-model="law.number"
                                            placeholder="第几条法律"
                                            show-word-limit
                                            size="small"
                                            @blur="setLawNum(law.number)"
                                        ></el-input>
                                        <span class="ml-1">条</span>
                                    </div>
                                  </div>

                                </el-form-item>
                            </div>
                        </el-form>
                        <div class="w-1/3 mx-auto flex justify-around py-5">
                            <span class="px-3 py-1 cursor-pointer rounded bg-red-600 text-white" @click="searchList()">检索</span>
                            <span class="px-3 py-1 cursor-pointer rounded bg-red-600 text-white" @click="resetSearch">重置</span>
                        </div>
                   </div>
               </div>
           </div>

       </div>
       <div class="w-full px-10 my-5 flex">
           <div class="w-1/4 border">
               <div class="text-left border-b-2 my-2 px-2 pb-2">
                   <h3 class="text-lg font-bold">标签池</h3>
                   <div class="left_part">
                      <ul v-for="item in lableList" :key="item.id" >
                        <li @click="case_lableClick(item)" class="text-sm cursor-pointer">{{ item.title }}</li>
                      </ul>
                   </div>
               </div>
               <div class="text-left border-b-2 my-2 px-2 pb-2">
                   <h3 class="text-lg font-bold">案由</h3>
                   <div class="left_part">
                      <ul v-for="item in case_action" :key="item.id" >
                        <li @click="case_actionClick(item)" class="text-sm cursor-pointer">{{ item.name }}</li>
                      </ul>
                   </div>

               </div>
               <div class="text-left border-b-2 my-2 px-2 pb-2">
                   <h3 class="text-lg font-bold">地域及法院</h3>
                   <div class="left_part">
                      <ul v-for="item in courtBeijing" :key="item.id" >
                        <li @click="handleSelectLeft(item)" class="text-sm cursor-pointer">{{ item.name }}</li>
                      </ul>
                   </div>
               </div>

               <div class="text-left border-b-2 my-2 px-2 pb-2">
                   <h3 class="text-lg font-bold">审理程序</h3>
                   <div>
                      <ul v-for="(item,index) in subjectList" :key="index" >
                        <li @click="subjectClick(item)" class="text-sm cursor-pointer">{{ item.name }}</li>
                      </ul>
                   </div>
               </div>
               <div class="text-left border-b-2 my-2 px-2 pb-2">
                   <h3 class="text-lg font-bold">文书类型</h3>
                   <div class="left_part">
                      <ul v-for="(item,index) in case_type" :key="index" >
                        <li @click="case_typeClick(item)" class="text-sm cursor-pointer">{{ item.name }}</li>
                      </ul>
                   </div>
               </div>
           </div>
           <div class="w-3/4 text-left ml-5">
               <div>
                  <div class="flex justify-between">
                    <span class="text-red-600">已选条件：</span>
                    <div @click='clearChoose'>清空条件</div>
                  </div>

                  <div class="pb-2 border-b-2 border-red-600 choose">
                    <div class="tiaojian flex float-left border px-1 my-2 mx-2" v-for="(item,index) in searchChoose" :key="index">
                      <span class="block text-sm">{{item.name}}:</span>
                      <span class="block text-sm">{{item.value}}</span>
                      <span class="ml-2 block text-sm cursor-pointer" @click="removeList(item,index)">x</span>
                    </div>
                  </div>
               </div>
               <div class="my-5">
                 <ul v-for="item in case_list" :key="item.id">
                   <li v-if='case_list !="" ' class="my-2 py-2 hover:bg-orange-200 pl-5">
                      <h2 class="hover:text-black-500 cursor-pointer" @click='openCase(item.id)'>案件标题：{{ item.title }}</h2>
                      <div class="w-full py-1" v-html="item.content"></div>
                      <div class="flex text-sm mt-2" >
                          <span class="mr-10">{{ item.case_number }}</span>
                          <span class="mr-10">{{ item.name }}</span>
                          <span>上传时间：{{ item.create_time }}</span>
                      </div>
                   </li>
                   <li v-else>没有查询结果</li>
                 </ul>
               </div>
           </div>
       </div>
       <el-pagination
          background
          class="mb-10"
          layout="prev, pager, next"
          @current-change="searchList"
          :page-size="pagesize"
          :current-page.sync="currentPage"
          :total="this.total">
      </el-pagination>
    </div>
</template>

<script>
    import _ from 'lodash';
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {selectCaseData} from '@/api/api/requestLogin.js'   // 查询案件
    import {selectCaseAction} from '@/api/api/requestLogin.js'  // 查询案由信息
    import {selectCaseList} from '@/api/api/requestLogin.js'  // 查询案件列表
    import {selectCaseLable} from "@/api/api/requestLogin.js";    // 查询标签接口
    import {getCaseCourtMsg} from '@/api/api/requestLogin.js'  // 查询法院信息
    import {getCourtPersonnels} from '@/api/api/requestLogin.js'  // 查询法院人员信息
    import {getCourtData} from '@/api/api/requestLogin.js'  // 查询律所信息
    import {getLawyerData} from '@/api/api/requestLogin.js'  // 查询律师信息
    export default {
        data() {
            return {
              isShow: false,
              isSearchBtn: true,
              label:[],
              title_search: [    // 头部搜索的案由链接
                {'name':'离婚纠纷', id:204},
                {'name':'继承纠纷', id:218},
                {'name':'其他案件', id:213}
              ],
              case_action: [],  // 案由列表
              lableList:[],     // 标签池
              restaurants: [],  // 法院列表
              judge_select: '',      // 选择添加的审判人员
              case_court_personnel:[],
              courtList: [],  // 查找律所
              judge_select_lawyerOffice: '', // 选择添加的律所
              lawyerList: [],  // 查找律师
              judge_select_lawyer: '',  // 选择添加的律师
              subjectList: [
                {'name':'一审',id: 1},
                {'name':'二审',id: 2},
                {'name':'再审',id: 3},
                {'name':'其他',id: 4}
              ], // 审判程序
              judge_select_subject: '', // 选择添加的审判程序
              headSearch: '',
              selectCase_action: '',
              selectCourt: '',
              selectCaseListMsg:{

              },
              courtBeijing: [
                {"name":"北京市高级人民法院", id:280},
                {"name":"北京市中级人民法院（已撤销)", id:281},
                {"name":"北京市第一中级人民法院", id:282},
                {"name":"北京市海淀区人民法院", id:283},
                {"name":"北京市石景山区人民法院", id:284},
                {"name":"北京市昌平区人民法院", id:285},
                {"name":"北京市门头沟区人民法院", id:286},
                {"name":"北京市延庆区人民法院", id:287},
                {"name":"北京市第二中级人民法院", id:288},
                {"name":"北京市东城区人民法院", id:289},
                {"name":"北京市崇文区人民法院（已撤销）", id:290},
                {"name":"北京市西城区人民法院", id:291},
                {"name":"北京市宣武区人民法院（已撤销）", id:292},
                {"name":"北京市丰台区人民法院", id:293},
                {"name":"北京市房山区人民法院", id:294},
                {"name":"北京市大兴区人民法院", id:295},
                {"name":"北京市第三中级人民法院", id:296},
                {"name":"北京市朝阳区人民法院", id:297},
                {"name":"北京市通州区人民法院", id:298},
                {"name":"北京市顺义区人民法院", id:299},
                {"name":"北京市怀柔区人民法院", id:300},
                {"name":"北京市平谷区人民法院", id:301},
                {"name":"北京市密云区人民法院", id:302},
                {"name":"北京知识产权法院", id:303},
                {"name":"北京市第四中级人民法院", id:304},
                {"name":"北京互联网法院", id:305}
              ],
              law: {
                lawId: null,
                number: null
              },
              lawOk: [],
              case_list: [],
              searchChoose: [],
              case_type: [
                {name: '判决书',type: 1},
                {name: '裁定书',type: 2},
                {name: '调解书',type: 3},
                {name: '其他',type: 4}
              ],
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
              judge_select_law: {
                lawname: '',
                lawnumber: ''
              },
              judge_select_case_type: '', // 选择添加的案件类型
              // 分页
              first_page_url: '',
              last_page_url: '',
              next_page_url: '',
              path: '',
              from: 1,
              per_page: null,
              last_page: null,
              userList: [],
              currentPage:1, //初始页
              pagesize:20,    //    每页的数据
              area: '', // 擅长领域
              total: 0, // 总页数
              pageNum: 1 // 第几页
            }
        },
        components: {
            HeadMenu,
        },
        mounted () {
          this.selectCaseAction();  // 查询案由
          this.getCaseLable();    // 查询标签
          this.getCaseCourtMsg();  // 获取法院信息
          this.getCourt();    // 获取律所信息
          this.getLawyer();   // 获取律师信息

        },
        methods:{
          tabSearch (item) {   // 头部离婚纠纷按钮
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "案由"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {
              if(key == 'case_action'){
                value = item.id;
              }
            });
            this.selectCaseListMsg.case_action = item.id;
            this.searchChoose.push({
              type: 'case_action',
              id: item.id,
              name: '案由',
              value: item.name
            })
            this.searchList()
          },
          showMaxBox () {  // 点击高级检索弹出搜索页面
            this.isShow = !this.isShow
            this.isSearchBtn = !this.isSearchBtn
          },
          selectCaseAction () {   // 查询案由
              selectCaseAction().then((data) =>{
                this.case_action = data.data.data;
              })
          },
          case_actionClick (e) {   // 点击案由
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "案由"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {

              if(key == 'case_action'){
                value = e.id;
              }
            });
             this.searchChoose.push({
              type: 'case_action',
              id:e.id,
              name: '案由',
              value: e.name
            })
             this.selectCaseListMsg.case_action = e.id
             this.searchList ()
          },
          // 案由模块
          querySearchCaseAction(queryString, cb) {  // 案由模块
            var case_action = this.case_action;
            var resultsCaseAction = queryString ? case_action.filter(this.createFilterCaseAction(queryString)) : case_action;
            // 调用 callback 返回建议列表的数据
            cb(resultsCaseAction);
          },
          createFilterCaseAction(queryString) {   // 案由模块
            return (restaurant) => {
              return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          handleSelectCaseAction(item) {   // 案由模块
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "案由"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {

              if(key == 'case_action'){
                value = item.id;
              }
            });
            this.selectCaseListMsg.case_action = item.id;
            this.selectCase_action = item.name;
            this.searchChoose.push({
              type: 'case_action',
              id: this.selectCaseListMsg.case_action,
              name: '案由',
              value: this.selectCase_action
            })
          },
          handleIconClickCaseAction(ev) {  // 案由模块
            console.log(ev);
          },
          // 查询法院信息
          checkCourt (e) {
            getCaseCourtMsg(e).then((data) =>{
                this.restaurants = data.data.data.data
            })
          },
          getCaseCourtMsg () {
            getCaseCourtMsg().then((data) =>{
              this.restaurants = data.data.data.data ;
            })
          },
          // 法院模块
          querySearch(queryString, cb) {  // 法院模块
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
          },
          createFilter(queryString) {   // 法院模块
            return (restaurant) => {
              return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
          },
          handleIconClick(ev) {  // 法院模块
            console.log(ev);
          },
          handleSelectLeft(item) {   // 法院模块
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "法院"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {
              if(key == 'court'){
                value = item.id;
              }
            });
            this.selectCaseListMsg.court = item.id;
            this.selectCourt = item.name;
            this.searchChoose.push({
              type: 'court',
              id: this.selectCaseListMsg.court,
              name: '法院',
              value: this.selectCourt
            })
            this.searchList ()
            this.getCourtPersonnel();  //获取法院人员信息
          },
          handleSelect(item) {   // 法院模块
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "法院"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {
              if(key == 'court'){
                value = item.id;
              }
            });
            this.selectCaseListMsg.court = item.id;
            this.selectCourt = item.name;
            this.searchChoose.push({
              type: 'court',
              id: this.selectCaseListMsg.court,
              name: '法院',
              value: this.selectCourt
            })
            // this.searchList ()
            this.getCourtPersonnel();  //获取法院人员信息
          },
          getCourtPersonnel () {    // 获取法院人员
            getCourtPersonnels({
              courtId:this.selectCaseListMsg.court
            }).then((data)=>{
                this.case_court_personnel = data.data.data//案件审判人员列表
            })
          },

          addPersonalList () {   // 筛选法院人员
            let courtPersonnel = this.selectCaseListMsg.courtPersonnel
            let bb =this.case_court_personnel
            var judge_select;
            for(var k in bb){
              if(bb[k].id == courtPersonnel){
                 judge_select = bb[k].name
              }
            }
            this.judge_select = judge_select
            this.searchChoose.push({name:'法院人员', type: 'courtPersonnel',value: judge_select})
          },
          addlawyerOfficeList () {  // 添加法院筛选条件
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "律所"){
                search.splice(i,1)
              }
            }
            let lawyerOffice = this.selectCaseListMsg.lawyerOffice
            let bb = this.courtList;
            var judge_select_lawyerOffice;
            for (var k in bb){
              if(bb[k].id == lawyerOffice){
                judge_select_lawyerOffice = bb[k].name
              }
            }
            this.judge_select_lawyerOffice = judge_select_lawyerOffice
            this.searchChoose.push({name:'律所', type: 'lawyerOffice',value: judge_select_lawyerOffice})
          },
          getCourt(){   // 获取律所信息
              getCourtData().then((data)=>{
                this.courtList=data.data.data;
              })
          },
          getLawyer(){  // 获取律师信息
            getLawyerData(0).then((data)=>{
                this.lawyerList=data.data.data;

              })
          },
          addlawyerList () {    // 添加律师筛选条件
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "律师"){
                search.splice(i,1)
              }
            }
            let lawyer = this.selectCaseListMsg.lawyer
            let bb = this.lawyerList;
            var judge_select_lawyer;
            for (var k in bb){
              if(bb[k].id == lawyer){
                judge_select_lawyer = bb[k].name
              }
            }
            this.judge_select_lawyer = judge_select_lawyer
            this.searchChoose.push({name:'律师', type: 'lawyer',value: judge_select_lawyer})
          },

          addSubjectList () { // 选择审判程序
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "审判程序"){
                search.splice(i,1)
              }
            }
            let subject = this.selectCaseListMsg.subject;
            let bb = this.subjectList
            var judge_select_subject;
            for (var k in bb){
              if(bb[k].id == subject){
                judge_select_subject = bb[k].name
              }
            }
            // console.log(subject)
            this.judge_select_subject = judge_select_subject
            this.searchChoose.push({
              name:'审判程序',
              type: 'subject',
              value: judge_select_subject
            })
          },
          addCaseTypeList () {
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "文书类型"){
                search.splice(i,1)
              }
            }
            let case_type = this.selectCaseListMsg.case_type;
            let bb = this.case_type
            var judge_select_case_type;
            for (var k in bb){
              if(bb[k].type == case_type){
                judge_select_case_type = bb[k].name
              }
            }
            this.judge_select_case_type = judge_select_case_type
            this.searchChoose.push({
              name:'文书类型',
              type: 'case_type',
              value: judge_select_case_type
            })
          },
          addLabelList () {   // 选择标签栏目

          },
          // 标签池
          getCaseLable () {
            selectCaseLable().then((data)=>{
              this.lableList = data.data.data;
            })
          },
          case_lableClick (e) {
            this.label.push(e.id);
            this.selectCaseListMsg.label = this.label;
            this.searchChoose.push({
              name: '标签',
              type: 'label',
              value: e.title,
              id: e.id
            })
            this.searchList()
          },
          console (e) {
            this.lawOk.push(e)
          },
          setLawNum (e) {   // 法院筛选条件
            this.lawOk.push(e)
            this.selectCaseListMsg.law = this.lawOk;
            for(let k in this.lawContent.lawList){
              if(this.lawContent.lawList[k].id == this.law.lawId){
                this.judge_select_law.lawname = this.lawContent.lawList[k].name
              }
            }
            this.searchChoose.push({
              name:'法律依据',
              type: 'law',
              value: this.judge_select_law.lawname + '第' +this.law.number+ '条'
            })
          },

          encodeSearchParams(obj) {
            const params = [];
            Object.keys(obj).forEach((key) => {
              let value = obj[key];
              // 如果值为undefined置空
              if (typeof value === 'undefined') {
                value = '';
              }else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {//类型为对象的时候
                Object.keys(obj[key]).forEach(item => {
                  params.push([item, encodeURIComponent(obj[key][item])].join('='));
                })
              }else if(Array.isArray(obj[key])){
                params.push(key+'='+ '['+obj[key]+']');
              }else {
                params.push([key, encodeURIComponent(value)].join('='));
              }
            });
            return params.join('&');
          },
          searchList () {  // 点击检索，查找案件
            this.selectCaseListMsg.page = this.currentPage
            let param = this.encodeSearchParams(this.selectCaseListMsg)
            selectCaseList(param).then((data)=>{
                this.case_list = data.data.data
                this.isShow = false
                this.isSearchBtn = true
                // this.selectCase_action = ''
                this.law.lawId = ''
                this.law.number = ''
                this.total = data.data.total
            }).catch((data)=>{
                console.log(data)
            })
          },
          resetSearch () {   // 重置筛选
            this.searchChoose =[]
            this.selectCaseListMsg =[]
            // this.addChooseList =[]
            this.law.lawId = ''
            this.law.number = ''
            this.selectCourt = ''
            this.selectCase_action = ''
          },
          addChooseTitle (e) {
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "标题"){
                search.splice(i,1)
              }
            }
            this.searchChoose.push(e)
          },
          addChooseCaseNumber (e) {
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "案号"){
                search.splice(i,1)
              }
            }
            this.searchChoose.push(e)
          },
          addChooseContent (e) {
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "内容"){
                search.splice(i,1)
              }
            }
            this.searchChoose.push(e)
          },
          addChooseMasterNumber (e) {
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "律所案号"){
                search.splice(i,1)
              }
            }
            this.searchChoose.push(e)
          },
          addChooseCaseTime (e) {
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "审判时间"){
                search.splice(i,1)
              }
            }
            this.searchChoose.push(e)
          },
          clearChoose () {   // 清空筛选
            this.selectCaseListMsg =[]
            this.searchChoose = []
            this.searchList()
          },
          removeList (item,index) {   // 点击删除条件
            this.searchChoose.splice(index,1)
            let selectCaseListMsg = this.selectCaseListMsg
            for(var k in selectCaseListMsg){

              if(k == item.type){
                if(selectCaseListMsg[k] instanceof String||selectCaseListMsg[k] instanceof Number||selectCaseListMsg[k] instanceof Boolean){
                  delete selectCaseListMsg[k]
                    this.searchList()
                }else if(selectCaseListMsg[k] instanceof Array){
                  if(item.type == 'law'){
                    delete selectCaseListMsg[k]
                    this.lawOk=[]
                    this.searchList()
                  }
                  for(var $key in selectCaseListMsg[k]){
                    if(selectCaseListMsg[k][$key] == item.id){
                      if(selectCaseListMsg[k].length !=0 ){
                        selectCaseListMsg[k].splice(index,1)
                        this.searchList()
                      }
                      if(selectCaseListMsg[k].length == 0){
                       delete selectCaseListMsg[k]
                       this.searchList()
                      }
                    }
                  }
                }else{
                  delete selectCaseListMsg[k]
                  this.searchList()
                }
              }
            }
          },
          subjectClick (e) {    // 左侧审判程序列表
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "审判程序"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {
              if(key == 'subject'){
                value = e.id;
              }
            });
            this.searchChoose.push({
              type: 'subject',
              name: '审判程序',
              value: e.name
            })
            this.selectCaseListMsg.subject = e.id;
            this.searchList ()
          },
          case_typeClick (e) {   // 左侧文书类型列表
            var search = this.searchChoose;
            for (var i = 0;i<search.length;i++){
              if(search[i].name == "文书类型"){
                search.splice(i,1)
              }
            }
            _.forEach(this.selectCaseListMsg, function(value, key) {
              if(key == 'case_type'){
                value = e.type;
              }
            });
            this.searchChoose.push({
              type: 'case_type',
              name: '文书类型',
              value: e.name
            })
            this.selectCaseListMsg.case_type = e.type;
            this.searchList ()
          },
          openCase (e) {  // 点击查看判决书内容
              localStorage.setItem('id', e);
              selectCaseData().then((data) => {
                if(data.data.view != null || data.data.master_number != null || data.data.case_evidence != null) {
                  const { href } = this.$router.resolve({name:"CaseCompletedView",params:{id:0}});
                  window.open(href, '_blank')
                }else{
                  alert('该案件尚未录入，无法查看')
                }
              })
          },
          // 初始页currentPage、初始每页数据数pagesize和数据data
          // 上一页
          nextClick () {
            console.log("下一页")
          },
          prevClick () {
            console.log("上一页")
          },
          pagesizeClick (size) {
             this.pagesize = size;
             console.log(this.pagesize)
          },
          handleCurrentChange (currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
          }

        }
    }
</script>
<style scoped>
.border-none{border:none!important;}
.title{
    margin-left:110px;
}
.input-w{
  width:100% !important;
}
.searchBox input{
    outline: none;
}
.betterBox{
    top:44px;
    left:0;
    bottom:0;
    height: 424px;
    width:100%;
    background: #f8f6f7;
}
.searchChoose{
  position: absolute;
  top:44px;
  left:0;
  bottom:0;
  width:100%;
  height: 424px;
  overflow-y: scroll;
  background: #fff;
  z-index: 2
}
.el-form-item{
    margin-bottom:5px;
}
.el-form-item__label{
    font-size: 16px;
}
.left_part{
  height: 300px;
  overflow: scroll;
}
.tiaojian{
  width:fit-content;
}
.choose{height: 100px;}
.time-width{width:100% !important;}
.legal_basis{width:65% !important;display: flex !important;}
#falv{margin-left:-120px;width: 175%;}
#lawyer_list .el-input{width:50% !important;}
.sousuo{margin-top:2px;}
</style>
