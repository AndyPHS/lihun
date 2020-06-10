<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto flex">
            <div class="w-1/2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2 cursor-pointer"><span @click="addRootWord">{{treeTitle}}组合规则</span><el-button type="primary" plain size="small" @click="editDisplayContent">新增组合规则</el-button></h2>
                    <div class="h-40 overflow-scroll">
                        <el-tree
                          :data="wordTreeList"
                          default-expand-all
                          node-key="id"
                          ref="wordtree"
                          empty-text="加载中，请稍后！"
                          highlight-current
                          @node-contextmenu="addGuiZeText()"
                          @node-click="handleWordTreeJieDian()"
                          :props="wordDefaultProps">
                        </el-tree>
                    </div>
                    <div class="w-full text-left flex justify-around py-3">
                        <el-button type="primary" plain size="small" @click="addNewWord">新增组合</el-button> 
                        <el-button type="primary" plain size="small" @click="updateWordAlert">修改组合</el-button>
                        <el-button type="primary" plain size="small" @click="deleteWordAlert">删除组合</el-button>
                        <el-button type="primary" plain size="small" @click="editDisplayContent">编辑显示内容</el-button>
                    </div>
                </div>
            </div>
            <div  class="w-1/3 mx-2" v-show="editShow">
                <div  class="border border-1 rounded">
                    <h2 class="text-xl py-2">编辑规则</h2>
                    <el-form>
                      <div class='flex justify-around'>
                        <el-form-item label=""  id="newtitle">
                          <el-input v-model="newTitle" class="w-2/3" autocomplete="off" placeholder='请输入问题名称'></el-input>
                        </el-form-item>
                        <el-button type="primary" plain size="small" @click="addTitle" >新增标题</el-button>
                      </div>
                      <div class="mx-2">
                        <el-form-item label="编辑文案" prop="desc">
                          <el-input type="textarea" rows="20" v-model="addWordJson.json"></el-input>
                        </el-form-item> 
                      </div>
                       
                    </el-form>
                    <div class="my-2">
                      <el-button v-if="this.selectGuiZe.selectGuiZeId !=null " type="primary" size="small" plain @click="updateWordJsonOk">确定修改</el-button> 
                      <el-button v-if="this.selectGuiZe.selectGuiZeId ==null " type="primary" size="small" plain @click="addWordJsonOk">确定添加</el-button> 
                    </div>
                    
                </div>
            </div>
            <div class="w-1/2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2">{{treeTitle}}</h2>
                    <div class="h-40 overflow-scroll">
                        <el-tree
                          :data="treeList"
                          default-expand-all
                          node-key="id"
                          ref="tree"
                          empty-text="加载中，请稍后！"
                          highlight-current
                          @node-contextmenu="addTreeText()"
                          @node-click="handleTreeJieDian()"
                          :props="defaultProps">
                        </el-tree>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新增组合弹出框 -->
        <el-dialog title="新增组合" :visible.sync="dialogNewWord">
          <el-form :model="wordAdd">
             <el-form-item label="组合名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="绑定关联" :label-width="formLabelWidth" class="mb-1">
              <el-select v-model="wordAdd.qpid" @change="selectOnlyQuestion" multiple filterable :filter-method="dataFilter" placeholder="请选择">
                  <el-option
                    v-for="item in dataFilterValueArr"
                    :key="item.id"
                    :label="item.qpTitle"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="word排序" :label-width="formLabelWidth" class="mb-1">
              <el-select v-model="wordAdd.orderWords" @change="getWordSelectWord" multiple filterable :filter-method="wordFilter" placeholder="请选择">
                  <el-option
                    v-for="item in wordSelectWordArr"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <div><span class="h-1"></span></div>
            <el-form-item label="问题" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.qpid" @change="selectOnlyQuestion" filterable :filter-method="dataFilter" placeholder="请选择">
                    <el-option
                      v-for="item in dataFilterValueArr"
                      :key="item.id"
                      :label="item.qpTitle"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条件" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.type" placeholder="请选择">
                    <el-option
                      v-for="item in TiaoJianList"
                      :key="item.value"
                      :label="item.title"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="绑定的值" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.value" placeholder="选择绑定的值">
                  <el-option v-for="(item, index) in selectOnlyLisg" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="替换" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAddWhere.replate" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddWord">取 消</el-button>
            <el-button type="primary" @click="addWordOk">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改组合弹出框 -->
        <el-dialog title="修改组合" :visible.sync="dialogUpdateWord">
          <el-form :model="wordAdd">
             <el-form-item label="组合名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="绑定关联" :label-width="formLabelWidth" class="mb-1">
              <el-select v-model="wordAdd.qpid" @change="selectOnlyQuestion" multiple filterable :filter-method="dataFilter" placeholder="请选择">
                  <el-option
                    v-for="item in dataFilterValueArr"
                    :key="item.id"
                    :label="item.qpTitle"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="word排序" :label-width="formLabelWidth" class="mb-1">
              <el-select v-model="wordAdd.orderWords" @change="getWordSelectWord" multiple filterable :filter-method="wordFilter" placeholder="请选择">
                  <el-option
                    v-for="item in wordSelectWordArr"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <div><span class="h-1"></span></div>
            <el-form-item label="问题" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.qpid" @change="selectOnlyQuestion" filterable :filter-method="dataFilter" placeholder="请选择">
                    <el-option
                      v-for="item in dataFilterValueArr"
                      :key="item.id"
                      :label="item.qpTitle"
                      :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="条件" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.type" placeholder="请选择">
                    <el-option
                      v-for="(item, index) in TiaoJianList"
                      :key="index"
                      :label="item.title"
                      :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="绑定的值" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.value" placeholder="选择绑定的值">
                  <el-option v-for="(item, index) in selectOnlyLisg" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="替换" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAddWhere.replate" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <div class="my-2">
                <el-button @click="addWhere">确定</el-button>
                <!-- <el-button @click="deleteWhere(whereIndex)">删除关系</el-button> -->
            </div>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddWord">取 消</el-button>
            <el-button type="primary" @click="updateWordOk">确 定</el-button>
          </div>
          <div class="text-center">
                <table class="w-full">
                    <thead>
                        <tr>
                            <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of wordSelectWhereThead" :key="item.index">{{item}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                            v-for="(item, index) in this.wordAdd.where"
                            :key="index"
                        >
                            <td class="border text-black">{{ item.title }}</td>
                            <td class="border text-black">{{ item.type }}</td>
                            <td class="border text-black">{{ item.value }}</td>
                            <td class="border text-black">{{ item.replate }}</td>
                            <td class="border text-black justify-around">
                                <div class="flex justify-around py-2 w-2/3 mx-auto">
                                    <el-button type="danger" icon="el-icon-delete" circle  @click="deleteWordBtn(index)"></el-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
        <!-- 删除组合弹出框 -->
        <el-dialog title="删除当前选中组合" :visible.sync="dialogDeleteWord">
          <p>删除选中的组合规则后会一并删除其中包含的word编辑文档</p>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDeleteWord = false">取 消</el-button>
            <el-button type="primary" @click="dialogDeleteWordOk">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 点击编辑内容显示 -->
         <el-dialog title="" :visible.sync="dialogDisplayContent">
          <el-form :model="wordAdd">
            <h2 class="text-xl py-1">{{this.wordTreeMsg.title}}</h2>
            <div class="w-full text-right">
                <el-button type="primary" @click="addNewGuiZe">新增显示规则</el-button>
            </div>
             <div>
                 <ul>
                     <li v-for="(item, index) in this.selectGuiZe.selectGuiZeArr" :key="index">
                         <div class="flex justify-between bg-blue-100 rounded-sm my-2">
                            <div class="w-4/5 text-left my-2 mx-2 h-105">
                                <p>{{ item.json }}</p>
                            </div>
                             <div  class="w-1/5 text-center">
                                 <el-button type="primary" plain size="mini" id="edit_bt" @click="editSelectGuiZe(item)">编辑</el-button>
                                 <el-button type="warning" plain size="mini" id="delete_bt" @click="deleteSelectGuZe(item)">删除</el-button>
                                 <el-button  type="info" plain size="mini" id="display_bt" @click="ifDisplayGuZe(item)"><span v-if="item.type ==1">隐藏</span><span v-if="item.type ==2">显示</span></el-button>
                             </div>
                         </div>
                     </li>
                 </ul>
             </div>
          </el-form>
        </el-dialog>
    </div>   
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addWord} from '@/api/api/requestLogin.js'   // 新增组合规则
    import {updateWord} from '@/api/api/requestLogin.js'   // 修改组合规则
    import {deleteWord} from '@/api/api/requestLogin.js'   // 删除组合规则
    import {addWordJson} from '@/api/api/requestLogin.js'   // 新增word的json部分
    import {updateWordJson} from '@/api/api/requestLogin.js'   // 修改word的json部分
    import {deleteWordJson} from '@/api/api/requestLogin.js'   // 删除word的json部分
    import {wordSelect} from '@/api/api/requestLogin.js'   // 修改组合规则
    import {selectTree} from '@/api/api/requestLogin.js'    // 查询关系
    import {wordSelectTree} from '@/api/api/requestLogin.js'    // 查询组合规则tree结构
    import {wordSelectWord} from '@/api/api/requestLogin.js'    // 查询组合规则
    import {selectQuestionList} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    import {selectVague} from '@/api/api/requestLogin.js'  // 模糊查询关联
    // import {selectOnlyQuestion} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                wordTreeList: [], //组合规则结构树
                wordDefaultProps: {  // 组合规则节点树数据树相关
                  children: 'child',
                  label: 'title'
                },
                wordTreeMsg: {  // 选中的组合规则树节点相关内容
                    fatherId: null,  // 点击获取当前选中的组合规则树节点父id
                    fqaspId: null,   // 点击获取当前选中的组合规则树节点id
                    nodeType: null,  // 点击获取当前选中的组合规则树节点type类型
                    nodeChild: [],   // 点击获取当前选中的组合规则树节点child
                    title: ''        // 点击获取当前选中的组合规则树节点title名称
                },
               treeList: [],    // 离婚协议书节点树数据 
               treeTitle: '',    // 离婚协议书节点树title
               defaultProps: {  // 离婚协议书节点树数据树相关
                  children: 'child',
                  label: 'title'
                },
                treeMsg: {  // 选中的离婚协议书树节点相关内容
                    fqaspId: null,   // 点击获取当前选中的离婚协议书树节点id
                    nodeType: null,  // 点击获取当前选中的离婚协议书树节点type类型
                    nodeChild: [],   // 点击获取当前选中的离婚协议书树节点child
                    title: ''        // 点击获取当前选中的离婚协议书树节点title名称
                },
                dialogNewWord: false, // 新增组合弹出框
                dialogUpdateWord: false, // 修改组合弹出框
                dialogDeleteWord: false, // 删除组合规则弹框
                dialogDisplayContent: false,  // 编辑显示内容弹出框
                editShow: false, // 中间编辑区域默认隐藏
                wordAdd:{       // 新增组合绑定数据
                    title: '',  // 组合名称
                    fWordId: null, // 组合的父id
                    where: [],     // 条件
                    qpid: [],
                    orderWords: []   // word排序ID
                },
                wordAddWhere:{  // 单独绑定的组合规则
                    // title: '',
                    // label: '',
                    qpid: null,
                    type: null,
                    value: '',
                    replate: ''
                },
                wordSelectWhere: [],  //查询单独组合信息
                wordSelectWhereThead:{  //查询单独组合头部
                    qpid: '问题',
                    type: '条件',
                    value: '值',
                    replate: '替换',
                    control: '操作'
                },

                newTitle:'', //点击新增组合规则的文字标题
                addWordJson: {
                  json: ''  // json格式的内容实例
                },

                formLabelWidth: '80px',   // 表单标签宽度
                dataFilterValueArr: [], // 搜索查找的结果数据
                wordSelectWordArr: [],  // 查询组合规则结果汇总数据
                TiaoJianList:[   // 条件列表
                    {
                       title: '等于',
                       value: 1             
                    },
                    {
                       title: '小于',
                       value: 2            
                    },
                    {
                       title: '大于',
                       value: 3             
                    },
                    {
                       title: '大于等于',
                       value: 4             
                    },
                    {
                       title: '小于等于',
                       value: 5             
                    },
                    {
                       title: '不等于',
                       value: 6             
                    },
                    {
                       title: '包含',
                       value: 7             
                    },
                    {
                       title: '不等于空',
                       value: 8            
                    }
                ],
                selectOnlyLisg: [],    // 查询单独问题
                selectGuiZe: {
                  selectGuiZeArr: '',     // 点击某个规则展示某个规则包含的规则列表
                  selectGuiZeId: null,     // 点击某个规则展示某个规则包含的规则ID
                  selectGuiZeFatherId: null,     // 点击某个规则展示某个规则包含的规则ID
                  type: null
                },
            }
        },
        mounted () {
          this.selectTree() // 获取关系列表
          this.getWordSelectTree() // 查询组合规则数结构
          // this.selectOnlyQuestion() // 查询单独问题
        },
        methods:{
            // 右侧模块开始
            selectTree () {   // 查询树结构
                selectTree().then((data)=>{
                    this.treeList = data.data.data.data
                    this.treeTitle= data.data.data.title
                }).catch((data)=>{
                    this.$router.replace("/");
                })
            },
            // 操作树结构
            handleTreeJieDian () {
                this.treeMsg.fqaspId = this.$refs.tree.currentNode.node.data.id
                this.treeMsg.nodeType = this.$refs.tree.currentNode.node.data.type
                this.treeMsg.nodeChild = this.$refs.tree.currentNode.node.data.child
                this.treeMsg.title = this.$refs.tree.currentNode.node.data.title
            },
            addTreeText(){ // 右键点击离婚协议书dom树 1为问题
                const a = this.treeMsg.fqaspId
                const b = this.treeMsg.title
                this.addWordJson.json +="{{2," + a + "," + b +"}}"
                // console.log(this.addWordJson.json)
            },
            // 右侧模块结束

            // 左侧模块开始
            getWordSelectTree () {  // 查询组合规则tree结构
                // localStorage.setItem('wid',localStorage.getItem('w')) 
                wordSelectTree().then((data)=>{
                    this.wordTreeList = data.data.data
                }).catch((data)=>{
                    this.$message({
                      message: '获取组合规则失败',
                      type: 'error'
                    });
                })
            },
            handleWordTreeJieDian () {  // 操作组合规则树结构
                this.wordTreeMsg.fatherId = this.$refs.wordtree.currentNode.node.data.fWordId
                this.wordTreeMsg.fqaspId = this.$refs.wordtree.currentNode.node.data.id
                this.wordTreeMsg.nodeType = this.$refs.wordtree.currentNode.node.data.type
                this.wordTreeMsg.nodeChild = this.$refs.wordtree.currentNode.node.data.child
                this.wordTreeMsg.title = this.$refs.wordtree.currentNode.node.data.title
                // console.log(this.wordTreeMsg.fatherId)
                // console.log(this.wordTreeMsg.fqaspId)
            },
            addGuiZeText(){ // 右键点击组合规则 2为组合规则
                const a = this.wordTreeMsg.fqaspId
                const b = this.wordTreeMsg.title
                this.addWordJson.json +="{{3," + a + "," + b +"}}"
                // console.log(this.addWordJson.json)
            },
            addTitle () {  // 点击新增标题往文案添加标题
                this.addWordJson.json +="{{1," + this.newTitle +"}}"
                this.newTitle = '';
            },
            addNewWord () { // 点击新增组合弹出新增组合对话框
                this.dialogNewWord = true;
            },
            addRootWord () {  // 点击标题新增根组合
                this.dialogNewWord = true;
                this.wordTreeMsg.fqaspId == null
            },
            addWhere () {
                for(let i = 0;i<this.wordAdd.where.length;i++){
                  this.$delete(this.wordAdd.where[i], 'label')
                  this.$delete(this.wordAdd.where[i], 'title')
                }
                console.log(this.wordAddWhere)
                if(JSON.stringify(this.wordAdd.where) == '{}'){
                    this.wordAdd.where.splice(1,1)
                    this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                    this.wordAddWhere ={}
                }else{
                    this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                    this.wordAddWhere ={}
                }
            },
            cancelAddWord () {
              this.dialogNewWord = false; // 取消新增弹框
              this.dialogUpdateWord = false; // 取消修改弹框
              this.wordAdd.title = '';
              this.wordAddWhere.type = null;
              this.wordAddWhere.value = '';
              this.wordAddWhere.replate = '';
              this.wordAddWhere.id = null
              this.wordAdd.orderWords = null
            },
            addWordOk () {   // 点击新增组合确定按钮提交表单
                
                for(let i = 0;i<this.wordAdd.where.length;i++){
                  this.$delete(this.wordAdd.where[i], 'label')
                  this.$delete(this.wordAdd.where[i], 'title')
                  this.$delete(this.wordAdd.where[i], 'id')
                }
                this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                this.wordAdd.where = JSON.stringify(this.wordAdd.where)
                this.wordAdd.qpid = JSON.stringify(this.wordAdd.qpid)
                this.wordAdd.orderWords = JSON.stringify(this.wordAdd.orderWords)
                if(this.wordTreeMsg.fqaspId == null){
                    addWord({
                        title:this.wordAdd.title,
                        fWordId :localStorage.getItem('wid'),
                        where: this.wordAdd.where,
                        qpid: this.wordAdd.qpid,
                        orderWords: this.wordAdd.orderWords
                    }).then((data)=>{
                        this.wordAdd.title = ''
                        this.wordAdd.where = []
                        this.wordAdd.qpid = []
                        this.wordAdd.orderWords = []
                        this.wordAddWhere.qpid = null
                        this.wordAddWhere.type = null
                        this.wordAddWhere.value = ''
                        this.wordAddWhere.replate = ''
                        this.getWordSelectTree(); // 重新获取数结构
                        // localStorage.removeItem('pid');
                        this.dialogNewWord = false;
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                    })
                }else{
                    addWord({
                        title:this.wordAdd.title,
                        fWordId :this.wordTreeMsg.fqaspId,
                        where: this.wordAdd.where,
                        qpid: this.wordAdd.qpid,
                        orderWords: this.wordAdd.orderWords
                    }).then((data)=>{
                        this.getWordSelectTree(); // 重新获取数结构
                        this.wordAdd.title = ''
                        this.wordAdd.where = []
                        this.wordAdd.qpid = []
                        this.wordAdd.orderWords = []
                        this.wordAddWhere.qpid = null
                        this.wordAddWhere.type = null
                        this.wordAddWhere.value = ''
                        this.wordAddWhere.replate = ''
                        this.wordTreeMsg.fqaspId = null
                        // localStorage.removeItem('pid');
                        this.dialogNewWord = false;
                        this.$message({
                          message: '添加成功',
                          type: 'success'
                        });
                    })
                }  
            },
            dataFilter (val) { // 筛选问题
                selectVague("title="+val).then((data)=>{
                    this.dataFilterValueArr = data.data
                }).catch((data)=>{

                })
            },
            selectOnlyQuestion () {  // 查询问题新绑定的值
                for(let i = 0;i < this.dataFilterValueArr.length; i++ ){
                  if(this.dataFilterValueArr[i].id == this.wordAddWhere.qpid){
                    this.selectOnlyLisg = this.dataFilterValueArr[i].child
                  }
                }
                // localStorage.setItem('pid',this.wordAddWhereItem.problemId)
                // selectOnlyQuestion().then((data)=>{
                //     this.selectOnlyLisg = data.data.child
                //     // this.problemqAdd.type = data.data[0].type
                //     // this.problemqAdd.title = data.data[0].title
                //     // console.log(this.problemqAdd.type)
                // }).catch((data)=>{

                // })
            },
            wordFilter(val){
                wordSelectWord("title="+val).then((data)=>{
                    this.wordSelectWordArr = data.data.data
                }).catch((data)=>{

                })
            },
            getWordSelectWord () {  // 查询组合规则
                console.log(this.wordAdd.orderWords)
            },
            deleteWordAlert () { // 点击删除组合规则，弹出对话框
              this.dialogDeleteWord = true;
              localStorage.setItem('fWordId',this.wordTreeMsg.fqaspId) // 保存选中组合规则的id到本地缓存

            },
            dialogDeleteWordOk () { // 点击删除组合规则确定键，删除所选的组合规则
              deleteWord().then((data)=>{
                this.getWordSelectTree()
                localStorage.removeItem('fWordId'); 
                this.dialogDeleteWord = false;
                this.$message({
                  message: '该规则已经被删除',
                  type: 'error'
                });
              }).catch((data)=>{

              })
            },
            updateWordAlert (){ // 点击修改组合弹出修改组合对话框
                this.dialogUpdateWord = true;
                // this.wordAddWhere = {} // 清空组合绑定的问题
                this.wordAdd.title = this.wordTreeMsg.title
                localStorage.setItem('fWordId',this.wordTreeMsg.fqaspId) // 保存选中组合规则的id到本地缓存
                wordSelect().then((data)=>{
                    if(data.data.data.where==''){
                      data.data.data.where = []
                    }
                    this.wordAdd.where = data.data.data.where
                    this.wordAdd.qpid = JSON.parse(data.data.data.qpid)
                    this.wordAdd.orderWords = JSON.parse(data.data.data.orderWords)

                }).catch((data)=>{

                })
            },
            updateWordOk () {   // 点击修改组合确定按钮提交表单
                // this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                
                for(let i = 0;i<this.wordAdd.where.length;i++){
                  this.$delete(this.wordAdd.where[i], 'label')
                  this.$delete(this.wordAdd.where[i], 'title')
                  this.$delete(this.wordAdd.where[i], 'id')
                }
                this.wordAdd.where = JSON.stringify(this.wordAdd.where)
                this.wordAdd.qpid = JSON.stringify(this.wordAdd.qpid)
                this.wordAdd.orderWords = JSON.stringify(this.wordAdd.orderWords)
                updateWord({
                    title:this.wordAdd.title,
                    fWordId :this.wordTreeMsg.fatherId,
                    where: this.wordAdd.where,
                    qpid: this.wordAdd.qpid,
                    orderWords: this.wordAdd.orderWords
                }).then((data)=>{
                    this.getWordSelectTree(); // 重新获取数结构
                    this.wordAdd.title = ''
                    this.wordAdd.where = []
                    this.wordAdd.qpid = []
                    this.wordAdd.orderWords = []
                    this.wordAddWhere.qpid = null
                    this.wordAddWhere.type = null
                    this.wordAddWhere.value = ''
                    this.wordAddWhere.replate = ''
                    this.wordTreeMsg.fqaspId = null
                    // localStorage.removeItem('pid');
                    // localStorage.removeItem('fWordId');
                    this.dialogUpdateWord = false;
                })
            },
            deleteWordBtn (index) { // 点击组合规则删除按钮，删除组合规则
                this.wordAdd.where.splice(index,1)
            },
            editDisplayContent () { // 点击编辑显示内容弹出框
                this.dialogDisplayContent = true;
                if(this.wordTreeMsg.fqaspId !==null){
                  localStorage.setItem('fWordId',this.wordTreeMsg.fqaspId) // 保存选中组合规则的id到本地缓存
                }else{
                  // localStorage.setItem('fWordId',this.wordTreeMsg.fqaspId)
                  localStorage.setItem('fWordId',localStorage.getItem('wid')) // 保存选中组合规则的id到本地缓存
                }
                wordSelect().then((data)=>{
                    this.selectGuiZe.selectGuiZeArr = data.data.data.json
                }).catch((data)=>{

                })
            },
            addNewGuiZe () {   // 点击新增显示规则按钮
              this.editShow = true;
              this.dialogDisplayContent = false;
            },
            editSelectGuiZe (item) {  // 点击选择的组合规则编辑按钮跳转到编辑页面
                this.addWordJson.json = item.json
                this.selectGuiZe.selectGuiZeId = item.id
                this.selectGuiZe.type = item.type
                // this.selectGuiZe.selectGuiZeFatherId = item.wid
                localStorage.setItem('wordJsonId',this.selectGuiZe.selectGuiZeId)
                this.editShow = true;
                this.dialogDisplayContent = false;
            },
            
            deleteSelectGuZe (item) { // 点击选择的组合规则删除按钮直接删除此条组合规则
              this.selectGuiZe.selectGuiZeId = item.id
              localStorage.setItem('wordJsonId',this.selectGuiZe.selectGuiZeId)
              deleteWordJson().then((data)=>{
                localStorage.removeItem('wordJsonId');
                this.$message({
                  message: '该规则已经被删除',
                  type: 'error'
                });
                this.dialogDisplayContent = false;
              }).catch((data)=>{

              })
            },
            ifDisplayGuZe (item) { // 点击选择的组合规则显示按钮选择是否隐藏
                this.addWordJson.json = item.json
                this.selectGuiZe.selectGuiZeId = item.id
                this.selectGuiZe.type = item.type
                // this.selectGuiZe.selectGuiZeFatherId = item.wid
                localStorage.setItem('wordJsonId',this.selectGuiZe.selectGuiZeId)
              if(this.selectGuiZe.type ==1 ){
                this.selectGuiZe.type =2
                updateWordJson({
                  type: this.selectGuiZe.type,
                  json: this.addWordJson.json
                }).then((data)=>{
                  this.dialogDisplayContent = false;
                  this.$message({
                      message: '该规则已经被隐藏',
                      type: 'warning'
                    });
                }).catch((data)=>{
                })
              }else if(this.selectGuiZe.type ==2 ){
                this.selectGuiZe.type =1
                updateWordJson({
                  type: this.selectGuiZe.type,
                  json: this.addWordJson.json
                }).then((data)=>{
                  this.dialogDisplayContent = false;
                  this.$message({
                      message: '该规则已经被显示',
                      type: 'success'
                    });
                }).catch((data)=>{
                })
              }
            },
            updateWordJsonOk () {  // 修改Wordjson
                updateWordJson({
                  type: this.selectGuiZe.type,
                  json: this.addWordJson.json
                }).then((data)=>{
                  this.selectGuiZe.selectGuiZeId = null
                  this.selectGuiZe.type = null
                  this.addWordJson.json = ''
                  this.editShow=false
                  localStorage.removeItem('wordJsonId');
                  this.$message({
                      message: '恭喜你，修改成功',
                      type: 'success'
                    });
                }).catch((data)=>{

                })
            },
            addWordJsonOk () {   // 新增Wordjson
                addWordJson({
                  type: 1,
                  json: this.addWordJson.json
                }).then((data)=>{
                  this.addWordJson.json = ''
                  localStorage.removeItem('fWordId');

                  this.editShow=false
                  this.$message({
                      message: '恭喜你，新增成功',
                      type: 'success'
                    });
                }).catch((data)=>{

                })
            }
            // 左侧模块结束
        }
    }
</script>

<style scoped>
.h-40{height: 480px;}
#newtitle{margin-bottom: 0 ;width: 70%}
#newtitle .el-form-item__content{margin-left: 0 !important;}
.h-1{height: 1px;width: 100%;background: #343434;display: inline-block;}
.el-form-item{margin-bottom:0.25rem;}
.wenti{height: 40px;}
#edit_bt{margin:10px;}
#delete_bt{margin-bottom:10px;margin-left: 0}
#display_bt{margin-left: 0;margin-bottom: 10px}
</style>
