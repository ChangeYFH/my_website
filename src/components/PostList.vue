<template>
  <div class="recommend">
    <h3 v-if="title">{{title}}</h3>
    <lazyload @isBottom="isBottom" ref="lazyload">
      <ul>
        <router-link tag="li" :to="`/post/${item.id}`" v-for="(item, index) in list" :key="index">
          <h4>{{item.title}}</h4>
          <p>{{item.create_time.slice(0,10)}}</p>
          <div class="icon-container">
            <span class="iconfont icon-collect" :class="{'active': item.isCollected}" @click.stop="triggerCollection(index, item.id)">{{item.numberCollection ? item.numberCollection : ''}}</span>
            <span class="iconfont icon-comment" @click.stop="toComment(item.id)">{{item.numberComment ? item.numberComment : ''}}</span>
          </div>
        </router-link>
      </ul>
    </lazyload>
  </div>
</template>

<script>
import axios from 'axios'
import Lazyload from '../components/baseComponents/Lazyload/Lazyload.vue'
import verifyLogin from '../mixins/verifyLogin.js'

export default {
  components: { Lazyload },
  mixins: [verifyLogin],
  name: 'PostList',
  props: {
    title: String,
    list: Array
  },
  methods: {
    triggerCollection (index, id) {
      if (this.verifyLogin()) {
        if (this.list[index].isCollected) {
          axios.delete(`/collections/${id}`).then(res => {
            // 删除收藏成功后，将那一项的isCollected置为false，将numberCollection减一，由于改变数组的某一项时页面的数据不会响应，所以使用splice
            this.list.splice(index, 1, Object.assign(this.list[index], { isCollected: false, numberCollection: this.list[index].numberCollection - 1 }))
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.post('/collections', { a_id: id }).then(res => {
            // 添加收藏成功后，将那一项的isCollected置为true，将numberCollection加一，由于改变数组的某一项时页面的数据不会响应，所以使用splice
            this.list.splice(index, 1, Object.assign(this.list[index], { isCollected: true, numberCollection: this.list[index].numberCollection + 1 }))
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    toComment (id) {
      // 通过url传递参数，告诉Post页面需要跳转到comment锚点
      this.$router.push(`/post/${id}?position=comment`)
    },
    isBottom () {
      // 当Lazyload组件触发isBottom事件时，将该事件继续向上触发，从而使得父组件继续请求数据
      this.$emit('isBottom')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .recommend{
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
        h4{
          font-size:20px;
          font-weight:normal;
          margin-bottom:10px;
          cursor: pointer;
          &:hover{
            text-decoration: underline;
          }
        }
        p{
          font-size:12px;
          margin-bottom:8px;
        }
        .icon-container{
          span{
            display:inline-block;
            width:40px;
            height:24px;
            font-size:16px;
            color:$border;
            border:1px solid $border;
            line-height:24px;
            text-align:center;
            border-radius: 3px;
            cursor: pointer;
            margin-right:20px;
          }
        }
      }
    }
  }
  .active{
    color: $header !important;
  }
</style>
