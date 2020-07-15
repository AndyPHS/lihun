<template>
  <div>
    <div v-for="($item, $index) in newlist"  :key="$index">
      <div class="py-2">
        <el-divider> <h2 class="text-center text-xl">{{$item.title}}</h2></el-divider>
      </div>
      <!-- 一级问题块 -->
      <div v-for="($$item,$$index) in $item.questions" :key="$$index">
        <div v-show="!$$item.requireQidAndAnswer || ($$item.requireQidAndAnswer && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0] && $item.questions.filter(filterItme=>{return filterItme.id == $$item.requireQidAndAnswer.id})[0].answer == $$item.requireQidAndAnswer.answer)">
          <!-- 省市三级联动 -->
          <div v-if="$$item.type == 'select_city'">
            <el-form-item label="">
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-cascader
              v-model="$$item.answer"
              :options="options"
              @change="userAddAnswerAction($$item)">
              </el-cascader>
            </el-form-item>
          </div>
          <!--日期-精确到日-->
          <div v-if="$$item.type == 'dateTime_day'">
            <el-form-item label="">
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-date-picker
                v-model="$$item.answer"
                type="date"
                size="small"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                @change="userAddAnswerAction($$item)"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>
          <!--日期-区间几点到几点-->
          <div v-if="$$item.type == 'dateTime_Time_Interval'">
           <el-form-item label="" class="text-base">
            <div>
              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
              <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
             <el-time-picker
               v-model="$$item.answer"
               @change="userAddAnswerAction($$item)"
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
          <div v-if="$$item.type == 'dateTime_Day_Interval'">
           <el-form-item label="" class="text-base">
            <div>
              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
              <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
             <el-date-picker
               v-model="$$item.answer"
               @change="userAddAnswerAction($$item)"
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
          <div v-if="$$item.type == 'input' && $$item.input_type=='text'">
            <el-form-item label="" class="text-base">
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
		  <!--输入框-身份证-->
		  <div v-if="$$item.type == 'input' && $$item.input_type=='IdCard'">
		    <el-form-item label="" class="text-base">
		      <div>
		        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
		        <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
		          <div slot="content">
		            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
		            <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
            <el-form-item label="" class="text-base">
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
          <!--银行卡-->
          <div v-if="$$item.type == 'input' && $$item.input_type=='BankCard'" >
            <el-form-item label="" class="text-base" >
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-input
                type="number"
                class="ban"
                v-model="$$item.answer"
                size="small"
                :placeholder="$$item.placeholder"
                @blur="numAddAnswer($$item)"
              ></el-input>
            </el-form-item>
          </div>
          <!--手机号-->
          <div v-if="$$item.type == 'input' && $$item.input_type=='PhoneNum'" >
            <el-form-item label="" class="text-base" >
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-input
                type="number"
                class="ban"
                v-model="$$item.answer"
                size="small"
                placeholder="请输入手机号"
                @blur="numAddAnswer($$item)"
              ></el-input>
            </el-form-item>
          </div>
          <!--单选框-->
          <div v-if="$$item.type == 'radio'">
            <el-form-item label="">
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" placeholder="" v-html="$$item.description" ></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
				<!--输入框-身份证-->
				<div v-if="$$$item.type == 'input' && $$$item.input_type=='IdCard'">
				  <el-form-item label="" class="text-base">
				    <div>
				      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
				      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
				        <div slot="content">
				          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
				          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
								  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
						<!--输入框-身份证-->
						<div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='IdCard'">
						  <el-form-item label="" class="text-base">
						    <div>
						      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
						      <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
						        <div slot="content">
						          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						          <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-model="$$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                    <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                      <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                    <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                      <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
					  <!--输入框-身份证-->
					  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
					    <el-form-item label="" class="text-base">
					      <div>
					        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
					        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
					          <div slot="content">
					            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
					            <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
					  <!--输入框-身份证-->
					  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
					    <el-form-item label="" class="text-base">
					      <div>
					        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
					        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
					          <div slot="content">
					            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
					            <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-model="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-model="$$$item.description"></div>
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
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
				  <!--输入框-身份证-->
				  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
				    <el-form-item label="" class="text-base">
				      <div>
				        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
				        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
				          <div slot="content">
				            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
				            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
						<!-- 输入框身份证 -->
						<div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='IdCard'">
						  <el-form-item label="" class="text-base">
						    <div>
						      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
						      <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
						        <div slot="content">
						          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						          <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                          <!-- 数字类型输入框 -->
                          <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='number'">
                            <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
									<div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                                @blur="userAddAnswerAction($$$$$$item)"
                              ></el-input>
                            </el-form-item>
                          </div>
                          <!-- 输入框文字类型 -->
                          <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='text'">
                            <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
						  <!-- 输入框身份证 -->
						  <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='IdCard'">
						    <el-form-item label="" class="text-base">
						      <div>
						        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
						        <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
						          <div slot="content">
						            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						            <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                          <!-- 下拉单选 -->
                          <div v-if="$$$$$$item.type == 'select'">
                            <el-form-item label="">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                              <el-select v-model="$$$$$$item.answer"  @change='userAddAnswerAction($$$$$$item)' size="small">
                                <el-option
                                  v-for="(s, i) in $$$$$$item.listData"
                                  :key="i"
                                  :label="s.label"
                                  :value="s.value">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <!-- 单选 -->
                          <div v-if="$$$$$$item.type == 'radio'">
                            <el-form-item label="">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                              <el-radio-group v-model="$$$$$$item.answer" @change='userAddAnswerAction($$$$$$item)'>
                                <el-radio :label="$$$$$$$item.value" v-for="($$$$$$$item, $$$$$$$index) in $$$$$$item.listData" :key="$$$$$$$index" >{{$$$$$$$item.label}}</el-radio>
                              </el-radio-group>
                            </el-form-item>
                          </div>
                          <!-- 日期  精确到日 -->
                          <div v-if="$$$$$$item.type == 'dateTime_day'">
                            <el-form-item label="">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                              <el-date-picker
                                v-model="$$$$$$item.answer"
                                type="date"
                                size="small"
                                placeholder="选择日期"
                                format="yyyy 年 MM 月 dd 日"
                                @change="userAddAnswerAction($$$$$$item)"
                                value-format="yyyy-MM-dd">
                              </el-date-picker>
                            </el-form-item>
                          </div>
                          <!--日期-区间几号到几号-->
                          <div v-if="$$$$$$item.type == 'dateTime_Day_Interval'">
                           <el-form-item label="" class="text-base">
                            <div>
                              <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                             <el-date-picker
                               v-model="$$$$$$item.answer"
                               @change="userAddAnswerAction($$$$$$item)"
                               type="daterange"
                               size="small"
                               range-separator="至"
                               start-placeholder="开始日期"
                               end-placeholder="结束日期"
                               placeholder="选择日期范围">
                             </el-date-picker>
                           </el-form-item>
                          </div>
                          <!-- 只有问题没有答案 -->
                          <div v-if="$$$$$$item.type =='question'">
                            <el-divider><h2 class="text-sm font-bold">{{$$$$$$item.title}}</h2></el-divider>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
              <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-select v-model="$$item.answer"  @change='userAddAnswerAction($$item)' size="small">
                <el-option
                  v-for="(s,i) in $$item.listData"
                  :key="i"
                  :label="s.label"
                  :value="s.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div v-if="$$item.childQuestion  && $$item.childQuestion[$$item.answer]">
              <div v-for="($$$item,$$$index) in $$item.childQuestion[$$item.answer]" :key="$$$index">
                <!-- 数字 -->
                <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                  <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
				<!--输入框-身份证-->
				<div v-if="$$$item.type == 'input' && $$$item.input_type=='IdCard'">
				  <el-form-item label="" class="text-base">
				    <div>
				      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
				      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
				        <div slot="content">
				          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
				          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
						<!--输入框-身份证-->
						<div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='IdCard'">
						  <el-form-item label="" class="text-base">
						    <div>
						      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
						      <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
						        <div slot="content">
						          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						          <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                    <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                      <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                    <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                      <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
					  <!--输入框-身份证-->
					  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
					    <el-form-item label="" class="text-base">
					      <div>
					        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
					        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
					          <div slot="content">
					            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
					            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
					  <!--输入框-身份证-->
					  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
					    <el-form-item label="" class="text-base">
					      <div>
					        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
					        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
					          <div slot="content">
					            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
					            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                          <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                            <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                    </div>
                  </div>
                </div>
                <!--下拉框(多选)-->
                <div v-if="$$$item.type == 'select_multiple'">
                  <el-form-item label="">
                     <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
          <div v-if="$$item.type == 'select_multiple'">
            <el-form-item label="">
               <div>
                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-select v-model="$$item.answer" multiple placeholder="请选择" size="small" @change='userAddAnswerAction($$item)'>
                <el-option
                  v-for="(s,i) in $$item.listData"
                  :key="i"
                  :label="s.label"
                  :value="s.value">
                </el-option>
              </el-select>
            </el-form-item>
            <div v-if="$$item.childQuestion">
              <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                <div v-for="($$$$item,$$$$index) in $$item.childQuestion[$$$item]" :key="$$$$index+$$$item">
                  <!-- 数字类型输入框 -->
                  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                    <el-form-item label="" class="text-base">
                      <div>
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
				  <!--输入框-身份证-->
				  <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
				    <el-form-item label="" class="text-base">
				      <div>
				        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
				        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
				          <div slot="content">
				            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
				            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
						<!-- 输入框身份证 -->
						<div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='IdCard'">
						  <el-form-item label="" class="text-base">
						    <div>
						      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
						      <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
						        <div slot="content">
						          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						          <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                            <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                              <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
						  <!-- 输入框身份证 -->
						  <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='IdCard'">
						    <el-form-item label="" class="text-base">
						      <div>
						        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$$item.isRequired==false ">选填</span>{{ $$$$$$item.title }}</label>
						        <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
						          <div slot="content">
						            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						            <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$$item.description !='' && $$$$$$item.description !=undefined  && $$$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
          <!--下拉框选择每月几号-->
          <div v-if="$$item.type == 'select_day_per'">
              <el-form-item label="" class="text-base">
                <div>
                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
                <el-select v-model="$$item.answer" size="small" @change="userAddAnswerAction($$item)">
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
          <div v-if="$$item.type == 'select_day'">
              <el-form-item label="" class="text-base">
                <div>
                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
                <el-select v-model="$$item.answer" size="small" @change="userAddAnswerAction($$item)" >
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
          <div v-if="$$item.type == 'select_year'">
            <el-form-item label="" class="text-base">
              <div>
                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                <el-tooltip  v-if="$$item.description !='' && $$item.description !=undefined  && $$item.description != null" placement="right" effect="light">
                  <div slot="content">
                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                    <div id="caseMsg" class="h-auto w-full" v-html="$$item.description" ></div>
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
              <el-select v-model="$$item.answer" size="small" @change="userAddAnswerAction($$item)">
                <el-option
                  v-for="(s,i) in mon"
                  :key="i"
                  :label="s"
                  :value="s">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!--只有问题无答案-->
          <div v-if="$$item.type =='question'">
            <h2 class="text-sm font-bold"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{$$item.title}}</h2>
            <div  v-for="($$$item,$$$index) in $$item.childQuestion" :key="$$$index">
              <div v-show="!$$$item.requireQidAndAnswer || ($$$item.requireQidAndAnswer && $$item.childQuestion.filter(filterItme=>{return filterItme.id == $$$item.requireQidAndAnswer.id})[0] && $$item.childQuestion.filter(filterItme=>{return filterItme.id == $$$item.requireQidAndAnswer.id})[0].answer == $$$item.requireQidAndAnswer.answer)">
                <!-- 省市三级联动 -->
                  <div v-if="$$$item.type == 'select_city'">
                   <el-form-item label="">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                  <!--日期-精确到日-->
                  <div v-if="$$$item.type == 'dateTime_day'">
                   <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                       @change="userAddAnswerAction($$$item)"
                       format="yyyy 年 MM 月 dd 日"
                       value-format="yyyy-MM-dd">
                    </el-date-picker>
                   </el-form-item>
                 </div>
                  <!--日期-区间几点到几点-->
                  <div v-if="$$$item.type == 'dateTime_Time_Interval'">
                   <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                  <!--输入框-文字类型-->
                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='text'">
                   <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
				 <!--输入框-身份证-->
				  <div v-if="$$$item.type == 'input' && $$$item.input_type=='IdCard'">
				   <el-form-item label="" class="text-base">
				    <div>
				      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
				      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
				        <div slot="content">
				          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
				          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                  <!--输入框-数字类型（类似身份证号、金额）-->
                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='number'">
                   <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                       @blur="userAddAnswerAction($$$item)"
                     ></el-input>
                   </el-form-item>
                 </div>
                  <!-- 银行卡 -->
                  <div v-if="$$$item.type == 'input' && $$$item.input_type=='BankCard'">
                   <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                  <!--单选框-->
                  <div v-if="$$$item.type == 'radio'">
                   <el-form-item label="" class="text-base">
                    <div>
                      <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                      <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                        <div slot="content">
                          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                          <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                    <el-radio-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                     <el-radio :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                    </el-radio-group>
                   </el-form-item>
                    <div v-if="$$$item.grandson">
                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                        <div v-for="($$$$$item, $$$$$index) in $$$item.grandson[$$$$item]" :key="$$$$$index">
                          <!-- 省市三级联动 -->
                          <div v-if="$$$$$item.type == 'select_city'">
                            <el-form-item label="">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                          <!-- 数字类型 -->
                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                            <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                          <!-- 文本类型 -->
                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='text'">
                            <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
						  <!-- 文本类型 身份证 -->
						  <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='IdCard'">
						    <el-form-item label="" class="text-base">
						      <div>
						        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
						        <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
						          <div slot="content">
						            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						            <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                          <!--下拉框选择每月几号-->
                          <div v-if="$$$$$item.type == 'select_day_per'">
                              <el-form-item label="" class="text-base">
                                <div>
                                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                  <!-- 多选框 -->
                  <div v-if="$$$item.type == 'checkbox'">
                    <el-form-item label="" class="text-base">
                      <div>
                        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-checkbox-group v-model="$$$item.answer">
                        <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex"  @change="userAddAnswerAction($$$item)">{{list.label}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                    <div v-if="$$$item.grandson">
                      <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                        <div v-for="($$$$$item, $$$$$index) in $$$item.grandson[$$$$item]" :key="$$$$$index">
                          <!-- 省市三级联动 -->
                          <div v-if="$$$$$item.type == 'select_city'">
                            <el-form-item label="">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                          <!-- 数字类型 -->
                          <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='number'">
                            <el-form-item label="" class="text-base">
                              <div>
                                <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
						  <!-- 身份证 -->
						  <div v-if="$$$$$item.type == 'input' && $$$$$item.input_type=='IdCard'">
						    <el-form-item label="" class="text-base">
						      <div>
						        <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
						        <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
						          <div slot="content">
						            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						            <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                          <!--下拉框选择每月几号-->
                          <div v-if="$$$$$item.type == 'select_day_per'">
                              <el-form-item label="" class="text-base">
                                <div>
                                 <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$$item.isRequired==false ">选填</span>{{ $$$$$item.title }}</label>
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                                <el-tooltip  v-if="$$$$$item.description !='' && $$$$$item.description !=undefined  && $$$$$item.description != null" placement="right" effect="light">
                                  <div slot="content">
                                    <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                    <div id="caseMsg" class="h-auto w-full" v-html="$$$$$item.description"></div>
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
                  <!-- 下拉单选 -->
                  <div v-if="$$$item.type == 'select'">
                   <el-form-item label="" class="text-base">
                      <div>
                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
                          </div>
                          <i class="el-icon-question"></i>
                        </el-tooltip>
                      </div>
                     <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)">
                       <el-option
                         v-for="(s,i) in $$$item.listData"
                         :key="i"
                         :label="s.label"
                         :value="s.value">
                       </el-option>
                     </el-select>
                   </el-form-item>
                   <!--下拉框中的问题又会迁出子问题-->
                   <div v-if="$$$item.grandson && $$$item.grandson[$$$item.answer]">
                      <div v-for="($$$$item, $$$$index) in $$$item.grandson[$$$item.answer]" :key="$$$$index">
                        <!-- 省市三级联动 -->
                        <div v-if="$$$$item.type == 'select_city'">
                          <el-form-item label="">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <!--日期-精确到日-->
                        <div v-if="$$$$item.type == 'dateTime_day'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                               @change="userAddAnswerAction($$$$item)"
                              placeholder="选择日期"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd">
                            </el-date-picker>
                          </el-form-item>
                        </div>
                        <!--日期-区间几点到几点-->
                        <div v-if="$$$$item.type == 'dateTime_Time_Interval'">
                         <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                              is-range
                              @change="userAddAnswerAction($$$$item)"
                              type="datetimerange"
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
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <!--输入框-文字类型-->
                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='text'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
						<!--输入框-身份证-->
						<div v-if="$$$$item.type == 'input' && $$$$item.input_type=='IdCard'">
						  <el-form-item label="" class="text-base">
						    <div>
						       <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
						      <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
						        <div slot="content">
						          <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
						          <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <!--输入框-数字类型（类似身份证号、金额）-->
                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <!-- 银行卡 -->
                        <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='BankCard'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                        <!--单选框-->
                        <div v-if="$$$$item.type == 'radio'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-radio-group v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                              <el-radio :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </div>
                        <!--下拉框-->
                        <div v-if="$$$$item.type == 'select'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-select v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
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
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-select v-model="$$$$item.answer" size="small" @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
                              <el-option
                                v-for="(s,i) in $$$$item.listData"
                                :key="i"
                                :label="s.label"
                                :value="s.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <!-- 下拉框时间 -->
                        <div v-if="$$$$item.type == 'select_day'">
                          <el-form-item label="" class="text-base">
                            <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                            <el-select v-model="$$$$item.answer" @change="userAddAnswerAction($$$$item)">
                              <el-option
                                v-for="(s,i) in days"
                                :key="i"
                                :label="s"
                                :value="s">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                        <!--下拉框选择每月几号-->
                        <div v-if="$$$$item.type == 'select_day_per'">
                            <el-form-item label="" class="text-base">
                              <div>
                               <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                              <el-tooltip  v-if="$$$$item.description !='' && $$$$item.description !=undefined  && $$$$item.description != null" placement="right" effect="light">
                                <div slot="content">
                                  <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                                  <div id="caseMsg" class="h-auto w-full" v-html="$$$$item.description"></div>
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
                  <!-- 下拉多选 -->
                  <div v-if="$$$item.type == 'select_multiple'">
                    <el-form-item label="" class="text-base">
                      <div>
                         <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$item.isRequired==false ">选填</span>{{ $$$item.title }}</label>
                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                      <el-select v-model="$$$item.answer" size="small" @change="userAddAnswerAction($$$item)" multiple placeholder="请选择">
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
                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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
                        <el-tooltip  v-if="$$$item.description !='' && $$$item.description !=undefined  && $$$item.description != null" placement="right" effect="light">
                          <div slot="content">
                            <h3 style="color:#ff3f68" class="text-center text-base w-full font-bold">小贴士</h3><br/>
                            <div id="caseMsg" class="h-auto w-full" v-html="$$$item.description"></div>
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

          <!-- 二级问题块 -->
        </div>
      </div>
    </div>
  </div>

