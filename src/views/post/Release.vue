<template>
  <div>
    <div class="mb-5" style="width: 100%; position: absolute">
      <Header/>
    </div>
    <div class="container" style="margin-top: 90px">
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
                    placeholder="请输入主题标签，限制为 15 个字符和 3 个标签"
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
            <div style="margin: 15px 0;"/>
            <div>
              明天再说，睡觉重要，瓦安zxt
            </div>

          </el-card>
        </div>
      </div>
    </div>
    <Footer id="footer"/>
  </div>

</template>

<script>
import { release } from '@/api/post'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Header from "@/components/layout/Header";
import CardBar from "@/views/card/CardBar";
import {mapGetters} from "vuex";
import Footer from "@/components/layout/Footer";
export default {
  name: 'TopicPost',
  components: {Footer, CardBar, Header},
  data() {
    return {
      userName: '',
      contentEditor: {},
      ruleForm: {
        title: '',
        tags: [],
        content: '',
        summary: ''
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
    this.userName = this.user.alias;
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
          if (this.ruleForm.tags == null || this.ruleForm.tags.length === 0) {
            alert('标签不可以为空')
            return false
          }
          this.ruleForm.content = this.contentEditor.getValue()
          release(this.ruleForm, this.userName).then((response) => {
            const { data } = response
            setTimeout(() => {
              this.$router.push({
                name: 'post-detail',
                params: { id: data.id }
              })
              // console.log(data)
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
    }
  }
}
</script>

<style scoped>
#footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 2.0rem;
}
</style>