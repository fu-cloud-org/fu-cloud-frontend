<template>
    <div class="loginRe" id="loginRe">
      <div class="form-container sign-up-container">
        <el-form
            size="small"
            :model="upRuleForm"
            ref="upRuleForm"
            v-loading="up_loading"
            label-position="left"
            status-icon
            :rules="upRules"
            label-width="85px"
            class="demo-ruleForm"
        >
          <h1>Sign Up</h1>
          <el-form-item label="用户名" prop="name" >
            <el-input v-model="upRuleForm.name" placeholder="2-15个字符"/>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input
                v-model="upRuleForm.pass"
                type="password"
                autocomplete="off"
                placeholder="2-16位"
            />
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input
                v-model="upRuleForm.checkPass"
                type="password"
                autocomplete="off"
                placeholder="请确认您的密码"
            />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="upRuleForm.email" autocomplete="on" />
          </el-form-item>
            <el-button
                @click="submitUpForm('upRuleForm')"
            >注册</el-button>
<!--            <el-button @click="resetForm('ruleForm')">重置</el-button>-->
        </el-form>
      </div>

      <div class="form-container sign-in-container">
        <el-form
            size="small"
            label-position="left"
            v-loading="loading"
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="85px"
            class="demo-ruleForm"
        >
          <h1>Sign In</h1>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input
                type="password"
                v-model="ruleForm.pass"
                autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="自动登录" prop="delivery">
            <el-switch v-model="ruleForm.rememberMe"></el-switch>
          </el-form-item>

          <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
          >
        </el-form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>已有帐号？</h1>
            <p>请使用您的帐号进行登录</p>
            <button class="ghost" id="signIn">去登录</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>没有帐号？</h1>
            <p>立即注册加入我们，和我们一起开始旅程吧</p>
            <button class="ghost" id="signUp">去注册</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { register } from '@/api/auth'
export default {
  name: "Authentic",
  mounted() {
    let signUpButton = document.getElementById('signUp');
    let signInButton = document.getElementById('signIn');
    let container = document.getElementById('loginRe');

    signUpButton.addEventListener('click', function () {
      container.classList.add('right-panel-active')
    })

    signInButton.addEventListener('click', function () {
      container.classList.remove('right-panel-active')
    })
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.upRuleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 登录
      redirect: undefined,
      loading: false,
      ruleForm: {
        name: "",
        pass: "",
        rememberMe: true,
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      // 注册
      up_loading: false,
      upRuleForm: {
        name: '',
        pass: '',
        checkPass: '',
        email: ''
      },
      upRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  methods: {
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
              .dispatch("user/login", this.ruleForm)
              .then(() => {
                this.$message({
                  message: "恭喜你，登录成功",
                  type: "success",
                  duration: 2000,
                });
                // 测试header 是否包含jwt
                // this.$store.dispatch("user/getInfo")

                setTimeout(() => {
                  this.loading = false;
                  this.$router.push({ path: this.redirect || "/" });
                }, 0.1 * 1000);
              })
              .catch(() => {
                this.loading = false;
              });
        } else {
          return false;
        }
      });
    },
    // 注册
    submitUpForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.up_loading = true
          register(this.upRuleForm)
              .then((value) => {
                const { code, message } = value
                if (code === 200) {
                  this.$message({
                    message: '账号注册成功',
                    type: 'success'
                  })
                  setTimeout(() => {
                    this.up_loading = false
                    // this.$router.push({ path: this.redirect || '/login' })
                    let container = document.getElementById('loginRe');
                    container.classList.remove('right-panel-active')
                    this.resetForm(formName)
                  }, 0.1 * 1000)
                } else {
                  this.$message.error('注册失败，' + message)
                }
              })
              .catch(() => {
                this.up_loading = false
              })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  background: #f6f5f7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  font-size: 25px;
  margin: 0;
}

p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.loginRe {
  text-align: center; /*让div内部文字居中*/
  /*background-color: #fff;*/
  /*border-radius: 20px;*/
  /*width: 300px;*/
  height: 350px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  /*position: relative;*/
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding:  0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
}

button {
  border-radius: 20px;
  border: 1px solid pink;
  background: pink !important;
  color: lightslategray;
  font-size: 15px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}
.el-button {
  color: white;
  background-color: #409EFF !important;
  border-color: #409EFF !important;
}


button:active {
  transform: scale(.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all .6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform .6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: url("../../assets/img/fu-cloud-org.jpg") center;
  background-size: cover;
  /*background: lightskyblue;*/
  /*background: linear-gradient(to right, pink, pink) no-repeat 0 0 / cover;*/
  color: black;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform .6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* Move signin to right */
.loginRe.right-panel-active .sign-in-container {
  transform: translateY(100%);
}

/* Move overlay to left */
.loginRe.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

/* Bring signup over signin */
.loginRe.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

/* Move overlay back to right */
.loginRe.right-panel-active .overlay {
  transform: translateX(50%);
}

/* Bring back the text to center */
.loginRe.right-panel-active .overlay-left {
  transform: translateY(0);
}

/* Same effect for right */
.loginRe.right-panel-active .overlay-right {
  transform: translateY(20%);
}
</style>