<template>
  <div style="height: 100%; min-height: 100%">
    <Header/>
    <div class="container" style="margin-top: 90px; margin-bottom: 90px">
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
              <div class="level-right">
                <el-button size="small" v-if="token" @click="collect">
                  <i class="fa fa-thumbs-o-up" style="font-size: 20px" v-if="!isMyCollect"></i>
                  <i class="fa fa-thumbs-up" style="font-size: 20px" v-else></i>
                  {{post.collects}}
                </el-button>
                <el-button size="small" v-else disabled>
                  <i class="fa fa-thumbs-o-up" style="font-size: 20px"></i>
                  {{post.collects}}
                </el-button>
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
import {cancelCollect, isMyCollect, setCollect} from "@/api/collect";

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
      isMyCollect: false,
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
      if (this.token) {
        isMyCollect(this.$route.params.id, this.user.username).then(response => {
          this.isMyCollect = (response.data.isCollected === 'true')
          console.log(this.isMyCollect)
        })
      }
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
    },
    async collect() {
      if (!this.token) {
        this.$message({
          type: 'error',
          message: '请先登录'
        })
        return
      }
       if (this.isMyCollect) {
         await cancelCollect(this.$route.params.id, this.user.username).then(response => {
           this.isMyCollect = false
           this.post.collects--
         })
       } else {
         await setCollect(this.$route.params.id, this.user.username).then(response => {
           this.isMyCollect = true
           this.post.collects++
         })
       }
    }
  },
  // watch: {
  //   $route(to, from) {
  //     this.fetchPost()
  //   }
  // },
}
</script>

<style>
#preview {
  min-height: 300px;
}

#footer {
  width: 100%;
  height: 150px;
}
</style>