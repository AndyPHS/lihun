<template>
  <div class="article_all">
    <div class="flex justify-between items-center">
      <el-menu :default-active="activeIndex" class="el-menu-demo w-1/3" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">文章管理</template>
          <el-menu-item index="1-1"><router-link  to="Article">分类列表</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link  to="FenLeiOperate">分类管理</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><router-link  to="UserList">用户管理</router-link></el-menu-item>
      </el-menu>
    </div>
    <div class="w-full text-right mt-3">
      <span class="px-2 py-2 cursor-pointer hover:text-blue-500 text-sm" @click="goBackList">返回文章列表</span>
    </div>
    <div class="w-1/2 text-left pt-4">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="文章分类">
          <el-cascader
            v-model="ruleForm.faId"
            clearable
            :options="fenleiAll"
            :props="SetKesDept"
          ></el-cascader>
          <!-- <el-select v-model="ruleForm.faId" placeholder="请选择文章分类">
            <el-option
              v-for="item in fenleiAll"
              :key="item.id"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="文章简介" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item label="是否置顶" prop="topping">
          <el-radio-group v-model="ruleForm.topping">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="editor-container">
          <UE :defaultMsg=defaultMsg :config=config :id=ue1 ref="ue"></UE>
        </div>
        <el-form-item class="py-3 mt-5">
          <el-button v-if="this.articleId==null" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button v-if="this.articleId!=null" type="primary" @click="updateForm('ruleForm')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <div class="mt-1">
      <button @click="getUEContent()">获取内容</button>
      <button @click="getUEContentTxt()">获取无文本内容</button>

    </div> -->
  </div>
</template>

<script>
// import {selectAction} from '@/api/api/requestLogin.js' // 查询文章类型
import UE from '@/components/ue/ue.vue' // 引入组件
import {selectAction} from '@/api/api/AgreementRequest.js' // 查询文章类型
import {addNews} from '@/api/api/AgreementRequest.js' // 新增文章
import {updateNews} from '@/api/api/AgreementRequest.js' // 修改文章
import {selectNewsContent} from '@/api/api/AgreementRequest.js' // 查询文章

export default{
  components: {UE},
  name: 'ArticleUpload',
  data () {
    return {
      SetKesDept: { //自定义  级联选择器value label
        value: 'id',
        label: 'title',
        children: 'data',
        checkStrictly: true
      },
      activeIndex: '1',
      defaultMsg: '',
      config: {
        initialFrameWidth: 1080,
        initialFrameHeight: 350
      },
      ue1: 'ue1',
      fenleiAll: [], // 文章分类汇总
      ruleForm: { // 上传文章表单
        title: '',
        description: '',
        content: '',
        faId: null,  // 分类ID
        topping: '' // 置顶 1置顶0取消
      },
      articleId: null,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { max: 30, message: '长度在 30个字符内', trigger: 'blur' }
        ],
        faId: [
          { required: true, message: '请选择文章类型', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请填写文章简介', trigger: 'blur' }
        ],
        topping: [
          { required: true, message: '文章是否置顶', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    // this.getUEContent() // 获取
    this.getFenlei() // 查询分类
    this.getParams() // 获取上个页面文章信息
  },
  methods: {
    getFenlei () { // 查询分类汇总
      selectAction().then((data) => {
        this.fenleiAll = data.data;
      })
    },
    getParams () {
      // 取到路由带过来的参数
      let routerParams = this.$route.params.rows
      // 将数据放在当前组件的数据内
      this.articleId = routerParams
      if (this.articleId != null) {
        localStorage.setItem('articleId',this.articleId)
        selectNewsContent({
          id: this.articleId
        }).then((data) => {
          this.ruleForm.title = data.data.data.title;
          this.ruleForm.description = data.data.data.description;
          this.ruleForm.faId = data.data.data.faId;
          this.ruleForm.topping = JSON.stringify(data.data.data.topping);
          // this.ruleForm.content = data.data.data.content;
          this.$refs.ue.setUEContent(data.data.data.content)
        })
      } 
    },
    goBackList () { // 返回文章列表
      this.$router.replace('/Article')
    },
    getUEContent () {
      let content = this.$refs.ue.getUEContent() // 调用子组件方法
      // this.$notify({
      //   title: '获取成功，可在控制台查看！',
      //   message: content,
      //   type: 'success'
      // })
      console.log(content)
    },
    getUEContentTxt () {
      let content = this.$refs.ue.getUEContentTxt() // 调用子组件方法
      // this.$notify({
      //   title: '获取成功，可在控制台查看！',
      //   message: content,
      //   type: 'success'
      // })
      console.log(content)
    },
    submitForm(formName) {
      if (this.ruleForm.faId.length == 2) {
        this.ruleForm.faId = this.ruleForm.faId[1]
      } else {
        this.ruleForm.faId = this.ruleForm.faId[0]
      }
      let content = this.$refs.ue.getUEContent() // 调用子组件方法
      this.ruleForm.content = content;
      this.ruleForm.faId = this.ruleForm.faId;
      this.$refs[formName].validate((valid) => {
        addNews(this.ruleForm).then((data) => {
          if (data.data.status_code === 200) {
            this.$message({
              showClose: true,
              message: '文章上传成功',
              type: 'success'
            })
            this.ruleForm = {}
          }else{
            this.$message.error('上传失败，请填写必填项');
          }
        }).catch((data) => {
          this.$message({
            showClose: true,
            message: '文章添加失败，请检查表单是否填写完整',
            type: 'error'
          })
        })
      })
    },
    updateForm (formName) {
      let content = this.$refs.ue.getUEContent() // 调用子组件方法
      this.ruleForm.content = content;
      this.$refs[formName].validate((valid) => {
        updateNews({
          title: this.ruleForm.title,
          description: this.ruleForm.description,
          content: this.ruleForm.content,
          faId: this.ruleForm.faId.toString(),  // 分类ID
          topping: this.ruleForm.topping //
        }).then((data) => {
          if(data.data.status_code == 200){
            this.$message({
              showClose: true,
              message: '文章更新成功',
              type: 'success'
            })
            this.ruleForm = {}
            localStorage.removeItem('articleId');
            this.articleId = null;
            this.$refs.ue.setUEContent('')
          }else{
            this.$message.error('更新失败，请填写必填项');
          }
        }).catch((data) => {
          // this.$message({
          //   showClose: true,
          //   message: '文章更新失败，请检查表单是否填写完整',
          //   type: 'error'
          // })
        })
      })
    }
  }
}
</script>

<style scoped>
.article_all{
  width: 1080px;
  margin:20px auto;
}
</style>
