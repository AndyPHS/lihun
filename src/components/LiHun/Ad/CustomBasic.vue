<template>
  <div class="all">
    <lihun-head></lihun-head>
    <div class="c_m w">
      <div class="c_m_h flex justify-between items-center px-12">
        <h2>
          定制我的协议书
        </h2>
        <div class="c_m_h_r">
          <span><router-link to="AgreementHelp">协议书定制帮助</router-link></span>
        </div>
      </div>
      <div class="">
        <div class="w-full bg-white relative pb-10">
          <div class="container mx-auto">
            <div>
              <div class="py-4">
                <ul class="flex justify-around navUl">
                  <li v-bind:class="{active:index == ins}" v-for="(item, index) in nav" :key="index" @click="stepClick(item,index)">
                    <span class="insNum">{{ index+1 }}</span>
                  {{ item.title }}
                  <span class="divider-line"></span>
                  </li>
                </ul>
              </div>
              <div class="relative allmin" v-loading="loading">
                <!-- <el-tabs v-if="this.ins ===3" :tab-position="tabPosition" @tab-click="`" style="position: absolute; top:0;right: 0px; text-align: left;">
                  <el-tab-pane v-for="(item, index) in caichanNavList" :id="item.id" :key="index" :label="item.title"></el-tab-pane>
                </el-tabs> -->
                <ul class="caichanul" v-if="this.ins ===3" >
                  <li v-bind:class="{active:index+3 == CaiIns}" @click="caichanNavBtn(index)" v-for="(item, index) in caichanNavList" :key="index" >{{ item.title }}</li>
                </ul>
                <div v-if="this.ins ===3" class="othercai">其他财产 <img src="../../../assets/images/open.png" alt=""></div>
                <ul class="caichanul" style="right: 100px;" v-if="zhaiquanNav">
                  <li v-bind:class="{active:index+16 == zhaiIns}" @click="zhaiquanNavBtn(index)" v-for="(item, index) in zhaiquanNavList" :key="index" >{{ item.title }}</li>
                </ul>
                <!-- <el-tabs v-if="zhaiquanNav" :tab-position="tabPosition" @tab-click="zhaiquanNavBtn" style="position: absolute; top:0;right: 70px;">
                  <el-tab-pane v-for="(item, index) in zhaiquanNavList" :id="item.id" :key="index" :label="item.title"></el-tab-pane>
                </el-tabs> -->
                <div v-for="(mo, key) in mokuai" :key="key" class="min">
                  <div v-if="active=== key">
                    <div>
                      <el-form label-position="top" label-width="160px">
                        <div class="text-left mx-auto bg-white px-5 py-5">
                          <!--遍历有几个孩子-->
                          <div>
                            <!--遍历孩子的基本信息-->
                            <div v-for="(item,index) in aa[mo.part]" :key="index">
                              <!-- 大问题块 -->
                              <div>
                                <div class="flex justify-center mb-4" v-if="mo.title=='子女抚养' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}个孩子</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='房产' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">房产{{index+1}}</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='车辆' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}辆车辆</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='存款' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}笔存款</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='理财' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}笔理财</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='公积金' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}笔公积金</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='保险' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}份保险</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='股权（股份）' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}笔股权（股份）</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='股票账户' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}个股票账户</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='家具家电' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}个家具家电</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='珠宝首饰收藏品' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}件珠宝首饰收藏品</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='债券' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}个债券</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='店铺' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}个店铺</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='宅基地房屋' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}处宅基地房屋</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='其他' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}个其他</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='债权' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}笔债权</h2>
                                </div>
                                <div class="flex justify-center" v-if="mo.title=='债务' ">
                                   <h2 class="border w-24 text-left text-base text-blue-800 px-1 py-1 text-center rounded">第{{index+1}}笔债务</h2>
                                </div>
                              </div>

                              <!-- 大问题块 -->
                              <question-model :newlist = 'item'></question-model>
                              <div>
                                <div v-if="mo.title==='子女抚养' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3859,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除孩子</span></div>
                                </div>
                                <div v-if="mo.title==='房产' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(521,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除房产</span></div>
                                </div>
                                <div v-if="mo.title==='车辆' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(522,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除车辆</span></div>
                                </div>
                                <div v-if="mo.title==='存款' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(637,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除存款</span></div>
                                </div>
                                <div v-if="mo.title==='理财' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(523,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除理财</span></div>
                                </div>
                                <div v-if="mo.title==='公积金' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3614,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除公积金</span></div>
                                </div>
                                <div v-if="mo.title==='保险' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(524,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除保险</span></div>
                                </div>

                                <div v-if="mo.title==='股权（股份）' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3636,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除股权（股份）</span></div>
                                </div>
                                <div v-if="mo.title==='股票账户' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3637,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除股票账户</span></div>
                                </div>
                                <div v-if="mo.title==='家具家电' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(636,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除家具家电</span></div>
                                </div>
                                <div v-if="mo.title==='珠宝首饰收藏品' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3638,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除珠宝首饰收藏品</span></div>
                                </div>
                                <div v-if="mo.title==='债券' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3639,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除债券</span></div>
                                </div>
                                <div v-if="mo.title==='店铺' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3640,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除店铺</span></div>
                                </div>
                                <div v-if="mo.title==='宅基地房屋' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3641,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除宅基地房屋</span></div>
                                </div>
                                <div v-if="mo.title==='其他' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(3642,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除其他</span></div>
                                </div>
                                <div v-if="mo.title==='债权' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(655,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除债权</span></div>
                                </div>
                                <div v-if="mo.title==='债务' " class="border-b-2 flex justify-center">
                                  <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center" @click="userDeleteSelectAnswerAction(656,index)"><img class="inline-block mr-2" src="../../../assets/images/lihun/less.png" alt=""><span class="underline inline-block">删除债务</span></div>
                                </div>
                              </div>
                            </div>
                            <div class="mt-4">
                              <div v-if="mo.title== '子女抚养' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer" @click="userAddSelectAnswerAction(3859)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加孩子</span></div>
                              </div>
                              <div v-if="mo.title== '房产' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer" @click="userAddSelectAnswerAction(521)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加房产</span></div>
                              </div>
                              <div v-if="mo.title== '车辆' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(522)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加车辆</span></div>
                              </div>
                              <div v-if="mo.title== '存款' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(637)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加存款</span></div>
                              </div>
                              <div v-if="mo.title== '理财' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(523)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加理财</span></div>
                              </div>
                              <div v-if="mo.title== '公积金' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3614)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加公积金</span></div>
                              </div>
                              <div v-if="mo.title== '保险' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(524)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加保险</span></div>
                              </div>
                              <div v-if="mo.title== '股权（股份）' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3636)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加股权（股份）</span></div>
                              </div>
                              <div v-if="mo.title== '股票账户' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3637)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加股票账户</span></div>
                              </div>
                              <div v-if="mo.title== '家具家电' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(636)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加家具家电</span></div>
                              </div>
                              <div v-if="mo.title== '珠宝首饰收藏品' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3638)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加珠宝首饰收藏品</span></div>
                              </div>
                              <div v-if="mo.title== '债券' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3639)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加债券</span></div>
                              </div>
                              <div v-if="mo.title== '店铺' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3640)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加店铺</span></div>
                              </div>
                              <div v-if="mo.title== '宅基地房屋' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3641)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加宅基地房屋</span></div>
                              </div>
                              <div v-if="mo.title== '其他' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(3642)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加其他</span></div>
                              </div>
                              <div v-if="mo.title== '债权' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(655)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加债权</span></div>
                              </div>
                              <div v-if="mo.title== '债务' " class="flex justify-center">
                                <div class="ml-1 mb-2 py-1 text-base text-blue-800 px-1 cursor-pointer flex items-center cursor-pointer"  @click="userAddSelectAnswerAction(656)"><img class="inline-block mr-2" src="../../../assets/images/lihun/add.png" alt=""><span class="underline inline-block">添加债务</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-form>
                    </div>
                  </div>
                </div>
              </div>

              <div v-show='IsShow' id="alert_xieyi">
                <h2>您已填写完毕，确认生成协议吗？</h2>
                <div class="queren flex mx-auto">
                   <div class="w-24 mr-2">
                    <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='quxiao'>
                      取消
                    </div>
                  </div>
                  <div class="w-24">
                    <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" v-loading.fullscreen.lock="fullscreenLoading" @click='complate'>
                      确认
                    </div>
                  </div>
                </div>
              </div>
              <div v-show="missMsgBox" id="missMsgBox" class="border border-green-200 rounded-lg shadow-lg">
                <h2>以下信息未填写无法跳转到下一步</h2>
                <div class="w-3/4 mx-auto text-red-500" style="overflow-y: scroll;height: 60%" >
                  <ul>
                    <li class="my-2 text-left" v-for="(item, index) in missMsg" :key="index">{{item.title}}</li>
                  </ul>
                </div>
                <div class="queren flex mx-auto">
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
                <div slot="footer" class="dialog-footer tishi_bot pb-3">
                  <span class="cbt" @click="canceldialogSaveWenJuan">取 消</span>
                  <span class="cbt re" @click="dialogSaveWenJuanOk">保 存</span>
                </div>
              </el-dialog>
              <el-dialog title="提示" :visible.sync="dialogTiShi" class="tishi">
                <h2 class="text-red-500 text-xl text-center py-8">确认已经保存该文件</h2>
                <div slot="footer" class="dialog-footer tishi_bot pb-3">
                  <span class="cbt" @click="canceldialogTiShi">取消返回</span>
                  <span class="cbt re" @click="alreadySave">确认已保存，返回列表</span>
                </div>
              </el-dialog>
              <el-button class="step_btn my-5"  v-if="active < this.mokuai.length && active > 0" @click="prev" :loading="prevLoading">上一步</el-button>
              <el-button class="step_btn step_btn_re my-5" v-if="active < this.mokuai.length-1" @click="next" :loading="nextLoading">下一步</el-button>
              <el-button class="step_btn my-5" v-if="active==this.mokuai.length-1" @click="GoComplatePage">生成协议</el-button>
            </div>
          </div>
          <div class="absolute returnUserList">
            <span class="returnUserList_span" @click="returnUserList">返回文书列表</span>
          </div>
          <div class="absolute saveWenShu">
            <span class="returnUserList_span re" @click="saveWenShu">保存</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import QuestionModel from '../../partials/QuestionModel.vue' // 引入子组件
