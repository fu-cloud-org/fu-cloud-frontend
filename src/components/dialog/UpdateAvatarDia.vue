<template>
  <div>
    <el-dialog
      custom-class="dialogClass"
      title="修改头像"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose">
      <div style="display: flex; padding: 20px">
        <div>
          <el-upload
              ref="upload"
              class="upload-demo"
              drag
              :action="upload()"
              :on-remove="handleRemove"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :auto-upload="true">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">拖动图片到此处或 <em>点击</em> 进行上传</div>
            <div class="el-upload__tip" slot="tip">仅仅支持 jpg/png 格式，大小不超过2MB</div>
          </el-upload>
        </div>
        <div>
          <div class="PersonTop_img" style="margin-left: 100px; margin-top: 20px">
            <img :src="attachImg(nowAvatar)"/>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="update" v-show="newPath !== ''">更 新</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {avatarApi, updateAvatar} from "@/api/personal";
import {attachImg} from "@/utils/attachImg";

export default {
  name: "UpdateAvatarDia",
  data() {
    return {
      nowAvatar: '',
      attachImg,
      newPath: '',
      visible: false
    }
  },
  computed: {
    ...mapGetters([
        'token',
        'user'
    ])
  },
  created() {
    this.nowAvatar = this.user.avatar
  },
  methods: {
    open() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
      this.$emit("flesh");
    },
    upload(){
      return avatarApi.uploadAvatar(this.user.username);
    },
    handleRemove() {
      this.newPath = '';
      this.$refs.upload.clearFiles();
    },
    handleBeforeUpload(file) {
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
    handleSuccess(res) {
      this.newPath = res.data;
      this.nowAvatar = this.newPath;
    },
    update() {
      updateAvatar(this.user.username, this.newPath)
          .then(res => {
            this.$message({
                message: '头像更新成功',
                type: 'success',
            })
            this.handleClose()
          })
          .catch(e => {
            this.$message.error(e)
          })
    }
  }
}
</script>

<style scoped>
.PersonTop_img {
  width: 150px;
  height: 150px;
  /*background-color: lightgray;*/
  margin-right: 24px;
  margin-left: 20px;
  overflow: hidden;
  border-radius: 50%;
  display: block;
  position: relative;
}

.PersonTop_img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>