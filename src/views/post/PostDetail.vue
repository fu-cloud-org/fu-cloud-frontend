<template>
  <div class="container">
    <div class="columns">
      <!--detail-->
      <div class="column is-three-quarters">
        <!--title-->
        <el-card
            class="box-card"
        >
          <div
              slot="header"
              class="has-text-centered"
          >
            <p class="is-size-4 has-text-weight-bold">{{ post.title }}</p>
            <div class="has-text-grey is-size-7 mt-3">
              <span>{{ dayjs(post.createTime).format('YYYY/MM/DD HH:mm:ss') }}</span>
              <el-divider direction="vertical" />
              <span>发布者：{{ postUser.alias }}</span>
              <el-divider direction="vertical" />
              <span>查看：{{ post.view }}</span>
            </div>
          </div>

          <!--Markdown-->
          <div id="preview" />

          <!--tabs-->
          <nav class="level has-text-grey is-size-7 mt-6">
            <div class="level-left">
              <p class="level-item">
                <b-taglist>
                  <router-link
                      v-for="(tag, index) in tags"
                      :key="index"
                      :to="{ name: 'tag', params: { name: tag.name } }"
                  >
                    <b-tag type="is-info is-light mr-1">
                      {{ "#" + tag.name }}
                    </b-tag>
                  </router-link>
                </b-taglist>
              </p>
            </div>
            <div
                v-if="token && user.id === postUser.id"
                class="level-right"
            >
              <router-link
                  class="level-item"
                  :to="{name:'post-edit',params: {id:post.id}}"
              >
                <span class="tag">编辑</span>
              </router-link>
              <a class="level-item">
              <span
                  class="tag"
                  @click="handleDelete(post.id)"
              >删除</span>
              </a>
            </div>
          </nav>
        </el-card>

      </div>

      <div class="column">
        作者信息
      </div>
    </div>
  </div>

</template>

<script>
import {deletepPost, getPostDetail } from '@/api/post'
import { mapGetters } from 'vuex'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
export default {
  name: 'postDetail',
  computed: {
    ...mapGetters([
      'token','user'
    ])
  },
  data() {
    return {
      flag: false,
      post: {
        content: '',
        id: this.$route.params.id
      },
      tags: [],
      postUser: {}
    }
  },
  mounted() {
    this.fetchPost()
  },
  methods: {
    renderMarkdown(md) {
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: { style: 'github' }
      })
    },
    // 初始化
    async fetchPost() {
      getPostDetail(this.$route.params.id).then(response => {
        const { data } = response
        document.title = data.post.title
        this.post = data.post
        this.tags = data.tags
        this.postUser = data.user
        // this.comments = data.comments
        this.renderMarkdown(this.post.content)
        this.flag = true
      })
    },
    handleDelete(id) {
      deletePost(id).then(value => {
        const { code, message } = value
        alert(message)
        if (code === 200) {
          setTimeout(() => {
            this.$router.push({ path: '/' })
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
</style>