// 混入验证登录的函数
const verifyLogin = {
  methods: {
    verifyLogin () {
      if (!this.$store.state.isLogined) {
        this.$showMessage({ text: '需要登录', type: 'error', duration: 1000 })
        this.$router.push('/login')
        return false
      } else {
        return true
      }
    }
  }
}

export default verifyLogin
