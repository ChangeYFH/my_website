<template>
  <form>
    <slot name="default"></slot>
    <slot name="submit">
      <button type="submit" @click.prevent="submit">{{buttonName}}</button>
    </slot>
  </form>
</template>

<script>
export default {
  name: 'ValidateForm',
  props: {
    buttonName: {
      type: String,
      default: '提交'
    }
  },
  data () {
    return {
      validateList: []
    }
  },
  // 在created（validateInput是在mounted阶段触发的create-input事件）中监听create-input事件，可以保证先开始监听
  created () {
    // 每个ValidateInput创建时都会触发一个create-input事件，并将验证函数传递过来，所以将所有验证函数添加到validateList数组中
    document.addEventListener('create-input', (e) => {
      this.validateList.push(e.detail)
    })
  },
  methods: {
    // 如果所有验证函数都通过，则清空validateList并触发submit事件
    submit () {
      const allPassed = this.validateList.every(func => func())
      this.validateList = []
      if (allPassed) {
        this.$emit('submit')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
form{
  width:100%;
  button{
    width:100%;
    height:40px;
    background-color:#8ebce6;
    border:none;
    border-radius:5px;
    color:white;
    font-size:18px;
    outline: none;
    margin-top:40px;
    &:hover{
      background-color:#4d9de9 !important;
    }
  }
}
</style>
