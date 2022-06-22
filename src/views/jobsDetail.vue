

<template>
  <div>
      <sidebarcomponent></sidebarcomponent>
      <nav-mobile/>

      <div class="container p-4">
          <button class="btn" onclick="javascript:window.history.back()">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
              go back
          </button>
          <div class="row bg-white pb-3" style="border-bottom: 5px solid whitesmoke;">
              
            <div class="col-md-2 mt-3">
                <img v-if="detail.recruiterImage != null" :src="'https://toptalentapp.com:9091/resources/'+ detail.recruiterImage"  alt="..." width="100%">
                <img class="img-fluid" v-else src="https://toptalentapp.com:9091/resources/r5jr7e3qf8f5uhr.png"  alt="..." >                
            </div>
            <div class="col-md-6">
                <h2 class="jobtitle">{{detail.jobName}} <span>({{detail.jobPosition}})</span></h2>
                <h3 class="jobmediumtitle">{{userName}}</h3>
                <p class="jobtext text-muted">Rp.{{formatPrice(detail.jobSalary)}},-</p>
                <p class="jobtext text-muted">{{detail.jobAddress}}</p>
                <p class="jobtext text-muted">Post on {{moment(detail.createdAt).format('DD MMM YYYY')}}</p>

            </div>
            <div class="col-md-4 mt-5">
                <button class="btn btn-outline-primary jobicn" data-bs-toggle="modal" :data-bs-target="'#exampleModalToggle' + detail.jobId" role="button" v-on:click="getDetail(detail.jobId)" >
                    <img class="me-2 pencil-icn" src="../assets/icon-postjob/pencil.svg" alt="">
                    Edit Job Post
                </button> 

        <!-- <button data-bs-toggle="modal" :data-bs-target="'#exampleModalToggle' + detail.jobId" role="button" v-on:click="getDetail(detail.jobId)" class="ict">
          <img class="import-icon" src="../assets/icon-postjob/edit.svg" alt="">
        </button> -->
          <!-- modal editorData -->
              <div class="modal fade" :id="'exampleModalToggle' + detail.jobId" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalToggleLabel">Edit Jobs</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="updateJobData(detail.jobId)">
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Name:</label>
                      <input type="text" class="form-control" id="" v-model="detail.jobName" required>
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Salary:</label>
                      <input type="text" class="form-control" id="" v-model="detail.jobSalary" required>
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Position edit: </label>
                       <select class="form-control" id="inputState" v-model="detail.jobPosition" required>
                        <option selected>Choose..</option>
                        <option>Internship</option>
                        <option>Full time</option>
                        <option>Part Time</option>
                        <option>Contractual</option>
                        <option>Freelance</option>
                      </select>
                    </div>
                    
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Requirement: </label>
                      <!-- <input type="text" class="form-control" id="recipient-name" v-model="edit.jobRequirement"> -->
                      <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="detail.jobRequirement" :config="editorConfig"></ckeditor>
                    </div>

                    <div class="mb-3">
                      <label for="message-text" class="col-form-label">Job Description:</label>
                      <!-- <textarea class="form-control" id="message-text" v-model="edit.jobDesc" /> -->
                      <ckeditor :editor="editor" tag-name="textarea" :model-value="jobDesc" v-model="detail.jobDesc" :config="editorConfig"></ckeditor>
                    </div>
                    <div class="mb-3">
                      <label for="recipient-name" class="col-form-label">Job Address: </label>
                      <input type="text" class="form-control" id="recipient-name" v-model="detail.jobAddress">
                    </div>
                    <div class="modal-footer">
                      <!-- <button class="btn btn-success" v-on:click="updateJobData(detail.jobId)">Update</button> -->
                      <button class="btn btn-success" type="submit">Update</button>

                    </div>
                  </form>   
                </div>
              </div>
            </div>
        </div>



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
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from 'moment';
  moment().format();
  
export default {
    name:'jobsDetail',
    components:{
        sidebarcomponent,
        NavMobile  
    },
    data(){
        return{
            editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'bulletedList',
              'undo',
              'redo'
            ]
          },
        },

            detail:[],
            userName:'',
            recruiter:[]
        }
    },
    methods:{
       moment: function (date) {
        return moment(date);
      },
        formatPrice(value) {
        let val = (value / 1).toFixed().replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      },
        async getDetailJob(){
            await axios.get(`https://toptalentapp.com:9091/api/v1/job/` +  this.$route.params.id)
            .then((data)=>{
                this.detail = data.data.data
                console.log(this.detail)
            })
        },
        async getRecruiter(){
             const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
            await axios.get(`https://toptalentapp.com:9091/api/v1/auth/recruiter/${recruiterId}`)
            .then((data)=>{
                this.recruiter = data.data
                console.log(this.recruiter)
            })
        },
        async updateJobData(id) {
        try {
          await axios.patch(
            `https://toptalentapp.com:9091/api/v1/job/${id}?jobName=${this.detail.jobName}&jobStatus=active&jobSalary=${this.detail.jobSalary}&jobPosition=${this.detail.jobPosition}&jobAddress=${this.detail.jobAddress}&jobDesc=${this.detail.jobDesc}&jobRequirement=${this.detail.jobRequirement}`
          )
          this.$toast.success("Job edited !")
          location.reload(true)
        } catch {
          // console.log(warn)
        }
      },
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
    .pencil-icn:hover{
        color: white;
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
