<template>
  <div>
    <div class="mb-5" style="width: 100%; position: absolute">
      <Header/>
    </div>
    <div class="container" style="margin-top: 80px">
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
                <span>{{ dayjs(post.createTime).format('YYYY/MM/DD') }}</span>
                <el-divider direction="vertical"/>
                <span>发布者：{{ postUser.alias }}</span>
                <el-divider direction="vertical"/>
                <span>浏览量：{{ post.view }}</span>
              </div>
            </div>

            <!--Markdown-->
            <div id="preview"/>

            <!--tabs-->
            <nav class="level has-text-grey is-size-7 mt-6">
              <div class="level-left">
                <p class="level-item">
                  <b-taglist>
                    <router-link
                        v-for="(tag, index) in tags"
                        :key="index"
                        :to="{ name: 'tag', params: { name: tag } }"
                    >
                      <b-tag type="is-info is-light mr-1">
                        {{ "#" + tag }}
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

          <comments :slug="post.id" style="margin-bottom: 80px"/>

        </div>

        <div class="column">
          <Author
              v-if="flag"
              :user="postUser"
              :post-user="user"
          />
          <recommend
              v-if="flag"
              :post-id="post.id"
          />
        </div>
      </div>
    </div>
    <Footer id="footer"/>
  </div>

</template>

<script>
import {deletePost, getPostDetail} from '@/api/post'
import {mapGetters} from 'vuex'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Author from "@/views/card/Author";
import Header from "@/components/layout/Header";
import Recommend from "@/views/card/Recommend";
import Footer from "@/components/layout/Footer";
import Comments from "@/components/Comment/Comments";

export default {
  name: 'postDetail',
  components: {Comments, Footer, Recommend, Header, Author},
  computed: {
    ...mapGetters([
      'token', 'user'
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
        hljs: {style: 'github'}
      })
    },

    async fetchPost() {
      getPostDetail(this.$route.params.id).then(response => {
        const {data} = response
        document.title = data.post.title
        this.post = data.post
        this.tags = data.tags
        this.postUser = data.user
        // this.comments = data.comments
        this.renderMarkdown(this.post.content)
        this.flag = true
        // history.go(0)
      })
    },
    async handleDelete(id) {
      const confirmResult = await
          this.$confirm('此操作将会永久删除该帖子，不可恢复，是否继续执行',
              '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: "warning"
              }).catch(err => err)
      if(confirmResult === 'confirm'){
        deletePost(id).then(value => {
          const {code, message} = value
          this.$message.success('删除成功')
          if (code === 200) {
            setTimeout(() => {
              this.$router.push({path: '/'})
            }, 500)
          }
        })
      } else {
        return this.$message({
          type: "info",
          message: '您已取消删除操作'
        })
      }
    }
  },
  watch: {
    $route(to, from) {
      this.fetchPost()
    }
  },
}
</script>

<style>
#preview {
  min-height: 300px;
}

#footer {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 2.0rem;
}
</style>