import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/CreateContent',
    name: 'CreateContent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/CreateContentPage.vue')
  },
  {
    path: '/CreateContent/:id',
    name: 'CreateContent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/CreateContentPage.vue')
  },
  {
    path: '/article/:id',
    name: ':id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/article/_article.vue')
  },
  {
    path: '/ShowContent',
    name: 'ShowContent',
    
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/ShowContent.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
