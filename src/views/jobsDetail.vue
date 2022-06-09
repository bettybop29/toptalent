<template>
  <div>
      <sidebarcomponent></sidebarcomponent>
      <nav-mobile/>

      <div class="container p-4">
          <button class="btn" onclick="javascript:window.history.back();">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
              go back
          </button>
          <div class="row justify-content-between sticky-top bg-white" style="border-bottom: 5px solid whitesmoke;">
              
            <div class="col-md-1 mt-3">
                <img v-if="detail.recruiterImage != null" :src="'http://54.255.4.75:9091/resources/'+ detail.recruiterImage"  alt="..." width="200px">
                <img v-else src="http://54.255.4.75:9091/resources/r5jr7e3qf8f5uhr.png"  alt="..." width="200px">                
            </div>
            <div class="col-md-6">
                <h2 class="jobtitle">{{detail.jobName}} <span>({{detail.jobPosition}})</span></h2>
                <h3 class="jobmediumtitle">{{userName}}</h3>
                <p class="jobtext text-muted">Rp.{{formatPrice(detail.jobSalary)}},-</p>
                <p class="jobtext text-muted">{{detail.jobAddress}}</p>
                <p class="jobtext text-muted">Post on {{detail.createdAt}}</p>
            </div>
            <div class="col-md-3 mt-5">
                <button class="btn btn-outline-primary jobicn">
                    <img class="me-2" src="../assets/icon-postjob/pencil.svg" alt="">
                    Edit Job Post
                </button> 
            </div>
          </div>
        <div class="row p-4" style="border-bottom: 5px solid whitesmoke;">
            <div class="col">
                <h4 class="jobabout mb-4">About the job</h4>
                <h5 class="jobabout">Job Requirement:</h5>
                <p class="jobtext ms-5" v-html="detail.jobRequirement"></p>
                <h5 class="jobabout">Job Description:</h5>
                <p class="jobtext ms-5" v-html="detail.jobDesc"></p>
            </div>
        </div>
        <div class="row p-4" >
            <div class="col">
                <h4 class="jobabout">About the company</h4>
                <p class="jobtext mb-4">{{recruiter.recruiterDesc}}</p>
                <h5 class="jobabout">Staff</h5>
                <p class="jobtext mb-4">{{recruiter.recruiterStaff}}</p>
                <h5 class="jobabout">Industry</h5>
                <p class="jobtext mb-4">{{recruiter.recruiterIndustry}}</p>
                <h5 class="jobabout">Culture</h5>
                <p class="jobtext mb-4" v-html="recruiter.recruiterCulture"></p>
                <h5 class="jobabout">Benefit</h5>
                <p class="jobtext mb-4" v-html="recruiter.recruiterBenefit"></p>
                <h5 class="jobabout">Address</h5>
                <p class="jobtext mb-3">{{recruiter.recruiterAddress}}</p>
                
                <a href="https://google.com"><img class="me-2 socmed" src="../assets/icon-postjob/job-fb.svg" alt=""></a>
                <img class="me-2 socmed" src="../assets/icon-postjob/job-linkedin.svg" alt="">
                <img class="me-2 socmed" src="../assets/icon-postjob/job-ig.svg" alt="">
                <img class="me-2 socmed" src="../assets/icon-postjob/job-web.svg" alt="">
            </div>
        </div>


      </div>
        
      
  </div>
</template>

<script>
import axios from 'axios'
import sidebarcomponent from '@/components/SidebarComponent.vue'
import NavMobile from '../components/NavMobile.vue'
export default {
    name:'jobsDetail',
    components:{
        sidebarcomponent,
        NavMobile  
    },
    data(){
        return{
            detail:[],
            userName:'',
            recruiter:[]
        }
    },
    methods:{
        formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
        async getDetailJob(){
            await axios.get(`http://54.255.4.75:9091/api/v1/job/` +  this.$route.params.id)
            .then((data)=>{
                this.detail = data.data.data
                console.log(this.detail)
            })
        },
        async getRecruiter(){
             const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
            await axios.get(`http://54.255.4.75:9091/api/v1/auth/recruiter/${recruiterId}`)
            .then((data)=>{
                this.recruiter = data.data
                console.log(this.recruiter)
            })
        }
    },
    mounted(){
        this.getRecruiter();
        this.getDetailJob();
        // get company name 
        const user = JSON.parse(localStorage.getItem("user-info")).recruiterCompany
        this.userName = user
        console.log(this.userName)
    }
}
</script>

<style scoped>
    .container{
        margin-left: 250px;
    }
    .jobicn{
        width: 200px;
    }
    .jobtitle{
        font-weight: 600;
    }
    .jobtext{
        margin-bottom: 0;
    }
    .jobabout{
        font-weight: 600;
    }
    .jobtext{
        font-weight: 500;
    }
    .socmed:hover{
        border-radius: 50%;
        background: blue;
        color: inherit
    }

    /* BREAKPOINTS */
    /* MOBILE */
    @media only screen and (max-width: 576px){
        .container{
        margin-left: 0;
        margin-top: 60px;
    }
    }
</style>