import {returnQuestionnaireJson} from '@/api/api/AgreementRequest.js' // 查询问卷json
import {userUpdateQuestionnaire} from '@/api/api/AgreementRequest.js' // 修改离婚协议书
// import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
import {userAddSelectAnswer} from '@/api/api/AgreementRequest.js' // 添加子女或者房产等
import {userDeleteSelectAnswer} from '@/api/api/AgreementRequest.js' // 删除子女或者房产等
import {demoYanZheng} from '@/api/api/AgreementRequest.js' // 验证单独word demo

import {outPutWord} from '@/api/api/AgreementRequest.js' // 生成数据接口
import {regionData, CodeToText, TextToCode} from 'element-china-area-data' // 省市联动信息
export default {
  name: 'CustomBasic',
  components: {
    'lihun-head': lihun_head,
    'question-model': QuestionModel
  },
  data () {
    return {
      tabPosition: 'right',
      loading: true,
      ins: 0,
      CaiIns: 3, // 财产
      zhaiIns: 16, // 债权
      caichanNav: false,
      zhaiquanNav: false,
      demo: 4,
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      a: [],
      formLabelWidth: '80px', // 表单标签宽度
      dialogSavedWenJuan: false, // 点击保存弹出保存弹框
      userWenJuan: { // 修改用户问卷
        title: '' // 标题
      },
      aa: {
        BasicInformation: [], // 基本信息595  1
        HunYinStatus: [], // 婚姻状况596      2
        ZiNv: [], // 子女3859                 3
        FangChan: [], // 房产状况521          4
        Car: [], // 车辆522                  5
        CunKuan: [], // 存款637              6
        LiCai: [], // 理财523                7
        GongJiJin: [], // 公积金3614        8
        BaoXian: [], // 保险524              9
        GuQuanGuFen: [], //  股权（股份）3636  10
        GuPiaoZhangHu: [], // 股票账户 3637    11
        JiaDian: [], // 家具家电636            12
        ZhuBaoShouShi: [], // 珠宝首饰收藏品3638  13
        ZhaiJuan: [], // 债券 3639              14
        DianPu: [], // 店铺3640                 15
        ZhaiJiDi: [], // 宅基地房屋 3641         16
        QiTa: [], // 其他 3642                 17
        ZhaiQuan: [], // 债权655                18
        ZhaiWu: [], // 债务656                  19
        QiTaZhaiQuan: [], // 其他债权债务3855     20
        TeShuYueDing: [] // 特殊约定 332         21
      },
      IsShow: false,
      mokuai: [
        {title: '基本信息', part: 'BasicInformation', id: 1, num: 595},
        {title: '婚姻状况', part: 'HunYinStatus', id: 2, num: 596},
        {title: '子女抚养', part: 'ZiNv', id: 3, num: 3859},
        {title: '房产', part: 'FangChan', id: 4, num: 521},
        {title: '车辆', part: 'Car', id: 5, num: 522},
        {title: '存款', part: 'CunKuan', id: 6, num: 637},
        {title: '理财', part: 'LiCai', id: 7, num: 523},
        {title: '公积金', part: 'GongJiJin', id: 8, num: 3614},
        {title: '保险', part: 'BaoXian', id: 9, num: 524},
        {title: '股权（股份）', part: 'GuQuanGuFen', id: 10, num: 3636},
        {title: '股票账户', part: 'GuPiaoZhangHu', id: 11, num: 3637},
        {title: '家具家电', part: 'JiaDian', id: 12, num: 636},
        {title: '珠宝首饰收藏品', part: 'ZhuBaoShouShi', id: 13, num: 3638},
        {title: '债券', part: 'ZhaiJuan', id: 14, num: 3639},
        {title: '店铺', part: 'DianPu', id: 15, num: 3640},
        {title: '宅基地房屋', part: 'ZhaiJiDi', id: 16, num: 3641},
        {title: '其他', part: 'QiTa', id: 17, num: 3642},
        {title: '债权', part: 'ZhaiQuan', id: 18, num: 655},
        {title: '债务', part: 'ZhaiWu', id: 19, num: 656},
        {title: '其他债权债务', part: 'QiTaZhaiQuan', id: 20, num: 3855},
        {title: '特殊约定', part: 'TeShuYueDing', id: 21, num: 332}
      ],
      nav: [
        {title: '基本信息', id: 0},
        {title: '婚姻状况', id: 1},
        {title: '子女抚养', id: 2},
        {title: '财产分割', id: 3},
        {title: '债权债务', id: 4},
        {title: '特殊约定', id: 5}

      ],
      caichanNavList: [
        {title: '房产', id: 3},
        {title: '车辆', id: 4},
        {title: '存款', id: 5},
        {title: '理财', id: 6},
        {title: '公积金', id: 7},
        {title: '保险', id: 8},
        {title: '股权（股份）', id: 9},
        {title: '股票账户', id: 10},
        {title: '家具家电', id: 11},
        {title: '珠宝首饰收藏品', id: 12},
        {title: '债券', id: 13},
        {title: '店铺', id: 14},
        {title: '宅基地房屋', id: 15},
        {title: '其他', id: 16}
      ],
      zhaiquanNavList: [
        {title: '债权', id: 17},
        {title: '债务', id: 18},
        {title: '其他', id: 19}
      ],
      active: 0,
      fullscreenLoading: false, // 加载框
      nextLoading: false, // 下一步按钮加载状态
      prevLoading: false,  // 上一步按钮加载状态
      options: regionData, // 省市联动
      missMsgBox: false, // 错误信息默认不显示
      missMsg: [], // 验证的时候漏填项
      missAlert: true, // 尚未填写的信息弹框
      status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
      missField: [], // 未填写项目
      flag: false, // 生成协议弹窗是否出现开关
      rules: {
        IdCard: [
          { min: 17, max: 18, message: '身份证位数不对', trigger: 'blur' }
        ]
      },
      dialogTiShi: false
    }
  },
  beforeMount () {
    this.getBasicInformation() // 查询双方基本信息模块数据
    this.getHunYinStatus() // 查询婚姻状况模块数据
    this.getZiNvMsg() // 查询子女模块数据
    this.getFangChanMsg() // 查询房产模块数据
    this.getCarMsg() // 查询车辆模块数据
    this.getCunKuanMsg() // 查询存款模块数据
    this.getLiCaiMsg() // 查询理财模块数据
    this.getGongJiJinMsg()
    this.getBaoXianMsg() // 查询保险模块数据
    this.getGuQuanGuFenMsg()
    this.getGuPiaoZhangHuMsg()
    this.getJiaDianMsg() // 查询家具家电模块数据
    this.getZhuBaoShouShiMsg()
    this.getZhaiJuanMsg()
    this.getDianPuMsg()
    this.getZhaiJiDiMsg()
    this.getQiTaMsg()
    this.getZhaiQuanMsg() // 查询债权模块数据
    this.getZhaiWuMsg() // 查询债务模块数据
    this.getQiTaZhaiQuanMsg() // 查询其他财产
    this.getTeShuYueDingMsg()
  },
  mounted () {

  },
  methods: {

    getBasicInformation () { // 查询双方基本信息模块数据
      returnQuestionnaireJson({'qpid': 595}).then((data) => { // 查询双方基本信息模块数据
        this.aa.BasicInformation = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getHunYinStatus () { // 查询婚姻状况模块数据
      returnQuestionnaireJson({'qpid': 596}).then((data) => { // 查询婚姻状况模块数据
        this.aa.HunYinStatus = data.data.data
        let cityAnswer = JSON.parse(this.aa.HunYinStatus[0][0].questions[1].answer)
        this.aa.HunYinStatus[0][0].questions[1].answer = [TextToCode[cityAnswer[0]].code, TextToCode[cityAnswer[0]][cityAnswer[1]].code, TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
        this.loading = false
      }).catch((data) => {
      })
    },
    getZiNvMsg () { // 查询子女模块数据
      returnQuestionnaireJson({'qpid': 3859}).then((data) => { // 查询子女模块数据
        this.aa.ZiNv = data.data.data
        this.mokuai.sort(this.compare('id'))
        // console.log(this.aa.ZiNv[0][1].questions[7].childQuestion[1][2].answer)
        for (let i = 0; i < this.aa.ZiNv.length; i++) {
          if (this.aa.ZiNv[i][1].questions[0].answer === 1) {
            this.aa.ZiNv[i][1].questions[7].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[7].childQuestion[1][2].answer)
            this.aa.ZiNv[i][1].questions[8].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[8].childQuestion[2][0].answer)
          } else if (this.aa.ZiNv[i][1].questions[1].answer === 2) {
            this.aa.ZiNv[i][1].questions[14].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[14].childQuestion[1][2].answer)
            this.aa.ZiNv[i][1].questions[15].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[15].childQuestion[2][0].answer)
          } if (this.aa.ZiNv[i][1].questions[1].answer === 2) {
            this.aa.ZiNv[i][1].questions[1].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[2][0].answer)
            this.aa.ZiNv[i][1].questions[1].childQuestion[2][1].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[2][1].answer)
          } else if (this.aa.ZiNv[i][1].questions[1].answer === 3) {
            this.aa.ZiNv[i][1].questions[1].childQuestion[3][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[3][0].answer)
            this.aa.ZiNv[i][1].questions[1].childQuestion[3][1].answer = JSON.parse(this.aa.ZiNv[i][1].questions[1].childQuestion[3][1].answer)
          }
          this.aa.ZiNv[i][1].questions[21].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[21].childQuestion[1][2].answer)
          this.aa.ZiNv[i][1].questions[22].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[22].childQuestion[2][0].answer)
          this.aa.ZiNv[i][1].questions[28].childQuestion[1][2].answer = JSON.parse(this.aa.ZiNv[i][1].questions[28].childQuestion[1][2].answer)
          this.aa.ZiNv[i][1].questions[29].childQuestion[2][0].answer = JSON.parse(this.aa.ZiNv[i][1].questions[29].childQuestion[2][0].answer)
        }
        this.loading = false
      }).catch((data) => {
      })
    },
    getFangChanMsg () { // 查询房产模块数据
      returnQuestionnaireJson({'qpid': 521}).then((data) => { // 查询房产模块数据
        this.aa.FangChan = data.data.data
        for (let i = 0; i < this.aa.FangChan.length; i++) {
          this.aa.FangChan[i][0].questions[2].answer = JSON.parse(this.aa.FangChan[i][0].questions[2].answer)
        }
        this.loading = false
      }).catch((data) => {
      })
    },
    getCarMsg () { // 查询车辆模块数据
      returnQuestionnaireJson({'qpid': 522}).then((data) => { // 查询车辆模块数据
        this.aa.Car = data.data.data
        for (let i = 0; i < this.aa.Car.length; i++) {
          this.aa.Car[i][0].questions[2].answer = JSON.parse(this.aa.Car[i][0].questions[2].answer)
        }
        this.loading = false
      }).catch((data) => {
      })
    },
    getCunKuanMsg () { // 查询存款模块数据
      returnQuestionnaireJson({'qpid': 637}).then((data) => { // 查询存款模块数据
        this.aa.CunKuan = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getLiCaiMsg () { // 查询理财模块数据
      returnQuestionnaireJson({'qpid': 523}).then((data) => { // 查询理财模块数据
        this.aa.LiCai = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getGongJiJinMsg () { // 查询公积金模块数据
      returnQuestionnaireJson({'qpid': 3614}).then((data) => { // 查询公积金模块数据
        this.aa.GongJiJin = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getBaoXianMsg () { // 查询保险模块数据
      returnQuestionnaireJson({'qpid': 524}).then((data) => { // 查询保险模块数据
        this.aa.BaoXian = data.data.data
        this.loading = false
      }).catch((data) => {

      })
    },
    getGuQuanGuFenMsg () { // 查询股权（股份）
      returnQuestionnaireJson({'qpid': 3636}).then((data) => { // 查询股权（股份）模块数据
        this.aa.GuQuanGuFen = data.data.data
        this.loading = false
        // for (let i = 0; i < this.aa.QiTaCaiChan.length; i++) {
        //   if (this.aa.QiTaCaiChan[i][0].questions[0].answer === 1 || this.aa.QiTaCaiChan[i][0].questions[0].answer == '') {
        //     this.aa.QiTaCaiChan[i][0].questions[0].answer = []
        //   } else {
        //     this.aa.QiTaCaiChan[i][0].questions[0].answer = JSON.parse(this.aa.QiTaCaiChan[i][0].questions[0].answer)
        //   }
        // }
      }).catch((data) => {

      })
    },
    getGuPiaoZhangHuMsg () { // 查询股票账户
      returnQuestionnaireJson({'qpid': 3637}).then((data) => { // 查询股票账户模块数据
        this.aa.GuPiaoZhangHu = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getJiaDianMsg () { // 查询家具家电
      returnQuestionnaireJson({'qpid': 636}).then((data) => { // 查询家具家电模块数据
        this.aa.JiaDian = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getZhuBaoShouShiMsg () { // 查询珠宝首饰收藏品
      returnQuestionnaireJson({'qpid': 3638}).then((data) => { // 查询珠宝首饰收藏品模块数据
        this.aa.ZhuBaoShouShi = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getZhaiJuanMsg () { // 查询债券
      returnQuestionnaireJson({'qpid': 3639}).then((data) => { // 查询债券模块数据
        this.aa.ZhaiJuan = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getDianPuMsg () { // 查询店铺
      returnQuestionnaireJson({'qpid': 3640}).then((data) => { // 查询店铺模块数据
        this.aa.DianPu = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getZhaiJiDiMsg () { // 查询宅基地房屋
      returnQuestionnaireJson({'qpid': 3641}).then((data) => { // 查询宅基地房屋模块数据
        this.aa.ZhaiJiDi = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getQiTaMsg () { // 查询其他
      returnQuestionnaireJson({'qpid': 3642}).then((data) => { // 查询其他模块数据
        this.aa.QiTa = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getZhaiQuanMsg () { // 查询债权模块数据
      returnQuestionnaireJson({'qpid': 655}).then((data) => { // 查询债权模块数据
        this.aa.ZhaiQuan = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getZhaiWuMsg () { // 查询债务模块数据
      returnQuestionnaireJson({'qpid': 656}).then((data) => { // 查询债务模块数据
        this.aa.ZhaiWu = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getQiTaZhaiQuanMsg () { // 查询其他债权债务模块数据
      returnQuestionnaireJson({'qpid': 3855}).then((data) => { // 查询其他债权债务模块数据
        this.aa.QiTaZhaiQuan = data.data.data
        this.loading = false
      }).catch((data) => {
      })
    },
    getTeShuYueDingMsg () { // 查询特殊约定模块数据
      returnQuestionnaireJson({'qpid': 332}).then((data) => { // 查询特殊约定模块数据
        this.aa.TeShuYueDing = data.data.data
        if (this.aa.TeShuYueDing[0][0].questions[0].answer === 1 || this.aa.TeShuYueDing[0][0].questions[0].answer == '') {
          this.aa.TeShuYueDing[0][0].questions[0].answer = []
        } else {
          this.aa.TeShuYueDing[0][0].questions[0].answer = JSON.parse(this.aa.TeShuYueDing[0][0].questions[0].answer)
        }
        if (this.aa.TeShuYueDing[0][0].questions[0].childQuestion[1][0].answer === 1 || this.aa.TeShuYueDing[0][0].questions[0].childQuestion[1][0].answer == '') {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[1][0].answer = []
        } else {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[1][0].answer = JSON.parse(this.aa.TeShuYueDing[0][0].questions[0].childQuestion[1][0].answer)
        }
        if (this.aa.TeShuYueDing[0][0].questions[0].childQuestion[2][0].answer === 1 || this.aa.TeShuYueDing[0][0].questions[0].childQuestion[2][0].answer == '') {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[2][0].answer = []
        } else {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[2][0].answer = JSON.parse(this.aa.TeShuYueDing[0][0].questions[0].childQuestion[2][0].answer)
        }
        if (this.aa.TeShuYueDing[0][0].questions[0].childQuestion[3][0].answer === 1 || this.aa.TeShuYueDing[0][0].questions[0].childQuestion[3][0].answer == '') {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[3][0].answer = []
        } else {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[3][0].answer = JSON.parse(this.aa.TeShuYueDing[0][0].questions[0].childQuestion[3][0].answer)
        }
        if (this.aa.TeShuYueDing[0][0].questions[0].childQuestion[4][0].answer === 1 || this.aa.TeShuYueDing[0][0].questions[0].childQuestion[4][0].answer == '') {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[4][0].answer = []
        } else {
          this.aa.TeShuYueDing[0][0].questions[0].childQuestion[4][0].answer = JSON.parse(this.aa.TeShuYueDing[0][0].questions[0].childQuestion[4][0].answer)
        }
        this.loading = false
      }).catch((data) => {
      })
    },

    compare (property) {
      return function (a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value1 - value2
      }
    },

    userAddSelectAnswerAction (e) { // 添加子女或者房产等
      this.$message({
        message: '添加中请稍后……',
        duration: 1000
      })
      userAddSelectAnswer({
        qpid: e,
        quid: localStorage.getItem('quid')
      }).then((data) => {
        if (data.data.status_code === 200) {
          if (e === 3859) {
            this.getZiNvMsg() // 查询子女模块数据
          } else if (e === 521) {
            this.getFangChanMsg() // 查询房产模块数据
          } else if (e === 522) {
            this.getCarMsg() // 查询车辆模块数据
          } else if (e === 637) {
            this.getCunKuanMsg() // 查询存款模块数据
          } else if (e === 523) {
            this.getLiCaiMsg() // 查询理财模块数据
          } else if (e === 3614) {
            this.getGongJiJinMsg() // 查询公积金模块数据
          } else if (e === 524) {
            this.getBaoXian() // 查询保险模块数据
          } else if (e === 3636) {
            this.getGuQuanGuFenMsg() // 查询股权股份模块数据
          } else if (e === 3637) {
            this.getGuPiaoZhangHuMsg() // 查询股票账户模块数据
          } else if (e === 636) {
            this.getJiaDianMsg() // 查询家具家电模块数据
          } else if (e === 3638) {
            this.getZhuBaoShouShiMsg() // 查询珠宝首饰收藏品模块数据
          } else if (e === 3639) {
            this.getZhaiJuanMsg() // 查询债券模块数据
          } else if (e === 3640) {
            this.getDianPuMsg() // 查询店铺模块数据
          } else if (e === 3641) {
            this.getZhaiJiDiMsg() // 查询宅基地房屋模块数据
          } else if (e === 3642) {
            this.getQiTaMsg() // 查询其他模块数据
          } else if (e === 655) {
            this.getZhaiQuanMsg() // 查询债权模块数据
          } else if (e === 656) {
            this.getZhaiWuMsg() // 查询债务模块数据
          } else if (e === 3855) {
            this.getQiTaZhaiQuanMsg() // 查询其他债权债务模块数据
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
    userDeleteSelectAnswerAction (e, index) { // 删除子女或者房产等信息
      this.$confirm('是否删除该选项？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.fullscreenLoading = true
        userDeleteSelectAnswer({
          qpid: e,
          quid: localStorage.getItem('quid'),
          fornum: index + 1
        }).then((data) => {
          if (e === 3859) {
            this.getZiNvMsg() // 查询子女模块数据
          } else if (e === 521) {
            this.getFangChanMsg() // 查询房产模块数据
          } else if (e === 522) {
            this.getCarMsg() // 查询车辆模块数据
          } else if (e === 637) {
            this.getCunKuanMsg() // 查询存款模块数据
          } else if (e === 523) {
            this.getLiCaiMsg() // 查询理财模块数据
          } else if (e === 3614) {
            this.getGongJiJinMsg() // 查询公积金模块数据
          } else if (e === 524) {
            this.getBaoXian() // 查询保险模块数据
          } else if (e === 3636) {
            this.getGuQuanGuFenMsg() // 查询股权股份模块数据
          } else if (e === 3637) {
            this.getGuPiaoZhangHuMsg() // 查询股票账户模块数据
          } else if (e === 636) {
            this.getJiaDianMsg() // 查询家具家电模块数据
          } else if (e === 3638) {
            this.getZhuBaoShouShiMsg() // 查询珠宝首饰收藏品模块数据
          } else if (e === 3639) {
            this.getZhaiJuanMsg() // 查询债券模块数据
          } else if (e === 3640) {
            this.getDianPuMsg() // 查询店铺模块数据
          } else if (e === 3641) {
            this.getZhaiJiDiMsg() // 查询宅基地房屋模块数据
          } else if (e === 3642) {
            this.getQiTaMsg() // 查询其他模块数据
          } else if (e === 655) {
            this.getZhaiQuanMsg() // 查询债权模块数据
          } else if (e === 656) {
            this.getZhaiWuMsg() // 查询债务模块数据
          } else if (e === 3855) {
            this.getQiTaZhaiQuanMsg() // 查询其他债权债务模块数据
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
    stepClick (item, index) {
      this.ins = index
      var _that = this
      this.caichanNav = false
      this.zhaiquanNav = false
      if (item.id < 3) {
        _that.active = item.id
      } else if (item.id === 3) {
        _that.active = 3
        _that.CaiIns = 3
        this.caichanNav = true
      } else if (item.id === 4) {
        _that.active = 17
        _that.zhaiIns = 16
        this.zhaiquanNav = true
      } else if (item.id === 5) {
        _that.active = 20
      }
      localStorage.setItem('active', _that.active)
    },
    caichanNavBtn (index) {
      var _that = this
      _that.CaiIns = 3
      _that.CaiIns = _that.CaiIns + index
      _that.active = index + 3
      localStorage.setItem('active', _that.active)
    },
    zhaiquanNavBtn (index) {
      var _that = this
      _that.zhaiIns = 16

      _that.zhaiIns = _that.zhaiIns + index
      _that.active = index + 17
      localStorage.setItem('active', _that.active)
    },
    prev () {
      this.prevLoading = true
      let mokuai = this.mokuai
      for (var i = 0; i < mokuai.length; i++) {
        if (this.mokuai[this.active].title === mokuai[i].title) {
          localStorage.setItem('qpid', mokuai[i].num)
          demoYanZheng({
            qpid: mokuai[i].num
          }).then((data) => {
            if (data.data.status_code === 330) {
              this.missMsgBox = true
              this.missMsg = data.data.data
              this.loading = false
            } else {
              this.loading = false
              this.caichanNav = false
              this.zhaiquanNav = false
              this.prevLoading = false
              if (this.ins < 3) {
                --this.ins
                --this.active
                var _that = this
                localStorage.setItem('active', _that.active)
              } else if (this.ins === 3) {
                // this.active = 3
                --this.active
                var _that = this
                if (_that.CaiIns > 3) {
                  --_that.CaiIns
                  this.caichanNav = true
                } else if (_that.CaiIns ===3) {
                  --this.ins
                  this.caichanNav = false
                }
                localStorage.setItem('active', this.active)
              } else if (this.ins === 4) {
                --this.active
                var _that = this
                if (_that.zhaiIns > 16) {
                 --_that.zhaiIns
                 this.zhaiquanNav = true
                } else if (_that.zhaiIns ===16) {
                  this.CaiIns = 16
                  --this.ins
                  this.zhaiquanNav = false
                }
                localStorage.setItem('active', this.active)
              } else if (this.ins ===5 ){
                --this.ins
                this.active = 19
                this.zhaiIns = 18
                this.zhaiquanNav = true
              }

              this.$notify({
                title: '保存成功',
                message: mokuai[i].title + '模块已成功保存',
                type: 'success'
              })
            }
          }).catch((data) => {
          })
        }
      }
      if (this.active < 0) this.active = 0
    },
    next () {
      this.nextLoading = true
      let mokuai = this.mokuai
      for (var i = 0; i < mokuai.length; i++) {
        if (this.mokuai[this.active].title === mokuai[i].title) {
          localStorage.setItem('qpid', mokuai[i].num)
          demoYanZheng({
            qpid: mokuai[i].num
          }).then((data) => {
            if (data.data.status_code === 330) {
              this.missMsgBox = true
              this.missMsg = data.data.data
              this.loading = false
            } else {
              this.loading = false
              this.caichanNav = false
              this.zhaiquanNav = false
              this.nextLoading = false
              if (this.ins < 3) {
                this.ins++
                this.active++
                var _that = this
                localStorage.setItem('active', _that.active)
              } else if (this.ins === 3) {
                // this.active = 3
                this.active++
                var _that = this
                if (_that.CaiIns < 17) {
                  _that.CaiIns++
                }
                this.caichanNav = true
                this.zhaiIns = 16
                localStorage.setItem('active', this.active)
              } else if (this.ins === 4) {
                this.active++
                var _that = this
                console.log(_that.zhaiIns)
                if (_that.zhaiIns < 20) {
                  _that.zhaiIns++
                }
                this.zhaiquanNav = true
                localStorage.setItem('active', this.active)
              }
              if (this.active === 17) {
                this.caichanNav = false
                this.zhaiquanNav = true
                this.ins = 4
              } else if (this.active === 20) {
                this.ins = 5
                this.zhaiquanNav = false
              }
              this.$notify({
                title: '保存成功',
                message: mokuai[i].title + '模块已成功保存',
                type: 'success'
              })
              if (this.active++ > this.mokuai.length - 1) this.$router.replace('/ShengChengXieYi')
            }
          }).catch((data) => {
          })
        }
      }
    },
    closeMissMsgBox () { // 关闭未填写项弹窗
      this.missMsgBox = false
      this.flag = false
      this.a = []
      this.nextLoading = false
      this.prevLoading = false
    },
    GoComplatePage () { // 点击生成协议按钮
      this.a = []
      this.IsShow = true
      let mokuai = this.mokuai
      for (var i = 0; i < mokuai.length; i++) {
        localStorage.setItem('qpid', mokuai[i].num)
        demoYanZheng({
          qpid: mokuai[i].num
        }).then((data) => {
          this.a.push(data.data.status_code)
          if (data.data.status_code === 330) {
            this.missMsg = data.data.data
            this.flag = false
          }
        }).catch((data) => {
        })
      }
    },
    quxiao () {
      this.IsShow = false
      this.flag = false
    },
    complate () { // 点击生成协议确定按钮
      this.fullscreenLoading = true
      setTimeout(() => {
        var dd = this.a
        if (dd.indexOf(330) > -1 ) {
          this.IsShow = false
          this.missMsgBox = true
          this.a = []
          this.fullscreenLoading = false
        } else {
          this.GetOutPutWord() // 请求是否能获取到
          this.fullscreenLoading = false
        }
      }, 3000)
    },
    GetOutPutWord () {  // 生成离婚协议书
      outPutWord().then((data) => {
        this.status_code = data.data.status_code
        if (this.status_code === 330) {
          this.missField = data.data.data
          this.IsShow = false
        } else if (this.status_code === 200) {
          this.loading = false
          this.$router.replace('/CustomShengCheng')
          this.missAlert = false
        }
      }).catch((data) => {
      })
    },
    errorAlert (e) { // 错误提醒
      this.$message.error(e)
    },
    canceldialogSaveWenJuan () { // 取消保存按钮
      this.dialogSavedWenJuan = false
    },
    dialogSaveWenJuanOk () { // 点击保存确定按钮保存
      userUpdateQuestionnaire({
        status: 1,
        title: this.userWenJuan.title,
        exemption: 1,
        complete: 2
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
.all{background-color: #f2f4f7;height: auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;}
.c_m_h{height:109px;border-bottom: 2px solid #f2f4f7;margin-top: 39px;}
.c_m_h h2{width:243px;font-size: 25px;color:#535353;font-weight: bold;}
.c_m_h_r{width:542px;text-align: right;}
.c_m_h_r span{display: inline-block;width: 151px;height: 35px;border:1px solid #535353;text-align: center;line-height: 35px;border-radius: 18px;font-size:16px;color:#535353;font-weight: bold;}
.c_m_h_r span:hover{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;cursor:pointer}
html{height: 100%;background-color: #f7fafc;}
.el-loading-spinner{left:50% !important}
#tab-0,#tab-1,#tab-2,#tab-3,#tab-4,#tab-5,#tab-6,#tab-7,#tab-8{font-size: 16px;}
#tab-8{padding-bottom: 80px;}
#tab-9{border-top: 1px solid #d2d2d2;}
.othercai{position: absolute;top: 360px;right: 80px;width: 96px;height: 30px;line-height: 30px;font-weight: bold;font-size: 16px;color: #303133;}
.othercai img{position: absolute;top:6px;right:-2px;}
.navUl{width: 1024px;margin:0 auto;background-color: #f7f7f7;border-radius: 10px;padding:10px}
.navUl li{width: 150px;position: relative;color:#c0c0c0;}
.divider-line{position: absolute;height: 2px;background-color: #C0C4CC;top:21px;left:86px;width: 150px;}
.navUl li:last-of-type .divider-line{display: none;}
.navUl li.active{color: #ff3f68;}
.insNum{width: 24px;height: 24px;line-height: 24px;text-align: center;font-size: 14px;border-radius: 50%;border:2px solid #C0C4CC;color:#C0C4CC;margin:10px auto;display: block;font-weight: bold;background: #fff;}
.active .insNum{color:#fff;border:2px solid #ff3f68;background-color: #ff3f68;}
html{height: 100%;background-color: #f7fafc;}
.allmin{width: 1024px;margin:0 auto;}
.caichanul{position: absolute; top:0;right: 50px; text-align: left;}
.caichanul li{height: 40px;line-height: 40px;padding-left: 20px;}
.caichanul li:nth-of-type(10){margin-top:35px}
.caichanul li.active{color:#0055AA;border-left: 1px solid #0055AA;}
.min{width:600px;margin:0 auto;}
.ban{width:100% !important;}
.returnUserList{top:120px;right: 20px;z-index: 2;}
.saveWenShu{top:170px;right: 20px;z-index: 2;}
.returnUserList_span{width: 132px;height: 35px;font-size: 16px;text-align: center;line-height: 35px;border:1px solid #343434;color:#343434;border-radius: 18px;display: inline-block;}
.step_btn{width: 220px;height: 44px;font-size: 16px;text-align: center;border:1px solid #343434;color:#343434;border-radius: 22px;display: inline-block;margin-right: 22px;cursor: pointer;}
.step_btn_re{border:1px solid #ff3f68;color:#ff3f68;margin-left: 22px;}
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
#missAlert h2{margin:10px 0;font-weight: bold;font-size: 20px;}
#caseMsg{line-height:30px !important;text-indent:2em;}
.el-tooltip__popper.is-dark{background-color: #f7fafc !important;color:#343434 !important; border:1px solid #eae3e3 !important;border-radius: 15px !important;box-shadow: 0px 0px 5px 2px #e6dddd}
.el-tooltip__popper {width: 200px !important;height: 150px !important;overflow-y: scroll !important;}
.el-radio{line-height: 30px !important;}
.tishi_bot{width:502px;margin:0 auto;display: flex;justify-content: space-between;}
.cbt{width: 218px;height: 38px;line-height: 38px;text-align: center;color: #535353;border:1px solid #535353;font-size: 16px;border-radius: 19px;display: inline-block;}
.re{border: 1px solid #ff3f68;color: #ff3f68;background-color: #fff;}
</style>
