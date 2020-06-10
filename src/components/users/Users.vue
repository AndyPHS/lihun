<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto">
            <div class="py-2 text-lg relative my-2">用户列表<el-button type="primary" plain class="absolute top-0 right-0 bottom-0" @click="handleUserAdd">添加用户</el-button></div>
                <div class="text-center">
                    <table>
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
                                <td class="border text-black">{{index+1}}</td>
                                <td class="border text-black">{{ item.name }}</td>
                                <td class="border text-black">{{ item.email }}</td>
                                <td class="border text-black">{{ item.created_at }}</td>
                                <td class="border text-black">{{ item.updated_at }}</td>
                                <td class="border text-black flex justify-around">
                                    <div class="flex justify-around py-2 w-2/3 mx-auto">
                                        <el-button type="primary" icon="el-icon-edit" circle @click="handleClick(item)"></el-button>
                                        <el-button type="danger" icon="el-icon-delete" circle  @click="deleteUser(item.id)"></el-button>
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
                    @current-change="handleUserList"
                    :page-size="pagesize"
                    :current-page.sync="currentPage"
                    :total="this.min.total">
                </el-pagination>
            </div>
            <el-dialog title="新增用户" :visible.sync="dialogUserAdd">
              <el-form :model="user">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="user.name" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="user.email" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input type="password" v-model="user.password" class="w-1/2" placeholder="如不需修改密码可不填" autocomplete="off"></el-input>
                </el-form-item>
                <el-checkbox-group v-model="user.roles">
                    <el-checkbox v-for='item in UserRole' :key="item.id" :label="item.id">{{item.display_name}}</el-checkbox>
                </el-checkbox-group>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogUserAdd = false">取 消</el-button> -->
                <el-button type="primary" @click="addNewUser">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
              <el-form :model="user">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                  <el-input v-model="user.name" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                  <el-input v-model="user.email" class="w-1/2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                  <el-input type="password" v-model="user.password" class="w-1/2" placeholder="如不需修改密码可不填" autocomplete="off"></el-input>
                </el-form-item>
                <el-checkbox-group v-model="chooseUserRole"  @change="handleCheckedCitiesChange">
                    <el-checkbox v-for='item in UserRole' :key="item.id" :label="item.id">{{item.display_name}}</el-checkbox>
                </el-checkbox-group>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancleUpdataUserMsg">取 消</el-button>
                <el-button type="primary" @click="updataUserMsg">确 定</el-button>
              </div>
            </el-dialog>
        </div>

</template>

<script>
    import HeadMenu from '@/components/HeadMenu'    // 添加公共头部
    import {addUsers} from '@/api/api/requestLogin.js'   // 新增用户
    import {selectUser} from '@/api/api/requestLogin.js'  // 获取用户列表
    import {updateUser} from '@/api/api/requestLogin.js'   // 修改用户
    import {deleteUser} from '@/api/api/requestLogin.js'   // 删除用户
    import {selectUserRole} from '@/api/api/requestLogin.js'    // 查询角色
    import {selectUserRoles} from '@/api/api/requestLogin.js'    // 查询用户角色
    export default {
        components:{
            HeadMenu,
        },
        data () {
            return {
                pageInfo:[
                 {
                    id: '',
                    name: '',
                    email: '',
                    created_at: '',
                    updated_at: ''
                 }
                ],
                list: {
                    id: '序号',
                    name: '姓名',
                    email: '邮箱',
                    created_at: '创建时间',
                    updated_at: '更新时间',
                    control: '操作'
                },
                user:{
                    name: '',
                    email: '',
                    password: '',
                    roles: []
                },
                UserRole: [],
                chooseUserRole: [],
                min: '',
                dialogFormVisible: false,
                dialogUserAdd: false,
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
            }
        },
        mounted () {
          this.handleUserList()   //获取用户列表
          this.getUserRole()   // 获取用户角色
        },
        methods:{
            handleUserList () { // 获取用户
                selectUser({page:this.currentPage}).then((data)=>{
                    this.pageInfo = data.data.data.data
                    this.min = data.data.data
                }).catch((data)=>{
                    this.$router.replace("/");
                })
            },
            handleSizeChange (size) {   // 点击分页
                this.pagesize = size;
            },
            handleCurrentChange (currentPage) {    //点击哪一页
                this.currentPage = currentPage;
            },

            handleUserAdd () {    // 点击新增
                this.dialogUserAdd = true
                // this.user.roles = JSON.stringify(this.user.roles)
            },
            addNewUser () {   // 新增用户
                this.user.roles = JSON.stringify(this.user.roles)
                addUsers({
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    roles: this.user.roles
                }).then((data)=>{
                    this.user.name = '';
                    this.user.email = '';
                    this.user.password = '';
                    this.user.roles = [];
                    this.handleUserList()
                    this.dialogUserAdd = false
                }).catch((data)=>{

                })
            },
            handleClick (item) {    // 点击修改角色
                // this.user.roles = JSON.stringify(this.user.roles)
                let chooseUserRoleArr = [];
                this.dialogFormVisible = true
                this.user.name = item.name;
                this.user.email = item.email;
                this.user.password = item.password;
                this.chooseUserRole = chooseUserRoleArr;
                localStorage.setItem('userId',item.id);
                selectUserRoles().then((data)=>{
                    let chooseUserRoleList = data.data
                    for (var i = chooseUserRoleList.length - 1; i >= 0; i--) {
                        chooseUserRoleArr.push(chooseUserRoleList[i].id);
                    }
                    return chooseUserRoleArr;
                })
            },
            handleCheckedCitiesChange (value) {
                this.chooseUserRole = value

            },
            cancleUpdataUserMsg () { // 取消修改用户信息
              this.user.name = '';
              this.user.email = '';
              this.user.password = '';
              this.chooseUserRole = [];
              localStorage.removeItem('userId');
              this.dialogFormVisible = false
            },
            updataUserMsg () {   // 确定修改用户信息
                this.chooseUserRole = JSON.stringify(this.chooseUserRole)
                updateUser({
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password,
                    roles: this.chooseUserRole
                }).then((data)=>{
                    this.user.name = '';
                    this.user.email = '';
                    this.user.password = '';
                    this.chooseUserRole = [];
                    this.handleUserList()
                    localStorage.removeItem('userId');
                    this.dialogFormVisible = false
                })
            },
            getUserRole () {  // 获取权限列表
                selectUserRole().then((data)=>{
                    this.UserRole = data.data.data;
                })
            },
            deleteUser (e) {   // 删除用户
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                    deleteUser(e).then((data)=>{
                        this.handleUserList()
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
