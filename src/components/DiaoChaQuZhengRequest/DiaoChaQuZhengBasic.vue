<template>
  <div class="w-full bg-gray-100 relative">
    <div class="container mx-auto">
      <div>
        <div class="py-6">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step :title="item.title" v-for="(item, index) in mokuai" :key="index"  @click.native ="stepClick(index)"></el-step>
          </el-steps>
        </div>
        <div v-for="(mo, key) in mokuai" :key="key" class="min">
          <div v-if="active=== key">
            <div>
              <el-form label-position="top" label-width="160px">
                <div class="text-left mx-auto bg-white px-5 py-5 border border-green-200 rounded-lg shadow-lg">
                  <!--遍历有几个孩子-->
                  <div>
                    <!--遍历孩子的基本信息-->
                    <div v-for="(item,index) in aa[mo.part]" :key="index">
                      <!-- 大问题块 -->
                      <div>
                        <div v-if="mo.title== '报警出警记录' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个报警出警记录</h2>
                        </div>
                        <div v-if="mo.title== '开房记录' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个开房记录</h2>
                        </div>
                        <div v-if="mo.title== '病例资料' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个病例资料</h2>
                        </div>
                        <div v-if="mo.title== '婚姻登记信息' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个婚姻登记信息</h2>
                        </div>
                        <div v-if="mo.title== '监控录像资料' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个监控录像资料</h2>
                        </div>
                        <div v-if="mo.title== '房产' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个房产</h2>
                        </div>
                        <div v-if="mo.title== '车辆' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个车辆</h2>
                        </div>
                        <div v-if="mo.title== '存款' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个存款</h2>
                        </div>
                        <div v-if="mo.title== '公积金' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个公积金</h2>
                        </div>
                        <div v-if="mo.title== '股票' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个股票</h2>
                        </div>
                        <div v-if="mo.title== '股权' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个股权</h2>
                        </div>
                        <div v-if="mo.title== '微信钱包' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个微信钱包</h2>
                        </div>
                        <div v-if="mo.title== '支付宝' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个支付宝</h2>
                        </div>
                        <div v-if="mo.title== '理财' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个理财</h2>
                        </div>
                        <div v-if="mo.title== '拆迁档案' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个拆迁档案</h2>
                        </div>
                        <div v-if="mo.title== '收入明细' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个收入明细</h2>
                        </div>
                        <div v-if="mo.title== '保险' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个保险</h2>
                        </div>
                        <div v-if="mo.title== '抚恤金' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个抚恤金</h2>
                        </div>
                        <div v-if="mo.title== '丧葬费' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个丧葬费</h2>
                        </div>
                        <div v-if="mo.title== '笔迹' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个笔迹</h2>
                        </div>
                        <div v-if="mo.title== '其他' ">
                          <h2 class="border w-24 text-left text-base text-orange-500 px-1 py-1 text-center bg-green-100 rounded">第{{index+1}}个其他</h2>
                        </div>
                      </div>

                      <!-- 大问题块 -->
                      <question-model :newlist = 'item'></question-model>
                      <div>
                        <div v-if="mo.title== '报警出警记录' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userDeleteSelectAnswerAction(1116,index)">删除报警出警记录</div>
                        </div>
                        <div v-if="mo.title== '开房记录' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1125,index)">删除开房记录</div>
                        </div>
                        <div v-if="mo.title== '病例资料' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1131,index)">删除病例资料</div>
                        </div>
                        <div v-if="mo.title== '婚姻登记信息' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1141,index)">删除婚姻登记信息</div>
                        </div>
                        <div v-if="mo.title== '监控录像资料' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1147,index)">删除监控录像资料</div>
                        </div>
                        <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1148,index)">删除房产</div>
                        </div>
                        <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1149,index)">删除车辆</div>
                        </div>
                        <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1150,index)">删除存款</div>
                        </div>
                        <div v-if="mo.title== '公积金' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1151,index)">删除公积金</div>
                        </div>
                        <div v-if="mo.title== '股票' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1152,index)">删除股票</div>
                        </div>
                        <div v-if="mo.title== '股权' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1153,index)">删除股权</div>
                        </div>
                        <div v-if="mo.title== '微信钱包' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1154,index)">删除微信钱包</div>
                        </div>
                        <div v-if="mo.title== '支付宝' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1155,index)">删除支付宝</div>
                        </div>
                        <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1156,index)">删除理财</div>
                        </div>
                        <div v-if="mo.title== '拆迁档案' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1157,index)">删除拆迁档案</div>
                        </div>
                        <div v-if="mo.title== '收入明细' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1158,index)">删除收入明细</div>
                        </div>
                        <div v-if="mo.title== '保险' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1159,index)">删除保险</div>
                        </div>
                        <div v-if="mo.title== '抚恤金' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1160,index)">删除抚恤金</div>
                        </div>
                        <div v-if="mo.title== '丧葬费' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1161,index)">删除丧葬费</div>
                        </div>
                        <div v-if="mo.title== '笔迹' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1162,index)">删除笔迹</div>
                        </div>
                        <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                          <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userDeleteSelectAnswerAction(1163,index)">删除其他</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div v-if="mo.title== '报警出警记录' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer" @click="userAddSelectAnswerAction(1116)">添加报警出警记录</div>
                      </div>
                      <div v-if="mo.title== '开房记录' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1125)">添加开房记录</div>
                      </div>
                      <div v-if="mo.title== '病例资料' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1131)">添加病例资料</div>
                      </div>
                      <div v-if="mo.title== '婚姻登记信息' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1141)">添加婚姻登记信息</div>
                      </div>
                      <div v-if="mo.title== '监控录像资料' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1147)">添加监控录像资料</div>
                      </div>
                      <div v-if="mo.title== '房产' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1148)">添加房产</div>
                      </div>
                      <div v-if="mo.title== '车辆' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1149)">添加车辆</div>
                      </div>
                      <div v-if="mo.title== '存款' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1150)">添加存款</div>
                      </div>
                      <div v-if="mo.title== '公积金' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1151)">添加公积金</div>
                      </div>
                      <div v-if="mo.title== '股票' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1152)">添加股票</div>
                      </div>
                      <div v-if="mo.title== '股权' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1153)">添加股权</div>
                      </div>
                      <div v-if="mo.title== '微信钱包' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1154)">添加微信钱包</div>
                      </div>
                      <div v-if="mo.title== '支付宝' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1155)">添加支付宝</div>
                      </div>
                      <div v-if="mo.title== '理财' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1156)">添加理财</div>
                      </div>
                      <div v-if="mo.title== '拆迁档案' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1157)">添加拆迁档案</div>
                      </div>
                      <div v-if="mo.title== '收入明细' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1158)">添加收入明细</div>
                      </div>
                      <div v-if="mo.title== '保险' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1159)">添加保险</div>
                      </div>
                      <div v-if="mo.title== '抚恤金' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1160)">添加抚恤金</div>
                      </div>
                      <div v-if="mo.title== '丧葬费' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1161)">添加丧葬费</div>
                      </div>
                      <div v-if="mo.title== '笔迹' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1162)">添加笔迹</div>
                      </div>
                      <div v-if="mo.title== '其他' " class="text-right flex justify-end">
                        <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-green-500 hover:text-white cursor-pointer"  @click="userAddSelectAnswerAction(1163)">添加其他</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>

        <div v-show='IsShow' id="alert_xieyi">
          <h2>您已填写完毕，确认生成申请书吗？</h2>
          <div class="queren flex mx-auto">
             <div class="w-24 mr-2">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='quxiao'>
                取消
              </div>
            </div>
            <div class="w-24">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='complate'>
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
             <div class="w-24 mr-2">
              <div class="ml-1 mb-3 py-1 text-base bg-orange-400 text-white px-1 rounded border border-1 hover:bg-orange-500 cursor-pointer" @click='closeMissMsgBox'>
                取消
              </div>
            </div>
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
          <div slot="footer" class="dialog-footer">
            <el-button @click="canceldialogSaveWenJuan">取 消</el-button>
            <el-button type="primary" @click="dialogSaveWenJuanOk">保 存</el-button>
          </div>
        </el-dialog>
        <el-button v-if="active < this.mokuai.length && active > 0" class="my-5" @click="prev">上一步</el-button>
        <el-button v-if="active < this.mokuai.length-1 " class="my-5" @click="next">下一步</el-button>
        <el-button v-if="active==this.mokuai.length-1" class="my-5" @click="GoComplatePage">个性化修改</el-button>
      </div>
    </div>
    <div class="absolute returnUserList right-0">
      <el-button type="primary" @click="returnUserList">返回文书列表</el-button>
    </div>
  </div>