</template>

<script>
   import {userAddAnswer} from '@/api/api/AgreementRequest.js'    // 用户添加问卷的内容
   import { regionData, CodeToText,TextToCode  } from 'element-china-area-data'    // 省市联动信息
  export default {
    props: {
      newlist: {
        type: Array,
        required: true
      }
    },
    data () {
        return {
          hours: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
          days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          mon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          options: regionData,  // 省市联动
        }
    },
    methods:{
      userAddAnswerAction (e){
        if( e.isRequired == true){
          if(e.answer == '' || e.answer == null){
            this.$message.error('必填项内容不能为空');
          }else{
            if(e.fornum !== undefined){  //多子女
              if(Array.isArray(e.answer)){
                if(e.type == "select_city"){
                    userAddAnswer({
                    value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }else{
                  userAddAnswer({
                    value: JSON.stringify(e.answer),  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') // 用户的问卷id
                  }).then((data) => {

                  }).catch((data) => {
                  })
                }
              } else if (e.input_type == 'text' && typeof e.answer == 'number' ) {
                userAddAnswer({ // 必填多子女普通类型
                  value: JSON.stringify(e.answer), // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                }).catch((data) => {
                })
              } else if (e.input_type == 'IdCard' ) {
				alert(1)
				var idCard = e.answer
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;	
				if (regIdCard.test(idCard)) {
					if(idCard.length==18){
						var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
						var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
						var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
						for(var i=0;i<17;i++){
							idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
						}
						var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
						var idCardLast=idCard.substring(17);//得到最后一位身份证号码
						//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
						if(idCardMod==2){
							if(idCardLast=="X"||idCardLast=="x"){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}else{
							//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
							if(idCardLast==idCardY[idCardMod]){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}
					}
				} else {
					this.errorAlert('身份证输入不正确,请重新输入')
					e.answer = ''
				}
              } else {
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{

                }).catch((data)=>{
                   console.log("保存失败")
                })
              }
            }else{
              if(Array.isArray(e.answer)){
                if(e.type == "select_city"){
                  userAddAnswer({
                    value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    //
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                } else if (e.type == 'checkbox') {
					if (e.answer ==''){
						userAddAnswer({
						  value: '',  // 值
						  qpid: e.id, // 关联id
						  // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
						  quid: localStorage.getItem('quid') // 用户的问卷id
						})
					} else {
						userAddAnswer({
						  value: JSON.stringify(e.answer),  // 值
						  qpid: e.id, // 关联id
						  // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
						  quid: localStorage.getItem('quid') // 用户的问卷id
						}).then((data) => {
						  //
						}).catch((data) => {
						   // console.log("保存失败")
						})
					}
                }else{
                  userAddAnswer({
                    value: JSON.stringify(e.answer),  // 值
                    qpid: e.id, // 关联id
                    // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                    //
                  }).catch((data)=>{
                     // console.log("保存失败")
                  })
                }
              }else if(e.input_type=="text" && typeof e.answer=="number" ){
                userAddAnswer({ // 必填多子女普通类型
                  value: JSON.stringify(e.answer), // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') // 用户的问卷id
                }).then((data) => {
                }).catch((data) => {
                })
              } else if (e.input_type == 'IdCard' ) {
				var idCard = e.answer
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;	
				if (regIdCard.test(idCard)) {
					if(idCard.length==18){
						var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
						var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
						var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
						for(var i=0;i<17;i++){
							idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
						}
						var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
						var idCardLast=idCard.substring(17);//得到最后一位身份证号码
						//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
						if(idCardMod==2){
							if(idCardLast=="X"||idCardLast=="x"){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}else{
							//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
							if(idCardLast==idCardY[idCardMod]){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}
					}
				} else {
					this.errorAlert('身份证输入不正确,请重新输入')
					e.answer = ''
				}
              } else {
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                 // if( data.data.status_code == 202 ){
                 //    if(this.active==0){// 第一个模块刷新基本信息
                 //      this.getBasicInformation()
                 //    }else if(this.active==1){// 第二个模块刷新婚姻状况
                 //      this.getHunYinStatus()
                 //    }else if(this.active==2){// 第三个模块刷新子女状况
                 //      this.getZiNvMsg()
                 //    }else if(this.active==3){// 第四个模块刷新房产
                 //      this.getFangChanMsg()
                 //    }else if(this.active==4){// 第五个模块刷新存款
                 //      this.getCunKuanMsg()
                 //    }else if(this.active==5){// 第六个模块刷新车子
                 //      this.getCarMsg()
                 //    }else if(this.active==6){// 第七个模块刷新理财
                 //      this.getLiCaiMsg()
                 //    }else if(this.active==7){// 第八个模块刷新家具家电
                 //      this.getJiaDianMsg()
                 //    }else if(this.active==8){// 第九个模块刷新保险
                 //      this.getBaoXianMsg()
                 //    }else if(this.active==9){// 第十个模块刷新其他财产
                 //      this.getQiTaCaiChanMsg()
                 //    }else if(this.active==10){// 第十一个模块刷新债权
                 //      this.getZhaiQuanMsg()
                 //    }else if(this.active==11){// 第十二个模块刷新债务
                 //      this.getZhaiWuMsg()
                 //    }
                 //  }
                }).catch((data)=>{
                   // console.log("保存失败")
                })
              }
            }
          }
        }else{ // 选填字段
          if(e.fornum !== undefined){
            if(Array.isArray(e.answer)){
              if(e.type == "select_city"){
                  userAddAnswer({
                  value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{

                }).catch((data)=>{
                   console.log("保存失败")
                })
              }else{
                userAddAnswer({
                  value: JSON.stringify(e.answer),  // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{

                }).catch((data)=>{
                   console.log("保存失败")
                })
              }
            }else if(e.input_type=="text" && typeof e.answer=="number" ){
              userAddAnswer({ // 必填多子女普通类型
                value: JSON.stringify(e.answer), // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            } else if (e.input_type == 'IdCard' ) {
				var idCard = e.answer
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;	
				if (regIdCard.test(idCard)) {
					if(idCard.length==18){
						var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
						var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
						var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
						for(var i=0;i<17;i++){
							idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
						}
						var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
						var idCardLast=idCard.substring(17);//得到最后一位身份证号码
						//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
						if(idCardMod==2){
							if(idCardLast=="X"||idCardLast=="x"){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}else{
							//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
							if(idCardLast==idCardY[idCardMod]){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}
					}
				} else {
					this.errorAlert('身份证输入不正确,请重新输入')
					e.answer = ''
				}
              } else {
              userAddAnswer({
                value: e.answer,  // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{

              }).catch((data)=>{
                 console.log("保存失败")
              })
            }
          }else{
             if(Array.isArray(e.answer)){
              if(e.type == "select_city"){
                userAddAnswer({
                  value: JSON.stringify([CodeToText[e.answer[0]], CodeToText[e.answer[1]], CodeToText[e.answer[2]]]),  // 值
                  qpid: e.id, // 关联id
                  // fornum: null, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                  //
                }).catch((data)=>{
                   // console.log("保存失败")
                })
              } else if (e.type == 'checkbox') {
                  if (e.answer == '' ) {
                  	userAddAnswer({
                  	  value: '',  // 值
                  	  qpid: e.id, // 关联id
                  	  quid: localStorage.getItem('quid') // 用户的问卷id
                  	})
                  } else {
                  	userAddAnswer({
                  	  value: JSON.stringify(e.answer),  // 值
                  	  qpid: e.id, // 关联id
                  	  quid: localStorage.getItem('quid') // 用户的问卷id
                  	})
                  }
                } else {
                userAddAnswer({
                  value: JSON.stringify(e.answer),  // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }
            }else if(e.input_type=="text" && typeof e.answer=="number" ){
              userAddAnswer({ // 必填多子女普通类型
                value: JSON.stringify(e.answer), // 值
                qpid: e.id, // 关联id
                fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                quid: localStorage.getItem('quid') // 用户的问卷id
              }).then((data) => {
              }).catch((data) => {
              })
            } else if (e.input_type == 'IdCard' ) {
				var idCard = e.answer
				var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;	
				if (regIdCard.test(idCard)) {
					if(idCard.length==18){
						var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
						var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
						var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
						for(var i=0;i<17;i++){
							idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
						}
						var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
						var idCardLast=idCard.substring(17);//得到最后一位身份证号码
						//如果等于2，则说明校验码是10，身份证号码最后一位应该是X
						if(idCardMod==2){
							if(idCardLast=="X"||idCardLast=="x"){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}else{
							//用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
							if(idCardLast==idCardY[idCardMod]){
								userAddAnswer({ // 必填多子女普通类型
								  value: e.answer, // 值
								  qpid: e.id, // 关联id
								  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
								  quid: localStorage.getItem('quid') // 用户的问卷id
								}).then((data) => {
								}).catch((data) => {
								})
							}else{
								this.errorAlert('身份证输入不正确,请重新输入')
								e.answer = ''
							}
						}
					}
				} else {
					this.errorAlert('身份证输入不正确,请重新输入')
					e.answer = ''
				}
              } else {
              userAddAnswer({
                value: e.answer,  // 值
                qpid: e.id, // 关联id
                quid: localStorage.getItem('quid') //用户的问卷id
              }).then((data)=>{
              }).catch((data)=>{
              })
            }
          }
        }
      },
      // 提交身份证，银行卡，手机号等验证字段
      numAddAnswer(e){
        if(e.isRequired == true){ //必填
          if(e.answer == '' || e.answer == null){
             this.$message.error('必填项内容不能为空');
          }else{
            if(e.fornum !== undefined){
              if(e.input_type =='BankCard'){
                if(e.answer.length >= 20 || e.answer.length <= 15 ){
                  this.errorAlert('银行卡位数不正确,请重新输入')
                  e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }else if(e.input_type =='PhoneNum'){
				if (!(/^1[3456789]\d{9}$/.test(e.answer))){
					this.errorAlert('电话号码不正确,请重新输入')
					e.answer =''
				} else {
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }
            }else{
              if(e.input_type =='BankCard'){
                if(e.answer.length >= 20 || e.answer.length <= 15 ){
                  this.errorAlert('银行卡位数不正确,请重新输入')
                  e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }else if(e.input_type =='PhoneNum'){
                if (!(/^1[3456789]\d{9}$/.test(e.answer))){
                	this.errorAlert('电话号码不正确,请重新输入')
                	e.answer =''
                }else{
                  userAddAnswer({
                    value: e.answer,  // 值
                    qpid: e.id, // 关联id
                    quid: localStorage.getItem('quid') //用户的问卷id
                  }).then((data)=>{
                  }).catch((data)=>{
                  })
                }
              }
            }
          }
        }else{
          if(e.fornum !== undefined){
            if(e.input_type =='BankCard'){
              if(e.answer.length >= 20 || e.answer.length <= 15 ){
                this.errorAlert('银行卡位数不正确,请重新输入')
                e.answer =''
              }else{
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }
            }else if(e.input_type =='PhoneNum'){
              if(e.answer.length >= 16 || e.answer.length <= 6 ){
                this.errorAlert('电话号位数不正确,请重新输入')
                e.answer =''
              }else{
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }
            }
          }else{
            if(e.input_type =='BankCard'){
              if(e.answer.length >= 20 || e.answer.length <= 15 ){
                this.errorAlert('银行卡位数不正确,请重新输入')
                e.answer =''
              }else{
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }
            }else if(e.input_type =='PhoneNum'){
              if (!(/^1[3456789]\d{9}$/.test(e.answer))){
              	this.errorAlert('电话号码不正确,请重新输入')
              	e.answer =''
              }else{
                userAddAnswer({
                  value: e.answer,  // 值
                  qpid: e.id, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }
            }
          }
        }
      },
      errorAlert(e) {
        this.$message.error(e);
      }
    }
  }
</script>

<style>
	.el-tooltip__popper.is-dark{background-color: #f7fafc !important;color:#343434 !important; border:1px solid #eae3e3 !important;border-radius: 15px !important;box-shadow: 0px 0px 5px 2px #e6dddd}
	.el-tooltip__popper {width: 200px !important;height: 150px !important;overflow-y: scroll !important;border:1px solid #DCDFE6 !important}
</style>
