<template>
  <div class="article_all">
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1"><router-link  to="Article">文章管理</router-link></el-menu-item>
        <el-menu-item index="2">用户管理</el-menu-item>
      </el-menu>
      <div class="w-1/3 py-2">
        <div class="goback">
          <img class="mr-2" src="../../../assets/images/goback_icon.png" alt="">
          <span class="text-sm" @click="backUserList">返回用户列表</span>
        </div>
      </div>
    </div>
    <div>
      <p class="text-left ml-2 text-sm">
        <span class="mx-1">张三</span>
        <span>2020.05.06</span>注册，
        手机号：<span class="mr-2">15033336666,</span>
        邮箱：<span class="mr-2">11111111111@163.com,</span>
        购买次数: <span>1</span>次,
        购买时间: <span>2020.05.14</span>
      </p>
    </div>
    <div>
      <el-main>
        <el-table :data="tableData" stripe height="500" :header-row-style="{height:'40px'}" :row-style="{height:'40px'}">
          <el-table-column prop="date" label="ID" width="100" height="50">
          </el-table-column>
          <el-table-column prop="name" label="协议名称" width="200">
          </el-table-column>
          <el-table-column prop="address" label="协议编号" width="200">
          </el-table-column>
          <el-table-column prop="name" label="生成时间" width="150">
          </el-table-column>
          <el-table-column prop="name" label="历史版本" width="120">
          </el-table-column>
          <el-table-column prop="name" label="下载次数" width="80">
          </el-table-column>
          <el-table-column prop="name" label="签订状态" width="150">
          </el-table-column>
        </el-table>
      </el-main>
    </div>
  </div>
</template>

<script>
 export default{
   name: 'UserWenShu',
   data() {
     const item = {
       date: '2016-05-02',
       name: '王小虎',
       address: '测试'
     };
     return {
       activeIndex: '2',
       phoneVal: null, // 输入手机号查找
       tableData: Array(20).fill(item),
       row: null
     }
   },
   methods: {
     getParams () {
       // 取到路由带过来的参数
       let routerParams = this.$route.params.row
       // 将数据放在当前组件的数据内
       this.row = routerParams
     },
     backUserList () {
       this.$router.push({
         path: '/UserList',
         name: 'UserList'
       })
     }
   },
   mounted () {
     this.getParams ()
   },
   watch: {
   // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
     '$route': 'getParams'
   }

 }
</script>

<style scoped>
.article_all{
  width: 1080px;
  margin:20px auto;
}
.goback{display: flex;align-items: center;cursor: pointer; color: #0066CC; padding: 10px;}
.goback:hover{color: #0055AA;}
</style>