</template>
<script>
  import QuestionModel from '../partials/QuestionModel.vue'   // 引入子组件
  import {returnQuestionnaireJson} from '@/api/api/requestLogin.js'    // 查询问卷json
  import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改离婚协议书
  import {userAddSelectAnswer} from '@/api/api/requestLogin.js'    // 添加子女或者起诉原因等
  import {userDeleteSelectAnswer} from '@/api/api/requestLogin.js'    // 删除子女或者起诉原因等
  import {getOnlyValue} from '@/api/api/requestLogin.js'    // 获取单独问题的值
  import {demoYanZheng} from '@/api/api/requestLogin.js'    // 验证单独word demo
  import {outPutWord} from '@/api/api/requestLogin.js'  // 生成数据接口
  export default {
    components: {
      QuestionModel
    },
      data () {
          return {
            a: {},
            formLabelWidth: '80px',   // 表单标签宽度
            dialogSavedWenJuan: false,   // 点击保存弹出保存弹框
            userWenJuan:{ // 修改用户问卷
              title: '',     // 标题
            },
            aa: {
              BasicInformation: [],    //基本信息
              shishi: [],  //事实理由
              baojing: [],   // 报警记录
              kaifang: [],   //开房记录
              bingli: [],   //病例资料
              hunyin: [],   //婚姻登记信息
              jiankong: [],   //监控
              fangchan: [],// 房产
              car: [],//车辆
              cunkuan: [],//存款
              gongjijin: [],//公积金
              gupiao: [], // 股票
              guquan: [], // 股权
              weixin: [], // 微信
              zhifubao: [], // 支付宝
              licai: [], // 理财
              chaiqian: [], // 拆迁
              shouru: [], // 收入
              baoxian: [], // 保险
              fuxujin: [], // 抚恤金
              sangzang: [], // 丧葬
              biji: [], // 笔迹
              qita: [], // 其他
              shenqingfayuan: [],  // 申请法院
            },
            IsShow: false,
            mokuai: [
              {title: '基本信息', part: 'BasicInformation',id:1, num:1079},
              {title: '事实与理由', part: 'shishi',id:2,num:1100},
            ],
            active: 0,
            missMsgBox: false,      // 错误信息默认不显示
            missMsg: [],   // 验证的时候漏填项
            missAlert: true, // 尚未填写的信息弹框
            status_code: null, // 后台返回的状态码 330 缺失字段 200 成功
            missField: [], // 未填写项目
            flag: false   // 生成协议弹窗是否出现开关
          }
      },
      name: 'DiaoChaQuZhengBasic',

      beforeMount () {
        this.getBasicInformation() // 查询双方基本信息模块数据
        this.getshishi()   // 获取事实与理由
      },
      mounted () {
        this.getChuShi()
       },
      methods: {
        getChuShi () {
          getOnlyValue({
            qpid: 1098, // 关联id
            quid: Number(localStorage.getItem('quid')) //用户的问卷id
          }).then((data)=>{
            let getmodel = JSON.parse(data.data.data)
            if(getmodel.indexOf("1") > -1){
              this.getbaojing()
            }
            if(getmodel.indexOf("2") > -1){
              this.getkaifang()
            }
            if(getmodel.indexOf("3") > -1){
              this.getbingli()
            }
            if(getmodel.indexOf("4") > -1){
              this.gethunyin()
            }
            if(getmodel.indexOf("5") > -1){
              this.getjiankong()
            }
            if(getmodel.indexOf("6") > -1){
              this.getfangchan()
            }
            if(getmodel.indexOf("7") > -1){
              this.getcar()
            }
            if(getmodel.indexOf("8") > -1){
              this.getcunkuan()
            }
            if(getmodel.indexOf("9") > -1){
              this.getgongjijin()
            }
            if(getmodel.indexOf("10") > -1){
              this.getgupiao()
            }
            if(getmodel.indexOf("11") > -1){
              this.getguquan()
            }
            if(getmodel.indexOf("12") > -1){
              this.getweixin()
            }
            if(getmodel.indexOf("13") > -1){
              this.getzhifubao()
            }
            if(getmodel.indexOf("14") > -1){
              this.getlicai()
            }
            if(getmodel.indexOf("15") > -1){
              this.getchaiqian()
            }
            if(getmodel.indexOf("16") > -1){
              this.getshouru()
            }
            if(getmodel.indexOf("17") > -1){
              this.getbaoxian()
            }
            if(getmodel.indexOf("18") > -1){
              this.getfuxujin()
            }
            if(getmodel.indexOf("19") > -1){
              this.getsangzang()
            }
            if(getmodel.indexOf("20") > -1){
              this.getbiji()
            }
            if(getmodel.indexOf("21") > -1){
              this.getqita()
            }
            this.getshenqingfayuan()  // 申请法院

          }).catch((data)=>{
            console.log("保存失败")
          })
        },
        getBasicInformation () { // 查询双方基本信息模块数据
          returnQuestionnaireJson({'qpid': 1079}).then((data)=>{
            this.aa.BasicInformation = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getshishi () {  // 查询事实与理由模块数据
          returnQuestionnaireJson({'qpid': 1100}).then((data)=>{
            this.aa.shishi = data.data.data
            this.mokuai.sort(this.compare('id'));
            if(this.aa.shishi[0][0].questions[1].answer == 1 || this.aa.shishi[0][0].questions[1].answer == ""){
                this.aa.shishi[0][0].questions[1].answer = []
            }else{
                this.aa.shishi[0][0].questions[1].answer = JSON.parse(this.aa.shishi[0][0].questions[1].answer)
            }
          }).catch((data)=>{
          })
        },
        getbaojing () {  // 查询报警记录模块数据
          returnQuestionnaireJson({'qpid': 1116}).then((data)=>{
            this.aa.baojing = data.data.data
            this.mokuai.push({
              title: '报警出警记录',
              part: 'baojing',
              id: 3,
              num:1116
            })
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.baojing.length;i++){
            		let cityAnswer = JSON.parse(this.aa.baojing[i][0].questions[1].answer)
            		this.aa.baojing[i][0].questions[1].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
            }
          }).catch((data)=>{
          })
        },
        refreshBaoJing (){ // 刷新报警记录模块数据
          returnQuestionnaireJson({'qpid': 1116}).then((data)=>{
            this.aa.baojing = data.data.data
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.baojing.length;i++){
            		let cityAnswer = JSON.parse(this.aa.baojing[i][0].questions[1].answer)
            		this.aa.baojing[i][0].questions[1].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
            }

          }).catch((data)=>{
          })
        },
        getkaifang () {// 查询开房记录模块数据
          returnQuestionnaireJson({'qpid': 1125}).then((data)=>{
            this.aa.kaifang = data.data.data
            this.mokuai.push({
              title: '开房记录',
              part: 'kaifang',
              id: 4,
              num:1125
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshKaiFang () { // shua新开房记录模块数据
          returnQuestionnaireJson({'qpid': 1125}).then((data)=>{
            this.aa.kaifang = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getbingli () {// 查询病例资料模块数据
          returnQuestionnaireJson({'qpid': 1131}).then((data)=>{
            this.aa.bingli = data.data.data
            this.mokuai.push({
              title: '病例资料',
              part: 'bingli',
              id: 5,
              num:1131
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshBingLi(){// 刷新病例资料模块数据
          returnQuestionnaireJson({'qpid': 1131}).then((data)=>{
            this.aa.bingli = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        gethunyin () { // 查询婚姻登记记录模块数据
          returnQuestionnaireJson({'qpid': 1141}).then((data)=>{
            this.aa.hunyin = data.data.data
            this.mokuai.push({
              title: '婚姻登记信息',
              part: 'hunyin',
              id: 6,
              num:1141
            })
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.hunyin.length;i++){
            	if(this.aa.hunyin[i][0].questions[2].answer == 1 || this.aa.hunyin[i][0].questions[2].answer == ""){
            	    this.aa.hunyin[i][0].questions[2].answer = []
            	}else{
            	    this.aa.hunyin[i][0].questions[2].answer = JSON.parse(this.aa.hunyin[i][0].questions[2].answer)
            	}
            }
          }).catch((data)=>{
          })
        },
        refreshHunYin (){// 刷新婚姻登记记录模块数据
          returnQuestionnaireJson({'qpid': 1141}).then((data)=>{
            this.aa.hunyin = data.data.data
            for(var i=0;i<this.aa.hunyin.length;i++){
            	if(this.aa.hunyin[i][0].questions[2].answer == 1 || this.aa.hunyin[i][0].questions[2].answer == ""){
            	    this.aa.hunyin[i][0].questions[2].answer = []
            	}else{
            	    this.aa.hunyin[i][0].questions[2].answer = JSON.parse(this.aa.hunyin[i][0].questions[2].answer)
            	}
            }
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getjiankong () {// 查询监控录像资料模块数据
          returnQuestionnaireJson({'qpid': 1147}).then((data)=>{
            this.aa.jiankong = data.data.data
            this.mokuai.push({
              title: '监控录像资料',
              part: 'jiankong',
              id: 7,
              num:1147
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshJianKong () {// 刷新监控录像资料模块数据
          returnQuestionnaireJson({'qpid': 1147}).then((data)=>{
            this.aa.jiankong = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getfangchan () { // 查询房产模块数据
          returnQuestionnaireJson({'qpid': 1148}).then((data)=>{
            this.aa.fangchan = data.data.data
            this.mokuai.push({
              title: '房产',
              part: 'fangchan',
              id: 8,
              num:1148
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshFangChan (){ // 刷新房产模块数据
          returnQuestionnaireJson({'qpid': 1148}).then((data)=>{
            this.aa.fangchan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getcar () {// 查询车辆模块数据
          returnQuestionnaireJson({'qpid': 1149}).then((data)=>{
            this.aa.car = data.data.data
            this.mokuai.push({
              title: '车辆',
              part: 'car',
              id: 9,
              num:1149
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshCar () { // 刷新车辆模块数据
          returnQuestionnaireJson({'qpid': 1149}).then((data)=>{
            this.aa.car = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getcunkuan () {// 查询存款模块数据
          returnQuestionnaireJson({'qpid': 1150}).then((data)=>{
            this.aa.cunkuan = data.data.data
            this.mokuai.push({
              title: '存款',
              part: 'cunkuan',
              id: 10,
              num:1150
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshCunKuan () {// 刷新存款模块数据
          returnQuestionnaireJson({'qpid': 1150}).then((data)=>{
            this.aa.cunkuan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getgongjijin () {// 查询公积金模块数据
          returnQuestionnaireJson({'qpid': 1151}).then((data)=>{
            this.aa.gongjijin = data.data.data
            this.mokuai.push({
              title: '公积金',
              part: 'gongjijin',
              id: 11,
              num:1151
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshGongJiJin () {// 刷新公积金模块数据
          returnQuestionnaireJson({'qpid': 1151}).then((data)=>{
            this.aa.gongjijin = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getgupiao () {// 查询股票模块数据
          returnQuestionnaireJson({'qpid': 1152}).then((data)=>{
            this.aa.gupiao = data.data.data
            this.mokuai.push({
              title: '股票',
              part: 'gupiao',
              id: 12,
              num:1152
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshGuPiao () {// 刷新股票模块数据
          returnQuestionnaireJson({'qpid': 1152}).then((data)=>{
            this.aa.gupiao = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getguquan () {// 查询股权模块数据
          returnQuestionnaireJson({'qpid': 1153}).then((data)=>{
            this.aa.guquan = data.data.data
            this.mokuai.push({
              title: '股权',
              part: 'guquan',
              id: 13,
              num:1153
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshGuQuan () {// 刷新股权模块数据
          returnQuestionnaireJson({'qpid': 1153}).then((data)=>{
            this.aa.guquan = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getweixin () {// 查询微信钱包模块数据
          returnQuestionnaireJson({'qpid': 1154}).then((data)=>{
            this.aa.weixin = data.data.data
            this.mokuai.push({
              title: '微信钱包',
              part: 'weixin',
              id: 14,
              num:1154
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshWeiXin () {//刷新微信钱包模块数据
          returnQuestionnaireJson({'qpid': 1154}).then((data)=>{
            this.aa.weixin = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getzhifubao () {// 查询支付宝模块数据
          returnQuestionnaireJson({'qpid': 1155}).then((data)=>{
            this.aa.zhifubao = data.data.data
            this.mokuai.push({
              title: '支付宝',
              part: 'zhifubao',
              id: 15,
              num:1155
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshZhiFuBao () {// 刷新支付宝模块数据
          returnQuestionnaireJson({'qpid': 1155}).then((data)=>{
            this.aa.zhifubao = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getlicai () {// 查询理财模块数据
          returnQuestionnaireJson({'qpid': 1156}).then((data)=>{
            this.aa.licai = data.data.data
            this.mokuai.push({
              title: '理财',
              part: 'licai',
              id: 16,
              num:1156
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshLiCai () {// 刷新理财模块数据
          returnQuestionnaireJson({'qpid': 1156}).then((data)=>{
            this.aa.licai = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getchaiqian () {// 查询拆迁档案（分家析产）模块数据
          returnQuestionnaireJson({'qpid': 1157}).then((data)=>{
            this.aa.chaiqian = data.data.data
            this.mokuai.push({
              title: '拆迁档案',
              part: 'chaiqian',
              id: 17,
              num:1157
            })
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.chaiqian.length;i++){
            		if(this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer == 1 || this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer == ""){
                  this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer = []
              }else{
                this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer = JSON.parse(this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer)
              }
            }
          }).catch((data)=>{
          })
        },
        refreshChaiQian () {// 刷新拆迁档案（分家析产）模块数据
          returnQuestionnaireJson({'qpid': 1157}).then((data)=>{
            this.aa.chaiqian = data.data.data
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.chaiqian.length;i++){
            		if(this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer == 1 || this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer == ""){
	                this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer = []
	            }else{
	              this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer = JSON.parse(this.aa.chaiqian[i][0].questions[7].childQuestion[1][0].answer)
	            }
            }
          }).catch((data)=>{
          })
        },
        getshouru () {// 查询收入明细模块数据
          returnQuestionnaireJson({'qpid': 1158}).then((data)=>{
            this.aa.shouru = data.data.data
            this.mokuai.push({
              title: '收入明细',
              part: 'shouru',
              id: 18,
              num:1158
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshShouRu () {// 刷新收入明细模块数据
          returnQuestionnaireJson({'qpid': 1158}).then((data)=>{
            this.aa.shouru = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getbaoxian () {// 查询保险模块数据
          returnQuestionnaireJson({'qpid': 1159}).then((data)=>{
            this.aa.baoxian = data.data.data
            this.mokuai.push({
              title: '保险',
              part: 'baoxian',
              id: 19,
              num:1159
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshBaoXian () {// 刷新保险模块数据
          returnQuestionnaireJson({'qpid': 1159}).then((data)=>{
            this.aa.baoxian = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getfuxujin () {// 查询抚恤金模块数据
          returnQuestionnaireJson({'qpid': 1160}).then((data)=>{
            this.aa.fuxujin = data.data.data
            this.mokuai.push({
              title: '抚恤金',
              part: 'fuxujin',
              id: 20,
              num:1160
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshFuXuJin () {// 刷新抚恤金模块数据
          returnQuestionnaireJson({'qpid': 1160}).then((data)=>{
            this.aa.fuxujin = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getsangzang () { // 查询丧葬费模块数据
          returnQuestionnaireJson({'qpid': 1161}).then((data)=>{
            this.aa.sangzang = data.data.data
            this.mokuai.push({
              title: '丧葬费',
              part: 'sangzang',
              id: 21,
              num:1161
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshSangZangFei () { // 刷新丧葬费模块数据
          returnQuestionnaireJson({'qpid': 1161}).then((data)=>{
            this.aa.sangzang = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getbiji () {// 查询笔迹模块数据
          returnQuestionnaireJson({'qpid': 1162}).then((data)=>{
            this.aa.biji = data.data.data
            this.mokuai.push({
              title: '笔迹',
              part: 'biji',
              id: 22,
              num:1162
            })
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.biji.length;i++){
            		if(this.aa.biji[i][0].questions[1].answer == 1 || this.aa.biji[i][0].questions[1].answer == ""){
	                this.aa.biji[i][0].questions[1].answer = []
	              }else{
	                this.aa.biji[i][0].questions[1].answer = JSON.parse(this.aa.biji[i][0].questions[1].answer)
	              }
            }
          }).catch((data)=>{
          })
        },
        refreshBiJi () {// 刷新笔迹模块数据
          returnQuestionnaireJson({'qpid': 1162}).then((data)=>{
            this.aa.biji = data.data.data
            this.mokuai.sort(this.compare('id'));
            for(var i=0;i<this.aa.biji.length;i++){
            		if(this.aa.biji[i][0].questions[1].answer == 1 || this.aa.biji[i][0].questions[1].answer == ""){
	                this.aa.biji[i][0].questions[1].answer = []
	              }else{
	                this.aa.biji[i][0].questions[1].answer = JSON.parse(this.aa.biji[i][0].questions[1].answer)
	              }
            }

          }).catch((data)=>{
          })
        },
        getqita () {// 查询其他模块数据
          returnQuestionnaireJson({'qpid': 1163}).then((data)=>{
            this.aa.qita = data.data.data
            this.mokuai.push({
              title: '其他',
              part: 'qita',
              id: 23,
              num:1163
            })
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        refreshQiTa () {// 刷新其他模块数据
          returnQuestionnaireJson({'qpid': 1163}).then((data)=>{
            this.aa.qita = data.data.data
            this.mokuai.sort(this.compare('id'));
          }).catch((data)=>{
          })
        },
        getshenqingfayuan(){
          returnQuestionnaireJson({'qpid': 1236}).then((data)=>{  // 查询申请法院模块数据
            this.aa.shenqingfayuan = data.data.data
            this.mokuai.push({
              title: '申请法院',
              part: 'shenqingfayuan',
              id: 24,
              num:1236
            })
            this.mokuai.sort(this.compare('id'));
            let cityAnswer = JSON.parse(this.aa.shenqingfayuan[0][0].questions[0].answer)
            this.aa.shenqingfayuan[0][0].questions[0].answer = [TextToCode[cityAnswer[0]].code,TextToCode[cityAnswer[0]][cityAnswer[1]].code,TextToCode[cityAnswer[0]][cityAnswer[1]][cityAnswer[2]].code]
          }).catch((data)=>{
          })
        },
        compare (property) {
          return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2
          }
        },
        userAddSelectAnswerAction (e){   // 添加多子女模块按钮
            this.$message({
              message:'添加中请稍后……',
              duration: 1000
            });
            userAddSelectAnswer({
              qpid: e,
              quid: localStorage.getItem('quid')
            }).then((data)=>{
              if(data.data.status_code == 200 ){
                if(e==1116){
                  this.refreshBaoJing()  // 刷新报警出警记录模块
                }else if(e==1125){
                  this.refreshKaiFang()  // 刷新开房记录模块
                }else if(e==1131){
                  this.refreshBingLi()  // 刷新病例资料模块
                }else if(e==1141){
                  this.refreshHunYin()  // 刷新婚姻登记信息模块
                }else if(e==1147){
                  this.refreshJianKong()  // 刷新监控录像资料模块
                }else if(e==1148){
                  this.refreshFangChan()  // 刷新房产模块
                }else if(e==1149){
                  this.refreshCar()  // 刷新车辆模块
                }else if(e==1150){
                  this.refreshCunKuan()  // 刷新存款模块
                }else if(e==1151){
                  this.refreshGongJiJin()  // 刷新公积金模块
                }else if(e==1152){
                  this.refreshGuPiao()  // 刷新股票模块
                }else if(e==1153){
                  this.refreshGuQuan()  // 刷新股权模块
                }else if(e==1154){
                  this.refreshWeiXin()  // 刷新微信钱包模块
                }else if(e==1155){
                  this.refreshZhiFuBao()  // 刷新支付宝模块
                }else if(e==1156){
                  this.refreshLiCai()  // 刷新理财模块
                }else if(e==1157){
                  this.refreshChaiQian()  // 刷新拆迁模块
                }else if(e==1158){
                  this.refreshShouRu()  // 刷新收入模块
                }else if(e==1159){
                  this.refreshBaoXian()  // 刷新保险模块
                }else if(e==1160){
                  this.refreshFuXuJin()  // 刷新抚恤金模块
                }else if(e==1161){
                  this.refreshSangZangFei()  // 刷新丧葬费模块
                }else if(e==1162){
                  this.refreshBiJi()  // 刷新笔迹模块
                }else if(e==1163){
                  this.refreshQiTa()  // 刷新其他模块
                }
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
            }).catch((data)=>{
               this.$message.error('添加失败，请联系管理员');
            })
        },
        userDeleteSelectAnswerAction (e,index) { // 删除多子女模块按钮
          this.$confirm('是否删除该选项？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              userDeleteSelectAnswer({
                qpid: e,
                quid: localStorage.getItem('quid'),
                fornum: index+1
              }).then((data)=>{
                if(e==1116){
                  this.refreshBaoJing()  // 刷新报警出警记录模块
                }else if(e==1125){
                  this.refreshKaiFang()  // 刷新开房记录模块
                }else if(e==1131){
                  this.refreshBingLi()  // 刷新病例资料模块
                }else if(e==1141){
                  this.refreshHunYin()  // 刷新婚姻登记信息模块
                }else if(e==1147){
                  this.refreshJianKong()  // 刷新监控录像资料模块
                }else if(e==1148){
                  this.refreshFangChan()  // 刷新房产模块
                }else if(e==1149){
                  this.refreshCar()  // 刷新车辆模块
                }else if(e==1150){
                  this.refreshCunKuan()  // 刷新存款模块
                }else if(e==1151){
                  this.refreshGongJiJin()  // 刷新公积金模块
                }else if(e==1152){
                  this.refreshGuPiao()  // 刷新股票模块
                }else if(e==1153){
                  this.refreshGuQuan()  // 刷新股权模块
                }else if(e==1154){
                  this.refreshWeiXin()  // 刷新微信钱包模块
                }else if(e==1155){
                  this.refreshZhiFuBao()  // 刷新支付宝模块
                }else if(e==1156){
                  this.refreshLiCai()  // 刷新理财模块
                }else if(e==1157){
                  this.refreshChaiQian()  // 刷新拆迁模块
                }else if(e==1158){
                  this.refreshShouRu()  // 刷新收入模块
                }else if(e==1159){
                  this.refreshBaoXian()  // 刷新保险模块
                }else if(e==1160){
                  this.refreshFuXuJin()  // 刷新抚恤金模块
                }else if(e==1161){
                  this.refreshSangZangFei()  // 刷新丧葬费模块
                }else if(e==1162){
                  this.refreshBiJi()  // 刷新笔迹模块
                }else if(e==1163){
                  this.refreshQiTa()  // 刷新其他模块
                }
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1000
                });
              }).catch((data)=>{
                this.$message.error('删除失败，请联系管理员');
              })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        GoComplatePage () { // 点击个性化修改的时候先验证申请法院是否填写，如果填写则弹出框
          let mokuai = this.mokuai
          for(var i =0;i<mokuai.length;i++){
            localStorage.setItem('qpid', mokuai[i].num)
            demoYanZheng({
              qpid: mokuai[i].num
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
                this.flag = false
              }else{
                this.flag = true;
                this.IsShow = true;
              }
            }).catch((data)=>{
            })
          }
          // if(this.flag==true){
          //   this.IsShow = true;
          // }
        },
        quxiao (){
          this.IsShow = false;
          this.flag = false
        },
        complate () {
          this.GetOutPutWord();
        },
        stepClick (val) {
          var _that = this;
          _that.active = val;
          localStorage.setItem('active',val)
        },
        prev () {
          --this.active;
          if(this.active < 0 ) this.active = 0;
        },
        next () {
          localStorage.setItem('active',this.active)
          if(this.mokuai[this.active].title == '基本信息'){
            localStorage.setItem('qpid', 1079)
            demoYanZheng({
              qpid: 1079
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '基本信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '事实与理由'){
            localStorage.setItem('qpid', 1100)
            demoYanZheng({
              qpid: 1100
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '事实与理由信息已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '申请法院'){
            localStorage.setItem('qpid', 1236)
            demoYanZheng({
              qpid: 1236
            }).then((data)=>{
              // console.log(data.data)
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '申请法院模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '报警出警记录'){
            localStorage.setItem('qpid', 1116)
            demoYanZheng({
              qpid: 1116
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '报警出警记录信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '开房记录'){
            localStorage.setItem('qpid', 1125)
            demoYanZheng({
              qpid: 1125
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '开房记录信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1);
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '病例资料'){
            localStorage.setItem('qpid', 1131)
            demoYanZheng({
              qpid: 1131
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '病例资料模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '婚姻登记信息'){
            localStorage.setItem('qpid', 1141)
            demoYanZheng({
              qpid: 1141
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '婚姻登记信息信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '监控录像资料'){
            localStorage.setItem('qpid', 1147)
            demoYanZheng({
              qpid: 1147
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '监控录像资料信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '房产'){
            localStorage.setItem('qpid', 1148)
            demoYanZheng({
              qpid: 1148
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '房产信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '车辆'){
            localStorage.setItem('qpid', 1149)
            demoYanZheng({
              qpid: 1149
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '车辆信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '存款'){
            localStorage.setItem('qpid', 1150)
            demoYanZheng({
              qpid: 1150
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '存款信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '公积金'){
            localStorage.setItem('qpid', 1151)
            demoYanZheng({
              qpid: 1151
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '公积金信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '股票'){
            localStorage.setItem('qpid', 1152)
            demoYanZheng({
              qpid: 1152
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '股票信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '股权'){
            localStorage.setItem('qpid', 1153)
            demoYanZheng({
              qpid: 1153
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '股权信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '微信钱包'){
            localStorage.setItem('qpid', 1154)
            demoYanZheng({
              qpid: 1154
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '微信钱包信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '支付宝'){
            localStorage.setItem('qpid', 1155)
            demoYanZheng({
              qpid: 1155
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '支付宝信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '理财'){
            localStorage.setItem('qpid', 1156)
            demoYanZheng({
              qpid: 1156
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '理财信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '拆迁档案'){
            localStorage.setItem('qpid', 1157)
            demoYanZheng({
              qpid: 1157
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '拆迁档案信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '收入明细'){
            localStorage.setItem('qpid', 1158)
            demoYanZheng({
              qpid: 1158
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '收入明细信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '保险'){
            localStorage.setItem('qpid', 1159)
            demoYanZheng({
              qpid: 1159
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '保险信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '抚恤金'){
            localStorage.setItem('qpid', 1160)
            demoYanZheng({
              qpid: 1160
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '抚恤金信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '丧葬费'){
            localStorage.setItem('qpid', 1161)
            demoYanZheng({
              qpid: 1161
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '丧葬金信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '笔迹'){
            localStorage.setItem('qpid', 1162)
            demoYanZheng({
              qpid: 1162
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '笔迹信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '其他'){
            localStorage.setItem('qpid', 1163)
            demoYanZheng({
              qpid: 1163
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '其他信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }else if(this.mokuai[this.active].title == '申请法院'){
            localStorage.setItem('qpid', 1236)
            demoYanZheng({
              qpid: 1236
            }).then((data)=>{
              if(data.data.status_code == 330){
                this.missMsgBox = true
                this.missMsg = data.data.data
              }else{
                this.$notify({
                  title: '保存成功',
                  message: '申请法院信息模块已成功保存',
                  type: 'success'
                });
                if (this.active++ >this.mokuai.length-1) ;
              }
            }).catch((data)=>{
            })
          }
        },
        closeMissMsgBox () {   // 关闭未填写项弹窗
          this.missMsgBox = false
          this.flag=false
        },
        GetOutPutWord () {   // 获取离婚协议书未填写项
          // localStorage.setItem('qid',5)
          outPutWord().then((data)=>{
            this.status_code = data.data.status_code
            // console.log(this.status_code)
            if(this.status_code == 330 ){
                this.missField = data.data.data
                this.IsShow = false;
            }else if(this.status_code == 200){

                this.$router.replace("/DiaoChaQuZhengPersonalize");
                this.missAlert = false
            }
          }).catch((data)=>{
          })
        },
        errorAlert(e) {
          this.$message.error(e);
        },
        canceldialogSaveWenJuan(){   // 取消保存按钮
          this.dialogSavedWenJuan = false;
          this.$router.replace("/UserSystem");
        },
        dialogSaveWenJuanOk(){  // 点击保存确定按钮保存
          userUpdateQuestionnaire({
            status: 1,
            title: this.userWenJuan.title,
            exemption: 1,
            complete: 2
          }).then((data)=>{
            this.userWenJuan.title = '';
            this.dialogSavedWenJuan = false;
            this.$router.replace("/UserSystem");
          }).catch((data)=>{

          })
        },
        returnUserList(){  // 返回协议列表
          this.dialogSavedWenJuan = true;
        }
      }
    }
</script>
<style>
html{height: 100%;background-color: #f7fafc;}
.min{width:600px;margin:0 auto;}
.ban{width:100% !important;}
.returnUserList{top:110px;right: 20px;}
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
#missAlert h2{margin:20px 0;font-weight: bold;font-size: 20px;}
#caseMsg{line-height:30px !important;text-indent:2em;}
.el-tooltip__popper.is-dark{background-color: #f7fafc !important;color:#343434 !important; border:1px solid #eae3e3 !important;border-radius: 15px !important;box-shadow: 0px 0px 5px 2px #e6dddd}
.el-tooltip__popper {width: 200px !important;height: 150px !important;overflow-y: scroll !important;}
.el-radio{
  line-height: 30px !important;
}
</style>
