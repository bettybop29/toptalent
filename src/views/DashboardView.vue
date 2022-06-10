<template>

<div>
  <sidebar-component/>
  <sidebar-right v-if="this.sidepop == true" :view="views"></sidebar-right>
  <div>
    <div v-if="!isMobile()">
      <sidebar-right-review  v-if="this.sidepop == false & this.err == '200'"></sidebar-right-review>
      <sidebar-right-empty  v-if="this.err =='400'"></sidebar-right-empty>
    </div>


    <div v-else>
      <nav-mobile></nav-mobile>
    </div>
  </div>
    
   <div class="container">
     <div class="row">
       <div class="col-md-6 ">
         <div class="card greetings mb-4">
          <h2 class="main-head">Hi, {{recruiters.recruiterCompany}}!</h2>
          <div class="row">
          <div class="col-md-3 col-6">
            <img class="animate__animated animate__tada" src="@/assets/saly.png" alt="">
          </div>
          <div class=" col-md-9 col-6">              
            
            <div class="card-text">
              <h5 class="welcome">Welcome Back</h5>
              <h5 id="info">You have <span class="decor">{{edit.data}}</span> new
              resume(s)</h5> 
            </div>
            <button class="btn" hidden>See all</button>    
          </div>  
            </div>  
        </div>
       </div>

       <div class="col-md-6">
         <div class="card-monitor">
          
          <div class="card-approve">
            <div class="card-title">
              <radial-progress-bar :diameter="100"
                          :stopColor="stopColor"
                          :startColor="startColor"
                          :innerStrokeColor="innerStrokeColor"
                    v-bind:completed-steps="accept.data"
                    v-bind:total-steps="total.data"
                          :strokeWidth="6"
                          :innerStrokeWidth="6"
                    class="radial-custom">
                    <p class="ellipse-title">{{percentt}}%</p>
                 </radial-progress-bar>
                <h6 class="sum-title">Summary of approve</h6>
                
                <h1>{{accept.data}}<span> / {{total.data}}</span></h1>
                
             </div>  
              </div>
                <div class="col card-reject">
                  <radial-progress-bar :diameter="100"
                          :stopColor="stopColor"
                          :startColor="startColor"
                          :innerStrokeColor="innerStrokeColor"
                    v-bind:completed-steps="reject.data"
                    v-bind:total-steps="total.data"
                          :strokeWidth="6"
                          :innerStrokeWidth="6"
                    class="radial-custom">
                  <p class="ellipse-title">{{percent}}%</p>
                 </radial-progress-bar>
                <h6 class="sum-title">Summary of reject</h6>
                <h1>{{reject.data}}<span> / {{total.data}}</span></h1>
             
          </div>
         
        </div>
       </div>

     </div>
                 
    </div> 
    
    <div>
       
  </div>

  <div class="table-wrapper">
  <table class="table">
  <thead>
      <h3>Resume</h3>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Name</th>
      <th scope="col">Contact</th>
      <th scope="col">Status</th>
      <th scope="col">Job Name</th>
      <th scope="col">Position</th>
      <th class="d-none d-md-block" scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(resume, index) in list" :key="resume.id">
      <td scope="row">{{index + 1}}</td>
      <td>{{resume.jobseekerName}}</td>
      <td>{{resume.jobseekerEmail}}</td>
      <td>
        <p v-if="resume.applicationStatus != 'sent'">{{resume.applicationStatus}}</p>
        <p v-else>Reviewed</p></td>
      <td>{{resume.jobName}}</td>
      <td>
        <p v-if="resume.jobPosition != 'Internship'" class="position">{{resume.jobPosition}}</p>
        <p v-else class="position2">{{resume.jobPosition}}</p>
      </td>
      <td class="d-none d-md-block"><button class="btn-primary" @click="getView(resume.applicationId)">View</button></td>
    </tr>
  </tbody>  
</table>
</div>

 </div>

</template>

<script>
import axios from 'axios'
import SidebarComponent from '@/components/SidebarComponent.vue'
import SidebarRight from '@/components/SidebarRight.vue'
import SidebarRightEmpty from '@/components/SidebarRightEmpty.vue'
import SidebarRightReview from '@/components/SidebarRightReview.vue'
import RadialProgressBar from 'vue-radial-progress'
import NavMobile from '../components/NavMobile.vue'

