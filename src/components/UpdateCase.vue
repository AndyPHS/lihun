<template>
    <div>
        <head-menu></head-menu>
        <div class="mx-10 px-2 pb-10 w-full">
            <div class="w-1/2 panjue float-left pb-10">
                <div class="py-6 relative" >
                    <h2 class="text-xl mb-2">{{pageInfo.court}}{{pageInfo.case_action}}{{status}}</h2>
                    <div class="w-1/3 text-right cursor-pointer absolute t-5 right-0 z-10"><el-button type="primary" @click="goArrangementCase">返回修改判决书样式</el-button></div>

                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="查看word版本" name="first">
                            <div>
                                <h2 class="text-xl py-2">{{pageInfo.title}}</h2>
                                <p class="text-right py-2 mr-5">{{pageInfo.case_number}}</p>
                               <textarea :rows="80" id="caseMsg" class="textarea w-full" placeholder="" v-model="pageInfo.content" readonly="readonly" disabled="disabled" @blur="updateInfo({content:pageInfo.content})"></textarea>
                               <!--  <div id="caseMsg" class="info_content mr-2">{{pageInfo.content}}</div> -->
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="查看图片版本" name="second">
                            <ul>
                                <li v-for="item in pageInfo.imgs" :key="item.id"><img :src="item" alt=""></li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="w-1/2 write float-right pb-10">
                <div class="w-5/6 mx-auto">
                    <h2 class="my-4 py-2 text-xl text-left border-b border-1">
                        <span class="">案件信息填写</span>
                    </h2>
                    <div class="mr-4">
                        <el-form ref="pageInfo" :model="pageInfo" label-width="120px" >
                            <h2 class="text-left text-base pb-2 text-orange-500">一、案件基本信息</h2>
                            <el-form-item label="律所案号：" class="text-base">
                                <el-input v-model="pageInfo.master_number"  @blur="updateInfo({master_number: pageInfo.master_number})"></el-input>
                            </el-form-item>
                            <el-form-item label="案号：" class="text-base">
                                <el-input v-model="pageInfo.case_number"  @blur="updateInfo({case_number: pageInfo.case_number})"></el-input>
                            </el-form-item>
                            <el-form-item label="审判时间：" class="text-base">
                                <el-date-picker
                                  v-model="pageInfo.case_time"
                                  type="datetime"
                                  value-format="yyyy-MM-dd HH:mm:ss"
                                  @change="updateInfo({case_time: pageInfo.case_time})"
                                  placeholder="选择日期时间">
                                </el-date-picker>
                                <!-- <el-input v-model="pageInfo.case_time"  @blur="updateInfo({case_time: pageInfo.case_time})"></el-input> -->
                            </el-form-item>
                            <el-form-item label="文书类型：">
                                <el-select id="case_type" v-model="status_h1"  placeholder="文书类型" @change="updateInfo({case_status:status_h1})" >
                                    <el-option label="民事判决书" value="1"></el-option>
                                    <el-option label="民事裁定书" value="2"></el-option>
                                    <el-option label="民事调解书" value="3"></el-option>
                                    <el-option label="其他" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="法院：" class="text-base">
                                <el-row class="demo-autocomplete">
                                    <el-col :span="12" class="w-full">
                                        <el-autocomplete
                                                popper-class="my-autocomplete"
                                                v-model="pageInfo.court"
                                                :fetch-suggestions="querySearch"
                                                placeholder="请输入法院"
                                                @input='checkCourt(pageInfo.court)'

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
                            <el-form-item label="案由：" class="text-base">
                                <el-row class="demo-autocomplete">
                                    <el-col :span="12" class="w-full">
                                        <el-autocomplete
                                                popper-class="my-autocomplete"
                                                v-model="pageInfo.case_action"
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
                            </el-form-item>
                            <el-form-item label="审判程序：" class="text-base">
                                <el-select v-model="subject" placeholder="审判程序" @change="updateInfo({subject:subject})">
                                    <el-option label="一审" value="1"></el-option>
                                    <el-option label="二审" value="2"></el-option>
                                    <el-option label="再审" value="3"></el-option>
                                    <el-option label="其他" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- 审判长 -->
                            <div v-for="(v,k,index) in court_personnel1" :key="'v1-'+k">
                                <el-form-item  label="审判长：" class="text-base">
                                    <div class="flex">
                                        <div class="mr-1 w-2/3">
                                             <el-input v-model="v.name" :disabled="true"></el-input>
                                        </div>
                                        <div class="flex w-1/3 justify-around">
                                           <!--  <span v-on:click="cp_add_icon(1)" class="px-1 rounded border border-1 hover:bg-green-500 hover:text-white">添加</span> -->
                                            <span v-on:click="cp_del(k,1,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                    </div>

                                </el-form-item>
                            </div>
                            <!--审判审判员-->
                            <div v-for="(v,k) in court_personnel2" :key="'v2-'+k">
                                <el-form-item  label="审判员：" class="text-base">
                                    <div class="flex">
                                        <div class="mr-1 w-2/3">
                                            <el-input v-model="v.name" :disabled="true"></el-input>
                                        </div>
                                        <div class="flex w-1/3 justify-around">
                                            <span v-on:click="cp_del(k,2,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                    </div>
                                </el-form-item>
                            </div>
                            <!--代理审判员-->
                            <div v-for="(v,k) in court_personnel3" :key="'v3-'+k">
                                <el-form-item  label="代理审判员：" class="text-base">
                                    <div class="flex">
                                    <div class="mr-1 w-2/3">
                                         <el-input v-model="v.name" :disabled="true"></el-input>
                                    </div>
                                    <div class="flex w-1/3 justify-around">
                                            <!-- <span v-on:click="cp_add_icon(3)" class="px-1 rounded border border-1 hover:bg-green-500 hover:text-white">添加</span> -->
                                            <span v-on:click="cp_del(k,3,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                </div>
                                </el-form-item>
                            </div>
                            <!-- 人民陪审员 -->
                            <div v-for="(v,k) in court_personnel4" :key="'v4-'+k">
                                <el-form-item  label="人民陪审员：" class="text-base">
                                    <div class="flex">
                                    <div class="mr-1 w-2/3">
                                         <el-input v-model="v.name" :disabled="true"></el-input>
                                    </div>
                                    <div class="flex w-1/3 justify-around">
                                           <!--  <span v-on:click="cp_add_icon(4)" class="px-1 rounded border border-1 hover:bg-green-500 hover:text-white">添加</span> -->
                                            <span v-on:click="cp_del(k,4,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                </div>
                                </el-form-item>
                            </div>
                            <!-- 法官助理 -->
                            <div v-for="(v,k) in court_personnel5" :key="'v5-'+k">
                                <el-form-item  label="法官助理：" class="text-base">
                                    <div class="flex">
                                    <div class="mr-1 w-2/3">
                                         <el-input v-model="v.name" :disabled="true"></el-input>
                                    </div>
                                    <div class="flex w-1/3 justify-around">
                                            <!-- <span v-on:click="cp_add_icon(5)" class="px-1 rounded border border-1 hover:bg-green-500 hover:text-white">添加</span> -->
                                            <span v-on:click="cp_del(k,5,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                </div>
                                </el-form-item>
                            </div>
                            <!-- 书记员 -->
                            <div v-for="(v,k) in court_personnel6" :key="'v6-'+k">
                                <el-form-item  label="书记员：" class="text-base">
                                    <div class="flex">
                                    <div class="mr-1 w-2/3">
                                         <el-input v-model="v.name" :disabled="true"></el-input>
                                    </div>
                                    <div class="flex w-1/3 justify-around">
                                            <span v-on:click="cp_del(k,6,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                </div>
                                </el-form-item>
                            </div>
                            <!-- 代理书记员 -->
                            <div v-for="(v,k) in court_personnel7" :key="'v7-'+k">
                                <el-form-item  label="代理书记员：" class="text-base">
                                    <div class="flex">
                                    <div class="mr-1 w-2/3">
                                        <el-input v-model="v.name" :disabled="true"></el-input>
                                    </div>
                                    <div class="flex w-1/3 justify-around">
                                            <span v-on:click="cp_del(k,7,v,courtId)" class="px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer">删除</span>
                                        </div>
                                </div>
                                </el-form-item>
                            </div>
                            <!--审判人员-->
                            <el-form-item  label="新增法院人员：" class="text-base">
                                <div class="flex">
                                    <div class="w-2/5">
                                        <el-select v-model="judge_type" placeholder="请选择">
                                            <el-option label="审判长" value="1"></el-option>
                                            <el-option label="审判员" value="2"></el-option>
                                            <el-option label="代理审判员" value="3"></el-option>
                                            <el-option label="人民陪审员" value="4"></el-option>
                                            <el-option label="法官助理" value="5"></el-option>
                                            <el-option label="书记员" value="6"></el-option>
                                            <el-option label="代理书记员" value="7"></el-option>
                                        </el-select>
                                    </div>
                                    <div class="w-2/5 ml-2">
                                        <el-select v-model="judge_select" ref="setSelect1" filterable >
                                            <el-option
                                                v-for="item in case_court_personnel"
                                                :key="item.id"
                                                :value="item.name"
                                                :label="item.name"
                                                 >{{ item.name}}
                                             </el-option>
                                         </el-select>
                                    </div>
                                    <div class="w-1/5 flex justify-around">
                                        <span @click="add_update_cp()" class="px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer">确认</span>
                                        <!-- <span class="whitespace-no-wrap px-1 bg-green-500" @click="add_update_cp()" >确认</span> -->
                                    </div>
                                </div>
                            </el-form-item>
                             <!-- 新增法院人员 -->
                            <div class="newaddcourtperson">
                                <el-form ref="form" :model="cp_from" >
                                    <div class="flex items-center">
                                       <el-form-item label="" class="w-2/3">
                                            <el-input v-model="cp_from.name" placeholder="新增录入法院人员"></el-input>
                                        </el-form-item>
                                         <span class="ml-1 w-1/3 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="submit_cp()">确认添加</span>
                                    </div>
                                 </el-form>
                            </div>
                            <!-- 代理律师 -->
                            <el-form-item  label="代理律师：" class="text-base">
                                <el-table :data="pageInfo.lawyer" >
                                    <el-table-column property="lawyerName" label="律师" class="text-center"></el-table-column>
                                    <el-table-column property="lawyerOfficeName" label="律所" class="text-center"></el-table-column>
                                    <el-table-column
                                    label="操作"
                                    >
                                    <template slot-scope="scope">
                                    <el-button type="text" @click="delete_vase_lawyer(scope.row)" class="text-base text-right">删除</el-button>
                                    </template>
                                    </el-table-column>
                                </el-table>
                            </el-form-item>
                            <!-- 添加律师 -->
                            <div class="newaddcourtperson">
                                <el-form ref="form" :model="lv_from" >
                                    <div class="">
                                       <el-form-item label="" class="">
                                            <el-input v-model="lv_from.lawerOfficeValue" placeholder="请填写律所"></el-input>
                                            <div class="mt-2">
                                                <el-input v-model="lv_from.lawyerValue" placeholder="请填写律师"></el-input>
                                            </div>

                                        </el-form-item>

                                         <span class="ml-1 w-1/3 mb-3 py-1 text-base text-blue-500 px-2 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="add_case_lawyer()">添加律师</span>
                                    </div>
                                 </el-form>
                            </div>
                            <!-- 基本案情 -->
                            <h2 class="text-left text-base pb-2 text-orange-500">二、基本案情</h2>
                            <el-form-item label="案情概述" class="text-orange-500" >
                                <el-input type="textarea" :rows="4" class="textarea" v-model="pageInfo.description" @blur="updateInfo({description:pageInfo.description})"></el-input>
                            </el-form-item>
                            <el-form-item label="案情看点" class="text-orange-500">
                                <el-input type="textarea" :rows="4" class="textarea" v-model="pageInfo.description_spot" @blur="updateInfo({description_spot:pageInfo.description_spot})"></el-input>
                            </el-form-item>
                            <h2 class="text-left text-base pb-2 text-orange-500">三、案件缩影</h2>
                            <ul>
                                <li v-for="(item, index) in pageInfo.case_epitome" :key="item.index" class="case_epitome">
                                    <el-form-item :label="'争议焦点'+ (index+1) + '：' " class="text-base">
                                        <el-input v-model="item.title" placeholder="争议焦点"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item id='yuangao' label="原告/上诉人观点：" class="text-base">
                                        <el-input v-model="item.data.y.viewpoint" placeholder="原告/上诉人观点" @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item label=" 依据 ： " class="text-orange-500" >
                                        <el-input type="textarea" :rows="4" class="textarea" placeholder="原告依据，请分条换行填写，如：1、2、" v-model="item.data.y.basis"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item label="被告/被上诉人观点" class="text-orange-500">
                                        <el-input  v-model="item.data.b.viewpoint" placeholder="被告/被上诉人观点" @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="依据 ： " class="text-orange-500" >
                                        <el-input type="textarea" :rows="4" class="textarea" placeholder="被告依据，请分条换行填写，如：1、2、" v-model="item.data.b.basis"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>

                                    </el-form-item>
                                    <el-form-item label="法院观点" class="text-orange-500">
                                        <el-input  v-model="item.data.f.viewpoint" placeholder="法院观点"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <el-form-item  label="依据 ： " class="text-orange-500">
                                        <el-input type="textarea" :rows="4" class="textarea" placeholder="法院依据，请分条换行填写，如：1、2、" v-model="item.data.f.basis"  @blur="updateInfo({case_epitome:pageInfo.case_epitome})"></el-input>
                                    </el-form-item>
                                    <span class="ml-1 mb-3 py-1 text-base text-blue-500 px-3 inline-block rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="del_case_epitome(index)">删除焦点</span>
                                </li>
                            </ul>
                            <div>
                                <span class="ml-1 mb-3 py-1 text-base text-blue-500 px-3 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="add_case_epitome">新增焦点</span>
                            </div>
                            <h2 class="text-left text-base pb-2 text-orange-500">四、标签池</h2>
                            <label_case></label_case>
                            <h2 class="text-left text-base pb-2 text-orange-500 mt-4">五、证据适用摘要</h2>
                            <div class="py-2 px-3 whitespace-no-wrap my-3 mr-3 text-sm text-blue-500 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" v-if="pageInfo.case_evidence.y.length == 0" @click="addEvidence('y')">添加原告/上诉人证据</div>
                            <div v-for="(item, index) in pageInfo.case_evidence.y" :key="'y'+index" class="my-4">
                                <el-form-item label="原告/上诉人">
                                    <div class="flex">
                                        <el-input class="mr-2 w-1/2" v-model="item.evidence" @blur="updateInfo({case_evidence:pageInfo.case_evidence})" ></el-input>
                                        <div class="w-1/2">
                                            <span class="px-2 whitespace-no-wrap ml-1 mb-3 text-sm text-blue-500 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="addEvidence('y')">添加</span>
                                             <span class="px-2 whitespace-no-wrap ml-1 mb-3 text-sm text-blue-500 inline-block rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="delEvidence(index,'y')">删除</span>
                                        </div>

                                    </div>
                                </el-form-item>
                                <el-radio-group v-model="item.f" class="ml-20" @change="updateInfo({case_evidence:pageInfo.case_evidence})">
                                    <el-radio label="法院认同" value="1"></el-radio>
                                    <el-radio label="法院不认同"  value="0"></el-radio>
                                    <el-radio label="法院未表态" value="2"></el-radio>
                                </el-radio-group>
                            </div>
                            <div class="py-2 px-3 whitespace-no-wrap my-3 text-sm text-blue-500 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" v-if="pageInfo.case_evidence.b.length == 0" @click="addEvidence('b')">添加被告/被上诉人证据</div>
                            <div class="py-4" v-for="(item, index) in pageInfo.case_evidence.b" :key="'b'+index">
                                <el-form-item label="被告/被上诉人">
                                    <div class="flex">
                                        <el-input class="mr-2 w-1/2" v-model="item.evidence" @blur="updateInfo({case_evidence:pageInfo.case_evidence})" ></el-input>
                                        <div class="w-1/2">
                                            <span class="px-2 whitespace-no-wrap ml-1 mb-3 text-sm text-blue-500 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="addEvidence('b')">添加</span>
                                             <span class="px-2 whitespace-no-wrap ml-1 mb-3 text-sm text-blue-500 inline-block rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="delEvidence(index,'b')">删除</span>
                                        </div>

                                    </div>
                                </el-form-item>
                                <el-radio-group v-model="item.f" class="ml-20" @change="updateInfo({case_evidence:pageInfo.case_evidence})">
                                    <el-radio label="法院认同" value="1"></el-radio>
                                    <el-radio label="法院不认同"  value="0"></el-radio>
                                    <el-radio label="法院未表态" value="2"></el-radio>
                                </el-radio-group>
                            </div>
                            <h2 class="text-left text-base pb-2 text-orange-500">六、法律依据</h2>
                            <!--法律依据new-->
                            <div>
                                <ul>
                                    <li class="flex justify-between b-1 py-2" v-for="(item, index) in pageInfo.legal_basis" :key="index">
                                        <span class="w-4/5 overflow-hidden text-sm text-left">{{ item.name }}第{{item.number}}条</span>
                                        <span class="ml-2 px-1 py-1 cursor-pointer text-sm rounded border border-1 hover:text-white hover:bg-orange-500 w-1/5" @click="deleteLegal_basis(item,index)">删除</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="adp flex">
                                <el-select
                                    v-model="legal_basis.legal_basis"
                                    @change="console(legal_basis)"
                                    placeholder="请选择法律"
                                    size="medium"
                                >
                                    <el-option v-for="(item,index) in lawContent.lawList" :label="item.name" :key="index" :value="item.id"></el-option>
                                </el-select>
                                <div id="lawyer_list">
                                    <el-input
                                        type="number"
                                        v-model="legal_basis.number"
                                        placeholder="第几条法律，填写数字即可，如：3"
                                        maxlength="4"
                                        show-word-limit
                                        size="medium"
                                    ></el-input>
                                </div>
                                <div class="pt-2 px-2 whitespace-no-wrap text-sm text-blue-500 inline-block rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="radioEvent">确定</div>
                            </div>
                            <h2 class="text-left text-base pb-2 mt-2 text-orange-500">七、案件填写状态</h2>
                            <el-radio-group v-model="pageInfo.bool" class="" @change="updataStatus">
                                <el-radio label="1">已完成</el-radio>
                                <el-radio label="0">未完成</el-radio>
                            </el-radio-group>

                        </el-form>
                        <el-row class="my-5">
                            <el-button type="primary" round @click="goNewPage()">生成页面</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import HeadMenu from '@/components/HeadMenu'      // 添加公共头部
  import {selectCaseData} from '@/api/api/requestLogin.js'   // 查询案件
  import {updateCaseData} from '@/api/api/requestLogin.js'   // 修改页面信息
  import {addCaseAction} from '@/api/api/requestLogin.js'
  import {getCaseCourtMsg} from '@/api/api/requestLogin.js'  // 查询法院信息
  import {selectCaseAction} from '@/api/api/requestLogin.js'  // 查询案由信息
  import {getCourtPersonnels} from '@/api/api/requestLogin.js'  // 查询案由信息
  import {addCourtPersonnels} from '@/api/api/requestLogin.js'  // 添加法院人员信息
  import {updateCourtPersonnels} from '@/api/api/requestLogin.js'  // 修改法院人员信息
  import {delCourtPersonnels} from '@/api/api/requestLogin.js'  // 删除法院人员信息
  import {getCourtData} from '@/api/api/requestLogin.js'  // 查询律所信息
  import {getLawyerData} from '@/api/api/requestLogin.js'  // 查询律师信息
  import {addLawyerOffice} from '@/api/api/requestLogin.js'  // 新增律所
  import {updateLawyerOffice} from '@/api/api/requestLogin.js'  // 修改律所
  import {addLawyer} from '@/api/api/requestLogin.js'  // 新增律师
  import label_case from '@/components/partials/legal_basis'  // 标签组件

  export default {
    components: {
      HeadMenu,
      label_case,
    },
    name: 'UpdateCase',
    data() {
      return {
        restaurants: [],  // 法院列表
        state: '',        // 法院input框绑定的值
        case_action: [],  // 案由列表
        state1: '',       // 案由inpput框绑定的值
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
        legal_basis: {
          legal_basis: '',
          number: '',
          type: 1,
          name:''
        },
        legal_basis_choose: [],
        imgs: [],
        status_h1: '',  //文书类型
        status: '',
        subject: '',
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
          case_number: "(2017)京0106民初17500号",
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
        activeName: 'first',
        judge_type: null,        // 审判角色类型number
        judge_select: '',      // 选择添加的审判人员
        court_personnel1:[],   // 审判长
        court_personnel2:[],    // 审判员
        court_personnel3:[],    // 代理审判员
        court_personnel4:[],    // 人民陪审员
        court_personnel5:[],    // 法官助理
        court_personnel6:[],    // 书记员
        court_personnel7:[],    // 代理书记员
        court_personnel1Value:"",
        court_personnel2Value:"",
        court_personnel3Value:"",
        case_court_personnel:[],
        dialogTableVisible: false,
        dialogTableVisible_add:false,
        dialogTableVisible_update:false,
        dialogTableVisible_lawyer:false,
        add_lo_ui:false,
        update_lo_ui:false,
        lo_update:false,
        add_l_ui:false,
        cp_from:{},
        cp_from_update:{},
        courtList:{},
        courtValue:"",
        lawyerList:{},
        lv_from:{
            lawyerValue:"",
            lawerOfficeValue: ''
        },

        lo_from:{
          name:""
        },
        lo_update_from:{
          name:""
        },
        l_update_from:{
          name:""
        }

      }
    },
    mounted(){
      this.getInfo(); // 获取页面信息
      this.getCaseCourtMsg ();  // 获取法院信息
      this.selectCaseAction ();  // 获取案由
      this.getCourt();
    },
    created(){

    },
    watch:{
     searchVal:function(){    //法院人员模糊搜索
        this.focus();
     }
    },
    updated () {
      this.highlightMsg ()  // 高亮显示关键字
      this.changeLegal_basis_type () //将法律依据转换为文字
      // this.parts ()   // 判决书首行缩
    },
    methods: {
      handleClick(tab, event) {
      },
      goArrangementCase () {
        this.$router.replace("/ArrangementCase");
      },
      addCourtPersonnelsSuccess(mes) {    // 法院人员添加成功提醒
        this.$message({
          message: mes,
          type: 'success'
        });
      },
      errorMesAlert (e) {
        this.$message.error(e);
      },
      getInfo () {
        selectCaseData().then((data) => {
          this.pageInfo = data.data;
          this.getCourtPersonnel();  //获取法院人员信息
          this.court_personnel1=[]
          this.court_personnel2=[]
          this.court_personnel3=[]
          this.court_personnel4=[]
          this.court_personnel5=[]
          this.court_personnel6=[]
          this.court_personnel7=[]
          this.pageInfo.courtPersonnel=JSON.parse( this.pageInfo.courtPersonnel )
          this.pageInfo.lawyer=JSON.parse( this.pageInfo.lawyer )
          for(var v in this.pageInfo.courtPersonnel) {
            // this.pageInfo.courtPersonnel[v].oldcpid=this.pageInfo.courtPersonnel[v].cpid
            switch (this.pageInfo.courtPersonnel[v].status) {
              case 1:
                this.court_personnel1.push(this.pageInfo.courtPersonnel[v])
                break;
              case 2:
                this.court_personnel2.push(this.pageInfo.courtPersonnel[v])
                break;
              case 3:
                this.court_personnel3.push(this.pageInfo.courtPersonnel[v])
                break;
              case 4:
                this.court_personnel4.push(this.pageInfo.courtPersonnel[v])
                break;
              case 5:
                this.court_personnel5.push(this.pageInfo.courtPersonnel[v])
                break;
              case 6:
                this.court_personnel6.push(this.pageInfo.courtPersonnel[v])
                break;
              case 7:
                this.court_personnel7.push(this.pageInfo.courtPersonnel[v])
                break;
            }
          }


          // console.log(this.court_personnel3,this.court_personnel2,this.court_personnel1)
          this.pageInfo.imgs = JSON.parse(data.data.imgs)
          this.pageInfo.case_epitome = JSON.parse(data.data.case_epitome)
          if(data.data.case_epitome == null) {
            this.pageInfo.case_epitome = [{  // 案件缩影格式定义
              title: '',
              data: {
                y: {
                  viewpoint: '',
                  basis: ''
                },
                b: {
                  viewpoint: '',
                  basis: ''
                },
                f: {
                  viewpoint: '',
                  basis: ''
                }

              }
            }]
          };
          // 右侧文书类型
          let status_h = this.pageInfo.status;
          switch (status_h) {
            case 1: this.status_h1 = '民事判决书'; break
            case 2: this.status_h1 = '民事裁定书'; break
            case 3: this.status_h1 = '民事调解书'; break
            case 4: this.status_h1 = '其他'; break
          }
          // 左侧展示判决书类型
          let statusNum = this.pageInfo.status;
          switch (statusNum) {
            case 1: this.status = '民事判决书'; break
            case 2: this.status = '民事裁定书'; break
            case 3: this.status = '民事调解书'; break
            case 4: this.status = '其他'; break
          }
           // 右侧审判程序
           let subjectNum = this.pageInfo.subject;
           switch (subjectNum) {
            case 1: this.subject = '一审'; break
            case 2: this.subject = '二审'; break
            case 3: this.subject = '再审'; break
            case 4: this.subject = '其他'; break
          }
          this.pageInfo.case_evidence = JSON.parse(data.data.case_evidence); //证据摘要格式定义
          if(data.data.case_evidence == null) {
            this.pageInfo.case_evidence = {
              y: [
                {
                  evidence: '',
                  f: 0
                },
                {
                  evidence: '',
                  f: 1
                }
              ],
              b: []
            }
          };
        }).catch((data)=>{
           this.$router.replace("/");
        });
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

      handleSelect(item) {   // 法院模块
        // this.pageInfo.court = '';
        this.pageInfo.court = item.name;
        updateCaseData({court: item.id}).then((data) =>{
          // console.log(JSON.parse(data.config.data))
        })
      },
      handleIconClick(ev) {  // 法院模块
        console.log(ev);
      },
      // 查询案由模块
      selectCaseAction () {
        selectCaseAction().then((data) =>{
          this.case_action = data.data.data;
        })
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
        // this.pageInfo.case_action = '';
        this.pageInfo.case_action = item.name;
        updateCaseData({case_action: item.id}).then((data) =>{
          // console.log(JSON.parse(data.config.data))
        })
      },
      handleIconClickCaseAction(ev) {  // 案由模块
        console.log(ev);
      },
      //添加证据摘要
      addEvidence(type){
        // console.log(type)
        this.pageInfo.case_evidence[type].push({
          evidence: '',
          [type]: ''
        })
      },
      //删除证据摘要
      delEvidence(index,type){
        this.pageInfo.case_evidence[type].splice(index,1);
        this.updateInfo({case_evidence: this.pageInfo.case_evidence});
      },
      // 添加法律依据
      radioEvent () {
        if (this.legal_basis.name != "" || this.legal_basis.number != "" ) {
            this.updateInfo(this.legal_basis);
            this.pageInfo.legal_basis.push({lawId: this.legal_basis.legal_basis, number: this.legal_basis.number,name:this.legal_basis.name});
        }else{
            this.errorMesAlert('请先选择相关法律');
        }

      },
      // 将法律数字变成文字
      changeLegal_basis_type () {
        let legal_basis_n = this.pageInfo.legal_basis;
        let legal_basis_text = this.lawContent.lawList;
        this.legal_basis_choose = this.legal_basis_choose;

        legal_basis_n.forEach(function (item1) {
          legal_basis_text.forEach(function (item2) {
            if (item1.lawId == item2.id) {
               item1.name =  item2.name;
            }
          })
        })
      },
      updataStatus () {
        // this.pageInfo.bool = Number(this.pageInfo.bool)
        this.updateInfo ({
            bool: this.pageInfo.bool
        })
      },
       // 法院人员列表

      deleteLegal_basis (item, index) {
        this.pageInfo.legal_basis.splice(index, 1);
        this.updateInfo({legal_basis: item.lawId, number: item.number, type: 3});
      },
      updateInfo (e) {
        updateCaseData(e).then((data) =>{
        })
      },
      cp_add_moban () {

      },
      cp_add_icon (status) {

        switch (status) {
            case 1:
              this.court_personnel1.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
            case 2:
              this.court_personnel2.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
            case 3:
              this.court_personnel3.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
            case 4:
              this.court_personnel4.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
            case 5:
              this.court_personnel5.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
            case 6:
              this.court_personnel6.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
            case 7:
              this.court_personnel7.push({
                cid: '',
                status: '',
                name: ''
              })
              break;
          }
      },
      cp_add(key,status,value,courtId){
        updateCaseData({
          type:1,
          json_courtPersonnel:value.name,
          status:status,
          courtId:this.pageInfo.cid
        }).then((data) =>{

          if(data.data.status!=200){
             this.$message(data.data.message);
          }

          // switch (status) {
          //   case 1:
          //     this.court_personnel1.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          //   case 2:
          //     this.court_personnel2.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          //   case 3:
          //     this.court_personnel3.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          //   case 4:
          //     this.court_personnel4.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          //     case 5:
          //     this.court_personnel5.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          //     case 6:
          //     this.court_personnel6.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          //     case 7:
          //     this.court_personnel7.push({
          //       cpid:0,
          //       oldcpid:0,
          //       name:"请选择"
          //     })
          //     break;
          // }

        })
      },
      cp_del(k,status,value,courtId){

        switch (status) {
            case 1:
              var cpid = this.court_personnel1[k].cpid
              break;
            case 2:
             var cpid = this.court_personnel2[k].cpid
              break;
            case 3:
             var cpid = this.court_personnel3[k].cpid
              break;
            case 4:
             var cpid = this.court_personnel4[k].cpid
              break;
            case 5:
             var cpid = this.court_personnel5[k].cpid
              break;
            case 6:
             var cpid = this.court_personnel6[k].cpid
              break;
            case 7:
             var cpid = this.court_personnel7[k].cpid
              break;
          }

        updateCaseData({
          type:3,
          json_courtPersonnel:value.name,
          status:status,
          courtId:value.courtId
        }).then((data) =>{
          this.getInfo();
          switch (status) {
            case 1:
              this.court_personnel1[k].splice(k,1)
              break;
            case 2:
              this.court_personnel2[k].splice(k,1)
              break;
            case 3:
              this.court_personnel3[k].splice(k,1)
              break;
            case 4:
              this.court_personnel4[k].splice(k,1)
              break;
            case 5:
              this.court_personnel5[k].splice(k,1)
              break;
            case 6:
              this.court_personnel6[k].splice(k,1)
              break;
            case 7:
              this.court_personnel7[k].splice(k,1)
              break;
          }

        })
      },
      update_cp(value,status){
        updateCaseData({
          type:1,
          json_courtPersonnel:value,
          status:status,
          courtId:this.pageInfo.courtId
        }).then((data) =>{
            switch (status) {
              case 1:
                this.court_personnel1[k].oldcpid=cpid
                break;
              case 2:
                this.court_personnel2[k].oldcpid=cpid
                break;
              case 3:
                this.court_personnel3[k].oldcpid=cpid
                break;
              case 4:
                this.court_personnel4[k].oldcpid=cpid
                break;
              case 5:
                this.court_personnel5[k].oldcpid=cpid
                break;
              case 6:
                this.court_personnel6[k].oldcpid=cpid
                break;
              case 7:
                this.court_personnel7[k].oldcpid=cpid
                break;
            }
        })
      },
      add_update_cp () {   // 确认新增法院人员
        if (this.judge_select != "" && this.judge_type != "" ) {
            this.update_cp(this.judge_select, this.judge_type);
            this.getInfo();
            this.judge_select = '';
            this.judge_type = '';
            this.addCourtPersonnelsSuccess('法院人员添加成功')
        }else{
            this.errorMesAlert('新增人员不能为空')
        }

      },
      submit_cp(){
        if(this.cp_from.name != "" ){
            addCourtPersonnels({
              name:this.cp_from.name,
              courtId:this.pageInfo.courtId
            }).then((data)=>{
                if(data.data.status_code ==200){
                    this.getCourtPersonnel();  //获取法院人员信息
                    // this.dialogTableVisible_add=false
                    this.addCourtPersonnelsSuccess('恭喜，法院人员添加成功') // 添加法院人员成功提醒
                }else{
                    // alert(data.data.message)
                    this.errorMesAlert('新增人员不能为空')
                }
              this.cp_from.name = ""

            })
        }else{
            this.errorMesAlert('新增人员不能为空')
        }

      },
      // 增加案由
      // addCaseAction (e) {
      //   addCaseAction(e).then((data) =>{
      //     console.log(data)
      //   })
      // },
      // 新增焦点
      add_case_epitome () {
        this.pageInfo.case_epitome.push({
          title: '',
          data: {
            y: {
              viewpoint: '',
              basis: ''
            },
            b: {
              viewpoint: '',
              basis: ''
            },
            f: {
              viewpoint: '',
              basis: ''
            }
          }
        })
      },
      del_case_epitome (index) {
        this.pageInfo.case_epitome.splice(index ,1)
        this.updateInfo({case_epitome: this.pageInfo.case_epitome});
      },
      getCourtPersonnel () {
        getCourtPersonnels({
          courtId:this.pageInfo.courtId
        }).then((data)=>{
            this.case_court_personnel = data.data.data//案件审判人员列表
            this.case_court_personnel.push()
        })
      },
      updateCp(row){
        this.cp_from_update=row
        this.dialogTableVisible_update=true
      },
      update_cp_add(){
        updateCourtPersonnels({
          name:this.cp_from_update.name,
          courtId:this.pageInfo.courtId,
          cpid:this.cp_from_update.id
        }).then((data)=>{
          this.getCourtPersonnel();  //获取法院人员信息
          this.dialogTableVisible_update=false
        })
      },
      del_cp(row){
        delCourtPersonnels({
          cpid:row.id
        }).then((data)=>{
          this.getCourtPersonnel();  //获取法院人员信息
        })
      },
      getCourt(){
          getCourtData().then((data)=>{
            this.courtList=data.data.data;
          })
      },
      getLawyer(){
        getLawyerData({
          loid:this.courtValue
        }).then((data)=>{
            this.lawyerList=data.data.data;

          })
      },
      add_case_lawyer () {
        if(this.lv_from.lawyerValue != '' ){
            updateCaseData({
              type:1,
              json_y:this.lv_from.lawyerValue,
              lawyerOffice:this.lv_from.lawerOfficeValue
            }).then((data) =>{
                if(data.data.status_code==200){
                    this.getInfo()
                    this.lv_from.lawyerValue = '';
                    this.lv_from.lawerOfficeValue = '';
                    this.addCourtPersonnelsSuccess('恭喜，代理律师添加成功'); // 添加律师成功提醒
                }else{
                    this.addCourtPersonnelsSuccess('请正确填写法院及律师名');
                }
            })
        }else{
            this.errorMesAlert('律所或律师不能为空');
        }

      },
      delete_vase_lawyer(row){
        updateCaseData({
          type:3,
          json_y:row.lawyerName,
          lawyerOffice:row.lawyerOfficeName
        }).then((data) =>{
            this.getInfo()
        })
      },
      lo_from_update(row){
        this.update_lo_ui=true;
        this.lo_update_from=row;
      },
      lo_from_update_add(){
          updateLawyerOffice({
          name:this.lo_update_from.name,
          loid:this.lo_update_from.id,
          status:1
        }).then((data) =>{
          this.update_lo_ui=false;
          this.getCourt();
        })
      },
      lo_from_add(){   // 新建律所
           addLawyerOffice({
          name:this.lo_from.name,
          status:1
        }).then((data) =>{
          this.add_lo_ui=false;
          this.getCourt();
        })
      },
      l_from_update(row){
          this.add_l_ui=true;
          this.l_update_from.loid=row.id;
      },
      l_from_update_add(){
          addLawyer({
          name:this.l_update_from.name,
          loid:this.l_update_from.loid
        }).then((data) =>{
          this.add_l_ui=false;
        })
      },
      // getLawyer () {
      //   getCourtPersonnels({
      //     courtId:this.pageInfo.courtId
      //   }).then((data) =>{
      //
      //   })
      // },

      // 生成页面
      goNewPage () {
        this.$router.replace("/CaseCompleted");
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
        // console.log(text)
      }
    }
}
</script>

<style scoped lang="less">
 textarea{outline:none;resize:none;overflow-y:visible}
    #case_type{
        width:100%;
    }
    .el-select{
        width: 100%;
    }
    .newaddcourtperson{
        padding-left:120px;
    }
    .el-table td, .el-table th.is-leaf{
        text-align:center !important;
    }
    .el-form-item{
        margin-bottom:12px !important;
    }
    .el-textarea__inner{
        min-height: 120px !important;
    }
    .textarea textarea{
        min-height:120px !important;
    }
    .add_icon{
        width:40px;
        height:40px;
        background:#66b1ff;
        color:white;
        line-height:40px;
        text-align:center;
        border-radius:20px;
        margin:0 5px;
    }
    .addContent{
        width: 50px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-radius: 25px;
        background: #18b2fb;
        color: white;
        margin: 10px 5px;
        cursor:pointer;
    }
    .info_content{
        white-space: pre-line;
        text-align:left;
    }
    .panjue ,.write{
        height:800px;
        overflow-y: scroll;
    }
    .panjue::-webkit-scrollbar {
        display: none;
    }
    .write::-webkit-scrollbar {
        display: none;
    }
    .my-autocomplete {
        li {
            line-height: normal;
            padding: 7px;

            .name {
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .addr {
                font-size: 12px;
                color: #b4b4b4;
            }

            .highlighted .addr {
                color: #ddd;
            }
        }
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
        text-indent:2em;
    }
    #lawyer_list{
        width:150px !important;
        margin:0 10px !important;
    }

</style>
