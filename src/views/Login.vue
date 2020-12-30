<template>
  <div class="login">
    <validate-form class="validate-from" buttonName="登录" @submit="submit">
      <label for="email">邮箱地址</label>
      <validate-input  id="email" type="text" v-model="email" placeholder="请输入邮箱地址" :rules="emailRule" />
      <label for="password">密码</label>
      <validate-input id="password" type="password" v-model="password" placeholder="请输入密码" :rules="passwordRule" />
    </validate-form>
  </div>
</template>

<script>
import axios from 'axios'
import ValidateForm from '../components/baseComponents/ValidateForm/ValidateForm.vue'
import ValidateInput from '../components/baseComponents/ValidateForm/ValidateInput.vue'

export default {
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  // 记录上一个页面的路径
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._data.from = from.fullPath
    })
  },
  data () {
    return {
      email: '',
      password: '',
      emailRule: [{ type: 'email', message: '请输入正确的邮箱号' }],
      passwordRule: [{ type: 'required', message: '密码不能为空' }],
      from: null
    }
  },
  methods: {
    submit () {
      axios.post('/login', {
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.code === 200) {
          // 将用户信息添加到vuex中
          this.$store.commit('setUser', res.data.data.user)
          // 将token放到头部Authorization中
          axios.defaults.headers.common.Authorization = res.data.data.token
          // 将token保存在localStorage中，方便下次访问时使用
          localStorage.setItem('websiteToken', res.data.data.token)
          // 跳转到登录之前的页面
          window.location.href = `http://www.yanfenghua.cn${this.from}`
        } else {
          this.$showMessage({ type: 'error', text: res.data.message })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    display:flex;
    justify-content: center;
    align-items: center;
    .validate-from{
      width:300px;
      label{
        display:block;
        margin-top:20px;
        font-size:18px;
      }
    }
  }
</style>
