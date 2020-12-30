<template>
  <div class="signup">
    <validate-form class="validate-from" buttonName="注册" @submit="submit">
      <label for="email">邮箱地址</label>
      <validate-input  id="email" type="text" v-model="email" placeholder="请输入邮箱地址" :rules="emailRule" />
      <label for="nickName">昵称</label>
      <validate-input  id="nickName" type="text" v-model="nickName" placeholder="请输入昵称" :rules="nickNameRule" />
      <label for="password">密码</label>
      <validate-input id="password" type="password" v-model="password" placeholder="请输入密码" :rules="passwordRule" />
      <label for="rePassword">确认密码</label>
      <validate-input id="rePassword" type="password" v-model="rePassword" placeholder="请再次输入密码" :rules="rePasswordRule" />
    </validate-form>
  </div>
</template>

<script>
import ValidateForm from '../components/baseComponents/ValidateForm/ValidateForm.vue'
import ValidateInput from '../components/baseComponents/ValidateForm/ValidateInput.vue'
import axios from 'axios'

export default {
  name: 'Signup',
  components: {
    ValidateForm,
    ValidateInput
  },
  data () {
    return {
      email: '',
      nickName: '',
      password: '',
      rePassword: '',
      emailRule: [{ type: 'email', message: '请输入正确的邮箱号' }],
      nickNameRule: [{ type: 'required', message: '昵称不能为空' }],
      passwordRule: [{ type: 'required', message: '密码不能为空' }],
      rePasswordRule: [{ type: 'required', message: '密码不能为空' }, { type: 'custom', message: '两次密码输入不一致', callback: () => { return this.password === this.rePassword } }],
      from: null
    }
  },
  // 获取上一个页面的路径
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm._data.from = from.fullPath
    })
  },
  methods: {
    submit () {
      axios.post('/signup', {
        email: this.email,
        password: this.password,
        nickname: this.nickName
      }).then(res => {
        // 注册成功后进行登录
        axios.post('/login', {
          email: this.email,
          password: this.password
        }).then(res => {
          if (res.data.code === 200) {
            this.$store.commit('setUser', res.data.data.user)
            axios.defaults.headers.common.Authorization = res.data.data.token
            localStorage.setItem('websiteToken', res.data.data.token)
            window.location.href = `http://www.yanfenghua.cn${this.from}`
          } else {
            this.$showMessage({ type: 'error', text: res.data.message })
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(res => {
        this.$showMessage({ type: 'error', text: '账户注册失败' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .signup{
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
