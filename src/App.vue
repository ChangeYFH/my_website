<template>
  <div class="App">
    <global-header />
    <div class="view"> <!-- 由于router-view中的组件加载过慢，为了防止抖动，使用view元素提前占位 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <global-footer class="footer"/>
  </div>
</template>

<script>
import GlobalHeader from './components/GlobalHeader.vue'
import GlobalFooter from './components/GlobalFooter.vue'

export default {
  name: 'App',
  components: {
    GlobalHeader,
    GlobalFooter
  }
}
</script>

<style lang="scss" scoped>
  .view{
    // 为了当内容很少时footer依然在最下面
    min-height: calc(100vh - 100px);
  }
</style>
