<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <div class="py-2 text-lg relative my-2">权限列表<el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="handleUserPermissionAdd">添加权限</el-button>
            </div>
            <div class="text-center min">
                <table class="w-full">
                    <thead>
                        <tr>
                            <td class="headstyle w-1/6 text-center border text-black font-bold py-2" v-for="item of list" :key="item.index">{{item}}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in PermissionInfo"
                            :key="index"
                        >
                            <td class="border text-black">{{ item.name }}</td>
                            <td class="border text-black">{{ item.display_name }}</td>
                            <td class="border text-black">{{ item.description }}</td>
                            <td class="border text-black">{{ item.created_at }}</td>
                            <td class="border text-black">{{ item.updated_at }}</td>
                            <td class="border text-black flex justify-around">
                                <div class="flex justify-around py-2 w-2/3 mx-auto">
                                    <el-button type="primary" icon="el-icon-edit" circle @click="updataPermission(item)"></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle @click="deletePermission(item.id)"></el-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
         </div>
        <el-dialog title="新增权限" :visible.sync="dialogUserPermissionAdd">
          <el-form :model="userPermission">
            <el-form-item label="权限名称" :label-width="formLabelWidth">
              <el-input v-model="userPermission.name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限中文" :label-width="formLabelWidth">
              <el-input v-model="userPermission.display_name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限备注" :label-width="formLabelWidth">
              <el-input v-model="userPermission.description" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserPermissionAdd = false">取 消</el-button>
            <el-button type="primary" @click="addNewUserPermission">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增权限" :visible.sync="dialogUserPermissionUpdate">
          <el-form :model="userPermission">
            <el-form-item label="权限名称" :label-width="formLabelWidth">
              <el-input v-model="userPermission.name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限中文" :label-width="formLabelWidth">
              <el-input v-model="userPermission.display_name" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限备注" :label-width="formLabelWidth">
              <el-input v-model="userPermission.description" class="w-1/2" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogUserPermissionUpdate = false">取 消</el-button>
            <el-button type="primary" @click="updateNewUserPermission">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addPermission} from '@/api/api/requestLogin.js' // 新增权限
    import {deletePermission} from '@/api/api/requestLogin.js' // 删除权限
    import {updatePermission} from '@/api/api/requestLogin.js' // 修改权限
    import {selectPermission} from '@/api/api/requestLogin.js' // 查找权限

    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                PermissionInfo: [{   // 权限绑定信息
                    id: '',
                    name: '',
                    display_name: '',
                    description: '',
                    created_at: '',
                    updated_at: ''
                }],
                list: {  // 表格表头
                    name: '权限名称',
                    display_name: '权限中文',
                    description: '权限描述',
                    created_at: '创建时间',
                    updated_at: '更新时间',
                    control: '操作'
                },
                userPermission:{
                    name: '',
                    display_name: '',
                    description: ''
                },
                dialogUserPermissionAdd: false,
                dialogUserPermissionUpdate: false,
                formLabelWidth: '80px'
            }
        },
        mounted () {
            this.getUserPermission() // 查询案件列表
        },
        methods:{
            getUserPermission () {  // 查询权限
                selectPermission().then((data)=>{
                    this.PermissionInfo = data.data.data
                }).catch((data)=>{
                    this.$router.replace("/");
                })
            },
            handleUserPermissionAdd () {  // 点击添加权限
                this.dialogUserPermissionAdd = true
            },
            addNewUserPermission () {    // 确认添加权限
                addPermission({
                    name: this.userPermission.name,
                    display_name: this.userPermission.display_name,
                    description: this.userPermission.description
                }).then((data)=>{
                    this.dialogUserPermissionAdd = false
                    this.userPermission.name = '';
                    this.userPermission.display_name = '';
                    this.userPermission.description = '';
                    this.getUserPermission() // 添加成功后重新获取权限
                })
            },
            updataPermission (item) {     // 点击修改权限
                this.dialogUserPermissionUpdate = true
                this.userPermission.name = item.name;
                this.userPermission.display_name = item.display_name;
                this.userPermission.description = item.description;
                localStorage.setItem('permissionId',item.id)
            },
            updateNewUserPermission () {   // 确认修改权限
                updatePermission({
                    name: this.userPermission.name,
                    display_name: this.userPermission.display_name,
                    description: this.userPermission.description
                }).then((data)=>{
                    this.dialogUserPermissionUpdate = false
                    this.userPermission.name = ''
                    this.userPermission.display_name = ''
                    this.userPermission.description = ''
                    localStorage.removeItem('permissionId');
                    this.getUserPermission() // 修改成功后重新获取权限
                })
            },
            deletePermission (e) {    // 删除权限
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    deletePermission(e).then((data)=>{
                        this.getUserPermission()
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
.min{height: 580px;overflow-y: scroll; margin-bottom: 10px;}
</style>
