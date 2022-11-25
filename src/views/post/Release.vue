<template>
  <div style="height: 100%; min-height: 100%">
    <Header/>
    <div class="container" style="margin-top: 90px; margin-bottom: 90px">
      <div class="columns">
        <div class="column is-four-fifths">
          <el-card
              class="box-card"
              shadow="never"
          >
            <div
                slot="header"
                class="clearfix"
            >
              <span><i class="fa fa fa-book"> 发帖子 </i></span>
            </div>
            <div>
              <el-form
                  ref="ruleForm"
                  :model="ruleForm"
                  :rules="rules"
                  class="demo-ruleForm"
              >
                <el-form-item prop="title">
                  <el-input
                      v-model="ruleForm.title"
                      minlength="5"
                      maxlength="30"
                      show-word-limit
                      placeholder="请输入帖子标题"
                  />
                </el-form-item>

                <!--Markdown-->
                <div id="vditor" />

                <b-taginput
                    v-model="ruleForm.tags"
                    class="my-3"
                    maxlength="15"
                    maxtags="3"
                    ellipsis
                    placeholder="键入回车生成标签，最多3个标签，每个标签不多于15个字符"
                />

                <el-form-item>
                  <el-button
                      type="primary"
                      @click="submitForm('ruleForm')"
                  >发布
                  </el-button>
                  <el-button @click="goBack()">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </div>
        <div class="column">
          <el-card class="box-card">
            <b>摘要（可选）：</b>
            <div style="margin: 15px 0;"/>
            <div>
              <el-input
                  type="textarea"
                  placeholder="不写简介的帖子可不是一篇好帖子欧~"
                  v-model="ruleForm.summary"
                  maxlength="30"
                  show-word-limit
                  size="big"
                  rows="5"
              >
              </el-input>
            </div>
            <div style="margin: 15px 0;"/>
            <b>封面（可选）：</b>
            <div>文章发布后封面就不可修改了哦～</div>
            <div style="margin: 15px 0;"/>
            <div class="pointer-fk">
              <el-upload
                  ref="upload"
                  :action="upload()"
                  list-type="picture-card"
                  :on-change="handleChange"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :before-upload="beforeCoverUpload"
                  :class="{hide:hideUpload}"
                  :auto-upload="true">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}" class="pointer-fk">
                    <img
                        style="position: absolute; margin: auto; max-width: 250px"
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                    <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                    >
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <Footer id="footer"/>
  </div>

</template>

<script>
import {postManager, release, uploadCover} from '@/api/post'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Header from "@/components/layout/Header";
import CardBar from "@/views/card/CardBar";
import {mapGetters} from "vuex";
import Footer from "@/components/layout/Footer";
import {ref} from "vue";
export default {
  name: 'TopicPost',
  components: {Footer, CardBar, Header},
  data() {
    return {
      uploadTypes: ref(["jpg", "jpeg", "png", "gif"]),
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      hideUpload: false,
      limitCount:1,
      userName: '',
      contentEditor: {},
      ruleForm: {
        title: '',
        tags: [],
        content: '',
        summary: '不写简介的帖子可不是一篇好帖子欧',
        cover: '/img/cover/fu-cloud-org.png'
      },
      rules: {
        title: [
          { required: true, message: '请输入帖子标题', trigger: 'blur' },
          {
            min: 1,
            max: 25,
            message: '长度在 15 到 30 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.userName = this.user.username;
  },
  computed: {
    ...mapGetters(['token', 'user'])
  },
  mounted() {
    this.contentEditor = new Vditor('vditor', {
      height: 500,
      placeholder: '此处为帖子内容……',
      theme: 'classic',
      counter: {
        enable: true,
        type: 'markdown'
      },
      preview: {
        delay: 0,
        hljs: {
          style: 'monokai',
          lineNumber: true
        }
      },
      tab: '\t',
      typewriterMode: true,
      toolbarConfig: {
        pin: true
      },
      cache: {
        enable: false
      },
      mode: 'sv'
    })
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
              this.contentEditor.getValue().length === 1 ||
              this.contentEditor.getValue() == null ||
              this.contentEditor.getValue() === ''
          ) {
            alert('帖子内容不可为空')
            return false
          }
          // if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
          //   alert('标签不可以为空')
          //   return false
          // }
          this.ruleForm.content = this.contentEditor.getValue()
          release(this.ruleForm, this.userName).then((response) => {
            const { data } = response
            setTimeout(() => {
              this.$router.push({
                name: 'post-detail',
                params: { id: data.id }
              })
              // console.log(data)
              this.resetForm(formName)
            }, 800)

          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.contentEditor.setValue('')
      this.ruleForm.tags = ''
    },
    goBack() {
      this.$router.back()
    },
  //  upload
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove() {
      this.ruleForm.cover = '';
      this.$refs.upload.clearFiles();
      this.hideUpload = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res) {
      this.ruleForm.cover = res.data;
    },
    beforeCoverUpload(file) {
      const isLegal = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLegal) {
        this.$message.error('请选择正确的图片格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isLegal && isLt2M;
    },
    upload() {
      console.log(this.userName);
      return postManager.uploadCover(this.userName);
    }
  }
}
</script>

<style>
#footer {
  width: 100%;
  height: 150px;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>