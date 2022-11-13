<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新帖子" name="latest">
            <article v-for="(item, index) in articleList" :key="index" class="media">
              <div style="width: 100%; height: 100%; position: relative;">
                <!--                <div class="media-left"/>-->
                <div class="media-content" style="float: left">
                  <div class="">
                    <p class="ellipsis is-ellipsis-1">
                      <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                        <router-link :to="{name:'post-detail',params:{id:item.id}}">
                          <span class="is-size-4">{{ item.title }}</span>
                        </router-link>
                      </el-tooltip>
                    </p>
                  </div>
                  <div class="has-text-grey">{{ item.summary }}</div>
                  <div style="position: absolute; right:0; bottom: 0">
                    <nav class="level has-text-grey is-mobile  is-size-6">
                      <div class="level-left">
                        <div class="level-left">
                          <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                            <div class="user-avatar">
                              <img :src="attachImg(item.avatar)"/>
                            </div>
                            {{ item.alias }}
                          </router-link>

                          <span class="mr-1">
                        <i class="el-icon-date"/>{{ dayjs(item.createTime).format("YYYY/MM/DD") }}&nbsp;
                        </span>

                          <span class="is-hidden-mobile">
                          <i class="el-icon-view"/> {{ item.view }}
                        </span>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <div style="position: absolute; left: 0; bottom: 0">
                    <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                    >
                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                          {{ "#" + tag.name }}
                        </router-link>
                    </span>
                  </div>
                </div>
                <div class="media-right" style="margin-left: -100%; float: right">
                  <figure class="image is-128x128">
                    <img :src="attachImg(item.cover)" style="position: absolute; top: 0; bottom: 0; margin: auto"/>
                  </figure>
                </div>
              </div>
            </article>
          </el-tab-pane>

          <el-tab-pane label="热门" name="hot">
            <article v-for="(item, index) in articleList" :key="index" class="media">
              <div style="width: 100%; height: 100%; position: relative;">
                <!--                <div class="media-left"/>-->
                <div class="media-content" style="float: left">
                  <div class="">
                    <p class="ellipsis is-ellipsis-1">
                      <el-tooltip class="item" effect="dark" :content="item.title" placement="top">
                        <router-link :to="{name:'post-detail',params:{id:item.id}}">
                          <span class="is-size-4">{{ item.title }}</span>
                        </router-link>
                      </el-tooltip>
                    </p>
                  </div>
                  <div class="has-text-grey">{{ item.summary }}</div>
                  <div style="position: absolute; right:0; bottom: 0">
                    <nav class="level has-text-grey is-mobile  is-size-6">
                      <div class="level-left">
                        <div class="level-left">
                          <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                            <div class="user-avatar">
                              <img :src="attachImg(item.avatar)"/>
                            </div>
                            {{ item.alias }}
                          </router-link>

                          <span class="mr-1">
                        <i class="el-icon-date"/>{{ dayjs(item.createTime).format("YYYY/MM/DD") }}&nbsp;
                        </span>

                          <span class="is-hidden-mobile">
                          <i class="el-icon-view"/> {{ item.view }}
                        </span>
                        </div>
                      </div>
                    </nav>
                  </div>
                  <div style="position: absolute; left: 0; bottom: 0">
                    <span
                        v-for="(tag, index) in item.tags"
                        :key="index"
                        class="tag is-hidden-mobile is-success is-light mr-1"
                    >
                        <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                          {{ "#" + tag.name }}
                        </router-link>
                    </span>
                  </div>
                </div>
                <div class="media-right" style="margin-left: -100%; float: right">
                  <figure class="image is-128x128">
                    <img :src="attachImg(item.cover)" style="position: absolute; top: 0; bottom: 0; margin: auto"/>
                  </figure>
                </div>
              </div>
            </article>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!--分页-->
      <Pagination
          v-show="page.total > 0"
          :total="page.total"
          :page.sync="page.current"
          :limit.sync="page.size"
          @pagination="init"
      />
    </el-card>
  </div>
</template>

<script>
import {getList} from '@/api/post'
import Pagination from '@/components/Pagination'
import {attachImg} from "@/utils/attachImg";

export default {
  name: 'PostList',
  components: {
    Pagination
  },
  data() {
    return {
      attachImg: attachImg,
      activeName: 'latest',
      articleList: [],
      page: {
        current: 1,
        size: 5,
        total: 0,
        tab_name: 'latest'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getList(this.page.current, this.page.size, this.page.tab_name).then((response) => {
        console.log(response)
        const {data} = response
        this.page.current = data.current
        this.page.total = data.total
        this.page.size = data.size
        this.articleList = data.records
      })
    },
    handleClick() {
      this.page.tab_name = this.activeName
      this.page.current = 1
      this.init()
    }
  },
}
</script>

<style scoped>

.user-avatar img {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>