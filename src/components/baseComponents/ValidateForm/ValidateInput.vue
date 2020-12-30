<template>
  <div class="validate-input-container">
    <textarea v-if="type==='textarea'" :class="{'error':message}" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="validate" v-bind="$attrs"></textarea>
    <input v-else :type="type" :class="{'error':message}" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" @blur="validate" v-bind="$attrs"/>
    <span v-if="message" >{{message}}</span>
  </div>
</template>

<script>
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default {
  name: 'ValidateInput',
  props: {
    modelValue: String,
    rules: Array,
    type: String
  },
  data () {
    return {
      message: ''
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  inheritAttrs: false,
  methods: {
    validate: function () {
      if (this.rules) {
        return this.rules.every(rule => {
          let passed = true
          switch (rule.type) {
            case 'email':
              passed = emailReg.test(this.modelValue)
              break
            case 'required':
              passed = this.modelValue.length !== 0
              break
            case 'custom':
              passed = rule.callback()
              break
          }
          if (!passed) {
            this.message = rule.message
          } else {
            this.message = ''
          }
          return passed
        })
      }
    }
  },
  mounted () {
    const self = this
    if (this.rules) {
      // 由于validateForm和validateInput并不是父子组件的关系，所以触发事件不能用$emit的方式
      document.dispatchEvent(new CustomEvent('create-input', { detail: self.validate }))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';
  .validate-input-container{
    width:100%;
    // 为了防止出现错误提示时元素抖动，所以用padding预留出位置
    position:relative;
    padding-bottom:21px;
    input {
      width:100%;
      height:40px;
      border: 1px solid $border;
      border-radius: 5px;
      outline: none;
      padding:0 5px;
      font-size:18px;
      &:focus{
        box-shadow:0 0 0 3px #86bae6;
      }
    }
    textarea{
      width:100%;
      resize: none;
      border: 1px solid $border;
      border-radius: 5px;
      outline: none;
      padding: 5px;
      font-size:18px;
      &:focus{
        box-shadow:0 0 0 3px #86bae6;
      }
    }
    span {
      width:100%;
      color:#DC143C;
      // 用相对定位确定错误提示的位置
      position:absolute;
      bottom:0;
      left:0;
    }
  }
  .error {
    border:1px solid #DC143C !important;
    &:focus{
      box-shadow:0 0 0 3px #ee9eae !important;
    }
  }
</style>
