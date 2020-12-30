<template>
  <div class="lazyload">
    <slot></slot>
    <div class="loading" v-if="isLoading">
      <img src="./loading.gif"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lazyload',
  data () {
    return {
      isLoading: false
    }
  },
  mounted () {
    // 在下次 DOM 更新循环结束之后绑定scroll事件，防止页面数据还没加载好就触发scroll绑定的事件
    this.$nextTick(() => {
      window.addEventListener('scroll', this.show)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.show)
  },
  methods: {
    // 要绑定到scroll上的事件
    show () {
      const windowHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // 当距离页面底部还有30px时显示loading图标并触发isBottom事件
      if (document.body.clientHeight - windowHeight - scrollTop < 30) {
        this.isLoading = true
        this.$emit('isBottom')
      }
    },
    // 留给父元素调用的隐藏loading图标的函数
    hide () {
      this.isLoading = false
    },
    // 留给父元素调用的结束loading的函数(隐藏loading图标，解除scroll绑定的事件)
    noMoreData () {
      this.isLoading = false
      window.removeEventListener('scroll', this.show)
    }
  }
}
</script>

<style lang="scss" scoped>
  .lazyload {
    width:100%;
    .loading{
      width:100%;
      display:flex;
      justify-content: center;
      img{
        width:80px;
        height:80px;
      }
    }
  }
</style>
