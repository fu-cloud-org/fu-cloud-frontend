<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input
              v-model.lazy="commentText"
              type="textarea"
              maxlength="400"
              placeholder="留下一条友善的评论..."
              :disabled="isLoading"
          ></b-input>
        </b-field>
        <b-button
            type="is-light"
            native-type="submit"
            class="level-item"
            :disabled="isLoading"
        >
          <b>发表评论</b>
        </b-button>
      </form>
    </div>
  </article>
</template>

<script>
import { pushComment } from '@/api/comment'
export default {
  name: 'CommentsForm',
  data() {
    return {
      commentText: '',
      isLoading: false
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    },
    userId: {
      type: String,
      default: null
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      try {
        let postData = {}
        console.log(this.commentText)
        postData['content'] = this.commentText
        postData['postId'] = this.slug
        await pushComment(postData, this.userId)
        this.$emit('loadComments', this.slug)
        this.$message.success('留言成功')
        this.commentText = ''
      } catch (e) {
        this.$buefy.toast.open({
          message: `Cannot comment this story. ${e}`,
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>