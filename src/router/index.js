import Vue from 'vue'
import VueRouter from 'vue-router'

import ApplicantJobComponent from '../components/ApplicantJobComponent.vue'
import UpdateProfile from '../components/UpdateProfile.vue'
import JobDetail from '../components/JobDetail.vue'
import AplicantDetail from '@/components/AplicantDetail.vue'

import DasboardView from  '@/views/DashboardView.vue'
import AddjobView from '@/views/AddjobView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'
import ApplicantDetailView from '@/views/ApplicantDetailView.vue'
import ResetPass from '@/views/ResetPass.vue'
import ChangePassword from '@/views/ChangePassword.vue'
import ExpiredForgot from '@/views/ExpiredForgotView.vue'
import jobsDetail from '@/views/jobsDetail.vue'
import PdfViewer from '@/views/PdfViewer.vue' 
import TestView from '@/views/TestView.vue'
import PostJobView from "@/views/PostjobView.vue"
import PostjobNew from '@/views/PostjobNew.vue'
import ActivationView from '@/views/ActivationView.vue'
import ExpiredSignup from '@/views/ExpiredSignup.vue'
import VerificationPassword from '@/views/VerificationPassword.vue'
import ChangePasswordMobile from '@/views/ChangePasswordMobile.vue'
import ChangePassMobileSuccess from '@/views/ChangePassMobileSuccess.vue'

Vue.use(VueRouter)

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
    component: AboutView,
    meta: {
      auth: true,
    },
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
    meta: {
      auth: true,
    },
  },
  {
    path: '/aplicantdetail/:id',
    name: 'aplicantdetail',
    component: AplicantDetail,
    meta: {
      auth: true,
    },
  },
  {
    path: '/jobsdetail/:id',
    name: 'jobsdetail',
    component: jobsDetail,
    meta: {
      auth: true,
    },
  },
  {
    path: '/pdfviewer/:id',
    name: 'PdfViewer',
    component: PdfViewer,
    meta: {
      auth: true,
    },
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
    component: PostjobNew,
    meta: {
      auth: true,
    },
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
    component: PostJobView,
    meta: {
      auth: true,
    },
  },
  {
    path: '/addjobview',
    name: 'addjobview',
    component: AddjobView,
    meta: {
      auth: true,
    },
  },
  {
    path: '/jobdetail/:id',
    name: 'jobdetail',
    component: JobDetail,
    meta: {
      auth: true,
    },
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
    meta: {
      auth: true,
    },
  },
  {
    path: '/applicant-job',
    name: 'ApplicantJobComponent',
    component: ApplicantJobComponent, 
    meta: {
      auth: true,
    },
  },
  
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to) {
    window.scrollTo(0,0);
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
      }
    }
  }
});


router.beforeEach(async (to, from, next) => {

  if (to.matched.some(record => record.meta.auth)) {
  
    const Auth = JSON.parse(sessionStorage.getItem("Authenticated"))
    if (!Auth) {
      next('/login');
    } else {
      next();
    }
  } else if (to.matched.some(record => !record.meta.auth)) {
    if (Object.keys(to.meta).length > 0) {
      const Auth = JSON.parse(sessionStorage.getItem("Authenticated"))
   
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
