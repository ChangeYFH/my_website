<template>
  <div class="post">
    <div class="post-main">
      <div class="left">
        <sidebar :sidebarList="sidebarList"></sidebar>
      </div>
      <div class="center">
        <svg v-show="!content" class="load" viewBox="25 25 50 50">
            <circle class="loading" cx="50" cy="50" r="20" fill="none" />
        </svg>
        <div v-show="content" class="article-and-comment">
          <h2>{{title}}</h2>
          <router-link tag="span" :to="`/createPost/${$route.params.id}`" v-if="$store.state.user.permission==='1'" >编辑</router-link>
          <span @click="deleteArticle" v-if="$store.state.user.permission==='1'">删除</span><br>
          <span>{{createdTime.slice(0,10)}}</span><br>
          <article v-html="content"></article>
          <comment :id="$route.params.id"></comment>
        </div>
        <div v-show="content" class="recommend">
          <post-list title="推荐阅读" :list="recommendList" @isBottom="getRecommendList" ref="postList"/>
        </div>
      </div>
      <div class="collect-btn iconfont icon-collect" @click="triggerCollection" :class="{'active': isCollected}"></div>
      <div class="comment-btn iconfont icon-comment" @click="scrollToComment"></div>
    </div>
    <div class="bottom-btn">
      <div class="iconfont icon-collect" @click="triggerCollection" :class="{'active': isCollected}"></div>
      <div class="iconfont icon-comment" @click="scrollToComment"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Sidebar from '../components/baseComponents/Sidebar.vue'
import Comment from '../components/Comment.vue'
import PostList from '../components/PostList.vue'
import marked from 'marked'
import verifyLogin from '../mixins/verifyLogin.js'

