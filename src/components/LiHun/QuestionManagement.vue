<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <div class="text-lg relative my-2">
                <el-form>
                    <el-form-item label="">
                      <el-input v-model="titleSearchMsg" class="w-1/2" autocomplete="off" placeholder='请输入问题名称'></el-input>
                    </el-form-item>
                    <el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="titleSearch">搜索问题</el-button>
                </el-form>
            </div>
            <div class="py-1 text-lg relative my-2">问题列表<el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="handleQuestionAdd">新增问题</el-button></div>
                <div class="text-center h-500">
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
                                <td class="border text-black">{{ item.id }}</td>
                                <td class="border text-black">{{ item.title }}</td>
                                <td class="border text-black">{{ problemType[item.type] }}</td>
                                <td class="border text-black">无备注</td>
                                <td class="border text-black" v-if="item.imgs !==null">
                                    <div  v-for="($item, $index) in JSON.parse(item.imgs)" :key="$index">
                                        <img :src="$item">
                                    </div></td>
                                <td class="border text-black" v-if="item.imgs == null || item.imgs ==[]">
                                    无实例
                                </td>
                                <td class="border text-black justify-around">
                                    <div class="flex justify-around py-1 mx-auto">
                                        <el-button type="primary" icon="el-icon-edit" circle @click="updateQuestion(item)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click="deleteQuestion(item.id)"></el-button>
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
            <!-- 新增问题弹窗 -->
            <el-dialog title="新增问题" :visible.sync="dialogQuestionAdd">
              <el-form :model="user">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="user.title" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="user.type" class="w-1/2" placeholder="选择问题类型">
                      <el-option v-for="(item, index) in problemType" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注释" :label-width="formLabelWidth">
                  <el-input v-model="user.placeholder" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证类型" :label-width="formLabelWidth" v-if="user.type==1 ">
                    <el-select v-model="user.re" placeholder="选择输入类型">
                      <el-option v-for="(item, index) in problemRe" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="示例图" :label-width="formLabelWidth">
                    <el-upload
                        id="attachmentInputs"
                        method="POST"
                        class="upload-demo"
                        accept="image/jpeg,image/gif,image/png"
                        ref="upload"
                        action="http://office365.aladdinlaw.com:3921/api/Questionnaire/v1/problem/add"
                        :on-exceed="exceedFile"
                        :before-upload="onBeforeUpload"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        name='imgs[]'
                        list-type="picture-card"
                        :auto-upload="true"
                        multiple
                        :limit="3"
                        :on-change="fileChange"
                        :file-list="fileList"
                      >
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
                      </el-upload>
                </el-form-item> -->
                <el-form-item label="示例图" :label-width="formLabelWidth">
                   <input name="imgs" multiple type="file" id='file'>
                </el-form-item>
                <div  v-if="user.type==6 || user.type==7 || user.type==8 || user.type==9 " >
                    <div  v-for="(item, index) in addQuestion_answer" :key="index" class="flex justify-between " >
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="item.label" class="w-1/2" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <div>
                            <el-button @click="deleteQuestion_answer_btn(index)">删除</el-button>
                        </div>
                    </div>
                    <div   class="flex justify-between">
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="addQuestion_answerName" class="w-1/2" autocomplete="off"></el-input>
                        </el-form-item>
                        <div>
                            <el-button @click="addQuestion_answer_btn(index)">添加</el-button>
                        </div>
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
            <!-- 修改问题弹窗 -->
            <el-dialog title="修改问题" :visible.sync="dialogFormVisible">
              <el-form :model="user">
                <el-form-item label="名称" :label-width="formLabelWidth">
                  <el-input v-model="user.title" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="user.type" class="w-1/2"  placeholder="选择问题类型">
                      <el-option v-for="(item, index) in problemType" :key="index" :label="item" :value="index">{{item}}</el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="注释" :label-width="formLabelWidth">
                  <el-input v-model="user.placeholder" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="验证类型" :label-width="formLabelWidth" v-if="user.type==1 ">
                    <el-select v-model="user.re" placeholder="选择输入类型">
                      <el-option v-for="(item, index) in problemRe" :key="index" :label="item" :value="index">{{item}}</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="示例图" :label-width="formLabelWidth">
                   <input name="imgs" multiple type="file" id='fileUpdate'>
                </el-form-item>
                <div v-if="user.type==6 || user.type==7 || user.type==8 || user.type==9 ">
                    <div  v-for="(item, index) in add_answer" :key="index"  class="flex justify-between" >
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="item.label" class="w-1/2" autocomplete="off" :disabled="true"></el-input>
                        </el-form-item>
                        <div>
                            <!-- <el-button @click="add_answer_btn">添加</el-button> -->
                            <el-button @click="delete_answer_btn(item,index)">删除</el-button>
                        </div>
                    </div>
                    <div   class="flex justify-between">
                        <el-form-item label="选项名称" :label-width="formLabelWidth">
                             <el-input v-model="answerName" class="w-1/2" autocomplete="off"></el-input>
                        </el-form-item>
                        <div>
                            <el-button @click="add_answer_btn">添加</el-button>
                        </div>
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
        </div>

