<template>
  <div>
    <Header/>
    <div class="container" style="margin-top: 90px">
      <el-card>
        <div slot="header" class="clearfix">
          检索到 <code>{{ list.length }}</code>
          条关于 <code class="has-text-info">{{ query.keyword }}</code> 的记录
        </div>
        <div>
          <article v-for="(item, index) in list" :key="index" class="media">
            <div style="width: 100%; height: 100%; position: relative;">
              <!--                <div class="media-left"/>-->
              <div style="position: absolute; left: 0; bottom: 0; font-size: 15px">
                  <span class="is-hidden-mobile">
                    <i class="el-icon-view"/> {{ item.view }}
                  </span>
                <span class="is-hidden-mobile" style="margin-left: 15px">
                    <router-link :to="{name:'post-detail',params:{id:item.id}}">
                      <i class="el-icon-chat-dot-square"/> {{ item.comments === 0 ? '评论' : item.comments }}
                    </router-link>
                  </span>
                <span class="is-hidden-mobile" style="margin-left: 15px">
                    <router-link :to="{name:'post-detail',params:{id:item.id}}">
                      <i class="el-icon-collection-tag"/> {{ item.collects === 0 ? '' : item.collects }}
                    </router-link>
                  </span>
                <span
                    v-for="(tag, index) in item.tags"
                    :key="index"
                    class="tag is-hidden-mobile is-success is-light mr-1"
                    style="margin-left: 15px"
                >
                      <router-link :to="{ name: 'tag', params: { name: tag.name } }">
                        {{ "#" + tag.name }}
                      </router-link>
                  </span>
              </div>

              <div class="media-content" style="float: left">
                <div>
                  <nav class="level has-text-grey is-mobile  is-size-6">
                    <div class="level-left">
                      <div class="level-left">
                        <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">
                          <div class="user-avatar">
                            <img :src="attachImg(item.avatar)"/>
                          </div> &nbsp;
                          {{ item.alias }}
                        </router-link>
                        <div class="is-size-7">
                            <span class="mr-1">
                              <i class="el-icon-date"/>{{ dayjs(item.createTime).format("YYYY/MM/DD") }}&nbsp;
                            </span>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>
                <div style="margin-top: 10px; margin-bottom: 10px">
                  <p class="ellipsis is-ellipsis-1">
                    <router-link :to="{name:'post-detail',params:{id:item.id}}">
                      <!--                          &emsp;&emsp;&nbsp;-->
                      <span class="is-size-5" style="font-weight: bold">{{ item.title }}</span>
                    </router-link>
                  </p>
                </div>
                <div class="has-text-grey">
                    <span class="is-size-6">
                      {{ item.summary }}
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
        </div>

        <pagination
            v-show="query.total > 10"
            :total="query.total"
            :page.sync="query.pageNum"
            :limit.sync="query.pageSize"
            @pagination="fetchList"
        />
      </el-card>
    </div>
    <Footer id="footer"/>
  </div>
</template>

<script>
import { searchByKeyword } from '@/api/search'
import Pagination from '@/components/Pagination'
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {attachImg} from "@/utils/attachImg";

export default {
  name: 'Search',
  components: {Footer, Header, Pagination },
  data() {
    return {
      attachImg,
      list: [],
      query: {
        keyword: this.$route.query.key,
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      searchByKeyword(this.query).then(value => {
        const { data } = value
        this.list = data.records
        this.query.total = data.total
        this.query.pageSize = data.size
        this.query.pageNum = data.current
      })
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
.user-avatar img {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>