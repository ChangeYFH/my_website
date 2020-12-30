<template>
  <div class="App">
    <global-header />
    <keep-alive>
      <router-view class="view"></router-view>
    </keep-alive>
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
    min-height: calc(100vh - 110px);
  }
</style>
