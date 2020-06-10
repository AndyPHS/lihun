<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto flex">
            <div class="w-1/2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2 cursor-pointer" @click="addTreeTitle()">{{treeTitle}}</h2>
                    <div class="h-40 overflow-scroll">

                        <el-tree
                          :data="treeList"
                          default-expand-all
                          node-key="id"
                          ref="tree"
                          empty-text="加载中，请稍后！"
                          highlight-current
                          @node-click="handleTreeJieDian()"
                          :props="defaultProps"
                           :draggable='true'
                          @node-drop="handleDrop"
                          >
                          <!-- <span slot-scope="{ node, data }">{{ node }}</span> -->
                        </el-tree>
                    </div>
                    <div class="w-2/3 text-left flex justify-around py-3">
                        <el-button type="primary" plain class="" @click="addTreeTitle">新增</el-button> 
                        <el-button type="primary" plain class="" @click="updateTree">修改</el-button>
                        <el-button type="primary" plain class="" @click="deletedTree">删除</el-button>
                    </div>
                </div>
            </div>
            <div class="w-1/2 mx-2">
                <div class="w-full">
                    <el-button type="primary" plain class="" @click="handleQuestionAdd">新增问题</el-button>
                </div>
                <div class="py-2 text-lg relative my-2">
                    <el-form class='flex justify-around'>
                        <el-form-item label="搜索" :label-width="formLabelWidth" class="mb-0">
                          <el-input v-model="titleSearchMsg" class="w-2/3" autocomplete="off" placeholder='请输入问题名称'></el-input>
                        </el-form-item>
                        <el-button type="primary" plain class="" @click="titleSearch">搜索问题</el-button>
                    </el-form>
                </div>
                <div class="py-2 text-lg relative">问题列表</div>
                <div class="text-center question_list">
                    <table class="w-full">
                        <thead>
                            <tr>
                                <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of list" :key="item.index">{{item}}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(item, index) in pageInfo"
                                :key="index"
                            >
                                <td class="border text-black hover:cursor-pointer">{{ item.title }}</td>
                                <td class="border text-black">{{ problemType[item.type] }}</td>
                                <td class="border text-black justify-around">
                                    <div class="flex justify-around py-1 w-2/3 mx-auto">
                                        <el-button type="primary" plain class="" size='mini' @click="dbclickQuestion(item.id)">添加</el-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <el-pagination
                    background
                    class="my-10"
                    layout="prev, pager, next"
                    @current-change="handleQuestionList"
                    :page-size="pagesize" 
                    :current-page.sync="currentPage"
                    :total="this.min.total">
                </el-pagination>
            </div>
        </div>
        
        <el-dialog title="新增问题" :visible.sync="dialogQuestionAdd">
          <el-form :model="user">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="user.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="user.type" placeholder="选择问题类型">
                  <el-option v-for="(item, index) in problemType" :key="index" :label="item" :value="index"></el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="验证类型" :label-width="formLabelWidth" v-if="user.type==1 ">
                <el-select v-model="user.re" placeholder="选择输入类型">
                  <el-option v-for="(item, index) in problemRe" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <div  v-for="(item, index) in add_answer" :key="index" v-if="user.type==6 || user.type==7 || user.type==8 || user.type==9 " class="flex justify-between " >
                <el-form-item label="选项名称" :label-width="formLabelWidth">
                     <el-input v-model="item.label" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <div>
                    <el-button @click="add_answer_btn">添加</el-button>
                    <el-button @click="delete_answer_btn(index)">删除</el-button>
                </div>
            </div>
            <el-form-item label="是否禁用" :label-width="formLabelWidth">
                <el-radio-group v-model="user.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogQuestionAdd = false">取 消</el-button>
            <el-button type="primary" @click="addNewQuestion">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改问题" :visible.sync="dialogFormVisible">
          <el-form :model="user">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="user.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-select v-model="user.type" placeholder="选择问题类型">
                  <el-option v-for="(item, index) in problemType" :key="index" :label="item" :value="index">{{item}}</el-option>
                </el-select>
              </el-form-item>
            <el-form-item label="验证类型" :label-width="formLabelWidth" v-if="user.type==1 ">
                <el-select v-model="user.re" placeholder="选择输入类型">
                  <el-option v-for="(item, index) in problemRe" :key="index" :label="item" :value="index">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <div  v-for="(item, index) in add_answer" :key="index" v-if="user.type==6 || user.type==7 || user.type==8 || user.type==9 " class="flex justify-between" >
                <el-form-item label="选项名称" :label-width="formLabelWidth">
                     <el-input v-model="item.label" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <div>
                    <el-button @click="add_answer_btn">添加</el-button>
                    <el-button @click="delete_answer_btn(index)">删除</el-button>
                </div>
            </div>
            <el-form-item label="是否禁用" :label-width="formLabelWidth">
                <el-radio-group v-model="user.status">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="updataQuestionMsg">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="问题配置" :visible.sync="dialogQuestionConfig">
          <el-form :model="problemqAdd">
            <el-form-item label="标题" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="problemqAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <div>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="problemqAdd.type">
                        <el-radio :label="2">不可重复</el-radio>
                        <el-radio :label="3">可重复</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input type="number" v-model="problemqAdd.orderId" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Class" :label-width="formLabelWidth">
              <el-input v-model="problemqAdd.class" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否必填" :label-width="formLabelWidth">
                <el-radio-group v-model="problemqAdd.important">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="小贴士" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" v-model="problemqAdd.description" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <div v-if="problemqAdd.type==6 || problemqAdd.type==7 || problemqAdd.type==8 || problemqAdd.type==9 " >
                <div class="relative wenti">
                    <span class="h-1"></span>
                    <span class="px-2 py-2 border absolute left-0 top-0 z-10 bg-white">问题关系配置</span>
                </div>
                <div class="clear-both"></div>
                <div>
                    <el-form-item label="绑定的值" :label-width="formLabelWidth">
                        <el-select v-model="whereItemConfig.value" placeholder="选择绑定的值">
                          <el-option v-for="(item, index) in selectOnlyLisg" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问题" :label-width="formLabelWidth">
                        <el-select v-model="whereItemConfig.relationId" filterable :filter-method="select_vague" placeholder="请选择">
                            <el-option
                              v-for="item in selectVagueValueArr"
                              :key="item.id"
                              :label="item.qpTitle"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件" :label-width="formLabelWidth">
                        <el-select v-model="whereItemConfig.type"  placeholder="请选择">
                            <el-option
                              v-for="item in TiaoJianList"
                              :key="item.value"
                              :label="item.title"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="my-2">
                        <el-button @click="addWhere">添加关系</el-button>
                        <!-- <el-button @click="deleteWhere(whereIndex)">删除关系</el-button> -->
                    </div>
                </div>
                <div>
                    <table class="w-full" >
                        <thead>
                            <tr>
                                <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of whereThead" :key="item.index">{{item}}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(item, index) in selectQpWhereList"
                                :key="index"
                            >
                                <td class="border text-black hover:cursor-pointer">{{ item.title }}</td>
                                <td class="border text-black">{{ whereType[item.qrtype] }}</td>
                                <td class="border text-black">{{ item.label }}</td>
                                <td class="border text-black justify-around">
                                    <div class="flex justify-around py-2 w-2/3 mx-auto">
                                        <!-- <el-button type="primary" plain class="" @click="dbclickQuestion(item.id)">修改</el-button> -->
                                        <el-button type="primary" plain class="" @click="deleteWhere(item.qpWhereId)">删除</el-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogQuestionConfig = false">取 消</el-button>
            <el-button type="primary" @click="addQuestionConfig">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改配置" :visible.sync="dialogQuestionConfigUpdate">
          <el-form :model="problemqAdd">
            <el-form-item label="标题" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="problemqAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <div>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="problemqAdd.type">
                        <el-radio :label="2">不可重复</el-radio>
                        <el-radio :label="3">可重复</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input type="number" v-model="problemqAdd.orderId" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Class" :label-width="formLabelWidth">
              <el-input v-model="problemqAdd.class" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否必填" :label-width="formLabelWidth">
                <el-radio-group v-model="problemqAdd.important">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="小贴士" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" v-model="problemqAdd.description" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="绑定问题" :label-width="formLabelWidth">
                <el-select v-model="problemqAdd.problemId" filterable :filter-method="dataFilter" @change="bangdingQuestion(problemqAdd.problemId)" placeholder="请选择">
                    <el-option
                      v-for="item in dataFilterValueArr"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <div v-if="problemqAdd.problemType ==6|| problemqAdd.problemType ==7 || problemqAdd.problemType ==8 || problemqAdd.problemType ==9">
                <div class="relative wenti">
                    <span class="h-1"></span>
                    <span class="px-2 py-2 border absolute left-0 top-0 z-10 bg-white">问题关系配置</span>
                </div>
                <div class="clear-both"></div>
                <div >
                    <el-form-item label="绑定的值" :label-width="formLabelWidth">
                        <el-select v-model="whereItemConfig.value" placeholder="选择绑定的值">
                          <el-option v-for="(item, index) in selectOnlyLisg" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问题" :label-width="formLabelWidth">
                        <el-select v-model="whereItemConfig.relationId" filterable :filter-method="select_vague" placeholder="请选择">
                            <el-option
                              v-for="item in selectVagueValueArr"
                              :key="item.id"
                              :label="item.qpTitle"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="条件" :label-width="formLabelWidth">
                        <el-select v-model="whereItemConfig.type" placeholder="请选择">
                            <el-option
                              v-for="item in TiaoJianList"
                              :key="item.value"
                              :label="item.title"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="my-2">
                        <el-button @click="addWhere">添加关系</el-button>
                        <!-- <el-button @click="deleteWhere(whereIndex)">删除关系</el-button> -->
                    </div>
                </div>
                <div>
                    <table class="w-full" >
                        <thead>
                            <tr>
                                <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of whereThead" :key="item.index">{{item}}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="(item, index) in selectQpWhereList"
                                :key="index"
                            >
                                <td class="border text-black hover:cursor-pointer">{{ item.title }}</td>
                                <td class="border text-black">{{ whereType[item.qrtype] }}</td>
                                <td class="border text-black">{{ item.label }}</td>
                                <td class="border text-black justify-around">
                                    <div class="flex justify-around py-2 w-2/3 mx-auto">
                                        <!-- <el-button type="primary" plain class="" @click="dbclickQuestion(item.id)">修改</el-button> -->
                                        <el-button type="primary" plain class="" @click="deleteWhere(item.qpWhereId)">删除</el-button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogQuestionConfigUpdate = false">取 消</el-button>
            <el-button type="primary" @click="addQuestionConfigUpdate">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加标题" :visible.sync="dialogaddTreeTitle">
          <el-form :model="problemqAdd">
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input v-model="problemqAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input type="number" v-model="problemqAdd.orderId" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="class" :label-width="formLabelWidth">
              <el-input v-model="problemqAdd.class" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogaddTreeTitle = false">取 消</el-button>
            <el-button type="primary" @click="addTreeTitleOk">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改标题" :visible.sync="dialogConfigTreeTitle">
          <el-form :model="problemqAdd">
            <el-form-item label="标题" :label-width="formLabelWidth">
              <el-input v-model="problemqAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input type="number" v-model="problemqAdd.orderId" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="class" :label-width="formLabelWidth">
              <el-input v-model="problemqAdd.class" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogConfigTreeTitle = false">取 消</el-button>
            <el-button type="primary" @click="configTreeTitleOk">确 定</el-button>
          </div>
        </el-dialog>
    </div>
        
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addQuestion} from '@/api/api/requestLogin.js'   // 新增问题
    import {addAnswer} from '@/api/api/requestLogin.js'    // 添加选项
    import {selectQuestion} from '@/api/api/requestLogin.js'  // 获取用户列表
    import {selectOnlyQuestion} from '@/api/api/requestLogin.js'  // 查询单独问题
    import {selectQuestionList} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    import {updateQuestion} from '@/api/api/requestLogin.js'   // 修改问题
    import {deleteQuestion} from '@/api/api/requestLogin.js'   // 删除问题
    import {QuestionArr} from '@/api/api/requestLogin.js'    // 问题数组
    import {selectTree} from '@/api/api/requestLogin.js'    // 查询关系
    import {selectVague} from '@/api/api/requestLogin.js'    // 模糊查询关系
    import {ProblemQAdd} from '@/api/api/requestLogin.js'    // 新增关联
    import {addQpWhere} from '@/api/api/requestLogin.js'    // 新增关联条件
    import {selectQpWhere} from '@/api/api/requestLogin.js'    // 查询关联条件
    import {deleteQpWhere} from '@/api/api/requestLogin.js'    // 删除关联条件
    import {deleteProblemQ} from '@/api/api/requestLogin.js'    // 删除关联
    import {updateProblemQ} from '@/api/api/requestLogin.js'    // 修改关联
    import {updateOrder} from '@/api/api/requestLogin.js'    // 修改层级 父类
    

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                pageInfo:[
                 {
                    id: '',
                    title: '',
                    type: ''
                 }
                ],
                titleSearchMsg: '',
                list: {
                    title: '问题名称',
                    type: '问题类型',
                    control: '操作'
                },
                user:{
                    title: '',
                    type: '',
                    re: '',
                    status: '',    // 是否禁用
                    imgs: []       // 添加实例
                },
                add_answer: [{      // 添加选项
                    status: '',
                    label: ''
                }],    // 
                // fileList: [],   // 实例图片
                treeId: null, // 树结构前面的节点
                treeList: [],    // 节点树数据
                treeTitle:'',    // 节点标题
                dataFilterValueArr: [], // 点击修改弹出的绑定问题模糊搜索
                selectVagueValueArr: [], // 点击修改弹出的绑定问题模糊搜索关联搜索结果
                // whereArr: [{
                //     relationId: null,
                //     type: '',
                //     value: null
                // }],
                whereThead: { 
                    title: '标题',
                    tiaojian: '条件',
                    value: '值',
                    control: '操作'
                },
                whereItemConfig: {
                    relationId: null,
                    type: null,
                    value: null
                },
                TiaoJianList:[
                    {
                       title: '等于',
                       value: '1'             
                    },
                    {
                       title: '小于',
                       value: '2'             
                    },
                    {
                       title: '大于',
                       value: '3'             
                    },
                    {
                       title: '大于等于',
                       value: '4'             
                    },
                    {
                       title: '小于等于',
                       value: '5'             
                    },
                    {
                       title: '不等于',
                       value: '6'             
                    },
                    {
                       title: '包含',
                       value: '7'             
                    }
                ],
                whereType: { // 条件类型
                    '1': '等于',
                    '2': '小于',
                    '3': '大于',
                    '4': '小于等于',
                    '5': '大于等于',
                    '6': '不等于',
                    '7': '包含'
                },
                defaultProps: {
                  children: 'child',
                  label: 'title'
                },
                problemId: null,
                // fqaspId: null,   // 当前选中的树形结构的节点
                nodeChild: null, // 当前选中的树形结构是否有子集
                problemqAdd: {   
                    questionnaireId: localStorage.getItem('qid'),
                    problemId: null,
                    problemTitle: '',
                    problemType: null,
                    orderId: null,
                    description: '', //小贴士
                    fqaspId: null,
                    important: null,
                    id: null,   // 当前选中的树形结构的节点
                    type: null,
                    class: null,
                    title: '',
                    where: [{
                        problemId: null,
                        type: '',
                        value: null
                    }]
                },
                selectQpWhereList: [],  // 查询当前问题绑定的关联关系
                problemType: {},
                problemRe: {},
                UserRole: [],
                chooseUserRole: [],
                selectOnlyLisg: [],
                min: '',
                dialogFormVisible: false,
                dialogQuestionAdd: false,
                dialogQuestionConfig: false,        // 点击添加配置
                dialogQuestionConfigUpdate: false,  // 修改配置
                dialogaddTreeTitle: false,  // 新增标题
                dialogConfigTreeTitle: false,   // 点击标题修改
                formLabelWidth: '80px',
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
                pageNum: 1, // 第几页
            }
        },
        mounted () {
          this.handleQuestionList()   //获取问题列表
          this.QuestionArrOk() // 获取问题数组
          this.selectTree() // 获取关系列表
          this.selectOnlyQuestion() // 查询单独问题
        },
        methods:{
            handleQuestionList () { // 获取问题
                selectQuestion({page:this.currentPage}).then((data)=>{
                    this.pageInfo = data.data.data.data
                    this.min = data.data.data
                }).catch((data)=>{
                    // this.$router.replace("/");
                })
            },
            encodeSearchParams(obj) {   // 通过条件查找问题
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
              titleSearch () {  // 点击查找开始查找问题
                selectQuestionList("title="+this.titleSearchMsg).then((data)=>{
                    this.pageInfo = data.data.data.data
                    this.min = data.data.data
                    this.total = data.data.total
                }).catch((data)=>{
                    console.log(data)
                })
              },
            QuestionArrOk () {   // 查询选项
                QuestionArr().then((data)=>{
                    this.problemType = data.data.data.problemType
                    this.problemRe = data.data.data.problemRe
                })
            },
            bangdingQuestion (e) {  // 点击修改弹框，选择绑定问题后获取绑定问题的值
                localStorage.setItem('pid',e)
                updateProblemQ({
                    questionnaireId: localStorage.getItem('qid'),
                    problemId: this.problemqAdd.problemId,
                    orderId: this.problemqAdd.orderId,
                    fqaspId: this.problemqAdd.fqaspId,
                    important: this.problemqAdd.important,
                    type: this.problemqAdd.type,
                    class: this.problemqAdd.class,
                    title: this.problemqAdd.title
                }).then((data)=>{
                   
                }).catch((data)=>{

                })
                this.selectOnlyQuestion ()
            },
            add_answer_btn () {
                this.add_answer.push({      // 添加选项
                    status: '',
                    label: ''
                })
            },
            addWhere () {   
                addQpWhere({
                    relationId: this.whereItemConfig.relationId,
                    type: this.whereItemConfig.type,
                    value: this.whereItemConfig.value
                }).then((data)=>{
                    this.whereItemConfig.relationId ='';
                    this.whereItemConfig.type = '';
                    this.whereItemConfig.value = '';
                    this.selectQpWhere()
                }).catch((data)=>{

                })
            },
            deleteWhere (e) {
                localStorage.setItem('qpWhereId',e)
                deleteQpWhere().then((data)=>{
                    this.selectQpWhere()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch((data)=>{

                })
            },
            selectTree () {   // 查询树结构
                selectTree().then((data)=>{
                    this.treeList = data.data.data.data
                    this.treeTitle = data.data.data.title
                    // this.treeId = this.$refs.tree.currentNode.node.data.id
                    // console.log(data.data)
                }).catch((data)=>{
                    console.log("请求失败")
                })
            },
            // 操作树结构
            handleTreeJieDian () {
                this.problemqAdd.type = this.$refs.tree.currentNode.node.data.type  // 标题类型
                this.problemqAdd.problemId = this.$refs.tree.currentNode.node.data.problemId  // 绑定问题的id
                this.problemqAdd.problemTitle = this.$refs.tree.currentNode.node.data.problemTitle  // 绑定问题的title
                this.problemqAdd.problemType = this.$refs.tree.currentNode.node.data.problemType // 绑定问题的类型
                this.problemqAdd.important = this.$refs.tree.currentNode.node.data.important  // 绑定问题是否必填
                this.problemqAdd.id = this.$refs.tree.currentNode.node.data.id    // 当前选择的ID
                this.problemqAdd.fqaspId = this.$refs.tree.currentNode.node.data.fqaspId // 当前选择的父ID
                this.problemqAdd.orderId = this.$refs.tree.currentNode.node.data.orderId // 当前选择的orderID
                this.nodeChild = this.$refs.tree.currentNode.node.data.child
                this.problemqAdd.title = this.$refs.tree.currentNode.node.data.title
                this.problemqAdd.description = this.$refs.tree.currentNode.node.data.description  // 绑定问题的小贴士
            },
            getCheckedNodes() { // 通过 node 获取
                console.log(this.$refs.tree.getCheckedNodes());
            },
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
              },
              setCheckedNodes() {
                this.$refs.tree.setCheckedNodes([{
                  id: 5,
                  label: '二级 2-1'
                }, {
                  id: 9,
                  label: '三级 1-1-1'
                }]);
              },
              setCheckedKeys() {
                this.$refs.tree.setCheckedKeys([3]);
              },
              resetChecked() {
                this.$refs.tree.setCheckedKeys([]);
              },
            addTreeTitle () {  // 添加标题
                this.problemqAdd.title = '';
                this.problemqAdd.orderId = null;
                this.dialogaddTreeTitle = true;
            },
            addTreeTitleOk () { // 确认添加标题
                if(this.problemqAdd.id ==null){
                    ProblemQAdd({
                        questionnaireId: localStorage.getItem('qid'),
                        orderId: 0,
                        fqaspId: 0,
                        class: this.problemqAdd.class,
                        type: 1,
                        title: this.problemqAdd.title
                    }).then((data)=>{
                        this.problemqAdd.orderId = null
                        this.problemqAdd.title = '';
                        this.problemqAdd.class = '';
                        this.dialogaddTreeTitle = false;
                        this.selectTree()
                    }).catch((data)=>{

                    })
                }else{
                    ProblemQAdd({
                        questionnaireId: localStorage.getItem('qid'),
                        orderId: this.problemqAdd.orderId,
                        fqaspId: this.problemqAdd.id,
                        class: this.problemqAdd.class,
                        type: 1,
                        title: this.problemqAdd.title
                    }).then((data)=>{
                        this.problemqAdd.title = '';
                        this.problemqAdd.class = '';
                        this.dialogaddTreeTitle = false;
                        this.selectTree()
                    }).catch((data)=>{

                    })
                }
                
            },
            configTreeTitleOk(){ // 点击标题进行修改的时候提交到修改接口
                updateProblemQ({
                    questionnaireId: localStorage.getItem('qid'),
                    problemId: this.problemqAdd.problemId,
                    orderId: this.problemqAdd.orderId,
                    fqaspId: this.problemqAdd.fqaspId,
                    important: this.problemqAdd.important,
                    type: this.problemqAdd.type,
                    class: this.problemqAdd.class,
                    title: this.problemqAdd.title
                }).then((data)=>{
                    this.problemqAdd.title = '';
                    this.problemqAdd.class = '';
                    this.problemqAdd.type = '';
                    this.problemqAdd.orderId = null
                    this.problemqAdd.important = null;
                    localStorage.removeItem('qpid')
                    this.dialogConfigTreeTitle = false;
                    this.selectTree()
                }).catch((data)=>{

                })
            },
            updateTree(){   // 修改树结构
                localStorage.setItem('qpid',this.problemqAdd.id)
                if(this.problemqAdd.type==1){
                   this.dialogConfigTreeTitle = true; 
                }else{
                    this.dialogQuestionConfigUpdate = true;
                    this.selectQpWhere();
                    localStorage.setItem('pid',this.problemqAdd.problemId)
                    this.selectOnlyQuestion()
                    this.dataFilterValueArr = [{
                        title:this.problemqAdd.problemTitle,
                        id:this.problemqAdd.problemId
                   }]
                }
            },
            deletedTree () {   // 删除树节点
                this.$confirm('此操作将删除该问题, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    deleteProblemQ(this.problemqAdd.id).then((data)=>{
                        this.selectTree()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch((data)=>{
                       this.$message({
                        type: 'info',
                        message: '有子集无法删除'
                      });  
                    }) 
                    this.problemqAdd.id = null
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  }); 
                });
            },
            delete_answer_btn (index) {   // 点击删除，删除当前选项
                this.add_answer.splice(index,1)
            },
            dbclickQuestion (e){   // 点击为选中的问题添加配置
                this.dialogQuestionConfig = true
                localStorage.setItem('pid',e)
                this.problemqAdd.problemId = e
                this.selectOnlyQuestion()
                // console.log(e)
            },
            selectOnlyQuestion () {  // 查询单独问题
                selectOnlyQuestion().then((data)=>{
                    this.selectOnlyLisg = data.data.child
                    this.problemqAdd.problemType = data.data[0].type
                    // this.problemqAdd.title = data.data[0].title
                    // localStorage.removeItem('pid')
                }).catch((data)=>{

                })
            },
            selectQpWhere() {  // 查询选中的问题下关联的关系
                selectQpWhere().then((data)=>{
                    this.selectQpWhereList = data.data.data
                    // console.log(this.selectQpWhereList)
                }).catch((data)=>{

                })
            },
            addQuestionConfig () {  // 点击确定提交当前问题的配置
                if(this.problemqAdd.type==6 || this.problemqAdd.type==7 || this.problemqAdd.type==8 || this.problemqAdd.type==9 ){
                    ProblemQAdd({
                        questionnaireId: localStorage.getItem('qid'),
                        problemId: this.problemqAdd.problemId,
                        orderId: this.problemqAdd.orderId,
                        fqaspId: this.problemqAdd.id,
                        important: this.problemqAdd.important,
                        type: this.problemqAdd.type,
                        class: this.problemqAdd.class,
                        title: this.problemqAdd.title,
                        description: this.problemqAdd.description
                    }).then((data)=>{
                        this.problemqAdd.title = '';
                        this.problemqAdd.class = '';
                        this.problemqAdd.type = '';
                        this.problemqAdd.orderId = null
                        this.problemqAdd.important = null;
                        this.problemqAdd.description = '';
                        localStorage.setItem('qpid',data.data.data)
                        // this.whereArr.forEach((item)=>{
                            
                        // })
                        // this.selectQpWhere()
                        localStorage.removeItem('qpid')
                        this.dialogQuestionConfig = false;
                        this.selectTree()
                    }).catch((data)=>{

                    })
                }else{
                    ProblemQAdd({
                        questionnaireId: localStorage.getItem('qid'),
                        problemId: this.problemqAdd.problemId,
                        orderId: this.problemqAdd.orderId,
                        fqaspId: this.problemqAdd.id,
                        important: this.problemqAdd.important,
                        type: this.problemqAdd.type,
                        class: this.problemqAdd.class,
                        title: this.problemqAdd.title,
                        description: this.problemqAdd.description
                    }).then((data)=>{
                        this.dialogQuestionConfig = false;
                        this.problemqAdd.title = '';
                        this.problemqAdd.class = '';
                        this.problemqAdd.type = '';
                        this.problemqAdd.orderId = null
                        this.problemqAdd.important = null;
                        this.problemqAdd.description = '';
                        this.selectTree()
                    }).catch((data)=>{

                    })
                }
                
            },
             addQuestionConfigUpdate () {  // 修改配置点击确定提交当前问题的配置
                if(this.problemqAdd.type==6 || this.problemqAdd.type==7 || this.problemqAdd.type==8 || this.problemqAdd.type==9 ){
                    updateProblemQ({
                        questionnaireId: localStorage.getItem('qid'),
                        problemId: this.problemqAdd.problemId,
                        orderId: this.problemqAdd.orderId,
                        fqaspId: this.problemqAdd.fqaspId,
                        important: this.problemqAdd.important,
                        type: this.problemqAdd.type,
                        class: this.problemqAdd.class,
                        title: this.problemqAdd.title,
                        description: this.problemqAdd.description
                    }).then((data)=>{
                        this.problemqAdd.title = '';
                        this.problemqAdd.class = '';
                        this.problemqAdd.type = '';
                        this.problemqAdd.orderId = null
                        this.problemqAdd.important = null;
                        this.problemqAdd.description = '';
                        localStorage.removeItem('qpid')
                        this.dialogQuestionConfigUpdate = false;
                        this.selectTree()
                    }).catch((data)=>{

                    })
                }else{
                    updateProblemQ({
                        questionnaireId: localStorage.getItem('qid'),
                        problemId: this.problemqAdd.problemId,
                        orderId: this.problemqAdd.orderId,
                        fqaspId: this.problemqAdd.fqaspId,
                        important: this.problemqAdd.important,
                        type: this.problemqAdd.type,
                        class: this.problemqAdd.class,
                        title: this.problemqAdd.title,
                        description: this.problemqAdd.description
                    }).then((data)=>{
                        this.dialogQuestionConfigUpdate = false;
                        this.problemqAdd.title = '';
                        this.problemqAdd.class = '';
                        this.problemqAdd.type = '';
                        this.problemqAdd.orderId = null
                        this.problemqAdd.important = null;
                        this.problemqAdd.description = '';
                        this.selectTree()
                    }).catch((data)=>{

                    })
                }
                
            },
            dataFilter (val) {  // 点击修改弹出的绑定问题模糊搜索
                selectQuestionList("title="+val).then((data)=>{
                    this.dataFilterValueArr = data.data.data.data
                }).catch((data)=>{

                })
            },
            select_vague (val) {  // 关联的模糊搜索
                selectVague("title="+val).then((data)=>{
                    this.selectVagueValueArr = data.data
                }).catch((data)=>{

                })

            },
            handleSizeChange (size) {   // 点击分页
                this.pagesize = size;
            },
            handleCurrentChange (currentPage) {    //点击哪一页
                this.currentPage = currentPage;
            },
            
            handleQuestionAdd () {    // 点击新增
                this.user.title = '';
                this.user.type = '';
                this.user.status = '';
                this.dialogQuestionAdd = true
            },
            addNewQuestion () {   // 新增问题
                addQuestion({
                    title: this.user.title,
                    type: this.user.type,
                    re: this.user.re,
                    status: this.user.status
                }).then((data)=>{
                    this.user.title = '';
                    this.user.type = '';
                    this.user.re = '';
                    this.user.status = '';
                    this.handleQuestionList()
                    localStorage.setItem('pid',data.data.data)
                    this.add_answer.forEach((item)=>{
                        addAnswer({
                            status: 1,
                            label: item.label
                        }).then((data)=>{
                            console.log('添加成功')
                        })
                    })
                    this.dialogQuestionAdd = false
                }).catch((data)=>{

                })
            },
            handleCheckedCitiesChange (value) {
                this.chooseUserRole = value
                
            },
            updataQuestionMsg () {   // 确定修改用户信息
                if(this.user.type==1){
                    updateQuestion({
                        title: this.user.title,
                        type: this.user.type,
                        re: this.user.re,
                        status: this.user.status
                    }).then((data)=>{
                        this.user.title = '';
                        this.user.type = '';
                        this.user.re = '';
                        this.user.status = '';
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    })
                } if(this.user.type==6 || this.user.type==7 || this.user.type==8 || this.user.type==9 ){
                    updateQuestion({
                        title: this.user.title,
                        type: this.user.type,
                        status: this.user.status
                    }).then((data)=>{
                        this.user.title = '';
                        this.user.type = '';
                        this.user.status = '';
                        this.add_answer.forEach((item)=>{
                            addAnswer({
                                status: 1,
                                label: item.label
                            }).then((data)=>{
                                console.log('添加成功')
                            })
                        })
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    })  
                }else{
                   updateQuestion({
                        title: this.user.title,
                        type: this.user.type,
                        status: this.user.status
                    }).then((data)=>{
                        this.user.title = '';
                        this.user.type = '';
                        this.user.status = '';
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    }) 
                }
                
            },
            deleteQuestion (e) {   // 删除用户
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    deleteQuestion(e).then((data)=>{
                        this.handleQuestionList()
                    })
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除'
                  });          
                });
                
            },
             handleDrop(draggingNode, dropNode, dropType, ev) {
              console.log(draggingNode, dropNode, dropType, ev);
              this.$confirm('此操作将移动该模块位置, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    updateOrder({
                        qpid: draggingNode.data.id,
                        fqaspId: dropNode.data.fqaspId
                    }).then((data)=>{
                        this.$message({
                            type: 'success',
                            message: '排序成功!'
                        });
                        this.selectTree() // 刷新关系列表
                    }).catch((data)=>{
                        this.$message({
                            type: 'error',
                            message: '排序失败!'
                        });
                    })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消移动'
                  });          
                });
              
            },
            handleRemove(file, fileList) {
              console.log(file, fileList);
            },
            handlePreview(file) {
               console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    }
</script>

<style scoped>
.h-40{height: 480px;}
.h-1{height: 1px;width: 100%;background: #343434;display: inline-block;position: absolute;top:20px;left: 0}
.el-form-item{margin-bottom:0.25rem;}
.wenti{height: 40px;}
.question_list{height: 340px;overflow: scroll;}
</style>
