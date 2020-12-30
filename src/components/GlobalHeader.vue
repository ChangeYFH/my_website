<template>
  <div class="header">
    <div class="content">
      <router-link to="/">闫锋华的网站</router-link>
      <div class="header-right">
        <div class="loginAndRegister" v-if="!$store.state.isLogined">
          <router-link to="/login">登录</router-link>
          <router-link to="/signup">注册</router-link>
        </div>
        <dropdown :title="`Hello! ${$store.state.user.nickname}`" v-else>
          <template v-slot:title><span class="icon-title iconfont icon-list"></span></template>
          <dropdown-item class="dropdown-item"><router-link to="/createUserInfo">个人资料</router-link></dropdown-item>
          <dropdown-item class="dropdown-item" v-if="$store.state.user.permission === '1'"><router-link to="/createPost">创建文章</router-link></dropdown-item>
          <dropdown-item class="dropdown-item"><router-link to="/collection">我的收藏</router-link></dropdown-item>
          <dropdown-item class="dropdown-item"><router-link to="/history">历史记录</router-link></dropdown-item>
          <dropdown-item class="dropdown-item"><a @click.prevent="logout">退出登录</a></dropdown-item>
        </dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from './baseComponents/Dropdown/Dropdown.vue'
import DropdownItem from './baseComponents/Dropdown/DropdownItem.vue'
export default {
  name: 'Header',
  components: {
    Dropdown,
    DropdownItem
  },
  methods: {
    logout () {
      this.$store.commit('clearUser')
      window.location.href = 'http://www.yanfenghua.cn'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .header {
    width:100%;
    height:60px;
    background-color: $header;
    display:flex;
    justify-content:center;
    position:sticky;
    top:0;
    z-index: 1;
    .content {
      width:1000px;
      height:100%;
      display:flex;
      justify-content:space-between;
      align-items:center;
      color:white;
      >a {
        font-size:24px;
        margin-left:10px;
        color:white;
      }
      .header-right {
        height:100%;
        display:flex;
        align-items: center;
        .loginAndRegister a{
          display:inline-block;
          width:60px;
          height:30px;
          border:1px solid white;
          border-radius:5px;
          background-color:$header;
          margin:0 6px;
          color:white;
          text-align: center;
          line-height:30px;
          &:hover {
            background-color: white;
            color:$header;
          }
        }
        .icon-title{
          margin-left:10px;
          font-size:20px;
        }
        .dropdown-item {
          height:40px;
          border:1px solid #DCDCDC;
          border-top:none;
          background-color: white;;
          a{
            display:block;
            width:100%;
            height:100%;
            text-align: center;
            line-height:40px;
          }
        }
      }
    }
  }
</style>
