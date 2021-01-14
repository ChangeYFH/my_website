<template>
  <div class="home">
    <div class="banner">
      <h1>记录每一次进步，每一点努力</h1>
    </div>
    <div class="content-container">
      <div class="content">
        <h2>我的项目</h2>
        <ul class="project-list">
          <li class="project" @click="gotoURL">
            <div class="img-container">
              <img src="https://website-1301851322.cos.ap-beijing.myqcloud.com/animal_crossing.png?imageMogr2/format/jpg/interlace/1">
            </div>
            <a>动物森友会攻略App</a>
            <article>通过该App可以按季节，地点，时间等条件来筛选动物森友会中的鱼类，昆虫，伙伴等。</article>
          </li>
        </ul>
        <h2>我的文章</h2>
        <lazyload @isBottom="getData" ref="lazyload">
          <ul class="article-list">
            <router-link tag="li" :to="`/post/${item.id}`" class="article" v-for="(item,index) in list" :key="index">
              <a class="article-title">{{item.title}}</a>
              <span>{{item.create_time.slice(0,10)}}</span>
              <div class="icon-container">
                <span class="iconfont icon-collect" :class="{'active': item.isCollected}" @click="triggerCollection(index, item.id)">{{item.numberCollection ? item.numberCollection : ''}}</span>
                <span class="iconfont icon-comment" @click="toComment(item.id)">{{item.numberComment ? item.numberComment : ''}}</span>
              </div>
            </router-link>
          </ul>
        </lazyload>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Lazyload from '../components/baseComponents/Lazyload/Lazyload.vue'
import verifyLogin from '../mixins/verifyLogin.js'

export default {
  name: 'Home',
  data () {
    return {
      list: [],
      page: 1
    }
  },
  components: {
    Lazyload
  },
  mixins: [verifyLogin],
  mounted () {
    this.getData()
  },
  methods: {
    triggerCollection (index, id) {
      if (this.verifyLogin()) {
        if (this.list[index].isCollected) {
          axios.delete(`/collections/${id}`).then(res => {
            this.list.splice(index, 1, Object.assign(this.list[index], { isCollected: false, numberCollection: this.list[index].numberCollection - 1 }))
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.post('/collections', { a_id: id }).then(res => {
            this.list.splice(index, 1, Object.assign(this.list[index], { isCollected: true, numberCollection: this.list[index].numberCollection + 1 }))
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    toComment (id) {
      this.$router.push(`/post/${id}?position=comment`)
    },
    getData () {
      axios.get(`/articles?page=${this.page}`).then(res => {
        this.list = this.list.concat(res.data.data)
        if (res.data.isEmpty) {
          this.$refs.lazyload.noMoreData()
        } else {
          this.page++
          this.$refs.lazyload.hide()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    gotoURL () {
      window.location.href = 'http://www.animalcrossing.yanfenghua.cn'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .banner {
    width:100%;
    height:70vh;
    background-color: $header;
    display: flex;
    justify-content: center;
    align-items:center;
    h1 {
      font-size:50px;
      color:white;
      text-align:center;
    }
  }
  .content-container{
    width:100%;
    display:flex;
    justify-content: center;
    .content {
      width:1000px;
      h2{
        width:100%;
        text-align:center;
        margin:10px 0;
        font-weight:normal;
      }
      .project-list {
        width:100%;
        display:flex;
        justify-content: center;
        flex-wrap:wrap;
        .project{
          width: 280px;
          height: 350px;
          border:1px solid $border;
          margin:12px;
          cursor: pointer;
          .img-container {
            width:100%;
            padding-top:60%;
            position:relative;
            img {
              width:100%;
              height:100%;
              vertical-align: bottom;
              position:absolute;
              top:0;
              left:0;
            }
          }
          a {
            display:block;
            font-weight:500;
            font-size:22px;
            margin:10px;
          }
          article{
            margin:10px;
            color:#696969;
            line-height:26px;
            word-break: break-all;
          }
        }
      }
      .article-list{
        width:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:0 10px;
        .article{
          width:100%;
          border:1px solid $border;
          margin:12px;
          cursor: pointer;
          .article-title {
            font-weight:500;
            font-size:22px;
            margin:10px;
            display:block;
          }
          span{
            margin:10px;
            font-size:12px;
          }
          .icon-container{
            span{
              display:inline-block;
              width:40px;
              height:24px;
              font-size:16px;
              color:$border;
              border:1px solid $border;
              line-height:24px;
              text-align:center;
              border-radius: 3px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .active{
    color: $header !important;
  }
</style>
