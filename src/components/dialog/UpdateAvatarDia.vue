<template>
  <div>
    <el-dialog
      title="修改头像"
      :visible.sync="visible"
      width="40%"
      :before-close="handleClose">
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
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 2MB</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="update" v-show="newPath !== ''">提 交</el-button>
        </span>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {avatarApi, updateAvatar} from "@/api/personal";

export default {
  name: "UpdateAvatarDia",
  data() {
    return {
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
    },
    update() {
      updateAvatar(this.user.username, this.newPath)
          .then(res => {
            this.$message({
                message: res.data.message,
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

</style>