</template>
<!-- <script src="https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js"></script> -->
<script>
    import axios from 'axios'
    import {apiUrl} from '@/common/js/api.js'
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addQuestion} from '@/api/api/requestLogin.js'   // 新增问题
    import {addAnswer} from '@/api/api/requestLogin.js'    // 添加选项
    import {deleteAnswer} from '@/api/api/requestLogin.js'    // 删除选项
    import {selectQuestion} from '@/api/api/requestLogin.js'  // 获取用户列表
    import {selectQuestionList} from '@/api/api/requestLogin.js'  // 根据标题条件获取用户列表
    import {updateQuestion} from '@/api/api/requestLogin.js'   // 修改问题
    import {deleteQuestion} from '@/api/api/requestLogin.js'   // 删除问题
    import {selectOnlyQuestion} from '@/api/api/requestLogin.js'   // 查询单独问题
    import {QuestionArr} from '@/api/api/requestLogin.js'    // 问题数组
    import {demoAddImg} from '@/api/api/requestLogin.js'    // 添加示例图

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                testform:{
                    title: '',
                    type: null,
                    re: null,
                    status: null,    // 是否禁用
                    placeholder: '' // 注释
                },
                pageInfo:[
                 {
                    id: '',
                    title: '',
                    type: '',
                    other: '',
                    imgs: []
                 }
                ],
                titleSearchMsg: '',
                list: {
                    id: '问题ID',
                    title: '问题名称',
                    type: '问题类型',
                    other: '问题备注',
                    imgs: '问题实例',
                    control: '操作'
                },
                user:{
                    title: '',
                    type: null,
                    re: null,
                    imgs: null,
                    status: null,    // 是否禁用
                    placeholder: '' // 注释
                },
                form:{
                    file:'',
                },
                add_answer: [],   // 修改页面添加选项
                answerName: '',   // 修改页面点击添加选项绑定的值
                addQuestion_answer: [], // 新增页面选项列表
                addQuestion_answerName: '',   // 新增页面点击添加选项绑定的值
                // fileList: [],   // 实例图片
                problemType: {},
                problemRe: {},
                UserRole: [],
                chooseUserRole: [],
                min: '',
                dialogFormVisible: false,
                dialogQuestionAdd: false,
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
                fileList: [] // 待上传的示例图
            }
        },
        mounted () {
          this.handleQuestionList()   //获取问题列表
          this.QuestionArrOk() // 获取问题数组
        },
        methods:{
            handleQuestionList () { // 获取问题
                selectQuestion({page:this.currentPage}).then((data)=>{
                    this.pageInfo = data.data.data.data
                    this.min = data.data.data
                    // this.fileList = this.pageInfo.imgs
                }).catch((data)=>{
                    this.$router.replace("/");
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
            QuestionArrOk () {
                QuestionArr().then((data)=>{
                    this.problemType = data.data.data.problemType
                    this.problemRe = data.data.data.problemRe
                })
            },
            add_answer_btn () {  // 修改页面点击添加选项
                addAnswer({
                    status: 1,
                    label: this.answerName
                }).then((data)=>{
                    this.selectOnlyQuestionList()
                    this.$message({
                        type: 'success',
                        message: '成功添加选项!'
                      });
                    this.answerName = ''
                })
            },
            delete_answer_btn (item,index) { // 修改页面点击删除选项
                localStorage.setItem('paid',item.id)
                deleteAnswer().then((data)=>{
                    this.$message({
                        type: 'success',
                        message: '删除选项成功!'
                      });
                    this.selectOnlyQuestionList()
                }).catch((data)=>{

                })
            },
            addQuestion_answer_btn (index) {  // 新增问题页面点击添加选项
                this.addQuestion_answer.push({
                    status: 1,
                    label:this.addQuestion_answerName,
                    order: index
                })
                var arr = this.addQuestion_answer
                var compar = function(obj1, obj2){
                  var val1 = obj1.order;
                  var val2 = obj2.order;
                  if(val1<val2){
                    return -1
                  }else if(val1>val2){
                    return 1
                  }else{
                    return 0
                  }
                }
                arr.sort(compar)
                this.addQuestion_answerName = ''
            },
            deleteQuestion_answer_btn (index) { // 新增问题页面点击删除选项
                this.addQuestion_answer.splice(index,1)
            },
            handleSizeChange (size) {   // 点击分页
                this.pagesize = size;
            },
            handleCurrentChange (currentPage) {    //点击哪一页
                this.currentPage = currentPage;
            },

            handleQuestionAdd () {    // 点击新增问题
                localStorage.removeItem('pid');
                this.user.title = '';
                this.user.type = '';
                this.user.placeholder = '';
                this.user.status = '';
                this.dialogQuestionAdd = true
            },

            onBeforeUpload(file) {
              const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
              const isLt1M = file.size / 1024 / 1024 < 1;

              if (!isIMAGE) {
                this.$message.error('上传文件只能是图片格式!');
              }
              if (!isLt1M) {
                this.$message.error('上传文件大小不能超过 1MB!');
              }
              return isIMAGE && isLt1M;
            },
            addNewQuestion () {   // 新增问题
                const formData = new FormData();
                let fileAll = $("#file")[0].files;
                for(var i =0;i<fileAll.length;i++){
                  console.log(fileAll[i])
                  formData.append('imgs['+i+']', fileAll[i])
                }
                formData.append('title', this.user.title);
                formData.append('type', this.user.type);
                formData.append('placeholder', this.user.placeholder);
                formData.append('status', this.user.status);
                if(this.user.type==1){
                  formData.append('re', this.user.re);
                }
                addQuestion(formData).then((data)=>{
                  this.user.title = '';
                  this.user.type = '';
                  this.user.re = '';
                  this.user.placeholder = '';
                  this.user.status = '';
                  this.handleQuestionList()
                  localStorage.setItem('pid',data.data.data)
                  this.$message({
                      type: 'success',
                      message: '成功添加问题!'
                  });
                  localStorage.removeItem('pid');
                  this.dialogQuestionAdd = false
                }).catch((data)=>{

                })
            },

            updateQuestion (item) {    // 点击修改问题
                localStorage.setItem('pid',item.id)
                this.user.title = item.title;
                this.user.type = item.type;
                this.user.re = item.re;
                this.user.placeholder = item.placeholder
                this.user.status = item.status;
                this.dialogFormVisible = true
                if(this.user.type==6 || this.user.type==7 || this.user.type==8 || this.user.type==9 ){
                    this.selectOnlyQuestionList()
                }
            },
            selectOnlyQuestionList () {  // 修改页面查询当前问题下的选项列表
                selectOnlyQuestion().then((data)=>{
                     this.add_answer = data.data.child
                }).catch((data)=>{
                })
            },
            handleCheckedCitiesChange (value) {
                this.chooseUserRole = value
            },
            updataQuestionMsg () {   // 确定修改用户信息
                const formData = new FormData();
                let fileAll = $("#fileUpdate")[0].files;
                for(var i =0;i<fileAll.length;i++){
                  formData.append('imgs['+i+']', fileAll[i])
                }
                formData.append('title', this.user.title);
                formData.append('type', this.user.type);
                formData.append('placeholder', this.user.placeholder);
                formData.append('status', this.user.status);
                if(this.user.type==1){
                   formData.append('re', this.user.re);
                    updateQuestion(formData).then((data)=>{
                        this.user.title = '';
                        this.user.type = null;
                        this.user.re = null;
                        this.user.placeholder = '';
                        this.user.status = null;
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    })
                }else if(this.user.type==6 || this.user.type==7 || this.user.type==8 || this.user.type==9 ){
                    updateQuestion(formData).then((data)=>{
                        this.user.title = '';
                        this.user.type = null;
                        this.user.status = null;
                        this.user.placeholder = '';
                        localStorage.removeItem('pid');
                        this.handleQuestionList()
                        this.dialogFormVisible = false
                    })
                }else{
                  formData.append('re', this.user.re);
                   updateQuestion(formData).then((data)=>{
                        this.user.title = '';
                        this.user.type = null;
                        this.user.placeholder = '';
                        this.user.status = null;
                        this.user.re = null;
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
            handleRemove(file, fileList) {
              // console.log(file, fileList);
            },
             // 文件状态改变时的钩子
            fileChange(file, fileList) {
                console.log(file)
                console.log(fileList)
              this.form.file = file.raw
              this.fileList = fileList
              const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png'|| file.raw.type === 'image/gif');
                const isLt1M = file.size / 1024 / 1024 < 1;

                if (!isIMAGE) {
                  this.$message.error('上传文件只能是图片格式!');
                  return false;
                }
                if (!isLt1M) {
                  this.$message.error('上传文件大小不能超过 1MB!');
                  return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file.raw);
                reader.onload = function(e){
                    // console.log(this.result)//图片的base64数据
                }
                // this.$refs.upload.submit();

            },
             // 文件超出时的钩子
            exceedFile(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            handleSuccess(res, file, fileList) {

              console.log(res)
              console.log(file)
              console.log(fileList)
              this.$notify.success({
                title: '成功',
                message: `文件上传成功`
              });
              this.imageUrl = URL.createObjectURL(file.raw);
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {
              this.$notify.error({
                title: '错误',
                message: `文件上传失败`
              });
            },
            changeInfo($event) {
                var formData = new FormData(this.$refs.form);         //获取表单数据
                let config = {
                     headers: {
                       "Authorization":'bearer ' + localStorage.getItem('token')
                     }
                 }


                 axios.post(apiUrl.addQuestion, formData, config)         

                .then(res => {
                $('#form1').serialize()
                console.log(res)
                return false;

                    if(res.data.error_code==0){

                        this.tabshow=false

                            this.$emit('closeall',this.tabshow);

                      }

                })
            }
        }
    }
</script>

<style scoped>
/*.searchBox{ margin-right: 150px;}*/
.h-500{height: 500px;overflow: scroll;}
.el-form-item{margin-bottom:0.25rem;}

/*测试表单提交*/
.content{
        width:800px;
        margin:50px auto;
    }
    .title{
        font-size:18px;
        font-weight:bold;
        padding-left:340px;
        margin-bottom:30px;
    }
    input{
        border:1px solid #a9a9a9;
        height:34px;
        line-height:34px;
        width:550px;
        margin-bottom:20px;
        padding-left:5px;
    }
    label{
        width:120px;
        text-align:right;
        display:inline-block;
    }
    #registerBtn{
        background:#3498db;
        color:#fff;
        font-size:14px;
        text-align:center;
        width:100px;
        line-height:34px;
        border:none 0;
        cursor:pointer;
        margin:20px 20px 0 0;
        margin-left:120px;
    }
    label span{
        color:red;
    }
    #errContent{
        padding:20px 0 0 30px;
        text-align:center;
    }
    #file{
      width: 220px;
      height: 40px;
      padding-left: 0;
    }
    #fileUpdate{
      width: 220px;
      height: 40px;
      padding-left: 0;
    }
</style>
