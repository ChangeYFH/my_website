<template>
  <div class="dropdown">
    <div class="dropdown-title" @click.stop="toggleVisible">  <!--需要将事件停止冒泡，否则会执行绑定到document上的close，导致无法显示列表-->
      <span>{{title}}</span>
      <slot name="title"></slot>
    </div>
    <div class="dropdown-list" v-show="isVisible" ref="dropdownList" @click="isVisible=false;">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    title: String,
    icon: String
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    toggleVisible () {
      this.isVisible = !this.isVisible
    },
    close (event, ele) {
      this.isVisible = false
    }
  },
  mounted () {
    document.addEventListener('click', this.close)
  },
  destroyed () {
    document.removeEventListener('click', this.close)
  }
}
</script>

<style lang="scss" scoped>
  .dropdown {
    height:100%;
    .dropdown-title {
      height:100%;
      display:flex;
      align-items: center;
      justify-content: center;
      cursor:pointer;
      padding:0 10px;
    }
  }
</style>
