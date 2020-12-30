<template>
  <div class="comment" id="comment">
    <div class="create-comment">
      <form>
        <textarea placeholder="写下你的评论..." v-model="content" @click="verifyLogin"></textarea>
      </form>
      <button :disabled="disabled" @click="submit">发布</button>
    </div>
    <div class="comment-list">
      <h3>全部评论</h3>
      <ul>
        <li v-for="(item, index) in commentList" :key="index">
          <div class="user-info">
            <img :src="item.avatar" />
            <div class="user-info-content">
              <span class="user-name">{{item.nickname}}</span>
              <span class="create-time">{{item.created_time.slice(0,10)}}</span>
            </div>
          </div>
          <span>{{item.content}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import verifyLogin from '../mixins/verifyLogin.js'

export default {
  name: 'Comment',
  props: {
    id: String
  },
  mixins: [verifyLogin],
  data () {
    return {
      content: '',
      commentList: []
    }
  },
  computed: {
    disabled () {
      return this.content.length === 0
    }
  },
  watch: {
    id () {
      if (this.id) {
        this.getCommentList()
      }
    }
  },
  mounted () {
    this.getCommentList()
  },
  methods: {
    submit () {
      axios.post('/comments', { content: this.content, a_id: this.id }).then(res => {
        this.$showMessage({ type: 'success', message: '成功发送评论' })
        this.$router.go(0)
      }).catch(error => {
        console.log(error)
      })
    },
    getCommentList () {
      axios.get(`/comments/${this.id}`).then(res => {
        this.commentList = res.data.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .comment{
    width:100%;
    .create-comment{
      width:100%;
      position:relative;
      padding-bottom:40px;
      form{
        width:100%;
        display: flex;
        justify-content: center;
        textarea{
          width:100%;
          height:100px;
          resize:none;
          outline:none;
          padding:5px;
          font-size:16px;
          border-radius: 5px;
          background-color:#FBFBFB;
          border:1px solid $border;
        }
      }
      button{
        width:80px;
        height:30px;
        background-color: $header;
        border-radius:15px;
        border:none;
        color:white;
        position:absolute;
        right:0;
        margin-top:10px;
        outline: none;
        cursor: pointer;
      }
    }
    .comment-list{
      width:100%;
      h3{
        margin: 10px 0;
        font-weight:normal;
        border-left:3px solid $header;
        padding-left:10px;
      }
      ul{
        width:100%;
        li{
          width:100%;
          padding: 10px 0;
          border-bottom:1px solid #F0F0F0;
          .user-info{
            width:100%;
            margin:10px 0;
            display: flex;
            align-items: center;
            img{
              width:40px;
              height:40px;
              border-radius:20px;
            }
            .user-info-content{
              margin-left:10px;
              .user-name{
                display: block;
              }
              .create-time{
                display: block;
                font-size:12px;
                color:gray;
              }
            }
          }
          &>span{
            font-size:16px;
            line-height:24px;
          }
        }
      }
    }
  }
</style>
