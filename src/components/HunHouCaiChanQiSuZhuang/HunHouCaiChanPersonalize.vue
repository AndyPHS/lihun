<template>
    <div>
        <head-menu></head-menu>
        <div class="w-full px-10 mx-auto">
            <h2 class="py-2 text-lg text-center w-2/5">
              {{this.Content.title}} 
            </h2>
            <p class="pb-1 text-base text-center w-2/5">离婚后财产纠纷起诉状</p>
            <div class="flex">
                <div class="w-2/5 mx-1 relative">
                    <div class="my-2 h-40">
                        <ul>
                            <!-- <li class="pb-2 text-left"  v-for="(item, index) in this.Content.UqContent" :key="index">
                                <div  v-show="item.status == 1" ref="outside" class="px-2 py-1 border rounded">
                                    <textarea :rows='3' id="textarea_left" class="textarea w-full" placeholder="" v-model="item.content"  @blur="submitMsg"></textarea>
                                </div>
                            </li> -->
                            <draggable
                                v-model="Content.UqContent"
                                @change="dragChange"
                                @start="dragStart"
                                @end="dragEnd"
                            >
                                <li class="pb-2 text-left"  v-for="(item, index) in Content.UqContent" :key="index">
                                    <div ref="outside" class="px-2 py-1 border rounded">
                                        <textarea :rows='3' id="textarea_left" class="textarea w-full" placeholder="" v-model="item.content"  @blur="submitMsg(item.content)"></textarea>
                                    </div>
                                </li>
                            </draggable>
                        </ul>
                    </div>
                    <div class="text-center">
                        <el-button type="primary" @click="addTextAction">添加文本</el-button>
                        <el-button type="primary" @click="makeOut">生成文书</el-button>
                    </div>
                    <div class="addBox" v-show="daligeAddBox">
                       <h2 class="py-4 text-center text-white">添加文本</h2>
                       <el-form ref="chooseLabel" :model="chooseLabel" class="ml-2">
                            <el-form-item label-position="left" label="所属标签">
                                <el-input class="w-2/3" size="small" v-model="chooseLabel.addLabelMsg"></el-input>
                            </el-form-item>
                            <el-form-item label-position="left" label="内容文本">
                                <textarea :rows='2' id="textarea_left" class="textarea w-2/3 mx-auto border rounded" placeholder="" v-model="contentMsg.content"></textarea>
                            </el-form-item>
                        </el-form>
                       <div class="mt-2 w-2/3 mx-auto flex justify-around">
                           <el-button @click='cancleAddBox'>取消</el-button>
                            <el-button type="primary" @click.native="AddBoxOk(item, index)">确定</el-button>
                       </div> 
                    </div>
                </div>
                <div class="w-1/5 mx-4">
                    <h2 class="py-2 text-lg text-center w-full">起诉原因标签</h2>
                    <div class="flex align-items-center justify-around">
                        <el-form ref="labelForm" :model="labelForm">
                            <el-form-item >
                                <el-input v-model="labelForm.title"></el-input>
                            </el-form-item>
                        </el-form>
                        <i class="el-icon-search mt-2 cursor-pointer" @click="searchLableAction"></i>
                    </div>
                    <div class="h-40">
                        <ul>
                            <li 
                            v-for="(item, index) in this.LabelArr" 
                            :key="index" 
                            @click="chooseLabelAction(item)"
                            class="w-3/4 mx-auto bg-blue-200 rounded py-1 my-2 hover:bg-blue-400" 
                            >
                                {{item.title}}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="w-2/5">
                    <div class="flex align-items-center justify-around w-2/3 text-center">
                        <el-form ref="keyWord" :model="keyWord" label-width="100px">
                            <el-form-item label="关键词搜索" >
                                <el-select
                                    v-model="keyWord.value"
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="请输入关键词"
                                    :remote-method="remoteMethod"
                                    @change="searchKeyWordAction"
                                    :loading="loading">
                                    <el-option
                                      v-for="(item, index) in keyWord.options"
                                      :key="index"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="h-40">
                        <ul>
                            <li 
                            v-for="(item, index) in this.chooseLabel.LabelContent" 
                            :key="index"
                            class="w-11/12 mx-auto mb-1 my-2" 
                            >
                                <div class="text-left w-full flex justify-between">
                                   <span class="font-bold inline-block ml-1">【 {{item.qlTitle}} 】</span> 
                                   <span class="mr-1">{{ item.uname }}</span>
                                </div>
                                <div class="text-left px-1 py-1 bg-blue-200 border rounded-sm">{{item.content}}</div>
                                <div class="text-right w-full">
                                    <span class="inline-block mt-2 px-2 text-white cursor-pointer rounded bg-blue-400" @click="chooseLabelContent(item)">使用</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import draggable from 'vuedraggable'   // 引入拖拽事件
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {selectUqContent} from '@/api/api/requestLogin.js'  // 获取文本内容
    import {selectLabel} from '@/api/api/requestLogin.js'  // 获取标签
    import {selectLabelChoose} from '@/api/api/requestLogin.js'  // 通过关键词或搜索条件搜索标签
    import {selectLabelContent} from '@/api/api/requestLogin.js'  // 查询标签内容
    import {AddLabelContent} from '@/api/api/requestLogin.js'  // 新增标签内容
    import {userUpdateQuestionnaire} from '@/api/api/requestLogin.js'  // 修改问卷
    
    
    export default {
        components:{
            HeadMenu,
            draggable,
        },
        data () {
            return {
                Content:{ 
                    UqContent: [], // 获取的文本内容
                    con:'',         // 将文本内容拼接成字符串
                    title: ''    // 获取标题
                },
                contentMsg:{  // 添加新文本
                    status: 1,
                    content: ''
                },
                contentDiv: false,  // 新增文本隐藏
                daligeAddBox: false, // 新增文本弹窗
                LabelArr: [], // 获取标签
                labelForm:{   // 标签表单
                    title: '',
                },
                keyWord:{
                    title: '', // 关键词
                    status: 2,
                    flid: null, // 查询关键词的时候输入 标签的ID 
                    value: null,  // 选择要通过关键词查找的标签的id
                    options: [],  // 查询关键词出现关键词列表
                    list: [],
                    states: []

                },
                loading: false,
                chooseLabel:{
                    LabelContent: [], // 获取标签内容
                    addTextareaMsg: '', // 点击添加文本内容
                    addLabelMsg: '', // 点击选择的标签内容
                },
                
                
                
            }
        },
        mounted () {
            this.getSelectUqContent() // 获取离婚起诉状文本内容
            this.getSelectLabel() // 获取标签
            
        },
        methods:{
            getSelectUqContent(){  //获取文本内容
                selectUqContent().then((data)=>{
                    if(data.data.status_code == 200){
                       this.Content.UqContent = data.data.data.content
                       this.Content.title = data.data.data.title
                    }else{
                        this.$message({
                          message: '获取获取文本失败',
                          type: 'error'
                        });
                    }
                    // this.UqContent = JSON.parse(data.data.data)
                    // console.log(data.data.data)
                }).catch((data)=>{

                })
            },
            addTextAction(){
                this.daligeAddBox = true;
                this.contentMsg.content = '';
                this.chooseLabel.addLabelMsg = '';
            },
            cancleAddBox(){
                this.daligeAddBox = false;
                this.contentMsg.content = '';
            },
            AddBoxOk(){
                if(this.contentMsg.content == this.chooseLabel.addTextareaMsg){
                    this.Content.UqContent.push({
                        status: 1,
                        content: this.contentMsg.content
                    })
                    this.daligeAddBox = false;
                    this.contentMsg.content = '';
                }else{
                   localStorage.setItem('qlid', this.keyWord.flid) 
                   AddLabelContent({
                       content: this.contentMsg.content
                   }).then((data)=>{
                        this.contentMsg.content = '';
                        this.daligeAddBox = false;
                   }).catch((data)=>{

                   })
                }
            },
            makeOut(){
                // alert("暂没有生成页面")
                let arr=[]
                this.Content.UqContent.forEach((item)=>{
                    arr.push(item.content)
                    
                })
                this.Content.con = arr.join('|||||')
                userUpdateQuestionnaire({
                    content: this.Content.con
                }).then((data)=>{
                    if(data.data.status_code ==200){
                        this.daligeAddBox = false;
                        this.contentMsg.content = '';
                        this.chooseLabel.addLabelMsg = '';
                        this.getSelectUqContent()
                        this.$router.replace("/ShengChengXieYi");
                    }else{
                        this.$message({
                          message: '添加失败，请重新操作',
                          type: 'error'
                        });
                    }
                    
                }).catch((data)=>{

                })
                
            },
            getSelectLabel(){ // 获取标签
                selectLabel({
                    status:1
                }).then((data)=>{
                    if(data.data.status_code==200){
                        this.LabelArr = data.data.data
                    }else{
                        this.$message({
                          message: '获取标签失败',
                          type: 'error'
                        });
                    }
                }).catch((data)=>{
                    this.$message({
                      message: '标签获取失败，请联系后台管理人员',
                      type: 'error'
                    });
                })
            },
            chooseLabelAction(item){ // 点击标签获取标签内容
                this.keyWord.value = null
                this.keyWord.flid = item.id
                selectLabelContent({
                    qlid: item.id
                }).then((data)=>{
                    if(data.data.status_code == 200){
                        this.chooseLabel.LabelContent = data.data.data
                    }else{
                        this.$message({
                          message: '获取标签内容失败',
                          type: 'error'
                        });
                    }
                }).catch((data)=>{
                })
            },
            searchLableAction(){  // 点击搜索标签
                if(this.labelForm.title == ''){
                    this.getSelectLabel()
                }else{
                    selectLabelChoose({
                        title: this.labelForm.title,
                        status: 1
                    }).then((data)=>{
                        // console.log(data.data)
                        if(data.data.status_code==200){
                            this.LabelArr = data.data.data
                        }
                    }).catch((data)=>{

                    })
                }
            },
            remoteMethod(query) {
                selectLabelChoose({
                    title: query,
                    status: 2,
                    flId: this.keyWord.flid
                }).then((data)=>{
                    if(data.data.status_code==200){
                        this.loading = true;
                          setTimeout(() => {
                            this.loading = false;
                            this.keyWord.states = data.data.data
                            // console.log(data.data.data)
                            this.keyWord.list = this.keyWord.states.map(item => {
                                return { value: `${item.id}`, label: `${item.title}` };
                            });
                            this.keyWord.options = this.keyWord.list.filter(item => {
                              return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                            });
                            
                          }, 200);
                    }else{
                        this.keyWord.options = [];
                    }
                }).catch((data)=>{

                })
                // if (query !== '') {
                //   this.loading = true;
                //   setTimeout(() => {
                //     this.loading = false;
                //     this.keyWord.options = this.list.filter(item => {
                //       return item.label.toLowerCase()
                //         .indexOf(query.toLowerCase()) > -1;
                //     });
                //   }, 200);
                // } else {
                //   this.keyWord.options = [];
                // }
            },
            searchKeyWordAction(){ // 点击搜索关键词
                selectLabelContent({
                    qlid: this.keyWord.value
                }).then((data)=>{
                    if(data.data.status_code == 200){
                        this.chooseLabel.LabelContent = data.data.data
                        
                    }else{
                        this.$message({
                          message: '获取标签内容失败',
                          type: 'error'
                        });
                    }
                }).catch((data)=>{
                })
            },
            chooseLabelContent(item){  // 点击适用添加该文案到文本内容
                this.chooseLabel.addTextareaMsg = item.content
                this.chooseLabel.addLabelMsg = item.qlTitle
                this.contentMsg.content += this.chooseLabel.addTextareaMsg
            },
            submitMsg(){
                let arr=[]
                this.Content.UqContent.forEach((item)=>{
                    arr.push(item.content)
                    
                })
                this.Content.con = arr.join('|||||')
                userUpdateQuestionnaire({
                    content: this.Content.con
                }).then((data)=>{
                    if(data.data.status_code ==200){
                        this.daligeAddBox = false;
                        this.contentMsg.content = '';
                        this.chooseLabel.addLabelMsg = '';
                        this.getSelectUqContent()
                    }else{
                        this.$message({
                          message: '添加失败，请重新操作',
                          type: 'error'
                        });
                    }
                    
                }).catch((data)=>{

                })
            },
            dragChange(){

            },
            dragStart(){

            },
            dragEnd(){
                
            }
        }
    }
</script>

<style scoped>
.h-40{height: 480px;overflow: scroll;}
.addBox{ position: absolute;top:30px;left: 30px;width:400px;height: 260px;background: #98aab4;border-radius: 10px;}
.el-form-item{margin-bottom: 0 !important}
.addIcon{height: 18px;width:20px;line-height: 19px;text-align: center;border: 1px solid #343434;border-radius: 10px;margin-left: 5px;display: inline-table;font-weight: bolder;color:#343434;cursor:pointer;}
.addIcon:hover{
    border-color:#dfc202;color:#dfc202;
}
.contentBox{width: 100%;height: 50px;}
.textarea:focus{border-color:none !important;}
</style>