export default {
  components: { SidebarComponent, 
                SidebarRightEmpty, 
                SidebarRightReview,
                SidebarRight,
                RadialProgressBar,
                NavMobile
              },
  name:'DashboardView',
  data(){
    return{
      path: 'http://54.255.4.75:9091',
      recruiters:[],
      accept:"",
      reject: "",
      list:[],
      total:"",
      edit:"",
      views:"",
      sidepop:'',
      dashboardEmpty:'', 
      startColor:'#F39201',
      stopColor:'#F39201',
      innerStrokeColor:'#C4C4C4',
      percent:'',
      percentt:'',
      index:'1'
    }
  },

 


  methods : {
    isMobile() {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    },
    async percenttCount(){
      const accept = JSON.parse(localStorage.getItem("countaccept-info"))
      const total = JSON.parse(localStorage.getItem("counttotal-info"))
      const result = Math.round(( accept / total) * 100)
      this.percentt = result
      
    },
    async percentCount(){
      const reject = JSON.parse(localStorage.getItem("countreject-info"))
      const total = JSON.parse(localStorage.getItem("counttotal-info"))
      const result = Math.round(( reject / total) * 100)
      this.percent = result
    },
  async totalnewAplicant(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/new-resume/${recruiterId}`)
    .then((data)=>{
      this.edit=data.data
      console.log(data.data)
      this.$toast.info(`You have ${data.data.data} new apllicant`, {
          // optional options Object
           position: 'top-right',
           pauseOnHover: true,
           queue:'true'
      })
    })
    
  },
   async w3_open(){
      await axios.get(``)
    },
  async totalAplicant(){
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/application/applications/${recruiterId}`)
    .then((data)=>{
      this.total=data.data
      localStorage.setItem("counttotal-info", JSON.stringify(data.data.data));
    })
  },
  async newResume(){
    let response = '';
    const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    try{
      response = await axios.get(`http://54.255.4.75:9091/api/v1/application/dashboard/${recruiterId}`)
      .then((resp)=>{
        this.list = resp.data.data
        console.log(resp.data.code)
        this.err = resp.data.code
        this.sidepop = false
      })
    } catch(err) {
      this.err = err.response.data.code
      console.log(err.response.data.code)
      this.sidepop = false
    }
    if(response.status == 200){
      console.log(response)
    }
  },
   async recruiter(){
   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
    await axios.get(`http://54.255.4.75:9091/api/v1/auth/recruiter/${recruiterId}`)
    .then((data)=>{
      this.recruiters=data.data
      
    })
   },
   async countAcc(){
   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
     await axios.get(`http://54.255.4.75:9091/api/v1/application/count-accepted/${recruiterId}`)
     .then((data)=>{
      this.accept=data.data
      localStorage.setItem("countaccept-info", JSON.stringify(data.data.data));
      })
    },
    async countRejc(){
   const recruiterId = JSON.parse(localStorage.getItem("user-info")).recruiterId
     await axios.get(`http://54.255.4.75:9091/api/v1/application/count-rejected/${recruiterId}`)
     .then((data)=>{
      this.reject=data.data
      localStorage.setItem("countreject-info", JSON.stringify(data.data.data));
      })
    },
    async getView(applicationId){ 
       await axios.get(`http://54.255.4.75:9091/api/v1/application/applicant?applicationId=${applicationId}`)
      .then((data)=>{
        this.views=data.data.data
        this.sidepop = true
        
        console.log(this.sidepop)
        // console.log(data)
              
      })
    },
    test(){
      console.log('test')
      this.$toast.error('Profile saved.', {
          // optional options Object
           position: 'top-right',
           pauseOnHover: true
      })
    }
  },
  mounted(){
    this.recruiter(),
    this.countAcc(),
    this.countRejc(),
    this.newResume(),
    this.totalAplicant(),
    this.totalnewAplicant(),
    this.getView(),
    this.percentCount(),
    this.percenttCount()

    

  },
}; 
</script>  

