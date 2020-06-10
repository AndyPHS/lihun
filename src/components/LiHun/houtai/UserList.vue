<template>
  <div class="article_all">
    <div class="flex justify-between items-center">
      <el-menu :default-active="activeIndex" class="el-menu-demo w-1/3" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">文章管理</template>
          <el-menu-item index="1-1"><router-link  to="Article">分类列表</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link  to="FenLeiOperate">分类管理</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="2">用户管理</el-menu-item>
      </el-menu>
      <div class="w-1/3 flex searchBox">
        <!-- <input type="text" class="w-4/5 border" placeholder="输入用户手机号"> -->
        <el-form ref="form" label-width="70px">
          <el-form-item
            label="快速查找"

          >
            <el-col :span="24">
              <el-input v-model="phoneVal" size="mini" type="number" placeholder="输入用户手机号"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div class="cursor-pointer search_icon">
          <img src="../../../assets/images/search_icon.png" alt="">
        </div>
      </div>
    </div>

    <div>
      <el-main>
        <el-table :data="tableData" stripe height="500" :header-row-style="{height:'40px'}" :row-style="{height:'40px'}">
          <el-table-column prop="date" label="ID" width="80" height="50">
          </el-table-column>
          <el-table-column prop="name" label="用户名" width="100">
          </el-table-column>
          <el-table-column prop="address" label="注册时间" width="100">
          </el-table-column>
          <el-table-column prop="name" label="手机号" width="100">
          </el-table-column>
          <el-table-column prop="name" label="邮箱" width="120">
          </el-table-column>
          <el-table-column prop="name" label="购买次数" width="80">
          </el-table-column>
          <el-table-column prop="name" label="购买时间" width="120">
          </el-table-column>
          <el-table-column prop="name" label="上次登录时间" width="120">
          </el-table-column>
          <el-table-column prop="name" label="文书信息" width="100">
            <template slot-scope="scope">
              <el-button type="success" size="mini" round @click="GoUserWenShu(scope.$index, scope.row)">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="操作日志" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" round @click="GoUserOperate(scope.$index, scope.row)">日志</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<script>
 export default{
   name: 'UserList',
   data() {
     const item = {
       date: '2016-05-02',
       name: '王小虎',
       address: '测试',
       id: 1
     };
     return {
       activeIndex: '2',
       phoneVal: null, // 输入手机号查找
       tableData: Array(20).fill(item)
     }
   },
   methods: {
     GoUserWenShu(index, row) { // 跳转文书下载历史界面
       this.$router.push({
         path: '/UserWenShu',
         name: 'UserWenShu',
         params: {
           row: row
         }
       })
       console.log(row)
     },
     GoUserOperate(index,row) { // 跳转用户操作历史界面
       this.$router.push({
         path: '/UserOperate',
         name: 'UserOperate',
         params: {
           row: row
         }
       })
       console.log(row)
     }
   }
 }
</script>

<style scoped>
.article_all{
  width: 1080px;
  margin:20px auto;
}
.searchBox{
  align-items: center;

}
.searchBox .search_icon{margin-bottom: 20px;margin-left: 10px;}
</style>
