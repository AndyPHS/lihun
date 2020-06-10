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
      <div class="pb-5">
        <div class="relative">
          <div class=" mx-auto">
            <div>
              <el-form label-position="top" label-width="160px">
                <div class="ml-5">
                  <div class="text-2xl font-bold text-center py-8">为了更高效地为您定制专属协议，请填写如下问题：</div>
                  <div class="w-3/5 text-left mx-auto bg-white px-5 py-5">
                    <!--遍历孩子的基本信息-->
                    <div v-for="(item,index) in childAll" :key="index">
                      <!-- <h2 class="text-left my-5 border-b pb-5 text-base text-orange-500">其他财产</h2> -->
                      <!-- 大问题块 -->
                      <div v-for="($item,$index) in item"  :key="$index">
                        <h2 class="text-left">{{$item.title}}</h2>

                        <!-- 一级问题块 -->

                        <div v-for="($$item,$$index) in $item.questions" :key="$$index">
                          <div v-if="!$$item.requireQidAndAnswer || ($$item.requireQidAndAnswer && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0] && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0].answer == $$item.requireQidAndAnswer.answer)">
                            <!--日期-精确到日-->
                            <div v-if="$$item.type == 'dateTime_day'">
                              <el-form-item :label="$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title" class="text-base">
                                <el-date-picker
                                  v-model="$$item.answer"
                                  @change="userAddAnswerAction($$item)"
                                  type="date"
                                  size="small"
                                  placeholder="选择日期"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd">
                                </el-date-picker>
                              </el-form-item>
                            </div>
                            <!--输入框-文字类型-->
                            <div v-if="$$item.type == 'input' && $$item.input_type=='text'">
                              <el-form-item label="" class="text-base">
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-input
                                  type="text"
                                  class="ban"
                                  v-model="$$item.answer"
                                  size="small"
                                  :placeholder="$$item.placeholder"
                                  @blur="userAddAnswerAction($$item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                            <!--输入框-数字类型（类似身份证号、金额）-->
                            <div v-if="$$item.type == 'input' && $$item.input_type=='number'">
                              <el-form-item label=""  class="text-base">
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-input
                                  type="number"
                                  class="ban"
                                  v-model="$$item.answer"
                                  size="small"
                                  :placeholder="$$item.placeholder"
                                  @blur="userAddAnswerAction($$item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                            <!--单选框-->
                            <div v-if="$$item.type == 'radio'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
                                <el-radio-group v-model="$$item.answer" @change='userAddAnswerAction($$item)'>
                                  <el-radio :label="$$$item.value" v-for="($$$item, $$$index) in $$item.listData" :key="$$$index" >{{$$$item.label}}</el-radio>
                                </el-radio-group>
                              </el-form-item>
                              <div v-if="$$item.childQuestion  && $$item.childQuestion[$$item.answer]">
                                <div v-for="($$$item, $$$index) in $$item.childQuestion[$$item.answer]" :key="$$$index">
                                  <!-- 数字 -->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-input
                                        type="text"
                                        class="ban"
                                        v-model="$$$item.answer"
                                        size="small"
                                        :placeholder="$$$item.placeholder"
                                        @blur="userAddAnswerAction($$$item)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                  <!-- 银行卡 -->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='BankCard'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-input
                                        type="number"
                                        class="ban"
                                        v-model="$$$item.answer"
                                        size="small"
                                        :placeholder="$$$item.placeholder"
                                        @blur="numAddAnswer($$$item)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                  <!-- 手机号 -->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='PhoneNum'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-input
                                        type="number"
                                        class="ban"
                                        v-model="$$$item.answer"
                                        size="small"
                                        :placeholder="$$$item.placeholder"
                                        @blur="numAddAnswer($$$item)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                  <!--输入框-文字类型-->
                                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='text'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-input
                                        type="text"
                                        class="ban"
                                        v-model="$$$item.answer"
                                        size="small"
                                        :placeholder="$$$item.placeholder"
                                        @blur="userAddAnswerAction($$$item)"
                                      ></el-input>
                                    </el-form-item>
                                  </div>
                                  <!-- 省市三级联动 -->
                                  <div v-if="$$$item.type == 'select_city'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-cascader
                                      v-model="$$$item.answer"
                                      :options="options"
                                      @change="userAddAnswerAction($$$item)">
                                      </el-cascader>
                                    </el-form-item>
                                  </div>
                                  <!-- 多选框 -->
                                  <div v-if="$$$item.type == 'checkbox'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="($$$$item, $$$$index) in $$$item.imgDate" :key="$$$$index" popper-class="overflow-y:scroll">
                                             <img :src="$$$$item">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-checkbox-group v-model="$$$item.answer" >
                                        <el-checkbox :label="$$$$item.value" v-for="($$$$item, $$$$index) in $$$item.listData" :key="$$$$index"  @change='userAddAnswerAction($$$item)'>{{$$$$item.label}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                        <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]" :key="$$$$$index">
                                          <!-- 数字类型输入框 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="number"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="userAddAnswerAction($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!--输入框-文字类型-->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="text"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="userAddAnswerAction($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 银行卡 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="number"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 手机号 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="number"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 省市三级联动 -->
                                          <div v-if="$$$$$item.type == 'select_city'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-cascader
                                              v-model="$$$$$item.answer"
                                              :options="options"
                                              @change="userAddAnswerAction($$$$$item)">
                                              </el-cascader>
                                            </el-form-item>
                                          </div>
                                          <!--下拉框选择每月几号-->
                                          <div v-if="$$$$$item.type == 'select_day_per'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                                <el-select v-model="$$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)">
                                                  <el-option
                                                    v-for="(s,i) in days"
                                                    :key="i"
                                                    :label="s"
                                                    :value="s">
                                                  </el-option>
                                                </el-select>
                                              </el-form-item>
                                          </div>
                                          <!--下拉框选择月几号-->
                                          <div v-if="$$$$$item.type == 'select_day'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                                <el-select v-model="$$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)" >
                                                  <el-option
                                                    v-for="(s,i) in days"
                                                    :key="i"
                                                    :label="s"
                                                    :value="s">
                                                  </el-option>
                                                </el-select>
                                              </el-form-item>
                                          </div>
                                          <!--下拉选择一年中哪个月-->
                                          <div v-if="$$$$$item.type == 'select_year'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-select v-model="$$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$$item)">
                                                <el-option
                                                  v-for="(s,i) in mon"
                                                  :key="i"
                                                  :label="s"
                                                  :value="s">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <!--日期-精确到日-->
                                  <div v-if="$$$item.type == 'dateTime_day'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-date-picker
                                        v-model="$$$item.answer"
                                        type="date"
                                        size="small"
                                        placeholder="选择日期"
                                        format="yyyy 年 MM 月 dd 日"
                                        @change="userAddAnswerAction($$$item)"
                                        value-format="yyyy-MM-dd">
                                      </el-date-picker>
                                    </el-form-item>
                                  </div>
                                  <!--日期-区间几点到几点-->
                                  <div v-if="$$$item.type == 'dateTime_Time_Interval'">
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                    </div>
                                     <el-time-picker
                                       v-model="$$$item.answer"
                                       @change="userAddAnswerAction($$$item)"
                                       type="datetimerange"
                                       is-range
                                       size="small"
                                       range-separator="至"
                                       start-placeholder="开始日期"
                                       end-placeholder="结束日期"
                                       placeholder="选择时间范围">
                                     </el-time-picker>
                                   </el-form-item>
                                  </div>
                                  <!--日期-区间几号到几号-->
                                  <div v-if="$$$item.type == 'dateTime_Day_Interval'">
                                   <el-form-item label="" class="text-base">
                                    <div>
                                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                        <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                        <i class="el-icon-question"></i>
                                      </el-tooltip>
                                      <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                    </div>
                                    <el-date-picker
                                       v-model="$$$item.answer"
                                       @change="userAddAnswerAction($$$item)"
                                       type="daterange"
                                       size="small"
                                       range-separator="至"
                                       start-placeholder="开始日期"
                                       end-placeholder="结束日期"
                                       placeholder="选择日期范围">
                                    </el-date-picker>
                                   </el-form-item>
                                  </div>
                                  <!--单选框-->
                                  <div v-if="$$$item.type == 'radio'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-radio-group v-model="$$$item.answer" @change='userAddAnswerAction($$$item)'>
                                        <el-radio :label="$$$$item.value" v-for="($$$$item, $$$$index) in $$$item.listData" :key="$$$$index" >{{$$$$item.label}}</el-radio>
                                      </el-radio-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item,$$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                        <!-- 数字 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="text"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 银行卡 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="number"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="numAddAnswer($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 手机号 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="number"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="numAddAnswer($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!--输入框-文字类型-->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="text"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 省市三级联动 -->
                                        <div v-if="$$$$item.type == 'select_city'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-cascader
                                            v-model="$$$$item.answer"
                                            :options="options"
                                            @change="userAddAnswerAction($$$$item)">
                                            </el-cascader>
                                          </el-form-item>
                                        </div>
                                        <!-- 多选框 -->
                                        <div v-if="$$$$item.type == 'checkbox'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="($$$$$item, $$$$$index) in $$$$item.imgDate" :key="$$$$$index" popper-class="overflow-y:scroll">
                                                   <img :src="$$$$$item">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-checkbox-group v-model="$$$$item.answer" >
                                              <el-checkbox :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index"  @change='userAddAnswerAction($$$$item)'>{{$$$$$item.label}}</el-checkbox>
                                            </el-checkbox-group>
                                          </el-form-item>
                                        </div>
                                        <!--日期-精确到日-->
                                        <div v-if="$$$$item.type == 'dateTime_day'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-date-picker
                                              v-model="$$$$item.answer"
                                              type="date"
                                              size="small"
                                              placeholder="选择日期"
                                              format="yyyy 年 MM 月 dd 日"
                                              @change="userAddAnswerAction($$$$item)"
                                              value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                          </el-form-item>
                                        </div>
                                        <!--日期-区间几点到几点-->
                                        <div v-if="$$$$item.type == 'dateTime_Time_Interval'">
                                         <el-form-item label="" class="text-base">
                                          <div>
                                            <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                          </div>
                                           <el-time-picker
                                             v-model="$$$$item.answer"
                                             @change="userAddAnswerAction($$$$item)"
                                             type="datetimerange"
                                             is-range
                                             size="small"
                                             range-separator="至"
                                             start-placeholder="开始日期"
                                             end-placeholder="结束日期"
                                             placeholder="选择时间范围">
                                           </el-time-picker>
                                         </el-form-item>
                                        </div>
                                        <!--日期-区间几号到几号-->
                                        <div v-if="$$$$item.type == 'dateTime_Day_Interval'">
                                         <el-form-item label="" class="text-base">
                                          <div>
                                            <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                          </div>
                                          <el-date-picker
                                             v-model="$$$$item.answer"
                                             @change="userAddAnswerAction($$$$item)"
                                             type="daterange"
                                             size="small"
                                             range-separator="至"
                                             start-placeholder="开始日期"
                                             end-placeholder="结束日期"
                                             placeholder="选择日期范围">
                                          </el-date-picker>
                                         </el-form-item>
                                        </div>
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-radio-group v-model="$$$$item.answer" @change='userAddAnswerAction($$$$item)'>
                                              <el-radio :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index" >{{$$$$$item.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(单选)-->
                                        <div v-if="$$$$item.type == 'select'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer"  @change='userAddAnswerAction($$$$item)' size="small">
                                              <el-option
                                                v-for="s in $$$$item.listData"
                                                :key="s.value"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(多选)-->
                                        <div v-if="$$$$item.type == 'select_multiple'">
                                          <el-form-item label="">
                                             <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$item)'>
                                              <el-option
                                                v-for="(s, i) in $$$$item.listData"
                                                :key="i"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框选择每月几号-->
                                        <div v-if="$$$$item.type == 'select_day_per'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                              <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                                <el-option
                                                  v-for="(s,i) in days"
                                                  :key="i"
                                                  :label="s"
                                                  :value="s">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                        </div>
                                        <!--下拉框选择月几号-->
                                        <div v-if="$$$$item.type == 'select_day'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                              <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)" >
                                                <el-option
                                                  v-for="(s,i) in days"
                                                  :key="i"
                                                  :label="s"
                                                  :value="s">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                        </div>
                                        <!--下拉选择一年中哪个月-->
                                        <div v-if="$$$$item.type == 'select_year'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)">
                                              <el-option
                                                v-for="(s,i) in mon"
                                                :key="i"
                                                :label="s"
                                                :value="s">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <!--下拉框(单选)-->
                                  <div v-if="$$$item.type == 'select'">
                                    <el-form-item label="">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-select v-model="$$$item.answer"  @change='userAddAnswerAction($$$item)' size="small">
                                        <el-option
                                          v-for="(s, i) in $$$item.listData"
                                          :key="i"
                                          :label="s.label"
                                          :value="s.value">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item,$$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                        <!-- 数字 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="text"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 银行卡 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="number"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="numAddAnswer($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 手机号 -->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="number"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="numAddAnswer($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!--输入框-文字类型-->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-input
                                              type="text"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!-- 省市三级联动 -->
                                        <div v-if="$$$$item.type == 'select_city'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-cascader
                                            v-model="$$$$item.answer"
                                            :options="options"
                                            @change="userAddAnswerAction($$$$item)">
                                            </el-cascader>
                                          </el-form-item>
                                        </div>
                                        <!-- 多选框 -->
                                        <div v-if="$$$$item.type == 'checkbox'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="($$$$$item, $$$$$index) in $$$$item.imgDate" :key="$$$$$index" popper-class="overflow-y:scroll">
                                                   <img :src="$$$$$item">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-checkbox-group v-model="$$$$item.answer" >
                                              <el-checkbox :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index"  @change='userAddAnswerAction($$$$item)'>{{$$$$$item.label}}</el-checkbox>
                                            </el-checkbox-group>
                                          </el-form-item>
                                        </div>
                                        <!--日期-精确到日-->
                                        <div v-if="$$$$item.type == 'dateTime_day'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-date-picker
                                              v-model="$$$$item.answer"
                                              type="date"
                                              size="small"
                                              placeholder="选择日期"
                                              format="yyyy 年 MM 月 dd 日"
                                              @change="userAddAnswerAction($$$$item)"
                                              value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                          </el-form-item>
                                        </div>
                                        <!--日期-区间几点到几点-->
                                        <div v-if="$$$$item.type == 'dateTime_Time_Interval'">
                                         <el-form-item label="" class="text-base">
                                          <div>
                                            <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                          </div>
                                           <el-time-picker
                                             v-model="$$$$item.answer"
                                             @change="userAddAnswerAction($$$$item)"
                                             type="datetimerange"
                                             is-range
                                             size="small"
                                             range-separator="至"
                                             start-placeholder="开始日期"
                                             end-placeholder="结束日期"
                                             placeholder="选择时间范围">
                                           </el-time-picker>
                                         </el-form-item>
                                        </div>
                                        <!--日期-区间几号到几号-->
                                        <div v-if="$$$$item.type == 'dateTime_Day_Interval'">
                                         <el-form-item label="" class="text-base">
                                          <div>
                                            <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                              <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                              <i class="el-icon-question"></i>
                                            </el-tooltip>
                                            <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                          </div>
                                          <el-date-picker
                                             v-model="$$$$item.answer"
                                             @change="userAddAnswerAction($$$$item)"
                                             type="daterange"
                                             size="small"
                                             range-separator="至"
                                             start-placeholder="开始日期"
                                             end-placeholder="结束日期"
                                             placeholder="选择日期范围">
                                          </el-date-picker>
                                         </el-form-item>
                                        </div>
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-radio-group v-model="$$$$item.answer" @change='userAddAnswerAction($$$$item)'>
                                              <el-radio :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index" >{{$$$$$item.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(单选)-->
                                        <div v-if="$$$$item.type == 'select'">
                                          <el-form-item label="">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer"  @change='userAddAnswerAction($$$$item)' size="small">
                                              <el-option
                                                v-for="(s, i) in $$$$item.listData"
                                                :key="i"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框(多选)-->
                                        <div v-if="$$$$item.type == 'select_multiple'">
                                          <el-form-item label="">
                                             <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$item)'>
                                              <el-option
                                                v-for="(s,i) in $$$$item.listData"
                                                :key="i"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框选择每月几号-->
                                        <div v-if="$$$$item.type == 'select_day_per'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                              <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                                <el-option
                                                  v-for="(s,i) in days"
                                                  :key="i"
                                                  :label="s"
                                                  :value="s">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                        </div>
                                        <!--下拉框选择月几号-->
                                        <div v-if="$$$$item.type == 'select_day'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                              <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)" >
                                                <el-option
                                                  v-for="(s,i) in days"
                                                  :key="i"
                                                  :label="s"
                                                  :value="s">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                        </div>
                                        <!--下拉选择一年中哪个月-->
                                        <div v-if="$$$$item.type == 'select_year'">
                                          <el-form-item label="" class="text-base">
                                            <div>
                                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                                <div slot="content">
                                                  <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                  <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                                placement="right"
                                                width="400"
                                                trigger="hover">
                                                <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                   <img :src="imgModel">
                                                </div>
                                                <i  slot="reference" class="el-icon-picture"></i>
                                              </el-popover>
                                            </div>
                                            <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)">
                                              <el-option
                                                v-for="(s,i) in mon"
                                                :key="i"
                                                :label="s"
                                                :value="s">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <!--下拉框(多选)-->
                                  <div v-if="$$$item.type == 'select_multiple'">
                                    <el-form-item label="">
                                       <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-select v-model="$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$item)'>
                                        <el-option
                                          v-for="(s,i) in $$$item.listData"
                                          :key="i"
                                          :label="s.label"
                                          :value="s.value">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                  </div>
                                  <!--下拉框选择每月几号-->
                                  <div v-if="$$$item.type == 'select_day_per'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                        <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                                          <el-option
                                            v-for="(s,i) in days"
                                            :key="i"
                                            :label="s"
                                            :value="s">
                                          </el-option>
                                        </el-select>
                                      </el-form-item>
                                  </div>
                                  <!--下拉框选择月几号-->
                                  <div v-if="$$$item.type == 'select_day'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                        <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)" >
                                          <el-option
                                            v-for="(s,i) in days"
                                            :key="i"
                                            :label="s"
                                            :value="s">
                                          </el-option>
                                        </el-select>
                                      </el-form-item>
                                  </div>
                                  <!--下拉选择一年中哪个月-->
                                  <div v-if="$$$item.type == 'select_year'">
                                    <el-form-item label="" class="text-base">
                                      <div>
                                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right">
                                          <div slot="content">
                                            <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                            <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                          </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                          v-if="$$$item.imgDate !=[] && $$$item.imgDate !=undefined  && $$$item.imgDate != null"
                                          placement="right"
                                          width="400"
                                          trigger="hover">
                                          <div  v-for="(imgModel, imgModelIndex) in $$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                             <img :src="imgModel">
                                          </div>
                                          <i  slot="reference" class="el-icon-picture"></i>
                                        </el-popover>
                                      </div>
                                      <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                        <el-option
                                          v-for="(s,i) in mon"
                                          :key="i"
                                          :label="s"
                                          :value="s">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!-- 多选框 -->
                            <div v-if="$$item.type == 'checkbox'">
                              <el-form-item label="">
                                <div>
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                  <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right">
                                    <div slot="content">
                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                    </div>
                                    <i class="el-icon-question"></i>
                                  </el-tooltip>
                                  <el-popover
                                    v-if="$$item.imgDate !=[] && $$item.imgDate !=undefined  && $$item.imgDate != null"
                                    placement="right"
                                    width="400"
                                    trigger="hover">
                                    <div  v-for="(imgModel, imgModelIndex) in $$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                       <img :src="imgModel">
                                    </div>
                                    <i  slot="reference" class="el-icon-picture"></i>
                                  </el-popover>
                                </div>
                                <el-checkbox-group v-model="$$item.answer" >
                                  <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$item)'>{{list.label}}</el-checkbox>
                                </el-checkbox-group>
                              </el-form-item>
                              <div v-if="$$item.childQuestion">
                                <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                                  <div v-for="($$$$item,$$$$index) in $$item.childQuestion[$$$item]" :key="$$$$index+$$$item">
                                    <!-- 数字类型输入框 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-input
                                          type="number"
                                          class="ban"
                                          v-model="$$$$item.answer"
                                          size="small"
                                          :placeholder="$$$$item.placeholder"
                                          @blur="userAddAnswerAction($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!--输入框-文字类型-->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-input
                                          type="text"
                                          class="ban"
                                          v-model="$$$$item.answer"
                                          size="small"
                                          :placeholder="$$$$item.placeholder"
                                          @blur="userAddAnswerAction($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!-- 银行卡 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-input
                                          type="number"
                                          class="ban"
                                          v-model="$$$$item.answer"
                                          size="small"
                                          :placeholder="$$$$item.placeholder"
                                          @blur="numAddAnswer($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!-- 手机号 -->
                                    <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='PhoneNum'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-input
                                          type="number"
                                          class="ban"
                                          v-model="$$$$item.answer"
                                          size="small"
                                          :placeholder="$$$$item.placeholder"
                                          @blur="numAddAnswer($$$$item)"
                                        ></el-input>
                                      </el-form-item>
                                    </div>
                                    <!-- 省市三级联动 -->
                                    <div v-if="$$$$item.type == 'select_city'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-cascader
                                        v-model="$$$$item.answer"
                                        :options="options"
                                        @change="userAddAnswerAction($$$$item)">
                                        </el-cascader>
                                      </el-form-item>
                                    </div>
                                    <!-- 单选 -->
                                    <div v-if="$$$$item.type == 'radio'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-radio-group v-model="$$$$item.answer" @change='userAddAnswerAction($$$$item)'>
                                          <el-radio :label="$$$$$item.value" v-for="($$$$$item, $$$$$index) in $$$$item.listData" :key="$$$$$index" >{{$$$$$item.label}}</el-radio>
                                        </el-radio-group>
                                      </el-form-item>
                                      <div v-if="$$$$item.grandson">
                                        <div v-for="($$$$$item, $$$$$index) in $$$$item.grandson[$$$$item.answer]" :key="$$$$$index">
                                          <!-- 数字类型输入框 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="number"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="userAddAnswerAction($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 输入框文字类型 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="text"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="userAddAnswerAction($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 手机号 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='PhoneNum'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="number"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 银行卡类型 -->
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='BankCard'">
                                            <el-form-item label="" class="text-base">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-input
                                                type="number"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="numAddAnswer($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <!-- 省市三级联动 -->
                                          <div v-if="$$$$$item.type == 'select_city'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-cascader
                                              v-model="$$$$$item.answer"
                                              :options="options"
                                              @change="userAddAnswerAction($$$$$item)">
                                              </el-cascader>
                                            </el-form-item>
                                          </div>
                                          <!-- 单选 -->
                                          <div v-if="$$$$$item.type == 'radio'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-radio-group v-model="$$$$$item.answer" @change='userAddAnswerAction($$$$$item)'>
                                                <el-radio :label="$$$$$$item.value" v-for="($$$$$$item, $$$$$$index) in $$$$$item.listData" :key="$$$$$$index" >{{$$$$$$item.label}}</el-radio>
                                              </el-radio-group>
                                            </el-form-item>
                                          </div>
                                          <!-- 多选 -->
                                          <div v-if="$$$$$item.type == 'checkbox'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-checkbox-group v-model="$$$$$item.answer" >
                                                <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$$$$item)'>{{list.label}}</el-checkbox>
                                              </el-checkbox-group>
                                            </el-form-item>
                                          </div>
                                          <!-- 下拉单选 -->
                                          <div v-if="$$$$$item.type == 'select'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-select v-model="$$$$$item.answer"  @change='userAddAnswerAction($$$$$item)' size="small">
                                                <el-option
                                                  v-for="(s, i) in $$$$$item.listData"
                                                  :key="i"
                                                  :label="s.label"
                                                  :value="s.value">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </div>
                                          <!-- 日期  精确到日 -->
                                          <div v-if="$$$$$item.type == 'dateTime_day'">
                                            <el-form-item label="">
                                              <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-date-picker
                                                v-model="$$$$$item.answer"
                                                type="date"
                                                size="small"
                                                placeholder="选择日期"
                                                format="yyyy 年 MM 月 dd 日"
                                                @change="userAddAnswerAction($$$$$item)"
                                                value-format="yyyy-MM-dd">
                                              </el-date-picker>
                                            </el-form-item>
                                          </div>
                                          <!--日期-区间几号到几号-->
                                          <div v-if="$$$$$item.type == 'dateTime_Day_Interval'">
                                           <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                            </div>
                                             <el-date-picker
                                               v-model="$$$$$item.answer"
                                               @change="userAddAnswerAction($$$$$item)"
                                               type="daterange"
                                               size="small"
                                               range-separator="至"
                                               start-placeholder="开始日期"
                                               end-placeholder="结束日期"
                                               placeholder="选择日期范围">
                                             </el-date-picker>
                                           </el-form-item>
                                          </div>
                                          <!--日期-区间几点到几点-->
                                          <div v-if="$$$$$item.type == 'dateTime_Time_Interval'">
                                           <el-form-item label="" class="text-base">
                                            <div>
                                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                <i class="el-icon-question"></i>
                                              </el-tooltip>
                                              <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                            </div>
                                             <el-time-picker
                                               v-model="$$$$$item.answer"
                                               @change="userAddAnswerAction($$$$$item)"
                                               type="datetimerange"
                                               is-range
                                               size="small"
                                               range-separator="至"
                                               start-placeholder="开始日期"
                                               end-placeholder="结束日期"
                                               placeholder="选择时间范围">
                                             </el-time-picker>
                                           </el-form-item>
                                          </div>
                                          <!--下拉框(多选)-->
                                          <div v-if="$$$$$item.type == 'select_multiple'">
                                            <el-form-item label="">
                                               <div>
                                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right">
                                                  <div slot="content">
                                                    <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                    <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                  </div>
                                                  <i class="el-icon-question"></i>
                                                </el-tooltip>
                                                <el-popover
                                                  v-if="$$$$$item.imgDate !=[] && $$$$$item.imgDate !=undefined  && $$$$$item.imgDate != null"
                                                  placement="right"
                                                  width="400"
                                                  trigger="hover">
                                                  <div  v-for="(imgModel, imgModelIndex) in $$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                     <img :src="imgModel">
                                                  </div>
                                                  <i  slot="reference" class="el-icon-picture"></i>
                                                </el-popover>
                                              </div>
                                              <el-select v-model="$$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$$item)'>
                                                <el-option
                                                  v-for="(s,i) in $$$$$item.listData"
                                                  :key="i"
                                                  :label="s.label"
                                                  :value="s.value">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- 多选 -->
                                    <div v-if="$$$$item.type == 'checkbox'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-checkbox-group v-model="$$$$item.answer" >
                                          <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex"  @change='userAddAnswerAction($$$$item)'>{{list.label}}</el-checkbox>
                                        </el-checkbox-group>
                                      </el-form-item>
                                      <div v-if="$$$$item.grandson">
                                        <div v-for="($$$$$item, $$$$$index) in $$$$item.answer" :key="$$$$$index">
                                          <div v-for="($$$$$$item, $$$$$$index) in $$$$item.grandson[$$$$$item]" :key="$$$$$$index">
                                            <!-- 输入框文字类型 -->
                                            <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='text'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="text"
                                                  class="ban"
                                                  v-model="$$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$$item.placeholder"
                                                  @blur="userAddAnswerAction($$$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                            <!-- 银行卡类型 -->
                                            <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='BankCard'">
                                              <el-form-item label="" class="text-base">
                                                <div>
                                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                                  <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right">
                                                    <div slot="content">
                                                      <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                                      <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                                    </div>
                                                    <i class="el-icon-question"></i>
                                                  </el-tooltip>
                                                  <el-popover
                                                    v-if="$$$$$$item.imgDate !=[] && $$$$$$item.imgDate !=undefined  && $$$$$$item.imgDate != null"
                                                    placement="right"
                                                    width="400"
                                                    trigger="hover">
                                                    <div  v-for="(imgModel, imgModelIndex) in $$$$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                                       <img :src="imgModel">
                                                    </div>
                                                    <i  slot="reference" class="el-icon-picture"></i>
                                                  </el-popover>
                                                </div>
                                                <el-input
                                                  type="number"
                                                  class="ban"
                                                  v-model="$$$$$$item.answer"
                                                  size="small"
                                                  :placeholder="$$$$$$item.placeholder"
                                                  @blur="numAddAnswer($$$$$$item)"
                                                ></el-input>
                                              </el-form-item>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <!-- 下拉单选 -->
                                    <div v-if="$$$$item.type == 'select'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-select v-model="$$$$item.answer"  @change='userAddAnswerAction($$$$item)' size="small">
                                          <el-option
                                            v-for="(s, i) in $$$$item.listData"
                                            :key="i"
                                            :label="s.label"
                                            :value="s.value">
                                          </el-option>
                                        </el-select>
                                      </el-form-item>
                                    </div>
                                    <!-- 日期  精确到日 -->
                                    <div v-if="$$$$item.type == 'dateTime_day'">
                                      <el-form-item label="">
                                        <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-date-picker
                                          v-model="$$$$item.answer"
                                          type="date"
                                          size="small"
                                          placeholder="选择日期"
                                          format="yyyy 年 MM 月 dd 日"
                                          @change="userAddAnswerAction($$$$item)"
                                          value-format="yyyy-MM-dd">
                                        </el-date-picker>
                                      </el-form-item>
                                    </div>
                                    <!--日期-区间几号到几号-->
                                    <div v-if="$$$$item.type == 'dateTime_Day_Interval'">
                                     <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                      </div>
                                       <el-date-picker
                                         v-model="$$$$item.answer"
                                         @change="userAddAnswerAction($$$$item)"
                                         type="daterange"
                                         size="small"
                                         range-separator="至"
                                         start-placeholder="开始日期"
                                         end-placeholder="结束日期"
                                         placeholder="选择日期范围">
                                       </el-date-picker>
                                     </el-form-item>
                                    </div>
                                    <!--日期-区间几点到几点-->
                                    <div v-if="$$$$item.type == 'dateTime_Time_Interval'">
                                     <el-form-item label="" class="text-base">
                                      <div>
                                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                          <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                          <i class="el-icon-question"></i>
                                        </el-tooltip>
                                        <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                      </div>
                                       <el-time-picker
                                         v-model="$$$$item.answer"
                                         @change="userAddAnswerAction($$$$item)"
                                         type="datetimerange"
                                         is-range
                                         size="small"
                                         range-separator="至"
                                         start-placeholder="开始日期"
                                         end-placeholder="结束日期"
                                         placeholder="选择时间范围">
                                       </el-time-picker>
                                     </el-form-item>
                                    </div>
                                    <!--下拉框(多选)-->
                                    <div v-if="$$$$item.type == 'select_multiple'">
                                      <el-form-item label="">
                                         <div>
                                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-select v-model="$$$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$$$item)'>
                                          <el-option
                                            v-for="(s,i) in $$$$item.listData"
                                            :key="i"
                                            :label="s.label"
                                            :value="s.value">
                                          </el-option>
                                        </el-select>
                                      </el-form-item>
                                    </div>
                                    <!--下拉框选择每月几号-->
                                    <div v-if="$$$$item.type == 'select_day_per'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                           <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)">
                                            <el-option
                                              v-for="(s,i) in days"
                                              :key="i"
                                              :label="s"
                                              :value="s">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                    </div>
                                    <!--下拉框选择月几号-->
                                    <div v-if="$$$$item.type == 'select_day'">
                                        <el-form-item label="" class="text-base">
                                          <div>
                                           <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                          <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)" >
                                            <el-option
                                              v-for="(s,i) in days"
                                              :key="i"
                                              :label="s"
                                              :value="s">
                                            </el-option>
                                          </el-select>
                                        </el-form-item>
                                    </div>
                                    <!--下拉选择一年中哪个月-->
                                    <div v-if="$$$$item.type == 'select_year'">
                                      <el-form-item label="" class="text-base">
                                        <div>
                                           <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right">
                                            <div slot="content">
                                              <h3 class="text-base w-full font-bold">小贴士</h3><br/>
                                              <textarea :rows="20" id="caseMsg" class="textarea w-full" placeholder="" v-model="$$$$item.description" readonly="readonly" disabled="disabled"></textarea>
                                            </div>
                                            <i class="el-icon-question"></i>
                                          </el-tooltip>
                                          <el-popover
                                            v-if="$$$$item.imgDate !=[] && $$$$item.imgDate !=undefined  && $$$$item.imgDate != null"
                                            placement="right"
                                            width="400"
                                            trigger="hover">
                                            <div  v-for="(imgModel, imgModelIndex) in $$$$item.imgDate" :key="imgModelIndex" popper-class="overflow-y:scroll">
                                               <img :src="imgModel">
                                            </div>
                                            <i  slot="reference" class="el-icon-picture"></i>
                                          </el-popover>
                                        </div>
                                        <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$$item)">
                                          <el-option
                                            v-for="(s,i) in mon"
                                            :key="i"
                                            :label="s"
                                            :value="s">
                                          </el-option>
                                        </el-select>
                                      </el-form-item>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <!--下拉框(单选)-->
                            <div v-if="$$item.type == 'select'">
                              <el-form-item label="">
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-select v-model="$$item.answer" @change="userAddAnswerAction($$item)">
                                  <el-option
                                    size="small"
                                    v-for="(s,i) in $$item.listData"
                                    :key="i"
                                    :label="s.label"
                                    :value="s.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                            <!--下拉框(多选)-->
                            <div v-if="$$item.type == 'select_multiple'">
                              <el-form-item label="">
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                                <el-select v-model="$$item.answer" multiple placeholder="请选择"  @change="userAddAnswerAction($$item)">
                                  <el-option
                                    size="small"
                                    v-for="(s,i) in $$item.listData"
                                    :key="i"
                                    :label="s.label"
                                    :value="s.value">
                                  </el-option>
                                </el-select>
                              </el-form-item>
                            </div>
                            <!--只有问题无答案-->
                            <div v-if="$$item.type =='question'">
                              <h2 class="text-left">{{$$item.isRequired==false ?'(选填)'+$$item.title:$$item.title}}</h2>
                               <div  v-for="($$$item,$$$index) in $$item.childQuestion" :key="$$$index">
                                 <!--日期-精确到日-->
                                 <div v-if="$$$item.type == 'dateTime_day'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                                     <el-date-picker
                                       v-model="$$$item.answer"
                                       @change="userAddAnswerAction($$$item)"
                                       type="date"
                                       size="small"
                                       placeholder="选择日期"
                                       format="yyyy 年 MM 月 dd 日"
                                       value-format="yyyy-MM-dd">
                                     </el-date-picker>
                                   </el-form-item>
                                 </div>
                                 <!--日期-区间几点到几点-->
                                 <div v-if="$$$item.type == 'dateTime_Time_Interval'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                                     <el-time-picker
                                       v-model="$$$item.answer"
                                       @change="userAddAnswerAction($$$item)"
                                       is-range
                                       size="small"
                                       range-separator="至"
                                       start-placeholder="开始日期"
                                       end-placeholder="结束日期"
                                       placeholder="选择时间范围">
                                     </el-time-picker>
                                   </el-form-item>
                                 </div>
                                 <!--日期-区间几号到几号-->
                                 <div v-if="$$$item.type == 'dateTime_Day_Interval'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                                     <el-date-picker
                                       v-model="$$$item.answer"
                                       @change="userAddAnswerAction($$$item)"
                                       type="daterange"
                                       size="small"
                                       range-separator="至"
                                       start-placeholder="开始日期"
                                       end-placeholder="结束日期"
                                       placeholder="选择日期范围">
                                     </el-date-picker>
                                   </el-form-item>
                                 </div>
                                 <!--输入框-文字类型-->
                                 <div v-if="$$$item.type == 'input' && $$$item.input_type=='text'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                                     <el-input
                                       type="text"
                                       class="ban"
                                       v-model="$$$item.answer"
                                       size="small"
                                       :placeholder="$$$item.placeholder"
                                       @blur="userAddAnswerAction($$$item)"
                                     ></el-input>
                                   </el-form-item>
                                 </div>
                                 <!--输入框-数字类型（类似身份证号、金额）-->
                                 <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title" class="text-base">
                                     <el-input
                                       type="number"
                                       class="ban"
                                       v-model="$$$item.answer"
                                       size="small"
                                       :placeholder="$$$item.placeholder"
                                       @blur="userAddAnswerAction($$$item)"
                                     ></el-input>
                                   </el-form-item>
                                 </div>
                                 <!--单选框-->
                                 <div v-if="$$$item.type == 'radio'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                     <el-radio-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                       <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                     </el-radio-group>
                                   </el-form-item>
                                 </div>
                                 <!-- 多选框 -->
                                  <div v-if="$$$item.type == 'checkbox'">
                                    <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                      <el-checkbox-group v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)">
                                        <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                      </el-checkbox-group>
                                    </el-form-item>
                                    <div v-if="$$$item.grandson">
                                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                        <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]" :key="$$$$$index">
                                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                                            <el-form-item :label="$$$$$item.isRequired==false ?'(选填)'+$$$$$item.title:$$$$$item.title" class="text-base">
                                              <el-input
                                                type="text"
                                                class="ban"
                                                v-model="$$$$$item.answer"
                                                size="small"
                                                :placeholder="$$$$$item.placeholder"
                                                @blur="userAddAnswerAction($$$$$item)"
                                              ></el-input>
                                            </el-form-item>
                                          </div>
                                          <div v-if="$$$$$item.type == 'select'">
                                            <el-form-item :label="$$$$$item.isRequired==false ?'(选填)'+$$$$$item.title:$$$$$item.title">
                                              <el-select v-model="$$$$$item.answer" @change="userAddAnswerAction($$$$$item)">
                                                <el-option
                                                  size="small"
                                                  v-for="(s,i) in $$$$$item.listData"
                                                  :key="i"
                                                  :label="s.label"
                                                  :value="s.value">
                                                </el-option>
                                              </el-select>
                                            </el-form-item>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                 <!-- 下拉单选 -->
                                 <div v-if="$$$item.type == 'select'">
                                   <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                     <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                       <el-option
                                         size="small"
                                         v-for="(s,i) in $$$item.listData"
                                         :key="i"
                                         :label="s.label"
                                         :value="s.value"
                                         >
                                       </el-option>
                                     </el-select>
                                   </el-form-item>
                                   <!--下拉框中的问题又会迁出子问题-->
                                   <div v-if="$$$item.grandson && $$$item.grandson[$$$item.answer]">
                                      <div v-for="($$$$item,$$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                                        <!--日期-精确到日-->
                                        <div v-if="$$$$item.type == 'dateTime_day'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                            <el-date-picker
                                              v-model="$$$$item.answer"
                                              @change="userAddAnswerAction($$$$item)"
                                              type="date"
                                              size="small"
                                              placeholder="选择日期"
                                              format="yyyy 年 MM 月 dd 日"
                                              value-format="yyyy-MM-dd">
                                            </el-date-picker>
                                          </el-form-item>
                                        </div>
                                        <!--日期-区间几点到几点-->
                                        <div v-if="$$$$item.type == 'dateTime_Time_Interval'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                            <el-time-picker
                                              v-model="$$$$item.answer"
                                              @change="userAddAnswerAction($$$$item)"
                                              is-range
                                              size="small"
                                              range-separator="至"
                                              start-placeholder="开始日期"
                                              end-placeholder="结束日期"
                                              placeholder="选择时间范围">
                                            </el-time-picker>
                                          </el-form-item>
                                        </div>
                                        <!--日期-区间几号到几号-->
                                        <div v-if="$$$$item.type == 'dateTime_Day_Interval'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                            <el-date-picker
                                              v-model="$$$$item.answer"
                                              @change="userAddAnswerAction($$$$item)"
                                              type="daterange"
                                              size="small"
                                              range-separator="至"
                                              start-placeholder="开始日期"
                                              end-placeholder="结束日期"
                                              placeholder="选择日期范围">
                                            </el-date-picker>
                                          </el-form-item>
                                        </div>
                                        <!--输入框-文字类型-->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                            <el-input
                                              type="text"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!--输入框-数字类型（类似身份证号、金额）-->
                                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title" class="text-base">
                                            <el-input
                                              type="number"
                                              class="ban"
                                              v-model="$$$$item.answer"
                                              size="small"
                                              :placeholder="$$$$item.placeholder"
                                              @blur="userAddAnswerAction($$$$item)"
                                            ></el-input>
                                          </el-form-item>
                                        </div>
                                        <!--单选框-->
                                        <div v-if="$$$$item.type == 'radio'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                                              <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                                            </el-radio-group>
                                          </el-form-item>
                                        </div>
                                        <!--下拉框-->
                                        <div v-if="$$$$item.type == 'select'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
                                              <el-option
                                                size="small"
                                                v-for="(s,i) in $$$$item.listData"
                                                :key="i"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                        <!-- 下拉框多选 -->
                                        <div v-if="$$$$item.type == 'select_multiple'">
                                          <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                            <el-select v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
                                              <el-option
                                                size="small"
                                                v-for="(s,i) in $$$$item.listData"
                                                :key="i"
                                                :label="s.label"
                                                :value="s.value">
                                              </el-option>
                                            </el-select>
                                          </el-form-item>
                                        </div>
                                      </div>
                                   </div>
                                 </div>
                                 <!-- 下拉多选 -->
                                 <div v-if="$$$item.type == 'select_multiple'">
                                    <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                                      <el-select v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)" multiple placeholder="请选择">
                                        <el-option
                                          size="small"
                                          v-for="(s,i) in $$$item.listData"
                                          :key="i"
                                          :label="s.label"
                                          :value="s.value">
                                        </el-option>
                                      </el-select>
                                    </el-form-item>
                                  </div>
                               </div>
                            </div>

                            <!-- 二级问题块 -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
              <div class="w-1/3 my-8 mx-auto">
                <div>
                  <!-- <div class="ml-1 mb-3 py-1 text-base text-blue-500 px-1 rounded border border-1 hover:bg-orange-500 hover:text-white cursor-pointer" @click="NextPage">
                    确定
                  </div> -->
                   <span class="step_btn step_btn_re my-5" type="primary" @click="NextPage">下一步</span>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute returnUserList right-0">
            <span class="returnUserList_span" @click="returnUserList">返回文书列表</span>
          </div>
        </div>
      </div>
    </div>
    <div class="live"></div>
  </div>
