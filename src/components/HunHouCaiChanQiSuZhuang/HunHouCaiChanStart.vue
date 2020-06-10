<template>
  <div class="relative">
    <div class="container mx-auto">
      <div>
        <el-form label-position="top" label-width="160px">
          <div class="ml-5">
            <div class="text-2xl font-bold text-center py-8">为了更高效地为您定制离婚后财产纠纷起诉状，请填写如下问题：</div>
            <div class="w-3/5 text-left mx-auto bg-white px-5 py-5 border-2 border-green-200 rounded-lg shadow-lg">
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
                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                          <el-radio-group v-model="$$item.answer"  @change="userAddAnswerAction($$item)">
                            <el-radio :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex" >{{list.label}}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </div>
                      <!-- 多选框 -->
                      <div v-if="$$item.type == 'checkbox'">
                        <el-form-item label="">
                          <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$item.isRequired==false ">选填</span>{{ $$item.title }}</label>
                          <el-checkbox-group v-model="$$item.answer"  @change="userAddAnswerAction($$item)">
                            <el-checkbox :label="list.value" v-for="(list, listIndex) in $$item.listData" :key="'list'+listIndex">{{list.label}}</el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                        <div v-if="$$item.grandson">
                          <div v-for="($$$item, $$$index) in $$item.answer" :key="$$$index">
                            <div v-for="($$$$item,$$$$index) in $$item.grandson[$$$item]">
                              <div v-if="$$$$item.type == 'input' && $$$$item.input_type=='number'">
                                <el-form-item label="">
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
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
                              <div v-if="$$$$item.type == 'select'">
                                <el-form-item label="">
                                  <label slot="label"><span class="mr-1 px-2 py-1 rounded bg-green-500 text-white" v-if="$$$$item.isRequired==false ">选填</span>{{ $$$$item.title }}</label>
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
                                  <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]">
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

                      <div v-if="$$item.childQuestion && $$item.childQuestion[$$item.answer]">
                        <div v-for="($$$item,$$$index) in $$item.childQuestion[$$item.answer]" :key="$$$index">
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
                                @blur="userAddAnswerAction($$$item)"
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
                              <el-checkbox-group v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                              </el-checkbox-group>
                            </el-form-item>
                            <div v-if="$$$item.grandson">
                              <div v-for="($$$$item, $$$$index) in $$$item.answer" :key="$$$$index">
                                <div v-for="($$$$$item,$$$$$index) in $$$item.grandson[$$$$item]">
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
                          <!--下拉框-->
                          <div v-if="$$$item.type == 'select'">
                            <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                              <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
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
                           <!--下拉框(多选)-->
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
                          <!--下拉框选择每月几号-->
                          <div v-if="$$$item.type == 'select_day_per'">
                              <span>
                                每月
                                <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                  <el-option
                                    size="small"
                                    v-for="(s,i) in days"
                                    :key="i"
                                    :label="s"
                                    :value="s">
                                  </el-option>
                                </el-select>
                                日前
                              </span>
                          </div>
                          <!--下拉框选择月几号-->
                          <div v-if="$$$item.type == 'select_day'">
                              <span>
                                月
                                <el-select v-model="$$$item.answer" @change="userAddAnswerAction($$$item)">
                                  <el-option
                                    size="small"
                                    v-for="(s,i) in days"
                                    :key="i"
                                    :label="s"
                                    :value="s">
                                  </el-option>
                                </el-select>
                                日前
                              </span>
                          </div>
                          <!--下拉选择一年中哪个月-->
                          <div v-if="$$$item.type == 'select_year'">
                            <el-form-item :label="$$$item.isRequired==false ?'(选填)'+$$$item.title:$$$item.title">
                              <el-select v-model="$$$item.answer"  @change="userAddAnswerAction($$$item)">
                                <el-option
                                  size="small"
                                  v-for="(s,i) in mon"
                                  :key="i"
                                  :label="s"
                                  :value="s">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </div>

                          <!-- 三级问题 -->

                          <div v-if="$$$item.questions ">
                            <h2 class="text-left text-blue-500">{{$$$item.title}}</h2>
                            <div v-for="($$$$item, $$$$index) in $$$item.questions">
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
                                <!-- 多选框 -->
                                <div v-if="$$$$item.type == 'checkbox'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                    <el-checkbox-group v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
                                      <el-checkbox :label="list.value" v-for="(list, listIndex) in $$$$item.listData" :key="'list'+listIndex" >{{list.label}}</el-checkbox>
                                    </el-checkbox-group>
                                  </el-form-item>
                                  <div v-if="$$$$item.grandson">
                                    <div v-for="($$$$$item, $$$$$index) in $$$$item.answer" :key="$$$$$index">
                                      <div v-for="($$$$$$item,$$$$$$index) in $$$$item.grandson[$$$$$item]">
                                        <div v-if="$$$$$$item.type == 'input' && $$$$$$item.input_type=='number'">
                                          <el-form-item :label="$$$$$$item.isRequired==false ?'(选填)'+$$$$$$item.title:$$$$$$item.title" class="text-base">
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
                                        <div v-if="$$$$$$item.type == 'select'">
                                          <el-form-item :label="$$$$$$item.isRequired==false ?'(选填)'+$$$$$$item.title:$$$$$$item.title">
                                            <el-select v-model="$$$$$$item.answer" @change="userAddAnswerAction($$$$$$item)">
                                              <el-option
                                                size="small"
                                                v-for="(s,i) in $$$$$$item.listData"
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
                                <!--下拉框-->
                                <div v-if="$$$$item.type == 'select'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
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
                                 <!--下拉框(多选)-->
                                <div v-if="$$$$item.type == 'select_multiple'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                    <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)" multiple placeholder="请选择">
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
                                <!--下拉框选择每月几号-->
                                <div v-if="$$$$item.type == 'select_day_per'">
                                    <span>
                                      每月
                                      <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
                                        <el-option
                                          size="small"
                                          v-for="(s,i) in days"
                                          :key="i"
                                          :label="s"
                                          :value="s">
                                        </el-option>
                                      </el-select>
                                      日前
                                    </span>
                                </div>
                                <!--下拉框选择月几号-->
                                <div v-if="$$$$item.type == 'select_day'">
                                    <span>
                                      月
                                      <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
                                        <el-option
                                          size="small"
                                          v-for="(s,i) in days"
                                          :key="i"
                                          :label="s"
                                          :value="s">
                                        </el-option>
                                      </el-select>
                                      日前
                                    </span>
                                </div>
                                <!--下拉选择一年中哪个月-->
                                <div v-if="$$$$item.type == 'select_year'">
                                  <el-form-item :label="$$$$item.isRequired==false ?'(选填)'+$$$$item.title:$$$$item.title">
                                    <el-select v-model="$$$$item.answer"  @change="userAddAnswerAction($$$$item)">
                                      <el-option
                                        size="small"
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
             <el-button type="primary" @click="NextPage">下一步</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute returnUserList right-0">
      <el-button type="primary" @click="returnUserList">返回文书列表</el-button>
    </div>
  </div>

