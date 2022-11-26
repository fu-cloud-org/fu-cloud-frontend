<template>
  <article class="media">
    <figure class="media-left image is-24x24" style="margin-top: 4px">
      <img :src="attachImg(avatar)" style="border-radius: 50%; height: 100%; width: 100%">
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong  style="font-size: 18px">{{ alias }}</strong>
          <small class="ml-2">{{ comment.createTime | date }}</small>
          <br />
          {{ comment.content }}
        </p>
      </div>
    </div>
    <div class="media-right" v-show="user.username === comment.username">
      <figure>
        <i
            class="el-icon-delete" @click="deleteComment"
            style="top: 0; bottom: 0; margin: auto;"
        />
      </figure>

    </div>
  </article>
</template>

<script>
import {attachImg} from "@/utils/attachImg";
import {getUserProfile} from "@/api/auth";
import {mapGetters} from "vuex";
import {deleteComment} from "@/api/comment";

export default {
  name: 'CommentsItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters([
        'user',
        "token"
    ])
  },
  data() {
    return {
      attachImg: attachImg,
      avatar: "",
      alias: ""
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    getUserProfile() {
      getUserProfile(this.comment.userId).then(res => {
        const {data} = res
        this.avatar = data.avatar
        this.alias = data.alias
      })
    },
    async deleteComment(id) {
      const confirmResult = await
          this.$confirm('此操作将会永久删除该帖子，不可恢复，是否继续执行',
              '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: "warning"
              }).catch(err => err)
      if (confirmResult === 'confirm') {
        await deleteComment(this.comment.username, this.comment.id).then(res => {
          this.$message.success('删除成功')
          this.history.go(0)
        })
      } else {
        this.$message({
          type: 'info',
          message: '您已取消删除操作'
        })
      }
    }
  }
}
</script>