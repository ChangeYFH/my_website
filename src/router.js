import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Post from './views/Post.vue'
import CreatePost from './views/CreatePost.vue'
import CreateUserInfo from './views/CreateUserInfo.vue'
import History from './views/History.vue'
import Collection from './views/Collection.vue'
import store from './store.js'// 需要直接引入store，使用this.$store不行，因为该文件并不是组件

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: Post
  },
  {
    path: '/createPost/:id',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/createUserInfo',
    name: CreateUserInfo,
    component: CreateUserInfo,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/history',
    name: History,
    component: History,
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/collection',
    name: Collection,
    component: Collection,
    meta: {
      requiredLogin: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 通过全局前置路由实现权限的管理
router.beforeEach((to, from, next) => {
  const isLogined = store.state.isLogined
  const token = localStorage.getItem('websiteToken')
  if (isLogined) {
    if (to.meta.redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  } else {
    if (token) {
      axios.defaults.headers.common.Authorization = token
      axios.get('user').then(res => {
        store.commit('setUser', res.data.data)
        if (to.meta.redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(() => {
        store.commit('clearUser')
        next('/login')
      })
    } else {
      if (to.meta.requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  }
})

export default router
