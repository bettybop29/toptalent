<template>
<div>
  <sidebarcomponent/>
  <div class="main">
  <div class="col-md-11">
          <div class="candidates p-4 mb-4">
            <h5 class="fw-bold">Candidate</h5>

            <div class="row justify-content-between mt-4">
              <div class="col-6 d-flex align-items-center">
                <h6 class="fw-bold">{{job.jobName}}</h6>
              </div>
              <div class="col-6 d-flex justify-content-end align-items-center">
                <button class="ict">
                  <img class="import-icon" src="../assets/icon-postjob/see-all.svg" alt="">
                </button>
                <button class="ict prm">
                  <img class="import-icon" src="../assets/icon-postjob/edit.svg" alt="">
                </button>
                <button class="ict dgr">
                  <img class="import-icon" src="../assets/icon-postjob/delete.svg" alt="">
                </button>
              </div>
              <div class="col-12">
                <small class="text-muted">Created on {{job.createdAt}}</small>
              </div>
            </div>

          </div>

          <div class="applicantDetail">
            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="unreview-tab" data-bs-toggle="tab" data-bs-target="#unreview"
                  type="button" role="tab" aria-controls="unreview" aria-selected="true">Unreviewed</button>
              </li>     
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="accept-tab" data-bs-toggle="tab" data-bs-target="#accept" type="button"
                  role="tab" aria-controls="accept" aria-selected="false">Accepted</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="reject-tab" data-bs-toggle="tab" data-bs-target="#reject" type="button"
                  role="tab" aria-controls="reject" aria-selected="false">Rejected</button>
              </li>
            </ul>
            <!-- CANDIDATE  -->
            <div class="tab-content">
              <div class="tab-pane active" id="unreview" role="tabpanel" aria-labelledby="unreview-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.applicationStatus == 'sent'"></applicantjobcomponent>
                </div>
              </div>
              <div class="tab-pane" id="accept" role="tabpanel" aria-labelledby="accept-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.applicationStatus == 'accepted'"></applicantjobcomponent>
                </div>
              </div>
              <div class="tab-pane" id="reject" role="tabpanel" aria-labelledby="reject-tab">
                <div v-for="item in list" v-bind:key="item.id">
                  <applicantjobcomponent :item="item" v-if="item.applicationStatus == 'rejected'"></applicantjobcomponent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
</template>

<script>
import axios from 'axios'
import sidebarcomponent from '@/components/SidebarComponent.vue'
import applicantjobcomponent from '@/components/ApplicantJobComponent.vue'
export default {
  props:['item'],
  components:{
    sidebarcomponent,
    applicantjobcomponent
  },
  data(){
    return{
      job:[],
      list:[]
    }
  },
  methods:{
    async getJobDetail(){
      await axios.get(`http://54.255.4.75:9091/api/v1/job/` + this.$route.params.id)
      .then((data)=>{
        this.job = data.data.data
        console.log('jobdetail')
        console.log(this.job)
      })
    },
    async getCandidate(){
      await axios.get(`http://54.255.4.75:9091/api/v1/application/applicants/` + this.$route.params.id)
      .then((data)=>{
        this.list = data.data
        console.log('candidate')
        console.log(this.list)
      })
    }
  },
  mounted(){
    this.getJobDetail();
    this.getCandidate();
  }
}
</script>

<style scoped>
  .main{
    margin-left: 280px;
  }
</style>