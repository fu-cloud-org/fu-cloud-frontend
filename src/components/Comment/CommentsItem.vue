<template>
  <article class="media">
    <figure class="media-left image is-48x48">
      <img :src="attachImg(avatar)">
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{{ comment.username }}</strong>
          <small class="ml-2">{{ comment.createTime | date }}</small>
          <br />
          {{ comment.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import {attachImg} from "@/utils/attachImg";
import {getUserProfile} from "@/api/auth";
export default {
  name: 'CommentsItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      attachImg: attachImg,
      avatar: ""
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
      })
    }
  }
}
</script>