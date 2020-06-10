<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto flex">
            <div class="w-1/2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2">离婚协议书组合规则</h2>
                    <div class="h-40 overflow-scroll">
                        <el-tree
                          :data="wordTreeList"
                          default-expand-all
                          node-key="id"
                          ref="wordtree"
                          empty-text="加载中，请稍后！"
                          highlight-current
                          @node-click="handleWordTreeJieDian()"
                          :props="wordDefaultProps">
                        </el-tree>
                    </div>
                    <div class="w-2/3 text-left flex justify-around">
                        <el-button type="primary" plain class="" @click="addNewWord">新增组合</el-button> 
                        <el-button type="primary" plain class="" @click="updateWordAlert">修改组合</el-button>
                        <el-button type="primary" plain class="" @click="editDisplayContent">编辑显示内容</el-button>
                    </div>
                </div>
            </div>
            <div>
                
            </div>
            <div class="w-1/2">
                <div class="border border-1 rounded">
                    <h2 class="text-xl py-2">离婚协议书</h2>
                    <div class="h-40 overflow-scroll">
                        <el-tree
                          :data="treeList"
                          default-expand-all
                          node-key="id"
                          ref="tree"
                          empty-text="加载中，请稍后！"
                          highlight-current
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
            <div><span class="h-1"></span></div>
            <el-form-item label="问题" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.qpid" @change="selectOnlyQuestion" filterable :filter-method="dataFilter" placeholder="请选择">
                    <el-option
                      v-for="item in dataFilterValueArr"
                      :key="item.id"
                      :label="item.title"
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
            <el-button @click="dialogNewWord = false">取 消</el-button>
            <el-button type="primary" @click="addWordOk">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改组合弹出框 -->
        <el-dialog title="修改组合" :visible.sync="dialogUpdateWord">
          <el-form :model="wordAdd">
             <el-form-item label="组合名称" :label-width="formLabelWidth" class="mb-1">
              <el-input v-model="wordAdd.title" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <div><span class="h-1"></span></div>
            <el-form-item label="问题" :label-width="formLabelWidth">
                <el-select v-model="wordAddWhere.qpid" @change="selectOnlyQuestion" filterable :filter-method="dataFilter" placeholder="请选择">
                    <el-option
                      v-for="item in dataFilterValueArr"
                      :key="item.id"
                      :label="item.title"
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
            <div class="my-2">
                <el-button @click="addWhere">确定</el-button>
                <!-- <el-button @click="deleteWhere(whereIndex)">删除关系</el-button> -->
            </div>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateWord = false">取 消</el-button>
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
                            <td class="border text-black">{{ item.qpid }}</td>
                            <td class="border text-black">{{ item.title }}</td>
                            <td class="border text-black">{{ item.value }}</td>
                            <td class="border text-black">{{ item.replate }}</td>
                            <td class="border text-black justify-around">
                                <div class="flex justify-around py-2 w-2/3 mx-auto">
                                    <el-button type="danger" icon="el-icon-delete" circle  @click="deleteWord(index)"></el-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
        <el-dialog title="" :visible.sync="dialogDisplayContent">
          <el-form :model="wordAdd">
            <h2 class="text-xl py-1">{{this.wordTreeMsg.title}}</h2>
            <div class="w-full text-right">
                <el-button type="primary">新增显示规则</el-button>
            </div>
             <div>
                 <ul>
                     <li v-for="(item, index) in this.selectGuiZeArr" :key="index">
                         <div class="flex justify-between bg-blue-100 rounded-sm my-2">
                            <div class="w-4/5 text-left my-2 mx-2 h-105">
                                <div v-for="($item, $index) in JSON.parse(item.json)" :key="$index">
                                    <p>{{ $item }}</p>
                                </div>  
                            </div>
                             <div  class="w-1/5 text-center">
                                 <el-button type="primary" plain size="mini" id="edit_bt" @click="editSelectGuiZe(item)">编辑</el-button>
                                 <el-button type="warning" plain size="mini" id="delete_bt">删除</el-button>
                                 <el-button  type="info" plain size="mini" id="display_bt">显示</el-button>
                             </div>
                         </div>
                     </li>
                 </ul>
             </div>
        </el-form>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDisplayContent = false">取 消</el-button>
            <el-button type="primary" @click="updateWordOk">确 定</el-button>
          </div> -->
        </el-dialog>
    </div>   
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addWord} from '@/api/api/requestLogin.js'   // 新增组合规则
    import {updateWord} from '@/api/api/requestLogin.js'   // 修改组合规则
    import {wordSelect} from '@/api/api/requestLogin.js'   // 查询单独组合
    import {selectTree} from '@/api/api/requestLogin.js'    // 查询关系
    import {wordSelectTree} from '@/api/api/requestLogin.js'    // 查询组合规则tree结构
    
    import {selectQuestionList} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    import {selectOnlyQuestion} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表

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
                dialogDisplayContent: false,  // 编辑显示内容弹出框
                wordAdd:{       // 新增组合绑定数据
                    title: '',  // 组合名称
                    fWordId: null, // 组合的父id
                    where: []     // 条件
                },
                wordAddWhere:{  // 单独绑定的组合规则
                    qpid: null,
                    type: null,
                    value: null,
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
                formLabelWidth: '80px',   // 表单标签宽度
                dataFilterValueArr: [], // 搜索查找的结果数据
                TiaoJianList:[   // 条件列表
                    {
                       title: '大于',
                       value: '3'             
                    },
                    {
                       title: '等于',
                       value: '1'             
                    },
                    {
                       title: '小于',
                       value: '2'             
                    },
                    {
                       title: '小于等于',
                       value: '4'             
                    },
                    {
                       title: '大于等于',
                       value: '5'             
                    },
                    {
                       title: '不等于',
                       value: '6'             
                    }
                ],
                selectOnlyLisg: [],    // 查询单独问题
                selectGuiZeArr: []     // 点击某个规则展示某个规则包含的规则列表
            }
        },
        mounted () {
          this.selectTree() // 获取关系列表
          this.wordSelectTree() // 查询组合规则数结构
          // this.selectOnlyQuestion() // 查询单独问题
        },
        methods:{
            // 右侧模块开始
            selectTree () {   // 查询树结构
                selectTree().then((data)=>{
                    this.treeList = data.data.data
                }).catch((data)=>{
                    console.log("请求失败")
                })
            },
            // 操作树结构
            handleTreeJieDian () {
                this.treeMsg.fqaspId = this.$refs.tree.currentNode.node.data.id
                this.treeMsg.nodeType = this.$refs.tree.currentNode.node.data.type
                this.treeMsg.nodeChild = this.$refs.tree.currentNode.node.data.child
                this.treeMsg.title = this.$refs.tree.currentNode.node.data.title
                // console.log(this.treeMsg)
            },
            // 右侧模块结束

            // 左侧模块开始
            wordSelectTree () {  // 查询组合规则tree结构
                wordSelectTree(5).then((data)=>{
                    this.wordTreeList = data.data.data
                    // console.log(this.wordTreeMsg.fqaspId)
                }).catch((data)=>{
                    console.log('组合规则获取失败')
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
            addNewWord () { // 点击新增组合弹出新增组合对话框
                this.dialogNewWord = true;
            },
            addWhere () {
                if(JSON.stringify(this.wordAdd.where) == '{}'){
                    this.wordAdd.where.splice(1,1)
                    this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                    this.wordAddWhere = {} // 清空组合绑定的问题
                }else{
                    this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                    this.wordAddWhere = {} // 清空组合绑定的问题
                }
            },
            addWordOk () {   // 点击新增组合确定按钮提交表单
                this.wordAdd.where = JSON.stringify(this.wordAdd.where)
                if(this.wordTreeMsg.fqaspId == null){
                    addWord({
                        title:this.wordAdd.title,
                        fWordId :0,
                        where: this.wordAdd.where
                    }).then((data)=>{
                        this.wordAdd.title = ''
                        this.wordAdd.where = []
                        this.wordSelectTree(); // 重新获取数结构
                        localStorage.removeItem('pid');
                        this.dialogNewWord = false;
                        console.log("成功")
                    })
                }else{
                    addWord({
                        title:this.wordAdd.title,
                        fWordId :this.wordTreeMsg.fqaspId,
                        where: this.wordAdd.where
                    }).then((data)=>{
                        this.wordSelectTree(); // 重新获取数结构
                        this.wordAdd.title = ''
                        this.wordAdd.where = []
                        this.wordTreeMsg.fqaspId = null
                        localStorage.removeItem('pid');
                        this.dialogNewWord = false;
                        console.log("成功")
                    })
                }  
            },
            dataFilter (val) { // 筛选问题
                selectQuestionList("title="+val).then((data)=>{
                    this.dataFilterValueArr = data.data.data.data
                }).catch((data)=>{

                })
            },
            selectOnlyQuestion () {  // 查询问题新绑定的值
                localStorage.setItem('pid',this.wordAddWhere.qpid)
                selectOnlyQuestion().then((data)=>{
                    this.selectOnlyLisg = data.data.child
                    // this.problemqAdd.type = data.data[0].type
                    // this.problemqAdd.title = data.data[0].title
                    // console.log(this.problemqAdd.type)
                }).catch((data)=>{

                })
            },
            updateWordAlert (){ // 点击修改组合弹出修改组合对话框
                this.dialogUpdateWord = true;
                this.wordAdd.title = this.wordTreeMsg.title
                localStorage.setItem('fWordId',this.wordTreeMsg.fqaspId) // 保存选中组合规则的id到本地缓存
                wordSelect().then((data)=>{
                    this.wordAdd.where = JSON.parse(data.data.data.where)
                }).catch((data)=>{

                })
            },
            updateWordOk () {   // 点击修改组合确定按钮提交表单
                this.wordAdd.where.push(this.wordAddWhere) // 提交组合绑定的问题
                this.wordAddWhere = {} // 清空组合绑定的问题
                this.wordAdd.where = JSON.stringify(this.wordAdd.where)

                updateWord({
                    title:this.wordAdd.title,
                    fWordId :this.wordTreeMsg.fatherId,
                    where: this.wordAdd.where
                }).then((data)=>{
                    this.wordSelectTree(); // 重新获取数结构
                    this.wordAdd.title = ''
                    this.wordAdd.where = []
                    this.wordTreeMsg.fqaspId = null
                    localStorage.removeItem('pid');
                    localStorage.removeItem('fWordId');
                    this.dialogUpdateWord = false;
                    console.log("成功")
                })
            },
            deleteWord (index) { // 点击组合规则删除按钮，删除组合规则
                this.wordAdd.where.splice(index,1)
            },
            editDisplayContent () { // 点击编辑显示内容弹出框
                this.dialogDisplayContent = true;
                localStorage.setItem('fWordId',this.wordTreeMsg.fqaspId) // 保存选中组合规则的id到本地缓存
                wordSelect().then((data)=>{
                    this.selectGuiZeArr = data.data.data.json
                    console.log(this.selectGuiZeArr)
                }).catch((data)=>{

                })
            },
            editSelectGuiZe (item) {  // 点击选择的组合规则跳转到编辑页面
                console.log("本身的id是"+item.id)
                console.log("本身的wid是"+item.wid)
                console.log("是否显示"+item.type)
            }
            // 左侧模块结束
        }
    }
</script>

<style scoped>
.h-105{height: 105px;}
.h-40{height: 1000px;}
.h-1{height: 1px;width: 100%;background: #343434;display: inline-block;}
.el-form-item{margin-bottom:0.25rem;}
.wenti{height: 40px;}
#edit_bt{margin:10px;}
#delete_bt{margin-bottom:10px;margin-left: 0}
#display_bt{margin-left: 0}
</style>
