<template>
    <div class="headBox">
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                :router=true
                active-text-color="#ffd04b">
            <!--<el-menu-item index="1">用户管理</el-menu-item>-->
            <el-submenu index="1"  v-if="this.permissionHead.guanliyuan || this.permissionHead.quanxian || this.permissionHead.juese ">
                <template slot="title">用户管理</template>
                <el-menu-item index="Users" v-if="permissionHead.guanliyuan"><router-link  to="Users">管理员列表</router-link></el-menu-item>
                <el-menu-item index="UsersPermission" v-if="permissionHead.quanxian"><router-link  to="UsersPermission">权限列表</router-link></el-menu-item>
                <el-menu-item index="UsersRole" v-if="permissionHead.juese"><router-link  to="UsersRole">角色列表</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="2" collapse-transition v-if="this.caseHead.caseManagement">
                <template slot="title">案例库管理</template>
                <el-menu-item index="CaseUpload"><router-link to="CaseUpload">上传案件</router-link></el-menu-item>
                <el-menu-item index="FileList"><router-link to="FileList">案件列表</router-link></el-menu-item>
                <el-menu-item index="SearchCase"><router-link to="SearchCase">案例检索</router-link></el-menu-item>
                 <el-menu-item index="CaseCourt" class="hidden"><router-link to="CaseCourt">法院管理</router-link></el-menu-item>
            </el-submenu>
            <el-submenu index="3" collapse-transition v-if="this.wenjuan.questionnaireAdmin || this.wenjuan.questionnaire">
                <template slot="title">问卷管理</template>
                <el-submenu index="3-1" v-if="this.wenjuan.questionnaireAdmin">
                  <template slot="title">问题模块</template>
                  <el-menu-item index="QuestionManagement"><router-link to="QuestionManagement">问题管理</router-link></el-menu-item>
                  <el-menu-item v-if="false" index="GuanLianManagement"><router-link to="GuanLianManagement">关联管理</router-link></el-menu-item>
                  <el-menu-item v-if="false" index="DisplayRule"><router-link to="DisplayRule">组合管理</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="3-2">
                  <template slot="title">问卷模块</template>
                  <el-menu-item index="wenjuan" v-if="this.wenjuan.questionnaireAdmin"><router-link to="wenjuan">问卷管理</router-link></el-menu-item>
                  <el-menu-item index="UserSystem" v-if="this.wenjuan.questionnaire"><router-link to="UserSystem">问卷列表</router-link></el-menu-item>

                  <!-- <el-menu-item index="BasicInformation"><router-link to="BasicInformation">填写问卷</router-link></el-menu-item> -->
                </el-submenu>
            </el-submenu>
        </el-menu>
        <div class="text-right text-white pr-10">
            <span class="mr-3 cursor-pointer" @click="Exit">[退出]</span>
            <span >你好！{{user}}</span>
        </div>
    </div>

</template>

<script>
  import {usersSelect} from '@/api/api/requestLogin.js'  // 查询角色

  export default {
    name: 'HeadMenu.vue',
    data() {
      return {
        activeIndex: '1',
        permissions: [], // 用户权限
        permissionsId: [], // 用户权限id
        roles: [],
        rolesId: [],
        permissionHead: {    // 用户管理
            guanliyuan: false,  // 管理员
            quanxian: false,   // 权限
            juese: false,      // 角色
        },
        caseHead: {  // 案例管理
            caseManagement: false  // 案例管理
        },
        wenjuan: {   // 问卷模块
            questionnaire: false,   // 问卷管理
            questionnaireAdmin: false  // 问卷问题等修改
        },
        user: localStorage.getItem('name')
      };
    },
    mounted(){
      this.getUserSelect()   // 查找用户基本信息
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      getUserSelect () { // 获取前用户拥有的权限
        usersSelect().then((data)=>{
            this.permissions = data.data.permissions
            this.roles = data.data.roles;
            // this.roles.forEach((item)=>{
            //   this.rolesId.push(item.name)
            // })
            // this.objOfValueToArr(this.rolesId)
            if(this.permissions !== []){
                this.permissions.forEach((item)=>{
                  this.permissionsId.push(item.id)
                    if(item.id==11){
                        this.permissionHead.juese = true
                    }else if(item.id == 12){
                        this.permissionHead.quanxian = true
                    }else if(item.id == 13){
                        this.permissionHead.guanliyuan = true
                    }else if(item.id == 67){
                        this.caseHead.caseManagement = true
                    }else if(item.id == 68){
                        this.wenjuan.questionnaireAdmin = true
                    }else if(item.id == 69){
                        this.wenjuan.questionnaire = true
                    }
                })
            }
          // console.log(data.data.permissions)
        }).catch((data)=>{

        })
      },
      // objOfValueToArr(object) {
      //     var arr = [];
      //     var i = 0;
      //     for (var item in object) {
      //         arr[i] = object[item];
      //         i++;
      //     }
      //     return arr;
      // },
      Exit(){
        this.$router.replace("/");
        localStorage.removeItem('token')
        localStorage.removeItem('roleType')
      }
    }
  }
</script>

<style scoped>
.el-menu.el-menu--horizontal{
  border:none !important;
}
.headBox{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(84, 92, 100);
}
</style>
