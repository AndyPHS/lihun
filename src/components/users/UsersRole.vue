<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <div class="py-2 text-lg relative my-2">角色列表<el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="handleUserRoleAdd">添加角色</el-button>
            </div>
            <div class="text-center">
                <table class="w-full">
                    <thead>
                        <tr>
                            <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of list" :key="item.index">{{item}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in roleMsg"
                            :key="index"
                        >
                            <td class="border text-black">{{ item.name }}</td>
                            <td class="border text-black">{{ item.display_name }}</td>
                            <td class="border text-black">{{ item.description }}</td>
                            <td class="border text-black">{{ item.created_at }}</td>
                            <td class="border text-black">{{ item.updated_at }}</td>
                            <td class="border text-black flex justify-around">
                                <div class="flex justify-around py-2 w-2/3 mx-auto">
                                    <el-button type="primary" icon="el-icon-edit" circle @click="updataRole(item)"></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteRole(item.id)"></el-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
         </div>
         <el-dialog title="新增角色" :visible.sync="dialogUserRoleAdd">
          <el-form :model="userRole">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="userRole.name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色中文" :label-width="formLabelWidth">
              <el-input v-model="userRole.display_name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色备注" :label-width="formLabelWidth">
              <el-input v-model="userRole.description" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-checkbox-group v-model="userRole.perms">
                <el-checkbox v-for='item in userPermission' :key="item.id" :label="item.id">{{item.display_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserRoleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addNewUserRole">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改角色" :visible.sync="dialogUserRoleUpdate">
          <el-form :model="userRole">
            <el-form-item label="角色名称" :label-width="formLabelWidth">
              <el-input v-model="userRole.name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色中文" :label-width="formLabelWidth">
              <el-input v-model="userRole.display_name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色备注" :label-width="formLabelWidth">
              <el-input v-model="userRole.description" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-checkbox-group v-model="userRole.perms">
                <el-checkbox v-for='item in userPermission' :key="item.id" :label="item.id">{{item.display_name}}</el-checkbox>
            </el-checkbox-group>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserRoleUpdate = false">取 消</el-button>
            <el-button type="primary" @click="UpdateNewUserRole">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addUsersRole} from '@/api/api/requestLogin.js'  // 新增角色
    import {deleteUserRole} from '@/api/api/requestLogin.js'  // 删除角色
    import {updateUserRole} from '@/api/api/requestLogin.js'  // 更新角色
    import {selectUserRole} from '@/api/api/requestLogin.js'  // 查询角色
    import {selectPermission} from '@/api/api/requestLogin.js'  // 查询权限
    import {selectRolePermission} from '@/api/api/requestLogin.js'  // 查询角色权限
    

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                list: {  // 表格表头
                    name: '角色名称',
                    display_name: '角色中文',
                    description: '角色描述',
                    created_at: '创建时间',
                    updated_at: '更新时间',
                    control: '操作'
                },
                roleMsg:[{  // 角色列表
                    name: '',
                    display_name: '',
                    description: '',
                    perms: []
                }],
                userRole: {
                    name: '',
                    display_name: '',
                    description: '',
                    perms: []
                },
                userPermission: [],
                formLabelWidth: '80px',
                dialogUserRoleAdd: false,
                dialogUserRoleUpdate: false
            }
        },
        mounted () {
            this.getUserRole()    // 获取角色列表
            this.getPermission()  // 查询权限
        },
        methods:{
            getPermission () {
                selectPermission().then((data)=>{
                    this.userPermission = data.data.data
                }).catch((data)=>{
                    if(data.data.status_code==401){
                        this.$router.replace("/");
                    }else{
                        alert('获取失败，请重新登录')
                    }
                })
            },
            getUserRole () {   // 获取角色
                selectUserRole().then((data)=>{
                    this.roleMsg = data.data.data
                }).catch((data)=>{
                    if(data.data.status_code==401){
                        this.$router.replace("/");
                    }else{
                        alert('获取失败，请重新登录')
                    }
                })
            },
            handleUserRoleAdd () {    // 点击添加角色出弹窗
                this.dialogUserRoleAdd = true
                this.userRole.name = '';
                this.userRole.display_name = '';
                this.userRole.description = '';
                this.userRole.perms = []
            },
            addNewUserRole () {     // 确认添加角色
                this.userRole.perms = JSON.stringify(this.userRole.perms)
                addUsersRole({
                    name: this.userRole.name,
                    display_name: this.userRole.display_name,
                    description: this.userRole.description,
                    perms: this.userRole.perms
                }).then((data)=>{
                    this.dialogUserRoleAdd = false;
                    this.getUserRole();    // 重新获取角色列表
                    this.userRole.perms = []
                    this.userRole.name = '';
                    this.userRole.display_name = '';
                    this.userRole.description = '';
                }).catch((data)=>{

                })
            },
            updataRole (item) {     // 修改角色
                this.dialogUserRoleUpdate = true;
                this.userRole.name = item.name;
                this.userRole.display_name = item.display_name;
                this.userRole.description = item.description;
                this.userRole.perms = []
                localStorage.setItem('roleId',item.id)
                selectRolePermission().then((data)=>{
                    let permission_id = data.data.data
                    permission_id.forEach((item)=>{
                        this.userRole.perms.push(item.id)
                    })
                }).catch((data)=>{

                })
            },
            UpdateNewUserRole () {  // 点击确认修改角色
                this.userRole.perms = JSON.stringify(this.userRole.perms)
                updateUserRole({
                    name: this.userRole.name,
                    display_name: this.userRole.display_name,
                    description: this.userRole.description,
                    perms: this.userRole.perms
                }).then((data)=>{
                    this.dialogUserRoleUpdate = false;
                    this.getUserRole();
                    this.userRole.perms = []
                    this.userRole.name = ''
                    this.userRole.display_name = ''
                    this.userRole.description = ''
                    localStorage.removeItem('roleId');
                }).catch((data)=>{

                })
            },
            deleteRole (e) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    deleteUserRole(e).then((data)=>{
                        this.getUserRole()
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
            }
        }
    }
</script>

<style scoped>

</style>