</template>
<script>
  import {userAddAnswer} from '@/api/api/requestLogin.js'    // 用户添加问卷的内容
  import {getOnlyValue} from '@/api/api/requestLogin.js'    // 获取单独问题的值

  export default {
    components: {
      // label_case,
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
      name: 'FenJiaXiChanStart',

      mounted () {
        this.childList();
      },
      methods: {
        childMsg1 () {
          return [
            {
              title: '',
              questions: [
                {
                  title: '需要处理的房产有？（多选）',
                  id: '3470',
                  isRequired: true,
                  type: 'checkbox',
                  tip: '提示',
                  answer: [],
                  listData: [
                    { label: '房产', value: '1' },  // 3471
                    { label: '车辆', value: '2' },  // 3472
                    { label: '理财', value: '3' },  // 3473
                    { label: '存款', value: '4' },  // 3474
                    { label: '其他', value: '5' }, // 3475
                  ]
                }
              ]
            }
          ]
        },
        childList (e) {
          this.$forceUpdate();
          this.childAll = [];
          this.$set(this.childAll, 1, this.childMsg1())
        },
        userAddAnswerAction (e){
          if(Array.isArray(e.answer)){
            userAddAnswer({
              value: JSON.stringify(e.answer),  // 值
              qpid: e.id, // 关联id
              fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
              quid: localStorage.getItem('quid') //用户的问卷id
            }).then((data)=>{
              // console.log(e.answer)
              // console.log(typeof(e.answer))
            }).catch((data)=>{
               // console.log("保存失败")
            })
          }else{
            userAddAnswer({
              value: e.answer,  // 值
              qpid: e.id, // 关联id
              fornum: e.fornum, // 是否为重复问题下的子问题，是的话传for的层级，没有的话不传递
              quid: localStorage.getItem('quid') //用户的问卷id
            }).then((data)=>{
              // console.log("保存成功")
            }).catch((data)=>{
               // console.log("保存失败")
            })
          }
          if(e.id == 3470){
            e.answer.forEach((item)=>{
              if(item==1){     // 添加房产
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 3471, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }else if(item==2){   // 添加车辆
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 3472, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }else if(item==3){  // 添加理财
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 3473, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }else if(item==4){  // 添加存款
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 3474, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }else if(item==5){  // 添加其他
                userAddAnswer({
                  value: 1,  // 值
                  qpid: 3475, // 关联id
                  quid: localStorage.getItem('quid') //用户的问卷id
                }).then((data)=>{
                }).catch((data)=>{
                })
              }
            })
          }
        },
        NextPage () {
          this.$router.replace("/HunHouCaiChanBasic");
        },
        returnUserList () {
           this.$router.replace("/UserSystem");
        }
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
.ban{width:100% !important;}
.returnUserList{top:110px;right: 20px;}
.el-form-item{margin-bottom:8px !important;}
.el-form--label-top .el-form-item__label{padding-bottom:0 !important;}
.el-date-editor.el-input, .el-date-editor.el-input__inner{width:100% !important;}
.el-cascader{width:100% !important;}
.el-select{width:100% !important;}
</style>
