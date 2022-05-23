import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DasboardView from  '@/views/DashboardView.vue'

import ActivationView from '@/views/ActivationView.vue'
import ExpiredSignup from '@/views/ExpiredSignup.vue'
import VerificationPassword from '@/views/VerificationPassword.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import ResetPass from '@/views/ResetPass.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import PostJobView from "@/views/PostjobView.vue"
import PostjobNew from '@/views/PostjobNew.vue'
import JobDetail from '../components/JobDetail.vue'
import AplicantDetail from '@/components/AplicantDetail.vue'
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
    path: '/updateprofile/:id',
    name: 'updateprofile',
    component: UpdateProfile, 
  },
  {
    path: '/aplicantdetail/:id',
    name: 'aplicantdetail',
    component: AplicantDetail, 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/postjobnew',
    name: 'postjobnew',
    component: PostjobNew
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
    name: 'ExpiredSignup',
    component: ExpiredSignup
  },
  {
    path: '/verificationpassword',
    name: 'VerificationPassword',
    component: VerificationPassword
  },
  {
    path: '/changepassword/:token',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/resetpass',
    name: 'ResetPass',
    component: ResetPass
  },
  {
    path: '/postjobview',
    name: 'postjobview',
    component: PostJobView
  },
  {
    path: '/jobdetail/:id',
    name: 'jobdetail',
    component: JobDetail, 
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
