<template>
  <div class="create-post">
    <div class="create-post-main">
      <form buttonName="发表文章" @submit="submit" >
        <div class="form-top">
          <select v-model="category">
            <option disabled value="">选择文章类型</option>
            <option v-for="(item, index) in categories" :key="index" :value="item.id">{{item.category_name}}</option>
          </select>
          <button type="submit" @click.prevent="submit">发布</button>
        </div>
        <input type="text" v-model="title" placeholder="输入文章标题"/>
        <div class="markdown">
          <textarea class="markdown-left" placeholder="输入文章内容..." v-model="content"></textarea>
          <div class="markdown-right" v-html="text"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
import highlight from 'highlight.js'

export default {
  name: 'CreatePost',
  data () {
    return {
      title: '',
      content: '',
      categories: [],
      category: ''
    }
  },
  mounted () {
    this.getCategories()
    // 如果url上有id，则是要进行修改(编辑)，所以要从数据库获取之前的数据，并填充到页面中
    if (this.$route.params.id) {
      axios.get(`/articles/${this.$route.params.id}`).then(res => {
        this.title = res.data.data.title
        this.content = res.data.data.content
        this.category = res.data.data.c_id
      })
    }
  },
  computed: {
    // 当content改变时，使用marked将content变为带标签的形式，并且在下一次DOM更新循环之后将code中的内容进行高亮
    text () {
      this.$nextTick(() => {
        document.querySelectorAll('pre code').forEach(ele => {
          highlight.highlightBlock(ele)
        })
      })
      return marked(this.content)
    }
  },
  methods: {
    submit () {
      // 验证输入是否正确
      if (!this.category) {
        this.$showMessage({ type: 'error', text: '请选择文章类型' })
        return
      }
      if (!this.title) {
        this.$showMessage({ type: 'error', text: '请输入文章标题' })
        return
      }
      if (!this.content) {
        this.$showMessage({ type: 'error', text: '请输入文章内容' })
        return
      }
      // 上传文章
      axios.post('/articles', {
        c_id: this.category,
        title: this.title,
        content: this.content
      }).then(res => {
        this.$showMessage({ type: 'success', text: '创建文章成功' })
        setTimeout(() => {
          this.$router.push(`/post/${res.data.data.id}`)
        }, 2000)
      })
    },

    // 获取所有的分类
    getCategories () {
      axios.get('/categories').then(res => {
        this.categories = res.data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .create-post{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:2;
    display: flex;
    justify-content: center;
    background-color:white;
    .create-post-main{
      width: 100%;
      flex-shrink: 1;
      form{
        width:100%;
        height:100%;
        display:flex;
        flex-direction: column;
        .form-top{
          select{
            height:40px;
            width:200px;
            font-size: 16px;
            outline: none;
            margin:10px;
            cursor: pointer;
          }
          button{
            background-color:$header;
            width:80px;
            height:40px;
            margin:10px;
            border:none;
            color:white;
            cursor: pointer;
            outline: none;
          }
        }
        input{
          padding:20px;
          font-size:20px;
          outline: none;
          border:none;
          border-bottom:1px solid #F1F1F1;
        }
        .markdown{
          width:100%;
          flex-grow:1;
          display:flex;
          .markdown-left{
            width:50%;
            height:100%;
            background-color:#FDFDFD;
            border:none;
            border-right:1px solid #F1F1F1;
            outline: none;
            padding:20px;
            font-size:18px;
            resize:none;
            font-family: Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro;
          }
          .markdown-right{
            width:50%;
            height:50%;
            background-color:white;
            padding:20px;
            font-size:18px;
            color:black;
            font-family: Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro;
          }
        }
      }
    }
  }
</style>
