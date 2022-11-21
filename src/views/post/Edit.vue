<template>
  <div>
    <Header/>
    <div class="container" style="margin-top: 90px">
      <div class="columns">
        <div class="column is-four-fifths">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><i class="fa fa fa-book">&nbsp;更新</i></span>
            </div>
            <div>
              <el-form :model="post" ref="post" class="demo-post">
                <el-form-item prop="title">
                  <el-input
                      v-model="post.title"
                      placeholder="输入心得帖子名称"
                  ></el-input>
                </el-form-item>

                <!--Markdown-->
                <div id="vditor"></div>

                <b-taginput
                    v-model="tags"
                    class="my-3"
                    maxlength="15"
                    maxtags="3"
                    ellipsis
                    placeholder="请输入帖子标签，限制为 15 个字符和 3 个标签"
                />
                <el-form-item class="mt-3">
                  <el-button type="primary" @click="handleUpdate()"
                  >更新
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
                  v-model="post.summary"
                  maxlength="30"
                  show-word-limit
                  size="big"
                  rows="5"
              >
              </el-input>
            </div>
            <div style="margin: 15px 0;"/>
            <b>封面（可选）：</b>
            <div style="margin: 15px 0;"/>
            <div>
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
                <div slot="file" slot-scope="{file}">
                  <img
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
import {getPostDetail, postManager, update} from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {ref} from "vue";
export default {
  name: "PostEdit",
  components: {Footer, Header},
  data() {
    return {
      uploadTypes: ref(["jpg", "jpeg", "png", "gif"]),
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      hideUpload: false,
      limitCount:1,
      post: {},
      tags: [],
    };
  },
  created() {
    this.fetchPost();
  },
  methods: {
    renderMarkdown(md) {
      this.contentEditor = new Vditor("vditor", {
        height: 460,
        placeholder: "输入要更新的内容",
        preview: {
          hljs: { style: "monokai" },
        },
        mode: "sv",
        after: () => {
          this.contentEditor.setValue(md);
        },
      });
    },
    fetchPost() {
      getPostDetail(this.$route.params.id).then((value) => {
        this.post = value.data.post;
        this.tags = value.data.tags
        this.renderMarkdown(this.post.content);
      });
    },
    handleUpdate: function () {
      this.post.content = this.contentEditor.getValue();
      update(this.post).then((response) => {
        const { data } = response;
        console.log(data);
        setTimeout(() => {
          this.$router.push({
            name: "post-detail",
            params: { id: data.id },
          });
        }, 800);
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    //  upload
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount;
    },
    handleRemove() {
      this.post.cover = '';
      this.$refs.upload.clearFiles();
      this.hideUpload = false;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res) {
      this.post.cover = res.data;
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
  },
};
</script>

<style>
.vditor-reset pre > code {
  font-size: 100%;
}

#footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 2.0rem;
}

.hide .el-upload--picture-card {
  display: none;
}
</style>