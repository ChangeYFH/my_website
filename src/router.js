import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Home from './views/Home.vue'
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
    component: () => import('./views/Login.vue'),
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('./views/Signup.vue'),
    meta: {
      redirectAlreadyLogin: true
    }
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('./views/Post.vue')
  },
  {
    path: '/createPost/:id',
    name: 'CreatePost',
    component: () => import('./views/CreatePost.vue')
  },
  {
    path: '/createPost',
    name: 'CreatePost',
    component: () => import('./views/CreatePost.vue')
  },
  {
    path: '/createUserInfo',
    name: 'CreateUserInfo',
    component: () => import('./views/CreateUserInfo.vue'),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('./views/History.vue'),
    meta: {
      requiredLogin: true
    }
  },
  {
    path: '/collection',
    name: 'Collection',
    component: () => import('./views/Collection.vue'),
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
