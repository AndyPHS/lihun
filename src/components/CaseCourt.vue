<template>
 <div>
  <head-menu></head-menu>
  <div class="container mx-auto panel panel-primary">
   <div class="panel-heading text-2xl text-black py-4 font-bold">法院信息管理</div>
   <table class="table table-bordered table-striped text-center w-2/3 mx-auto">
    <thead>
    <tr class="py-1">
     <th>法院名称</th>
     <th>法院id</th>
     <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <template>
     <tr v-for="(item,index) in this.rows.data" :key="item.id">
      <td class="border w-1/2">{{item.name}}</td>
      <td class="border w-1/4">{{item.id}}</td>
      <td class="border w-1/4"><a href="#" @click="Edit(item)">编辑</a>&nbsp;&nbsp;<a href="#" @click="Delete(item,index)">删除</a></td>
     </tr>
    </template>
    <tr>
     <td ><input type="text" class="form-control border text-center mt-4" v-model="rowtemplate.name" /></td>
     <td ><input type="text" class="form-control border text-center mt-4" v-model="rowtemplate.id" /></td>
     <td ><button type="button" class="btn btn-primary mt-4 px-2 text-white bg-blue-500" @click="Save">保存</button></td>
    </tr>
    </tbody>
   </table>
   <el-pagination
                    background
                    class="my-10"
                    layout="prev, pager, next"
                    @current-change="getCaseCourtMsgList"
                    :page-size="pagesize" 
                    :current-page.sync="currentPage"
                    :total="this.rows.total">
            </el-pagination>
  </div>
 </div>
</template>

<script>
 import HeadMenu from '@/components/HeadMenu'
 import {addCaseCourtMsg,updateCaseCourtMsg,deleteCaseCourtMsg,getCaseCourtMsgList} from '@/api/api/requestLogin.js'
  export default {
  components:{
   HeadMenu,
  },
   data(){
    return {
     rows: [
      { id: 1, name: '初级人民法院', status: 1 }
     ],
     rowtemplate: { name: '', id: '', status: 1 },
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
      pagesize:50,    //    每页的数据
      area: '', // 擅长领域
      total: 0, // 总页数
      pageNum: 1, // 第几页
      isloading: false,
    }
   },
   mounted () {
    this.getCaseCourtMsgList ();  // 获取法院信息
   },
   methods:{
     getCaseCourtMsgList () {
        getCaseCourtMsgList({page:this.currentPage}).then((data) =>{
          this.rows = data.data.data;
          // console.log(this.rows)
          this.userList = data.data.data.data
          this.isShow = false
        }).catch((data)=>{
           this.$router.replace("/");
        })
      },
    Save (event) {
     if (!this.rowtemplate.id) {
        this.rows = this.rows
      addCaseCourtMsg(this.rowtemplate).then((data)=>{
        this.rows = data.data.data;
       //还原模板
       this.rowtemplate = { name: '', status: 1, id: '' }
       this.getCaseCourtMsgList ();
      })
     }else{
      updateCaseCourtMsg(this.rowtemplate).then((data)=>{
       this.rows = data.data.data;
       //还原模板
       this.rowtemplate = { name: '', id: '' }
      })
     }
    },
     nextClick () {
        console.log("下一页")
      },
      prevClick () {
        console.log("上一页")
      },
      handleSizeChange (size) {
         this.pagesize = size;
         console.log(this.pagesize)
      },
      handleCurrentChange (currentPage) {
        this.currentPage = currentPage;
        console.log(this.currentPage)  //点击第几页
      },
    Delete (item,index) {
     deleteCaseCourtMsg(item.id).then((data)=>{
      this.rows = data.data.data;
      //还原模板
      this.rowtemplate = { name: '', status: 1, id: '' }
      this.getCaseCourtMsgList ();
     })
     // this.item.splice(index, 1);
    },
    Edit (item) {
     this.rowtemplate = item;
    }
   }
  }
</script>

<style scoped>

</style>
