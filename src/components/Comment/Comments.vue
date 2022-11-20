<template>
  <section class="box comments">
    <h3 class="title is-5">评论区</h3>

    <comments-form :user-id="user.id" :slug="slug" v-if="token" @loadComments="fetchComments"/>

    <comments-item
        v-for="comment in comments"
        :key="`comment-${comment.id}`"
        :comment="comment"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import CommentsItem from './CommentsItem'
import {getCommentList} from "@/api/comment";
import CommentsForm from "@/components/Comment/CommentsForm";
export default {
  name: 'Comments',
  components: {
    CommentsForm,
    CommentsItem
  },
  data() {
    return {
      comments: []
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'user'
    ])
  },
  async mounted() {
    await this.fetchComments(this.slug)
  },
  methods: {
    async fetchComments(postId) {
      console.log(postId)
      getCommentList(postId).then(response => {
        const { data } = response
        this.comments = data
      })
    }
  }
}
</script>