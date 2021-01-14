<template>
  <div class="create-user-info">
    <div class="create-user-info-main">
      <h3>个人资料</h3>
      <validate-form buttonName="保存" @submit="submit">
        <div class="col">
          <label class="title">头像</label>
          <div class="right">
            <img :src="avatar"/>
            <upload @uploaded-success="uploadedSuccess" class="upload"></upload>
          </div>
        </div>
        <div class="col">
          <label class="title">性别</label>
          <div class="right">
            <input id="male" type="radio" value="male" v-model="sex" />
            <label for="male" class="m-10">男</label>
            <input id="female" type="radio" value="female" v-model="sex" />
            <label for="female">女</label>
          </div>
        </div>
        <div class="col">
          <label class="title">简介</label>
          <div class="right">
            <textarea placeholder="输入简介..." v-model="introduction"></textarea>
          </div>
        </div>
      </validate-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ValidateForm from '../components/baseComponents/ValidateForm/ValidateForm.vue'
import Upload from '../components/baseComponents/Upload.vue'

export default {
  name: 'CreateUserInfo',
  components: {
    ValidateForm,
    Upload
  },
  data () {
    return {
      // 从vuex中获取信息，如果没有则使用默认值
      sex: this.$store.state.user.sex || 'male',
      introduction: this.$store.state.user.introduction || '',
      avatar: this.$store.state.user.avatar + '?imageMogr2/format/jpg/interlace/1' || 'https://website-1301851322.cos.ap-beijing.myqcloud.com/default.png?imageMogr2/format/jpg/interlace/1'
    }
  },
  methods: {
    uploadedSuccess (url) {
      this.avatar = url
    },
    submit () {
      axios.put('/user', {
        sex: this.sex,
        introduction: this.introduction,
        avatar: this.avatar
      }).then(res => {
        this.$store.state.user.sex = this.sex
        this.$store.state.user.introduction = this.introduction
        this.$store.state.user.avatar = this.avatar
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .create-user-info{
    width:100%;
    display:flex;
    justify-content:center;
    .create-user-info-main{
      width:600px;
      flex-shrink:1;
      padding:10px;
      h3{
        margin: 10px 0;
        font-weight:normal;
        border-left:3px solid $header;
        padding-left:10px;
      }
      .col{
        width:100%;
        display:flex;
        align-items: center;
        border-bottom:1px solid $border;
        padding:16px;
        .title{
          display:block;
          width:100px;
          font-size:16px;
        }
        .right{
          width: calc( 100% - 100px );
          textarea{
            width:100%;
            height:80px;
            resize: none;
            outline: none;
            padding:10px;
            font-size:16px;
            border: 1px solid $border;
          }
        }
      }
      img{
        width:80px;
        height:80px;
        vertical-align:bottom;
        font-size:0;
        display:inline-block;
      }
      .upload{
        margin-left: 10px;
      }
    }
  }
  .m-10{
    margin-right:20px;
  }
</style>
