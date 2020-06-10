<template>
    <div>
        <div>
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="婚姻关系" name="1">
              <div class="text-left">
                <el-tag
                  class="mx-1 my-1 hover:bg-green-500 bg-white hidden hover:text-white cursor-pointer"
                   v-for="(item, index) in lessonFor"
                   :key="item.id"
                   @click="addLabelarr(item.title, item.id)"
                   >
                  {{ item.title }}
                </el-tag>
              </div>
            </el-collapse-item>
            <el-collapse-item title="子女关系" name="2">
              <div class="text-left">
                <el-tag
                  class="mx-1 my-1 hover:bg-green-500 bg-white hidden hover:text-white cursor-pointer"
                   v-for="(item, index) in lessonSec"
                   :key="item.id"
                   @click="addLabelarr(item.title, item.id)"
                   >
                  {{ item.title }}
                </el-tag>
              </div>
            </el-collapse-item>
            <el-collapse-item title="财产关系" name="3">
              <div class="text-left">
                <el-tag
                  class="mx-1 my-1 hover:bg-green-500 bg-white hidden hover:text-white cursor-pointer"
                   v-for="(item, index) in lessonThi"
                   :key="item.id"
                   @click="addLabelarr(item.title, item.id)"
                   >
                  {{ item.title }}
                </el-tag>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="selectBox flex mt-3">
          <span class="whitespace-no-wrap text-sm mt-2">选定标签：</span>
          <div class="inputbox">
              <div class="arrbox">
                  <div v-for="(item,index) in labelarr" @change="addLabelarr" :key="index" class="spanbox">
                      <span>{{item.title}}</span>
                      <i class="spanclose" @click="removeitem(index, item)"></i>
                  </div>
                  <!--<input-->
                  <!--placeholder="输入后回车"-->
                  <!--size="5"-->
                  <!--v-model="currentval"-->
                  <!--@keyup.enter="addlabel"-->
                  <!--class="input"-->
                  <!--type="text"-->
                  <!--/>-->
              </div>
          </div>
        </div>
      <!-- 常用label展示 -->
        <div></div>
    </div>
</template>

<script>
  import {selectCaseData} from '@/api/api/requestLogin.js'     // 获取案件信息
  import {selectCaseLable} from "@/api/api/requestLogin.js";    // 查询标签接口
  import {updateCaseData} from '@/api/api/requestLogin.js'   // 修改页面信息
  export default {
    name: 'label_case',
    props: {
      parentarr: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        activeNames: ['1'],
        currentval: '',
        labelarr: [],
        oldlabel: [],
        lessonOne: [],
        lessonSec: [],
        lessonThi: [],
        lessonFor: [],
        label_case: []
      }
    },
    mounted () {
      this.getCaseLable();    // 获取标签
      // this.getInfo();  // 获取本案标签
    },
    created(){
      this.getInfo();
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      // input回车加入labelarr中 添加新标签
      // addlabel () {
      //   let count = this.oldlabel.indexOf(this.currentval)
      //   if (count === -1) {
      //     this.labelarr.push(this.currentval)
      //   }
      //   this.currentval = ''
      // },

      getCaseLable () {    // 获取标签池标签
        selectCaseLable().then((data) =>{
          this.oldlabel = data.data.data;
          console.log()
          for (var i = 0; i <this.oldlabel.length -1; i++) {
            // console.log(this.oldlabel[i])
            switch(this.oldlabel[i].tid) {
              case 0:
              this.lessonOne.push(this.oldlabel[i])
              break;
            case 10:
              this.lessonFor.push(this.oldlabel[i])
              break;
            case 11:
              this.lessonSec.push(this.oldlabel[i])
              break;
            case 12:
              this.lessonThi.push(this.oldlabel[i])
              break
            }
          }
        })
      },
      getInfo () {    // 获取本案标签
        selectCaseData().then((data) => {
          this.labelarr = JSON.parse(data.data.label_case); // 标签格式摘要
        }).catch((data)=>{
          // this.$message.error(err);
          alert(data)
        });
      },
      addLabelarr (t, id) {   // 从标签池选择添加标签
        this.labelarr.push({title:t,id: id});
        this.label_case.push({title:t,id: id});
        updateCaseData({json_label:id,type: 1}).then((data) =>{
          // console.log(JSON.parse(data.config.data))
        })
      },
      // 移除标签
      removeitem (index, item) {
        this.labelarr.splice(index, 1)
        this.label_case.splice(index, 1)
        updateCaseData({json_label:item.lid, type: 3}).then((data) =>{
          // console.log(JSON.parse(data.config.data))
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .el-tag {
      padding:0 5px;
    }
    .el-collapse-item__content {
      padding-bottom:10px !important;
    }
    .selectBox{border: 1px solid #dcdee2; border-radius: 6px;padding: 6px 1px 1px 6px;}
    .inputbox {
        background-color: white;
        font-size: 12px;

        margin-bottom: 18px;

        text-align: left;
        font-size: 0;
    }
    .input {
        font-size: 14px;
        border: none;
        box-shadow: none;
        outline: none;
        background-color: transparent;
        padding: 0;
        margin: 0;
        width: auto !important;
        max-width: inherit;
        min-width: 80px;
        vertical-align: top;
        height: 30px;
        color: #34495e;
        margin: 2px;
        line-height: 30px;
    }
    .arrbox {
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 6px 1px 1px 6px;
        text-align: left;
        font-size: 0;
    }
    .spanbox {
        line-height: 30px;
        margin: 2px;
        padding: 0 10px;
        background-color: #ecf5ff;
        color: #409EFF;
        border-radius: 4px;
        font-size: 13px;
        cursor: pointer;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        overflow: hidden;
        transition: 0.25s linear;
    }
    .spanbox:hover {
        padding: 0px 17px 0 3px;

    }
    .spanclose {
        color: #409EFF;
        padding: 0 10px 0 0;
        cursor: pointer;
        font-size: 12px;
        position: absolute;
        right: -3px;
        text-align: right;
        text-decoration: none;
        top: 0;
        width: 100%;
        bottom: 0;
        z-index: 2;
        opacity: 0;
        filter: "alpha(opacity=0)";
        transition: opacity 0.25s linear;
        font-style: normal;
    }
    .spanbox:hover .spanclose {
        padding: 0 10px 5px 0;
        opacity: 1;
        -webkit-filter: none;
        filter: none;
    }
    .spanclose:after {
        content: "x";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 27px;
    }
</style>
