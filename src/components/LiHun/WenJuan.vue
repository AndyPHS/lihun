<template>
  <div>
    <head-menu></head-menu>
    <div class="container mx-auto">
      <div  class="text-right">
        <el-button type="primary" plain @click="addNewWenJuan">新增问卷</el-button>
      </div>
      <!-- 问卷列表 -->
      <div>
        <el-table
          :data="QuestionnaireSelectArr"
          height="500"
          style="width: 100%">
          <el-table-column
            label="ID"
            width="80">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="问卷名称"
            width="250">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>创建人: {{ scope.row.createdUid }}</p>
                <p>创建时间: {{ scope.row.createdTime }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.title }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="问卷类型"
            width="150">
            <template slot-scope="scope">
              <span style="margin-left: 10px;">{{questionnaireType[scope.row.type]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="关联管理"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;" @click="checkGuanLian(scope.$index, scope.row)">查看关联</span>
            </template>
          </el-table-column>
          <el-table-column
            label="word模板"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;" @click="checkModel(scope.$index, scope.row)">查看模板</span>
            </template>
          </el-table-column>
          <el-table-column
            label="标签池"
            width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px;display: inline-block;cursor: pointer;" @click="checkLabel(scope.$index, scope.row)">查看标签</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="EditWenJuan(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="DeleteWenJuan(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增问卷弹出框 -->
    <el-dialog title="新增问卷" :visible.sync="dialogNewWenJuan">
      <el-form :model="addMsg">
         <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" :label-width="formLabelWidth" class="mb-1">
          <el-select v-model="addMsg.type" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionnaireType"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能用途" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.purpose" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
            <el-radio-group v-model="addMsg.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddQuestionnaire">取 消</el-button>
        <el-button type="primary" @click="addQuestionnaireOk">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改问卷弹出框 -->
    <el-dialog title="修改问卷" :visible.sync="dialogEditWenJuan">
      <el-form :model="addMsg">
         <el-form-item label="问卷名称" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.title" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="问卷类型" :label-width="formLabelWidth" class="mb-1">
          <el-select v-model="addMsg.type" placeholder="请选择">
              <el-option
                v-for="(item, index) in questionnaireType"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.description" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能用途" :label-width="formLabelWidth" class="mb-1">
          <el-input v-model="addMsg.purpose" class="w-1/2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否可用" :label-width="formLabelWidth">
            <el-radio-group v-model="addMsg.status">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="问卷关联" :label-width="formLabelWidth">

          <el-select v-model="addMsg.Ofqp" multiple placeholder="请选择">
            <el-option
              size="small"
              v-for="(item,index) in OfqpListData"
              :key="index"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEditQuestionnaire">取 消</el-button>
        <el-button type="primary" @click="EditQuestionnaireOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>
<script>
import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
import {questionnaire} from '@/api/api/requestLogin.js' // 获取问卷类型
import {questionnaireSelectAll} from '@/api/api/requestLogin.js' // 查询问卷
import {addQuestionnaire} from '@/api/api/requestLogin.js' // 新增问卷
import {updateQuestionnaire} from '@/api/api/requestLogin.js' // 新增问卷
import {deleteQuestionnaire} from '@/api/api/requestLogin.js' // 删除问卷
import {selectTree} from '@/api/api/requestLogin.js'    // 查询关系

// import {answer} from '@/api/api/requestLogin.js'
export default {
  data () {
    return{
      questionnaireType: {},   // 问卷数组类型
      QuestionnaireSelectArr: [  // 获取问卷
        {
          // "id": 3,
          // "title": "离婚协议书",
          // "type": 1,
          // "createdTime": "2019-11-22 07:17:43",
          // "updateTime": "2019-11-22 07:17:43",
          // "description": "离婚协议书自动生成",
          // "purpose": "离婚协议书自动生成",
          // "status": 1,
          // "createdUid": "郝海林",
          // "updateUid": "郝海林",
          // "wid": null
        }
      ],
      formLabelWidth: '80px',   // 表单标签宽度
      dialogNewWenJuan: false,  // 新增问卷弹框
      dialogEditWenJuan: false,  // 编辑问卷弹框
      OfqpListData: [],  // 获取问卷所有的关联
      addMsg: {  // 新增问卷字段
        title: '',  // 标题
        type: null,  // 问卷类型
        description: '', // 备注
        purpose: '', // 用途
        status: null,  // 是否禁止访问
        Ofqp: []   // 问卷默认加载一个内容
      }
    }
  },
  name: 'WenJuan',
  components: {
    HeadMenu,
  },
  mounted () {
    this.getQuestionnaire() // 获取问卷类型
    this.getQuestionnaireSelect()   // 查询问卷
  },
  methods: {
    getQuestionnaireSelect(){  // 查询问卷
      questionnaireSelectAll().then((data)=>{
        if(data.data.status_code == 200 ){
          this.QuestionnaireSelectArr = data.data.data
          // console.log(this.QuestionnaireSelectArr)
        }else{
          this.$message({
            message: '问卷获取失败',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    getQuestionnaire(){   // 获取问卷类型
      questionnaire().then((data)=>{
        if(data.data.status_code == 200 ){
          this.questionnaireType = data.data.data.questionnaireType
          // console.log(this.questionnaireType)
        }else{
          this.$message({
            message: '问卷类型获取失败',
            type: 'error'
          });
        }
        // console.log(data.data.data.questionnaireType)
      }).catch((data)=>{

      })
    },
    addNewWenJuan(){   // 新增问卷
      this.dialogNewWenJuan = true;
      this.addMsg.title = '';
      this.addMsg.type = null;
      this.addMsg.description = '';
      this.addMsg.purpose = '';
      this.addMsg.status = null;
    },
    addQuestionnaireOk(){  // 点击新增确定按钮
      addQuestionnaire({
        title: this.addMsg.title,
        type: this.addMsg.type,
        description: this.addMsg.description,
        purpose: this.addMsg.purpose,
        status: this.addMsg.status
      }).then((data)=>{
          if(data.data.status_code == 200 ){
            this.dialogNewWenJuan = false;
            this.getQuestionnaireSelect()
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else{
            this.$message({
              message: '新增失败，请联系管理员',
              type: 'error'
            });
          }
      }).catch((data)=>{

      })
    },
    cancelAddQuestionnaire(){  // 点击新增取消按钮
      this.dialogNewWenJuan = false;
    },
    checkGuanLian(index, row){ // 点击查看关联
      localStorage.setItem('qid',row.id)
      this.$router.replace("/GuanLianManagement");
    },
    checkModel(index, row){  // 点击查看模板
      localStorage.setItem('wid',row.wid)
      localStorage.setItem('qid',row.id)
      this.$router.replace("/DisplayRule");
    },
    checkLabel(index, row){  // 点击标签池
      localStorage.setItem('qid',row.id)
      this.$router.replace("/LabelManagement");
    },
    EditWenJuan(index, row) {   // 点击修改问卷
      this.dialogEditWenJuan = true
      this.addMsg.title = row.title;
      this.addMsg.type = row.type;
      this.addMsg.description = row.description;
      this.addMsg.purpose = row.purpose;
      this.addMsg.status = row.status;
      this.addMsg.Ofqp = row.Ofqp;
      localStorage.setItem('qid',row.id)
      selectTree().then((data)=>{
          this.OfqpListData = data.data.data.data
      }).catch((data)=>{
          console.log("请求失败")
      })
    },
    EditQuestionnaireOk(){  // 点击修改问卷确定按钮
      updateQuestionnaire({
        title: this.addMsg.title,
        type: this.addMsg.type,
        description: this.addMsg.description,
        purpose: this.addMsg.purpose,
        status: this.addMsg.status,
        Ofqp: JSON.stringify(this.addMsg.Ofqp)
      }).then((data)=>{
        if(data.data.status_code == 200 ){
          localStorage.removeItem('qid');
          this.dialogNewWenJuan = false;
          this.getQuestionnaireSelect()
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.dialogEditWenJuan = false
        }else{
          this.$message({
            message: '修改失败，请联系管理员',
            type: 'error'
          });
        }
      }).catch((data)=>{

      })
    },
    cancelEditQuestionnaire(){  // 点击修改问卷取消按钮
      this.dialogEditWenJuan = false
    },
    DeleteWenJuan(index, row) {  // 删除问卷
      localStorage.setItem('qid',row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          deleteQuestionnaire().then((data)=>{
            if(data.data.status_code == 200 ){
              localStorage.removeItem('qid');
              this.getQuestionnaireSelect()
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
            }else{
              this.$message.error('删除失败，请联系管理员');
            }

          }).catch((data)=>{
            this.$message.error('删除失败，请联系管理员');
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style scoped>
.ban{width:220px !important;}
.el-form-item{margin-bottom:10px !important;}
</style>
