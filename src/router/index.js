import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import Home from '@/components/Home'
import Archive from '@/components/Archive'
import About from '@/components/About'
import Message from '@/components/Message'
import Links from '@/components/Links'
import Post from '@/components/Post'

import 'nprogress/nprogress.css'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/links',
      name: 'links',
      component: Links
    },
    {
      path: '/post/:id',
      name: 'post',
      component: Post
    }
  ]
})

NProgress.inc(0.2)
NProgress.configure({ showSpinner: true })

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(route => {
  NProgress.done()
})

export default router
