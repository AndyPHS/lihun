<template>
    <div>
        <head-menu></head-menu>
        <div class="container mx-auto ">
            <div>
                <div class="w-2/3 mx-auto">
                    <h2 class="md:text-3xl text-orange-500 py-4">案例上传</h2>
                    <!-- <form action="" name="myForm" id="myForm" class="w-2/3 mx-auto" enctype="multipart/form-data"> -->
                    <el-form :model="formMsg">
                      <el-form-item label="文件名称" :label-width="formLabelWidth">
                        <el-input v-model="formMsg.title" class="md:text-xl border ml-2 text-base" autocomplete="off"></el-input>
                      </el-form-item>
                      <el-form-item label="上传文件" :label-width="formLabelWidth">
                         <input name="imgs" class="w-full" multiple type="file" id='upfile' @change="selectFile">
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          type="primary"
                          @click="submitClick"
                          >确认上传
                        </el-button>
                      </el-form-item>
                    </el-form>
                   <!-- </form> -->
                    <div class="my-6">
                        <a class="text-blue-500" @click="getList()">查看已上传的文件</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadMenu from '@/components/HeadMenu'
import {creatCase} from '@/api/api/requestLogin.js'
// import {apiUrl} from '@/common/js/api.js'
export default {
  name: 'caseupload',
  components: {
    HeadMenu
  },
  data () {
    return {
      msg: localStorage.getItem('name'),
      formMsg: {
        title: '',
        imgs: []
      },
      fullscreenLoading: false,  // 加载中
      formLabelWidth: '80px',
      isShow: false,
      filename: '',
      form: {
        fileMsg: '文件大小不能超过2M'
      }

    }
  },
  methods: {
    submitClick () {
      // this.fullscreenLoading = true;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const formData = new FormData();
      let imgFiles = $("#upfile")[0].files;
      for (let i = 0; i < imgFiles.length; i++) {
        formData.append('imgs['+i+']', imgFiles[i])
      }
      formData.append('title', this.formMsg.title)
      creatCase(formData).then((data) => {
        // this.fullscreenLoading = false;
        loading.close();
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$router.replace('/FileList')
      })
      setTimeout(() => {
        loading.close();
      }, 5000);
    },
    selectFile () {
      let imgFiles = $("#upfile")[0].files;
      if (imgFiles && imgFiles.length) {
        for (let item of imgFiles) {
          let size = item.size / 1024 / 1024
          if (size > 5) {
            this.$message.error('单张图片大小不能超过5M')
            return false
          }
        }
      }
    },
    getList () {
      this.$router.replace('/FileList')
    }
  }

}
</script>

<style scoped>

</style>
