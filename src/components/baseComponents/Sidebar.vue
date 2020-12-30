<template>
  <div class="sidebar">
    <div class="sidebar-item" v-for="(value, key) in sidebarList" :key="key">
      <h3 @click="showList(value)">{{key}}</h3>
      <ul v-if="value.visibility">
        <router-link tag="li" :to="`/post/${item.id}`" v-for="(item, index) in value.list" :key="index">{{item.title}}</router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    sidebarList: Object
  },
  watch: {
    sidebarList () {
      const keys = Object.keys(this.sidebarList)
      keys.forEach(value => {
        this.sidebarList[value] = {
          visibility: false,
          list: this.sidebarList[value]
        }
      })
    }
  },
  methods: {
    showList (value) {
      const keys = Object.keys(this.sidebarList)
      keys.forEach(key => {
        this.sidebarList[key].visibility = false
      })
      value.visibility = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .sidebar{
    width:100%;
    background-color:white;
    padding:5px;
    .sidebar-item{
      width:100%;
      margin-top:1px;
      h3{
        width:100%;
        background-color:$header;
        padding:5px 10px;
        font-weight:normal;
        color:white;
        cursor:pointer;
      }
      ul{
        width:100%;
        li{
          width:100%;
          padding:5px 0 5px 15px;
          cursor:pointer;
        }
      }
    }
  }
</style>
