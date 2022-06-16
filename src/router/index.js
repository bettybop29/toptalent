import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import DasboardView from  '@/views/DashboardView.vue'
import AddjobView from '@/views/AddjobView.vue'

import ActivationView from '@/views/ActivationView.vue'
import ExpiredSignup from '@/views/ExpiredSignup.vue'
import VerificationPassword from '@/views/VerificationPassword.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import ChangePasswordMobile from '@/views/ChangePasswordMobile.vue'
import ChangePassMobileSuccess from '@/views/ChangePassMobileSuccess.vue'

import ResetPass from '@/views/ResetPass.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import PostJobView from "@/views/PostjobView.vue"
import PostjobNew from '@/views/PostjobNew.vue'
import JobDetail from '../components/JobDetail.vue'
import AplicantDetail from '@/components/AplicantDetail.vue'
import ExpiredForgot from '@/views/ExpiredForgotView.vue'
import ApplicantDetailView from '@/views/ApplicantDetailView.vue'
import ApplicantJobComponent from '../components/ApplicantJobComponent.vue'
import jobsDetail from '@/views/jobsDetail.vue'
import PdfViewer from '@/views/PdfViewer.vue' 
import TestView from '@/views/TestView.vue'

Vue.use(VueRouter)

// const Authenticated = JSON.parse(localStorage.getItem(Authenticated)).value
// const Auth = JSON.parse(localStorage.getItem("Authenticated"))


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/testview',
    name: 'testview',
    component: TestView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DasboardView,
    meta: {
      auth: true,
    },
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
    path: '/jobsdetail/:id',
    name: 'jobsdetail',
    component: jobsDetail, 
  },
  {
    path: '/pdfviewer/:id',
    name: 'PdfViewer',
    component: PdfViewer, 
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      auth: false,
    },
    
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
    path: '/changepassmobile/:token',
    name: 'ChangePasswordMobile',
    component: ChangePasswordMobile, 
  },
  {
    path: '/change-pass-success',
    name: 'ChangePassMobileSuccess',
    component: ChangePassMobileSuccess, 
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
    path: '/addjobview',
    name: 'addjobview',
    component: AddjobView
  },
  {
    path: '/jobdetail/:id',
    name: 'jobdetail',
    component: JobDetail, 
  },
  {
    path: '/expiredforgot',
    name: 'ExpiredForgot',
    component: ExpiredForgot, 
  },
  {
    path: '/applicant-detail/:id',
    name: 'ApplicantDetailView',
    component: ApplicantDetailView, 
  },
  {
    path: '/applicant-job',
    name: 'ApplicantJobComponent',
    component: ApplicantJobComponent, 
  },
  
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// const Authenticated = false

router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.auth)) {
    
    // const isLoggedIn = await store.dispatch('user/isUserLoggon');
    const Auth = JSON.parse(localStorage.getItem("Authenticated"))
    if (!Auth) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => !record.meta.auth)) {
    if (Object.keys(to.meta).length > 0) {
      const Auth = JSON.parse(localStorage.getItem("Authenticated"))
      // const isLoggedIn = await store.dispatch('user/isUserLoggon');

      if (Auth) {
        next('/dashboard');
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
});




export default router