</template>
<script>
import lihun_head from '../../partials/lihun_head.vue'
import {userAddAnswer, getOnlyValue, userAddSelectAnswer} from '@/api/api/AgreementRequest.js' // 用户添加问卷的内容
// import {answer} from '@/api/api/requestLogin.js'
export default {
  name: 'CustomAgreement',
  components: {
    'lihun-head': lihun_head
  },
  data () {
    return {
      hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      childNum: '',
      answerMsg: [],
      childAll: [],
      ChildBirthday: '',
      ChildName: ''
    }
  },
  mounted () {
     this.childList()
  },
  methods: {
    getChuShi () {
      getOnlyValue({
        qpid: 520, // 关联id
        quid: Number(localStorage.getItem('quid')) // 用户的问卷id
      }).then((data) => {
        let getmodel = JSON.parse(data.data.data)
        if (getmodel.indexOf('1') > -1) {
          userAddSelectAnswer({
            qpid: 521,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('2') > -1) {
          userAddSelectAnswer({
            qpid: 522,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('3') > -1) {
          userAddSelectAnswer({
            qpid: 637,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('4') > -1) {
          userAddSelectAnswer({
            qpid: 523,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('5') > -1) {
          userAddSelectAnswer({
            qpid: 3614,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('6') > -1) {
          userAddSelectAnswer({
            qpid: 524,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('7') > -1) {
          userAddSelectAnswer({
            qpid: 3636,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('8') > -1) {
          userAddSelectAnswer({
            qpid: 3637,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('9') > -1) {
          userAddSelectAnswer({
            qpid: 636,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
      }).catch((data) => {
        console.log('保存失败')
      })
      getOnlyValue({
        qpid: 3853, // 关联id
        quid: Number(localStorage.getItem('quid')) // 用户的问卷id
      }).then((data) => {
        let getmodel = JSON.parse(data.data.data)
        if (getmodel.indexOf('1') > -1) {
          userAddSelectAnswer({
            qpid: 3638,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('2') > -1) {
          userAddSelectAnswer({
            qpid: 3639,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('3') > -1) {
          userAddSelectAnswer({
            qpid: 3640,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('4') > -1) {
          userAddSelectAnswer({
            qpid: 3641,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('5') > -1) {
          userAddSelectAnswer({
            qpid: 3642,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
      }).catch((data) => {
        console.log('保存失败')
      })
      getOnlyValue({
        qpid: 654, // 关联id
        quid: Number(localStorage.getItem('quid')) // 用户的问卷id
      }).then((data) => {
        let getmodel = JSON.parse(data.data.data)
        if (getmodel.indexOf('1') > -1) {
          userAddSelectAnswer({
            qpid: 655,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('2') > -1) {
          userAddSelectAnswer({
            qpid: 656,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
        if (getmodel.indexOf('3') > -1) {
          userAddSelectAnswer({
            qpid: 3855,
            quid: localStorage.getItem('quid')
          }).then((data) => {

          })
        }
      }).catch((data) => {
        console.log('保存失败')
      })
    },
    getId (index) {
      return 'box_' + index
    },
    childMsg1 () {
      return [
        {
          title: '',
          questions: [
            {
              title: '1、您离婚想要达到的诉求是什么？（可多选）',
              id: '649',
              isRequired: false,
              type: 'select_multiple',
              tip: '',
              answer: '',
              listData: [
                { label: '离婚', value: '1' },
                { label: '自己抚养孩子', value: '2' },
                { label: '对方抚养孩子', value: '3' },
                { label: '对方不分财产', value: '4' },
                { label: '对方少分财产', value: '5' },
                { label: '自己多分财产', value: '6' },
                { label: '平均分配财产', value: '7' },
                { label: '财产赠与孩子', value: '8' },
                { label: '债权均归属自己', value: '9' },
                { label: '债务均归属对方', value: '10' },
                { label: '平均分配债权债务', value: '11' },
                { label: '债权赠与孩子', value: '12' },
                { label: '合理分配财产', value: '13' },
                { label: '其他', value: '14' }
              ]
            },
            {
              title: '2、你们感情破裂的原因是什么？（可多选）',
              id: '650',
              isRequired: false,
              type: 'select_multiple',
              tip: '',
              answer: '',
              listData: [
                { label: '婚前感情基础薄弱', value: '1' },
                { label: '性格不合，琐事矛盾', value: '2' },
                { label: '出轨', value: '3' },
                { label: '与人同居', value: '4' },
                { label: '重婚', value: '5' },
                { label: '虐待', value: '6' },
                { label: '遗弃', value: '7' },
                { label: '赌博', value: '8' },
                { label: '吸毒', value: '9' },
                { label: '沉迷网络游戏', value: '10' },
                { label: '嫖娼', value: '11' },
                { label: '酗酒', value: '12' },
                { label: '暴力倾向', value: '13' },
                { label: '家庭成员矛盾', value: '14' },
                { label: '子女抚养方面的矛盾', value: '15' },
                { label: '隐瞒疾病', value: '16' },
                { label: '长期分居两地', value: '17' },
                { label: '对方在服刑', value: '18' },
                { label: '其他', value: '19' }
              ]
            },
            {
              title: '3、你们都是初婚吗？',
              id: '3',
              isRequired: false,
              type: 'select',
              tip: '',
              answer: '',
              listData: [
                { label: '均初婚', value: '1' },
                { label: '均再婚', value: '2' },
                { label: '男方初婚，女方再婚', value: '3' },
                { label: '女方初婚，男方再婚', value: '4' }
              ]
            },
            {
              title: '4、您与配偶是否育有子女？',
              id: '875',
              isRequired: true,
              type: 'radio',
              answer: '',
              listData: [
                { label: '是', value: '1' },
                { label: '否', value: '2' }
              ]
            },
            {
              title: '您与配偶生育了几个子女？',
              id: '3859',
              isRequired: true,
              type: 'select',
              tip: '',
              answer: '',
              listData: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '7', value: '7' }
              ],
              requireQidAndAnswer: { id: '875', answer: '1' }
            },
            {
              title: '5、是否有需要处理的共同财产？',
              id: '652',
              isRequired: true,
              type: 'radio',
              tip: '',
              answer: '',
              listData: [
                { label: '无夫妻共同财产', value: '1' },
                { label: '有财产待处理', value: '2' }
              ]
            },
            {
              title: '共同财产有哪些',
              id: '520',
              isRequired: true,
              type: 'checkbox',
              tip: '提示',
              answer: [],
              listData: [
                { label: '房子', value: '1' },
                { label: '车辆', value: '2' },
                { label: '存款', value: '3' },
                { label: '理财', value: '4' },
                { label: '公积金', value: '5' },
                { label: '保险', value: '6' },
                { label: '股权（股份）', value: '7' },
                { label: '股票账户', value: '8' },
                { label: '家具家电', value: '9' },
                { label: '其他财产', value: '10' }
              ],
              childQuestion: {
                10: [
                  {
                    title: '其他财产怎么约定？',
                    id: '3852',
                    isRequired: true,
                    type: 'radio',
                    // input_type: 'number',
                    tip: '提示',
                    answer: '',
                    listData: [
                      { label: '各自名下归各自所有', value: '1' },
                      { label: '具体约定', value: '2' }
                    ],
                    grandson: {
                      2: [
                        {
                          title: '具体约定哪些其他财产？（可多选）',
                          id: '3853',
                          isRequired: true,
                          type: 'checkbox',
                          tip: '提示',
                          answer: [],
                          listData: [
                            { label: '珠宝首饰收藏', value: '1' },
                            { label: '债券', value: '2' },
                            { label: '存款', value: '3' },
                            { label: '店铺', value: '4' },
                            { label: '宅基地房屋', value: '5' },
                            { label: '其他', value: '6' }
                          ]
                        }
                      ]
                    }
                  }
                ]
              },
              requireQidAndAnswer: { id: '652', answer: '2' }
            },
            {
              title: '6、您与配偶有无外债？（自己借/欠了别人钱，或别人借/欠了自己钱）',
              id: '653',
              isRequired: true,
              type: 'radio',
              tip: '',
              answer: '',
              listData: [
                { label: '无外债', value: '1' },
                { label: '有外债', value: '2' }
              ],
              childQuestion: {
                2: [
                  {
                    title: '外债的具体情形是',
                    id: '654',
                    isRequired: true,
                    type: 'checkbox',
                    tip: '提示',
                    answer: [],
                    listData: [
                      { label: '有债权（别人欠/借你们钱）', value: '1' },
                      { label: '有债务（你们欠/借了别人钱）', value: '2' },
                      { label: '其他', value: '3' }
                    ]
                    // grandson: {
                    //   1: [
                    //     {
                    //       title: '您与配有有几笔债权需要处理？',
                    //       id: '655',
                    //       isRequired: true,
                    //       type: 'select',
                    //       // input_type: 'number',
                    //       placeholder: '如：3',
                    //       tip: '提示',
                    //       answer: '',
                    //       listData: [
                    //         { label: '1', value: '1' },
                    //         { label: '2', value: '2' },
                    //         { label: '3', value: '3' },
                    //         { label: '4', value: '4' },
                    //         { label: '5', value: '5' },
                    //         { label: '6', value: '6' },
                    //         { label: '7', value: '7' }
                    //       ]
                    //     }
                    //   ],
                    //   2: [
                    //     {
                    //       title: '您与配有有几笔债务需要处理？',
                    //       id: '656',
                    //       isRequired: true,
                    //       type: 'select',
                    //       // input_type: 'number',
                    //       placeholder: '如：3',
                    //       tip: '提示',
                    //       answer: '',
                    //       listData: [
                    //         { label: '1', value: '1' },
                    //         { label: '2', value: '2' },
                    //         { label: '3', value: '3' },
                    //         { label: '4', value: '4' },
                    //         { label: '5', value: '5' },
                    //         { label: '6', value: '6' },
                    //         { label: '7', value: '7' }
                    //       ]
                    //     }
                    //   ]
                    // }
                  }
                ]
              }
            },
            {
              title: '7、是否有需要约定的特殊条款？',
              id: '3854',
              isRequired: true,
              type: 'radio',
              tip: '',
              answer: '',
              listData: [
                { label: '是', value: '1' },
                { label: '否', value: '2' }
              ]
            },
            {
              title: '8、您与配偶对离婚是否达成一致？',
              id: '657',
              isRequired: true,
              type: 'radio',
              tip: '',
              answer: '',
              listData: [
                { label: '是', value: '1' },
                { label: '否', value: '2' }
              ],
              childQuestion: {
                2: [
                  {
                    title: '您与配偶对离婚的争议是什么？',
                    id: '658',
                    isRequired: true,
                    type: 'checkbox',
                    tip: '提示',
                    answer: [],
                    listData: [
                      { label: '子女抚养', value: '1' },
                      { label: '财产分割', value: '2' },
                      { label: '债权债务', value: '3' }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    childList (e) {
      this.$forceUpdate()
      this.childAll = []
      this.$set(this.childAll, 1, this.childMsg1())
    },
    userAddAnswerAction (e) {
      if (Array.isArray(e.answer)) {
        userAddAnswer({
          value: JSON.stringify(e.answer), // 值
          qpid: e.id, // 关联id
          fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
          quid: localStorage.getItem('quid') // 用户的问卷id
        }).then((data) => {
        }).catch((data) => {
        })
      } else {
        userAddAnswer({
          value: e.answer, // 值
          qpid: e.id, // 关联id
          fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
          quid: localStorage.getItem('quid') // 用户的问卷id
        }).then((data) => {
        }).catch((data) => {
        })
      }
    },
    NextPage () {
      this.getChuShi() // 初始化保存当前页面
      this.$router.replace('/CustomQueDing')
    },
    returnUserList () {
      this.$router.replace('/MyConsult')
    }
  }
}
</script>
<style scoped >
.live{height: 39px;background-color:#f2f4f7;width: 100%;}
.all{background-color: #f2f4f7;height:auto;}
.w{width: 1200px; margin: 0 auto;}
.c_m{background-color: #fff;}
.c_m_h{height:109px;border-bottom: 2px solid #f2f4f7;margin-top: 39px;}
.c_m_h h2{width:243px;font-size: 25px;color:#535353;font-weight: bold;}
.c_m_h_r{width:542px;text-align: right;}
.c_m_h_r span{display: inline-block;width: 151px;height: 35px;border:1px solid #535353;text-align: center;line-height: 35px;border-radius: 18px;font-size:16px;color:#535353;font-weight: bold;}
.c_m_h_r span:hover{border:1px solid #ff3f68;background-color: #ff3f68;color:#fff;cursor:pointer}

.ban{width:220px !important;}
.ban{width:100% !important;}
.returnUserList{top:120px;right: 48px;}
.returnUserList_span{width: 132px;height: 35px;font-size: 16px;text-align: center;line-height: 35px;border:1px solid #343434;color:#343434;border-radius: 18px;display: inline-block;cursor: pointer;}
.el-form-item{margin-bottom:8px !important;}
.el-form--label-top .el-form-item__label{padding-bottom:0 !important;}
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100% !important;}
.el-cascader{width:100% !important;}
.el-select{width:100% !important;}
.step_btn{width: 220px;height: 44px;line-height: 44px;font-size: 16px;text-align: center;border:1px solid #343434;color:#343434;border-radius: 22px;display: inline-block;margin-right: 22px;cursor: pointer;}
.step_btn_re{border:1px solid #ff3f68;color:#ff3f68;margin-left: 22px;}
</style>
