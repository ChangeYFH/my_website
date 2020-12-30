import vue from 'vue'
import messageComponent from './Message.vue'

// 使用Message.vue中的组件生成构造器
const MessageConstructor = vue.extend(messageComponent)

// 通过传入的参数生成”子类“，并设置绑定到哪个元素，以及何时取消绑定
function showMessage ({ text, type, duration = 2000 }) {
  const message = new MessageConstructor({
    el: document.createElement('div'),
    data () {
      return {
        type,
        text
      }
    }
  })

  document.body.appendChild(message.$el)

  setTimeout(() => {
    document.body.removeChild(message.$el)
  }, duration)
};

// 创建Message插件
const Message = {}

Message.install = function (Vue) {
  // 添加全局实例的方法
  Vue.prototype.$showMessage = showMessage
}

export default Message
