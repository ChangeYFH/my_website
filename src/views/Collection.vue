<template>
  <div class="collection">
    <div class="collection-main">
      <post-list title="我的收藏"  :list="list" @isBottom="getData" ref="postList" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import PostList from '../components/PostList.vue'

export default {
  name: 'Collection',
  components: {
    PostList
  },
  data () {
    return {
      list: [],
      page: 1
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      axios.get(`/history?page=${this.page}`).then(res => {
        this.list = this.list.concat(res.data.data)
        if (res.data.isEmpty) {
          // 如果isEmpty为true说明后面没有数据了，所以使用Lazyload组件的noMoreData函数，解除scroll上绑定的函数
          this.$refs.postList.$refs.lazyload.noMoreData()
        } else {
          // 如果isEmpty为false说明后面还有数据，所以将page+1(为了下一次获取数据)，使用hide函数隐藏loading图标
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
  .collection{
    width:100%;
    display: flex;
    justify-content: center;
    .collection-main{
      width:1000px;
      flex-shrink:1;
      padding:20px 10px 0 10px;
    }
  }
</style>
