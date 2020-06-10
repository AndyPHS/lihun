<template>
  <div>
    <head-menu></head-menu>
    <div class="container mx-auto text-left mt-4">
      <span class="underline cursor-pointer" @click="goBackWenJuan">返回问卷列表</span>
      <span class="inline-block text-white ml-2 px-2 py-1 bg-blue-500 cursor-pointer rounded hover:bg-blue-800" @click="checkAllLabel">查看所有标签</span>
    </div>
    <div class="container mx-auto flex mt-4">
      <div class="w-1/2">
        <h3 class="text-lg">离婚起诉状标签池<i @click="addLabelBtn" class="el-icon-circle-plus-outline ml-2"></i></h3>
        <div class="con">
          <ul class="text-left">
            <span :class="{active:index==ins}" class="px-2 py-1 text-white bg-blue-300 inline-block rounded mx-2 mt-2" v-for="(item, index) in labelArr" :key="index"><span  @dblclick="openLabelMsg(item, index)" @click="getLabelKeyWord(item, index)">{{ item.title }}</span><i @click="deleteLabelBtn(item, index)" class="el-icon-close ml-2 cursor-pointer"></i></span>
          </ul>
        </div>
      </div>
      <div class="w-1/2">
        <h3 class="text-lg">离婚起诉状关键词池<i @click="addKeyWordBtn" class="el-icon-circle-plus-outline ml-2"></i></h3>
        <div class="con">
          <ul class="text-left">
            <span class="px-2 py-1 text-white bg-blue-300 inline-block rounded mx-2 mt-2"  v-for="(item, index) in keyWordArr" :key="index" ><span @dblclick="openKeyWordMsg(item, index)">{{ item.title }}</span><i @click="deleteKeyWordBtn(item, index)" class="el-icon-close ml-2 cursor-pointer"></i></span>
          </ul>
        </div>
      </div>
    </div>
    <!-- 新增标签弹出框 -->
    <el-dialog title="新增标签" :visible.sync="dialogAddLabel">
      <el-form :model="addLabelMsg">
         <el-form-item label="标签名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addLabelMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文本描述" :label-width="formLabelWidth" class="mb-1">
          <el-input type='textarea' rows='3' v-model="addLabelMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddLabel">取 消</el-button>
        <el-button type="primary" @click="AddLabelOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增关键词弹出框 -->
    <el-dialog title="新增关键词" :visible.sync="dialogAddKeyWord">
      <el-form :model="addKeyWordMsg">
         <el-form-item label="关键词名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addKeyWordMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
       <!--  <el-form-item label="关键词描述" :label-width="formLabelWidth" class="mb-1">
          <el-input type='textarea' rows='3' v-model="addKeyWordMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item> -->
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddKeyWord">取 消</el-button>
        <el-button type="primary" @click="AddKeyWordOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 双击标签或者关键词弹出框 -->
    <el-dialog title="" :visible.sync="dialogContenBox">
      <div class="flex">
        <h2 v-if="this.isKeyWord==1" class="text-left ml-2 text-base font-bold">标签名称：<span v-show="IfEdit">{{ this.ContenBox.title }}</span>
          <span v-show="Edit" class="inline-block">
            <el-form :model="ContenBox">
              <el-input v-model="ContenBox.title" size="medium" type="text" autocomplete="off" @blur="editLabel"></el-input>
            </el-form>
          </span>
        </h2>
        <h2 v-if="this.isKeyWord==2" class="text-left ml-2 text-base font-bold">关键词名称：<span v-show="IfEdit">{{ this.ContenBox.keyTitle }}</span>
          <span v-show="Edit" class="inline-block">
            <el-form :model="ContenBox">
              <el-input v-model="ContenBox.keyTitle" size="medium" type="text" autocomplete="off" @blur="editKeyWord"></el-input>
            </el-form>
          </span>
        </h2>
        <div class="text-lg ml-2">
          <i class="el-icon-edit" @click="editTitle"></i>
          <i class="el-icon-circle-plus-outline" @click="addLabelContentBtn"></i>
        </div>
      </div>
      <div class="w-5/6 mx-auto">
        <ul class="text-left overflow-y-auto">
          <li class="mt-2 py-1 px-1 text-base hover:bg-blue-300" v-for="(item, index) in ContenBox.content" :key="index">{{ item.content }}<i @click="deleteLabelContentBtn(item, index)" class="el-icon-remove-outline ml-2 cursor-pointer hover:text-white"></i></li>
        </ul>
      </div>
    </el-dialog>
    <!-- 新增标签内容弹出框 -->
    <el-dialog title="新增标签内容" :visible.sync="dialogAddLabelContent">
      <el-form :model="addLabelContentMsg">
        <el-form-item label="文本描述" :label-width="formLabelWidth" class="mb-1">
          <el-input type='textarea' rows='3' v-model="addLabelContentMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddLabelContent">取 消</el-button>
        <el-button type="primary" @click="AddLabelContentOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
  import {selectLabel} from '@/api/api/requestLogin.js' // 查询标签
  import {selectKeyWord} from '@/api/api/requestLogin.js' // 查询关键词
  import {addLabel} from '@/api/api/requestLogin.js' // 添加标签
  import {deleteLabel} from '@/api/api/requestLogin.js' // 删除标签
  import {deleteKeyWord} from '@/api/api/requestLogin.js' // 删除关键词
  import {updateLabel} from '@/api/api/requestLogin.js' // 修改标签
  import {AddLabelContent} from '@/api/api/requestLogin.js' // 新增标签内容
  import {deleteLabelContent} from '@/api/api/requestLogin.js' // 删除标签内容
  import {selectLabelContent} from '@/api/api/requestLogin.js' // 查询标签内容
  
  
  
  export default {
    components: {
       HeadMenu,
    },
      data () {
          return {
            labelArr: [], // 查询的标签总和
            keyWordArr: [],  // 查询的关键词总和
            IfEdit: true,  // 是否修改
            Edit: false,   // 修改标签
            isKeyWord: null, // 双击标签1，双击关键词2
            dialogAddLabelContent: false, // 新增标签内容弹窗
            dialogAddLabel: false,  // 标签弹窗
            dialogAddKeyWord: false, // 关键词弹窗
            dialogContenBox: false, // 双击标签和关键词弹窗
            formLabelWidth: '150px',
            addLabelMsg:{ // 新增标签的内容
              title:'', 
              description: ''
            },
            addLabelContentMsg:{ // 新增标签内容弹框
              description: ''
            },
            addKeyWordMsg:{ // 新增关键词内容
              flId: null, //当前选中的标签id
              title:'', 
              description: ''
            },
            ContenBox:{ // 双击标签弹出标签内容弹窗
              id: null,
              title: '',
              keyTitle: '', // 关键词名称
              keyid: null,  // 选中的关键词ID
              content: []
            },
            ins: null,  // active点击切换颜色
            clickTimer: null   // 双击和单击效果
          }
      },
      mounted () {
        this.getLabel()    // 获取标签
        this.getKeyWord()  // 获取关键词
      },
      methods: {
        getLabel(){
          selectLabel({
            status:1
          }).then((data)=>{
            if(data.data.status_code==200){
              this.labelArr = data.data.data
            }else{
              this.$message({
                message: '标签获取失败',
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
        getKeyWord(){
          selectKeyWord({
            status:2,
            flId:0
          }).then((data)=>{
            if(data.data.status_code==200){
              this.keyWordArr = data.data.data
            }else{
              this.$message({
                message: '标签获取失败',
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
        goBackWenJuan(){
          this.$router.replace("/wenjuan");
        },
        checkAllLabel(){
          console.log(1)
        },
        addLabelBtn(){  // 点击新增标签
          this.dialogAddLabel = true;
        },
        cancelAddLabel(){ // 点击取消标签弹窗
          this.dialogAddLabel = false;
        },
        AddLabelOk(){
          addLabel({
            qid: localStorage.getItem('qid'),
            flid: 0,
            title: this.addLabelMsg.title
          }).then((data)=>{
            if(data.data.status_code==200){
              localStorage.setItem('qlid',data.data.data)
              AddLabelContent({
                content: this.addLabelMsg.description
              }).then((data)=>{
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogAddLabel = false;
                this.addLabelMsg.title = '';
                this.addLabelMsg.description = '';
                // localStorage.removeItem('qlid');
                this.getLabel()
              }).catch((data)=>{
                this.$message({
                  message: '添加失败，请联系管理员',
                  type: 'error'
                });
              })
            }
            console.log(data.data)
          }).catch((data)=>{

          })
        },
        addKeyWordBtn(){  // 点击新增关键词
          this.dialogAddKeyWord = true;
        },
        cancelAddKeyWord(){ // 点击取消关键词弹窗
          this.dialogAddKeyWord = false;
        },
        openKeyWordMsg(item, index){  // 双击关键词弹出框
          this.isKeyWord =2
          this.dialogContenBox = true;
          this.ContenBox.keyTitle = item.title
          this.ContenBox.keyid = item.id
        },
        AddKeyWordOk(){  // 点击新增关键词确定按钮
          addLabel({
            qid: localStorage.getItem('qid'),
            flid: this.addKeyWordMsg.flId,
            title: this.addKeyWordMsg.title
          }).then((data)=>{
            if(data.data.status_code==200){
              localStorage.setItem('qlid',data.data.data)
              AddLabelContent({
                content: this.addKeyWordMsg.description
              }).then((data)=>{
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.dialogAddKeyWord = false;
                this.addKeyWordMsg.title = '';
                this.addKeyWordMsg.description = '';
                // localStorage.removeItem('qlid');
                this.getLabel()
              }).catch((data)=>{
                this.$message({
                  message: '添加失败，请联系管理员',
                  type: 'error'
                });
              })
            }
            console.log(data.data)
          }).catch((data)=>{

          })
        },
        getLabelKeyWord(item, index){  // 点击标签查看关键词
          this.addKeyWordMsg.flId = item.id
          this.ins=index
          if (this.clickTimer) {
            window.clearTimeout(this.clickTimer);
            this.clickTimer = null;
          }
          this.clickTimer = window.setTimeout(function() {
            // your click process code here  
            
          }, 300);
          selectKeyWord({
            status:2,
            flId:item.id
          }).then((data)=>{
            this.keyWordArr = data.data.data
          }).catch((data)=>{
            this.$message({
              message: '标签获取失败，请联系后台管理人员',
              type: 'error'
            });
          })
          // selectLabelContent({
          //   qlid: item.id
          // }).then((data)=>{
          //   this.keyWordArr = data.data.data
          // }).catch((data)=>{

          // })
        },
        openLabelMsg(item, index){  // 双击标签弹出标签内容弹窗
          this.isKeyWord =1
          if (this.clickTimer) {
            window.clearTimeout(this.clickTimer);
            this.clickTimer = null;
          }
          this.ContenBox.id = item.id
          this.ContenBox.title = item.title
          this.dialogContenBox = true;
          selectLabelContent({
            qlid: item.id
          }).then((data)=>{
            if(data.data.status_code ==200){
              this.ContenBox.content = data.data.data
            }else{
              this.$message({
                message: '标签内容获取失败，请联系后台管理人员',
                type: 'error'
              });
            }
            
          }).catch((data)=>{

          })
        },
        editTitle(){ // 修改标签名称
          if(this.IfEdit==false){
            this.IfEdit=true
            this.Edit = false
          }else if(this.IfEdit == true){
            this.IfEdit = false;
            this.Edit = true
          }
        },
        editLabel(){  // 修改标签
          localStorage.setItem("qlid",this.ContenBox.id)
          updateLabel({
            qid: localStorage.getItem('qid'),
            flid: 0,
            title: this.ContenBox.title
          }).then((data)=>{
            if(data.data.status_code==200){
              this.$message({
                message: '标签修改成功',
                type: 'success'
              });
              // localStorage.removeItem('qlid');
              this.getLabel()
            }else{
              this.$message({
                message: '标签修改失败',
                type: 'error'
              });
            }
          }).catch((data)=>{

          })
        },
        editKeyWord(){ // 修改关键词
          // console.log(this.addKeyWordMsg.flId)
          localStorage.setItem("qlid",this.addKeyWordMsg.flId)
          updateLabel({
            qid: localStorage.getItem('qid'),
            flid: this.ContenBox.keyid,
            title: this.ContenBox.keyTitle
          }).then((data)=>{
            if(data.data.status_code==200){
              this.$message({
                message: '关键词修改成功',
                type: 'success'
              });
              // localStorage.removeItem('qlid');
            }else{
              this.$message({
                message: '关键词修改失败',
                type: 'error'
              });
            }
          }).catch((data)=>{

          })
        },
        addLabelContentBtn(){ // 点击新加标签内容
          this.dialogAddLabelContent = true
          if(this.isKeyWord==1){
            localStorage.setItem("qlid",this.ContenBox.id)
          }else if(this.isKeyWord==2){
            localStorage.setItem("qlid",this.ContenBox.keyid)
          }
          
        },
        cancelAddLabelContent(){ // 点击新增表内容弹窗的取消按钮
           this.dialogAddLabelContent = false
        },
        AddLabelContentOk(){  // 点击新增标签内容弹窗的确定按钮
          // localStorage.setItem("qlid",this.addKeyWordMsg.flId)
          AddLabelContent({
            content:this.addLabelContentMsg.description
          }).then((data)=>{
            if(data.data.status_code==200){
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.ContenBox.content.push({content:this.addLabelContentMsg.description})
              this.addLabelContentMsg.description = ''
              // localStorage.removeItem('qlid');
              this.dialogAddLabelContent = false
            }else{
              this.$message({
                message: '添加失败',
                type: 'error'
              });
            }
          }).catch((data)=>{

          })
        },
        deleteLabelContentBtn(item, index){ // 删除标签内容
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            deleteLabelContent({
              qldid: item.id
            }).then((data)=>{
              if(data.data.status_code==200){
                this.ContenBox.content.splice(index,1)
              }
            }).catch((data)=>{
              this.$message({
                type: 'error',
                message: '删除失败'
              }); 
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
          });
          
        },
        deleteLabelBtn(item, index){  // 删除标签
          this.labelArr.splice(index, 1)
          localStorage.setItem('qlid',item.id) 
          deleteLabel().then((data)=>{

          }).catch((data)=>{

          })
        },
        deleteKeyWordBtn(item, index){  // 删除关键词
          this.keyWordArr.splice(index, 1)
          localStorage.setItem('qlid',item.id) 
          deleteKeyWord().then((data)=>{

          }).catch((data)=>{

          })
        },
      }
    }
</script>
<style scoped>
.ban{width:220px !important;}
.con{height: 400px;border:1px solid #343434;width:90%;border-radius: 10px;margin-top:5px;}
.active{background: #1596e9}
</style>
