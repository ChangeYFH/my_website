<template>
  <div class="history">
    <div class="history-main">
      <post-list title="历史记录" :list="list" @isBottom="getData" ref="postList"/>
    </div>
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import axios from 'axios'

export default {
  name: 'History',
  components: {
    PostList
  },
  data () {
    return {
      list: [],
      page: 1
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get(`/history?page=${this.page}`).then(res => {
        this.list = this.list.concat(res.data.data)
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
  }
}
</script>

<style lang="scss" scoped>
  .history{
    width:100%;
    display: flex;
    justify-content: center;
    .history-main{
      width:1000px;
      flex-shrink:1;
      padding:20px 10px 0 10px;
    }
  }
</style>
