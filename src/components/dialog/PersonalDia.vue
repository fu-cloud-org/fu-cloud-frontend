<template>
  <div>
    <el-dialog
        custom-class="dialogClass"
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="60%"
        :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <div class="updateInfo">
          <div class="left">
            <el-form-item label="头像" prop="avatar">
              <img style="width:150px;height:150px" :src="attachImg(form.avatar)"/>
            </el-form-item>
<!--            <el-form-item label="账号密码" prop="password">-->
<!--              <el-input v-model="form.password"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="昵称" prop="alias">
              <el-input v-model="form.alias"></el-input>
            </el-form-item>
<!--            <el-form-item label="年龄" prop="age">-->
<!--              <el-input v-model="form.age"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="性别" prop="sex">
              <el-radio v-model="form.sex" label=1>男</el-radio>
              <el-radio v-model="form.sex" label=0>女</el-radio>
              <el-radio v-model="form.sex" label=2>保密</el-radio>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" disabled></el-input>
            </el-form-item>

          </div>
          <div class="right">
            <el-form-item label="用户编号" prop="id">
              <el-input v-model="form.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="regional">
              <el-input v-model="form.regional"></el-input>
            </el-form-item>
<!--            <el-form-item label="兴趣爱好" prop="hobby">-->
<!--              <el-input v-model="form.hobby"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="职业" prop="work">-->
<!--              <el-input v-model="form.work"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="个性签名" prop="sign">
              <el-input v-model="form.sign"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getUserInfo, updateInfo} from "@/api/auth.js";
import { attachImg} from "@/utils/attachImg";

export default {
  name: "PersonalDia",
  data() {
    return {
      attachImg,
      dialogVisible: false,
      form: {
        avatar: "",
        password: "",
        alias: "",
        age: Number,
        email: "",
        mobile: "",
        sex: 2,
        id: Number,
        username: "",
        regional: "",
        sign: "",
      },
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "账号密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    load() {
      getUserInfo()
          .then((res) => {
            console.log(res);
            Object.assign(this.form, res.data);
          })
          .catch((err) => {
            console.log(err);
          });
    },
    submit() {
      updateInfo(this.form)
          .then((res) => {
            console.log(res);
            this.dialogVisible = false;
            this.$emit("flesh");
            this.$message.success("修改成功");
          })
          .catch((err) => {
            console.log(err);
          });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit("flesh");
    },
  },
};
</script>

<style scoped>
.updateInfo {
  height: 400px;
  overflow: auto;
}
.left {
  /* width: 330px; */
  float: left;
}
.right {
  overflow: hidden;
}
</style>
