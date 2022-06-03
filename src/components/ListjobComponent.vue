<template>
<div>

  <div class="col-md-12">
        
          <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button"
                role="tab" aria-controls="home" aria-selected="true">Visible</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                role="tab" aria-controls="profile" aria-selected="false">Hidden</button>
            </li>
          </ul>

          <div class="tab-content">
            <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
             <div class="mx-3 mb-4 pt-4 px-3">
                <h5 class="fw-bold">{{visible}} Jobs is Visible</h5>
              </div>
              <!-- list job -->
              <div v-for="item in list" v-bind:key="item.id">
                <jobcomponentnew :item="item" v-if="item.jobStatus == 'visible'"></jobcomponentnew>
              </div>
            </div>

            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="mx-3 mb-4 pt-4 px-3">
                <h5 class="fw-bold">{{hide}} Jobs is Hidden</h5>
              </div>  
              <div v-for="item in list" v-bind:key="item.id">
                <jobcomponentnew :item="item" v-if="item.jobStatus == 'hidden'"></jobcomponentnew>
              </div>
            </div>
          </div>
        </div> 
        </div> 
</template>

<script>

import axios from 'axios'
import jobcomponentnew from '@/components/JobComponentNew.vue'
// import CandidatejobComponent from '@/components/CandidatejobComponent.vue'
export default {
  components:{
    jobcomponentnew,
    // CandidatejobComponent
  },
  
  data(){
    return{
      list:[],
      hide:'',
      visible:''

    }
  },
  methods:{
    totalHidden(){
      console.log('agssri')
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        axios.get(`http://54.255.4.75:9091/api/v1/job/hidden/${recruiterId}`)
        .then((resp)=> {
          this.hide = resp.data.data
          console.log(this.hide)
        })
      },
      totalVisibility(){
      console.log('agssri')
        const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
        axios.get(`http://54.255.4.75:9091/api/v1/job/visible/${recruiterId}`)
        .then((resp)=> {
          this.visible = resp.data.data
          console.log(this.visible)
        })
      },
    getJobs(){
      console.log('agroasd')
      const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
      axios.get(`http://54.255.4.75:9091/api/v1/jobs/${recruiterId}`)
        .then((resp) => {
          this.list = resp.data
          console.log(this.list)
          localStorage.setItem("job-info", JSON.stringify(resp.data));
        })
    }
  },
  mounted(){
    this.totalHidden();
    this.getJobs();
    this.totalVisibility();
  }
}
</script>

<style scoped>

</style>