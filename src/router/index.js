import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DasboardView from  '@/views/DashboardView.vue'
import PostjobView from '@/views/PostjobView.vue'
import ActivationView from '@/views/ActivationView.vue'
import ExpiredSignupView from '@/views/ExpiredSignupView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DasboardView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/postjob',
    name: 'postjob',
    component: PostjobView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView
  },
  {
    path: '/activation',
    name: 'activation',
    component: ActivationView
  },
  {
    path: '/expiredsignup',
    name: 'ExpiredSignupView',
    component: ExpiredSignupView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