export default {
  name: 'Post',
  components: {
    Sidebar,
    Comment,
    PostList
  },
  mixins: [verifyLogin],
  data () {
    return {
      sidebarList: null,
      title: '',
      createdTime: '',
      content: '',
      isCollected: false,
      recommendList: [],
      c_id: null,
      page: 1
    }
  },
  watch: {
    // 改变路由时触发下面的程序
    $route () {
      if (this.$route.name === 'Post') { // 防止返回home时改变路由，从而触发下面的函数
        this.content = null
        window.scrollTo(0, 0)
        this.recommendList = []
        // 获取文章内容后再获取推荐文章列表，因为获取推荐文章列表时需要c_id
        this.getPost().then(() => {
          this.getRecommendList()
        })
        // 添加阅读记录到数据库
        this.addHistory()
        // 获取侧边栏数据
        this.getSidebarList()
      }
    }
  },
  created () {
    this.getPost().then(() => {
      this.getRecommendList()
    })
    this.addHistory()
    this.getSidebarList()
  },
  methods: {
    // 获取文章数据
    getPost () {
      const id = this.$route.params.id
      return axios.get(`/articles/${id}`).then(res => {
        this.title = res.data.data.title
        this.createdTime = res.data.data.create_time
        this.isCollected = res.data.data.isCollected
        this.c_id = res.data.data.c_id
        // 将content内容变为带标签的形式
        this.content = marked(res.data.data.content)
        // 在下一次DOM更新循环之后将code中的内容高亮化
        this.$nextTick(() => {
          document.querySelectorAll('pre code').forEach(ele => {
            window.hljs.highlightBlock(ele)
          })
        })
        // 如果url中有参数position且值为comment则活动到comment处
        if (this.$route.query.position === 'comment') {
          setTimeout(() => {
            this.scrollToComment()
          }, 100)
        }
      })
    },
    // 获取侧边栏数据
    getSidebarList () {
      axios.get('/postByCategory').then(res => {
        this.sidebarList = res.data
      })
    },
    // 添加阅读历史到数据库
    addHistory () {
      if (this.$store.state.user.isLogined) {
        const id = this.$route.params.id
        axios.post('/history', { a_id: id }).catch(error => {
          console.log(error)
        })
      }
    },
    // 添加收藏获取取消收藏
    triggerCollection () {
      if (this.verifyLogin()) {
        const id = this.$route.params.id
        if (this.isCollected) {
          axios.delete(`/collections/${id}`).then(res => {
            this.isCollected = false
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.post('/collections', { a_id: id }).then(res => {
            this.isCollected = true
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    // 获取推荐列表
    getRecommendList () {
      if (this.c_id) { // 防止还未获取文章数据时就触发该事件(onscroll会在获取数据成功前触发)
        axios.get(`/recommends?c_id=${this.c_id}&a_id=${this.$route.params.id}&page=${this.page}`).then(res => {
          this.recommendList = this.recommendList.concat(res.data.data)
          if (res.data.isEmpty) {
            this.$refs.postList.$refs.lazyload.noMoreData()
          } else {
            this.page++
            this.$refs.postList.$refs.lazyload.hide()
          }
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 滑动到comment附近
    scrollToComment () {
      document.querySelector('#comment').scrollIntoView(true)
      window.scrollBy(0, -100)
    },
    // 删除文章
    deleteArticle () {
      axios.delete(`/articles/${this.$route.params.id}`).then(() => {
        this.$showMessage({ type: 'success', text: '成功删除文章', duration: 1000 })
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .post {
    width:100%;
    min-height:calc(100vh - 100px);
    display:flex;
    background-color:#f8f8f8;
    justify-content: center;
    .post-main{
      flex-shrink:1;
      display:flex;
      justify-content: flex-end;
      padding:10px;
      flex-basis: 1200px;
      margin-right:60px;// 给按钮的位置，当按钮显示时取消该margin
      .center{
        flex-grow:1;
        .article-and-comment{
          background-color:white;
          padding:30px;
          border-radius:8px;
          h2{
            font-size:30px;
            font-weight:normal;
          }
          span{
            margin:10px 10px 10px 0;
            display:inline-block;
            color:gray;
            cursor: pointer;
          }
          & span:last-of-type { // 将最后一个span标签的cursor形态恢复为默认状态
            cursor: auto;
          }
          article{
            width:100%;
            line-height:30px;
            margin-bottom:40px;
            word-break: break-all;
          }
        }
        .recommend{
          margin-top:20px;
          background-color:white;
          padding:30px;
          border-radius:8px;
        }
        img{
          width:80px;
          height:80px;
        }
      }
      .left{
        flex-shrink: 0;
        width:260px;
        border-radius:8px;
        margin-right:20px;
      }
    }
    .collect-btn{
      width:40px;
      height:40px;
      border-radius: 20px;
      background-color:white;
      position:fixed;
      top:300px;
      line-height:40px;
      text-align:center;
      font-size:20px;
      color: $border;
      cursor:pointer;
      margin-right:-60px;
      &:hover{
        box-shadow: 0 0 8px 0 #CFCFCF;
      }
    }
    .comment-btn{
      width:40px;
      height:40px;
      border-radius: 20px;
      background-color:white;
      position:fixed;
      top:360px;
      line-height:40px;
      text-align:center;
      font-size:20px;
      color: $border;
      cursor:pointer;
      margin-right:-60px;
      &:hover{
        box-shadow: 0 0 8px 0 #CFCFCF;
      }
    }
  }
  .bottom-btn{
    display:none;
  }
  .active{
    background-color:$header !important;
    color:white !important;
  }
  @media screen and (max-width: 1250px) {
    .left{
      display: none !important;
    }
  }
  @media screen and (max-width: 900px) {
    .post-main {
      margin-right: 0 !important;
    }
    .collect-btn,.comment-btn{
      display: none !important;
    }
    .bottom-btn{
      width:100%;
      height:40px;
      background-color:$header;
      position:fixed;
      bottom:0;
      justify-content: space-between;
      display:flex;
      div {
        height:40px;
        border-top:1px solid $border;
        flex-grow: 1;
        display: inline-block;
        background-color:white;
        line-height: 40px;
        text-align: center;
        font-size:26px;
        color:$border;
      }
      & div:first-child {
        border-right:1px solid $border;
      }
    }
    article{
      width:calc(100vw - 80px) !important;
    }
  }
  @keyframes dash {
   0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 130, 200;
      stroke-dashoffset: -50;
    }
    100% {
      stroke-dasharray: 130, 200;
      stroke-dashoffset: -188;
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .load {
    position:absolute;
    left: 50%;
    top:50%;
    margin-left: -40px;
    margin-top:-40px;
    width: 80px;
    height: 80px;
    animation: rotate 2s linear infinite;
  }
  .loading {
      stroke: rgb(53, 157, 218);
      stroke-width: 5;
      fill: none;
      animation: dash 1.5s linear infinite;
  }
</style>