<style scoped>
.ellipse-title{
  font-size: 25px;
  margin-left: 6px;
  margin-top: 15px;
}
  .sum-title{
    font-size: 22px;
  }
  .radial-custom{
    position: absolute;
    margin-left: 230px;
  }
  .main-head{
    font-weight: 700;
    font-size: 20px;
    text-align: right;
  }
  
  .table{
    /* border: 1px solid red; */
    border-radius: 20px;
    padding: 10%;
}

.table-wrapper {
  /* background-color: green; */
  margin-top: 20px;
  width: -webkit-fill-available;
  max-height: 40vh;
  overflow: auto;
  display:inline-block;
}

.table h3{
  margin: 15px;
  width: 30px;
  
}

.table td{
  font-weight: 500;
  overflow: auto;
}
.btn-primary{
  border-radius: 10px;
  border-style: none;
  padding: 5px;
  width: 100%;
}
.btn-primary:hover{
  background: blue;
  box-shadow: 6px 10px 15px -3px rgba(0,0,0,0.1);
}
.logo-main{
  background: url("../assets/approve.png");
}
.main {
  background-color: #F3F3F3;
}
.container {
  margin-left: 19%;
  
  text-align: left;
  /* margin-top: 30px; */
  padding-top: 30px;
  width: auto;
  display: flex;
}
.card {
  position: relative;
  padding: 20px;
  border-radius: 29px;
  width: 430px;
  height: 273px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.card-text {
  padding: 10px;
  margin: 0;
  /* padding-left: 40px; */
  /* text-align: left; */
}
img{
  /* z-index: 1; */
  position: relative;
  /* display: block; */
  left: -70px;
  top: 20px;
  /* right: 1000px; */
  /* margin-left: 0; */
  /* margin-right: 40px; */
  width: 210px;
  height: 210px;
    
  
}
h5{
  padding-top: 5px;
  text-align: right;
  /* margin-left: 160px; */
}

.welcome{
  font-size: 16px;
  font-weight: 700;
}

.decor{
  font-size: 17px;
  color: rgb(37, 37, 37);
}

#info{
  font-size: 16px;
}

.card-approve {
 background-image: url("../assets/approve.png");
  border-radius: 20px;
  height: 133px;
  width: 373px;
  display: flex;
  padding: 10px;
  
}
.card-reject{
  padding: 20px;
  background-image: url("../assets/reject.png");
  border-radius: 20px;
  height: 133px;
  width: 373px;
  margin-top: 9px;
  /* box-shadow: 6px 10px 15px -3px rgba(0,0,0,0.1); */
}
.card-title{
  padding: 10px;
  padding-left: 10px;
}
span{
  font-size: 26px;
}
.card-monitor {
  margin-left: 10px;
  color: white;
  
}
.btn{
  font-size: 12px;
  padding: 8px;
  border-radius: 30px;
  background: orange;
  color: white;
  margin-top: 30px;
  width: 190px;

}
.btn:hover{
  background: rgb(235, 153, 1);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
.table{
  margin-left: 310px;
  width: 52.5%;
  background: rgb(249, 249, 249)
}
.position{
  background: #E2E3F6;
  padding: 5px;
  width: 100%;
  font-weight: bold;
  border-radius: 10px;
  color: #7D8CD1;
  font-size: 12px;
  text-align: center;
}
.position2{
  background: #e3fe9f;
  padding: 5px;
  width: 100%;
  font-weight: bold;
  border-radius: 10px;
  color: #b4bf1b;
  font-size: 11px;
  text-align: center;
}
.title-table{
  position: fixed;
  margin-left: 20.3%;
  background: white;
  width: max-content;
  padding: 8px;
  margin-top: 15px;
  border-radius: 10px 50px 10px 0px;
  padding-right: 40px;
}

/* breakpoints */
 /* for mobile */
 @media only screen and (max-width: 576px){
   .container{
     margin-top: 60px;
     margin-left: 10%;
   }


.table{
  margin-left: 20px;
  width: 52.5%;
  background: rgb(249, 249, 249)
}
}

</style>